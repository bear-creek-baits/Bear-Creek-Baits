import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/data/products';
import { colorways } from '@/data/colors';
import { CatchForm } from './CatchForm';
import styles from '@/components/catches/Catches.module.css';

export const metadata: Metadata = {
  title: 'Send In Your Catch',
  description: 'Caught one on Bear Creek Baits? Send a photo or two and tell us what you caught it on.',
  alternates: { canonical: '/catches/submit/' },
};

export default function SubmitCatchPage() {
  // Only what the form needs, so the browser doesn't load the whole catalog.
  const profiles = products.map((p) => ({ slug: p.slug, title: p.title, sizes: p.options.find((o) => o.name === 'Size')?.values ?? [] }));
  const colors = colorways.map((c) => ({ id: c.id, label: `#${c.n} ${c.name}` }));
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">
            <Link href="/catches/">Customer catches</Link>
          </p>
          <h1>Send in your catch</h1>
          <p>Caught one on Bear Creek Baits? Send a photo or two and tell us what it bit.</p>
        </div>
      </section>
      <section className="section">
        <div className={`container ${styles.formWrap}`}>
          <CatchForm profiles={profiles} colors={colors} />
          <aside className={styles.aside}>
            <h2 className="h4" style={{ fontSize: 26 }}>
              Good to know
            </h2>
            <ul>
              <li>Clear, well-lit photos of you and the fish work best.</li>
              <li>We look at every one and post our favorites here and on Facebook.</li>
              <li>We only show your name, the bait and the lake or state if you add it. Your email stays with us.</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
