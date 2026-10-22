import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { brand, site } from '@/content/site';
import { colorways } from '@/data/colors';
import { BaitPhoto } from '@/components/product/BaitPhoto';
import { Icon } from '@/components/ui/Icon';
import styles from '../pages.module.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'Bear Creek Baits makes crappie soft plastics: swim baits, curly tails and minnows in 60 colors, chasing ’em for over 50 years.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>{brand.heritage}</h1>
          <p>Crappie baits from people who fish.</p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.split}`}>
          <div className={styles.aboutLogo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.webp" alt="Bear Creek Baits LLC logo" width={474} height={464} />
          </div>
          <div className="prose">
            {/* DRAFT COPY — limited to what the brand guide confirms. Replace with the story behind the 50 years, names and a photo. */}
            <blockquote className={styles.promise}>{brand.promise}</blockquote>
            <h2 className={styles.h2}>What we make</h2>
            <p>
              Crappie soft plastics designed by people who fish, built to get bit. Pick a profile, then any of the {colorways.length} colors on
              the <Link href="/colors/">color chart</Link>.
            </p>
            <p>Soft plastics are poured in runs, one or two colors at a time. Over 50 years of chasing fish goes into every bait.</p>
            <ul className={styles.makeList}>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop/${c.slug}/`}>
                    <span className={styles.makeArt}>
                      <BaitPhoto product={c.photo.product} color={c.photo.color} angle={-12} />
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
          <p>New colors, each day’s pour and customer catches get posted on Facebook first.</p>
          <a href={site.social.facebook} className="btn" target="_blank" rel="noopener noreferrer">
            <Icon name="facebook" size={20} /> Bear Creek Baits on Facebook
          </a>
        </div>
      </section>
    </>
  );
}
