import { getColorway } from './colors';
import { products } from './products';

/**
 * ==========================================================================
 *  CUSTOMER CATCHES
 * ==========================================================================
 * Photos customers sent in (first ones came from the Bear Creek Baits Facebook page, Nov 2026).
 * Nothing here is automatic: Steve picks which catches go up.
 *
 * To add one:
 *   1. Make a web copy of the photo: `node scripts/catch-photo.mjs "<photo.jpg>" public/catches/<name>.webp`
 *      (it turns the photo upright, shrinks it and strips location data).
 *   2. Add an entry below, newest first. `photos` takes one or two photos with the [width, height]
 *      the tool prints.
 *   3. Optional: `product` (a profile slug from src/data/products.ts), `size`, `color` (a chart color id
 *      from src/data/colors.ts, or any name if it isn't on the chart) and `place` (lake or state).
 *      Catches with a `product` also show on that profile's page.
 *   4. `home: true` puts it on the home page (the first four marked are shown).
 * ==========================================================================
 */
export interface CatchPhoto {
  src: string;
  width: number;
  height: number;
}

export interface Catch {
  id: string;
  /** Who caught it, as they want it shown. */
  name: string;
  /** Lake or state, if they shared it. */
  place?: string;
  /** Profile slug, e.g. 'swim-bait'. */
  product?: string;
  /** e.g. '1.5"' */
  size?: string;
  /** Chart color id (e.g. 'junebug'), or a plain name for a color not on the chart. */
  color?: string;
  photos: CatchPhoto[];
  /** Show on the home page. */
  home?: boolean;
}

const photo = (file: string, width: number, height: number): CatchPhoto => ({ src: `/catches/${file}.webp`, width, height });

export const catches: Catch[] = [
  {
    id: 'steve-evans-swim-bait',
    name: 'Steve Evans',
    place: 'Pickwick Lake',
    product: 'swim-bait',
    color: 'junebug',
    photos: [photo('steve-evans-swim-bait', 1050, 1400)],
    home: true,
  },
  {
    id: 'laurence-harrell-swim-bait',
    name: 'Laurence Harrell',
    place: 'Pickwick Lake',
    product: 'swim-bait',
    color: 'junebug',
    photos: [photo('laurence-harrell-swim-bait', 1050, 1400)],
    home: true,
  },
  {
    id: 'jon-shotts',
    name: 'Jon Shotts',
    place: 'Little Bear',
    product: 'flicker-minnow',
    size: '1.5"',
    color: 'delta-shad',
    photos: [photo('jon-shotts', 1400, 1400)],
    home: true,
  },
  {
    id: 'james-callaway',
    name: 'James Callaway',
    product: 'curly-tail',
    size: '2.2"',
    color: 'special-pink',
    photos: [photo('james-callaway', 1050, 1400)],
    home: true,
  },
  { id: 'roger-and-billy-don', name: 'Roger and Billy Don', photos: [photo('roger-and-billy-don', 945, 945)] },
  { id: 'steve-evans', name: 'Steve Evans', place: 'Pickwick Lake', photos: [photo('steve-evans', 1050, 1400)] },
  { id: 'laurence-harrell', name: 'Laurence Harrell', place: 'Pickwick Lake', photos: [photo('laurence-harrell', 1050, 1400)] },
  { id: 'eric-and-tonya', name: 'Eric and Tonya', photos: [photo('eric-and-tonya', 663, 1089)] },
];

export const homeCatches = () => catches.filter((c) => c.home).slice(0, 4);

export const catchesFor = (productSlug: string) => catches.filter((c) => c.product === productSlug);

/** A catch with its labels worked out, ready for the (client-side) grid. */
export interface CatchCard extends Catch {
  /** Profile name, e.g. "Flicker Minnow" ('' if not shared). */
  productTitle: string;
  /** e.g. '1.5" Flicker Minnow' ('' if not shared). */
  profileLabel: string;
  /** e.g. '#42 Delta Shad', or the name given for a color not on the chart. */
  colorLabel: string;
}

/** Done on the server so the browser doesn't have to load the whole catalog. */
export function toCards(list: Catch[]): CatchCard[] {
  return list.map((c) => {
    const p = products.find((x) => x.slug === c.product);
    const cw = c.color ? getColorway(c.color) : undefined;
    return {
      ...c,
      productTitle: p?.title ?? '',
      profileLabel: p ? [c.size, p.title].filter(Boolean).join(' ') : '',
      colorLabel: cw ? `#${cw.n} ${cw.name}` : (c.color ?? ''),
    };
  });
}
