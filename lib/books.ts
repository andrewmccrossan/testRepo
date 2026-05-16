import { sanityClient } from "./sanity/client";
import {
  BOOKS_QUERY,
  BOOK_BY_SLUG_QUERY,
  BOOK_SLUGS_QUERY,
} from "./sanity/queries";

export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  price: string;
  cover: {
    palette: [string, string];
    motif: "cross" | "laurel" | "column" | "rose";
  };
  description: string;
  details: string[];
  buy: {
    primary: { label: string; href?: string };
    secondary?: { label: string; href: string };
  };
  excerpt?: string;
};

type SanityBook = {
  slug: string;
  title: string;
  subtitle?: string;
  year?: string;
  price?: string;
  coverBackgroundColor?: string;
  coverAccentColor?: string;
  coverMotif?: "cross" | "laurel" | "column" | "rose";
  description?: string;
  details?: string[];
  buyPrimaryLabel?: string;
  buyPrimaryUrl?: string;
  buySecondaryLabel?: string;
  buySecondaryUrl?: string;
  excerpt?: string;
};

function toBook(d: SanityBook): Book {
  const book: Book = {
    slug: d.slug,
    title: d.title,
    subtitle: d.subtitle ?? "",
    year: d.year ?? "",
    price: d.price ?? "",
    cover: {
      palette: [
        d.coverBackgroundColor ?? "#1F1812",
        d.coverAccentColor ?? "#D4B25A",
      ],
      motif: d.coverMotif ?? "cross",
    },
    description: d.description ?? "",
    details: d.details ?? [],
    buy: {
      primary: {
        label: d.buyPrimaryLabel ?? "Buy direct",
        href: d.buyPrimaryUrl || undefined,
      },
    },
    excerpt: d.excerpt,
  };
  if (d.buySecondaryUrl) {
    book.buy.secondary = {
      label: d.buySecondaryLabel ?? "Buy from retailer",
      href: d.buySecondaryUrl,
    };
  }
  return book;
}

export async function getBooks(): Promise<Book[]> {
  const docs = await sanityClient.fetch<SanityBook[]>(BOOKS_QUERY);
  return docs.map(toBook);
}

export async function getBook(slug: string): Promise<Book | undefined> {
  const doc = await sanityClient.fetch<SanityBook | null>(BOOK_BY_SLUG_QUERY, {
    slug,
  });
  return doc ? toBook(doc) : undefined;
}

export async function getBookSlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(BOOK_SLUGS_QUERY);
}
