import { sanityClient, SANITY_FETCH_OPTIONS } from "./sanity/client";
import {
  BOOKS_QUERY,
  BOOK_BY_SLUG_QUERY,
  BOOK_SLUGS_QUERY,
} from "./sanity/queries";

export type BookImage = {
  _key?: string;
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  caption?: string;
};

export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  price: string;
  images?: BookImage[];
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
  images?: BookImage[];
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
    images: d.images && d.images.length > 0 ? d.images : undefined,
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

// Hardcoded slug pinned to the end of the books list. The GROQ query
// sorts by year descending, but the author wants "Stones of the Seven
// Hills" last regardless of its year. If we need a richer ordering
// later, promote this to a `sortOrder` number field on the book schema.
const LAST_BOOK_SLUG = "stones-of-the-seven-hills";

export async function getBooks(): Promise<Book[]> {
  const docs = await sanityClient.fetch<SanityBook[]>(
    BOOKS_QUERY,
    {},
    SANITY_FETCH_OPTIONS,
  );
  const books = docs.map(toBook);
  const idx = books.findIndex((b) => b.slug === LAST_BOOK_SLUG);
  if (idx !== -1) {
    const [pinned] = books.splice(idx, 1);
    books.push(pinned);
  }
  return books;
}

export async function getBook(slug: string): Promise<Book | undefined> {
  const doc = await sanityClient.fetch<SanityBook | null>(
    BOOK_BY_SLUG_QUERY,
    { slug },
    SANITY_FETCH_OPTIONS,
  );
  return doc ? toBook(doc) : undefined;
}

export async function getBookSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<string[]>(
      BOOK_SLUGS_QUERY,
      {},
      SANITY_FETCH_OPTIONS,
    );
    // eslint-disable-next-line no-console
    console.log(
      `[sanity] getBookSlugs returned ${slugs?.length ?? 0} slugs:`,
      slugs,
    );
    return slugs ?? [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[sanity] getBookSlugs FAILED:", err);
    throw err;
  }
}
