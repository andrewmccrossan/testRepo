import Link from "next/link";
import { getBooks } from "@/lib/books";
import { getPosts } from "@/lib/posts";
import { BookCover } from "@/components/BookCover";
import { OrnamentDivider, LaurelMotif } from "@/components/Ornament";

// All prose on this page is Greg's own words, verbatim. Only labels,
// headings, and button text are editorial.
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
      {/* Hero — Greg's greeting and statement of purpose */}
      <section className="relative overflow-hidden">
        <div className="container-wide grid grid-cols-1 items-center gap-16 pt-16 pb-24 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="relative">
            {/* Semantic page title for SEO and screen readers; visually the
                page leads with Greg's greeting as prose instead. */}
            <h1 className="sr-only">Italy by Greg Pulles</h1>
            <p className="eyebrow">Benvenuti</p>
            <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-ink md:text-2xl">
              Through this website I hope to share my loves and interests.
              There are so many sources on Italy, but none captures for me the
              essence, the importance, the truly significant aspects of the
              thousands and thousands of sights to see. I want to point out
              what I believe every visitor should know about what they are
              seeing. In my biweekly blogs I will provide a detailed and
              informative look at the hundreds of sites you must visit in Rome
              and beyond.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/books" className="btn-primary">
                Browse the Books
              </Link>
              <Link href="/blog" className="btn-ghost">
                Read the Blog
              </Link>
              <Link href="/cards" className="btn-ghost">
                Browse the Cards
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
                <Link
                  href={`/books/${featuredBook.slug}`}
                  className="text-crimson underline decoration-gold/60 underline-offset-4 hover:text-crimson-dark"
                >
                  {featuredBook.title}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <OrnamentDivider className="container-wide" />

      {/* Recent posts */}
      <section className="container-wide py-20">
        <div className="mb-6 flex items-end justify-between">
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

        {/* Greg's own announcement of the opening series */}
        <p className="mb-10 max-w-3xl font-serif text-lg italic leading-relaxed text-ink-soft">
          The first blog will be a series, a comprehensive look at the three
          baroque masters Bernini, Borromini, and da Cortona, and the six
          baroque popes who made their work possible and who impelled them.
        </p>

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

      {/* Greeting cards */}
      <section className="relative mt-6 border-y border-stone/50 bg-parchment-light/40">
        <div className="container-wide flex flex-col items-center gap-5 py-16 text-center">
          <p className="eyebrow">From my photographs</p>
          <h2 className="font-display text-3xl uppercase tracking-wide text-ink md:text-4xl">
            Photographic Greeting Cards
          </h2>
          <Link href="/cards" className="btn-primary mt-2">
            Browse the Cards
          </Link>
        </div>
      </section>
    </>
  );
}
