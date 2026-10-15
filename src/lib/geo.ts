import { localZips, zip3Areas } from '@/data/zip-locations';

export interface Point {
  lat: number;
  lon: number;
}

let local: Map<string, Point> | null = null;
let areas: Map<string, Point> | null = null;

function parse(data: string): Map<string, Point> {
  const m = new Map<string, Point>();
  for (const row of data.split('|')) {
    const [key, ll] = row.split(':');
    const [lat, lon] = ll.split(',').map(Number);
    m.set(key, { lat, lon });
  }
  return m;
}

/**
 * Location for a 5-digit US zip. Alabama, Mississippi and Tennessee zips are exact;
 * anywhere else uses the middle of the zip's 3-digit area (`approximate: true`).
 */
export function locateZip(zip: string): (Point & { approximate: boolean }) | null {
  if (!/^\d{5}$/.test(zip)) return null;
  local ??= parse(localZips);
  const exact = local.get(zip);
  if (exact) return { ...exact, approximate: false };
  areas ??= parse(zip3Areas);
  const area = areas.get(zip.slice(0, 3));
  return area ? { ...area, approximate: true } : null;
}

/** Straight-line distance in miles. */
export function milesBetween(a: Point, b: Point): number {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(h));
}
