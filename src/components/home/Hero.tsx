import Link from 'next/link';
import { BaitPhoto } from '@/components/product/BaitPhoto';
import { Icon } from '@/components/ui/Icon';
import { brand } from '@/content/site';
import { colorways } from '@/data/colors';
import styles from './Home.module.css';

/**
 * Real baits (cut-out photos) in a two-column grid, each tilted a little so it still looks laid out by
 * hand. A grid keeps them from overlapping or running off the screen at any width.
 */
// One of each profile, in the color of its profile photo.
const spread: { product: string; color: string; angle: number }[] = [
  { product: 'swim-bait', color: 'blue-treuse', angle: -7 },
  { product: 'curly-tail', color: 'blue-ice-lime', angle: 6 },
  { product: 'crappie-crusher', color: 'blue-treuse', angle: 5 },
  { product: 'triple-tail', color: 'crown-royal', angle: -6 },
  { product: 'flicker-minnow', color: 'delta-shad', angle: -4 },
  { product: 'double-curly-tail', color: 'shiny-hiney', angle: 4 },
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
          <p className={styles.heroText}>
            Crappie plastics in laminates and loud colors from Bear Creek Baits, chasing ’em for over 50 years. Pick your profile, then
            any of {colorways.length} colors off the chart.
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
