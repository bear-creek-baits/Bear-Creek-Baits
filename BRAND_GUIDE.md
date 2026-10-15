# Bear Creek Baits — Brand Guide

Version 1.1 · October 2026

This guide sets the look and voice of Bear Creek Baits LLC. It is written for two readers: the owner, and whoever builds or updates the website. Every color and font here already exists as a token in `src/app/globals.css`, so the site and this guide stay in sync.

---

## 1. The brand at a glance

**Who we are.** A small, independent tackle maker. Every bait is made by hand: hand-poured soft plastics, hand-tied hair jigs and hand-painted jig heads. Mostly for crappie, with some bass and sauger baits too.

**What we stand for.** Baits made by hand, by people who fish, built to get bit. Nothing is mass-produced: every plastic is poured, every jig is tied and every head is painted by hand. We have been chasing fish for over 50 years, and every bait gets the same care.

**Our proof point.** *Hand-poured. Hand-tied. Hand-painted.* This is the clearest difference between Bear Creek Baits and big-box tackle. Say it often: on the homepage, on every product page and on the package.

**Who we serve.** Crappie anglers first: spider-riggers, single-pole jig fishermen, dock shooters and weekend bank fishermen. Bass and sauger anglers second.

**Personality.** Tough, honest, a little rowdy, and proud of the work. The one-eyed bear in the logo says it: we have been in a few fights and we are still here.

### Taglines

The packaging statements are cleaned up into a standard form. Use them exactly as written below.

| Role | Line | Use it for |
| --- | --- | --- |
| **Primary tagline** | **Bust 'Em Right in the Mouth.** | Hero banners, packaging, shirts, ads, social headers |
| **Heritage line** | **Chasing 'Em for Over 50 Years.** | About page, footer, "our story" sections, trade-show signs |
| **Brand promise** | **We're not a million-dollar company, but a million dollars' worth of heart goes into every bait.** | About page, packaging back panel, thank-you cards, order emails |

Writing rules for the taglines:

- Always write **'Em** with the apostrophe and a capital E in headlines (`'Em`, never `Em`, `em` or `'em`).
- Use title case for the two short lines. The brand promise is a sentence, so it uses sentence case.
- Keep the period at the end of the short lines when they stand alone. Drop it in tight spaces like a hat or a button.
- Don't change the wording, combine the lines into one, or add exclamation points.

---

## 2. Logo

The logo is the one-eyed bear gripping a badge with **BEAR CREEK BAITS LLC** and a crappie silhouette set into the letter A. It is the brand's most valuable asset. Use it as drawn.

### Files

| File | Use |
| --- | --- |
| `assets/original/bear-creek-baits-logo-official.webp` | Untouched original as supplied. Archive only. |
| `public/brand/logo.webp` / `logo.png` | Website logo (474 × 464 px, green background) |
| `public/brand/icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon.ico` | App and browser icons |
| `public/brand/og-image.png` | Link preview image for Facebook and texts (1200 × 630) |

> **Action item (once the owner commits to the website):** The only logo on hand is a small raster image on a green background. Get the **vector file** from the original designer or printer (AI, EPS, SVG or PDF). A vector file is needed for sharp printing at any size, for a transparent-background version, and for the one-color versions listed below.

### Approved versions

Once vector art is available, keep these four versions:

1. **Full color on green** — the logo as it appears today. Primary version.
2. **Black and white on any background** — the badge artwork with no green box, for use on black, bone or photos.
3. **One-color black** — for single-color printing, stickers, engraving and receipts.
4. **One-color white (knockout)** — for dark shirts, hats and dark photos.

Until then, use the full-color version on green only.

### Clear space and size

- **Clear space:** keep empty space around the logo equal to the height of the word **CREEK** on every side. Nothing else (text, edges, other logos) goes inside it.
- **Minimum size:** 120 px wide on screen, 1.25 in (32 mm) wide in print. Below that the bear's fur and the crappie turn to mush.
- **Small spaces** (favicons, social avatars, embroidery under 2 in): use the full logo cropped tight inside a square or circle on green. If a smaller mark is ever needed, have the designer draw a simplified bear head. Don't crop pieces out of the current logo.

### Don'ts

- Don't stretch, squish, rotate or tilt it.
- Don't recolor the bear or the lettering, or swap the green for another color.
- Don't add drop shadows, glows, outlines or bevels.
- Don't place the full-color version on busy photos where the badge edge gets lost. Use the black-and-white or knockout version instead.
- Don't rebuild the words **BEAR CREEK BAITS** in a font next to the logo. The logo already says it.
- Don't remove "LLC" from the logo. (In running text, "Bear Creek Baits" without LLC is fine. Use "Bear Creek Baits LLC" for legal, invoices and the footer copyright.)

---

## 3. Color

The palette comes straight from the logo: a bright lime green, a near-black ink and a warm off-white. Green is the brand's signature. Black and bone do most of the work; green is the punch.

### Core colors

| Name | Hex | RGB | CSS token | Role |
| --- | --- | --- | --- | --- |
| **Bear Creek Green** | `#8DBB2C` | 141 187 44 | `--green` | Signature color. Buttons, highlights, logo background, accents on black. |
| **Night Black** | `#151613` | 21 22 19 | `--ink` | Main dark color. Header, footer, dark sections, text on light. |
| **Bone** | `#F3F0E8` | 243 240 232 | `--bone` | Warm light backgrounds, text on black. |
| **Paper** | `#FBFAF6` | 251 250 246 | `--paper` | Main page background. |

### Supporting colors

| Name | Hex | CSS token | Role |
| --- | --- | --- | --- |
| Green Hover | `#A4D23A` | `--green-hi` | Hover state for green buttons only |
| Moss | `#3F5F0B` | `--green-ink` | Green **text** on light backgrounds (links, small labels) |
| Stone | `#E7E3D8` | `--stone` | Product photo panels, cards |
| Line | `#DAD5C8` | `--line` | Borders and dividers on light backgrounds |
| Slate | `#5F6157` | `--muted` | Secondary text on light backgrounds |
| Fog | `#A9ABA0` | `--muted-on-dark` | Secondary text on black |
| Signal Orange | `#EE6A21` / `#B84A0C` | `--orange` / `--orange-ink` | **Alerts only:** low stock, sale price, "new". Never decorative. |
| Error Red | `#B3261E` | `--danger` | Form errors only |

**Print approximations** (confirm with the printer against a physical proof): Bear Creek Green ≈ PMS 376 C / CMYK 50 0 100 10. Night Black = rich black CMYK 60 40 40 100.

### Color pairs that pass accessibility

Measured against WCAG 2.1 (4.5:1 is the minimum for body text; 3:1 for large headings).

| Text | Background | Contrast | OK for |
| --- | --- | --- | --- |
| Bear Creek Green | Night Black | 8.0 : 1 | Any text |
| Night Black | Bear Creek Green | 8.0 : 1 | Any text, including buttons |
| Bone | Night Black | 16.0 : 1 | Any text |
| Moss | Paper | 7.1 : 1 | Any text |
| Slate | Paper | 6.0 : 1 | Any text |
| Signal Orange (dark) | Paper | 5.0 : 1 | Any text |
| Bear Creek Green | Paper | 2.2 : 1 | **Never use for text.** Shapes and fills only. |
| White | Bear Creek Green | 2.3 : 1 | **Never.** Use black text on green. |

### Proportion

Aim for roughly **60% light (Paper/Bone), 30% Night Black, 10% Green.** On dark pages flip it: 60% black, 30% bone, 10% green. If green covers more than about a fifth of a screen, it stops feeling like a highlight.

### Bait colors are not brand colors

Product colors (chartreuse, pink, monkey milk, black/chartreuse and so on) live in `src/data/colors.ts` and appear only on swatches and product art. Don't use them in page design, buttons or headings.

---

## 4. Typography

The logo lettering is heavy, condensed and a little roughed up. The fonts echo that with clean, hard-working condensed type that stays readable at every size. Leave the distressed texture to the logo.

| Role | Font | Weights | CSS token | Use |
| --- | --- | --- | --- | --- |
| **Display** | Big Shoulders Display | 800 (ExtraBold) | `--font-display` | Headlines, taglines, section titles. Always UPPERCASE. |
| **Label** | Barlow Condensed | 600, 700 | `--font-label` | Buttons, navigation, eyebrows, prices, tags. UPPERCASE with wide letter-spacing. |
| **Body** | Barlow | 400, 500, 600, 700 | `--font-body` | Paragraphs, product descriptions, forms. Sentence case. |

All three are free under the SIL Open Font License, available from Google Fonts, and self-hosted on the site through Fontsource. For print and Canva/Adobe Express work, download them from fonts.google.com.

### Type scale (website)

| Element | Font | Size | Line height | Notes |
| --- | --- | --- | --- | --- |
| Hero headline | Display 800 | 56–112 px (fluid) | 0.95 | Uppercase |
| Page title (H1) | Display 800 | 44–84 px | 0.98 | Uppercase |
| Section title (H2) | Display 800 | 36–60 px | 0.98 | Uppercase |
| Card title (H3) | Display 800 | 22–28 px | 1.0 | Uppercase |
| Eyebrow | Label 700 | 15 px | 1.2 | Uppercase, 0.14em tracking, green bar before it |
| Button | Label 700 | 17 px | 1 | Uppercase, 0.10em tracking |
| Body | Body 400 | 17 px | 1.55 | Max ~65 characters per line |
| Small / hints | Body 400 | 14 px | 1.45 | Slate color |
| Price | Label 700 | 20–28 px | 1 | Use tabular numbers |

### Rules

- Headlines are short. Two to six words is the target.
- Never set body text in all caps or in the display font.
- Never use more than these three fonts. No script fonts, no "western" fonts, no distressed or stencil fonts.
- Write fractions and weights the way anglers read them: `1/16 oz`, `1/32 oz`, `2"`, `#2 hook`.

---

## 5. Voice and tone

**We sound like the angler at the boat ramp who's caught more crappie than anybody there, and will tell you exactly how.** Confident, plain-spoken, friendly, short on hype.

| We are | We are not |
| --- | --- |
| Straight talkers | Corporate or salesy |
| Proud of hand work | Bragging about being the biggest |
| Fishing people talking to fishing people | Explaining fishing to beginners like they're dumb |
| A little rowdy (see: tagline) | Crude or mean |
| Specific: weights, colors, water conditions | Vague: "premium quality", "next level" |

### How we write

- **Short sentences. Plain words.** Write it the way you'd say it across a tailgate.
- **Lead with what the bait does.** "Falls slow and keeps its tail kicking on a dead stick" beats "Premium high-action soft plastic."
- **Use real fishing words.** Slabs, spider rigging, dock shooting, single-pole, stained water, brush piles, the spawn, the bite.
- **Crappie first.** Bass and sauger get their own sections and product notes, but crappie leads the homepage and the menus.
- **Clean grammar in body copy.** The grit lives in the taglines and headlines. Product descriptions, policies, shipping info and emails are written in plain, correct English.
- **Proof over promises.** Customer catch photos and "here's where it worked" notes beat adjectives.

### Words to use and avoid

| Use | Avoid |
| --- | --- |
| hand-poured, hand-tied, hand-painted, small-batch | premium, elite, pro-grade |
| gets bit, puts fish in the boat | revolutionary, cutting-edge, game-changing |
| slab, papermouth, crappie | "fish catching machine", "irresistible" |
| small shop, made by people who fish | million-dollar, industry-leading |
| color names anglers know (monkey milk, black/chartreuse) | invented brand-speak for common colors |

### Copy examples

**Homepage hero**
> BUST 'EM RIGHT IN THE MOUTH.
> Hand-poured crappie plastics, hand-tied hair jigs and hand-painted jig heads from a small shop that's been chasing 'em for over 50 years.
> [Shop Crappie Baits]

**Product description (soft plastic)**
> A hand-poured 2" shad body with a thin paddle tail that swims at a crawl. Rig it on a 1/16 oz head for docks, or go 1/8 oz when you're spider rigging in wind.

**Order confirmation email**
> Thanks for your order. We're getting it packed now. We're not a million-dollar company, but a million dollars' worth of heart goes into every bait, and yours is no different. Send us a picture when you stick a good one.

**Out-of-stock message**
> This color is sold out. We pour every bait by hand in small batches, so it'll be back. Tap "Notify me" and we'll email you when it is.

### Naming products

Use this order on the website so customers can scan and filter:

`[Size] [Body or bait type] – [Color]` → `2" Shad Tail – Monkey Milk`
`[Weight] [Head style] Jig Head – [Color]` → `1/16 oz Round Head Jig Head – Chartreuse`
`[Weight] Hair Jig – [Color]` → `1/32 oz Hair Jig – Black/Chartreuse`

Fun names for colors are fine (and part of fishing culture), as long as the actual colors are in the description so search and filters still work.

---

## 6. Photography and imagery

- **Real over polished.** Real fish, real hands, real water, real boats. Customer catch photos are gold; ask permission and credit them.
- **Product shots:** baits on a plain Bone or Stone background, shot from above in soft daylight, with a ruler or a hook in frame now and then for scale. Show the true color; color is how crappie anglers shop.
- **Lifestyle shots:** early morning and late evening light, docks, brush piles, spider-rig rods in holders, a slab held close to the camera.
- **Avoid:** generic stock photos, saltwater or fly-fishing scenes, heavy filters that shift bait colors, and photos where the bait can't be seen.

### Graphic elements

- **Topo lines:** the faint contour-line texture used on dark sections of the website (`.topo` class). It nods to lake maps and depth finders. Use it only on Night Black and keep it barely visible.
- **Green eyebrow bar:** the short green dash before small labels. Use it to introduce a section, not as decoration on every line.
- **Corners:** slightly rounded (4–8 px). Nothing pill-shaped except small tags.

---

## 7. Applying the brand on the website

The site in this repo already uses the system above. When adding pages or features:

1. **Use the tokens, not raw values.** Colors, fonts, radii and shadows are CSS variables in `src/app/globals.css`. Don't type a hex code into a component.
2. **Buttons:** primary = green background, black text (`.btn`). Secondary = black background, bone text (`.btn-dark`). On photos or dark sections = outline (`.btn-outline`). One primary button per screen area.
3. **Header and footer:** Night Black with the logo on its green square. The footer carries the heritage line and `© Bear Creek Baits LLC`.
4. **Section rhythm:** alternate Paper and Night Black (with topo texture) sections so long pages don't blur together.
5. **Where the taglines go:**
   - *Bust 'Em Right in the Mouth.* — homepage hero headline, social share image.
   - *Chasing 'Em for Over 50 Years.* — footer, About page header.
   - *Brand promise* — About page, order confirmation, packing slip.
   - *Hand-poured. Hand-tied. Hand-painted.* — homepage strip under the hero, every product page near the price, About page.
6. **Focus and accessibility:** keep the green focus outline. Never put green text on a light background or white text on green (see section 3).
7. **Social and email:** profile picture = full-color logo on green, cropped square. Cover/banner = Night Black with topo lines, the primary tagline in Big Shoulders Display, and a product or catch photo.

---

## 8. Open items for the owner

Once the owner commits to the website:

- [ ] Vector logo file (AI, EPS, SVG or PDF) from the original designer
- [ ] Exact Facebook page link and any other social accounts

Also needed before launch:

- [ ] Names and a photo for the About page, if wanted, and the story behind the 50 years
- [ ] Real product photos and the current list of baits, colors, weights and prices
- [ ] Business email, phone and city/state to show on the site
- [ ] Printer's Pantone match for Bear Creek Green, so packaging, shirts and stickers all match
