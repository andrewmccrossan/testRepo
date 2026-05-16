import { defineType, defineField } from "sanity";

export const book = defineType({
  name: "book",
  title: "Book",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "subtitle", type: "string" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "price", type: "string" }),
    defineField({
      name: "images",
      title: "Cover and additional images",
      description:
        "First image is the primary cover (shown in lists, cards, and homepage). Drag to reorder. Leave empty to fall back to the generated SVG cover.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Short description of the image for screen readers and SEO.",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional caption shown below the image in the gallery.",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "coverBackgroundColor",
      title: "Cover background color (hex)",
      type: "string",
      description: 'e.g. "#7C1F1F". Used by the SVG cover design.',
    }),
    defineField({
      name: "coverAccentColor",
      title: "Cover accent color (hex)",
      type: "string",
      description: 'e.g. "#B08D3A". Used by the SVG cover design.',
    }),
    defineField({
      name: "coverMotif",
      title: "Cover motif",
      type: "string",
      options: {
        list: [
          { title: "Column", value: "column" },
          { title: "Cross", value: "cross" },
          { title: "Laurel", value: "laurel" },
          { title: "Rose window", value: "rose" },
        ],
      },
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "details",
      title: 'Details (one per line — e.g. "Hardcover, 312 pages")',
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "buyPrimaryLabel",
      title: "Primary buy button — label",
      type: "string",
      description: 'e.g. "Buy direct ($24)"',
    }),
    defineField({
      name: "buyPrimaryUrl",
      title: "Primary buy button — URL",
      type: "url",
      description:
        'Stripe payment link, Gumroad URL, etc. Leave blank to show "Coming soon".',
    }),
    defineField({
      name: "buySecondaryLabel",
      title: "Secondary buy button — label",
      type: "string",
      description: 'e.g. "Available on Amazon"',
    }),
    defineField({
      name: "buySecondaryUrl",
      title: "Secondary buy button — URL",
      type: "url",
      description: "Amazon URL or affiliate link. Leave blank to hide.",
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description: "Shown on the book page below the description.",
    }),
  ],
  orderings: [
    {
      title: "Year, newest first",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "year" },
  },
});
