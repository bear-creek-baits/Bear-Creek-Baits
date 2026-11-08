import { dealers, type Dealer } from '@/data/dealers';
import type { Point } from '@/lib/geo';
import styles from './Dealers.module.css';

/**
 * Hand-drawn regional map of north Mississippi, north Alabama and west Tennessee, from the Delta to Decatur.
 * Drawn in SVG rather than loaded from a map service, so it works anywhere the site is hosted.
 * Geography is simplified to state lines (the Mississippi River line is approximate) and a few
 * towns for reference. No water is drawn.
 */

const BOUNDS = { latMin: 32.85, latMax: 35.35, lonMin: -91.45, lonMax: -86.55 };
const W = 640;
const K = Math.cos((34.1 * Math.PI) / 180); // shrink longitude so distances look right at this latitude
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
  // Mississippi / Alabama line: down the Tennessee River, then south, edging west
  path([
    [34.995, -88.2],
    [34.93, -88.15],
    [34.89, -88.1],
    [34.0, -88.2],
    [BOUNDS.latMin, -88.42],
  ]),
  // Mississippi River: Arkansas and Louisiana to the west
  path([
    [BOUNDS.latMax, -90.07],
    [35.0, -90.2],
    [34.53, -90.59],
    [33.85, -91.05],
    [33.4, -91.11],
    [33.0, -91.17],
    [BOUNDS.latMin, -91.14],
  ]),
];

const towns: { name: string; lat: number; lon: number }[] = [
  { name: 'Memphis', lat: 35.149, lon: -90.049 },
  { name: 'Oxford', lat: 34.366, lon: -89.519 },
  { name: 'Greenville', lat: 33.41, lon: -91.06 },
  { name: 'Columbus', lat: 33.496, lon: -88.427 },
  { name: 'Birmingham', lat: 33.52, lon: -86.81 },
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
    const labelLeft = d.labelLeft || px > W - 150;
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
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.map} role="img" aria-label="Map of Bear Creek Baits dealers in Mississippi, Alabama and Tennessee">
      <rect width={W} height={H} className={styles.mapBg} />
      {stateLines.map((d, i) => (
        <path key={i} d={d} className={styles.stateLine} />
      ))}
      <text x={x(-87.4)} y={y(35.2)} className={styles.stateLabel}>
        Tennessee
      </text>
      <text x={x(-90.0)} y={y(33.75)} className={styles.stateLabel}>
        Mississippi
      </text>
      <text x={x(-87.9)} y={y(33.15)} className={styles.stateLabel}>
        Alabama
      </text>
      <text x={x(-91.4)} y={y(34.3)} className={styles.stateLabel}>
        Ark.
      </text>

      {towns.map((t) => {
        // Label on the left of the dot near the right edge, so it isn't cut off (e.g. Birmingham).
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
