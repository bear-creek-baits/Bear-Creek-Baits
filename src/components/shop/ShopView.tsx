import Link from 'next/link';
import type { Product } from '@/lib/types';
import { colorways } from '@/data/colors';
import { SOFT_PLASTIC_MIN } from '@/data/products';
import { ordering } from '@/content/site';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ColorChip } from '@/components/product/ColorChip';
import { Icon } from '@/components/ui/Icon';
import styles from './ShopView.module.css';

/** Colors previewed on the shop page: the first photographed ones on the chart. */
const PREVIEW_COLORS = 12;

/**
 * The shop, laid out in the order customers buy: pick a profile, pick a color off the chart, send
 * the order. There's no color filter or sort: every profile comes in every chart color, and there
 * are only a few profiles.
 */
export function ShopView({ products }: { products: Product[] }) {
  const preview = colorways.filter((c) => c.chartPhoto).slice(0, PREVIEW_COLORS);
  return (
    <div className={`container ${styles.wrap}`}>
      <section className={styles.step} aria-labelledby="step-profile">
        <div className={styles.stepHead}>
          <span className={styles.stepN} aria-hidden="true">
            1
          </span>
          <div>
            <h2 id="step-profile">Pick your profile</h2>
            <p>Sizes and price are on each card. Every profile comes in every color.</p>
          </div>
        </div>
        <ProductGrid products={products} columns={3} />
      </section>

      <section className={styles.step} aria-labelledby="step-color">
        <div className={styles.stepHead}>
          <span className={styles.stepN} aria-hidden="true">
            2
          </span>
          <div>
            <h2 id="step-color">Pick your color</h2>
            <p>
              {colorways.length} colors on the chart. Choose yours on the profile’s page, by name or number. Custom colors available, just
              ask.
            </p>
          </div>
        </div>
        <ul className={styles.colors}>
          {preview.map((c) => (
            <li key={c.id}>
              <Link href={`/colors/#color-${c.n}`} className={styles.color}>
                <span className={styles.colorArt}>
                  <ColorChip color={c.id} />
                </span>
                <span className={styles.colorName}>
                  <span className={styles.colorN}>{c.n}</span> {c.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/colors/" className="btn btn-dark">
          See all {colorways.length} colors <Icon name="arrow-right" size={20} />
        </Link>
      </section>

      <section className={styles.step} aria-labelledby="step-order">
        <div className={styles.stepHead}>
          <span className={styles.stepN} aria-hidden="true">
            3
          </span>
          <div>
            <h2 id="step-order">{ordering.mode === 'request' ? 'Send your order request' : 'Check out'}</h2>
            <p>
              {SOFT_PLASTIC_MIN}-bait minimum for each size and color.{' '}
              {ordering.mode === 'request'
                ? 'Nothing is charged online: we confirm your total, shipping and timing before you pay.'
                : 'Shipping and taxes are calculated at checkout.'}{' '}
              <Link href="/faq/">How ordering works</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
