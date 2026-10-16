import type { Product, Variant } from '@/lib/types';
import { asset } from '@/lib/asset';

interface Props {
  product: Product;
  variant?: Variant;
  className?: string;
  /** Pass false for decorative uses where adjacent text already names the product. */
  labelled?: boolean;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders the product photo (variant image first, then product image). Photos are cut out with a
 * transparent background, so a soft shadow sets the bait on whatever panel it sits on.
 * Products without a photo show a plain "photo coming soon" note.
 */
export function ProductMedia({ product, variant, className, labelled = true, priority }: Props) {
  const photo = variant?.image ?? product.images[0];
  if (!photo) {
    return (
      <span
        className={className}
        role={labelled ? 'img' : undefined}
        aria-label={labelled ? `${product.title}: photo coming soon` : undefined}
        style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', color: 'var(--muted)', fontSize: 14 }}
      >
        Photo coming soon
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(photo.src)}
      alt={labelled ? photo.alt : ''}
      width={photo.width}
      height={photo.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={{ objectFit: 'contain', width: '100%', height: '100%', filter: 'drop-shadow(0 10px 12px rgba(0, 0, 0, 0.18))' }}
    />
  );
}
