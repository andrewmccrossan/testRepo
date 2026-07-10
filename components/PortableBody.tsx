import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import { urlForImage } from "@/lib/sanity/image";

type PortableImageValue = {
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
};

// Shared Portable Text rendering used by both blog posts and the About
// page so their prose (headings, lists, links, inline images) looks the
// same and only needs to be maintained in one place.
export const portableComponents: PortableTextComponents = {
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
          <img src={src} alt={value.alt ?? ""} className="w-full" loading="lazy" />
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

export function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={portableComponents} />;
}
