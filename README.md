# Bear Creek Baits — storefront prototype

A working e-commerce prototype for Bear Creek Baits LLC: home page, shop with category tabs, filters and sort, product pages with variant pickers, search, a cart that is saved in the browser, and a checkout hand-off marked as a prototype.

**Every product, price, option, color and stock status is sample data.** The only verified business inputs so far are the business name, the product types it sells, and the official logo.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm start          # serve ./out on http://localhost:3000
```

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
| **Sample product catalog** | `src/data/products.ts` |
| Sample colorways / swatches | `src/data/colors.ts` |
| Categories and their copy | `src/data/categories.ts` |
| Catalog access layer (swap this for Shopify later) | `src/lib/catalog.ts` |
| Cart (localStorage) | `src/components/cart/CartProvider.tsx` |
| Bait illustrations (stand-ins until photos exist) | `src/components/product/ProductArt.tsx` |
| Original uploaded logo (untouched) | `assets/original/` |
| Web logo and icons (cropped to drop stray text along the bottom edge; artwork unchanged) | `public/brand/` |

### Adding real product photos

Add images under `public/products/…` and list them in the product's `images` array, or on individual variants (`variant.image`). Once a photo exists it replaces the illustration automatically.

### Turning off prototype mode

Set `prototype: false` in `src/content/site.ts`. That removes the sample-content notices and lets search engines index the site. Only do this after real catalog data and checkout are in place.

## Path to production (suggested)

1. Set up Shopify (products, variants, inventory, shipping, taxes, payments).
2. Re-implement `src/lib/catalog.ts` against the Shopify Storefront API. The data shapes already mirror Shopify's product, option and variant model.
3. Back `CartProvider` with the Storefront Cart API and send **Checkout** to `cart.checkoutUrl`.
4. Connect the contact and newsletter forms (Shopify Forms, Klaviyo, Formspree, etc.).
5. Set the real domain in `site.url` and turn off prototype mode.
