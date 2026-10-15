import type { Product, ProductOption, Variant } from '@/lib/types';

/**
 * ==========================================================================
 *  SAMPLE PRODUCT CATALOG — NOT REAL BEAR CREEK BAITS DATA
 * ==========================================================================
 * Every product name, price, option (lengths, weights, hook sizes, pack sizes),
 * color and stock status below was invented to demonstrate the storefront.
 * None of it has been confirmed by Bear Creek Baits.
 *
 * To replace with the real catalog, edit the entries below (or map Shopify
 * Storefront API products into the same `Product` shape) — the UI reads only
 * from this module via `src/lib/catalog.ts`.
 * ==========================================================================
 */

type Draft = Omit<Product, 'variants' | 'sample' | 'images'> & {
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

function build(d: Draft): Product {
  const { price, soldOut, ...rest } = d;
  const variants: Variant[] = cartesian(d.options).map((opts) => ({
    id: [d.slug, ...Object.values(opts)].join('--').replace(/[^a-z0-9-]+/gi, '').toLowerCase(),
    options: opts,
    price: price(opts),
    available: !(soldOut?.(opts) ?? false),
  }));
  return { ...rest, variants, images: [], sample: true };
}

const crappieColors = [
  'chartreuse-pink',
  'pearl-pink',
  'blue-ice',
  'black-chartreuse',
  'junebug',
  'orange-chartreuse',
  'natural-shad',
  'red-chartreuse',
];

export const products: Product[] = [
  // ---------------------------------------------------------------- Soft plastics
  build({
    slug: 'creek-minnow',
    title: 'Creek Minnow',
    category: 'soft-plastics',
    art: 'shad',
    featured: true,
    summary: 'Paddle-tail crappie minnow for casting, trolling or slow swimming.',
    description: [
      'A slim minnow body with a small paddle tail. Rig it on a light jig head and swim it, troll it, or fish it under a float.',
    ],
    details: ['Sample product for the website preview', 'Pairs with the Round Ball Jig Head'],
    options: [
      { name: 'Color', display: 'swatch', values: crappieColors },
      { name: 'Length', display: 'button', values: ['1.5"', '2"'] },
    ],
    price: (o) => (o.Length === '2"' ? 499 : 449),
    soldOut: (o) => o.Color === 'junebug' && o.Length === '1.5"',
  }),
  build({
    slug: 'curly-tail-grub',
    title: 'Curly Tail Grub',
    category: 'soft-plastics',
    art: 'grub',
    featured: true,
    summary: 'Ribbed grub body with a curly tail that kicks on a slow retrieve.',
    description: [
      'A ribbed grub with a curl tail. A simple bait that works on a jig head, a tight-line rig or under a cork.',
    ],
    details: ['Sample product for the website preview', 'Available in two pack sizes'],
    options: [
      { name: 'Color', display: 'swatch', values: ['chartreuse-pink', 'pearl-pink', 'hot-pink', 'black-chartreuse', 'glow-white', 'purple-chartreuse', 'smoke-silver', 'red-chartreuse'] },
      { name: 'Pack', display: 'button', values: ['10 ct', '25 ct'] },
    ],
    price: (o) => (o.Pack === '25 ct' ? 899 : 399),
    soldOut: (o) => o.Color === 'glow-white' && o.Pack === '25 ct',
  }),
  build({
    slug: 'crappie-tube',
    title: 'Crappie Tube',
    category: 'soft-plastics',
    art: 'tube',
    summary: 'Hollow-body tube with a tentacle skirt.',
    description: ['A classic crappie tube with a split tentacle skirt. Fish it on a jig head or under a float.'],
    details: ['Sample product for the website preview'],
    options: [
      { name: 'Color', display: 'swatch', values: ['chartreuse-pink', 'blue-ice', 'black-chartreuse', 'hot-pink', 'smoke-silver', 'junebug'] },
      { name: 'Length', display: 'button', values: ['1.5"', '2"'] },
    ],
    price: () => 429,
    soldOut: (o) => o.Color === 'hot-pink',
  }),
  build({
    slug: 'split-tail-minnow',
    title: 'Split Tail Minnow',
    category: 'soft-plastics',
    art: 'split-tail',
    badge: 'New',
    featured: true,
    summary: 'Thin split tail that quivers with almost no movement.',
    description: ['A slender body that finishes in a thin split tail. Built for slow presentations and finicky fish.'],
    details: ['Sample product for the website preview'],
    options: [{ name: 'Color', display: 'swatch', values: crappieColors }],
    price: () => 449,
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
    details: ['Sample product for the website preview', 'Pairs with the Creek Minnow and Curly Tail Grub'],
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
    slug: 'minnow-head-jig-head',
    title: 'Minnow Head Jig Head',
    category: 'jig-heads',
    art: 'jig-head',
    summary: 'Tapered head that lines up with minnow-style plastics.',
    description: ['A tapered head that lines up cleanly with minnow and shad bodies.'],
    details: ['Sample product for the website preview'],
    options: [
      { name: 'Head Color', display: 'swatch', values: ['head-chartreuse', 'head-pink', 'head-white', 'head-unpainted'] },
      { name: 'Weight', display: 'button', values: ['1/32 oz', '1/16 oz', '1/8 oz'] },
    ],
    price: () => 549,
    // Whole product sold out — demonstrates the sold-out state.
    soldOut: () => true,
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
    slug: 'sauger-hair-jig',
    title: 'Sauger Hair Jig',
    category: 'sauger-baits',
    art: 'hair-jig',
    summary: 'Heavier hand-tied jig that gets down in current and stays there.',
    description: ['A heavier hand-tied hair jig for sauger in cold, moving water. Hop it along the bottom below a dam or drag it slow on a break.'],
    details: ['Sample product for the website preview', 'Hand-tied'],
    options: [
      { name: 'Color', display: 'swatch', values: ['hair-orange-chartreuse', 'hair-black-chartreuse', 'hair-solid-white', 'hair-purple-chartreuse'] },
      { name: 'Weight', display: 'button', values: ['1/4 oz', '3/8 oz', '1/2 oz'] },
    ],
    price: () => 699,
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
