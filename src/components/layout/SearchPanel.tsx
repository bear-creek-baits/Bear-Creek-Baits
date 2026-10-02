'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { categories } from '@/data/categories';
import { formatPriceRange, searchProducts } from '@/lib/catalog';
import { ProductMedia } from '@/components/product/ProductMedia';
import { Icon } from '@/components/ui/Icon';
import { useDialog } from './useDialog';
import styles from './SearchPanel.module.css';

const suggestions = ['Chartreuse', 'Hair jig', 'Jig head', 'Pink', 'Bait box', 'Minnow'];

export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useDialog(open, panelRef, onClose, undefined, inputRef);

  useEffect(() => {
    if (!open) setQ('');
  }, [open]);

  const results = useMemo(() => searchProducts(q).slice(0, 6), [q]);
  const total = useMemo(() => searchProducts(q).length, [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search/?q=${encodeURIComponent(q.trim())}`);
    onClose();
  };

  return (
    <>
      <div className={`${styles.scrim} ${open ? styles.on : ''}`} onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.on : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        inert={!open}
      >
        <div className="container">
          <form className={styles.form} onSubmit={submit} role="search">
            <Icon name="search" size={24} className={styles.formIcon} />
            <label htmlFor="site-search" className="visually-hidden">
              Search products
            </label>
            <input
              ref={inputRef}
              id="site-search"
              type="search"
              className={styles.input}
              placeholder="Search baits, colors, jig heads…"
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close search">
              <Icon name="close" size={24} />
            </button>
          </form>

          <div className={styles.body} aria-live="polite">
            {!q.trim() ? (
              <div className={styles.idle}>
                <p className={styles.label}>Popular searches</p>
                <div className={styles.chips}>
                  {suggestions.map((s) => (
                    <button key={s} type="button" className={styles.chip} onClick={() => setQ(s)}>
                      {s}
                    </button>
                  ))}
                </div>
                <p className={styles.label}>Categories</p>
                <div className={styles.chips}>
                  {categories.map((c) => (
                    <Link key={c.slug} href={`/shop/${c.slug}/`} className={styles.chip} onClick={onClose}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : results.length ? (
              <>
                <p className={styles.label}>
                  {total} result{total === 1 ? '' : 's'}
                </p>
                <ul className={styles.results}>
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/products/${p.slug}/`} className={styles.result} onClick={onClose}>
                        <span className={styles.thumb}>
                          <ProductMedia product={p} labelled={false} />
                        </span>
                        <span>
                          <span className={styles.rTitle}>{p.title}</span>
                          <span className={styles.rMeta}>{formatPriceRange(p)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {total > results.length && (
                  <button type="submit" className="text-link" onClick={submit}>
                    See all {total} results <Icon name="arrow-right" size={18} />
                  </button>
                )}
              </>
            ) : (
              <p className={styles.empty}>
                Nothing matches “{q}”. Try a color like <button type="button" onClick={() => setQ('chartreuse')}>chartreuse</button> or a
                bait type like <button type="button" onClick={() => setQ('jig')}>jig</button>.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
