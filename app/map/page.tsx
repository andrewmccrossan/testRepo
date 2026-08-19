import { RomeMap } from "@/components/RomeMap";
import { OrnamentDivider } from "@/components/Ornament";

// Sandbox page: deliberately absent from site.nav and excluded from
// search engines (see also the disallow rule in app/robots.ts).
export const metadata = {
  title: "Map",
  robots: { index: false, follow: false },
};

export default function MapPage() {
  return (
    <section className="container-wide pt-14 pb-20">
      <div className="text-center">
        <p className="eyebrow">Sandbox</p>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
          A Walking Map of Rome
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-serif text-lg italic leading-relaxed text-ink-soft">
          The twenty-two rioni of the historic city, with places to stop in
          each. Tap a rione to narrow the list, or a pin to read about it.
        </p>
        <OrnamentDivider className="mt-8" />
      </div>

      <p className="mx-auto mt-8 max-w-2xl border border-gold/50 bg-gold/5 p-4 text-center font-serif text-sm italic text-ink-soft">
        Work in progress &mdash; the descriptions below are placeholder notes,
        not Greg&rsquo;s writing, and the pin positions still need checking.
      </p>

      <div className="mt-10">
        <RomeMap />
      </div>
    </section>
  );
}
