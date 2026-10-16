import Link from 'next/link';
import { categories } from '@/data/categories';
import { brand, site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { NewsletterForm } from './NewsletterForm';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={`dark topo ${styles.footer}`}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.webp" alt="" width={474} height={464} loading="lazy" />
          </Link>
          <p className={styles.heritage}>{brand.heritage}</p>
          <p className={styles.blurb}>Hand-poured crappie plastics: swim baits, curly tails and minnows.</p>
          <a href={site.social.facebook} className={styles.social} target="_blank" rel="noopener noreferrer">
            <Icon name="facebook" size={20} /> Follow on Facebook
          </a>
        </div>

        <nav className={styles.col} aria-label="Shop">
          <h2 className={styles.colTitle}>Shop</h2>
          <ul>
            <li>
              <Link href="/shop/">All baits</Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}/`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Company">
          <h2 className={styles.colTitle}>Bear Creek</h2>
          <ul>
            <li>
              <Link href="/dealers/">Find a dealer</Link>
            </li>
            <li>
              <Link href="/about/">About</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
            <li>
              <Link href="/faq/">FAQ</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.news}>
          <h2 className={styles.colTitle}>New colors</h2>
          <p>Get an email when a new color drops.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {site.legalName}. All rights reserved.
        </p>
        {site.prototype && <p>Preview build. Products, prices and images shown are samples.</p>}
      </div>
    </footer>
  );
}
