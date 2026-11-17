import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

/** Product cards: 2 across on phones, 3 on tablets, 4 on desktop. */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className={styles.grid}>
      {products.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} priority={i < 4} />
        </li>
      ))}
    </ul>
  );
}
