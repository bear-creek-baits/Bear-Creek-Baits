'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { categories } from '@/data/categories';
import { getColorway } from '@/data/colors';
import { colorOption, formatPriceRange, isAvailable, sizeList } from '@/lib/catalog';
import { SOFT_PLASTIC_MIN } from '@/data/products';
import { ProductArt } from './ProductArt';
import { ProductMedia } from './ProductMedia';
import { Swatch } from './Swatch';
import styles from './ProductCard.module.css';

const MAX_DOTS = 5;

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const opt = colorOption(product);
  const colors = opt?.values ?? [];
  const [preview, setPreview] = useState<string | null>(null);
  const available = isAvailable(product);
  const category = categories.find((c) => c.slug === product.category);
  const href = `/products/${product.slug}/`;
  const hasPhoto = product.images.length > 0;
  // Hovering a swatch shows that color's photo.
  const previewVariant = preview && opt ? product.variants.find((v) => v.options[opt.name] === preview && v.image) : undefined;

  return (
    <article className={styles.card}>
      <Link href={preview ? `${href}?color=${preview}` : href} className={styles.media} tabIndex={-1} aria-hidden="true">
        <div className={styles.art}>
          {preview && !hasPhoto ? (
            <ProductArt kind={product.art} color={preview} />
          ) : (
            <ProductMedia product={product} variant={previewVariant} labelled={false} priority={priority} />
          )}
        </div>
        <div className={styles.flags}>
          {!available ? (
            <span className={`${styles.flag} ${styles.soldOut}`}>Sold out</span>
          ) : (
            product.badge && <span className={styles.flag}>{product.badge}</span>
          )}
        </div>
      </Link>

      <div className={styles.body}>
        <p className={styles.cat}>{category?.name}</p>
        <h3 className={styles.title}>
          <Link href={href} className={styles.link}>
            {product.title}
          </Link>
        </h3>
        {sizeList(product) && <p className={styles.sizes}>{sizeList(product)}</p>}
        <p className={styles.price}>
          {formatPriceRange(product)}
          {product.unit && (
            <span className={styles.per}>
              {' '}
              / {product.unit} · {product.minQty ?? SOFT_PLASTIC_MIN} min
            </span>
          )}
          {!available && <span className="visually-hidden"> — sold out</span>}
        </p>

        {colors.length > 1 && (
          <div className={styles.dots} onMouseLeave={() => setPreview(null)}>
            {colors.slice(0, MAX_DOTS).map((c) => (
              <button
                key={c}
                type="button"
                className={styles.dot}
                aria-label={`Preview ${getColorway(c)?.name ?? c}`}
                onMouseEnter={() => setPreview(c)}
                onFocus={() => setPreview(c)}
                onClick={() => setPreview(c)}
              >
                <Swatch color={c} size={20} selected={preview === c} />
              </button>
            ))}
            {colors.length > MAX_DOTS && (
              <Link href={href} className={styles.more} aria-label={`${colors.length - MAX_DOTS} more colors`}>
                +{colors.length - MAX_DOTS}
              </Link>
            )}
          </div>
        )}
        {colors.length > 1 && <p className={styles.colorCount}>{colors.length} colors</p>}
      </div>
    </article>
  );
}
