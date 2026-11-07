'use client';

// Client component on purpose: asset() needs the browser to know the preview build's sub-folder.
import { getColorway } from '@/data/colors';
import { asset } from '@/lib/asset';
import { PhotoComingSoon } from './PhotoComingSoon';
import styles from './ColorChip.module.css';

/**
 * One color as it appears on the color chart: the chart's photo of it, or "photo coming soon".
 * Always a 2:1 box (the chart photos' shape) with the whole bait scaled to fit, so nothing is cropped.
 */
export function ColorChip({ color, className }: { color: string; className?: string }) {
  const cw = getColorway(color);
  if (!cw) return null;
  return (
    <span className={`${styles.chip} ${className ?? ''}`}>
      {cw.chartPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(cw.chartPhoto)} alt="" width={480} height={240} loading="lazy" decoding="async" className={styles.img} />
      ) : (
        <PhotoComingSoon className={styles.img} />
      )}
    </span>
  );
}
