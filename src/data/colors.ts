import type { Colorway } from '@/lib/types';

/**
 * SAMPLE COLORWAYS
 * ----------------
 * Generic, descriptive color names invented for the prototype. They are NOT Bear Creek Baits'
 * real color lineup. Replace with the actual color chart (names + reference photos) later.
 */
export const colorways: Colorway[] = [
  // Crappie plastics
  { id: 'chartreuse-pink', name: 'Chartreuse Pink', primary: '#C9F025', secondary: '#FF4F9E', families: ['chartreuse', 'pink'] },
  { id: 'pearl-pink', name: 'Pearl Pink', primary: '#F6F2E7', secondary: '#FF8AB8', families: ['white', 'pink'] },
  { id: 'blue-ice', name: 'Blue Ice', primary: '#A9DDF3', secondary: '#EAF6FB', flake: '#FFFFFF', families: ['blue', 'white'] },
  { id: 'black-chartreuse', name: 'Black Chartreuse', primary: '#1D1E1B', secondary: '#C9F025', families: ['black', 'chartreuse'] },
  { id: 'junebug', name: 'Junebug', primary: '#3F2152', secondary: '#3F2152', flake: '#4BE07A', families: ['purple'] },
  { id: 'smoke-silver', name: 'Smoke Silver', primary: '#9C9A92', secondary: '#C9C7BF', flake: '#FFFFFF', families: ['natural'] },
  { id: 'orange-chartreuse', name: 'Orange Chartreuse', primary: '#FF7A1A', secondary: '#C9F025', families: ['orange', 'chartreuse'] },
  { id: 'natural-shad', name: 'Natural Shad', primary: '#6E7A80', secondary: '#EDEBE4', flake: '#D8E3E8', families: ['natural', 'white'] },
  { id: 'red-chartreuse', name: 'Red Chartreuse', primary: '#D7262E', secondary: '#C9F025', families: ['red', 'chartreuse'] },
  { id: 'hot-pink', name: 'Hot Pink', primary: '#FF3D8B', secondary: '#FF3D8B', flake: '#FFD1E3', families: ['pink'] },
  { id: 'glow-white', name: 'Glow White', primary: '#F1F5DF', secondary: '#E2F0B8', families: ['white'] },
  { id: 'purple-chartreuse', name: 'Purple Chartreuse', primary: '#5B2A86', secondary: '#C9F025', families: ['purple', 'chartreuse'] },

  // Bass plastics
  { id: 'green-pumpkin', name: 'Green Pumpkin', primary: '#5B5A2C', secondary: '#5B5A2C', flake: '#1A1A10', families: ['natural'] },
  { id: 'watermelon-red', name: 'Watermelon Red', primary: '#5E7A3A', secondary: '#5E7A3A', flake: '#E03A3A', families: ['natural', 'red'] },
  { id: 'black-blue', name: 'Black Blue', primary: '#1B1B26', secondary: '#1B1B26', flake: '#3A7BFF', families: ['black', 'blue'] },
  { id: 'white-shad', name: 'White Shad', primary: '#F1F0EA', secondary: '#C8CED2', flake: '#B9C7CF', families: ['white', 'natural'] },

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
