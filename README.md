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

## Where to edit content

- **Site name, nav, author info:** `lib/site.ts`
- **Books (titles, prices, buy links, excerpts):** `lib/books.ts`
- **Blog posts:** `lib/posts.ts`
- **Interactive chapter list:** `app/interactive/page.tsx`
- **Sample chapter prose:** `app/interactive/chapter-1/page.tsx`
- **Color palette and fonts:** `tailwind.config.ts` and `app/layout.tsx`

## Where to wire real commerce

Each book in `lib/books.ts` has a `buy.primary` and optional `buy.secondary` link. Replace the `#` placeholders with Stripe Payment Link URLs (`https://buy.stripe.com/...`), Gumroad URLs, or Amazon affiliate links. No code changes needed.

## Tech

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Fonts via `next/font` (Cinzel, Cormorant Garamond)
- No external images, no third-party dependencies beyond the stack
