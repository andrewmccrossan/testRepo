import Link from "next/link";
import type { Book } from "@/lib/books";
import { BookCover } from "./BookCover";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className="card group flex flex-col items-center p-8 text-center"
    >
      <BookCover book={book} size="md" />
      <p className="eyebrow mt-6">{book.year}</p>
      <h3 className="mt-2 font-display text-2xl uppercase tracking-wide text-ink">
        {book.title}
      </h3>
      <p className="mt-1 font-serif italic text-ink-soft">{book.subtitle}</p>
      <p className="mt-5 font-display text-sm uppercase tracking-[0.18em] text-crimson group-hover:text-crimson-dark">
        Read more &nbsp;&rarr;
      </p>
    </Link>
  );
}
