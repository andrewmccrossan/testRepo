import { defineType, defineField } from "sanity";

// Singleton: only one "About Page" document is expected. The About page
// reads the first one it finds. If none exists yet, the page falls back to
// built-in starter copy, so the site is never blank.
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "body",
      title: "Body",
      description:
        "The About page content. Same editor as a blog post — add text blocks and images in any order, and use headings for section titles like 'Why this website?'.",
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
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
