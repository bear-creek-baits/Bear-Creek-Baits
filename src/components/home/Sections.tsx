import Link from 'next/link';
import { getColorway } from '@/data/colors';
import { SOFT_PLASTIC_MIN } from '@/data/products';
import { brand, ordering, site } from '@/content/site';
import { getAllProducts, getFeaturedProducts } from '@/lib/catalog';
import { BaitPhoto } from '@/components/product/BaitPhoto';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Icon } from '@/components/ui/Icon';
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

/** Colors and the profile whose photo shows each one on the wall. */
const wallColors: { id: string; product: string }[] = [
  { id: 'the-closer', product: 'swim-bait' },
  { id: 'silver-streak', product: 'swim-bait' },
  { id: 'laurence-grubs', product: 'curly-tail' },
  { id: 'blue-ice-lime', product: 'curly-tail' },
  { id: 'dynamite', product: 'curly-tail' },
  { id: 'monkey-snot', product: 'curly-tail' },
  { id: 'blue-treuse', product: 'crappie-crusher' },
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
          {wallColors.map(({ id, product }) => {
            const cw = getColorway(id)!;
            return (
              <li key={id}>
                <Link href={`/search/?q=${encodeURIComponent(cw.name)}`} className={styles.wallTile}>
                  <span className={styles.wallArt}>
                    <BaitPhoto product={product} color={id} angle={-8} />
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

/* ------------------------------------------------------------------ Today's pour */

/**
 * Points to Facebook, where Steve posts each day's pour, instead of showing stock on the site
 * (nothing here needs updating when a run is poured). Anything else goes on the pour list.
 */
export function TodaysPour() {
  return (
    <section className={styles.pour} aria-labelledby="pour-title">
      <div className={`container ${styles.pourGrid}`}>
        <div className={styles.pourArt} aria-hidden="true">
          <BaitPhoto product="curly-tail" color="blue-ice-lime" angle={-8} />
          <BaitPhoto product="swim-bait" color="the-closer" angle={6} />
        </div>
        <div>
          <p className={`eyebrow ${styles.pourEyebrow}`}>Fresh off the bench</p>
          <h2 id="pour-title" className={styles.pourTitle}>
            See what got poured today.
          </h2>
          <p className={styles.pourText}>
            We pour one or two colors at a time and post each day’s run on Facebook. Want something else? Order any size and color here
            and it goes on the pour list.
          </p>
          <div className={styles.pourCtas}>
            <a href={site.social.facebook} className="btn btn-dark" target="_blank" rel="noopener noreferrer">
              <Icon name="facebook" size={20} /> Today’s pour on Facebook
            </a>
            <Link href="/shop/" className={styles.pourLink}>
              Shop all colors
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
    { n: '02', title: 'Laminates', body: 'Two-tone laminates, poured by hand on the bench.' },
    { n: '03', title: 'Poured in runs', body: `We pour one or two colors at a time, so there’s a ${SOFT_PLASTIC_MIN}-bait minimum for each size and color.` },
  ];
  return (
    <section className={`section ${styles.bench}`} aria-labelledby="bench-title">
      <div className={`container ${styles.benchGrid}`}>
        <div className={styles.benchVisual} aria-hidden="true">
          <div className={styles.benchPanel}>
            <BaitPhoto product="curly-tail" color="laurence-grubs" angle={-10} />
          </div>
          <div className={`${styles.benchPanel} ${styles.benchPanelSm}`}>
            <BaitPhoto product="flicker-minnow" color="the-closer" angle={-14} />
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

/* ------------------------------------------------------------------ How ordering works */

export function OrderSteps() {
  if (ordering.mode !== 'request') return null;
  const steps = [
    { title: 'Build your list', body: 'Pick any bait, size and color. If it isn’t already poured, it goes on the pour list.' },
    { title: 'Send the request', body: 'Nothing is charged online. Your list comes straight to the bench.' },
    { title: 'We confirm and ship', body: 'We reach out to confirm your total, shipping and timing, then pack it up once it’s poured.' },
  ];
  return (
    <section className="section dark topo" aria-labelledby="steps-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">How ordering works</p>
            <h2 id="steps-title">Made by hand. Ordered by request.</h2>
            <p>
              We pour in small runs, one or two colors at a time, so we confirm each order before you pay. You only pay once we know when
              it’ll be ready.
            </p>
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
