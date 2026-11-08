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
// One of each profile, in the color of its profile photo, drawn to scale.
// `inches` is how wide the whole photo file is in real life. Each photo is a different zoom, so it's worked
// out per photo: the bait's length (tip to tail, curly tails measured along the curl) in pixels gives the
// pixels per inch, and the photo's width divided by that is its real width. Sizes from Steve: Swim Bait and
// Flicker Minnow 1.5", Crappie Crusher 2", Double Curly Tail 2", Triple Tail 2.75". The Curly Tail photo is
// taken as the 2.2" (its size isn't recorded).
const spread: { product: string; color: string; angle: number; inches: number }[] = [
  { product: 'swim-bait', color: 'blue-treuse', angle: -7, inches: 1.62 },
  { product: 'curly-tail', color: 'blue-ice-lime', angle: 6, inches: 1.42 },
  { product: 'crappie-crusher', color: 'blue-treuse', angle: 5, inches: 2.17 },
  { product: 'triple-tail', color: 'crown-royal', angle: -6, inches: 1.8 },
  { product: 'flicker-minnow', color: 'delta-shad', angle: -4, inches: 1.62 },
  { product: 'double-curly-tail', color: 'shiny-hiney', angle: 4, inches: 1.09 },
];
/** The widest photo fills its cell; the rest are sized against it. */
const widest = Math.max(...spread.map((b) => b.inches));

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
              <div style={{ width: `${((b.inches / widest) * 100).toFixed(1)}%` }}>
                <BaitPhoto product={b.product} color={b.color} angle={b.angle} priority />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
