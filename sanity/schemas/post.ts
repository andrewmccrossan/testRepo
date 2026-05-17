import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
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
    defineField({
      name: "date",
      type: "date",
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: "tag",
      type: "string",
      options: {
        list: [
          { title: "Sacred Art", value: "Sacred Art" },
          { title: "Architecture", value: "Architecture" },
          { title: "Rome", value: "Rome" },
          { title: "Liturgy", value: "Liturgy" },
          { title: "Essay", value: "Essay" },
        ],
      },
    }),
    defineField({
      name: "readingTime",
      title: 'Reading time (e.g. "7 min read")',
      type: "string",
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description: "Shown in lists and at the top of the post.",
    }),
    defineField({
      name: "body",
      title: "Body",
      description:
        "Add as many text blocks and images as you like, in any order. Use the '+' button in the editor to insert an image between paragraphs.",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description:
                "Short description for screen readers and SEO. Required for accessibility.",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description:
                "Optional italic caption shown directly under the image.",
            }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
