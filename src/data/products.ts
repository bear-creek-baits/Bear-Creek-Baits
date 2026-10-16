import type { Product, ProductImage, ProductOption, Variant } from '@/lib/types';
import { getColorway } from './colors';

/**
 * ==========================================================================
 *  PRODUCT CATALOG
 * ==========================================================================
 * One product per folder of product photos (Product Photos/Edited/<profile>/<color>.jpg), copied to
 * public/products/<profile>/<color>.webp. Each color is the photo's file name, and picking that color
 * shows its photo.
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
  /** Photo for each color id, shown when that color is picked. */
  photos: Record<string, ProductImage>;
  /** Price in cents for a given option combination. */
  price: (opts: Record<string, string>) => number;
  /** Return true for option combinations that should show as sold out. */
  soldOut?: (opts: Record<string, string>) => boolean;
  /** Return false for combinations that aren't made at all (e.g. a color not poured in that size). */
  offered?: (opts: Record<string, string>) => boolean;
};

function cartesian(options: ProductOption[]): Record<string, string>[] {
  return options.reduce<Record<string, string>[]>(
    (acc, opt) => acc.flatMap((combo) => opt.values.map((v) => ({ ...combo, [opt.name]: v }))),
    [{}],
  );
}

/** Photo entries for one profile folder. Pass [width, height] for photos that aren't 1600 square. */
function photos(slug: string, title: string, colors: Record<string, [number, number] | null>): Record<string, ProductImage> {
  return Object.fromEntries(
    Object.entries(colors).map(([color, size]) => {
      const [width, height] = size ?? [1600, 1600];
      const name = getColorway(color)?.name ?? color;
      return [color, { src: `/products/${slug}/${color}.webp`, alt: `${title} in ${name}`, width, height }];
    }),
  );
}

function build(d: Draft): Product {
  const { price, soldOut, offered, photos, ...rest } = d;
  const variants: Variant[] = cartesian(d.options).filter((opts) => offered?.(opts) ?? true).map((opts) => ({
    id: [d.slug, ...Object.values(opts)].join('--').replace(/[^a-z0-9-]+/gi, '').toLowerCase(),
    options: opts,
    price: price(opts),
    available: !(soldOut?.(opts) ?? false),
    image: photos[opts.Color],
  }));
  // Soft plastics are poured in runs: 50 minimum per size and color, sold per bait.
  const plastic = d.category === 'soft-plastics' ? { minQty: SOFT_PLASTIC_MIN, qtyStep: 10, unit: 'bait' } : {};
  const colors = d.options.find((o) => o.name === 'Color')?.values ?? [];
  const images = colors.map((c) => photos[c]).filter(Boolean);
  return { ...rest, ...plastic, variants, images, sample: true };
}

const samplePrice = 25; // PLACEHOLDER: sample price per bait (cents) until real prices are confirmed

/**
 * Which colors are poured in each Swim Bait size. The Closer was posted in the 1.5"; Silver Streak's
 * size isn't known yet, so it's listed in every size until Steve confirms.
 */
const swimBaitColors: Record<string, string[]> = {
  '1.5"': ['silver-streak', 'the-closer'],
  '2"': ['silver-streak'],
  '2.2"': ['silver-streak'],
};

export const products: Product[] = [
  build({
    slug: 'swim-bait',
    title: 'Swim Bait',
    category: 'soft-plastics',
    art: 'shad',
    badge: 'New',
    featured: true,
    summary: 'Paddle-tail swim bait in three sizes, now including the new 1.5".',
    description: [
      'Three sizes, all with great tail action. The 2.2" is the most popular. The 2" is a custom bait that sometimes gets overlooked next to it. The 1.5" is the newest, and the hardest mold on the bench to shoot laminates in.',
      'Rig the 1.5" on a jig head with a #8 sickle hook. A #6 J hook will get by, but the sickle hook is the better match.',
    ],
    details: ['Sizes: 1.5", 2" and 2.2"', 'Not every color is poured in every size', 'Sample price'],
    options: [
      { name: 'Size', display: 'button', values: ['1.5"', '2"', '2.2"'] },
      { name: 'Color', display: 'swatch', values: ['silver-streak', 'the-closer'] },
    ],
    photos: photos('swim-bait', 'Swim Bait', { 'silver-streak': null, 'the-closer': null }),
    offered: (o) => swimBaitColors[o.Size].includes(o.Color),
    price: () => samplePrice,
  }),
  build({
    slug: 'curly-tail',
    title: 'Curly Tail',
    category: 'soft-plastics',
    art: 'grub',
    featured: true,
    summary: 'Ribbed grub with a curly tail that swims on the slowest retrieve.',
    description: [
      'A ribbed grub body with a single curly tail that kicks on the slowest retrieve and on the fall. Most colors are dipped, so the tail end is a different color from the body. Poured in 1.5".',
    ],
    details: ['Hand-poured', 'Dipped tails', 'Sample price'],
    options: [
      { name: 'Size', display: 'button', values: ['1.5"'] },
      {
        name: 'Color',
        display: 'swatch',
        values: ['blue-ice-lime', 'dynamite', 'laurence-grubs', 'monkey-snot', 'silver-streak', 'the-closer'],
      },
    ],
    photos: photos('curly-tail', 'Curly Tail', {
      'blue-ice-lime': null,
      dynamite: null,
      'laurence-grubs': null,
      'monkey-snot': [1576, 1600],
      'silver-streak': null,
      'the-closer': [1509, 1600],
    }),
    price: () => samplePrice,
  }),
  build({
    slug: 'crappie-crusher',
    title: 'Crappie Crusher',
    category: 'soft-plastics',
    art: 'stick-worm',
    featured: true,
    summary: 'Ribbed body with a long, thin tail that quivers on the fall.',
    description: ['A ribbed body that tapers to a long, thin tail. It shimmies on the drop and on a dead stick. Poured in 2" so far.'],
    details: ['Hand-poured', 'Sample price'],
    options: [
      { name: 'Size', display: 'button', values: ['2"'] },
      { name: 'Color', display: 'swatch', values: ['blue-treuse'] },
    ],
    photos: photos('crappie-crusher', 'Crappie Crusher', { 'blue-treuse': null }),
    price: () => samplePrice,
  }),
  build({
    slug: 'flicker-minnow',
    title: 'Flicker Minnow',
    category: 'soft-plastics',
    art: 'split-tail',
    featured: true,
    summary: 'Ribbed minnow body with a split tail that flickers on the fall.',
    description: ['A ribbed minnow body with a thin split tail that flickers on the fall and on a slow swim.'],
    // PLACEHOLDER: size not confirmed yet, so there's no Size option. Add one (like the others) once it is.
    details: ['Hand-poured', 'Size to be confirmed', 'Sample price'],
    options: [{ name: 'Color', display: 'swatch', values: ['the-closer'] }],
    photos: photos('flicker-minnow', 'Flicker Minnow', { 'the-closer': null }),
    price: () => samplePrice,
  }),
];
