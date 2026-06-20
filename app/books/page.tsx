import { getBooks } from "@/lib/books";
import { BookCard } from "@/components/BookCard";
import { OrnamentDivider } from "@/components/Ornament";

export const metadata = { title: "Books" };

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <>
      <section className="container-wide pt-16 pb-10 text-center">
        <p className="eyebrow">Bibliotheca</p>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-wide text-ink md:text-6xl">
          The Books
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink-soft">
          A short shelf, made one volume at a time. Signed copies are available
          directly; trade editions through the usual booksellers.
        </p>
        <OrnamentDivider className="mt-10" />
      </section>

      <section className="container-wide pb-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>
    </>
  );
}
