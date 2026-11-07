import type { Product, ProductImage, ProductOption, Variant } from '@/lib/types';
import { colorways, getColorway } from './colors';

/**
 * ==========================================================================
 *  PRODUCT CATALOG
 * ==========================================================================
 * One product per bait profile. Customers pick the profile, then the size, then any color off the
 * color chart (src/data/colors.ts): every profile can be ordered in every chart color.
 * Each profile is shown in one main color (`mainColor`): the color in Steve's profile photo
 * (Product Photos/Edited/Profiles). The chart shows the color variations. Profile photos live in
 * public/products/<profile>/<color>.webp.
 *
 * Sizes come from Steve's Facebook posts (Sep–Oct 2026) where known. Still invented: every price
 * and stock status.
 *
 * Titles follow the brand guide: "[Size] [Body]", with the color as an option.
 * The UI reads only from this module via `src/lib/catalog.ts`.
 * ==========================================================================
 */

/** Minimum order per size and color for soft plastics, confirmed by Steve. */
export const SOFT_PLASTIC_MIN = 50;

type Draft = Omit<Product, 'variants' | 'sample' | 'images'> & {
  /** Photos of this profile by color id. The main color's is the product photo; the rest are decoration. */
  photos: Record<string, ProductImage>;
  /** Price in cents for a given option combination. */
  price: (opts: Record<string, string>) => number;
  /** Return true for option combinations that should show as sold out. */
  soldOut?: (opts: Record<string, string>) => boolean;
};

function cartesian(options: ProductOption[]): Record<string, string>[] {
  return options.reduce<Record<string, string>[]>(
    (acc, opt) => acc.flatMap((combo) => opt.values.map((v) => ({ ...combo, [opt.name]: v }))),
    [{}],
  );
}

/**
 * Photo entries for one profile folder, with each photo's [width, height]. The photos are cut out
 * (transparent background, soft shadow baked in) and trimmed to the bait, so they sit on any page color.
 */
function photos(slug: string, title: string, colors: Record<string, [number, number]>): Record<string, ProductImage> {
  return Object.fromEntries(
    Object.entries(colors).map(([color, [width, height]]) => {
      const name = getColorway(color)?.name ?? color;
      return [color, { src: `/products/${slug}/${color}.webp`, alt: `${title} in ${name}`, width, height }];
    }),
  );
}

function build(d: Draft): Product {
  const { price, soldOut, photos, ...rest } = d;
  const variants: Variant[] = cartesian(d.options).map((opts) => ({
    id: [d.slug, ...Object.values(opts)].join('--').replace(/[^a-z0-9-]+/gi, '').toLowerCase(),
    options: opts,
    price: price(opts),
    available: !(soldOut?.(opts) ?? false),
  }));
  // Soft plastics are poured in runs: 50 minimum per size and color, sold per bait.
  const plastic = d.category === 'soft-plastics' ? { minQty: SOFT_PLASTIC_MIN, qtyStep: 10, unit: 'bait' } : {};
  const images = Object.entries(photos)
    .sort(([a], [b]) => Number(b === d.mainColor) - Number(a === d.mainColor))
    .map(([, img]) => img);
  return { ...rest, ...plastic, variants, images, sample: true };
}

const samplePrice = 25; // PLACEHOLDER: sample price per bait (cents) until real prices are confirmed

/** The color option every profile shares: the whole chart, in chart order. */
const chartColors: ProductOption = { name: 'Color', display: 'swatch', values: colorways.map((c) => c.id) };

export const products: Product[] = [
  build({
    slug: 'swim-bait',
    title: 'Swim Bait',
    category: 'soft-plastics',
    badge: 'New',
    featured: true,
    summary: 'Paddle-tail swim bait in four sizes, from the new 1.5" up to 2.5".',
    description: [
      'Four sizes, all with great tail action. The 2.2" is the most popular. The 2" is a custom bait that sometimes gets overlooked next to it. The 1.5" is the newest, and the hardest mold to shoot laminates in.',
      'Rig the 1.5" on a jig head with a #8 sickle hook. A #6 J hook will get by, but the sickle hook is the better match.',
    ],
    details: ['Sizes: 1.5", 2", 2.2" and 2.5"', 'Any color on the chart', 'Sample price'],
    options: [{ name: 'Size', display: 'button', values: ['1.5"', '2"', '2.2"', '2.5"'] }, chartColors],
    mainColor: 'blue-treuse',
    photos: photos('swim-bait', 'Swim Bait', {
      'blue-treuse': [1600, 487],
      'the-closer': [1600, 393],
      'silver-streak': [1600, 426],
    }),
    price: () => samplePrice,
  }),
  build({
    slug: 'curly-tail',
    title: 'Curly Tail',
    category: 'soft-plastics',
    featured: true,
    summary: 'Ribbed grub with a curly tail that swims on the slowest retrieve.',
    description: [
      'A ribbed grub body with a single curly tail that kicks on the slowest retrieve and on the fall. Most colors are two-tone, with the tail end a different color from the body. Poured in 1.5" and 2.2".',
    ],
    details: ['Sizes: 1.5" and 2.2"', 'Any color on the chart', 'Sample price'],
    options: [{ name: 'Size', display: 'button', values: ['1.5"', '2.2"'] }, chartColors],
    mainColor: 'blue-ice-lime',
    photos: photos('curly-tail', 'Curly Tail', {
      'the-closer': [1600, 894],
      'monkey-snot': [1600, 887],
      'silver-streak': [1600, 740],
      'laurence-grubs': [1600, 907],
      'blue-ice-lime': [1600, 832],
      dynamite: [1600, 781],
    }),
    price: () => samplePrice,
  }),
  build({
    slug: 'crappie-crusher',
    title: 'Crappie Crusher',
    category: 'soft-plastics',
    featured: true,
    summary: 'Ribbed body with a long, thin tail that quivers on the fall.',
    description: ['A ribbed body that tapers to a long, thin tail. It shimmies on the drop and on a dead stick.'],
    details: ['Size: 2"', 'Any color on the chart', 'Sample price'],
    options: [{ name: 'Size', display: 'button', values: ['2"'] }, chartColors],
    mainColor: 'blue-treuse',
    photos: photos('crappie-crusher', 'Crappie Crusher', { 'blue-treuse': [1600, 395] }),
    price: () => samplePrice,
  }),
  build({
    slug: 'flicker-minnow',
    title: 'Flicker Minnow',
    category: 'soft-plastics',
    featured: true,
    summary: 'Ribbed minnow body with a split tail that flickers on the fall.',
    description: ['A ribbed minnow body with a thin split tail that flickers on the fall and on a slow swim.'],
    details: ['Size: 1.5"', 'Any color on the chart', 'Sample price'],
    options: [{ name: 'Size', display: 'button', values: ['1.5"'] }, chartColors],
    mainColor: 'delta-shad',
    photos: photos('flicker-minnow', 'Flicker Minnow', { 'delta-shad': [1600, 438], 'the-closer': [1600, 417] }),
    price: () => samplePrice,
  }),
  build({
    slug: 'double-curly-tail',
    title: 'Double Curly Tail',
    category: 'soft-plastics',
    badge: 'New',
    featured: true,
    summary: 'Two curly tails on a ribbed body for twice the kick.',
    description: [
      'A ribbed body with two curly tails. That extra tail action pays off when fish turn aggressive, and it still swims on a slow retrieve.',
    ],
    details: ['Size: 1.5"', 'Any color on the chart', 'Sample price'],
    options: [{ name: 'Size', display: 'button', values: ['1.5"'] }, chartColors],
    mainColor: 'shiny-hiney',
    photos: photos('double-curly-tail', 'Double Curly Tail', { 'shiny-hiney': [1152, 1600] }),
    price: () => samplePrice,
  }),
  build({
    slug: 'triple-tail',
    title: 'Triple Tail',
    category: 'soft-plastics',
    badge: 'New',
    featured: true,
    summary: 'Ribbed body with three curly tails, the most action of any profile.',
    description: ['A ribbed body with three curly tails that all move on the fall and on a slow swim. The most tail action of any profile.'],
    details: ['Size: 2.5"', 'Any color on the chart', 'Sample price'],
    options: [{ name: 'Size', display: 'button', values: ['2.5"'] }, chartColors],
    mainColor: 'crown-royal',
    photos: photos('triple-tail', 'Triple Tail', { 'crown-royal': [1600, 821] }),
    price: () => samplePrice,
  }),
];
