"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [lightbox, setLightbox] = useState<number | null>(null);
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

  const stepLightbox = useCallback(
    (delta: number) => {
      setLightbox((cur) =>
        cur === null ? cur : (cur + delta + images.length) % images.length,
      );
    },
    [images.length],
  );

  const closeLightbox = useCallback(() => {
    setLightbox((cur) => {
      // Sync the inline carousel to wherever the viewer navigated.
      if (cur !== null && scrollerRef.current) {
        scrollerRef.current.scrollTo({
          left: scrollerRef.current.clientWidth * cur,
        });
      }
      return null;
    });
  }, []);

  // While the lightbox is open: lock page scroll and handle keyboard
  // navigation (Escape closes, arrows move).
  const lightboxOpen = lightbox !== null;
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") stepLightbox(-1);
      else if (e.key === "ArrowRight") stepLightbox(1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, closeLightbox, stepLightbox]);

  if (images.length === 0) return null;

  const current = lightbox !== null ? images[lightbox] : null;
  const currentUrl = current
    ? urlForImage(current).width(2000).auto("format").url()
    : null;

  return (
    {/* Sized down a step on lg screens where the gallery sits beside the
        book text, so the text column keeps a readable width. */}
    <div className="w-full max-w-3xl lg:max-w-xl xl:max-w-3xl">
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
              {/* Square window; each photo keeps its native aspect ratio,
                  letterboxed in cream like the cards grid. Click to open
                  the full image in a lightbox. */}
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="relative block aspect-square w-full cursor-zoom-in overflow-hidden bg-parchment-light shadow-[6px_6px_0_rgba(31,24,18,0.10),0_18px_40px_-15px_rgba(31,24,18,0.45)]"
                aria-label={`View image ${i + 1} full size`}
              >
                <img
                  src={url}
                  alt={img.alt ?? `${title} — image ${i + 1}`}
                  className="absolute inset-0 h-full w-full object-contain"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </button>
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

      {current && currentUrl && lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — image ${lightbox + 1} of ${images.length}`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute right-4 top-4 font-display text-sm uppercase tracking-[0.22em] text-parchment-light/80 transition hover:text-parchment-light"
          >
            Close &times;
          </button>

          <figure
            className="flex max-h-full max-w-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentUrl}
              alt={current.alt ?? `${title} — image ${lightbox + 1}`}
              className="max-h-[80vh] max-w-[92vw] object-contain shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]"
            />
            <figcaption className="mt-4 text-center font-serif text-sm italic text-parchment-light/90">
              {current.caption ? `${current.caption} — ` : ""}
              {lightbox + 1} / {images.length}
            </figcaption>
          </figure>

          {images.length > 1 && (
            <div
              className="mt-4 flex items-center gap-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => stepLightbox(-1)}
                aria-label="Previous image"
                className="font-display text-sm uppercase tracking-[0.22em] text-parchment-light/80 transition hover:text-parchment-light"
              >
                &larr; Prev
              </button>
              <button
                type="button"
                onClick={() => stepLightbox(1)}
                aria-label="Next image"
                className="font-display text-sm uppercase tracking-[0.22em] text-parchment-light/80 transition hover:text-parchment-light"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
