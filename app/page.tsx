import Link from "next/link";
import { getBooks } from "@/lib/books";
import { getPosts } from "@/lib/posts";
import { BookCover } from "@/components/BookCover";
import { OrnamentDivider, LaurelMotif } from "@/components/Ornament";
import { NewsletterForm } from "@/components/NewsletterForm";

// Greg's account of his books, in his own voice (lightly copyedited). Each
// entry becomes a titled block in the "About my books" section below.
const bookStories: { title: string; note?: string; body: string }[] = [
  {
    title: "Sacred Places: Rediscovering the Churches of Rome",
    note: "A large coffee-table book — more than 800 pages.",
    body:
      "My first book is about sixty of my favorite churches in Rome. I got the idea during a visit with two of my sons in the year 2000. We returned to San Lorenzo fuori le mura, and I noticed that several of the mosaic tesserae in the frieze on the portico had fallen off since my last visit. Around this time I learned that most churches in Rome are owned by the state — not the Vatican-owned basilicas like St. Peter’s and St. Paul’s — and that most Italians no longer go to Mass, so many of the churches sit nearly deserted. I grew worried about their future; I knew all too well the fate of Hagia Sophia and other great churches in the East. And so I decided to photograph the churches to preserve them for posterity. The book kept growing. As I learned from the many texts I acquired, and from my now almost twice-yearly visits, I added description to the photographs until there was as much text as image — and the book passed 800 pages. If you have never been, it will take you through each of these stunning churches: who built them and why, the principal artwork, and the faith embedded throughout. Some are ancient, some medieval, some Renaissance, and many baroque.",
  },
  {
    title: "Sacred Places: An Epic Journey through Sixty Churches in Eleven Walks",
    note: "The complete guide.",
    body:
      "After the large book there was a demand for a smaller, condensed guidebook version — and so came my second book: the same sixty churches, organized into eleven walks you can take on foot.",
  },
  {
    title: "The Holy Pulpits of Tuscany",
    body:
      "In my reading I came to know the thirteenth-century pioneer Nicola Pisano and the series of pulpits he and his son carved across Tuscany and Umbria. That led my wife and me to make a pilgrimage to them — and became my third book.",
  },
  {
    title: "Due Cento Luoghi",
    note: "Two hundred places — a compact spiral guide.",
    body:
      "Next came a desire to point out what I felt were the two hundred most important sites a visitor must see. This is the small spiral guide to all of them.",
  },
  {
    title: "Francesco Borromini: The Complete Guide",
    body:
      "In my visits I came to greatly admire the inventive, chimeric baroque architecture of Francesco Borromini. I spent several years reading about the man, studying his works, and photographing his buildings. He left a single work describing his intentions at the Oratory and Casa dei Filippini; taking my cue from it, I wrote a simulated Borromini-led tour through the rest of his buildings.",
  },
  {
    title: "The Fountains of Rome",
    body:
      "A photographic tour through all of Rome’s magnificent fountains — a collection unparalleled anywhere in the world — with, I hope, helpful descriptions along the way.",
  },
  {
    title: "Greg Pulles’ Illustrated Walks in Rome",
    note: "In progress.",
    body:
      "I have now finished the manuscript for my latest book, organized by the twenty-four rioni of the city. For the moment it is stalled — too long for a single volume — so I am exploring splitting it into three volumes, plus an app.",
  },
];

export default async function HomePage() {
  const [books, posts] = await Promise.all([getBooks(), getPosts()]);
  // Feature a specific book on the hero rather than whatever sorts to
  // first by year. Falls back to the first book if the chosen slug is
  // ever removed from Sanity.
  const featuredBook =
    books.find((b) => b.slug === "the-hours-of-the-aventine") ?? books[0];
  const recent = posts.slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-wide grid grid-cols-1 items-center gap-16 pt-16 pb-24 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="relative">
            <p className="eyebrow">A pilgrim&rsquo;s guide to Rome and Italy</p>
            <h1 className="mt-6 font-display text-5xl uppercase leading-[1.05] tracking-wide text-ink md:text-6xl lg:text-7xl">
              Faith, saints, and stones I keep coming back to.
            </h1>
            <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-ink-soft">
              After thirty years and six books on Rome, this site is where I
              write about one Italian site at a time &mdash; what to look at,
              who built it and why, and what makes it worth more than the two
              minutes most visitors give it. Biased, detailed, accompanied by
              my own photographs.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/books" className="btn-primary">
                Browse the Books
              </Link>
              <Link href="/blog" className="btn-ghost">
                Read the Blog
              </Link>
            </div>

            <div className="pointer-events-none absolute -left-24 -top-10 hidden text-gold/30 lg:block">
              <LaurelMotif className="h-32 w-64" />
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-gold/20 via-crimson/10 to-transparent blur-2xl" />
              <BookCover book={featuredBook} size="lg" />
              <p className="mt-6 text-center font-serif italic text-ink-soft">
                Newest from the press &mdash;
                <Link
                  href={`/books/${featuredBook.slug}`}
                  className="ml-1 text-crimson underline decoration-gold/60 underline-offset-4 hover:text-crimson-dark"
                >
                  {featuredBook.title}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <OrnamentDivider className="container-wide" />

      {/* About my books */}
      <section className="container-prose py-20">
        <div className="text-center">
          <p className="eyebrow">From the desk of Greg Pulles</p>
          <h2 className="mt-4 font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
            About my books
          </h2>
          <OrnamentDivider className="mt-10" />
        </div>

        <div className="mt-14 space-y-12">
          {bookStories.map((b) => (
            <div key={b.title} className="border-l-2 border-gold/60 pl-6">
              <h3 className="font-display text-xl uppercase leading-snug tracking-wide text-ink">
                {b.title}
              </h3>
              {b.note && (
                <p className="mt-1 font-serif italic text-ink-soft">{b.note}</p>
              )}
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink/85">
                {b.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded border border-stone/50 bg-parchment-light/40 p-8 text-center">
          <p className="font-serif text-lg leading-relaxed text-ink/85">
            Finally, I have made small greeting cards featuring some of my
            photography &mdash; lovely for a note, with more to come. There are
            twelve to choose from right now.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/books" className="btn-primary">
              Browse the Books
            </Link>
            <Link href="/cards" className="btn-ghost">
              See the Greeting Cards
            </Link>
          </div>
        </div>
      </section>

      {/* Recent posts */}
      <section className="container-wide py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">From the Blog</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-wide text-ink">
              Recent Writing
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden font-display text-xs uppercase tracking-[0.22em] text-crimson hover:text-crimson-dark md:inline"
          >
            All entries &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {recent.map((post) => (
            <article key={post.slug} className="border-l-2 border-gold/60 pl-6">
              <p className="font-serif text-xs italic text-ink-soft">
                {post.dateLabel} &middot; {post.tag}
              </p>
              <h3 className="mt-2 font-display text-2xl uppercase tracking-wide text-ink">
                <Link href={`/blog/${post.slug}`} className="link-underline hover:text-crimson">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 font-serif italic text-ink-soft">{post.subtitle}</p>
              <p className="mt-4 font-serif text-base leading-relaxed text-ink/85">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block font-display text-xs uppercase tracking-[0.22em] text-crimson hover:text-crimson-dark"
              >
                Read on &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative mt-12 border-y border-stone/50 bg-parchment-light/40">
        <div className="container-wide grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-[1fr,1fr]">
          <div>
            <p className="eyebrow">Subscribe</p>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-wide text-ink md:text-4xl">
              Letters from Rome
            </h2>
            <p className="mt-4 max-w-md font-serif text-lg leading-relaxed text-ink-soft">
              A short note, roughly monthly, with one essay, one image, and one
              recommended thing to read. No advertising. No tracking. Easy to
              leave.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
