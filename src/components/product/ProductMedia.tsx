import type { Product } from '@/lib/types';
import { asset } from '@/lib/asset';
import { mainPhoto } from '@/lib/catalog';
import { PhotoComingSoon } from './PhotoComingSoon';

interface Props {
  product: Product;
  className?: string;
  /** Pass false for decorative uses where adjacent text already names the product. */
  labelled?: boolean;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders the profile's photo in its main color (the same photo whichever color is picked; the color
 * chart shows the variations). Photos are cut out with a
 * transparent background and carry their own soft shadow. Don't add a CSS drop-shadow filter:
 * iOS Safari draws it in tiles on scaled or rotated images and leaves visible seams.
 * A profile not yet photographed in its main color shows the chart's "photo coming soon" box.
 */
export function ProductMedia({ product, className, labelled = true, priority }: Props) {
  const photo = mainPhoto(product);
  if (!photo) return <PhotoComingSoon className={className} label={labelled ? `${product.title}: photo coming soon` : undefined} />;
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
      style={{ objectFit: 'contain', width: '100%', height: '100%' }}
    />
  );
}
