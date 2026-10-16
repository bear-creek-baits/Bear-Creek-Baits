# Bear Creek Baits — storefront prototype

Website for Bear Creek Baits LLC, built on the Bear Creek Baits brand guide (v1.1): home page, shop with category tabs, filters and sort, product pages with variant pickers, search, and an order list that is saved in the browser.

**Phase 1 is order-by-request.** Customers build an order list and send it as a request. Nothing is charged online: Steve confirms stock, total and shipping, then takes payment the way he does today. One switch pauses ordering across the whole site when the bench is backed up. The code is set up so the same order list can become a Shopify cart later without a rebuild.

**Prices and stock status are sample data.** The baits, colors and photos come from Steve's product photos (one folder per profile, one photo per color); sizes come from his Facebook posts where known. Other verified inputs: the business name, the product types it sells, and the official logo.

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
| Colorways / swatches (sampled from the photos) | `src/data/colors.ts` |
| Product photos (1600px WebP) | `public/products/<profile>/<color>.webp` |
| Categories and their copy | `src/data/categories.ts` |
| Catalog access layer (swap this for Shopify later) | `src/lib/catalog.ts` |
| Cart (localStorage) | `src/components/cart/CartProvider.tsx` |
| Bait illustrations (hero, color wall, products without a photo) | `src/components/product/ProductArt.tsx` |
| Original uploaded logo (untouched) | `assets/original/` |
| Web logo and icons (cropped to drop stray text along the bottom edge; artwork unchanged) | `public/brand/` |

### Adding real product photos

Originals live outside the repo (`Product Photos/Edited/<Profile>/<Color>.jpg`). Copy each one to `public/products/<profile>/<color>.webp`, resized to 1600px on the longest side; only the web-sized copies are committed. Then add the color to the product's `Color` option and `photos(...)` list in `src/data/products.ts` (each color variant gets its photo as `variant.image`, so picking the color shows it), and add a colorway in `src/data/colors.ts` sampled from the photo.

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

1. Fill in real prices, stock and any missing sizes (Flicker Minnow; Silver Streak in the Swim Bait) in `src/data/products.ts`.
2. Set `ordering.formEndpoint` (and point the contact form at the same service).
3. Fill in the real Facebook link, email/phone and domain in `site`.
4. Set `prototype: false` and deploy.

## Moving to Shopify (phase 2, when Steve is ready)

1. Set up Shopify (products, variants, inventory, shipping, taxes, payments). Shopify's inventory tracking can mark items sold out automatically, which helps with capacity.
2. Re-implement `src/lib/catalog.ts` against the Shopify Storefront API. The data shapes already mirror Shopify's product, option and variant model.
3. Back `CartProvider` with the Storefront Cart API and send **Checkout** to `cart.checkoutUrl`.
4. Set `ordering.mode = 'shopify'`. Buttons, drawer and shipping wording switch from "order request" to "cart / checkout" automatically. The `open` switch keeps working.
5. Connect the newsletter form (Shopify Customer API, Klaviyo, etc.).
