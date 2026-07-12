import Link from "next/link";
import { OrnamentDivider } from "@/components/Ornament";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="container-prose pt-24 pb-32 text-center">
      <p className="eyebrow">Strada Chiusa</p>
      <h1 className="mt-4 font-display text-6xl uppercase tracking-wide text-ink md:text-7xl">
        404
      </h1>
      <p className="mx-auto mt-6 max-w-md font-serif text-xl italic leading-relaxed text-ink-soft">
        This street leads nowhere &mdash; the page you&rsquo;re looking for
        doesn&rsquo;t exist or has moved.
      </p>
      <OrnamentDivider className="mt-10" />
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          Back to the Home page
        </Link>
        <Link href="/books" className="btn-ghost">
          Browse the Books
        </Link>
        <Link href="/blog" className="btn-ghost">
          Read the Blog
        </Link>
      </div>
    </section>
  );
}
