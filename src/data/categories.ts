import type { Category } from '@/lib/types';

/**
 * Shop categories. These come from the product types Bear Creek Baits is known to offer.
 * Copy is draft and can be edited freely.
 */
export const categories: Category[] = [
  {
    slug: 'soft-plastics',
    name: 'Soft Plastics',
    blurb: 'Crappie plastics in a lot of colors',
    intro: 'Crappie plastics in bright, natural and everything-in-between colors. Pick a body, pick a color, rig it on a jig head.',
    seoTitle: 'Crappie Soft Plastics',
    seoDescription: 'Shop crappie soft plastics from Bear Creek Baits. Browse body styles and colors and order online.',
    art: 'shad',
    artColor: 'chartreuse-pink',
  },
  {
    slug: 'hair-jigs',
    name: 'Hair Jigs',
    blurb: 'Hand-tied crappie jigs',
    intro: 'Hand-tied hair jigs for crappie. Choose your weight and color pattern.',
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
    slug: 'bass-baits',
    name: 'Bass Baits',
    blurb: 'A few for the bass box',
    intro: 'Not everything here is for crappie. A short lineup of soft plastics for bass.',
    seoTitle: 'Bass Baits',
    seoDescription: 'Shop bass soft plastics from Bear Creek Baits.',
    art: 'craw',
    artColor: 'green-pumpkin',
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
