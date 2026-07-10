import type { PortableTextBlock } from "@portabletext/react";
import { sanityClient, SANITY_FETCH_OPTIONS } from "./sanity/client";
import { ABOUT_QUERY } from "./sanity/queries";

// Returns the About page body from Sanity, or null when no About Page
// document has been created yet (the page then renders built-in starter
// copy so it's never blank).
export async function getAboutBody(): Promise<PortableTextBlock[] | null> {
  const doc = await sanityClient.fetch<{ body?: PortableTextBlock[] } | null>(
    ABOUT_QUERY,
    {},
    SANITY_FETCH_OPTIONS,
  );
  return doc?.body && doc.body.length > 0 ? doc.body : null;
}
