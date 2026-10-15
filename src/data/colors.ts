import type { Colorway } from '@/lib/types';

/**
 * COLORWAYS
 * ---------
 * Soft plastic color NAMES come from Steve's Bear Creek Baits Facebook posts (Sep–Oct 2026).
 * The hex values are rough matches from his photos so the illustrations and swatches read right;
 * real product photos will replace them. Jig head, hair jig and bait box colors are still samples.
 */
export const colorways: Colorway[] = [
  // Crappie & sauger plastics (names from the Facebook posts)
  { id: 'crown-royal', name: 'Crown Royal', primary: '#1A2238', secondary: '#141A2C', flake: '#3FA7E0', tail: '#D9F227', families: ['black', 'blue', 'chartreuse'] },
  { id: 'delta-shad', name: 'Delta Shad', primary: '#4C625D', secondary: '#D9DCD4', flake: '#22B3A4', families: ['natural', 'white'] },
  { id: 'mississippi-gold', name: 'Mississippi Gold', primary: '#5C4B1C', secondary: '#5C4B1C', flake: '#E8C53A', tail: '#FF3B1F', families: ['natural', 'orange'] },
  { id: 'county-fair', name: 'County Fair', primary: '#E5426F', secondary: '#D63A64', flake: '#3B6FD0', tail: '#E8F21F', families: ['pink', 'chartreuse'] },
  { id: 'blue-ice-char', name: 'Blue Ice / Char. Tail', primary: '#2D8BBC', secondary: '#9FD3EA', flake: '#C9F2FF', tail: '#E2F21E', families: ['blue', 'chartreuse'] },
  { id: 'copper-top', name: 'Copper Top', primary: '#A2481C', secondary: '#D5EE2A', flake: '#F0A060', families: ['orange', 'chartreuse'] },
  { id: 'monkey-snot', name: 'Monkey Snot', primary: '#DAD6C3', secondary: '#E6E2D1', flake: '#2A2F3A', tail: '#D8F022', families: ['white', 'chartreuse'] },
  { id: 'the-closer', name: 'The Closer', primary: '#F0301E', secondary: '#E52A1A', tail: '#E8F02A', families: ['red', 'chartreuse'] },
  { id: 'blue-treuse', name: 'Blue Treuse', primary: '#1F5E9E', secondary: '#1A4F86', flake: '#5FC0F0', tail: '#E4F21E', families: ['blue', 'chartreuse'] },
  { id: 'dirty-girl', name: 'Dirty Girl', primary: '#151515', secondary: '#151515', flake: '#C8CCD0', tail: '#4BEF3A', families: ['black', 'chartreuse'] },
  { id: 'blue-red-tail', name: 'Blue / Red Tail', primary: '#2F7FD6', secondary: '#2A70C0', flake: '#D8E8F5', tail: '#E0262E', families: ['blue', 'red'] },

  // Painted jig head colors
  { id: 'head-red', name: 'Red', primary: '#D7262E', secondary: '#D7262E', families: ['red'] },
  { id: 'head-chartreuse', name: 'Chartreuse', primary: '#C9F025', secondary: '#C9F025', families: ['chartreuse'] },
  { id: 'head-pink', name: 'Pink', primary: '#FF5FA2', secondary: '#FF5FA2', families: ['pink'] },
  { id: 'head-white', name: 'White', primary: '#F5F4EE', secondary: '#F5F4EE', families: ['white'] },
  { id: 'head-black', name: 'Black', primary: '#1D1E1B', secondary: '#1D1E1B', families: ['black'] },
  { id: 'head-orange', name: 'Orange', primary: '#FF7A1A', secondary: '#FF7A1A', families: ['orange'] },
  { id: 'head-unpainted', name: 'Unpainted', primary: '#8C8F94', secondary: '#8C8F94', families: ['natural'] },

  // Hair jig patterns (head color is set separately in the art via primary)
  { id: 'hair-black-chartreuse', name: 'Black / Chartreuse', primary: '#1D1E1B', secondary: '#C9F025', families: ['black', 'chartreuse'] },
  { id: 'hair-pink-white', name: 'Pink / White', primary: '#FF5FA2', secondary: '#F6F3EA', families: ['pink', 'white'] },
  { id: 'hair-blue-white', name: 'Blue / White', primary: '#2F78D0', secondary: '#F6F3EA', families: ['blue', 'white'] },
  { id: 'hair-red-chartreuse', name: 'Red / Chartreuse', primary: '#D7262E', secondary: '#C9F025', families: ['red', 'chartreuse'] },
  { id: 'hair-purple-chartreuse', name: 'Purple / Chartreuse', primary: '#5B2A86', secondary: '#C9F025', families: ['purple', 'chartreuse'] },
  { id: 'hair-solid-white', name: 'Solid White', primary: '#F6F3EA', secondary: '#F6F3EA', families: ['white'] },
  { id: 'hair-orange-chartreuse', name: 'Orange / Chartreuse', primary: '#FF7A1A', secondary: '#C9F025', families: ['orange', 'chartreuse'] },

  // Bait box "color mix" options
  { id: 'mix-bright', name: 'Bright Mix', primary: '#C9F025', secondary: '#FF4F9E', families: ['chartreuse', 'pink'] },
  { id: 'mix-natural', name: 'Natural Mix', primary: '#6E7A80', secondary: '#EDEBE4', families: ['natural'] },
  { id: 'mix-assorted', name: 'Assorted Mix', primary: '#FF7A1A', secondary: '#A9DDF3', families: ['orange', 'blue'] },
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
