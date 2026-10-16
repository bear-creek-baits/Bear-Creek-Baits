import Link from 'next/link';
import { getColorway } from '@/data/colors';
import { SOFT_PLASTIC_MIN } from '@/data/products';
import { brand, ordering, site } from '@/content/site';
import { getAllProducts, getFeaturedProducts } from '@/lib/catalog';
import { ProductArt } from '@/components/product/ProductArt';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Icon } from '@/components/ui/Icon';
import type { ArtKind } from '@/lib/types';
import { dealers } from '@/data/dealers';
import { DealerMap } from '@/components/dealers/DealerMap';
import dealerStyles from '@/components/dealers/Dealers.module.css';
import styles from './Home.module.css';

/* ------------------------------------------------------------------ Featured profiles */

export function Featured() {
  return (
    <section className={`section ${styles.featured}`} aria-labelledby="featured-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Shop by profile</p>
            <h2 id="featured-title">What are you rigging?</h2>
          </div>
          <Link href="/shop/" className="text-link">
            View all <Icon name="arrow-right" size={18} />
          </Link>
        </div>
        <ProductGrid products={getFeaturedProducts().slice(0, 4)} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Color wall */

/** Colors and the profile each one is shown in on the wall (one it's photographed in). */
const wallColors: { id: string; kind: ArtKind }[] = [
  { id: 'the-closer', kind: 'shad' },
  { id: 'silver-streak', kind: 'shad' },
  { id: 'laurence-grubs', kind: 'grub' },
  { id: 'blue-ice-lime', kind: 'grub' },
  { id: 'dynamite', kind: 'grub' },
  { id: 'monkey-snot', kind: 'grub' },
  { id: 'blue-treuse', kind: 'stick-worm' },
];

export function ColorWall() {
  return (
    <section className={`section dark ${styles.wall}`} aria-labelledby="wall-title">
      <div className="container">
        <div className={`section-head ${styles.wallHead}`}>
          <div>
            <p className="eyebrow">Shop by color</p>
            <h2 id="wall-title">Pick your color</h2>
            <p>Every color has a name. Tap a color to see every profile it’s poured in.</p>
          </div>
        </div>
        <ul className={styles.wallGrid}>
          {wallColors.map(({ id, kind }) => {
            const cw = getColorway(id)!;
            return (
              <li key={id}>
                <Link href={`/search/?q=${encodeURIComponent(cw.name)}`} className={styles.wallTile}>
                  <span className={styles.wallArt}>
                    <ProductArt kind={kind} color={id} angle={-14} />
                  </span>
                  <span className={styles.wallName}>{cw.name}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/shop/soft-plastics/" className={`${styles.wallTile} ${styles.wallMore}`}>
              <span className={styles.wallMoreText}>
                Every profile <Icon name="arrow-right" size={18} />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Bench / brand */

export function Bench() {
  const points = [
    { n: '01', title: 'Hand-poured', body: 'Soft plastics poured in small batches, in the colors crappie fishermen actually reach for.' },
    { n: '02', title: 'Laminates and dipped tails', body: 'Two-tone laminates and dipped tails, done by hand on the bench.' },
    { n: '03', title: 'Poured in runs', body: `Every size and color is poured as a run, so there’s a ${SOFT_PLASTIC_MIN}-bait minimum for each.` },
  ];
  return (
    <section className={`section ${styles.bench}`} aria-labelledby="bench-title">
      <div className={`container ${styles.benchGrid}`}>
        <div className={styles.benchVisual} aria-hidden="true">
          <div className={styles.benchPanel}>
            <ProductArt kind="grub" color="laurence-grubs" angle={-16} />
          </div>
          <div className={`${styles.benchPanel} ${styles.benchPanelSm}`}>
            <ProductArt kind="shad" color="the-closer" angle={-10} />
          </div>
        </div>
        <div>
          <p className="eyebrow">From the bench</p>
          <h2 id="bench-title" className={styles.benchTitle}>
            Small shop.
            <br />
            Big bite.
          </h2>
          <p className={styles.benchLead}>
            Baits made by hand, by people who fish, built to get bit. Nothing here is mass-produced. Every soft plastic is poured on the bench.
          </p>
          <ol className={styles.points}>
            {points.map((p) => (
              <li key={p.n}>
                <span className={styles.pointN}>{p.n}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/about/" className="text-link">
            About Bear Creek Baits <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Local dealers */

export function LocalDealers() {
  return (
    <section className={`section ${dealerStyles.teaser}`} aria-labelledby="dealers-title">
      <div className={`container ${dealerStyles.teaserGrid}`}>
        <div>
          <p className="eyebrow">Local dealers</p>
          <h2 id="dealers-title" className={dealerStyles.teaserTitle}>Pick some up on the way to the lake.</h2>
          <p className={dealerStyles.teaserLead}>Tackle shops around Pickwick and the Shoals carry Bear Creek Baits. Find the one closest to you.</p>
          <ul className={dealerStyles.teaserTowns}>
            {dealers.map((d) => (
              <li key={d.id}>{d.town.replace(/, [A-Z]{2}$/, '')}</li>
            ))}
          </ul>
          <Link href="/dealers/" className="btn">
            Find a dealer <Icon name="arrow-right" size={20} />
          </Link>
        </div>
        <Link href="/dealers/" className={dealerStyles.mapWrap} aria-label="Open the dealer finder">
          <DealerMap />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ On the water */

export function OnTheWater() {
  return (
    <section className={`section ${styles.water}`} aria-labelledby="water-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">On the water</p>
            <h2 id="water-title">Show us your catch</h2>
            <p>Send us a picture when you stick a good one. Customer catches will show up here.</p>
          </div>
          <a href={site.social.facebook} className="text-link" target="_blank" rel="noopener noreferrer">
            Share on Facebook <Icon name="arrow-right" size={18} />
          </a>
        </div>
        <ul className={styles.waterGrid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className={styles.waterTile}>
              <Icon name="camera" size={30} strokeWidth={1.6} />
              <span>Your catch here</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ How ordering works */

export function OrderSteps() {
  if (ordering.mode !== 'request') return null;
  const steps = [
    { title: 'Build your list', body: 'Pick your baits, sizes and colors and add them to your order list.' },
    { title: 'Send the request', body: 'Nothing is charged online. Your list comes straight to the bench.' },
    { title: 'We confirm and ship', body: 'We reach out to confirm stock, your total and shipping, then pack it up.' },
  ];
  return (
    <section className="section dark topo" aria-labelledby="steps-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">How ordering works</p>
            <h2 id="steps-title">Made by hand. Ordered by request.</h2>
            <p>Every bait is made in small batches, so we confirm each order before you pay. That way you only pay for what’s ready to ship.</p>
          </div>
        </div>
        <ol className={styles.stepGrid}>
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className={styles.stepN}>{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        {!ordering.open && (
          <p className={styles.stepsPaused} role="status">
            <strong>Orders paused.</strong> {ordering.pausedMessage}
          </p>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Final CTA */

export function FinalCta() {
  return (
    <section className={`dark topo ${styles.final}`} aria-labelledby="final-title">
      <div className={`container ${styles.finalInner}`}>
        <h2 id="final-title">{brand.tagline}</h2>
        <p>Swim baits, curly tails and minnows in the colors you fish.</p>
        <div className={styles.finalCtas}>
          <Link href="/shop/" className="btn">
            Shop all baits <Icon name="arrow-right" size={20} />
          </Link>
        </div>
        <ul className={styles.finalLinks}>
          {getAllProducts().map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}/`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
