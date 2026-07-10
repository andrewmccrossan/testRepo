import Link from "next/link";
import { getAboutBody } from "@/lib/about";
import { PortableBody } from "@/components/PortableBody";
import { OrnamentDivider } from "@/components/Ornament";

export const metadata = { title: "About" };

// Shown until an "About Page" document is created and published in Sanity.
// Mirrors Greg's starter copy so the page is populated on first deploy;
// once the Sanity document exists, its body takes over automatically.
function AboutFallback() {
  return (
    <>
      <p className="drop-cap">
        Hi. I&rsquo;m Greg Pulles, a retired attorney, currently a grade school
        Latin teacher, and lover of all things Italian.
      </p>

      <h2>Why this website?</h2>

      <p>
        I came from a Catholic family of eight, the pope always on our dining
        room wall. I always dreamed of going to Rome. When I was finally able to
        go in 1996 I was stunned: the faith, saints, architecture, painting,
        sculpture, and ancient history overwhelmed me. I have been back to Italy
        twenty times now, taken a million photographs, visited every church,
        gone down every street and alley, looked at every piece of art and
        architecture, toured every ancient site. I have written and photographed
        six books and amassed a library of books covering just about everything
        there is in Italy.
      </p>

      <p>
        Through this website I hope to share my loves and interests. There are
        so many sources on Italy, but none captures for me the essence, the
        importance, the truly significant aspects of the thousands and thousands
        of sights to see. I want to point out what I believe every visitor
        should know about what they are seeing. In my biweekly blogs I will
        provide a detailed and informative look at the hundreds of sites you
        must visit in Rome and beyond.
      </p>

      <p>
        The first blog will be a series, a comprehensive look at the three
        baroque masters Bernini, Borromini, and da Cortona, and the six baroque
        popes who made their work possible and who impelled them.
      </p>
    </>
  );
}

export default async function AboutPage() {
  const body = await getAboutBody();

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
        {body ? <PortableBody value={body} /> : <AboutFallback />}
      </div>

      <OrnamentDivider className="mt-16" />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link href="/books" className="card p-6 text-center">
          <p className="eyebrow">Read</p>
          <p className="mt-2 font-display text-lg uppercase tracking-wide text-ink">
            The Books
          </p>
        </Link>
        <Link href="/blog" className="card p-6 text-center">
          <p className="eyebrow">Follow</p>
          <p className="mt-2 font-display text-lg uppercase tracking-wide text-ink">
            The Blog
          </p>
        </Link>
      </div>
    </article>
  );
}
