import type { MetadataRoute } from "next";
import { getBookSlugs } from "@/lib/books";
import { getPostSlugs } from "@/lib/posts";

const BASE = "https://italybygreg.com";

// Generated at build time into /sitemap.xml. Trailing slashes match the
// site's trailingSlash: true routing.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [bookSlugs, postSlugs] = await Promise.all([
    getBookSlugs(),
    getPostSlugs(),
  ]);

  const staticPages = ["", "/books", "/cards", "/blog", "/about"];

  return [
    ...staticPages.map((path) => ({ url: `${BASE}${path}/` })),
    ...bookSlugs.map((slug) => ({ url: `${BASE}/books/${slug}/` })),
    ...postSlugs.map((slug) => ({ url: `${BASE}/blog/${slug}/` })),
  ];
}
