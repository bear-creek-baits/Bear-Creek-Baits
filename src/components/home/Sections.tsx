import Link from 'next/link';
import { categories } from '@/data/categories';
import { getColorway } from '@/data/colors';
import { brand, ordering, site } from '@/content/site';
import { getCategoryCounts, getFeaturedProducts } from '@/lib/catalog';
import { ProductArt } from '@/components/product/ProductArt';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Icon } from '@/components/ui/Icon';
import type { ArtKind } from '@/lib/types';
import styles from './Home.module.css';

/* ------------------------------------------------------------------ Categories */

export function CategoryGrid() {
  const counts = getCategoryCounts();
  return (
    <section className={`section ${styles.cats}`} aria-labelledby="cats-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Shop by bait</p>
            <h2 id="cats-title">What are you rigging?</h2>
          </div>
          <Link href="/shop/" className="text-link">
            Shop all <Icon name="arrow-right" size={18} />
          </Link>
        </div>
        <ul className={styles.catGrid}>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/shop/${c.slug}/`} className={styles.catCard}>
                <span className={styles.catArt}>
                  <ProductArt kind={c.art} color={c.artColor} />
                </span>
                <span className={styles.catText}>
                  <span className={styles.catName}>{c.name}</span>
                  <span className={styles.catBlurb}>{c.blurb}</span>
                </span>
                <span className={styles.catCount}>
                  {counts[c.slug]} <span className="visually-hidden">products</span>
                  <Icon name="arrow-right" size={18} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Featured */

export function Featured() {
  return (
    <section className={`section ${styles.featured}`} aria-labelledby="featured-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Tackle box staples</p>
            <h2 id="featured-title">Start here</h2>
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

/** Colors and the profile each one is shown in on the wall. */
const wallColors: { id: string; kind: ArtKind }[] = [
  { id: 'crown-royal', kind: 'shad' },
  { id: 'monkey-snot', kind: 'shad' },
  { id: 'county-fair', kind: 'split-tail' },
  { id: 'delta-shad', kind: 'shad' },
  { id: 'mississippi-gold', kind: 'split-tail' },
  { id: 'blue-ice-char', kind: 'shad' },
  { id: 'copper-top', kind: 'shad' },
  { id: 'the-closer', kind: 'shad' },
  { id: 'blue-treuse', kind: 'grub' },
  { id: 'dirty-girl', kind: 'grub' },
  { id: 'blue-red-tail', kind: 'stick-worm' },
];

export function ColorWall() {
  return (
    <section className={`section dark ${styles.wall}`} aria-labelledby="wall-title">
      <div className="container">
        <div className={`section-head ${styles.wallHead}`}>
          <div>
            <p className="eyebrow">Shop by color</p>
            <h2 id="wall-title">Pick your color</h2>
            <p>Every color has a name. Crown Royal is one of the hottest colors on Pickwick right now. Tap a color to see every profile it’s poured in.</p>
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

/* ------------------------------------------------------------------ Bait box */

export function BaitBoxFeature() {
  return (
    <section className={styles.box} aria-labelledby="box-title">
      <div className={`container ${styles.boxGrid}`}>
        <div className={styles.boxArt} aria-hidden="true">
          <ProductArt kind="box" color="mix-bright" />
        </div>
        <div className={styles.boxCopy}>
          <p className={`eyebrow ${styles.boxEyebrow}`}>Bait boxes</p>
          <h2 id="box-title">A whole box of crappie baits.</h2>
          <p>
            Assorted soft plastics and jig heads packed in one box. Pick a size and a color lean. Stock up before the season, try colors you
            haven’t fished, or hand one to the crappie fisherman who’s hard to buy for.
          </p>
          <ul className={styles.boxSteps}>
            <li>
              <span>1</span> Choose a box size
            </li>
            <li>
              <span>2</span> Pick bright, natural or assorted colors
            </li>
            <li>
              <span>3</span> We pack it with plastics and jig heads
            </li>
          </ul>
          <div className={styles.boxCtas}>
            <Link href="/products/crappie-bait-box/" className="btn btn-dark">
              Build a bait box <Icon name="arrow-right" size={20} />
            </Link>
            <Link href="/shop/bait-boxes/" className={styles.boxLink}>
              See all boxes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Bench / brand */

export function Bench() {
  const points = [
    { n: '01', title: 'Hand-poured', body: 'Soft plastics poured in small batches, in the colors crappie fishermen actually reach for.' },
    { n: '02', title: 'Hand-tied', body: 'Every hair jig is tied by hand. Pick the weight and pattern you fish.' },
    { n: '03', title: 'Hand-painted', body: 'Jig heads painted to match the plastics, so pairing a body to a head takes one stop.' },
  ];
  return (
    <section className={`section ${styles.bench}`} aria-labelledby="bench-title">
      <div className={`container ${styles.benchGrid}`}>
        <div className={styles.benchVisual} aria-hidden="true">
          <div className={styles.benchPanel}>
            <ProductArt kind="hair-jig" color="hair-pink-white" angle={-16} />
          </div>
          <div className={`${styles.benchPanel} ${styles.benchPanelSm}`}>
            <ProductArt kind="jig-head" color="head-orange" angle={-10} />
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
            Baits made by hand, by people who fish, built to get bit. Nothing here is mass-produced. Crappie leads the lineup, with bass and
            sauger baits for the rest of the trip.
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
    { title: 'Build your list', body: 'Pick your baits, colors and weights and add them to your order list.' },
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
        <p>Plastics, jig heads and hair jigs in the colors you fish.</p>
        <div className={styles.finalCtas}>
          <Link href="/shop/" className="btn">
            Shop all baits <Icon name="arrow-right" size={20} />
          </Link>
        </div>
        <ul className={styles.finalLinks}>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/shop/${c.slug}/`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
