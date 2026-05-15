import Link from "next/link";
import { notFound } from "next/navigation";
import { books, getBook, isPlaceholder } from "@/lib/books";
import { BookCover } from "@/components/BookCover";
import { OrnamentDivider } from "@/components/Ornament";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const book = getBook(params.slug);
  return { title: book?.title ?? "Book" };
}

export default function BookDetailPage({ params }: { params: { slug: string } }) {
  const book = getBook(params.slug);
  if (!book) notFound();

  return (
    <>
      <section className="container-wide pt-16 pb-12">
        <Link
          href="/books"
          className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft hover:text-crimson"
        >
          &larr; Back to the shelf
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-[auto,1fr] lg:gap-20">
          <div className="flex justify-center lg:block">
            <BookCover book={book} size="lg" />
          </div>

          <div>
            <p className="eyebrow">{book.year}</p>
            <h1 className="mt-3 font-display text-4xl uppercase leading-tight tracking-wide text-ink md:text-5xl">
              {book.title}
            </h1>
            <p className="mt-3 font-serif text-2xl italic leading-snug text-ink-soft">
              {book.subtitle}
            </p>

            <div className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-ink/90">
              {book.description}
            </div>

            <ul className="mt-8 space-y-1 font-serif text-base italic text-ink-soft">
              {book.details.map((d) => (
                <li key={d}>&mdash; {d}</li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {isPlaceholder(book.buy.primary.href) ? (
                <span
                  className="btn-primary cursor-not-allowed opacity-60"
                  aria-disabled="true"
                  title="Direct purchase not yet enabled"
                >
                  Direct purchase &mdash; coming soon
                </span>
              ) : (
                <a href={book.buy.primary.href} className="btn-primary">
                  {book.buy.primary.label}
                </a>
              )}
              {book.buy.secondary &&
                (isPlaceholder(book.buy.secondary.href) ? (
                  <span
                    className="btn-ghost cursor-not-allowed opacity-60"
                    aria-disabled="true"
                    title="Listing not yet enabled"
                  >
                    Amazon listing &mdash; coming soon
                  </span>
                ) : (
                  <a href={book.buy.secondary.href} className="btn-ghost">
                    {book.buy.secondary.label}
                  </a>
                ))}
              <p className="font-serif text-sm italic text-ink-soft">
                Free shipping within the EU on direct orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {book.excerpt && (
        <section className="container-prose pb-20">
          <OrnamentDivider className="mb-12" />
          <p className="eyebrow text-center">From the opening pages</p>
          <blockquote className="mt-6 font-serif text-2xl leading-relaxed text-ink">
            <span className="font-display text-5xl leading-none text-crimson">&ldquo;</span>
            <span className="italic">{book.excerpt}</span>
          </blockquote>
        </section>
      )}
    </>
  );
}
