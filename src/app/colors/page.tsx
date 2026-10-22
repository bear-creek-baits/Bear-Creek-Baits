import type { Metadata } from 'next';
import Link from 'next/link';
import { colorways } from '@/data/colors';
import { getAllProducts } from '@/lib/catalog';
import { ColorChip } from '@/components/product/ColorChip';
import { Icon } from '@/components/ui/Icon';
import styles from './colors.module.css';

export const metadata: Metadata = {
  title: 'Color Chart',
  description: `All ${colorways.length} Bear Creek Baits colors, by number and name. Pick a profile, then any color off the chart.`,
  alternates: { canonical: '/colors/' },
};

export default function ColorsPage() {
  const profiles = getAllProducts();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Crappie soft plastics</p>
          <h1>Color Chart</h1>
          <p>
            {colorways.length} colors, and every profile comes in every one. Pick your profile first, then choose a color off the chart. Order
            by number or name. Custom colors available, just ask.
          </p>
          <ul className={styles.profiles} aria-label="Pick a profile">
            {profiles.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}/`} className="btn btn-sm btn-outline">
                  {p.title} <Icon name="arrow-right" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ol className={styles.grid}>
            {colorways.map((c) => (
              <li key={c.id} id={`color-${c.n}`} className={styles.card}>
                <div className={styles.head}>
                  <span className={styles.n}>{c.n}</span>
                  <h2 className={styles.name}>{c.name}</h2>
                </div>
                <div className={`${styles.art} ${c.chartPhoto ? '' : styles.drawn}`}>
                  <ColorChip color={c.id} />
                </div>
                <p className={styles.desc}>{c.description}</p>
              </li>
            ))}
          </ol>
          <p className={styles.note}>
            Photos shown for colors 1–35. Colors 36–60 are drawn approximations until they’re photographed. Screen colors vary.
          </p>
        </div>
      </section>
    </>
  );
}
