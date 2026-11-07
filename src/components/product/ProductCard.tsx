import Link from 'next/link';
import type { Product } from '@/lib/types';
import { getColorway } from '@/data/colors';
import { colorOption, formatPriceRange, isAvailable, sizeList } from '@/lib/catalog';
import { SOFT_PLASTIC_MIN } from '@/data/products';
import { ProductMedia } from './ProductMedia';
import styles from './ProductCard.module.css';

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const opt = colorOption(product);
  const colors = opt?.values ?? [];
  const mainName = getColorway(product.mainColor)?.name;
  const available = isAvailable(product);
  const href = `/products/${product.slug}/`;

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.media} tabIndex={-1} aria-hidden="true">
        <div className={styles.art}>
          <ProductMedia product={product} labelled={false} priority={priority} />
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

        {mainName && (
          <p className={styles.colorCount}>
            Shown in {mainName} · any of {colors.length} colors
          </p>
        )}
      </div>
    </article>
  );
}
