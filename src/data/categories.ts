import type { Category } from '@/lib/types';

/**
 * Shop categories. Soft plastics is the only one today, so /shop/ and /shop/soft-plastics/ show the
 * same products. Add a category here (and its slug to CategorySlug in src/lib/types.ts) to split the shop.
 */
export const categories: Category[] = [
  {
    slug: 'soft-plastics',
    name: 'Soft Plastics',
    blurb: 'Swim baits, curly tails (single, double and triple), Crappie Crushers, Crappie Slayers and Flicker Minnows',
    intro: 'Crappie plastics: the Swim Bait, the Curly Tail, the Double Curly Tail, the Triple Tail, the Crappie Crusher, the Crappie Slayer and the Flicker Minnow. Pick a profile and size, then any color off the color chart.',
    seoTitle: 'Crappie Soft Plastics',
    seoDescription: 'Shop crappie soft plastics from Bear Creek Baits. Browse body styles and colors and order online.',
    photo: { product: 'swim-bait', color: 'blue-treuse' },
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
