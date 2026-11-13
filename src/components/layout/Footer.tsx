import Link from 'next/link';
import { colorways } from '@/data/colors';
import { getAllProducts } from '@/lib/catalog';
import { brand, site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
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
          <p className={styles.blurb}>Crappie plastics: swim baits, curly tails and minnows in {colorways.length} colors.</p>
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
            {getAllProducts().map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}/`}>{p.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/colors/">Color chart</Link>
            </li>
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Company">
          <h2 className={styles.colTitle}>Bear Creek</h2>
          <ul>
            <li>
              <Link href="/catches/">Customer catches</Link>
            </li>
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

      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {site.legalName}. All rights reserved. ·{' '}
          <Link href="/privacy/" className={styles.legal}>
            Privacy
          </Link>
        </p>
        {site.prototype && <p>Preview build. Order requests and messages sent from this preview aren’t delivered yet.</p>}
      </div>
    </footer>
  );
}
