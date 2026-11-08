/**
 * Shops that carry Bear Creek Baits.
 *
 * Shop names and towns come from Steve. Addresses and phone numbers were looked up in public
 * listings (October 2026) and should be confirmed with each shop before launch; see `verify`.
 * Map pins (lat/lon) are placed by hand from the street address, close enough for a regional map
 * and for ranking by distance. Directions links use the full street address.
 */
export interface Dealer {
  id: string;
  name: string;
  /** Town as people say it (may differ from the mailing city). */
  town: string;
  street: string;
  city: string;
  state: 'AL' | 'MS' | 'TN';
  zip: string;
  /** Left out when no number was found. */
  phone?: string;
  lat: number;
  lon: number;
  /** Put the map label on the left of the pin, where pins sit close together. */
  labelLeft?: boolean;
  /** Internal note on what still needs confirming. Not shown on the site. */
  verify?: string;
}

export const dealers: Dealer[] = [
  {
    id: 'cjs-belgreen',
    name: 'CJ’s Grocery, Bait & Tackle',
    town: 'Belgreen, AL',
    street: '14545 Highway 187',
    city: 'Russellville',
    state: 'AL',
    zip: '35653',
    phone: '(256) 332-1324',
    lat: 34.474,
    lon: -87.866,
    verify:
      'Listed as "CJ’s Grocery" at this address (Belgreen uses the Russellville mailing city). One map listing marks it closed, but the Franklin County Chamber recognized CJ’s Grocery Bait & Tackle in 2025.',
  },
  {
    id: 'second-amendment-corinth',
    name: '2nd Amendment Outdoors',
    town: 'Corinth, MS',
    street: '2804-A Highway 72 West',
    city: 'Corinth',
    state: 'MS',
    zip: '38834',
    phone: '(662) 594-8687',
    lat: 34.931,
    lon: -88.565,
    labelLeft: true,
    verify: 'Address and phone from gun-dealer directories; no official site found.',
  },
  {
    id: 'second-amendment-counce',
    name: '2nd Amendment Outdoors at the Lake',
    town: 'Counce, TN',
    street: '11310 Highway 57',
    city: 'Counce',
    state: 'TN',
    zip: '38326',
    phone: '(731) 412-7184',
    lat: 35.04,
    lon: -88.27,
    verify: 'Address and phone from a directory listing; listed hours were weekdays 8–5.',
  },
  {
    id: 'warehouse-tackle-florence',
    name: 'Warehouse Tackle',
    town: 'Florence, AL',
    street: '417 E College St',
    city: 'Florence',
    state: 'AL',
    zip: '35630',
    phone: '(256) 980-0951',
    lat: 34.8007,
    lon: -87.67,
  },
  {
    id: 'scruggs-tupelo',
    name: 'Scruggs Farm, Lawn & Garden',
    town: 'Tupelo, MS',
    street: '3575 Tom Watson Dr',
    city: 'Saltillo',
    state: 'MS',
    zip: '38866',
    phone: '(662) 620-6165',
    lat: 34.372,
    lon: -88.688,
    verify: 'Steve calls it the Tupelo store. The street address is in Saltillo, just north of Tupelo.',
  },
  {
    id: 'roys-store-lake-washington',
    name: 'Roy’s Store',
    town: 'Lake Washington, MS',
    street: '7 Roys Store Rd',
    city: 'Chatham',
    state: 'MS',
    zip: '38731',
    phone: '(662) 827-2588',
    lat: 33.06,
    lon: -91.04,
    verify:
      'Added from Steve (Nov 2026). Address and phone are from an older listing for Roy’s Store, Cabins & Campground; one map listing marks it closed. Confirm both.',
  },
  {
    id: 'dry-creek-marine-decatur',
    name: 'Dry Creek Marine',
    town: 'Decatur, AL',
    street: '451 McEntire Ln SW',
    city: 'Decatur',
    state: 'AL',
    zip: '35603',
    phone: '(256) 351-2628',
    lat: 34.565,
    lon: -87.02,
    verify: 'Added from Steve (Nov 2026). Address and phone from drycreekmarine.com (older listings show 306 Beltline Rd NW).',
  },
];

export function directionsUrl(d: Dealer): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.name}, ${d.street}, ${d.city}, ${d.state} ${d.zip}`)}`;
}
