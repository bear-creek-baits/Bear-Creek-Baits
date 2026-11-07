import { dealers, type Dealer } from '@/data/dealers';
import type { Point } from '@/lib/geo';
import styles from './Dealers.module.css';

/**
 * Hand-drawn regional map of the Pickwick / Shoals area (where AL, MS and TN meet).
 * Drawn in SVG rather than loaded from a map service, so it works anywhere the site is hosted.
 * Geography is simplified to state lines and a few towns for reference. No water is drawn: a
 * hand-traced river and lake weren't accurate enough to show.
 */

const BOUNDS = { latMin: 34.22, latMax: 35.15, lonMin: -88.88, lonMax: -87.48 };
const W = 640;
const K = Math.cos((34.7 * Math.PI) / 180); // shrink longitude so distances look right at this latitude
const SCALE = W / ((BOUNDS.lonMax - BOUNDS.lonMin) * K);
const H = Math.round((BOUNDS.latMax - BOUNDS.latMin) * SCALE);

const x = (lon: number) => (lon - BOUNDS.lonMin) * K * SCALE;
const y = (lat: number) => (BOUNDS.latMax - lat) * SCALE;
const path = (pts: [number, number][]) => pts.map(([lat, lon], i) => `${i ? 'L' : 'M'}${x(lon).toFixed(1)} ${y(lat).toFixed(1)}`).join(' ');

export function inMapBounds(p: Point) {
  return p.lat >= BOUNDS.latMin && p.lat <= BOUNDS.latMax && p.lon >= BOUNDS.lonMin && p.lon <= BOUNDS.lonMax;
}

const stateLines = [
  // Tennessee's southern line
  path([
    [34.995, BOUNDS.lonMin],
    [34.995, BOUNDS.lonMax],
  ]),
  // Mississippi / Alabama line: down the Tennessee River, then nearly due south
  path([
    [34.995, -88.2],
    [34.93, -88.15],
    [34.89, -88.1],
    [BOUNDS.latMin, -88.15],
  ]),
];

const towns: { name: string; lat: number; lon: number }[] = [
  { name: 'Muscle Shoals', lat: 34.744, lon: -87.668 },
  { name: 'Iuka', lat: 34.811, lon: -88.19 },
  { name: 'Booneville', lat: 34.658, lon: -88.567 },
  { name: 'Red Bay', lat: 34.44, lon: -88.141 },
];

interface Props {
  origin?: (Point & { label: string }) | null;
  selectedId?: string | null;
  nearestId?: string | null;
  onSelect?: (id: string) => void;
}

export function DealerMap({ origin, selectedId, nearestId, onSelect }: Props) {
  const showOrigin = origin && inMapBounds(origin);
  const pin = (d: Dealer) => {
    const active = d.id === selectedId || (!selectedId && d.id === nearestId);
    const px = x(d.lon);
    const py = y(d.lat);
    const labelLeft = px > W - 150;
    return (
      <g
        key={d.id}
        className={`${styles.pin} ${active ? styles.pinActive : ''}`}
        transform={`translate(${px.toFixed(1)} ${py.toFixed(1)})`}
        onClick={onSelect ? () => onSelect(d.id) : undefined}
        role={onSelect ? 'button' : undefined}
        tabIndex={onSelect ? 0 : undefined}
        aria-label={onSelect ? `${d.name}, ${d.town}` : undefined}
        onKeyDown={
          onSelect
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(d.id);
                }
              }
            : undefined
        }
      >
        <path d="M0 0 C-9 -12 -13 -17 -13 -24 A13 13 0 1 1 13 -24 C13 -17 9 -12 0 0 Z" className={styles.pinShape} />
        <circle cy="-24" r="5" className={styles.pinDot} />
        <text x={labelLeft ? -18 : 18} y="-20" textAnchor={labelLeft ? 'end' : 'start'} className={styles.pinLabel}>
          {d.town.replace(/, [A-Z]{2}$/, '')}
        </text>
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.map} role="img" aria-label="Map of Bear Creek Baits dealers around Pickwick and the Shoals">
      <rect width={W} height={H} className={styles.mapBg} />
      {stateLines.map((d, i) => (
        <path key={i} d={d} className={styles.stateLine} />
      ))}
      <text x={x(-88.82)} y={y(35.09)} className={styles.stateLabel}>
        Tennessee
      </text>
      <text x={x(-88.82)} y={y(34.5)} className={styles.stateLabel}>
        Mississippi
      </text>
      <text x={x(-87.86)} y={y(34.3)} className={styles.stateLabel}>
        Alabama
      </text>

      {towns.map((t) => {
        // Label on the left of the dot near the right edge, so it isn't cut off (e.g. Muscle Shoals).
        const left = x(t.lon) > W - 110;
        return (
          <g key={t.name}>
            <circle cx={x(t.lon)} cy={y(t.lat)} r="2.6" className={styles.townDot} />
            <text x={x(t.lon) + (left ? -6 : 6)} y={y(t.lat) + 4} textAnchor={left ? 'end' : 'start'} className={styles.townLabel}>
              {t.name}
            </text>
          </g>
        );
      })}

      {showOrigin && (
        <g transform={`translate(${x(origin.lon).toFixed(1)} ${y(origin.lat).toFixed(1)})`}>
          <circle r="14" className={styles.youHalo} />
          <circle r="6" className={styles.you} />
          <text y="-14" textAnchor="middle" className={styles.youLabel}>
            {origin.label}
          </text>
        </g>
      )}

      {/* active pin last so it draws on top */}
      {[...dealers].sort((a, b) => Number(a.id === (selectedId ?? nearestId)) - Number(b.id === (selectedId ?? nearestId))).map(pin)}
    </svg>
  );
}
