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
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
});
