import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import { OrnamentDivider } from "@/components/Ornament";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  return { title: post?.title ?? "Journal" };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="container-prose pt-16 pb-12">
      <Link
        href="/blog"
        className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft hover:text-crimson"
      >
        &larr; Back to the journal
      </Link>

      <header className="mt-10 text-center">
        <p className="eyebrow">{post.tag}</p>
        <h1 className="mt-4 font-display text-4xl uppercase leading-tight tracking-wide text-ink md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 font-serif text-2xl italic leading-snug text-ink-soft">
          {post.subtitle}
        </p>
        <p className="mt-6 font-display text-[11px] uppercase tracking-[0.3em] text-ink-soft">
          {post.dateLabel} &middot; {post.readingTime}
        </p>
        <OrnamentDivider className="mt-10" />
      </header>

      <div className="prose-roman mt-12">
        {post.body.map((para, i) => (
          <p key={i} className={i === 0 ? "drop-cap" : ""}>
            {para}
          </p>
        ))}
      </div>

      <OrnamentDivider className="mt-16" />

      <p className="mt-10 text-center font-serif italic text-ink-soft">
        Thank you for reading. If you found this useful, you might also enjoy
        the{" "}
        <Link
          href="/books"
          className="text-crimson underline decoration-gold/60 underline-offset-4 hover:text-crimson-dark"
        >
          books
        </Link>
        .
      </p>
    </article>
  );
}
