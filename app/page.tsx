import Link from "next/link";
import { site } from "@/lib/site";
import { getBooks } from "@/lib/books";
import { getPosts } from "@/lib/posts";
import { BookCover } from "@/components/BookCover";
import { OrnamentDivider, LaurelMotif } from "@/components/Ornament";
import { NewsletterForm } from "@/components/NewsletterForm";

export default async function HomePage() {
  const [books, posts] = await Promise.all([getBooks(), getPosts()]);
  const featuredBook = books[0];
  const recent = posts.slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-wide grid grid-cols-1 items-center gap-16 pt-16 pb-24 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="relative">
            <p className="eyebrow">An author&apos;s study in Rome</p>
            <h1 className="mt-6 font-display text-5xl uppercase leading-[1.05] tracking-wide text-ink md:text-6xl lg:text-7xl">
              The Eternal City,
              <span className="block italic text-crimson" style={{ fontStyle: "italic" }}>
                read slowly.
              </span>
            </h1>
            <p className="mt-6 max-w-xl font-serif text-xl leading-relaxed text-ink-soft">
              Essays, books, and an unfolding interactive history on the art,
              architecture, and Catholic memory of Rome &mdash; written for
              readers who want to stand in front of a fresco for longer than
              two minutes.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/books" className="btn-primary">
                Browse the Books
              </Link>
              <Link href="/interactive" className="btn-ghost">
                Enter the Interactive
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

      {/* About the author */}
      <section className="container-prose py-20 text-center">
        <p className="eyebrow">From the desk of {site.author}</p>
        <p className="mt-6 font-serif text-2xl leading-relaxed text-ink">
          &ldquo;Rome teaches a particular discipline: to suspect that the
          building you are walking past has more memory than you do, and that
          this is good news.&rdquo;
        </p>
        <p className="mt-4 font-display text-xs uppercase tracking-[0.3em] text-ink-soft">
          &mdash; {site.author}
        </p>
      </section>

      {/* Three pillars */}
      <section className="container-wide py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <PillarCard
            label="Books"
            title="A small library, carefully made."
            body="Three published volumes on Roman art, the Baroque, and the old liturgy &mdash; with more in preparation."
            href="/books"
            cta="See the books"
          />
          <PillarCard
            label="Blog"
            title="Essays from the studio."
            body="Short writings on icons, Bernini, Aventine churches, and whatever else the week in Rome has offered."
            href="/blog"
            cta="Read the blog"
          />
          <PillarCard
            label="Interactive"
            title="A book that reads back."
            body="An in-progress work, presented chapter by chapter as an interactive object &mdash; with maps, footnotes, and the occasional surprise."
            href="/interactive"
            cta="Open the manuscript"
          />
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

function PillarCard({
  label,
  title,
  body,
  href,
  cta,
}: {
  label: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <Link href={href} className="card group flex h-full flex-col p-8">
      <p className="eyebrow">{label}</p>
      <h3 className="mt-3 font-display text-2xl uppercase tracking-wide text-ink">
        {title}
      </h3>
      <p className="mt-4 flex-1 font-serif text-base leading-relaxed text-ink/85">
        {body}
      </p>
      <p className="mt-6 font-display text-xs uppercase tracking-[0.22em] text-crimson group-hover:text-crimson-dark">
        {cta} &rarr;
      </p>
    </Link>
  );
}
