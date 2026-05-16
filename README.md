# Domus Aurea

A Next.js site for an author writing on Roman art and Catholic history. It serves three purposes:

- **Books** — a small shelf of published volumes with placeholder buy buttons (`/books`)
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

## Content management

Books and journal posts are managed in **Sanity Studio** (a hosted CMS). The author writes in a browser-based editor; published content rebuilds the site automatically.

- **Project ID:** `34m6fz10`
- **Dataset:** `production`

### Running the Studio locally

```bash
npm run studio:dev
```

Opens the Studio at <http://localhost:3333>. Use this when changing schemas (the field definitions in `sanity/schemas/`).

### Deploying the Studio (one-time + after schema changes)

```bash
npm run studio:login    # one-time browser OAuth
npm run studio:deploy   # picks a subdomain, e.g. domus.sanity.studio
```

After deploy, the author logs in at the chosen URL. Schema changes take effect the next time you run `studio:deploy`.

### Inviting the author

In <https://www.sanity.io/manage>, open the project → **Members** → invite by email with role **Editor**. They'll receive an email; once they accept, they can log into the Studio.

### Publish-to-rebuild webhook

When content is published in the Studio, Sanity should POST to a Render Deploy Hook to trigger a site rebuild. To set up:

1. Render dashboard → service → **Settings** → **Deploy Hook** → copy the URL.
2. <https://www.sanity.io/manage> → project → **API** → **Webhooks** → **Add Webhook**.
   - URL: the Render Deploy Hook URL
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - Filter: leave empty (or `_type in ["post", "book"]` to only rebuild on content changes)

## Other content (not in CMS yet)

- **Site name, nav, author info:** `lib/site.ts`
- **Interactive chapter list:** `app/interactive/page.tsx`
- **Sample chapter prose:** `app/interactive/chapter-1/page.tsx`
- **Color palette and fonts:** `tailwind.config.ts` and `app/layout.tsx`

## Where to wire real commerce

Each book in Sanity has a "Primary buy" and "Secondary buy" URL field. Paste in Stripe Payment Link URLs (`https://buy.stripe.com/...`), Gumroad URLs, or Amazon affiliate links. Leaving the primary URL blank renders a disabled "Coming soon" button.

## Tech

- Next.js 14 (App Router, static export)
- TypeScript
- Tailwind CSS
- Sanity v3 (CMS, hosted Studio)
- Google Fonts via `next/font` (Cinzel, Cormorant Garamond)
