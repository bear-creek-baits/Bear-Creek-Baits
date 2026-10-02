import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

export function ProductGrid({ products, columns = 4 }: { products: Product[]; columns?: 3 | 4 }) {
  return (
    <ul className={`${styles.grid} ${columns === 3 ? styles.three : ''}`}>
      {products.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} priority={i < 4} />
        </li>
      ))}
    </ul>
  );
}
