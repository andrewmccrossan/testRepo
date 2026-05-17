import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getPost, getPostSlugs } from "@/lib/posts";
import { urlForImage } from "@/lib/sanity/image";
import { OrnamentDivider } from "@/components/Ornament";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  return { title: post?.title ?? "Blog" };
}

type PortableImageValue = {
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
};

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children, index }) => (
      <p className={index === 0 ? "drop-cap" : ""}>{children}</p>
    ),
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 list-disc space-y-2 pl-8">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 list-decimal space-y-2 pl-8">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: PortableImageValue }) => {
      if (!value?.asset) return null;
      const src = urlForImage(value).width(1400).auto("format").url();
      return (
        <figure className="my-10">
          <img
            src={src}
            alt={value.alt ?? ""}
            className="w-full"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center font-serif text-sm italic text-ink-soft">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="container-prose pt-16 pb-12">
      <Link
        href="/blog"
        className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft hover:text-crimson"
      >
        &larr; Back to the blog
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
        <PortableText value={post.body} components={portableComponents} />
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
