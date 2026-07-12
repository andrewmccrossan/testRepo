import { getCardsPageData } from "@/lib/cards";
import { CardsBrowser } from "@/components/CardsBrowser";
import { OrnamentDivider } from "@/components/Ornament";

export const metadata = { title: "Photographic Greeting Cards" };

export default async function CardsPage() {
  const { cards, settings } = await getCardsPageData();

  const packSize = settings?.packSize ?? 12;
  const price = settings?.price ?? "";
  const intro =
    settings?.intro?.trim() ||
    `Hand-printed photographic greeting cards from across Rome. Build a pack of ${packSize} — choose any combination, as many of each photograph as you like.`;

  return (
    <>
      <section className="container-wide pt-16 pb-10 text-center">
        <p className="eyebrow">Imagines Romae</p>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-wide text-ink md:text-6xl">
          Photographic Greeting Cards
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink-soft">
          {intro}
        </p>
        <OrnamentDivider className="mt-10" />
      </section>

      {/* Product photos — what the physical cards actually look like */}
      <section className="container-wide pb-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <figure>
            <img
              src="/cards/cards-standing.jpg"
              alt="Two folded greeting cards standing upright, each with a photograph mounted on the front"
              loading="lazy"
              className="aspect-[3/2] w-full border border-stone/60 object-cover shadow-[0_10px_30px_-18px_rgba(31,24,18,0.45)]"
            />
            <figcaption className="mt-3 text-center font-serif text-sm italic text-ink-soft">
              Each card carries one photograph on the front.
            </figcaption>
          </figure>
          <figure>
            <img
              src="/cards/cards-backs.jpg"
              alt="The backs of two greeting cards, each with a small image and a caption naming the artist, work, and church"
              loading="lazy"
              className="aspect-[3/2] w-full border border-stone/60 object-cover shadow-[0_10px_30px_-18px_rgba(31,24,18,0.45)]"
            />
            <figcaption className="mt-3 text-center font-serif text-sm italic text-ink-soft">
              The back names the artist, the work, and where it lives.
            </figcaption>
          </figure>
          <figure>
            <img
              src="/cards/cards-packs.jpg"
              alt="Two stacks of greeting cards tied with twine"
              loading="lazy"
              className="aspect-[3/2] w-full border border-stone/60 object-cover shadow-[0_10px_30px_-18px_rgba(31,24,18,0.45)]"
            />
            <figcaption className="mt-3 text-center font-serif text-sm italic text-ink-soft">
              Packs arrive tied with twine, ready to give.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="container-wide pb-40">
        {cards.length === 0 ? (
          <p className="text-center font-serif text-lg italic text-ink-soft">
            No cards yet &mdash; check back soon.
          </p>
        ) : (
          <CardsBrowser
            cards={cards}
            packSize={packSize}
            price={price}
            stripePaymentUrl={settings?.stripePaymentUrl}
          />
        )}
      </section>
    </>
  );
}
