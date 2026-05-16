import { getCardsPageData } from "@/lib/cards";
import { CardsBrowser } from "@/components/CardsBrowser";
import { OrnamentDivider } from "@/components/Ornament";

export const metadata = { title: "Photo Cards" };

export default async function CardsPage() {
  const { themes, cards, settings } = await getCardsPageData();

  const packSize = settings?.packSize ?? 12;
  const price = settings?.price ?? "";
  const intro =
    settings?.intro?.trim() ||
    `Hand-printed photographic cards from across Rome. Pick any ${packSize} for a single pack — mix sacred art, churches, statues, and street scenes as you please.`;

  return (
    <>
      <section className="container-wide pt-16 pb-10 text-center">
        <p className="eyebrow">Imagines Romae</p>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-wide text-ink md:text-6xl">
          Photo Cards
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink-soft">
          {intro}
        </p>
        <OrnamentDivider className="mt-10" />
      </section>

      <section className="container-wide pb-40">
        {cards.length === 0 ? (
          <p className="text-center font-serif text-lg italic text-ink-soft">
            No cards yet &mdash; check back soon.
          </p>
        ) : (
          <CardsBrowser
            themes={themes}
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
