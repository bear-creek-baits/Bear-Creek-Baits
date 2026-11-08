import Link from 'next/link';
import type { Product } from '@/lib/types';
import { getColorway } from '@/data/colors';
import { colorOption, formatPriceRange, isAvailable, mainPhoto, sizeList } from '@/lib/catalog';
import { ProductMedia } from './ProductMedia';
import styles from './ProductCard.module.css';

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const opt = colorOption(product);
  const colors = opt?.values ?? [];
  // Only name the color when there's a photo of it.
  const mainName = mainPhoto(product) ? getColorway(product.mainColor)?.name : undefined;
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
          <span className={styles.per}> / pack · bulk 50 or 100</span>
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
