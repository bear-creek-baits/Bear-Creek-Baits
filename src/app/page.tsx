import { Hero } from '@/components/home/Hero';
import { BaitBoxFeature, Bench, CategoryGrid, ColorWall, Featured, FinalCta, OnTheWater, OrderSteps } from '@/components/home/Sections';
import { site } from '@/content/site';

export default function HomePage() {
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    url: site.url,
    logo: `${site.url}/brand/logo.png`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <Hero />
      <CategoryGrid />
      <Featured />
      <OrderSteps />
      <Bench />
      <ColorWall />
      <BaitBoxFeature />
      <OnTheWater />
      <FinalCta />
    </>
  );
}
