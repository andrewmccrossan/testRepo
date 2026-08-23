# italybygreg.com — project guide

A website for **Greg Pulles**, a retired attorney and grade-school Latin teacher
who has spent thirty years photographing and writing about the churches, art,
and architecture of Rome and Italy. He has six published books. The site sells
his books and photographic greeting cards, hosts his biweekly blog, and is
growing an interactive walking map of Rome.

**Andrew** (afmccrossan@gmail.com) builds and operates the site. **Greg**
(greg.pulles@gmail.com) writes the content and owns the business accounts.

Live at **https://italybygreg.com**.

---

## Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 14, App Router | `output: "export"` — a **fully static site**, no server |
| Styling | Tailwind | Palette + fonts in `tailwind.config.ts` |
| CMS | Sanity v3 | Project `34m6fz10`, dataset `production` |
| Studio | `https://domus-aurea.sanity.studio` | Schemas live in this repo, deployed via GitHub Action |
| Hosting | Render (Static Site) | Build `npm install && npm run build`, publish dir `out` |
| Payments | Stripe Payment Links | No payment code in this repo |
| Registrar | GoDaddy | DNS may move to Cloudflare — see Roadmap |
| Maps | Leaflet + CARTO basemap tiles | Loaded dynamically, client-only |

`output: "export"` is load-bearing. Everything below follows from "there is no
server": content is fetched **at build time**, and nothing in the bundle can be
kept secret from the browser.

---

## Repository map

```
app/                  routes (App Router)
  page.tsx            home — hero, recent writing, cards band
  books/              list + [slug] detail (gallery, buy buttons, reviews)
  blog/               list + [slug] post (Portable Text)
  cards/              greeting-card shop
  about/              About — body comes from Sanity, falls back to built-in copy
  map/                UNLISTED interactive Rome map (sandbox)
  decode/             UNLISTED tool: paste a Stripe client_reference_id, see the cards
  thanks/             UNLISTED post-checkout page; clears the saved card selection
  sitemap.ts robots.ts not-found.tsx
components/           RomeMap, CardsBrowser, BookGallery, BookCover, PortableBody, …
lib/
  site.ts             name, author, email, nav  ← single source for these
  sanity/client.ts    client + SANITY_FETCH_OPTIONS
  sanity/queries.ts   all GROQ
  books.ts posts.ts cards.ts about.ts   fetch + shape content
  reviews.ts          hardcoded book reviews, keyed by slug
  mapPoints.ts        hardcoded map POIs (placeholder — destined for Sanity)
sanity/schemas/       post, book, photoCard, cardSettings, aboutPage
public/map/rioni.geojson   22 rioni boundaries
.github/workflows/    manual "Deploy Sanity Studio" action
```

---

## Hard-won gotchas

Each of these cost real debugging time. Please don't rediscover them.

**1. Next's fetch cache silently serves stale CMS content.**
With `output: "export"`, Next disables ISR and treats its fetch Data Cache as
cache-forever; Render restores `.next/cache` between deploys. The result: you
publish in Sanity, the deploy runs green, and the site still shows old content.
The fix lives in `package.json`:

```
"build": "rm -rf .next/cache/fetch-cache && next build"
```

**Never change the build command on Render to `next build` directly** — it must
run the npm script, or this bug comes straight back. (`SANITY_FETCH_OPTIONS` in
`lib/sanity/client.ts` is belt-and-braces only; the revalidate TTL is ignored in
export mode.)

**2. The Sanity webhook filter must list every document type.**
It points at a Render Deploy Hook and triggers on create/update/**delete**.
Current filter:

```
_type in ["post", "book", "photoCard", "cardSettings", "aboutPage"]
```

Add new document types here or publishing them will never trigger a rebuild.
Deletes need to be enabled too — a removed book lingering on the site was a real
bug.

**3. Draft ≠ published.** Sanity autosaves drafts; the build only sees published
documents. Ninety percent of "my change isn't showing up" is this.

**4. Browser cache masks successful deploys.** Always hard-refresh before
diagnosing.

**5. Stripe `client_reference_id` is restricted to `[A-Za-z0-9_-]`.** The card
shop encodes the customer's pack as `CODE1xN_CODE2xN_…` — underscores, never
commas. Stripe rejects commas.

**6. Stripe recurring prices poison payment links** — a link bound to a
subscription price can't take shipping rates. Card-pack prices must be one-time.

**7. This sandbox can't reach Sanity's API** (host not in the egress allowlist),
so `npm run build` fails locally at data fetching. `npx tsc --noEmit` works and
is the best available check. Andrew's local clone has no such restriction.

---

## Content model

All Sanity-editable. `sanity/schemas/`:

- **post** — blog. `title, subtitle, slug, date, tag, excerpt, body`.
  `tag` and `excerpt` are optional and the UI hides them when absent.
  Reading time is **computed at build** from word count — there is no field.
- **book** — `title, subtitle, slug, year, price, images[], description,
  details[], buyPrimary/SecondaryLabel+Url, excerpt`. Buy buttons show
  "coming soon" when the URL is blank.
- **photoCard** — a greeting card. Auto-generated unique `code` is the handle
  sent to Stripe; **don't delete or re-code a card with unfulfilled orders.**
- **cardSettings** — singleton: `packSize`, `price`, `stripePaymentUrl`, `intro`.
- **aboutPage** — singleton Portable Text body for `/about`.

Hardcoded and awaiting migration to Sanity: `lib/reviews.ts` (book reviews) and
`lib/mapPoints.ts` (map POIs).

---

## Deploy pipeline

```
push to main ──────────────► Render builds ──► italybygreg.com
publish in Sanity ──► webhook ──► Render Deploy Hook ──► same build
```

Content changes take ~2–5 minutes to appear. Schema changes additionally need
the **Deploy Sanity Studio** GitHub Action run manually (needs repo secret
`SANITY_AUTH_TOKEN`).

Env vars on Render: `SANITY_API_READ_TOKEN`. Project id and dataset have
defaults in code.

---

## Conventions

- **Verify before pushing.** There is no CI. At minimum `npx tsc --noEmit`; a
  JSX syntax error once reached production because only a parse check was run.
- Match the surrounding code's comment density and idiom. Comments explain
  *why*, especially for the gotchas above.
- Unlisted pages (`/map`, `/decode`, `/thanks`) stay out of `site.nav`, carry
  `robots: { index: false, follow: false }`, and are listed in `app/robots.ts`.
- **Greg's prose is Greg's.** Several pages carry his own words verbatim (About,
  the Books page narrative, blog). Don't rewrite them in his voice or invent
  copy attributed to him. Placeholder text must be visibly labelled as such —
  `/map` currently does this.
- Copy fixes are fine; factual claims about his books are not ours to invent.

---

## Current state

Working and live: home, books (with galleries + reader reviews), blog, About,
the greeting-card shop with Stripe checkout, `/decode`, `/thanks`.

`/map` is a **sandbox**: Leaflet map, all 22 rioni outlined from
`public/map/rioni.geojson`, 12 points of interest, rione filtering, and a
"Where am I?" geolocation button. The POI text and coordinates in
`lib/mapPoints.ts` are **placeholders written to exercise the UI** — not Greg's
writing — and the page says so on screen.

Note: Rome has **22** rioni (matching the GeoJSON). Greg's book description says
"twenty four" — unresolved, ask before making them agree.

---

## Roadmap: selling the map

The map is intended to become a paid product — "a deconstructed book". Full
technical design (architecture, data model, auth flows, API surface, build
order, costs):

**https://claude.ai/code/artifact/b13c14de-16ba-4bde-b938-460c61207e04**

Shape: Stripe Checkout → magic-link sign-in → a Cloudflare Worker at
`api.italybygreg.com` that checks entitlement and serves paid entries from
Sanity. **The central rule: paid prose must never enter the static build** — a
static site cannot keep a secret, so the build query must omit `body` for paid
entries entirely, not merely hide it in the UI.

Order of work (the first four need no DNS and no server):

1. `poi` document type in Sanity (geopoint, `access`, `teaser`, `body`);
   migrate `lib/mapPoints.ts` into it.
2. Map reads POIs from Sanity.
3. Split the build query so paid bodies are never shipped.
4. Paywall UI states — teaser, unlock, sign-in.
5. Worker on `*.workers.dev` serving entries openly.
6. Then: custom domain + cookies + Stripe + real gating.

**Blocked on DNS:** the Worker's custom domain requires the zone to live in
Cloudflare, which requires a nameserver change at GoDaddy. Without it the Worker
is stuck on `workers.dev`, which is a different site — so the session cookie
becomes third-party and browsers block it. Andrew is arranging access to Greg's
GoDaddy account.

Also pending: migrating this repo's Render service and domain (in progress),
and moving `lib/reviews.ts` into Sanity.
