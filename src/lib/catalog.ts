import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { getColorway } from '@/data/colors';
import type { CategorySlug, ColorFamily, Product, ProductImage, Variant } from './types';

/**
 * Single access layer for catalog data. When moving to Shopify, re-implement these
 * functions against the Storefront API and the rest of the UI stays the same.
 */

export function getAllProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getCategoryCounts(): Record<string, number> {
  return Object.fromEntries(categories.map((c) => [c.slug, getProductsByCategory(c.slug).length]));
}

export function findVariantById(id: string): { product: Product; variant: Variant } | undefined {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === id);
    if (variant) return { product, variant };
  }
  return undefined;
}

export function findVariant(product: Product, selected: Record<string, string>): Variant | undefined {
  return product.variants.find((v) => product.options.every((o) => v.options[o.name] === selected[o.name]));
}

/**
 * Applies one option change. If that combination isn't made (a color not poured in the new size),
 * switches to the closest combination that is, preferring one in stock.
 */
export function resolveSelection(product: Product, current: Record<string, string>, name: string, value: string): Record<string, string> {
  const next = { ...current, [name]: value };
  if (findVariant(product, next)) return next;
  const withValue = product.variants.filter((v) => v.options[name] === value);
  const match = withValue.find((v) => v.available) ?? withValue[0];
  return match ? { ...match.options } : next;
}

/** How the product is made, shown near the price. Every product in the shop today is a soft plastic. */
export function handmadeLine(product: Product): string {
  return product.category === 'soft-plastics' ? 'Hand-poured.' : 'Handmade.';
}

/** Quantity rules for one size/color of a product. */
export function orderRules(product: Product) {
  const min = product.minQty ?? 1;
  return { min, step: product.qtyStep ?? 1, max: product.unit ? 5000 : 99, unit: product.unit };
}

/** "per bait · 50 minimum" for products sold by the piece, otherwise empty. */
export function unitNote(product: Product): string {
  const { min, unit } = orderRules(product);
  if (!unit) return '';
  return min > 1 ? `per ${unit} · ${min} minimum` : `per ${unit}`;
}

export function isAvailable(product: Product): boolean {
  return product.variants.some((v) => v.available);
}

export function priceRange(product: Product): { min: number; max: number } {
  const prices = product.variants.map((v) => v.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/** The swatch option (usually "Color") if the product has one. */
export function colorOption(product: Product) {
  return product.options.find((o) => o.display === 'swatch');
}

export function defaultSelection(product: Product): Record<string, string> {
  const first = product.variants.find((v) => v.available) ?? product.variants[0];
  return { ...first.options };
}

export function productColorFamilies(product: Product): Set<ColorFamily> {
  const opt = colorOption(product);
  const fams = new Set<ColorFamily>();
  opt?.values.forEach((id) => getColorway(id)?.families.forEach((f) => fams.add(f)));
  return fams;
}

/** The cut-out photo of one product in one color, if there is one. */
export function colorPhoto(slug: string, color: string): ProductImage | undefined {
  const product = getProduct(slug);
  const opt = product && colorOption(product);
  return opt ? product.variants.find((v) => v.options[opt.name] === color && v.image)?.image : undefined;
}

/** Other profiles in the same category. */
export function relatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return products
    .map((p) => {
      const category = categories.find((c) => c.slug === p.category)?.name ?? '';
      const colorNames = (colorOption(p)?.values ?? []).map((id) => getColorway(id)?.name ?? '').join(' ');
      const haystack = [p.title, p.summary, category, colorNames, ...p.options.flatMap((o) => o.values)]
        .join(' ')
        .toLowerCase();
      const title = p.title.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (!haystack.includes(t)) return { p, score: 0 };
        score += title.includes(t) ? 3 : 1;
      }
      return { p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export function formatPriceRange(product: Product): string {
  const { min, max } = priceRange(product);
  return min === max ? formatPrice(min) : `From ${formatPrice(min)}`;
}

/** Human-readable variant summary, e.g. "Chartreuse Pink · 2"". */
export function describeVariant(product: Product, variant: Variant): string {
  return product.options
    .filter((o) => o.values.length > 1 || o.display === 'swatch' || o.name === 'Size')
    .map((o) => {
      const v = variant.options[o.name];
      return o.display === 'swatch' ? getColorway(v)?.name ?? v : v;
    })
    .join(' · ');
}

/** The sizes a profile is poured in, e.g. '1.5" · 2" · 2.2"'. Empty when the product has no Size option. */
export function sizeList(product: Product): string {
  return product.options.find((o) => o.name === 'Size')?.values.join(' · ') ?? '';
}

export function optionValueLabel(display: string, value: string): string {
  return display === 'swatch' ? getColorway(value)?.name ?? value : value;
}
