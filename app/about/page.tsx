import Link from "next/link";
import { site } from "@/lib/site";
import { OrnamentDivider } from "@/components/Ornament";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="container-prose pt-16 pb-12">
      <header className="text-center">
        <p className="eyebrow">De Auctore</p>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-wide text-ink md:text-6xl">
          About
        </h1>
        <OrnamentDivider className="mt-10" />
      </header>

      <div className="prose-roman mt-12">
        <p className="drop-cap">
          {site.authorBlurb} I write slowly and travel cheaply, mostly in the
          old Roman quarters east of the Tiber, and occasionally in Ravenna,
          Sicily, and the smaller hill towns whose churches the guidebooks
          ignore. The work that appears on this site &mdash; books, journal
          entries, the interactive manuscript &mdash; comes from a single
          rhythm: walk, look, read, walk again, write.
        </p>

        <h2>Why this site</h2>

        <p>
          For a long time I kept three separate accounts of the same project:
          a folder of essays, a list of half-finished books, and a notebook of
          interactive ideas I did not know how to publish. This site is the
          attempt to put them in one room. The journal is where the thinking
          happens; the books are where the thinking finishes; the interactive
          chapters are an experiment in the space between the two.
        </p>

        <h2>How to read</h2>

        <p>
          Slowly. The essays are short and the chapters are long and neither is
          designed for a phone in a queue. If you have ten minutes, read a
          journal entry. If you have an evening, open the interactive
          manuscript and bring a glass of something.
        </p>

        <h2>Get in touch</h2>

        <p>
          Letters, corrections, and reading recommendations are always welcome
          at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. I read everything,
          even when I do not answer quickly.
        </p>
      </div>

      <OrnamentDivider className="mt-16" />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Link href="/books" className="card p-6 text-center">
          <p className="eyebrow">Read</p>
          <p className="mt-2 font-display text-lg uppercase tracking-wide text-ink">
            The Books
          </p>
        </Link>
        <Link href="/blog" className="card p-6 text-center">
          <p className="eyebrow">Follow</p>
          <p className="mt-2 font-display text-lg uppercase tracking-wide text-ink">
            The Journal
          </p>
        </Link>
        <Link href="/interactive" className="card p-6 text-center">
          <p className="eyebrow">Explore</p>
          <p className="mt-2 font-display text-lg uppercase tracking-wide text-ink">
            The Manuscript
          </p>
        </Link>
      </div>
    </article>
  );
}
