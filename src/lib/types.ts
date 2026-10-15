/**
 * Catalog types.
 *
 * The shape intentionally mirrors Shopify's product model (product -> options -> variants with
 * selectedOptions) so the sample catalog can later be swapped for Shopify Storefront API data
 * with a thin mapping layer instead of a rewrite.
 */

export type CategorySlug = 'soft-plastics' | 'hair-jigs' | 'jig-heads' | 'bass-baits' | 'sauger-baits' | 'bait-boxes';

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Short line used on category cards. */
  blurb: string;
  /** Intro copy at the top of the category page. */
  intro: string;
  seoTitle: string;
  seoDescription: string;
  /** Which illustration represents the category until real photography exists. */
  art: ArtKind;
  artColor: string; // colorway id
}

/** Illustration used when a product has no photo yet. */
export type ArtKind =
  | 'grub'
  | 'shad'
  | 'split-tail'
  | 'tube'
  | 'hair-jig'
  | 'jig-head'
  | 'craw'
  | 'stick-worm'
  | 'box';

/** Broad color groups used for shop filtering. */
export type ColorFamily =
  | 'chartreuse'
  | 'pink'
  | 'white'
  | 'blue'
  | 'black'
  | 'purple'
  | 'orange'
  | 'red'
  | 'natural';

export interface Colorway {
  id: string;
  name: string;
  /** Main body color. */
  primary: string;
  /** Second color for laminates, tails or hair. Same as primary for solid colors. */
  secondary: string;
  /** Optional glitter/flake color. */
  flake?: string;
  families: ColorFamily[];
}

export type OptionDisplay = 'swatch' | 'button';

export interface ProductOption {
  name: string; // e.g. "Color", "Weight", "Pack"
  display: OptionDisplay;
  values: string[]; // for swatches, values are colorway ids
}

export interface Variant {
  id: string;
  /** Option name -> selected value. */
  options: Record<string, string>;
  price: number; // cents
  compareAtPrice?: number; // cents
  available: boolean;
  image?: ProductImage;
}

export interface ProductImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Product {
  slug: string;
  title: string;
  category: CategorySlug;
  /** One-line summary for cards and meta descriptions. */
  summary: string;
  /** Longer description paragraphs. */
  description: string[];
  /** Bullet details. */
  details: string[];
  options: ProductOption[];
  variants: Variant[];
  /** Product photos. Empty = illustrated placeholder is shown. */
  images: ProductImage[];
  art: ArtKind;
  badge?: 'New' | 'Gift idea' | 'Seasonal';
  featured?: boolean;
  /** Marks invented demo data. Every product in the prototype is a sample. */
  sample: true;
}

export interface CartLine {
  variantId: string;
  slug: string;
  quantity: number;
}
