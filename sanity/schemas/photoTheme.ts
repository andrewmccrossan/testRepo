import { defineType, defineField } from "sanity";

export const photoTheme = defineType({
  name: "photoTheme",
  title: "Photo Card Theme",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
      description: 'e.g. "Sacred Art", "Roman Churches", "Statues".',
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      description: "Optional — shown as a section intro on the cards page.",
    }),
    defineField({
      name: "order",
      type: "number",
      description:
        "Lower numbers appear first in the filter bar. Leave blank to sort alphabetically.",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [
        { field: "order", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", order: "order" },
    prepare: ({ title, order }) => ({
      title,
      subtitle: order != null ? `Order: ${order}` : undefined,
    }),
  },
});
