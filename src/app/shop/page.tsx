import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts, getCategoryCounts } from '@/lib/catalog';
import { ShopView } from '@/components/shop/ShopView';

export const metadata: Metadata = {
  title: 'Shop All Baits',
  description: 'Shop Bear Creek Baits crappie soft plastics, hand-tied hair jigs, jig heads, bass baits and bait boxes.',
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
          <p>Soft plastics, hair jigs, jig heads, a few bass baits and bait boxes. Filter by color to find what you fish.</p>
        </div>
      </section>
      <ShopView products={products} counts={getCategoryCounts()} total={products.length} />
    </>
  );
}
