'use client';

// Client component: asset() needs the browser to know the preview build's sub-folder, and the photo
// viewer and profile filter are interactive.
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import type { CatchCard } from '@/data/catches';
import { asset } from '@/lib/asset';
import { useDialog } from '@/components/layout/useDialog';
import { Icon } from '@/components/ui/Icon';
import styles from './Catches.module.css';

interface Props {
  catches: CatchCard[];
  /** Show "All / Swim Bait / ..." buttons above the grid. */
  filter?: boolean;
  /** Hide the bait line (on a profile's own page it would repeat the page). */
  hideProfile?: boolean;
}

export function CatchGrid({ catches, filter, hideProfile }: Props) {
  const [profile, setProfile] = useState<string>('all');
  const [open, setOpen] = useState<{ c: CatchCard; i: number } | null>(null);

  const profiles = useMemo(() => {
    const seen = new Map<string, string>();
    for (const c of catches) if (c.product && c.productTitle) seen.set(c.product, c.productTitle);
    return [...seen].map(([slug, title]) => ({ slug, title }));
  }, [catches]);
  const shown = profile === 'all' ? catches : catches.filter((c) => c.product === profile);

  return (
    <>
      {filter && profiles.length > 0 && (
        <div className={styles.filter} role="group" aria-label="Show catches on">
          {[{ slug: 'all', title: 'All catches' }, ...profiles].map((p) => (
            <button key={p.slug} type="button" className={styles.chip} aria-pressed={profile === p.slug} onClick={() => setProfile(p.slug)}>
              {p.title}
            </button>
          ))}
        </div>
      )}
      <ul className={styles.grid}>
        {shown.map((c) => {
          const first = c.photos[0];
          return (
            <li key={c.id} className={styles.card}>
              <button type="button" className={styles.photoBtn} onClick={() => setOpen({ c, i: 0 })} aria-label={`View ${c.name}’s catch`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(first.src)} alt="" width={first.width} height={first.height} loading="lazy" decoding="async" />
                {c.photos.length > 1 && <span className={styles.count}>{c.photos.length} photos</span>}
              </button>
              <div className={styles.caption}>
                <strong>{c.name}</strong>
                {!hideProfile && c.profileLabel && (
                  <Link href={`/products/${c.product}/`} className={styles.bait}>
                    {c.profileLabel}
                  </Link>
                )}
                {hideProfile && c.size && <span>{c.size}</span>}
                {c.colorLabel && <span>{c.colorLabel}</span>}
                {c.place && <span className={styles.place}>{c.place}</span>}
              </div>
            </li>
          );
        })}
      </ul>
      {open && <Viewer c={open.c} start={open.i} onClose={() => setOpen(null)} />}
    </>
  );
}

function Viewer({ c, start, onClose }: { c: CatchCard; start: number; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(start);
  useDialog(true, ref, onClose);
  const p = c.photos[i];
  const label = [c.profileLabel, c.colorLabel].filter(Boolean).join(' · ');
  return (
    <div className={styles.viewer} role="dialog" aria-modal="true" aria-label={`${c.name}’s catch`} ref={ref} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button type="button" className={styles.viewerClose} onClick={onClose} aria-label="Close">
        <Icon name="close" size={26} />
      </button>
      <figure className={styles.viewerFig}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(p.src)} alt={`${c.name} with a crappie${label ? ` caught on a ${label}` : ''}`} width={p.width} height={p.height} />
        <figcaption>
          <strong>{c.name}</strong>
          {label && <span> · {label}</span>}
          {c.place && <span> · {c.place}</span>}
          {c.photos.length > 1 && (
            <span className={styles.viewerNav}>
              {c.photos.map((_, n) => (
                <button key={n} type="button" aria-label={`Photo ${n + 1}`} aria-pressed={n === i} onClick={() => setI(n)}>
                  {n + 1}
                </button>
              ))}
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
