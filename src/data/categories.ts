import type { Category } from '@/lib/types';

/**
 * Shop categories. These come from the product types Bear Creek Baits is known to offer.
 * Copy is draft and can be edited freely.
 */
export const categories: Category[] = [
  {
    slug: 'soft-plastics',
    name: 'Soft Plastics',
    blurb: 'Swim baits, Crappie Crushers and curly tails',
    intro: 'Hand-poured crappie plastics: the Swim Bait, the Crappie Crusher, the Curly and the Double Curly. Pick a profile, then the size and color, and rig it on a jig head.',
    seoTitle: 'Crappie Soft Plastics',
    seoDescription: 'Shop crappie soft plastics from Bear Creek Baits. Browse body styles and colors and order online.',
    art: 'shad',
    artColor: 'crown-royal',
  },
  {
    slug: 'hair-jigs',
    name: 'Hair Jigs',
    blurb: 'Hand-tied to order',
    intro: 'Hair jigs for crappie, hand-tied to order. Choose your weight and color pattern and we tie them up for you.',
    seoTitle: 'Hand-Tied Hair Jigs for Crappie',
    seoDescription: 'Shop hand-tied crappie hair jigs from Bear Creek Baits in a range of weights and color patterns.',
    art: 'hair-jig',
    artColor: 'hair-black-chartreuse',
  },
  {
    slug: 'jig-heads',
    name: 'Jig Heads',
    blurb: 'Painted heads to match your plastics',
    intro: 'Jig heads for rigging crappie plastics. Choose the weight, hook size and head color you need.',
    seoTitle: 'Crappie Jig Heads',
    seoDescription: 'Shop crappie jig heads from Bear Creek Baits by weight, hook size and head color.',
    art: 'jig-head',
    artColor: 'head-chartreuse',
  },
  {
    slug: 'bait-boxes',
    name: 'Bait Boxes',
    blurb: 'Assorted plastics and jig heads in one box',
    intro: 'An assortment of crappie plastics and jig heads packed in one box. Restock your own tackle or give one away.',
    seoTitle: 'Crappie Bait Boxes & Gift Boxes',
    seoDescription: 'Bear Creek Baits bait boxes: assorted crappie plastics and jig heads in one box. A good gift for crappie fishermen.',
    art: 'box',
    artColor: 'mix-bright',
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
