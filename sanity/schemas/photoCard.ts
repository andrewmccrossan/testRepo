import { defineType, defineField } from "sanity";

// Auto-generate a 6-char uppercase alphanumeric identifier. The code is the
// stable handle sent to Stripe in the order URL — Greg uses it to look up
// which photos a customer picked. Random base36 gives ~2B combinations, so
// collisions among a few hundred cards are effectively zero. The schema
// also runs an async uniqueness check on save as a belt-and-suspenders.
function genCode(): string {
  const raw = Math.random().toString(36).slice(2, 8).toUpperCase();
  return raw.padEnd(6, "X").slice(0, 6);
}

export const photoCard = defineType({
  name: "photoCard",
  title: "Photo Card",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
      description: 'e.g. "St. Peter\'s Basilica at Dawn".',
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "code",
      type: "string",
      initialValue: genCode,
      validation: (r) =>
        r
          .required()
          .regex(/^[A-Z0-9]{4,8}$/, {
            name: "4-8 uppercase letters or digits",
          })
          .custom(async (value, ctx) => {
            if (!value) return true;
            const client = ctx.getClient({ apiVersion: "2024-01-01" });
            const id = ctx.document?._id?.replace(/^drafts\./, "") ?? "";
            const dupes = await client.fetch<number>(
              `count(*[_type == "photoCard" && code == $code && !(_id in [$id, "drafts." + $id])])`,
              { code: value, id },
            );
            return dupes > 0 ? "Another card already uses this code" : true;
          }),
      description:
        "Unique 4-8 character identifier sent to Stripe with each order so Greg can identify the printed cards. Auto-generated — leave as-is unless you have a reason to change it.",
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Short description for screen readers.",
        }),
      ],
    }),
    defineField({
      name: "theme",
      type: "reference",
      to: [{ type: "photoTheme" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      description: "Optional caption (location, year, context).",
    }),
  ],
  orderings: [
    {
      title: "Theme, then title",
      name: "themeThenTitle",
      by: [
        { field: "theme.name", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      code: "code",
      themeName: "theme.name",
      media: "image",
    },
    prepare: ({ title, code, themeName, media }) => ({
      title,
      subtitle: themeName ? `${themeName} - ${code}` : code,
      media,
    }),
  },
});
