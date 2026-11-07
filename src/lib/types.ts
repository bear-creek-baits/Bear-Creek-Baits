/**
 * Catalog types.
 *
 * The shape intentionally mirrors Shopify's product model (product -> options -> variants with
 * selectedOptions) so the sample catalog can later be swapped for Shopify Storefront API data
 * with a thin mapping layer instead of a rewrite.
 */

export type CategorySlug = 'soft-plastics';

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Short line used on category cards. */
  blurb: string;
  /** Intro copy at the top of the category page. */
  intro: string;
  seoTitle: string;
  seoDescription: string;
  /** Bait photo that represents the category: a product slug and one of its colors. */
  photo: { product: string; color: string };
}

/** Broad color groups used for shop filtering. */
export type ColorFamily =
  | 'chartreuse'
  | 'yellow'
  | 'green'
  | 'pink'
  | 'white'
  | 'blue'
  | 'black'
  | 'purple'
  | 'orange'
  | 'red'
  | 'natural';

export interface Colorway {
  /** Number on the color chart. Customers can order by number or name. */
  n: number;
  id: string;
  name: string;
  /** Short chart description, e.g. "Black / chartreuse". */
  description: string;
  /** Main body color. */
  primary: string;
  /** Belly color for laminates. Same as primary for solid colors. */
  secondary: string;
  /** Optional glitter/flake color. */
  flake?: string;
  /** Optional tail color when the tail end is a different color from the body (e.g. a chartreuse tail). */
  tail?: string;
  families: ColorFamily[];
  /** The color chart's photo of this color, if it has one. */
  chartPhoto?: string;
}

export type OptionDisplay = 'swatch' | 'button';

export interface ProductOption {
  name: string; // e.g. "Color", "Weight", "Pack"
  display: OptionDisplay;
  values: string[]; // for swatches, values are colorway ids
}

export interface Variant {
  id: string;
  /** Option name -> selected value. */
  options: Record<string, string>;
  price: number; // cents
  compareAtPrice?: number; // cents
  available: boolean;
  image?: ProductImage;
}

export interface ProductImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Product {
  slug: string;
  title: string;
  category: CategorySlug;
  /** One-line summary for cards and meta descriptions. */
  summary: string;
  /** Longer description paragraphs. */
  description: string[];
  /** Bullet details. */
  details: string[];
  options: ProductOption[];
  variants: Variant[];
  /**
   * The profile's main color (a chart color id). Each profile is shown in its own main color; the
   * color chart shows the variations.
   */
  mainColor: string;
  /**
   * Photos of this profile (cut out, transparent background), main color first. The product page
   * shows only the main color's photo, or "photo coming soon" until it exists; the others are used
   * as decoration around the site.
   */
  images: ProductImage[];
  badge?: 'New' | 'Seasonal';
  /** Smallest quantity per size/color (e.g. 50 soft plastics). Defaults to 1. */
  minQty?: number;
  /** How much the quantity buttons step by. Defaults to 1. */
  qtyStep?: number;
  /** What one unit is, when the price is per piece (e.g. "bait"). */
  unit?: string;
  featured?: boolean;
  /** Marks invented demo data. Every product in the prototype is a sample. */
  sample: true;
}

export interface CartLine {
  variantId: string;
  slug: string;
  quantity: number;
}
