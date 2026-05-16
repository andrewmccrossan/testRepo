import { createClient } from "@sanity/client";

// Project ID and dataset are public values — safe to commit. They're
// fall-back defaults; either can be overridden via env vars if you ever
// want to point a non-prod build at a different project or dataset.
//
// SANITY_API_READ_TOKEN is only needed if the dataset is private.
// Public datasets allow anonymous reads via the CDN — no token required.

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "34m6fz10",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-01-01",
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
});
