import { MotifByName } from "./Ornament";
import type { Book } from "@/lib/books";
import { urlForImage } from "@/lib/sanity/image";

export function BookCover({
  book,
  size = "md",
  scale = 1,
}: {
  book: Book;
  size?: "sm" | "md" | "lg";
  scale?: number;
}) {
  // Base cover box in rem per size. Covers are sized by HEIGHT (width
  // follows the image's true aspect ratio), so `scale` lets a single book
  // be shown shorter/taller than its neighbours while staying uncropped —
  // e.g. scale={0.75} renders a cover at three-quarters the height.
  const base =
    size === "lg"
      ? { w: 19, h: 28 }
      : size === "sm"
      ? { w: 7, h: 11 }
      : { w: 12, h: 18 };
  const h = base.h * scale;
  const w = base.w * scale;

  // Prefer a real uploaded image when available; otherwise fall back to
  // the generated SVG cover so books without uploaded images still render.
  const firstImage = book.images?.[0];
  if (firstImage) {
    const requestedWidth = size === "lg" ? 800 : size === "sm" ? 240 : 480;
    const url = urlForImage(firstImage).width(requestedWidth).auto("format").url();
    return (
      <div className="relative inline-block overflow-hidden shadow-[6px_6px_0_rgba(31,24,18,0.10),0_18px_40px_-15px_rgba(31,24,18,0.45)]">
        <img
          src={url}
          alt={firstImage.alt ?? book.title}
          className="block w-auto"
          style={{ height: `${h}rem` }}
          loading="lazy"
        />
      </div>
    );
  }

  const [bg, accent] = book.cover.palette;
  const motifSize =
    size === "lg" ? "h-32 w-32" : size === "sm" ? "h-10 w-10" : "h-20 w-20";

  return (
    <div
      className="relative shrink-0 overflow-hidden shadow-[6px_6px_0_rgba(31,24,18,0.10),0_18px_40px_-15px_rgba(31,24,18,0.45)]"
      style={{ width: `${w}rem`, height: `${h}rem`, backgroundColor: bg }}
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 4px), radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 50%)",
        }}
      />
      <div className="absolute inset-3 border" style={{ borderColor: accent, opacity: 0.55 }} />
      <div className="absolute inset-4 border" style={{ borderColor: accent, opacity: 0.25 }} />

      <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center">
        <p
          className="font-display text-[10px] uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          {book.year}
        </p>

        <div className="flex flex-col items-center gap-4">
          <MotifByName name={book.cover.motif} className={`${motifSize}`} />
          <div style={{ color: accent }} className="opacity-90">
            <p
              className={`font-display ${size === "lg" ? "text-3xl" : size === "sm" ? "text-sm" : "text-xl"} uppercase leading-tight tracking-wider`}
              style={{ color: "#FBF6E8" }}
            >
              {book.title}
            </p>
            <div
              className="mx-auto mt-3 h-px w-12"
              style={{ backgroundColor: accent }}
            />
            <p
              className={`mt-3 font-serif italic ${size === "lg" ? "text-base" : "text-xs"}`}
              style={{ color: "#FBF6E8", opacity: 0.85 }}
            >
              {book.subtitle}
            </p>
          </div>
        </div>

        <p
          className="font-display text-[10px] uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          {/* author placeholder */}
          A. M. Caelius
        </p>
      </div>

      {/* spine highlight */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[6px] bg-gradient-to-r from-black/30 to-transparent" />
    </div>
  );
}
