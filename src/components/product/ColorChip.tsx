'use client';

// Client component on purpose: asset() needs the browser to know the preview build's sub-folder.
import { getColorway } from '@/data/colors';
import { asset } from '@/lib/asset';
import { PhotoComingSoon } from './PhotoComingSoon';

/** One color as it appears on the color chart: the chart's photo of it, or "photo coming soon". */
export function ColorChip({ color, className }: { color: string; className?: string }) {
  const cw = getColorway(color);
  if (!cw) return null;
  if (cw.chartPhoto) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={asset(cw.chartPhoto)} alt="" width={480} height={200} loading="lazy" decoding="async" className={className} />;
  }
  return <PhotoComingSoon className={className} />;
}
