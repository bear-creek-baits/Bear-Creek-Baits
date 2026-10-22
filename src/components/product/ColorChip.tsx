'use client';

// Client component on purpose: asset() needs the browser to know the preview build's sub-folder.
import { getColorway } from '@/data/colors';
import { asset } from '@/lib/asset';

const FLAKES: [number, number, number][] = [
  [22, 22, 1.3], [34, 28, 1.1], [45, 19, 1.3], [56, 30, 1.1], [64, 22, 1.2], [80, 27, 1.3], [92, 20, 1.1],
  [104, 29, 1.2], [116, 24, 1.1], [28, 31, 0.9], [50, 25, 0.9], [74, 19, 0.9], [98, 25, 0.9],
];

/**
 * One color as it appears on the color chart: the chart's photo of it, or (for colors not photographed
 * yet) a drawn curly tail in the color's head, tail and glitter colors.
 */
export function ColorChip({ color, className }: { color: string; className?: string }) {
  const cw = getColorway(color);
  if (!cw) return null;
  if (cw.chartPhoto) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={asset(cw.chartPhoto)} alt="" width={480} height={200} loading="lazy" decoding="async" className={className} />;
  }
  const tail = cw.tail ?? cw.primary;
  return (
    <svg viewBox="0 0 160 50" className={className} aria-hidden="true" focusable="false">
      <path d="M70 14 C100 14 118 18 132 22 L151 11 C155 20 155 30 151 39 L132 28 C118 32 100 36 70 36 Z" fill={tail} stroke="rgba(0,0,0,0.22)" />
      <path d="M71 14 C40 12 14 16 7 25 C14 34 40 38 71 36 Z" fill={cw.primary} stroke="rgba(0,0,0,0.22)" />
      {cw.flake && (
        <g fill={cw.flake}>
          {FLAKES.map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      )}
      <circle cx="20" cy="23" r="2.6" fill="#141412" opacity="0.75" />
    </svg>
  );
}
