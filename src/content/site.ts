/**
 * Business information and site-wide settings.
 *
 * VERIFIED = information supplied by Steve. A field set to null is hidden everywhere on the site.
 */
export const site = {
  /** VERIFIED */
  name: 'Bear Creek Baits',
  /** VERIFIED */
  legalName: 'Bear Creek Baits LLC',
  /** VERIFIED (from the brief): what the business sells. */
  tagline: 'Crappie soft plastics',

  /** VERIFIED (Nov 2026) — production domain. Used for canonical URLs, sitemap and social cards. */
  url: 'https://bearcreekbaits.com',

  /** VERIFIED (Nov 2026). Forwards to the business Gmail through Cloudflare Email Routing. */
  email: 'steve.green@bearcreekbaits.com' as string | null,
  /** Not set yet. When added it shows as "Text" on the contact page: Steve wants texts, not calls. */
  phone: null as string | null,
  address: null as string | null,

  social: {
    /** VERIFIED — the Bear Creek Baits Facebook page (share link from the client, tracking parameter removed). */
    facebook: 'https://www.facebook.com/share/1C8CKEeAuP/',
  },

  /**
   * THE LAUNCH SWITCH. While true, the "Preview site" banner shows on every page and search engines
   * are told not to index the site. Set to false to launch. Forms and catch approvals work either way.
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

/**
 * Where the order and contact forms are sent: Netlify Forms (the forms are declared in
 * public/__forms.html). Each submission is saved in Netlify and emailed by
 * netlify/functions/submission-created.ts. The value comes from netlify.toml, so it is only set on
 * Netlify: on a local build it is null, and the forms check everything and show the thank-you
 * screen, but nothing is sent.
 */
const formEndpoint: string | null = process.env.NEXT_PUBLIC_FORM_ENDPOINT || null;

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

  /** Where order requests are sent (see `formEndpoint` above). */
  formEndpoint,
};

/**
 * Catch submissions go to the catch approval function (netlify/functions/catch-submit.ts), which emails
 * Steve the photos with Approve / Reject. Nothing goes on the site until he approves it. Photos are shrunk
 * in the browser before sending (Netlify functions take about 6 MB per request). Set in netlify.toml,
 * so it is null (nothing sent) on local builds.
 */
export const catchForm = {
  endpoint: (process.env.NEXT_PUBLIC_CATCH_ENDPOINT || null) as string | null,
  /** Most photos a customer can attach, and the largest each may be before shrinking. */
  maxPhotos: 2,
  maxMb: 25,
};

export const contactForm = { endpoint: formEndpoint };

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
        // Phase 2: point this at Shopify's cart.checkoutUrl (see "Moving to Shopify" in the README).
        orderHref: '/order/',
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
