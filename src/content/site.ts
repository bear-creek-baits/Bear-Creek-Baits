/**
 * Business information and site-wide settings.
 *
 * VERIFIED = information supplied by the client.
 * PLACEHOLDER = unknown; must be confirmed or replaced before launch.
 */
export const site = {
  /** VERIFIED */
  name: 'Bear Creek Baits',
  /** VERIFIED */
  legalName: 'Bear Creek Baits LLC',
  /** VERIFIED (from the brief): what the business sells. */
  tagline: 'Crappie baits, hair jigs and jig heads',

  /** PLACEHOLDER — production domain. Used for canonical URLs, sitemap and social cards. */
  url: 'https://bearcreekbaits.example',

  /** PLACEHOLDER — no public email/phone/address supplied. Leave null to hide them in the UI. */
  email: null as string | null,
  phone: null as string | null,
  address: null as string | null,

  social: {
    /** PLACEHOLDER — replace with the exact Facebook page URL. Currently a Facebook search link. */
    facebook: 'https://www.facebook.com/search/top?q=Bear%20Creek%20Baits',
  },

  /**
   * While true, a notice tells visitors the products, prices and images are samples,
   * and checkout is disabled. Set to false once real catalog data and Shopify checkout are wired up.
   */
  prototype: true,
};

export const prototypeNotice = 'Preview site · Sample products, prices & images';
