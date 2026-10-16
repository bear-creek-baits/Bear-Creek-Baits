import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts, getCategoryCounts } from '@/lib/catalog';
import { ShopView } from '@/components/shop/ShopView';

export const metadata: Metadata = {
  title: 'Shop All Baits',
  description: 'Shop Bear Creek Baits hand-poured crappie soft plastics: swim baits, curly tails, Crappie Crushers and Flicker Minnows.',
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
          <h1>Shop all baits</h1>
          <p>Hand-poured crappie plastics. Pick a profile, then the size and color. Filter by color to find what you fish.</p>
        </div>
      </section>
      <ShopView products={products} counts={getCategoryCounts()} total={products.length} />
    </>
  );
}
