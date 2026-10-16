import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategory } from '@/data/categories';
import { getAllProducts, getProduct, isAvailable, priceRange, relatedProducts } from '@/lib/catalog';
import { site } from '@/content/site';
import { ProductDetail } from '@/components/product/ProductDetail';
import { ProductGrid } from '@/components/product/ProductGrid';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const c = getCategory(p.category);
  const title = `${p.title} — ${c?.name}`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/products/${p.slug}/` },
    openGraph: { title, description: p.summary, type: 'website' },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category)!;
  const related = relatedProducts(product);
  const { min, max } = priceRange(product);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.summary,
    category: category.name,
    brand: { '@type': 'Brand', name: site.name },
    url: `${site.url}/products/${product.slug}/`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: (min / 100).toFixed(2),
      highPrice: (max / 100).toFixed(2),
      offerCount: product.variants.length,
      availability: isAvailable(product) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail product={product} category={category} />
      {related.length > 0 && (
        <section className="section" style={{ background: 'var(--bone)' }} aria-labelledby="related-title">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">More profiles</p>
                <h2 id="related-title">Try another profile</h2>
              </div>
            </div>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </>
  );
}
