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
  tagline: 'Crappie soft plastics',

  /** PLACEHOLDER — production domain. Used for canonical URLs, sitemap and social cards. */
  url: 'https://bearcreekbaits.example',

  /**
   * PLACEHOLDER — leave null to hide them in the UI. Steve wants customers to order direct by text
   * or email (Nov 2026); the phone shows as "Text", not "Call". Waiting on the number and the exact
   * email address.
   */
  /** VERIFIED (Nov 2026) */
  email: 'bcb2024@mail.com' as string | null,
  phone: null as string | null,
  address: null as string | null,

  social: {
    /** VERIFIED — the Bear Creek Baits Facebook page (share link from the client, tracking parameter removed). */
    facebook: 'https://www.facebook.com/share/1C8CKEeAuP/',
  },

  /**
   * While true, a notice tells visitors the products, prices and images are samples,
   * and forms are not delivered. Set to false once real catalog data and a form endpoint are in place.
   */
  prototype: true,
};

export const prototypeNotice = 'Preview site · Not taking orders yet';

/**
 * ==========================================================================
 *  ORDERING — the settings Steve is most likely to change
 * ==========================================================================
 */
export type OrderingMode = 'request' | 'shopify';

export const ordering = {
  /**
   * 'request' — Phase 1. Customers build an order list and send it as a request.
   *             Nothing is charged online. Steve confirms stock, total and shipping,
   *             then takes payment however he does today.
   * 'shopify' — Later. The same list becomes a real cart that hands off to Shopify checkout.
   *             See "Moving to Shopify" in the README before switching.
   */
  mode: 'request' as OrderingMode,

  /**
   * THE OPEN/CLOSED SWITCH.
   * true  = taking orders.
   * false = orders paused everywhere: a banner shows on every page, "Add" buttons are turned off
   *         and the order form is hidden. People can still browse and save their list for later.
   */
  open: true,

  /** Shown in the site-wide banner and on the order page while `open` is false. */
  pausedMessage: 'Orders are paused while we catch up. Browse all you want; we’ll open back up soon.',

  /**
   * PLACEHOLDER — where order requests are sent. Any service that accepts a form POST works
   * (Formspree, Basin, Netlify Forms, a Google Apps Script, Shopify Forms...). Formspree, for
   * example, gives you a URL like 'https://formspree.io/f/abcdwxyz' and emails each request to Steve.
   * While null, the form validates and shows the thank-you screen but nothing is delivered.
   */
  formEndpoint: null as string | null,
};

/** Wording that changes with the ordering mode, so the UI never says "checkout" when nothing is charged. */
export const orderingCopy =
  ordering.mode === 'request'
    ? {
        listName: 'Order list',
        add: 'Add to order',
        addShort: 'Add',
        added: 'Added to order',
        goToOrder: 'Send order request',
        orderHref: '/order/',
        listNote: "Nothing is charged online. We'll confirm your total, with Mississippi sales tax and shipping, before you pay.",
        shippingNote:
          "We'll confirm shipping and Mississippi sales tax when we reach out about your order. Nothing is charged online.",
      }
    : {
        listName: 'Cart',
        add: 'Add to cart',
        addShort: 'Add',
        added: 'Added to cart',
        goToOrder: 'Checkout',
        orderHref: '/checkout/',
        listNote: 'Shipping and taxes are calculated at checkout.',
        shippingNote: 'Shipping options and rates are shown at checkout.',
      };

/**
 * Brand lines from the Bear Creek Baits brand guide v1.1.
 * Use them exactly as written: don't reword, merge or add exclamation points.
 */
export const brand = {
  /** Homepage hero, share image, packaging front. */
  tagline: 'Bust ’Em Right in the Mouth.',
  /** Footer and About header. */
  heritage: 'Chasing ’Em for Over 50 Years.',
  /** About page, order confirmation, packing slips. */
  promise: 'We’re not a million-dollar company, but a million dollars’ worth of heart goes into every bait.',
};
