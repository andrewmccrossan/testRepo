import { getCardsPageData } from "@/lib/cards";
import { OrderDecoder } from "@/components/OrderDecoder";
import { OrnamentDivider } from "@/components/Ornament";

// Greg's private tool: translates the client_reference_id string shown
// next to a Stripe order into the photographs and quantities to print.
// Unlisted (no nav link) and excluded from search via robots + metadata.
export const metadata = {
  title: "Order Decoder",
  robots: { index: false, follow: false },
};

export default async function DecodePage() {
  const { cards, settings } = await getCardsPageData();

  return (
    <section className="container-prose pt-16 pb-24">
      <div className="text-center">
        <p className="eyebrow">Private</p>
        <h1 className="mt-4 font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
          Order Decoder
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-ink-soft">
          Open the order in Stripe, copy its{" "}
          <span className="font-mono not-italic text-base">
            client_reference_id
          </span>
          , and paste it below to see which cards to print.
        </p>
        <OrnamentDivider className="mt-8" />
      </div>

      <div className="mt-10">
        <OrderDecoder
          cards={cards.map(({ code, title, imageUrl }) => ({
            code,
            title,
            imageUrl,
          }))}
          packSize={settings?.packSize ?? 12}
        />
      </div>
    </section>
  );
}
