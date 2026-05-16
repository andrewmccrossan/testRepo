# Domus Aurea

A Next.js site for an author writing on Roman art and Catholic history. It serves three purposes:

- **Books** — a small shelf of published volumes with optional buy buttons (`/books`)
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
   - Filter: `_type in ["post", "book"]`
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

## Where to wire real commerce

In the Studio, each book has a "Primary buy URL" and "Secondary buy URL" field. Paste in Stripe Payment Link URLs (`https://buy.stripe.com/...`), Gumroad URLs, or Amazon affiliate links. Leaving the primary URL blank renders a disabled "Coming soon" button.

## Tech

- Next.js 14 (App Router, static export)
- TypeScript
- Tailwind CSS
- Sanity v3 (CMS, hosted Studio)
- `@portabletext/react` for rendering rich-text post bodies
- Google Fonts via `next/font` (Cinzel, Cormorant Garamond)
