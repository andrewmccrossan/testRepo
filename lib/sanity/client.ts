import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "34m6fz10",
  dataset: "production",
  apiVersion: "2026-01-01",
  useCdn: true,
});
