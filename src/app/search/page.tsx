import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchResults } from './SearchResults';

export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      <SearchResults />
    </Suspense>
  );
}
