import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="card p-8">
      <div className="flex items-center gap-3">
        <span className="eyebrow">{post.tag}</span>
        <span className="h-px w-8 bg-gold/50" />
        <span className="font-serif text-xs italic text-ink-soft">
          {post.dateLabel} &middot; {post.readingTime}
        </span>
      </div>
      <h3 className="mt-3 font-display text-2xl uppercase tracking-wide text-ink">
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
        className="mt-5 inline-block font-display text-xs uppercase tracking-[0.22em] text-crimson hover:text-crimson-dark"
      >
        Continue reading &rarr;
      </Link>
    </article>
  );
}
