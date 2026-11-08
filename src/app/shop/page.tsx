import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts } from '@/lib/catalog';
import { ShopView } from '@/components/shop/ShopView';
import { colorways } from '@/data/colors';

export const metadata: Metadata = {
  title: 'Shop Crappie Baits',
  description: `Shop Bear Creek Baits crappie soft plastics: swim baits, single, double and triple curly tails, Crappie Crushers, Crappie Slayers and Flicker Minnows in ${colorways.length} colors.`,
  alternates: { canonical: '/shop/' },
};

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumbs">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">Shop</li>
            </ol>
          </nav>
          <h1>Shop</h1>
          <p>Crappie soft plastics in three steps: pick a profile, pick a color off the chart, then send your order.</p>
        </div>
      </section>
      <ShopView products={products} />
    </>
  );
}
