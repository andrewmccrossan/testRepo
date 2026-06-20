import { createClient } from "@sanity/client";

// Project ID and dataset are public values — safe to commit. They're
// fall-back defaults; either can be overridden via env vars if you ever
// want to point a non-prod build at a different project or dataset.
//
// SANITY_API_READ_TOKEN is only needed if the dataset is private.
// Public datasets allow anonymous reads via the CDN — no token required.

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "34m6fz10";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (typeof window === "undefined") {
  // Build-time / server-side log so build failures are easier to diagnose.
  // eslint-disable-next-line no-console
  console.log(
    `[sanity] client init: projectId=${projectId} dataset=${dataset} token=${process.env.SANITY_API_READ_TOKEN ? "set" : "unset"}`,
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  // useCdn: false — the CDN edge caches responses for up to 60s and can
  // serve stale "empty" results after a dataset visibility change. Static
  // export builds run rarely, so we always want fresh reads. Switch to
  // true only if we move to ISR/runtime fetching with high traffic.
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

// Pass these options to every sanityClient.fetch() call.
//
// We're a Next.js static export. At build time Next routes Sanity's fetch
// through its persistent Data Cache (.next/cache), which Render restores
// between deploys to speed builds up. Without a TTL, Next treats cached
// Sanity responses as fresh forever and replays them on the next deploy —
// so content the author publishes (a new Stripe link, an edited post)
// never appears until the build cache is cleared by hand.
//
// A short revalidate gives those cache entries a finite lifetime. Because
// deploys are always minutes apart, every build sees the previous entry as
// stale and refetches the current published content. A positive revalidate
// keeps the routes fully static, so it stays compatible with output:export.
export const SANITY_FETCH_OPTIONS = { next: { revalidate: 10 } } as const;
