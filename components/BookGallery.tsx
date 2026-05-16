"use client";

import { useEffect, useRef, useState } from "react";
import type { BookImage } from "@/lib/books";
import { urlForImage } from "@/lib/sanity/image";

export function BookGallery({
  images,
  title,
}: {
  images: BookImage[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const slideWidth = scroller.clientWidth;
        if (slideWidth === 0) return;
        const next = Math.round(scroller.scrollLeft / slideWidth);
        setIndex((prev) => (prev === next ? prev : next));
      });
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollTo = (i: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const target = ((i % images.length) + images.length) % images.length;
    scroller.scrollTo({
      left: scroller.clientWidth * target,
      behavior: "smooth",
    });
  };

  if (images.length === 0) return null;

  return (
    <div className="w-full max-w-md">
      <div
        ref={scrollerRef}
        className="no-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto"
        aria-roledescription="carousel"
        aria-label={`${title} images`}
      >
        {images.map((img, i) => {
          const url = urlForImage(img).width(1200).auto("format").url();
          return (
            <figure
              key={img._key ?? i}
              className="w-full shrink-0 snap-center"
              aria-roledescription="slide"
              aria-label={`Image ${i + 1} of ${images.length}`}
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-stone/30 shadow-[6px_6px_0_rgba(31,24,18,0.10),0_18px_40px_-15px_rgba(31,24,18,0.45)]">
                <img
                  src={url}
                  alt={img.alt ?? `${title} — image ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
              {img.caption && (
                <figcaption className="mt-3 px-2 text-center font-serif text-sm italic text-ink-soft">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      {images.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => scrollTo(index - 1)}
            aria-label="Previous image"
            className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft transition hover:text-crimson"
          >
            &larr; Prev
          </button>
          <div className="flex gap-2" role="tablist">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show image ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === index ? "bg-crimson" : "bg-stone hover:bg-ink-soft"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollTo(index + 1)}
            aria-label="Next image"
            className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft transition hover:text-crimson"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
