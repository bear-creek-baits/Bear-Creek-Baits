'use client';

// Client component on purpose: asset() needs the browser to know the preview build's sub-folder.
// Rendered on the server only, the photo path would point at the host's root and 404 in the preview.
import { colorPhoto } from '@/lib/catalog';
import { asset } from '@/lib/asset';

interface Props {
  /** Product slug and color id of the photo to show. */
  product: string;
  color: string;
  className?: string;
  /** Rotation in degrees, for baits laid out at an angle. */
  angle?: number;
  /** Pass true when the photo carries meaning; decorative uses stay hidden from screen readers. */
  labelled?: boolean;
  priority?: boolean;
}

/** A cut-out photo of a real bait (transparent background), for decorative spots like the hero and color wall. */
export function BaitPhoto({ product, color, className, angle, labelled = false, priority }: Props) {
  const photo = colorPhoto(product, color);
  if (!photo) return null;
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
      style={angle ? { transform: `rotate(${angle}deg)` } : undefined}
    />
  );
}
