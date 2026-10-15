'use client';

import { useMemo, useState } from 'react';
import { dealers, directionsUrl } from '@/data/dealers';
import { locateZip, milesBetween, type Point } from '@/lib/geo';
import { Icon } from '@/components/ui/Icon';
import { DealerMap, inMapBounds } from './DealerMap';
import styles from './Dealers.module.css';

type Origin = Point & { label: string; zip: string; approximate: boolean };

export function DealerFinder() {
  const [zip, setZip] = useState('');
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const ranked = useMemo(() => {
    const list = dealers.map((d) => ({ dealer: d, miles: origin ? milesBetween(origin, d) : null }));
    return origin ? list.sort((a, b) => (a.miles ?? 0) - (b.miles ?? 0)) : list;
  }, [origin]);
  const nearest = origin ? ranked[0] : null;

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const z = zip.trim();
    if (!/^\d{5}$/.test(z)) {
      setError('Enter a 5-digit zip code.');
      return;
    }
    const p = locateZip(z);
    if (!p) {
      setError(`We couldn’t find ${z}. Check the zip code and try again.`);
      return;
    }
    setError('');
    setSelectedId(null);
    setOrigin({ ...p, zip: z, label: z });
  };

  const select = (id: string) => {
    setSelectedId(id);
    document.getElementById(`dealer-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div className={styles.finder}>
      <div className={`${styles.finderSide} ${styles.areaSearch}`}>
        <form className={styles.search} onSubmit={search} noValidate>
          <label htmlFor="dealer-zip">Your zip code</label>
          <div className={styles.searchRow}>
            <input
              id="dealer-zip"
              className="input"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="e.g. 38834"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
              aria-invalid={!!error}
              aria-describedby={error ? 'dealer-zip-error' : undefined}
            />
            <button type="submit" className="btn">
              <Icon name="search" size={18} /> Find closest
            </button>
          </div>
          {error && (
            <p id="dealer-zip-error" className="field-error">
              {error}
            </p>
          )}
        </form>

        <p className={styles.status} role="status" aria-live="polite">
          {nearest
            ? `Closest to ${origin!.zip}: ${nearest.dealer.name} in ${nearest.dealer.town}, about ${Math.round(nearest.miles!)} miles away.${
                inMapBounds(origin!) ? '' : ' Your zip is off the map, so only the shops are shown.'
              }`
            : `${dealers.length} shops around Pickwick Lake and the Shoals carry Bear Creek Baits.`}
        </p>
      </div>

      <div className={`${styles.mapWrap} ${styles.areaMap}`}>
        <DealerMap origin={origin} selectedId={selectedId} nearestId={nearest?.dealer.id ?? null} onSelect={select} />
      </div>

      <div className={`${styles.finderSide} ${styles.areaList}`}>

        <ol className={styles.list}>
          {ranked.map(({ dealer: d, miles }, i) => {
            const active = d.id === selectedId || (!selectedId && origin && i === 0);
            return (
              <li key={d.id} id={`dealer-${d.id}`} className={`${styles.card} ${active ? styles.cardActive : ''}`}>
                <button type="button" className={styles.cardMain} onClick={() => setSelectedId(d.id)} aria-pressed={!!active}>
                  <span className={styles.cardHead}>
                    <strong>{d.name}</strong>
                    {miles !== null && <span className={styles.miles}>{Math.round(miles)} mi</span>}
                  </span>
                  {origin && i === 0 && <span className={styles.closest}>Closest to you</span>}
                  <span className={styles.town}>{d.town}</span>
                  <span className={styles.addr}>
                    {d.street}, {d.city}, {d.state} {d.zip}
                  </span>
                </button>
                <span className={styles.cardActions}>
                  <a href={`tel:${d.phone.replace(/\D/g, '')}`} className={styles.phone}>
                    {d.phone}
                  </a>
                  <a href={directionsUrl(d)} target="_blank" rel="noopener noreferrer" className={styles.directions}>
                    Directions <Icon name="arrow-right" size={16} />
                  </a>
                </span>
              </li>
            );
          })}
        </ol>
        <p className={styles.fine}>Distances are straight-line miles. Call ahead to check what’s in stock.</p>
      </div>
    </div>
  );
}
