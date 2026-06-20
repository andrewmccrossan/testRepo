import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook, getBookSlugs } from "@/lib/books";
import { BookCover } from "@/components/BookCover";
import { BookGallery } from "@/components/BookGallery";
import { OrnamentDivider } from "@/components/Ornament";

export async function generateStaticParams() {
  const slugs = await getBookSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const book = await getBook(params.slug);
  return { title: book?.title ?? "Book" };
}

export default async function BookDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const book = await getBook(params.slug);
  if (!book) notFound();

  const primaryHref = book.buy.primary.href;
  const secondary = book.buy.secondary;

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
            {book.images && book.images.length > 0 ? (
              <BookGallery images={book.images} title={book.title} />
            ) : (
              <BookCover book={book} size="lg" />
            )}
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
              {primaryHref ? (
                <a href={primaryHref} className="btn-primary">
                  {book.buy.primary.label}
                </a>
              ) : (
                <span
                  className="btn-primary cursor-not-allowed opacity-60"
                  aria-disabled="true"
                  title="Direct purchase not yet enabled"
                >
                  Direct purchase &mdash; coming soon
                </span>
              )}
              {secondary && (
                <a href={secondary.href} className="btn-ghost">
                  {secondary.label}
                </a>
              )}
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
