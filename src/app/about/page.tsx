import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { site } from '@/content/site';
import { ProductArt } from '@/components/product/ProductArt';
import { Icon } from '@/components/ui/Icon';
import styles from '../pages.module.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'Bear Creek Baits is an independent tackle company focused on crappie fishing: soft plastics, hand-tied hair jigs and jig heads.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>Crappie baits from Bear Creek</h1>
          <p>An independent tackle company built around crappie fishing.</p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.split}`}>
          <div className={styles.aboutLogo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.webp" alt="Bear Creek Baits LLC logo" width={474} height={464} />
          </div>
          <div className="prose">
            {/* DRAFT COPY — limited to what the business has confirmed. Replace with the owner's story. */}
            <h2 className={styles.h2}>What we make</h2>
            <p>
              Bear Creek Baits LLC makes baits for crappie fishermen. The lineup centers on crappie soft plastics, hand-tied hair jigs and
              jig heads, with a few bass baits and assorted bait boxes alongside.
            </p>
            <p>
              The goal is simple: baits in the colors crappie fishermen actually reach for, and jig heads to rig them on, all from one shop.
            </p>
            <ul className={styles.makeList}>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop/${c.slug}/`}>
                    <span className={styles.makeArt}>
                      <ProductArt kind={c.art} color={c.artColor} />
                    </span>
                    <span>
                      <strong>{c.name}</strong>
                      <span>{c.blurb}</span>
                    </span>
                    <Icon name="arrow-right" size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`section dark topo`}>
        <div className={`container ${styles.followCta}`}>
          <h2>Follow along</h2>
          <p>New colors, restocks and catches get posted on Facebook first.</p>
          <a href={site.social.facebook} className="btn" target="_blank" rel="noopener noreferrer">
            <Icon name="facebook" size={20} /> Bear Creek Baits on Facebook
          </a>
        </div>
      </section>
    </>
  );
}
