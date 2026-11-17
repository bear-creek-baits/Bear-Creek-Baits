# Bear Creek Baits

The website for Bear Creek Baits LLC (crappie soft plastics): **https://bearcreekbaits.com**

Customers pick a profile, a size and any color off the chart, build an order list and send it as an **order request**. Nothing is charged online: Steve confirms the total (Mississippi sales tax plus shipping) and the timing, then takes payment the way he always has. Customers can also send in catch photos, which go on the site once Steve approves them.

## Quick start

Needs Node 22 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local site with live reload |
| `npm run typecheck` | TypeScript check |
| `npm test` | Tests the Netlify Functions (catch approvals, alert emails) against stand-ins. Sends nothing. |
| `npm run build` | Builds the static site into `out/` |
| `npm run check` | All three of the above. Run it before pushing. |
| `npm start` | Serves `out/` on http://localhost:3000 |

On a local build the forms check everything and show their thank-you screens, but nothing is sent (the endpoints are only set on Netlify; see `netlify.toml`).

## How it's hosted

| Piece | Where | Notes |
| --- | --- | --- |
| Code | GitHub: `bear-creek-baits/Bear-Creek-Baits` (public) | **Pushing to `main` deploys the site.** |
| Hosting, forms, functions | Netlify, project `clinquant-kitten-6464ac` | Builds with `npm run build`, serves `out/`. Settings in `netlify.toml`. |
| Domain and DNS | Cloudflare | `bearcreekbaits.com`; DNS records point at Netlify (DNS only, not proxied). |
| Incoming email | Cloudflare Email Routing | `steve.green@bearcreekbaits.com` forwards to the business Gmail. |
| Outgoing email | Resend | Sends the alert emails; also lets Gmail "send as" the domain address. |

All of these accounts belong to the business Gmail account. The catch approval system also commits to `main` by itself (see below), so **pull before you start work**.

## Stack

- Next.js (App Router, static export), React, TypeScript
- Plain CSS: design tokens in `src/app/globals.css`, plus a CSS Module per component
- Self-hosted fonts (Fontsource): Big Shoulders Display, Barlow, Barlow Condensed
- No UI kit and no state library. The only server code is the Netlify Functions in `netlify/`.

## Where things live

```
src/
  content/site.ts        Business info and the switches (launch, orders open/paused, ordering mode)
  data/                  The catalog: products, colors, dealers, catches
  lib/                   catalog.ts (all catalog lookups), forms.ts, geo.ts (zip distances), types.ts
  app/                   One folder per page (Next.js routes); globals.css; shared pages.module.css
  components/            UI by area: layout, home, shop, product, cart, catches, dealers, ui
netlify/
  functions/             catch-submit, catch-review, catch-publish, submission-created
  lib/                   catches.ts (storage, signing, GitHub publish), email.ts (alert email layout)
public/                  Images, plus __forms.html (form definitions) and email-signature.html
scripts/                 flatten-rsc.mjs (part of the build), catch-photo.mjs (prepare a catch photo)
tests/                   functions.test.mjs and its stand-ins
```

| To change… | Edit |
| --- | --- |
| Business name, email, phone, Facebook link | `src/content/site.ts` → `site` |
| **Pause or reopen orders** | `src/content/site.ts` → `ordering.open` |
| **Launch (remove the preview banner)** | `src/content/site.ts` → `site.prototype` |
| Brand taglines (use exactly as written) | `src/content/site.ts` → `brand` |
| Prices and pack sizes | `src/data/products.ts` → `PACKS`, `PACK_NOTE`, and each profile's `perPack` |
| Profiles: names, sizes, descriptions, order | `src/data/products.ts` (the shop, menus and footer follow the order of this list) |
| Colors | `src/data/colors.ts`; chart photos in `public/colors/<nn>-<id>.webp` |
| Dealers | `src/data/dealers.ts` |
| Catches | `src/data/catches.ts` (hand-picked) and `src/data/catches-approved.json` (approved on the site) |
| FAQ, About, Privacy text | `src/app/faq/page.tsx`, `src/app/about/page.tsx`, `src/app/privacy/page.tsx` |
| Header and footer links | `src/components/layout/Header.tsx`, `Footer.tsx` |

## The catalog

One product per bait **profile**, in `src/data/products.ts`. Every profile comes in every color on the chart (`src/data/colors.ts`), so the color counts around the site update themselves when a color is added.

- **Prices** (Steve, Nov 2026): a pack is $4.15; bulk is $20 for 50 or $40 for 100 of one color. A pack is 10 baits for the Swim Bait and Curly Tail and 12 for the rest (`perPack`).
- **No stock tracking**, on purpose. Steve pours one or two colors at a time and posts each day's pour on Facebook; anything not already poured goes on his pour list. Nothing on the site needs updating when a run is poured.
- **Photos.** Each profile is shown in one main color (`mainColor`): its photo is `public/products/<profile>/<mainColor>.webp`, cut out on a transparent background, 1600px on the long side. A profile without that photo shows "Photo coming soon". The originals stay outside the repo; only web-sized copies are committed.
- **Color chart photos** all show the color on a Curly Tail. That's why, on other profiles, the picked color appears as a small labeled sample in the corner of the product photo ("Color shown on a Curly Tail") with a "You'll get" line under it.
- **Crappie Slayer and Crappie Crusher** share one side photo (same body). The Crusher adds a split tail, shown as a close-up in the corner of its photo: see `detail` on the product. In small thumbnails the Crusher uses its top-down photo (`detail.thumb`).

To add a color: add it to `colors.ts` (and a chart photo if there is one). To add a profile: add a `build({...})` entry to `products.ts` and its photo.

## Ordering

Everything is in the `ordering` block of `src/content/site.ts`.

| Setting | What it does |
| --- | --- |
| `open` | **The switch.** `false` pauses orders: a banner shows on every page, "Add to order" turns off and the order form is replaced by a "we're catching up" note. People can still browse, and their list stays saved. |
| `pausedMessage` | The wording shown while paused. |
| `mode` | `'request'` today. `'shopify'` is for later (see the end of this file). |

The order list lives in the customer's browser (`localStorage`, see `src/components/cart/CartProvider.tsx`). The order form is `src/app/order/OrderRequestView.tsx`.

## Forms and emails

**Order requests and contact messages** go to Netlify Forms. The forms are declared in `public/__forms.html`: *a field missing from that file is dropped from submissions*, so add new fields there too. After each submission that passes Netlify's spam filter, `netlify/functions/submission-created.ts` emails the details through Resend, with Reply-To set to the customer. Submissions flagged as spam send no email: check Netlify → Forms → Spam now and then.

**Catch photos** don't use Netlify Forms. They go through the approval system:

1. **`/api/catch`** (`catch-submit.ts`) saves the catch in Netlify Blobs and emails the reviewer the photos, with a **Review** button.
2. **`/api/catch/review`** (`catch-review.ts`) is the review page: fix the name, lake, bait, size or color, then **Approve** (goes up overnight), **Approve and post now**, or **Reject** (deleted). Opening the page changes nothing; only the buttons do. Links are signed, so they can't be guessed.
3. **`catch-publish.ts`** runs nightly (08:00 UTC) and commits every approved catch to GitHub in one commit: photos into `public/catches/`, details into `src/data/catches-approved.json`. Netlify rebuilds from that commit.

To add a catch by hand instead: `node scripts/catch-photo.mjs "<photo.jpg>" public/catches/<name>.webp`, then add an entry to `src/data/catches.ts` (instructions at the top of that file).

All alert emails share one layout, `netlify/lib/email.ts`, built to read easily on a phone.

### Settings on Netlify

Project configuration → Environment variables. The site itself needs none of these; the functions do.

| Variable | What |
| --- | --- |
| `RESEND_API_KEY` | Sends the emails ([resend.com](https://resend.com)) |
| `CATCH_FROM` | Sender, e.g. `Bear Creek Baits <catches@bearcreekbaits.com>`. The domain is verified in Resend. |
| `CATCH_REVIEW_TO` | Who gets the catch review emails (commas for more than one) |
| `FORMS_NOTIFY_TO` | Optional. Who gets order and contact emails. Defaults to `CATCH_REVIEW_TO`. |
| `CATCH_SECRET` | Long random text that signs the review links. Changing it breaks links already sent. |
| `GITHUB_TOKEN` | Fine-grained GitHub token on this repo with **Contents: Read and write**. If approved catches stop posting ("posting right away didn't work"), this token is the first thing to check. |

## Steve's email signature

`public/email-signature.html` (https://bearcreekbaits.com/email-signature.html, not linked from the site) has the signature with a Copy button and the steps for pasting it into Gmail.

## Before launch

1. Set `site.prototype` to `false` in `src/content/site.ts`. That removes the "Preview site" banner and lets search engines index the site.
2. Add Steve's phone number to `site.phone` if he wants texts (it shows as "Text" on the contact page).
3. Confirm the dealer details marked `verify` in `src/data/dealers.ts`.
4. Clear test submissions out of Netlify → Forms.

## Moving to Shopify (later, if Steve wants online payment)

1. Set up the Shopify store (products, variants, shipping, taxes, payments).
2. Re-implement `src/lib/catalog.ts` against the Shopify Storefront API. The types in `src/lib/types.ts` already mirror Shopify's product, option and variant model.
3. Back `CartProvider` with the Storefront Cart API and point `orderingCopy.orderHref` at `cart.checkoutUrl`.
4. Set `ordering.mode = 'shopify'`. Buttons and wording switch from "order request" to "cart / checkout". The `open` switch keeps working.
