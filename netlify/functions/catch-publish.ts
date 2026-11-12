/**
 * Runs every night: adds the day's approved catches to the site in a single commit (one rebuild
 * instead of one per catch). Nothing happens on nights with nothing approved.
 */
import type { Config } from '@netlify/functions';
import { publishApproved } from '../lib/catches';

export default async () => {
  const n = await publishApproved();
  console.log(`catch-publish: ${n} catch${n === 1 ? '' : 'es'} published`);
};

// 08:00 UTC = 2 or 3 AM in Mississippi.
export const config: Config = { schedule: '0 8 * * *' };
