import Link from 'next/link';
import { BaitPhoto } from '@/components/product/BaitPhoto';
import { Icon } from '@/components/ui/Icon';
import { brand } from '@/content/site';
import styles from './Home.module.css';

/** Real baits (cut-out photos) laid out like they were dumped on the tailgate. Positions and widths are % of the art area. */
const spread: { product: string; color: string; x: number; y: number; size: number; angle: number }[] = [
  { product: 'swim-bait', color: 'the-closer', x: 0, y: 6, size: 60, angle: -12 },
  { product: 'curly-tail', color: 'laurence-grubs', x: 56, y: 0, size: 40, angle: 10 },
  { product: 'crappie-crusher', color: 'blue-treuse', x: 2, y: 36, size: 54, angle: 7 },
  { product: 'curly-tail', color: 'blue-ice-lime', x: 54, y: 34, size: 42, angle: -14 },
  { product: 'flicker-minnow', color: 'the-closer', x: 4, y: 64, size: 50, angle: -5 },
  { product: 'swim-bait', color: 'silver-streak', x: 46, y: 76, size: 52, angle: 13 },
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
            <div
              key={i}
              className={styles.heroBait}
              style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.size}%`, animationDelay: `${i * 60}ms` }}
            >
              <BaitPhoto product={b.product} color={b.color} angle={b.angle} priority />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
