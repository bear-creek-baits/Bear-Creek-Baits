import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategory } from '@/data/categories';
import { getProductsByCategory } from '@/lib/catalog';
import { ShopView } from '@/components/shop/ShopView';

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    // Only one category today, so this page shows the same thing as /shop/.
    alternates: { canonical: categories.length > 1 ? `/shop/${c.slug}/` : '/shop/' },
    openGraph: { title: c.seoTitle, description: c.seoDescription },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumbs">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/shop/">Shop</Link>
              </li>
              <li aria-current="page">{c.name}</li>
            </ol>
          </nav>
          <h1>{c.name}</h1>
          <p>{c.intro}</p>
        </div>
      </section>
      <ShopView products={getProductsByCategory(c.slug)} />
    </>
  );
}
