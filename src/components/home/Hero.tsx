import Link from 'next/link';
import { BaitPhoto } from '@/components/product/BaitPhoto';
import { Icon } from '@/components/ui/Icon';
import { brand } from '@/content/site';
import styles from './Home.module.css';

/**
 * Real baits (cut-out photos) in a two-column grid, each tilted a little so it still looks laid out by
 * hand. A grid keeps them from overlapping or running off the screen at any width.
 */
const spread: { product: string; color: string; angle: number }[] = [
  { product: 'swim-bait', color: 'the-closer', angle: -7 },
  { product: 'curly-tail', color: 'laurence-grubs', angle: 6 },
  { product: 'crappie-crusher', color: 'blue-treuse', angle: 5 },
  { product: 'curly-tail', color: 'blue-ice-lime', angle: -6 },
  { product: 'flicker-minnow', color: 'the-closer', angle: -4 },
  { product: 'swim-bait', color: 'silver-streak', angle: 7 },
];

export function Hero() {
  return (
    <section className={`dark topo ${styles.hero}`} aria-labelledby="hero-title">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Swim baits · Curly tails · Minnows</p>
          {/* Primary tagline, split for the two-color treatment. Reads as one line to screen readers. */}
          <h1 id="hero-title" className={styles.heroTitle} aria-label={brand.tagline}>
            Bust ’Em
            <span>Right in the Mouth.</span>
          </h1>
          <p className={styles.heroHandmade}>{brand.handmade}</p>
          <p className={styles.heroText}>
            Hand-poured crappie plastics in laminates, dipped tails and loud colors, from a small shop that’s been chasing ’em for over 50 years.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/shop/" className="btn">
              Shop crappie baits <Icon name="arrow-right" size={20} />
            </Link>
            <Link href="/faq/" className="btn btn-outline">
              How ordering works
            </Link>
          </div>
        </div>

        <div className={styles.heroArt} aria-hidden="true">
          {spread.map((b, i) => (
            <div key={i} className={styles.heroBait} style={{ animationDelay: `${i * 60}ms` }}>
              <BaitPhoto product={b.product} color={b.color} angle={b.angle} priority />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
