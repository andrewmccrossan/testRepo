import Link from "next/link";
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
        <OrnamentDivider className="mt-10" />
      </section>

      <section className="container-wide pb-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>

      {/* Greg's account of his books, verbatim (obvious typos corrected). */}
      <section className="container-prose pb-20">
        <div className="text-center">
          <p className="eyebrow">De Libris</p>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
            About my books.
          </h2>
          <OrnamentDivider className="mt-10" />
        </div>

        <div className="prose-roman mt-12">
          <p className="drop-cap">
            My first book <em>Sacred Places, Rediscovering the Churches of
            Rome</em>, is a large coffee table book about sixty of my favorite
            churches in Rome. I got the idea for this book during a visit with
            two of my sons to Rome during the year of 2000. We visited San
            Lorenzo fuori le mura, my second visit there, and I noticed that
            several of the mosaic tesserae in the frieze on the portico had
            fallen off since my last visit. About this time I learned that most
            churches in Rome are owned by the state (not the Vatican owned
            churches like Saint Peter and Paul). I also came to see that most
            Italians don&rsquo;t go to mass, and so many of the churches are
            fairly deserted. I also became worried about the growing foreign
            presence. I knew all too well about the fate of Hagia Sophia and
            other great churches in the East. And so I decided to photograph
            all the churches to preserve them for posterity. The book kept
            growing. As I learned so much from the multitude of texts I
            acquired, and from my now almost twice a year visits, I added
            descriptive material to the photographs, and so I ended up with as
            much text as photo, and the book became more than 800 pages. I
            think you will enjoy the book. If you have never been it will take
            you on a journey through each of these stunning churches, learning
            who built them and why, the principal artwork, the faith imbedded
            throughout. Some are ancient, some medieval, some Renaissance, and
            many baroque.
          </p>

          <p>
            After the large book, there was a demand for a smaller condensed
            guidebook version, and thus my second book, <em>Sacred
            Places&hellip;An Epic Journey through Sixty Churches in Eleven
            Walks, the Complete Guide</em>.
          </p>

          <p>
            In my readings I came to know the thirteenth century Renaissance
            pioneer Niccola Pisano and the series of pulpits he and his son
            made across Tuscany and Umbria. This led my wife and I to
            pilgrimage to them, and my third book <em>The Holy Pulpits of
            Tuscany</em>.
          </p>

          <p>
            Next came a desire to point out what I felt were the 200 most
            important sites that visitors must see on their visit. This is the
            small spiral guide <em>Due Cento Luoghi</em>.
          </p>

          <p>
            In my visits to Rome I also came to greatly admire the creative and
            chimeric baroque architecture of Francesco Borromini. I spent
            several years reading about this man and his works, and
            photographing his buildings. He wrote one work describing his work
            and intentions at the Oratory and Casa dei Filippini. I decided to
            write a simulated Borromini led tour through the rest of his works,
            <em> Francesco Borromini, the Complete Guide</em>.
          </p>

          <p>
            Next came <em>the Fountains of Rome</em>, a photographic tour
            through all of Rome&rsquo;s magnificent fountains, a collection
            unparalleled anywhere in the world, with hopefully helpful
            descriptions.
          </p>

          <p>
            I have now finished the manuscript for my last book, <em>Greg
            Pulles&rsquo; Illustrated Walks in Rome</em>, organized by the
            twenty four Rioni of the city. Unfortunately it is currently
            stalled because it is too long for a single book. I am exploring
            splitting it into three volumes! Plus an app.
          </p>

          <p>
            Finally I have created small greeting cards with some of my
            photography. These can be used for notes, and I expect to expand
            the offerings. Currently there are twelve.
          </p>
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/cards"
            className="font-display text-xs uppercase tracking-[0.22em] text-crimson hover:text-crimson-dark"
          >
            Browse the Greeting Cards &rarr;
          </Link>
        </p>
      </section>
    </>
  );
}
