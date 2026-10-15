import Link from 'next/link';
import { ProductArt } from '@/components/product/ProductArt';
import { Icon } from '@/components/ui/Icon';
import type { ArtKind } from '@/lib/types';
import { brand } from '@/content/site';
import styles from './Home.module.css';

/** Baits arranged like they were dumped out on the tailgate. Positions are % of the art area. */
const spread: { kind: ArtKind; color: string; x: number; y: number; size: number; angle: number }[] = [
  { kind: 'shad', color: 'crown-royal', x: -6, y: -10, size: 66, angle: -18 },
  { kind: 'hair-jig', color: 'hair-black-chartreuse', x: 44, y: -12, size: 62, angle: 16 },
  { kind: 'grub', color: 'blue-treuse', x: 46, y: 26, size: 60, angle: -28 },
  { kind: 'jig-head', color: 'head-red', x: 0, y: 30, size: 42, angle: 8 },
  { kind: 'split-tail', color: 'mississippi-gold', x: 8, y: 44, size: 64, angle: -8 },
  { kind: 'shad', color: 'county-fair', x: 56, y: 56, size: 50, angle: 22 },
  { kind: 'jig-head', color: 'head-chartreuse', x: 32, y: 18, size: 34, angle: -40 },
];

export function Hero() {
  return (
    <section className={`dark topo ${styles.hero}`} aria-labelledby="hero-title">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Crappie plastics · Hair jigs · Jig heads</p>
          {/* Primary tagline, split for the two-color treatment. Reads as one line to screen readers. */}
          <h1 id="hero-title" className={styles.heroTitle} aria-label={brand.tagline}>
            Bust ’Em
            <span>Right in the Mouth.</span>
          </h1>
          <p className={styles.heroHandmade}>{brand.handmade}</p>
          <p className={styles.heroText}>
            Hand-poured crappie plastics, hand-tied hair jigs and hand-painted jig heads from a small shop that’s been chasing ’em for over 50
            years.
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
              <ProductArt kind={b.kind} color={b.color} angle={b.angle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
