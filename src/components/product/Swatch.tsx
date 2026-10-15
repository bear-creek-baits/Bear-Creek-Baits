import { getColorway } from '@/data/colors';
import styles from './Swatch.module.css';

/** Round color chip. Two-tone and tail colorways split diagonally; flake colors get a speckle. */
export function Swatch({ color, size = 36, selected, unavailable }: { color: string; size?: number; selected?: boolean; unavailable?: boolean }) {
  const cw = getColorway(color);
  const p = cw?.primary ?? '#ccc';
  const s = cw?.tail ?? cw?.secondary ?? p;
  const bg =
    p === s ? p : `linear-gradient(135deg, ${p} 0 50%, ${s} 50% 100%)`;
  return (
    <span
      className={`${styles.swatch} ${selected ? styles.selected : ''} ${unavailable ? styles.unavailable : ''}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className={styles.fill} style={{ background: bg }}>
        {cw?.flake && (
          <span
            className={styles.flake}
            style={{ backgroundImage: `radial-gradient(${cw.flake} 1px, transparent 1.4px)` }}
          />
        )}
      </span>
    </span>
  );
}
