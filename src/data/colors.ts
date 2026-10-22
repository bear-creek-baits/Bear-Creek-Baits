import type { Colorway } from '@/lib/types';

/**
 * COLOR CHART
 * -----------
 * The 60 numbered colors on Steve's color chart (the "Bear Creek Baits Color Chart" design), in chart
 * order. Every profile can be ordered in every color. `primary` is the head/body color and `tail` the
 * tail color when it differs; `flake` is the glitter. `chartPhoto` is the chart's photo of the color
 * (colors 1–35); colors 36–60 are drawn from their hex values until they're photographed.
 * Hex values are approximations taken from the chart.
 */
export const colorways: Colorway[] = [
  { n: 1, id: 'monkey-milk', name: "Monkey Milk", description: "Blue highlight / black glitter", primary: '#9FC3E8', secondary: '#9FC3E8', tail: '#EDE6E1', flake: '#111111', families: ['white', 'blue'], chartPhoto: '/colors/01-monkey-milk.webp' },
  { n: 2, id: 'ole-george', name: "Ole George", description: "Purple / dark purple", primary: '#7B2CBF', secondary: '#7B2CBF', tail: '#3C1361', families: ['purple'], chartPhoto: '/colors/02-ole-george.webp' },
  { n: 3, id: 'purplicious', name: "Purplicious", description: "Purple / chartreuse", primary: '#7B2CBF', secondary: '#7B2CBF', tail: '#D4F51A', families: ['purple', 'chartreuse'], chartPhoto: '/colors/03-purplicious.webp' },
  { n: 4, id: 'roll-tide', name: "Roll Tide", description: "Crimson / white", primary: '#9E1B32', secondary: '#9E1B32', tail: '#FAFAFA', families: ['red', 'white'], chartPhoto: '/colors/04-roll-tide.webp' },
  { n: 5, id: 'blue-streak', name: "Blue Streak", description: "Blue glitter / pink", primary: '#1E5BD8', secondary: '#1E5BD8', tail: '#FF4FA3', flake: '#CFE3FF', families: ['blue', 'pink'], chartPhoto: '/colors/05-blue-streak.webp' },
  { n: 6, id: 'red-monkey', name: "Red Monkey", description: "Monkey milk / pink", primary: '#EDE6E1', secondary: '#EDE6E1', tail: '#FF4FA3', families: ['white', 'pink'], chartPhoto: '/colors/06-red-monkey.webp' },
  { n: 7, id: 'ole-red', name: "Ole Red", description: "Red / yellow laminate", primary: '#D7263D', secondary: '#D7263D', tail: '#FFE135', families: ['red', 'yellow'], chartPhoto: '/colors/07-ole-red.webp' },
  { n: 8, id: 'blue-shiner', name: "Blue Shiner", description: "Blue / chrome", primary: '#1E5BD8', secondary: '#1E5BD8', tail: '#B8C2CC', families: ['blue', 'natural'], chartPhoto: '/colors/08-blue-shiner.webp' },
  { n: 9, id: 'cajun-spice', name: "Cajun Spice", description: "Burnt orange / green chartreuse laminate", primary: '#CC5500', secondary: '#CC5500', tail: '#9BD62B', families: ['orange', 'chartreuse'], chartPhoto: '/colors/09-cajun-spice.webp' },
  { n: 10, id: 'the-closer', name: "The Closer", description: "Flo pink / green chartreuse laminate", primary: '#FF4FA3', secondary: '#FF4FA3', tail: '#9BD62B', families: ['pink', 'red', 'chartreuse'], chartPhoto: '/colors/10-the-closer.webp' },
  { n: 11, id: 'fire-cracker', name: "Fire Cracker", description: "Orange / green chartreuse laminate", primary: '#FF7A1A', secondary: '#FF7A1A', tail: '#9BD62B', families: ['orange', 'chartreuse'], chartPhoto: '/colors/11-fire-cracker.webp' },
  { n: 12, id: 'hoochie-mama', name: "Hoochie Mama", description: "Flo red / yellow chartreuse", primary: '#FF3B3B', secondary: '#FF3B3B', tail: '#E8F51A', families: ['red', 'chartreuse'], chartPhoto: '/colors/12-hoochie-mama.webp' },
  { n: 13, id: 'blue-moon', name: "Blue Moon", description: "Black / sky blue", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#63B8FF', families: ['black', 'blue'], chartPhoto: '/colors/13-blue-moon.webp' },
  { n: 14, id: 'monkey-shine', name: "Monkey Shine", description: "Monkey milk / red glitter", primary: '#EDE6E1', secondary: '#EDE6E1', tail: '#F3D6D6', flake: '#D7263D', families: ['white', 'red'], chartPhoto: '/colors/14-monkey-shine.webp' },
  { n: 15, id: 'ole-fish-eggs', name: "Ole Fish Eggs", description: "Yellow, red glitter / pearl tail", primary: '#FFE135', secondary: '#FFE135', tail: '#F2EFE6', flake: '#D7263D', families: ['yellow', 'white'], chartPhoto: '/colors/15-ole-fish-eggs.webp' },
  { n: 16, id: 'red-wasp', name: "Red Wasp", description: "Black / red", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#D7263D', families: ['black', 'red'], chartPhoto: '/colors/16-red-wasp.webp' },
  { n: 17, id: 'copper-top', name: "Copper Top", description: "Copper / yellow laminate", primary: '#B87333', secondary: '#B87333', tail: '#FFE135', families: ['orange', 'yellow'], chartPhoto: '/colors/17-copper-top.webp' },
  { n: 18, id: 'bad-azz', name: "Bad Azz", description: "Olive green / flo red", primary: '#6B6B2E', secondary: '#6B6B2E', tail: '#FF3B3B', families: ['green', 'red'], chartPhoto: '/colors/18-bad-azz.webp' },
  { n: 19, id: 'shiny-hiney', name: "Shiny Hiney", description: "Chrome / chartreuse", primary: '#B8C2CC', secondary: '#B8C2CC', tail: '#D4F51A', families: ['natural', 'chartreuse'], chartPhoto: '/colors/19-shiny-hiney.webp' },
  { n: 20, id: 'dragon-fire', name: "Dragon Fire", description: "John Deere green / orange", primary: '#367C2B', secondary: '#367C2B', tail: '#FF7A1A', families: ['green', 'orange'], chartPhoto: '/colors/20-dragon-fire.webp' },
  { n: 21, id: 'limeaid', name: "Limeaid", description: "John Deere green / black", primary: '#367C2B', secondary: '#367C2B', tail: '#1A1A1A', families: ['green', 'black'], chartPhoto: '/colors/21-limeaid.webp' },
  { n: 22, id: 'jolly-rancher', name: "Jolly Rancher", description: "John Deere green / purple", primary: '#367C2B', secondary: '#367C2B', tail: '#7B2CBF', families: ['green', 'purple'], chartPhoto: '/colors/22-jolly-rancher.webp' },
  { n: 23, id: 'pick-wick-magic', name: "Pick Wick Magic", description: "Red / John Deere green", primary: '#D7263D', secondary: '#D7263D', tail: '#367C2B', families: ['red', 'green'], chartPhoto: '/colors/23-pick-wick-magic.webp' },
  { n: 24, id: 'acid-rain', name: "Acid Rain", description: "Yellow, white, green chartreuse laminate", primary: '#FFE135', secondary: '#FFE135', tail: '#9BD62B', families: ['yellow', 'chartreuse'], chartPhoto: '/colors/24-acid-rain.webp' },
  { n: 25, id: 'lemon-delight', name: "Lemon Delight", description: "Yellow with red glitter / silver glitter", primary: '#FFE135', secondary: '#FFE135', tail: '#C9CED6', flake: '#D7263D', families: ['yellow', 'natural'], chartPhoto: '/colors/25-lemon-delight.webp' },
  { n: 26, id: 'crappie-candy', name: "Crappie Candy", description: "Light purple / chartreuse, red glitter", primary: '#B79CED', secondary: '#B79CED', tail: '#D4F51A', flake: '#D7263D', families: ['purple', 'chartreuse'], chartPhoto: '/colors/26-crappie-candy.webp' },
  { n: 27, id: 'ole-faithful', name: "Ole Faithful", description: "Black / chartreuse", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#D4F51A', families: ['black', 'chartreuse'], chartPhoto: '/colors/27-ole-faithful.webp' },
  { n: 28, id: 'monkey-snot', name: "Monkey Snot", description: "Monkey milk, chartreuse laminate / chartreuse tail", primary: '#EDE6E1', secondary: '#EDE6E1', tail: '#D4F51A', families: ['white', 'chartreuse'], chartPhoto: '/colors/28-monkey-snot.webp' },
  { n: 29, id: 'ol-yeller', name: "Ol' Yeller", description: "Yellow / monkey milk", primary: '#FFE135', secondary: '#FFE135', tail: '#EDE6E1', families: ['yellow', 'white'], chartPhoto: '/colors/29-ol-yeller.webp' },
  { n: 30, id: 'silver-streak', name: "Silver Streak", description: "Solid silver glitter", primary: '#C9CED6', secondary: '#C9CED6', flake: '#FFFFFF', families: ['natural'], chartPhoto: '/colors/30-silver-streak.webp' },
  { n: 31, id: 'triple-threat', name: "Triple Threat", description: "Black / blue / chartreuse laminate", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#1E5BD8', families: ['black', 'blue', 'chartreuse'], chartPhoto: '/colors/31-triple-threat.webp' },
  { n: 32, id: 'blue-monkey', name: "Blue Monkey", description: "Monkey milk / blue", primary: '#EDE6E1', secondary: '#EDE6E1', tail: '#1E5BD8', families: ['white', 'blue'], chartPhoto: '/colors/32-blue-monkey.webp' },
  { n: 33, id: 'meat-getter', name: "Meat Getter", description: "Blue / white", primary: '#1E5BD8', secondary: '#1E5BD8', tail: '#FAFAFA', families: ['blue', 'white'], chartPhoto: '/colors/33-meat-getter.webp' },
  { n: 34, id: 'blue-truce', name: "Blue Truce", description: "Blue / chartreuse", primary: '#1E5BD8', secondary: '#1E5BD8', tail: '#D4F51A', families: ['blue', 'chartreuse'], chartPhoto: '/colors/34-blue-truce.webp' },
  { n: 35, id: 'ruby-slipper', name: "Ruby Slipper", description: "Flo red / chartreuse", primary: '#FF3B3B', secondary: '#FF3B3B', tail: '#D4F51A', families: ['red', 'chartreuse'], chartPhoto: '/colors/35-ruby-slipper.webp' },
  { n: 36, id: 'cherry-bomb', name: "Cherry Bomb", description: "Cherry / pearl tail", primary: '#C2185B', secondary: '#C2185B', tail: '#F2EFE6', families: ['red', 'white'] },
  { n: 37, id: 'halloween', name: "Halloween", description: "Orange / black", primary: '#FF7A1A', secondary: '#FF7A1A', tail: '#1A1A1A', families: ['orange', 'black'] },
  { n: 38, id: 'lemon-juice', name: "Lemon Juice", description: "Yellow / pearl", primary: '#FFE135', secondary: '#FFE135', tail: '#F2EFE6', families: ['yellow', 'white'] },
  { n: 39, id: 'monkey-shine-extreme', name: "Monkey Shine Extreme", description: "Monkey milk, red glitter / red glitter tail", primary: '#EDE6E1', secondary: '#EDE6E1', tail: '#D7263D', flake: '#D7263D', families: ['white', 'red'] },
  { n: 40, id: 'tn-shad', name: "TN Shad", description: "Green / grey laminate", primary: '#3FA34D', secondary: '#3FA34D', tail: '#8A8F94', families: ['green', 'natural'] },
  { n: 41, id: 'sunrise', name: "Sunrise", description: "Sky blue / orange", primary: '#63B8FF', secondary: '#63B8FF', tail: '#FF7A1A', families: ['blue', 'orange'] },
  { n: 42, id: 'gold-rush', name: "Gold Rush", description: "Gold glitter", primary: '#D4A62A', secondary: '#D4A62A', flake: '#FFF3B0', families: ['yellow', 'natural'] },
  { n: 43, id: 'electric-chicken', name: "Electric Chicken", description: "Bubble gum / green chartreuse laminate", primary: '#FF8FC7', secondary: '#FF8FC7', tail: '#9BD62B', families: ['pink', 'chartreuse'] },
  { n: 44, id: 'junebug', name: "Junebug", description: "Purple with green glitter", primary: '#7B2CBF', secondary: '#7B2CBF', flake: '#4CD964', families: ['purple'] },
  { n: 45, id: 'blackout', name: "Blackout", description: "Black / silver glitter", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#C9CED6', flake: '#FFFFFF', families: ['black', 'natural'] },
  { n: 46, id: 'ocean-breeze', name: "Ocean Breeze", description: "Blue top / green chartreuse bottom", primary: '#1E5BD8', secondary: '#1E5BD8', tail: '#9BD62B', families: ['blue', 'chartreuse'] },
  { n: 47, id: 'country-fair', name: "Country Fair", description: "Light pink and chartreuse", primary: '#F8B6D0', secondary: '#F8B6D0', tail: '#D4F51A', families: ['pink', 'chartreuse'] },
  { n: 48, id: 'delta-shad', name: "Delta Shad", description: "Translucent black with silver bottom", primary: '#3A3A3A', secondary: '#3A3A3A', tail: '#C9CED6', families: ['black', 'natural'] },
  { n: 49, id: 'hawk-tuah', name: "Hawk Tuah", description: "White body / translucent lime tail", primary: '#FAFAFA', secondary: '#FAFAFA', tail: '#C8F07A', families: ['white', 'chartreuse'] },
  { n: 50, id: 'no-smoke', name: "No Smoke", description: "Very light translucent / black with glitter", primary: '#E8E8E2', secondary: '#E8E8E2', tail: '#1A1A1A', flake: '#C9CED6', families: ['white', 'black'] },
  { n: 51, id: 'mississippi-blues', name: "Mississippi Blues", description: "Blue / blue", primary: '#1E5BD8', secondary: '#1E5BD8', tail: '#63B8FF', families: ['blue'] },
  { n: 52, id: 'orange-float', name: "Orange Float", description: "Orange / lime laminate", primary: '#FF7A1A', secondary: '#FF7A1A', tail: '#A6E22E', families: ['orange', 'chartreuse'] },
  { n: 53, id: 'dirty-girl', name: "Dirty Girl", description: "Black and green chartreuse", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#9BD62B', families: ['black', 'chartreuse'] },
  { n: 54, id: 'old-faithful-lime', name: "Old Faithful Lime", description: "Black body / lime tail", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#A6E22E', families: ['black', 'chartreuse'] },
  { n: 55, id: 'fire-fly', name: "Fire Fly", description: "Dirty orange / chartreuse", primary: '#C8752A', secondary: '#C8752A', tail: '#D4F51A', families: ['orange', 'chartreuse'] },
  { n: 56, id: 'bubble-yum', name: "Bubble Yum", description: "Bubblegum pink / chartreuse", primary: '#FF8FC7', secondary: '#FF8FC7', tail: '#D4F51A', families: ['pink', 'chartreuse'] },
  { n: 57, id: 'mistake', name: "Mistake", description: "Olive green / chartreuse", primary: '#6B6B2E', secondary: '#6B6B2E', tail: '#D4F51A', families: ['green', 'chartreuse'] },
  { n: 58, id: 'black-gum', name: "Black Gum", description: "Black / turbo pink", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#FF2E93', families: ['black', 'pink'] },
  { n: 59, id: 'mississippi-gold', name: "Mississippi Gold", description: "Gold glitter body / bright orange tail", primary: '#D4A62A', secondary: '#D4A62A', tail: '#FF7A1A', flake: '#FFF3B0', families: ['yellow', 'orange'] },
  { n: 60, id: 'grasshopper', name: "Grasshopper", description: "Lime / pearl", primary: '#A6E22E', secondary: '#A6E22E', tail: '#F2EFE6', families: ['chartreuse', 'white'] },
];

const byId = new Map(colorways.map((c) => [c.id, c]));

export function getColorway(id: string | undefined): Colorway | undefined {
  return id ? byId.get(id) : undefined;
}

export const colorFamilyLabels: Record<string, string> = {
  chartreuse: 'Chartreuse',
  yellow: 'Yellow / Gold',
  green: 'Green',
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
  yellow: '#FFE135',
  green: '#367C2B',
  pink: '#FF5FA2',
  white: '#F6F3EA',
  blue: '#7EC4EA',
  black: '#1D1E1B',
  purple: '#5B2A86',
  orange: '#FF7A1A',
  red: '#D7262E',
  natural: '#7D7F6C',
};
