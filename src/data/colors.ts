import type { Colorway } from '@/lib/types';

/**
 * COLOR CHART
 * -----------
 * The numbered colors on Steve's color chart (the "Bear Creek Baits Color Chart" design), in chart
 * order. Every profile can be ordered in every color, and the site counts this list wherever it says
 * how many colors there are. `primary` is the head/body color and `tail` the tail color when it
 * differs; `flake` is the glitter. `chartPhoto` is the chart's photo of the color; colors without one
 * are drawn from their hex values until they're photographed. Hex values are approximations.
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
  { n: 12, id: 'blue-moon', name: "Blue Moon", description: "Black / sky blue", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#63B8FF', families: ['black', 'blue'], chartPhoto: '/colors/12-blue-moon.webp' },
  { n: 13, id: 'monkey-shine', name: "Monkey Shine", description: "Monkey milk / red glitter", primary: '#EDE6E1', secondary: '#EDE6E1', tail: '#F3D6D6', flake: '#D7263D', families: ['white', 'red'], chartPhoto: '/colors/13-monkey-shine.webp' },
  { n: 14, id: 'ole-fish-eggs', name: "Ole Fish Eggs", description: "Yellow, red glitter / pearl tail", primary: '#FFE135', secondary: '#FFE135', tail: '#F2EFE6', flake: '#D7263D', families: ['yellow', 'white'], chartPhoto: '/colors/14-ole-fish-eggs.webp' },
  { n: 15, id: 'red-wasp', name: "Red Wasp", description: "Black / red", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#D7263D', families: ['black', 'red'], chartPhoto: '/colors/15-red-wasp.webp' },
  { n: 16, id: 'copper-top', name: "Copper Top", description: "Copper / yellow laminate", primary: '#B87333', secondary: '#B87333', tail: '#FFE135', families: ['orange', 'yellow'], chartPhoto: '/colors/16-copper-top.webp' },
  { n: 17, id: 'bad-azz', name: "Bad Azz", description: "Olive green / flo red", primary: '#6B6B2E', secondary: '#6B6B2E', tail: '#FF3B3B', families: ['green', 'red'], chartPhoto: '/colors/17-bad-azz.webp' },
  { n: 18, id: 'shiny-hiney', name: "Shiny Hiney", description: "Chrome / chartreuse", primary: '#B8C2CC', secondary: '#B8C2CC', tail: '#D4F51A', families: ['natural', 'chartreuse'], chartPhoto: '/colors/18-shiny-hiney.webp' },
  { n: 19, id: 'dragon-fire', name: "Dragon Fire", description: "John Deere green / orange", primary: '#367C2B', secondary: '#367C2B', tail: '#FF7A1A', families: ['green', 'orange'], chartPhoto: '/colors/19-dragon-fire.webp' },
  { n: 20, id: 'limeaid', name: "Limeaid", description: "John Deere green / black", primary: '#367C2B', secondary: '#367C2B', tail: '#1A1A1A', families: ['green', 'black'], chartPhoto: '/colors/20-limeaid.webp' },
  { n: 21, id: 'jolly-rancher', name: "Jolly Rancher", description: "John Deere green / purple", primary: '#367C2B', secondary: '#367C2B', tail: '#7B2CBF', families: ['green', 'purple'], chartPhoto: '/colors/21-jolly-rancher.webp' },
  { n: 22, id: 'pick-wick-magic', name: "Pick Wick Magic", description: "Red / John Deere green", primary: '#D7263D', secondary: '#D7263D', tail: '#367C2B', families: ['red', 'green'], chartPhoto: '/colors/22-pick-wick-magic.webp' },
  { n: 23, id: 'acid-rain', name: "Acid Rain", description: "Yellow, white, green chartreuse laminate", primary: '#FFE135', secondary: '#FFE135', tail: '#9BD62B', families: ['yellow', 'chartreuse'], chartPhoto: '/colors/23-acid-rain.webp' },
  { n: 24, id: 'lemon-delight', name: "Lemon Delight", description: "Yellow with red glitter / silver glitter", primary: '#FFE135', secondary: '#FFE135', tail: '#C9CED6', flake: '#D7263D', families: ['yellow', 'natural'], chartPhoto: '/colors/24-lemon-delight.webp' },
  { n: 25, id: 'crappie-candy', name: "Crappie Candy", description: "Light purple / chartreuse, red glitter", primary: '#B79CED', secondary: '#B79CED', tail: '#D4F51A', flake: '#D7263D', families: ['purple', 'chartreuse'], chartPhoto: '/colors/25-crappie-candy.webp' },
  { n: 26, id: 'ole-faithful', name: "Ole Faithful", description: "Black / chartreuse", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#D4F51A', families: ['black', 'chartreuse'], chartPhoto: '/colors/26-ole-faithful.webp' },
  { n: 27, id: 'monkey-snot', name: "Monkey Snot", description: "Monkey milk, chartreuse laminate / chartreuse tail", primary: '#EDE6E1', secondary: '#EDE6E1', tail: '#D4F51A', families: ['white', 'chartreuse'], chartPhoto: '/colors/27-monkey-snot.webp' },
  { n: 28, id: 'ol-yeller', name: "Ol' Yeller", description: "Yellow / monkey milk", primary: '#FFE135', secondary: '#FFE135', tail: '#EDE6E1', families: ['yellow', 'white'], chartPhoto: '/colors/28-ol-yeller.webp' },
  { n: 29, id: 'silver-streak', name: "Silver Streak", description: "Solid silver glitter", primary: '#C9CED6', secondary: '#C9CED6', flake: '#FFFFFF', families: ['natural'], chartPhoto: '/colors/29-silver-streak.webp' },
  { n: 30, id: 'triple-threat', name: "Triple Threat", description: "Black / blue / chartreuse laminate", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#1E5BD8', families: ['black', 'blue', 'chartreuse'], chartPhoto: '/colors/30-triple-threat.webp' },
  { n: 31, id: 'blue-monkey', name: "Blue Monkey", description: "Monkey milk / blue", primary: '#EDE6E1', secondary: '#EDE6E1', tail: '#1E5BD8', families: ['white', 'blue'], chartPhoto: '/colors/31-blue-monkey.webp' },
  { n: 32, id: 'meat-getter', name: "Meat Getter", description: "Blue / white", primary: '#1E5BD8', secondary: '#1E5BD8', tail: '#FAFAFA', families: ['blue', 'white'], chartPhoto: '/colors/32-meat-getter.webp' },
  { n: 33, id: 'blue-treuse', name: "Blue Treuse", description: "Dark blue / chartreuse tail", primary: '#1B2A6B', secondary: '#1B2A6B', tail: '#D4F51A', families: ['blue', 'chartreuse'], chartPhoto: '/colors/33-blue-treuse.webp' },
  { n: 34, id: 'cherry-bomb', name: "Cherry Bomb", description: "Cherry / pearl tail", primary: '#C2185B', secondary: '#C2185B', tail: '#F2EFE6', families: ['red', 'white'], chartPhoto: '/colors/34-cherry-bomb.webp' },
  { n: 35, id: 'halloween', name: "Halloween", description: "Orange / black", primary: '#FF7A1A', secondary: '#FF7A1A', tail: '#1A1A1A', families: ['orange', 'black'] },
  { n: 36, id: 'monkey-shine-extreme', name: "Monkey Shine Extreme", description: "Monkey milk, red glitter / red glitter tail", primary: '#EDE6E1', secondary: '#EDE6E1', tail: '#D7263D', flake: '#D7263D', families: ['white', 'red'] },
  { n: 37, id: 'electric-chicken', name: "Electric Chicken", description: "Bubble gum / green chartreuse laminate", primary: '#FF8FC7', secondary: '#FF8FC7', tail: '#9BD62B', families: ['pink', 'chartreuse'] },
  { n: 38, id: 'junebug', name: "Junebug", description: "Purple with green glitter", primary: '#7B2CBF', secondary: '#7B2CBF', flake: '#4CD964', families: ['purple'], chartPhoto: '/colors/38-junebug.webp' },
  { n: 39, id: 'blackout', name: "Blackout", description: "Black / silver glitter", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#C9CED6', flake: '#FFFFFF', families: ['black', 'natural'] },
  { n: 40, id: 'ocean-breeze', name: "Ocean Breeze", description: "Blue top / green chartreuse bottom", primary: '#1E5BD8', secondary: '#1E5BD8', tail: '#9BD62B', families: ['blue', 'chartreuse'] },
  { n: 41, id: 'country-fair', name: "Country Fair", description: "Light pink and chartreuse", primary: '#F8B6D0', secondary: '#F8B6D0', tail: '#D4F51A', families: ['pink', 'chartreuse'], chartPhoto: '/colors/41-country-fair.webp' },
  { n: 42, id: 'delta-shad', name: "Delta Shad", description: "Translucent black with silver bottom", primary: '#3A3A3A', secondary: '#3A3A3A', tail: '#C9CED6', families: ['black', 'natural'] },
  { n: 43, id: 'hawk-tuah', name: "Hawk Tuah", description: "White body / translucent lime tail", primary: '#FAFAFA', secondary: '#FAFAFA', tail: '#C8F07A', families: ['white', 'chartreuse'], chartPhoto: '/colors/43-hawk-tuah.webp' },
  { n: 44, id: 'no-smoke', name: "No Smoke", description: "Very light translucent / black with glitter", primary: '#E8E8E2', secondary: '#E8E8E2', tail: '#1A1A1A', flake: '#C9CED6', families: ['white', 'black'] },
  { n: 45, id: 'mississippi-blues', name: "Mississippi Blues", description: "Blue / blue", primary: '#1E5BD8', secondary: '#1E5BD8', tail: '#63B8FF', families: ['blue'] },
  { n: 46, id: 'orange-float', name: "Orange Float", description: "Orange / lime laminate", primary: '#FF7A1A', secondary: '#FF7A1A', tail: '#A6E22E', families: ['orange', 'chartreuse'] },
  { n: 47, id: 'dirty-girl', name: "Dirty Girl", description: "Black and green chartreuse", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#9BD62B', families: ['black', 'chartreuse'] },
  { n: 48, id: 'old-faithful-lime', name: "Old Faithful Lime", description: "Black body / lime tail", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#A6E22E', families: ['black', 'chartreuse'] },
  { n: 49, id: 'bubble-yum', name: "Bubble Yum", description: "Bubblegum pink / chartreuse", primary: '#FF8FC7', secondary: '#FF8FC7', tail: '#D4F51A', families: ['pink', 'chartreuse'] },
  { n: 50, id: 'mississippi-gold', name: "Mississippi Gold", description: "Gold glitter body / bright orange tail", primary: '#D4A62A', secondary: '#D4A62A', tail: '#FF7A1A', flake: '#FFF3B0', families: ['yellow', 'orange'], chartPhoto: '/colors/50-mississippi-gold.webp' },
  { n: 51, id: 'dynamite', name: "Dynamite", description: "Chartreuse with red glitter", primary: '#D4F51A', secondary: '#D4F51A', flake: '#D7263D', families: ['chartreuse', 'red'], chartPhoto: '/colors/51-dynamite.webp' },
  { n: 52, id: 'june-bug-extreme', name: "June Bug Extreme", description: "Details coming soon", primary: '#7B2CBF', secondary: '#7B2CBF', flake: '#4CD964', families: ['purple'], chartPhoto: '/colors/52-june-bug-extreme.webp' },
  { n: 53, id: 'blue-flo-red', name: "Blue - Flo. Red", description: "Blue glitter / flo red laminate, chartreuse tail", primary: '#1E5BD8', secondary: '#1E5BD8', tail: '#D4F51A', flake: '#CFE3FF', families: ['blue', 'red', 'chartreuse'], chartPhoto: '/colors/53-blue-flo-red.webp' },
  { n: 54, id: 'blue-ice', name: "Blue Ice", description: "Clear with blue glitter", primary: '#CFE6F2', secondary: '#CFE6F2', flake: '#1E5BD8', families: ['blue', 'white'], chartPhoto: '/colors/54-blue-ice.webp' },
  { n: 55, id: 'blue-ice-char-tail', name: "Blue Ice - Char. Tail", description: "Clear with blue glitter / chartreuse tail", primary: '#CFE6F2', secondary: '#CFE6F2', tail: '#D4F51A', flake: '#1E5BD8', families: ['blue', 'chartreuse'], chartPhoto: '/colors/55-blue-ice-char-tail.webp' },
  { n: 56, id: 'blue-ice-lime', name: "Blue Ice Lime", description: "Clear with blue glitter / lime tail", primary: '#CFE6F2', secondary: '#CFE6F2', tail: '#A6E22E', flake: '#1E5BD8', families: ['blue', 'chartreuse'], chartPhoto: '/colors/56-blue-ice-lime.webp' },
  { n: 57, id: 'crown-royal', name: "Crown Royal", description: "Navy with blue glitter / chartreuse tail", primary: '#1B2A6B', secondary: '#1B2A6B', tail: '#D4F51A', flake: '#1E5BD8', families: ['blue', 'chartreuse'], chartPhoto: '/colors/57-crown-royal.webp' },
  { n: 58, id: 'ghost', name: "Ghost", description: "Clear with silver glitter", primary: '#E8E8E2', secondary: '#E8E8E2', flake: '#C9CED6', families: ['white', 'natural'], chartPhoto: '/colors/58-ghost.webp' },
  { n: 59, id: 'hell-cat', name: "Hell Cat", description: "Black with multicolor glitter / chartreuse tail", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#D4F51A', flake: '#FF4FA3', families: ['black', 'chartreuse'], chartPhoto: '/colors/59-hell-cat.webp' },
  { n: 60, id: 'laurence-grubs', name: "Laurence Grubs", description: "Blue glitter / green chartreuse laminate, chartreuse tail", primary: '#083057', secondary: '#083057', tail: '#D4F51A', flake: '#0950B4', families: ['blue', 'chartreuse'], chartPhoto: '/colors/60-laurence-grubs.webp' },
  { n: 61, id: 'monkey-milk-junebug-tail', name: "Monkey Milk - Junebug Tail", description: "Monkey milk / purple glitter tail", primary: '#EDE6E1', secondary: '#EDE6E1', tail: '#7B2CBF', families: ['white', 'purple'], chartPhoto: '/colors/61-monkey-milk-junebug-tail.webp' },
  { n: 62, id: 'old-faithful-pink', name: "Old Faithful - Pink", description: "Black / pink tail", primary: '#1A1A1A', secondary: '#1A1A1A', tail: '#FF4FA3', families: ['black', 'pink'], chartPhoto: '/colors/62-old-faithful-pink.webp' },
  { n: 63, id: 'special-pink', name: "Special Pink", description: "Hot pink with blue glitter", primary: '#FF4FA3', secondary: '#FF4FA3', flake: '#1E5BD8', families: ['pink', 'blue'], chartPhoto: '/colors/63-special-pink.webp' },
];

/** e.g. "35–37, 39 and 42" for the chart colors that have no photo yet. Empty when every color has one. */
export function unphotographedColors(): string {
  const ns = colorways.filter((c) => !c.chartPhoto).map((c) => c.n);
  const parts: string[] = [];
  for (let i = 0; i < ns.length; ) {
    let j = i;
    while (j + 1 < ns.length && ns[j + 1] === ns[j] + 1) j++;
    parts.push(i === j ? `${ns[i]}` : `${ns[i]}–${ns[j]}`);
    i = j + 1;
  }
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}` : (parts[0] ?? '');
}

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
