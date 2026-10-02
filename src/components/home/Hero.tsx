import Link from 'next/link';
import { ProductArt } from '@/components/product/ProductArt';
import { Icon } from '@/components/ui/Icon';
import type { ArtKind } from '@/lib/types';
import styles from './Home.module.css';

/** Baits arranged like they were dumped out on the tailgate. Positions are % of the art area. */
const spread: { kind: ArtKind; color: string; x: number; y: number; size: number; angle: number }[] = [
  { kind: 'shad', color: 'chartreuse-pink', x: -6, y: -10, size: 66, angle: -18 },
  { kind: 'hair-jig', color: 'hair-black-chartreuse', x: 44, y: -12, size: 62, angle: 16 },
  { kind: 'grub', color: 'blue-ice', x: 46, y: 26, size: 60, angle: -28 },
  { kind: 'jig-head', color: 'head-red', x: 0, y: 30, size: 42, angle: 8 },
  { kind: 'split-tail', color: 'orange-chartreuse', x: 8, y: 44, size: 64, angle: -8 },
  { kind: 'tube', color: 'hot-pink', x: 56, y: 56, size: 50, angle: 22 },
  { kind: 'jig-head', color: 'head-chartreuse', x: 32, y: 18, size: 34, angle: -40 },
];

export function Hero() {
  return (
    <section className={`dark topo ${styles.hero}`} aria-labelledby="hero-title">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Soft plastics · Hair jigs · Jig heads</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            Built for crappie.
            <span>Loaded with color.</span>
          </h1>
          <p className={styles.heroText}>
            Crappie soft plastics, hand-tied hair jigs and jig heads from Bear Creek Baits. Plus a few bass baits, and bait boxes worth giving.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/shop/" className="btn">
              Shop baits <Icon name="arrow-right" size={20} />
            </Link>
            <Link href="/shop/bait-boxes/" className="btn btn-outline">
              Bait boxes
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
