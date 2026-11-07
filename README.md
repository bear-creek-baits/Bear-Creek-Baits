# Bear Creek Baits — storefront prototype

Website for Bear Creek Baits LLC, built on the Bear Creek Baits brand guide (v1.1): home page, a shop laid out as pick a profile → pick a color → send the order, product pages with a size picker and a searchable color chart, a full color chart page, a dealer finder, search, and an order list that is saved in the browser.

**Phase 1 is order-by-request.** Customers build an order list and send it as a request. Nothing is charged online: Steve confirms stock, total and shipping, then takes payment the way he does today. One switch pauses ordering across the whole site when orders back up. The code is set up so the same order list can become a Shopify cart later without a rebuild.

**Prices are sample data.** The site deliberately doesn't track or show stock: Steve pours in runs of one or two colors and posts each day's pour on Facebook, so every size and color is orderable and anything not already poured goes on his pour list. Nothing needs updating when a run is poured. The baits, colors and photos come from Steve's product photos (one folder per profile, one photo per color); sizes come from his Facebook posts where known. Other verified inputs: the business name, the product types it sells, and the official logo.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm start          # serve ./out on http://localhost:3000
```

`npm run build:preview` makes a copy for the claude.ai preview link (https://claude.ai/artifact/6u6VASChyKheqchTahkRVp). That host won't take top-level folders starting with `_`, so this build serves Next's files from `/assets/_next/`.

The site builds to plain static files (`out/`), so it can be hosted on Netlify, Vercel, Cloudflare Pages, GitHub Pages or S3 without a server.

## Stack

- Next.js (App Router, static export) + React + TypeScript
- Plain CSS: global design tokens in `src/app/globals.css` plus a CSS Module per component
- Self-hosted fonts via Fontsource (Big Shoulders Display, Barlow, Barlow Condensed)
- No UI kit, no state library and no backend

## Where things live

| What | File |
| --- | --- |
| Business info, Facebook link, prototype switch | `src/content/site.ts` |
| **Ordering mode, open/closed switch, form endpoint** | `src/content/site.ts` → `ordering` |
| Brand taglines (use exactly as written) | `src/content/site.ts` → `brand` |
| Order request page | `src/app/order/` |
| **Product catalog** (one product per photo folder) | `src/data/products.ts` |
| Color chart (Steve's 63 numbered colors; every profile comes in every color) | `src/data/colors.ts`, chart photos in `public/colors/<nn>-<color>.webp` |
| Color chart page | `src/app/colors/`, grid in `src/components/product/ColorChart.tsx` |
| Product photos (cut out, transparent, 1600px WebP) | `public/products/<profile>/<color>.webp` |
| Bait photos in the hero, color wall and menus | `src/components/product/BaitPhoto.tsx` |
| Categories and their copy | `src/data/categories.ts` |
| Catalog access layer (swap this for Shopify later) | `src/lib/catalog.ts` |
| Cart (localStorage) | `src/components/cart/CartProvider.tsx` |
| Original uploaded logo (untouched) | `assets/original/` |
| Web logo and icons (cropped to drop stray text along the bottom edge; artwork unchanged) | `public/brand/` |

### Adding real product photos

Originals live outside the repo (`Product Photos/Edited/<Profile>/<Color>.jpg`, shot on pure white). Each one becomes `public/products/<profile>/<color>.webp`: background removed, trimmed to the bait, 1600px on the longest side. Only these web copies are committed. The site has no drawn bait illustrations; every bait shown is a photo. Name the file after the chart color's id in `src/data/colors.ts` and add it to that product's `photos(...)` list in `src/data/products.ts`.

Each profile is shown in one **main color** (`mainColor` in `src/data/products.ts`: Swim Bait = Silver Streak, Curly Tail = The Closer, Crappie Crusher = Blue Treuse, Flicker Minnow = Delta Shad). The product photo stays on that color; picking a color off the chart shows it as "Your color" under the photo. A profile whose main color has no photo yet shows "Photo coming soon" (the Flicker Minnow, until a Delta Shad photo exists).

Chart photos (`public/colors/`) are the small pictures on Steve's color chart. Colors without one show "Photo coming soon" on the chart. New chart colors go in `src/data/colors.ts`; every profile picks them up automatically, and the color counts update themselves.

## Ordering (phase 1)

Everything lives in the `ordering` block of `src/content/site.ts`:

| Setting | What it does |
| --- | --- |
| `open` | **The switch.** `false` pauses orders: a banner shows on every page, "Add to order" buttons turn off and the order form is replaced by a "we're catching up" note. Customers can still browse and their list stays saved. Flip it back to `true` and redeploy to reopen. |
| `pausedMessage` | The wording shown while paused. |
| `formEndpoint` | Where order requests go. Create a free form at Formspree (or Basin, Netlify Forms, a Google Apps Script…), paste its URL here, and each request arrives in Steve's inbox with the customer's contact info and an itemized list. While `null`, the form works but nothing is delivered. |
| `mode` | `'request'` today. `'shopify'` later (see below). |

Each request includes: name, email, best way to reach them (email / text / call), phone, city and state, notes, and the itemized list with an estimated subtotal.

### Turning off prototype mode

Set `prototype: false` in `src/content/site.ts`. That removes the sample-content notices and lets search engines index the site. Only do this after real catalog data and checkout are in place.

## Path to launch (phase 1)

1. Fill in real prices in `src/data/products.ts`, and add a Flicker Minnow photo in Delta Shad (its main color). Sizes are set: Swim Bait 1.5"/2"/2.2"/2.5", Curly Tail 1.5"/2.2", Crappie Crusher 2", Flicker Minnow 1.5".
2. Set `ordering.formEndpoint` (and point the contact form at the same service).
3. Fill in the real email/phone and domain in `site` (the Facebook link is in).
4. Set `prototype: false` and deploy.

## Moving to Shopify (phase 2, when Steve is ready)

1. Set up Shopify (products, variants, inventory, shipping, taxes, payments). Shopify's inventory tracking can mark items sold out automatically, which helps with capacity.
2. Re-implement `src/lib/catalog.ts` against the Shopify Storefront API. The data shapes already mirror Shopify's product, option and variant model.
3. Back `CartProvider` with the Storefront Cart API and send **Checkout** to `cart.checkoutUrl`.
4. Set `ordering.mode = 'shopify'`. Buttons, drawer and shipping wording switch from "order request" to "cart / checkout" automatically. The `open` switch keeps working.
