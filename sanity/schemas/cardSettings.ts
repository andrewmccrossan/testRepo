import { defineType, defineField } from "sanity";

// Singleton-ish: only one document of this type is expected to exist. The
// page query reads the first one it finds. If the author hasn't created
// one yet, the cards page falls back to safe defaults and disables the
// checkout button.
export const cardSettings = defineType({
  name: "cardSettings",
  title: "Photographic Greeting Card Pack - Settings",
  type: "document",
  fields: [
    defineField({
      name: "packSize",
      type: "number",
      initialValue: 12,
      validation: (r) => r.required().integer().min(1).max(100),
      description:
        "Number of cards in a pack. Customer must pick exactly this many to enable checkout.",
    }),
    defineField({
      name: "price",
      type: "string",
      validation: (r) => r.required(),
      description:
        'Display price shown on the page and in the selection bar - e.g. "$30".',
    }),
    defineField({
      name: "stripePaymentUrl",
      type: "url",
      description:
        "Stripe Payment Link for the single 'Pack of N cards' product. The customer's selection is appended as ?client_reference_id=CODE1xN_CODE2xN_... which appears next to the order in the Stripe dashboard. Leave blank to disable checkout (UI will show 'Coming soon').",
    }),
    defineField({
      name: "intro",
      type: "text",
      rows: 3,
      description:
        "Short intro shown under the page heading. Falls back to a default if empty.",
    }),
  ],
  preview: {
    select: { packSize: "packSize", price: "price" },
    prepare: ({ packSize, price }) => ({
      title: "Greeting Card Pack Settings",
      subtitle:
        packSize && price ? `Pack of ${packSize} - ${price}` : undefined,
    }),
  },
});
