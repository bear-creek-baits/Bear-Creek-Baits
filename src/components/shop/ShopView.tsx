'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { CategorySlug, Product } from '@/lib/types';
import { categories } from '@/data/categories';
import { colorways } from '@/data/colors';
import { isAvailable, priceRange } from '@/lib/catalog';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Icon } from '@/components/ui/Icon';
import styles from './ShopView.module.css';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'name';

interface Props {
  products: Product[];
  activeCategory?: CategorySlug;
  counts: Record<string, number>;
  total: number;
}

/**
 * The shop lists profiles. There's no color filter: every profile comes in every color on the chart,
 * so the color is picked on the profile's page.
 */
export function ShopView({ products, activeCategory, counts, total }: Props) {
  const [sort, setSort] = useState<Sort>('featured');

  const visible = useMemo(() => {
    let list = products;
    if (sort === 'price-asc') list = [...list].sort((a, b) => priceRange(a).min - priceRange(b).min);
    if (sort === 'price-desc') list = [...list].sort((a, b) => priceRange(b).min - priceRange(a).min);
    if (sort === 'name') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'featured') list = [...list].sort((a, b) => Number(isAvailable(b)) - Number(isAvailable(a)));
    return list;
  }, [products, sort]);

  return (
    <div className={`container ${styles.wrap}`}>
      {/* Category tabs only help once there's more than one category. */}
      {categories.length > 1 && (
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
      )}

      <ol className={styles.steps} aria-label="How to pick your baits">
        <li>
          <span className={styles.stepN}>1</span>
          <span>
            <strong>Pick a profile</strong>
            Swim bait, curly tail, crusher or minnow.
          </span>
        </li>
        <li>
          <span className={styles.stepN}>2</span>
          <span>
            <strong>Pick a size</strong>
            On the profile’s page.
          </span>
        </li>
        <li>
          <span className={styles.stepN}>3</span>
          <span>
            <strong>Pick a color</strong>
            Any of {colorways.length} on the <Link href="/colors/">color chart</Link>.
          </span>
        </li>
      </ol>

      <div className={styles.toolbar}>
        <p className={styles.count} aria-live="polite">
          {visible.length} profile{visible.length === 1 ? '' : 's'}
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

      <ProductGrid products={visible} columns={4} />
    </div>
  );
}
