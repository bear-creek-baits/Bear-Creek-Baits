'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import type { CategorySlug, ColorFamily, Product } from '@/lib/types';
import { categories } from '@/data/categories';
import { colorFamilyLabels, colorFamilySwatch } from '@/data/colors';
import { isAvailable, priceRange, productColorFamilies } from '@/lib/catalog';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Icon } from '@/components/ui/Icon';
import { useDialog } from '@/components/layout/useDialog';
import styles from './ShopView.module.css';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'name';

interface Props {
  products: Product[];
  activeCategory?: CategorySlug;
  counts: Record<string, number>;
  total: number;
}

export function ShopView({ products, activeCategory, counts, total }: Props) {
  const [families, setFamilies] = useState<Set<ColorFamily>>(new Set());
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState<Sort>('featured');
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  useDialog(sheetOpen, sheetRef, () => setSheetOpen(false), filterBtnRef);

  const availableFamilies = useMemo(() => {
    const s = new Set<ColorFamily>();
    products.forEach((p) => productColorFamilies(p).forEach((f) => s.add(f)));
    return (Object.keys(colorFamilyLabels) as ColorFamily[]).filter((f) => s.has(f));
  }, [products]);

  const visible = useMemo(() => {
    let list = products.filter((p) => {
      if (inStock && !isAvailable(p)) return false;
      if (families.size) {
        const pf = productColorFamilies(p);
        if (![...families].some((f) => pf.has(f))) return false;
      }
      return true;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => priceRange(a).min - priceRange(b).min);
    if (sort === 'price-desc') list = [...list].sort((a, b) => priceRange(b).min - priceRange(a).min);
    if (sort === 'name') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'featured') list = [...list].sort((a, b) => Number(isAvailable(b)) - Number(isAvailable(a)));
    return list;
  }, [products, families, inStock, sort]);

  const toggleFamily = (f: ColorFamily) =>
    setFamilies((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });

  const activeFilterCount = families.size + (inStock ? 1 : 0);
  const clear = () => {
    setFamilies(new Set());
    setInStock(false);
  };

  const filters = (idPrefix: string) => (
    <>
      <fieldset className={styles.fgroup}>
        <legend>Color</legend>
        <div className={styles.famList}>
          {availableFamilies.map((f) => (
            <label key={f} className={styles.fam}>
              <input type="checkbox" checked={families.has(f)} onChange={() => toggleFamily(f)} />
              <span className={styles.famDot} style={{ background: colorFamilySwatch[f] }} aria-hidden="true" />
              {colorFamilyLabels[f]}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className={styles.fgroup}>
        <legend>Availability</legend>
        <label className={styles.toggle} htmlFor={`${idPrefix}-instock`}>
          <input id={`${idPrefix}-instock`} type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
          <span className={styles.switch} aria-hidden="true" />
          In stock only
        </label>
      </fieldset>
    </>
  );

  return (
    <div className={`container ${styles.wrap}`}>
      <nav className={styles.cats} aria-label="Categories">
        <ul>
          <li>
            <Link href="/shop/" className={!activeCategory ? styles.catOn : undefined} aria-current={!activeCategory ? 'page' : undefined}>
              All <span>{total}</span>
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/shop/${c.slug}/`}
                className={activeCategory === c.slug ? styles.catOn : undefined}
                aria-current={activeCategory === c.slug ? 'page' : undefined}
              >
                {c.name} <span>{counts[c.slug]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Filters">
          <div className={styles.sideHead}>
            <h2>Filter</h2>
            {activeFilterCount > 0 && (
              <button type="button" className={styles.clear} onClick={clear}>
                Clear all
              </button>
            )}
          </div>
          {filters('side')}
        </aside>

        <div className={styles.results}>
          <div className={styles.toolbar}>
            <button
              ref={filterBtnRef}
              type="button"
              className={styles.filterBtn}
              onClick={() => setSheetOpen(true)}
              aria-haspopup="dialog"
            >
              <Icon name="filter" size={20} /> Filter{activeFilterCount > 0 && ` (${activeFilterCount})`}
            </button>
            <p className={styles.count} aria-live="polite">
              {visible.length} product{visible.length === 1 ? '' : 's'}
            </p>
            <label className={styles.sort}>
              <span className="visually-hidden">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
                <option value="name">Name: A–Z</option>
              </select>
              <Icon name="chevron-down" size={18} />
            </label>
          </div>

          {activeFilterCount > 0 && (
            <div className={styles.activeChips}>
              {[...families].map((f) => (
                <button key={f} type="button" onClick={() => toggleFamily(f)}>
                  {colorFamilyLabels[f]} <Icon name="close" size={14} />
                  <span className="visually-hidden">Remove filter</span>
                </button>
              ))}
              {inStock && (
                <button type="button" onClick={() => setInStock(false)}>
                  In stock <Icon name="close" size={14} />
                  <span className="visually-hidden">Remove filter</span>
                </button>
              )}
            </div>
          )}

          {visible.length ? (
            <ProductGrid products={visible} columns={3} />
          ) : (
            <div className={styles.none}>
              <p className={styles.noneTitle}>No matches</p>
              <p>Nothing here fits those filters. Try removing one.</p>
              <button type="button" className="btn btn-dark btn-sm" onClick={clear}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <div className={`${styles.scrim} ${sheetOpen ? styles.on : ''}`} onClick={() => setSheetOpen(false)} aria-hidden="true" />
      <div
        ref={sheetRef}
        className={`${styles.sheet} ${sheetOpen ? styles.on : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        inert={!sheetOpen}
      >
        <div className={styles.sheetHead}>
          <h2 id="filter-title">Filter</h2>
          <button type="button" className={styles.sheetClose} onClick={() => setSheetOpen(false)} aria-label="Close filters">
            <Icon name="close" size={24} />
          </button>
        </div>
        <div className={styles.sheetBody}>{filters('sheet')}</div>
        <div className={styles.sheetFoot}>
          <button type="button" className="btn btn-outline" onClick={clear} disabled={!activeFilterCount}>
            Clear
          </button>
          <button type="button" className="btn" onClick={() => setSheetOpen(false)}>
            Show {visible.length} product{visible.length === 1 ? '' : 's'}
          </button>
        </div>
      </div>
    </div>
  );
}
