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

// Passed to every sanityClient.fetch() call.
//
// NOTE: in a full static export (output: "export") Next.js disables ISR,
// so this revalidate TTL is NOT honored across builds — Next treats the
// fetch Data Cache as cache-forever. The actual mechanism that keeps the
// site from serving stale CMS content is the build script, which deletes
// .next/cache/fetch-cache before every `next build` (Render restores
// .next/cache between deploys, so without that the old Sanity responses
// get replayed). This option is kept as harmless belt-and-suspenders in
// case we ever move to ISR/runtime fetching.
export const SANITY_FETCH_OPTIONS = { next: { revalidate: 10 } } as const;
