// GROQ queries for fetching posts and books from Sanity at build time.
// Each query projects field names that match the Sanity schemas in
// /sanity/schemas/. Slugs are dereferenced to plain strings for ergonomics.

export const POSTS_QUERY = /* groq */ `
  *[_type == "post"] | order(date desc) {
    "slug": slug.current,
    title,
    subtitle,
    date,
    tag,
    readingTime,
    excerpt,
    body
  }
`;

export const POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    subtitle,
    date,
    tag,
    readingTime,
    excerpt,
    body
  }
`;

export const POST_SLUGS_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const BOOKS_QUERY = /* groq */ `
  *[_type == "book"] | order(year desc) {
    "slug": slug.current,
    title,
    subtitle,
    year,
    price,
    images,
    coverBackgroundColor,
    coverAccentColor,
    coverMotif,
    description,
    details,
    buyPrimaryLabel,
    buyPrimaryUrl,
    buySecondaryLabel,
    buySecondaryUrl,
    excerpt
  }
`;

export const BOOK_BY_SLUG_QUERY = /* groq */ `
  *[_type == "book" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    subtitle,
    year,
    price,
    images,
    coverBackgroundColor,
    coverAccentColor,
    coverMotif,
    description,
    details,
    buyPrimaryLabel,
    buyPrimaryUrl,
    buySecondaryLabel,
    buySecondaryUrl,
    excerpt
  }
`;

export const BOOK_SLUGS_QUERY = /* groq */ `
  *[_type == "book" && defined(slug.current)][].slug.current
`;

export const CARD_THEMES_QUERY = /* groq */ `
  *[_type == "photoTheme"] | order(coalesce(order, 9999) asc, name asc) {
    "slug": slug.current,
    name,
    description,
    order
  }
`;

export const CARDS_QUERY = /* groq */ `
  *[_type == "photoCard" && defined(theme->slug.current) && defined(code)]
    | order(coalesce(theme->order, 9999) asc, theme->name asc, title asc) {
    code,
    "slug": slug.current,
    title,
    description,
    image,
    "themeSlug": theme->slug.current,
    "themeName": theme->name
  }
`;

export const CARD_SETTINGS_QUERY = /* groq */ `
  *[_type == "cardSettings"][0] {
    packSize,
    price,
    stripePaymentUrl,
    intro
  }
`;
