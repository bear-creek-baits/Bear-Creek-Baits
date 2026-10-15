import type { Product, ProductOption, Variant } from '@/lib/types';

/**
 * ==========================================================================
 *  MOCK PRODUCT CATALOG
 * ==========================================================================
 * Soft plastic PROFILES and COLOR NAMES come from Steve's Bear Creek Baits
 * Facebook posts (Sep–Oct 2026): the 1.5", 2" and 2.2" Swim Baits, the 2"
 * Crappie Crusher, the 1.5" Curly, the 2" Double Curly and the 3.5" Slimmy,
 * plus which colors he has poured in which profile.
 *
 * Still invented: every price, pack size and stock status, and the hair jig,
 * jig head (other than the #8 sickle hook note), bass and bait box listings.
 *
 * Titles follow the brand guide: "[Size] [Body]", with the color as an option.
 * The UI reads only from this module via `src/lib/catalog.ts`.
 * ==========================================================================
 */

type Draft = Omit<Product, 'variants' | 'sample' | 'images'> & {
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

function build(d: Draft): Product {
  const { price, soldOut, offered, ...rest } = d;
  const variants: Variant[] = cartesian(d.options).filter((opts) => offered?.(opts) ?? true).map((opts) => ({
    id: [d.slug, ...Object.values(opts)].join('--').replace(/[^a-z0-9-]+/gi, '').toLowerCase(),
    options: opts,
    price: price(opts),
    available: !(soldOut?.(opts) ?? false),
  }));
  return { ...rest, variants, images: [], sample: true };
}

const samplePrice = 499; // PLACEHOLDER: one sample price per bag until real prices are confirmed

/** Which colors Steve has posted in each Swim Bait size. */
const swimBaitColors: Record<string, string[]> = {
  '1.5"': ['crown-royal', 'delta-shad', 'blue-ice-char', 'monkey-snot', 'the-closer'],
  '2"': ['crown-royal', 'blue-ice-char', 'county-fair'],
  '2.2"': ['county-fair', 'copper-top', 'crown-royal', 'monkey-snot'],
};

export const products: Product[] = [
  // ---------------------------------------------------------------- Soft plastics (crappie)
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
      'Rig the 1.5" on a jig head with a #8 sickle hook. A #6 J hook will get by, but the sickle hook is the better match. We can make the right head for it.',
    ],
    details: ['Sizes: 1.5", 2" and 2.2"', 'Not every color is poured in every size', 'Sample price and bag count'],
    options: [
      { name: 'Size', display: 'button', values: ['1.5"', '2"', '2.2"'] },
      {
        name: 'Color',
        display: 'swatch',
        values: ['crown-royal', 'county-fair', 'blue-ice-char', 'monkey-snot', 'delta-shad', 'copper-top', 'the-closer'],
      },
    ],
    offered: (o) => swimBaitColors[o.Size].includes(o.Color),
    price: () => samplePrice,
    soldOut: (o) => o.Size === '2"' && o.Color === 'county-fair',
  }),
  build({
    slug: 'crappie-crusher-2',
    title: '2" Crappie Crusher',
    category: 'soft-plastics',
    art: 'split-tail',
    featured: true,
    summary: 'Forked-tail crappie bait that quivers on the fall.',
    description: ['A 2" body with a forked tail that shimmies on the drop and on a dead stick.'],
    details: ['Hand-poured', 'Sample price and bag count'],
    options: [{ name: 'Color', display: 'swatch', values: ['mississippi-gold', 'county-fair', 'crown-royal'] }],
    price: () => samplePrice,
  }),
  build({
    slug: 'curly-1-5',
    title: '1.5" Curly',
    category: 'soft-plastics',
    art: 'grub',
    summary: 'Small curly tail grub for when they want it tiny.',
    description: ['A 1.5" ribbed grub with a curly tail that swims on the slowest retrieve.'],
    details: ['Hand-poured', 'Sample price and bag count'],
    options: [{ name: 'Color', display: 'swatch', values: ['delta-shad', 'dirty-girl', 'crown-royal'] }],
    price: () => samplePrice,
  }),
  build({
    slug: 'double-curly-2',
    title: '2" Double Curly',
    category: 'soft-plastics',
    art: 'grub',
    summary: 'Two curly tails for big action when fall fish get aggressive.',
    description: [
      'Two curly tails on a 2" ribbed body. That extra tail action pays off when fall fish turn aggressive.',
    ],
    details: ['Hand-poured', 'Sample price and bag count'],
    options: [{ name: 'Color', display: 'swatch', values: ['blue-treuse', 'crown-royal'] }],
    price: () => samplePrice,
  }),

  // ---------------------------------------------------------------- Hair jigs
  build({
    slug: 'hand-tied-hair-jig',
    title: 'Hand-Tied Hair Jig',
    category: 'hair-jigs',
    art: 'hair-jig',
    featured: true,
    summary: 'Hand-tied crappie hair jig on a painted round head.',
    description: ['A hand-tied hair jig on a painted round head. Choose the weight and color pattern that fits your water.'],
    details: ['Sample product for the website preview', 'Hand-tied'],
    options: [
      { name: 'Color', display: 'swatch', values: ['hair-black-chartreuse', 'hair-pink-white', 'hair-blue-white', 'hair-red-chartreuse', 'hair-purple-chartreuse', 'hair-solid-white'] },
      { name: 'Weight', display: 'button', values: ['1/32 oz', '1/16 oz', '1/8 oz'] },
    ],
    price: () => 599,
    soldOut: (o) => o.Color === 'hair-blue-white' && o.Weight === '1/8 oz',
  }),
  build({
    slug: 'marabou-crappie-jig',
    title: 'Marabou Crappie Jig',
    category: 'hair-jigs',
    art: 'hair-jig',
    summary: 'Soft, full-bodied hair jig that breathes when it sits still.',
    description: ['A fuller hair jig for slow falls and long pauses. Pick weight, color and hook size.'],
    details: ['Sample product for the website preview', 'Hand-tied'],
    options: [
      { name: 'Color', display: 'swatch', values: ['hair-pink-white', 'hair-orange-chartreuse', 'hair-black-chartreuse', 'hair-solid-white', 'hair-red-chartreuse'] },
      { name: 'Weight', display: 'button', values: ['1/16 oz', '1/8 oz'] },
      { name: 'Hook', display: 'button', values: ['#2', '#1'] },
    ],
    price: () => 649,
  }),

  // ---------------------------------------------------------------- Jig heads
  build({
    slug: 'round-ball-jig-head',
    title: 'Round Ball Jig Head',
    category: 'jig-heads',
    art: 'jig-head',
    featured: true,
    summary: 'Painted round head for rigging crappie plastics.',
    description: ['A painted round-head jig for crappie plastics. Choose weight, hook size, head color and pack size.'],
    details: ['Sample product for the website preview', 'Pairs with the Swim Bait and 2" Crappie Crusher'],
    options: [
      { name: 'Head Color', display: 'swatch', values: ['head-red', 'head-chartreuse', 'head-pink', 'head-white', 'head-black', 'head-orange', 'head-unpainted'] },
      { name: 'Weight', display: 'button', values: ['1/64 oz', '1/32 oz', '1/16 oz', '1/8 oz'] },
      { name: 'Hook', display: 'button', values: ['#4', '#2', '#1'] },
      { name: 'Pack', display: 'button', values: ['10 ct', '25 ct'] },
    ],
    price: (o) => (o.Pack === '25 ct' ? 1099 : 499),
    soldOut: (o) => o.Weight === '1/64 oz' && o.Hook === '#1',
  }),
  build({
    slug: 'swim-bait-jig-head',
    title: 'Swim Bait Jig Head',
    category: 'jig-heads',
    art: 'jig-head',
    summary: 'Hand-painted head on a #8 sickle hook, made for the 1.5" Swim Bait.',
    description: [
      'The right head for the 1.5" Swim Bait: a #8 sickle hook. You could get away with a #6 J hook, but the sickle hook rides better in this small bait.',
    ],
    details: ['#8 sickle hook', 'Hand-painted', 'Sample weights, colors, price and stock'],
    options: [
      { name: 'Head Color', display: 'swatch', values: ['head-chartreuse', 'head-pink', 'head-white', 'head-unpainted'] },
      { name: 'Weight', display: 'button', values: ['1/32 oz', '1/16 oz'] },
    ],
    price: () => 549,
    soldOut: (o) => o['Head Color'] === 'head-unpainted',
  }),

  // ---------------------------------------------------------------- Bass baits
  build({
    slug: 'creek-craw',
    title: 'Creek Craw',
    category: 'bass-baits',
    art: 'craw',
    summary: 'Compact craw for flipping, Texas rigs and jig trailers.',
    description: ['A compact craw body for bass. Use it on a Texas rig, a shaky head or as a jig trailer.'],
    details: ['Sample product for the website preview'],
    options: [{ name: 'Color', display: 'swatch', values: ['green-pumpkin', 'watermelon-red', 'black-blue', 'white-shad'] }],
    price: () => 549,
  }),
  build({
    slug: 'stick-worm',
    title: 'Stick Worm',
    category: 'bass-baits',
    art: 'stick-worm',
    summary: 'Straight-tail stick bait for wacky and Texas rigs.',
    description: ['A straight stick bait for bass. Wacky rig it, Texas rig it or fish it weightless.'],
    details: ['Sample product for the website preview'],
    options: [
      { name: 'Color', display: 'swatch', values: ['green-pumpkin', 'watermelon-red', 'black-blue', 'white-shad'] },
      { name: 'Length', display: 'button', values: ['4"', '5"'] },
    ],
    price: (o) => (o.Length === '5"' ? 599 : 549),
    soldOut: (o) => o.Color === 'white-shad',
  }),

  // ---------------------------------------------------------------- Sauger baits
  build({
    slug: 'slimmy-3-5',
    title: '3.5" Slimmy',
    category: 'sauger-baits',
    art: 'stick-worm',
    summary: 'Long, slim minnow profile. A great sauger bait.',
    description: ['A 3.5" slim minnow body. Translucent blue with a red tail is a great sauger bait.'],
    details: ['Hand-poured', 'Sample price and bag count'],
    options: [{ name: 'Color', display: 'swatch', values: ['blue-red-tail'] }],
    price: () => samplePrice,
  }),
  build({
    slug: 'sauger-jig-head',
    title: 'Sauger Jig Head',
    category: 'sauger-baits',
    art: 'jig-head',
    summary: 'Hand-painted heavy head for minnows and plastics in current.',
    description: ['A hand-painted heavy jig head for tipping with a minnow or rigging a plastic when the river is pulling.'],
    details: ['Sample product for the website preview', 'Hand-painted'],
    options: [
      { name: 'Head Color', display: 'swatch', values: ['head-chartreuse', 'head-orange', 'head-white', 'head-pink'] },
      { name: 'Weight', display: 'button', values: ['1/4 oz', '3/8 oz', '1/2 oz'] },
      { name: 'Pack', display: 'button', values: ['5 ct', '10 ct'] },
    ],
    price: (o) => (o.Pack === '10 ct' ? 899 : 499),
  }),

  // ---------------------------------------------------------------- Bait boxes
  build({
    slug: 'crappie-bait-box',
    title: 'Crappie Bait Box',
    category: 'bait-boxes',
    art: 'box',
    badge: 'Gift idea',
    featured: true,
    summary: 'Assorted crappie plastics and jig heads, packed in one box.',
    description: [
      'An assortment of crappie soft plastics and jig heads in one box. Pick a size and a color lean, and we will pack the rest.',
      'Good for stocking up before the season, trying new colors, or giving to the crappie fisherman who already has everything.',
    ],
    details: ['Sample product for the website preview', 'Exact contents vary'],
    options: [
      { name: 'Size', display: 'button', values: ['Starter', 'Loaded'] },
      { name: 'Color Mix', display: 'swatch', values: ['mix-bright', 'mix-natural', 'mix-assorted'] },
    ],
    price: (o) => (o.Size === 'Loaded' ? 4499 : 2499),
  }),
  build({
    slug: 'seasonal-bait-box',
    title: 'Seasonal Bait Box',
    category: 'bait-boxes',
    art: 'box',
    badge: 'Seasonal',
    summary: 'A limited box put together for the time of year.',
    description: ['A limited bait box assembled for the season. When it is gone, it is gone until the next one.'],
    details: ['Sample product for the website preview', 'Limited run'],
    options: [{ name: 'Color Mix', display: 'swatch', values: ['mix-assorted'] }],
    price: () => 3499,
    soldOut: () => true,
  }),
];
