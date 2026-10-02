import Link from 'next/link';
import { categories } from '@/data/categories';
import { getColorway } from '@/data/colors';
import { site } from '@/content/site';
import { getCategoryCounts, getFeaturedProducts } from '@/lib/catalog';
import { ProductArt } from '@/components/product/ProductArt';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Icon } from '@/components/ui/Icon';
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
          {categories.map((c, i) => (
            <li key={c.slug} className={i === 0 ? styles.catWide : undefined}>
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

const wallColors = [
  'chartreuse-pink',
  'pearl-pink',
  'blue-ice',
  'black-chartreuse',
  'junebug',
  'orange-chartreuse',
  'natural-shad',
  'red-chartreuse',
  'hot-pink',
  'glow-white',
  'purple-chartreuse',
  'smoke-silver',
];

export function ColorWall() {
  return (
    <section className={`section dark ${styles.wall}`} aria-labelledby="wall-title">
      <div className="container">
        <div className={`section-head ${styles.wallHead}`}>
          <div>
            <p className="eyebrow">Shop by color</p>
            <h2 id="wall-title">Pick your color</h2>
            <p>Bright for stained water, natural for clear, two-tone when you can’t decide. Tap a color to see every bait that comes in it.</p>
          </div>
        </div>
        <ul className={styles.wallGrid}>
          {wallColors.map((id, i) => {
            const cw = getColorway(id)!;
            return (
              <li key={id}>
                <Link href={`/search/?q=${encodeURIComponent(cw.name)}`} className={styles.wallTile}>
                  <span className={styles.wallArt}>
                    <ProductArt kind={i % 3 === 0 ? 'shad' : i % 3 === 1 ? 'split-tail' : 'grub'} color={id} angle={-14} />
                  </span>
                  <span className={styles.wallName}>{cw.name}</span>
                </Link>
              </li>
            );
          })}
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
    { n: '01', title: 'Hair jigs, tied by hand', body: 'Every hair jig in the lineup is hand-tied. Pick the weight and pattern you fish.' },
    { n: '02', title: 'Color is the point', body: 'Solid, two-tone and flake colors for stained water, clear water and everything between.' },
    { n: '03', title: 'Pair it up', body: 'Plastics and painted jig heads sold side by side, so matching a body to a head takes one stop.' },
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
            Crappie first.
          </h2>
          <p className={styles.benchLead}>
            Bear Creek Baits is an independent tackle company built around crappie fishing. Soft plastics, hair jigs and jig heads make up most of
            the lineup, with a few bass baits for the other side of the boat.
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
            <p>Caught one on a Bear Creek bait? Send the picture our way on Facebook. Customer catches will show up here.</p>
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

/* ------------------------------------------------------------------ Final CTA */

export function FinalCta() {
  return (
    <section className={`dark topo ${styles.final}`} aria-labelledby="final-title">
      <div className={`container ${styles.finalInner}`}>
        <h2 id="final-title">Restock the tackle box.</h2>
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
