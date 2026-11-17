'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getAllProducts, searchProducts } from '@/lib/catalog';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Icon } from '@/components/ui/Icon';
import styles from '../pages.module.css';

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get('q') ?? '';
  const [input, setInput] = useState(q);
  useEffect(() => setInput(q), [q]);
  const results = searchProducts(q);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Search</p>
          <h1>{q ? `“${q}”` : 'Search'}</h1>
          <form
            role="search"
            className={styles.searchForm}
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search/?q=${encodeURIComponent(input.trim())}`);
            }}
          >
            <label htmlFor="search-page-input" className="visually-hidden">
              Search products
            </label>
            <input
              id="search-page-input"
              type="search"
              className="input"
              placeholder="Search baits and colors…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-dark" aria-label="Search">
              <Icon name="search" size={20} />
            </button>
          </form>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {q && results.length > 0 && (
            <>
              <p className={styles.resultCount}>
                {results.length} result{results.length === 1 ? '' : 's'}
              </p>
              <ProductGrid products={results} />
            </>
          )}
          {q && results.length === 0 && (
            <div className={styles.noResults}>
              <p className={styles.h3}>No baits match “{q}”</p>
              <p>Try a color (chartreuse, pink, blue) or a bait type (grub, swim bait, minnow). Or pick a profile:</p>
            </div>
          )}
          {(!q || results.length === 0) && (
            <ul className={styles.catChips}>
              {getAllProducts().map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}/`}>{p.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/colors/">Color chart</Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
