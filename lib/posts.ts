import type { PortableTextBlock } from "@portabletext/react";
import { sanityClient, SANITY_FETCH_OPTIONS } from "./sanity/client";
import {
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
} from "./sanity/queries";

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  dateLabel: string;
  readingTime: string;
  tag: string;
  excerpt: string;
  body: PortableTextBlock[];
};

type SanityPost = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  tag?: string;
  readingTime?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function toPost(d: SanityPost): Post {
  return {
    slug: d.slug,
    title: d.title,
    subtitle: d.subtitle ?? "",
    date: d.date,
    dateLabel: dateFormatter.format(new Date(`${d.date}T00:00:00Z`)),
    readingTime: d.readingTime ?? "",
    tag: d.tag ?? "",
    excerpt: d.excerpt ?? "",
    body: d.body ?? [],
  };
}

export async function getPosts(): Promise<Post[]> {
  const docs = await sanityClient.fetch<SanityPost[]>(
    POSTS_QUERY,
    {},
    SANITY_FETCH_OPTIONS,
  );
  return docs.map(toPost);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const doc = await sanityClient.fetch<SanityPost | null>(
    POST_BY_SLUG_QUERY,
    { slug },
    SANITY_FETCH_OPTIONS,
  );
  return doc ? toPost(doc) : undefined;
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<string[]>(
      POST_SLUGS_QUERY,
      {},
      SANITY_FETCH_OPTIONS,
    );
    // eslint-disable-next-line no-console
    console.log(`[sanity] getPostSlugs returned ${slugs?.length ?? 0} slugs`);
    return slugs ?? [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[sanity] getPostSlugs FAILED:", err);
    throw err;
  }
}
