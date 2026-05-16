import { sanityClient } from "./sanity/client";
import {
  CARDS_QUERY,
  CARD_SETTINGS_QUERY,
  CARD_THEMES_QUERY,
} from "./sanity/queries";
import { urlForImage } from "./sanity/image";

export type CardTheme = {
  slug: string;
  name: string;
  description?: string;
  order?: number;
};

export type PhotoCard = {
  code: string;
  slug: string;
  title: string;
  description?: string;
  themeSlug: string;
  themeName: string;
  imageUrl: string;
  imageUrlLarge: string;
  imageAlt?: string;
};

export type CardSettings = {
  packSize: number;
  price?: string;
  stripePaymentUrl?: string;
  intro?: string;
};

type SanityImage = {
  asset?: { _ref: string };
  alt?: string;
};

type SanityTheme = {
  slug?: string;
  name?: string;
  description?: string;
  order?: number;
};

type SanityCard = {
  code?: string;
  slug?: string;
  title?: string;
  description?: string;
  image?: SanityImage;
  themeSlug?: string;
  themeName?: string;
};

type SanitySettings = {
  packSize?: number;
  price?: string;
  stripePaymentUrl?: string;
  intro?: string;
};

function toCard(d: SanityCard): PhotoCard | null {
  if (!d.code || !d.slug || !d.title || !d.themeSlug || !d.image?.asset) {
    return null;
  }
  return {
    code: d.code,
    slug: d.slug,
    title: d.title,
    description: d.description,
    themeSlug: d.themeSlug,
    themeName: d.themeName ?? "",
    imageUrl: urlForImage(d.image)
      .width(640)
      .height(640)
      .fit("crop")
      .auto("format")
      .url(),
    imageUrlLarge: urlForImage(d.image).width(1200).auto("format").url(),
    imageAlt: d.image.alt,
  };
}

export async function getCardsPageData(): Promise<{
  themes: CardTheme[];
  cards: PhotoCard[];
  settings?: CardSettings;
}> {
  const [rawThemes, rawCards, rawSettings] = await Promise.all([
    sanityClient.fetch<SanityTheme[]>(CARD_THEMES_QUERY),
    sanityClient.fetch<SanityCard[]>(CARDS_QUERY),
    sanityClient.fetch<SanitySettings | null>(CARD_SETTINGS_QUERY),
  ]);

  const themes: CardTheme[] = (rawThemes ?? [])
    .filter((t): t is SanityTheme & { slug: string; name: string } =>
      Boolean(t.slug && t.name),
    )
    .map((t) => ({
      slug: t.slug,
      name: t.name,
      description: t.description,
      order: t.order,
    }));

  const cards: PhotoCard[] = (rawCards ?? [])
    .map(toCard)
    .filter((c): c is PhotoCard => c !== null);

  const settings: CardSettings | undefined = rawSettings
    ? {
        packSize: rawSettings.packSize ?? 12,
        price: rawSettings.price,
        stripePaymentUrl: rawSettings.stripePaymentUrl,
        intro: rawSettings.intro,
      }
    : undefined;

  return { themes, cards, settings };
}
