# Domus Aurea

A Next.js site for an author writing on Roman art and Catholic history. It serves three purposes:

- **Books** — a small shelf of published volumes with optional buy buttons (`/books`)
- **Cards** — a mix-and-match photo card shop where customers pick any N from a catalog of themed photographs (`/cards`)
- **Journal** — a blog of essays and short writings (`/blog`)
- **Interactive** — an in-progress book presented chapter by chapter as an interactive object (`/interactive`)

## Design

A parchment / crimson / muted-gold palette with Cinzel display type (Roman inscriptional capitals) and Cormorant Garamond for body copy. SVG ornaments (laurel, cross, rose window, column) are used as section dividers instead of bitmap imagery, so the site renders without any external image assets.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

The site fetches its content (books and journal posts) from Sanity at build time. `npm run dev` will fetch live from the production dataset — no local content database needed.

## Content management

Books and journal posts are managed in the **deployed Sanity Studio** at:

👉 **<https://domus-aurea.sanity.studio>**

The author logs in with Google. New posts and edits are published from there. The studio runs on Sanity's infrastructure (we don't host it).

- **Sanity Project ID:** `34m6fz10`
- **Sanity Dataset:** `production`

### Publish-to-rebuild webhook

When content is published in the Studio, Sanity sends a POST to a Render Deploy Hook URL, which kicks off a site rebuild. This is what makes "click Publish, see it live in ~2 min" work.

To set up (one-time):

1. **Get the Render Deploy Hook URL** — Render dashboard → your service → Settings → scroll to "Deploy Hook" → Copy the URL.
2. **Add the webhook in Sanity** — <https://www.sanity.io/manage/project/34m6fz10/api/webhooks> → Create webhook.
   - Name: `Render rebuild`
   - URL: paste the Deploy Hook URL
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - Filter: `_type in ["post", "book", "photoCard", "photoTheme", "cardSettings"]`
   - HTTP method: POST
   - HTTP body: leave empty
3. Save. Now every Publish in the Studio triggers a Render rebuild.

### Dataset visibility

The `production` dataset must be set to **Public** so the build can fetch content anonymously. <https://www.sanity.io/manage/project/34m6fz10/datasets> → `production` → Settings → Visibility: Public.

If you ever want to keep the dataset private, create a Viewer-permission token in Sanity Manage and set `SANITY_API_READ_TOKEN` as a Render env var. The site's Sanity client will pick it up automatically (`lib/sanity/client.ts`).

### Schema changes

The schema for posts and books lives in `sanity/schemas/`. After editing a schema:

1. Test locally with `npm run studio:dev` (opens Studio on `http://localhost:3333`)
2. Re-deploy the Studio. Two ways:
   - **Local:** `npm run studio:login` once, then `npm run studio:deploy`
   - **From the GitHub Actions tab:** trigger the "Deploy Sanity Studio" workflow

## Other content (not in CMS)

- **Site name, nav, author info:** `lib/site.ts`
- **Interactive chapter list:** `app/interactive/page.tsx`
- **Sample chapter prose:** `app/interactive/chapter-1/page.tsx`
- **Color palette and fonts:** `tailwind.config.ts` and `app/layout.tsx`

## Book images

Each book in Sanity has a **"Cover and additional images"** field — an ordered array of images. The first image is used as the cover (shown in book cards, the homepage feature, and the book detail page). On the detail page, all images render in a swipeable gallery with prev/next arrows and dot indicators.

- **Format / size**: anything; aim for at least 1200px on the long side for retina. Sanity's CDN resizes and converts format (WebP/AVIF) automatically.
- **Aspect ratio**: gallery slides display at 2:3 (book-cover ratio) using cover-fit, so non-2:3 images will crop. Configure the hotspot in Studio to control how each image is centered.
- **Per image**: optional alt text (accessibility / SEO) and caption (shown below the image in the gallery).
- **Fallback**: books with zero images uploaded show the SVG-generated cover (using `coverBackgroundColor`, `coverAccentColor`, `coverMotif`).

## Where to wire real commerce

### Books

In the Studio, each book has a "Primary buy URL" and "Secondary buy URL" field. Paste in Stripe Payment Link URLs (`https://buy.stripe.com/...`), Gumroad URLs, or Amazon affiliate links. Leaving the primary URL blank renders a disabled "Coming soon" button.

### Photo cards

The cards shop is a **mix-and-match cart**: the customer browses a catalog of photographs (organized into themes like "Sacred Art" or "Roman Churches"), picks exactly N of them (default N = 12), and checks out for a single flat price. The selection is sent to Stripe via the Payment Link's `client_reference_id` URL parameter, so the customer's specific 12 photo codes appear next to the order in the Stripe dashboard.

#### Sanity content (in this order)

1. **Photo Card Theme** — create one for each category (e.g. Sacred Art, Roman Churches, Statues). Set an optional `order` number to control filter-bar order.
2. **Photo Card** — one per card design. Upload the image, set a title, pick a theme. The 6-char `code` field auto-generates; don't edit it.
3. **Photo Card Pack — Settings** — create exactly one of these. Set:
   - `packSize` (default 12) — how many cards in a pack
   - `price` — display price, e.g. `"$30"`
   - `stripePaymentUrl` — Stripe Payment Link for the "Pack of N cards" product (see below). Leave blank to show "Coming soon" on the checkout button.
   - `intro` — optional page intro

#### Stripe setup

Create **one** Stripe product priced at the pack price (e.g. "Roman Photo Cards — Pack of 12, $30"). Generate a Payment Link for it. Paste that URL into `stripePaymentUrl` in the Card Pack Settings doc.

When a customer clicks Checkout, the site appends `?client_reference_id=CODE1,CODE2,...` (12 codes, comma-separated). In the Stripe dashboard, the order shows this reference next to the payment — look up each code in the Studio (Photo Card → search by code) to know what to print and ship.

**Limitation**: the customer sees a generic "Pack of 12 $30" on the Stripe checkout page, not their itemized selection (they did just see it on our site before clicking through). If a richer checkout is needed later, the upgrade path is a serverless function that creates Stripe Checkout Sessions with one line item per photo.

## Tech

- Next.js 14 (App Router, static export)
- TypeScript
- Tailwind CSS
- Sanity v3 (CMS, hosted Studio)
- `@portabletext/react` for rendering rich-text post bodies
- Google Fonts via `next/font` (Cinzel, Cormorant Garamond)
