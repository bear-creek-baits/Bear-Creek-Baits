import type { Colorway } from '@/lib/types';

/**
 * COLORWAYS
 * ---------
 * One entry per color in the product photos (public/products/<profile>/<color>.webp). Names are the
 * photo file names. Hex values were sampled from the photos: `primary` is the body (the top layer
 * on a laminate), `secondary` the belly layer on a laminate (same as primary otherwise), `flake`
 * the glitter, `tail` the dipped tail. Swatches and illustrations use these; product pages show
 * the photo itself.
 */
export const colorways: Colorway[] = [
  { id: 'blue-treuse', name: 'Blue Treuse', primary: '#05287C', secondary: '#05287C', flake: '#107AE5', tail: '#DAF601', families: ['blue', 'chartreuse'] },
  { id: 'blue-ice-lime', name: 'Blue Ice Lime', primary: '#3B97AE', secondary: '#3B97AE', flake: '#0AA5D1', tail: '#74EA01', families: ['blue', 'chartreuse'] },
  { id: 'dynamite', name: 'Dynamite', primary: '#BDD304', secondary: '#BDD304', flake: '#B84207', families: ['chartreuse', 'orange'] },
  { id: 'laurence-grubs', name: 'Laurence Grubs', primary: '#083057', secondary: '#00C700', flake: '#0950B4', tail: '#DAF000', families: ['blue', 'chartreuse'] },
  { id: 'monkey-snot', name: 'Monkey Snot', primary: '#BAC1A1', secondary: '#BAC1A1', flake: '#484C48', tail: '#C3DA01', families: ['white', 'chartreuse'] },
  { id: 'silver-streak', name: 'Silver Streak', primary: '#797F70', secondary: '#797F70', flake: '#C8CCC4', tail: '#CBE300', families: ['natural', 'chartreuse'] },
  // Curly Tail and Swim Bait: red body, chartreuse tail. (The Flicker Minnow photo has it the other way round.)
  { id: 'the-closer', name: 'The Closer', primary: '#F40101', secondary: '#F40101', tail: '#D3E801', families: ['red', 'chartreuse'] },
];

const byId = new Map(colorways.map((c) => [c.id, c]));

export function getColorway(id: string | undefined): Colorway | undefined {
  return id ? byId.get(id) : undefined;
}

export const colorFamilyLabels: Record<string, string> = {
  chartreuse: 'Chartreuse',
  pink: 'Pink',
  white: 'White / Pearl',
  blue: 'Blue',
  black: 'Black',
  purple: 'Purple',
  orange: 'Orange',
  red: 'Red',
  natural: 'Natural',
};

export const colorFamilySwatch: Record<string, string> = {
  chartreuse: '#C9F025',
  pink: '#FF5FA2',
  white: '#F6F3EA',
  blue: '#7EC4EA',
  black: '#1D1E1B',
  purple: '#5B2A86',
  orange: '#FF7A1A',
  red: '#D7262E',
  natural: '#7D7F6C',
};
