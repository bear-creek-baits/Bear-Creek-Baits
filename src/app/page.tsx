import { Hero } from '@/components/home/Hero';
import { Bench, ColorWall, CustomerCatches, Featured, FinalCta, LocalDealers, OrderSteps, TodaysPour } from '@/components/home/Sections';
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
      <Featured />
      <CustomerCatches />
      <TodaysPour />
      <OrderSteps />
      <Bench />
      <ColorWall />
      <LocalDealers />
      <FinalCta />
    </>
  );
}
