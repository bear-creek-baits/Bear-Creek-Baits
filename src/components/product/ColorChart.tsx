'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ColorFamily } from '@/lib/types';
import { colorFamilyLabels, colorFamilySwatch, getColorway, unphotographedColors } from '@/data/colors';
import { ColorChip } from './ColorChip';
import styles from './ColorChart.module.css';

interface Props {
  /** Color ids, in chart order. */
  values: string[];
  selected: string;
  onChange: (value: string) => void;
  /** id of the legend that names this group. */
  labelledBy: string;
}

/**
 * The color step of the product page: the numbered color chart as a grid of radio tiles, with a
 * name/number search and color-family chips to narrow it down.
 */
export function ColorChart({ values, selected, onChange, labelledBy }: Props) {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<ColorFamily | null>(null);

  const families = useMemo(() => {
    const set = new Set<ColorFamily>();
    values.forEach((id) => getColorway(id)?.families.forEach((f) => set.add(f)));
    return Object.keys(colorFamilyLabels).filter((f): f is ColorFamily => set.has(f as ColorFamily));
  }, [values]);

  const shown = useMemo(() => {
    const q = query.toLowerCase().replace(/['#]/g, '').trim();
    return values.filter((id) => {
      const cw = getColorway(id);
      if (!cw) return false;
      if (family && !cw.families.includes(family)) return false;
      if (!q) return true;
      if (/^\d+$/.test(q)) return String(cw.n) === q;
      return `${cw.name} ${cw.description}`.toLowerCase().replace(/'/g, '').includes(q);
    });
  }, [values, query, family]);

  // Roving tab stop: the selected tile, or the first one shown when the selection is filtered out.
  const tabStop = shown.includes(selected) ? selected : shown[0];

  return (
    <div className={styles.chart}>
      <div className={styles.tools}>
        <label className={styles.search}>
          <span className="visually-hidden">Find a color by name or number</span>
          <input
            type="search"
            className="input"
            placeholder="Find by name or number…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </label>
        <div className={styles.families} role="group" aria-label="Filter by color family">
          <button type="button" className={`${styles.fam} ${family === null ? styles.famOn : ''}`} aria-pressed={family === null} onClick={() => setFamily(null)}>
            All {values.length}
          </button>
          {families.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.fam} ${family === f ? styles.famOn : ''}`}
              aria-pressed={family === f}
              onClick={() => setFamily(family === f ? null : f)}
            >
              <span className={styles.famDot} style={{ background: colorFamilySwatch[f] }} aria-hidden="true" />
              {colorFamilyLabels[f]}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className={styles.empty}>
          No colors match. <button type="button" onClick={() => { setQuery(''); setFamily(null); }}>Show all colors</button>
        </p>
      ) : (
        <div className={styles.grid} role="radiogroup" aria-labelledby={labelledBy}>
          {shown.map((id, idx) => {
            const cw = getColorway(id)!;
            const isSel = id === selected;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={isSel}
                aria-label={`#${cw.n} ${cw.name}, ${cw.description}`}
                tabIndex={id === tabStop ? 0 : -1}
                className={`${styles.tile} ${isSel ? styles.sel : ''}`}
                onClick={() => onChange(id)}
                onKeyDown={(e) => {
                  const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
                  if (!keys.includes(e.key)) return;
                  e.preventDefault();
                  const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
                  const next = (idx + dir + shown.length) % shown.length;
                  onChange(shown[next]);
                  (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
                }}
              >
                <span className={styles.art}>
                  <ColorChip color={id} className={styles.chip} />
                </span>
                <span className={styles.label}>
                  <span className={styles.n}>{cw.n}</span>
                  <span className={styles.name}>{cw.name}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
      <p className={styles.foot}>
        {unphotographedColors() && `Colors ${unphotographedColors()} are drawn until they’re photographed. `}
        <Link href="/colors/">See the full color chart</Link>
      </p>
    </div>
  );
}
