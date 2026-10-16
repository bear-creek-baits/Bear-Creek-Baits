import type { Product, Variant } from '@/lib/types';
import { colorOption } from '@/lib/catalog';
import { asset } from '@/lib/asset';
import { ProductArt } from './ProductArt';

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
 * Renders the real product photo when one exists (variant image first, then product image),
 * otherwise the illustrated placeholder in the variant's color.
 */
export function ProductMedia({ product, variant, className, labelled = true, priority }: Props) {
  const photo = variant?.image ?? product.images[0];
  if (photo) {
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
  const opt = colorOption(product);
  const color = (variant && opt ? variant.options[opt.name] : undefined) ?? opt?.values[0];
  return (
    <ProductArt
      kind={product.art}
      color={color}
      className={className}
      title={labelled ? `Illustration of ${product.title}` : undefined}
    />
  );
}
