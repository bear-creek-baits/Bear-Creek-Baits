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
 * Sizes and prices confirmed by Steve (Nov 2026): a pack is $4.15, a bulk bag of 50 in one color is
 * $20 and a bag of 100 is $40. Bulk is 50 minimum per color, which the bag sizes take care of.
 *
 * Titles follow the brand guide: "[Size] [Body]", with the color as an option.
 * The UI reads only from this module via `src/lib/catalog.ts`.
 * ==========================================================================
 */

/**
 * How soft plastics are sold, with the price of each in cents. Every size and color comes in each.
 * The quantity on an order line counts packs or bags.
 */
export const PACKS = [
  { name: 'Pack', price: 415 },
  { name: 'Bulk 50', price: 2000 },
  { name: 'Bulk 100', price: 4000 },
] as const;

/** One line describing the packs, used around the site. */
export const PACK_NOTE = 'Packs are $4.15. Bulk is $20 for 50 or $40 for 100 of one color (50 per color minimum).';

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
  const images = Object.entries(photos)
    .sort(([a], [b]) => Number(b === d.mainColor) - Number(a === d.mainColor))
    .map(([, img]) => img);
  return { ...rest, variants, images, sample: true };
}

/** The pack option every soft plastic shares, and its price. */
const packOption: ProductOption = { name: 'Pack', display: 'button', values: PACKS.map((p) => p.name) };
const packPrice = (opts: Record<string, string>) => PACKS.find((p) => p.name === opts.Pack)?.price ?? PACKS[0].price;

/** The color option every profile shares: the whole chart, in chart order. */
const chartColors: ProductOption = { name: 'Color', display: 'swatch', values: colorways.map((c) => c.id) };

export const products: Product[] = [
  build({
    slug: 'swim-bait',
    title: 'Swim Bait',
    category: 'soft-plastics',
    badge: 'New',
    featured: true,
    summary: 'Paddle-tail swim bait in three sizes, from the new 1.5" up to 2.5".',
    description: [
      'Three sizes, all with great tail action. The 1.5" is the newest, and the hardest mold to shoot laminates in.',
      'Rig the 1.5" on a jig head with a #8 sickle hook. A #6 J hook will get by, but the sickle hook is the better match.',
    ],
    details: ['Sizes: 1.5", 2" and 2.5"', 'Any color on the chart', 'Packs, or bulk bags of 50 and 100'],
    options: [{ name: 'Size', display: 'button', values: ['1.5"', '2"', '2.5"'] }, packOption, chartColors],
    mainColor: 'blue-treuse',
    photos: photos('swim-bait', 'Swim Bait', {
      'blue-treuse': [1600, 487],
      'the-closer': [1600, 393],
      'silver-streak': [1600, 426],
    }),
    price: packPrice,
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
    details: ['Sizes: 1.5" and 2.2"', 'Any color on the chart', 'Packs, or bulk bags of 50 and 100'],
    options: [{ name: 'Size', display: 'button', values: ['1.5"', '2.2"'] }, packOption, chartColors],
    mainColor: 'blue-ice-lime',
    photos: photos('curly-tail', 'Curly Tail', {
      'the-closer': [1600, 894],
      'monkey-snot': [1600, 887],
      'silver-streak': [1600, 740],
      'laurence-grubs': [1600, 907],
      'blue-ice-lime': [1600, 832],
      dynamite: [1600, 781],
    }),
    price: packPrice,
  }),
  build({
    slug: 'crappie-crusher',
    title: 'Crappie Crusher',
    category: 'soft-plastics',
    featured: true,
    summary: 'Ribbed body with a long, thin tail that quivers on the fall.',
    description: ['A ribbed body that tapers to a long, thin tail. It shimmies on the drop and on a dead stick.'],
    details: ['Size: 2"', 'Any color on the chart', 'Packs, or bulk bags of 50 and 100'],
    options: [{ name: 'Size', display: 'button', values: ['2"'] }, packOption, chartColors],
    mainColor: 'blue-treuse',
    photos: photos('crappie-crusher', 'Crappie Crusher', { 'blue-treuse': [1600, 395] }),
    price: packPrice,
  }),
  build({
    slug: 'flicker-minnow',
    title: 'Flicker Minnow',
    category: 'soft-plastics',
    featured: true,
    summary: 'Ribbed minnow body with a split tail that flickers on the fall.',
    description: ['A ribbed minnow body with a thin split tail that flickers on the fall and on a slow swim.'],
    details: ['Size: 1.5"', 'Any color on the chart', 'Packs, or bulk bags of 50 and 100'],
    options: [{ name: 'Size', display: 'button', values: ['1.5"'] }, packOption, chartColors],
    mainColor: 'delta-shad',
    photos: photos('flicker-minnow', 'Flicker Minnow', { 'delta-shad': [1600, 438], 'the-closer': [1600, 417] }),
    price: packPrice,
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
    details: ['Size: 2"', 'Any color on the chart', 'Packs, or bulk bags of 50 and 100'],
    options: [{ name: 'Size', display: 'button', values: ['2"'] }, packOption, chartColors],
    mainColor: 'shiny-hiney',
    photos: photos('double-curly-tail', 'Double Curly Tail', { 'shiny-hiney': [1152, 1600] }),
    price: packPrice,
  }),
  build({
    slug: 'triple-tail',
    title: 'Triple Tail',
    category: 'soft-plastics',
    badge: 'New',
    featured: true,
    summary: 'Ribbed body with three curly tails, the most action of any profile.',
    description: ['A ribbed body with three curly tails that all move on the fall and on a slow swim. The most tail action of any profile.'],
    details: ['Size: 2.75"', 'Any color on the chart', 'Packs, or bulk bags of 50 and 100'],
    options: [{ name: 'Size', display: 'button', values: ['2.75"'] }, packOption, chartColors],
    mainColor: 'crown-royal',
    photos: photos('triple-tail', 'Triple Tail', { 'crown-royal': [1600, 821] }),
    price: packPrice,
  }),
  build({
    slug: 'crappie-slayer',
    title: 'Crappie Slayer',
    category: 'soft-plastics',
    badge: 'New',
    featured: true,
    summary: 'The Crappie Slayer, poured in 1.2" and 2".',
    // DRAFT: no photo or description from Steve yet.
    description: ['Poured in 1.2" and 2", in any color on the chart.'],
    details: ['Sizes: 1.2" and 2"', 'Any color on the chart', 'Packs, or bulk bags of 50 and 100'],
    options: [{ name: 'Size', display: 'button', values: ['1.2"', '2"'] }, packOption, chartColors],
    mainColor: 'blue-treuse',
    photos: {},
    price: packPrice,
  }),
];
