import type { Category } from '@/lib/types';

/**
 * Shop categories. Only soft plastics have product photos so far, so that's the one category in the shop.
 * Copy is draft and can be edited freely.
 */
export const categories: Category[] = [
  {
    slug: 'soft-plastics',
    name: 'Soft Plastics',
    blurb: 'Swim baits, curly tails, Crappie Crushers and Flicker Minnows',
    intro: 'Hand-poured crappie plastics: the Swim Bait, the Curly Tail, the Crappie Crusher and the Flicker Minnow. Pick a profile, then the size and color, and rig it on a jig head.',
    seoTitle: 'Crappie Soft Plastics',
    seoDescription: 'Shop crappie soft plastics from Bear Creek Baits. Browse body styles and colors and order online.',
    art: 'shad',
    artColor: 'the-closer',
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
