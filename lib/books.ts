export type Book = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  price: string;
  cover: {
    palette: [string, string];
    motif: "cross" | "laurel" | "column" | "rose";
  };
  description: string;
  details: string[];
  buy: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  excerpt?: string;
};

// Placeholder URLs. Replace per-book with real ones when ready.
//
// Stripe: Dashboard -> Products -> [book] -> Create payment link.
//   The URL looks like: https://buy.stripe.com/aEU14kfAW1g8aPC8wA
// Amazon: paste the product's full URL or short link (https://a.co/d/xxxxx).
//
// Until a placeholder is swapped for a real URL, the corresponding button
// renders as "Coming soon" (disabled) on the book page. See `isPlaceholder`.
export const STRIPE_LINK_PLACEHOLDER = "https://buy.stripe.com/REPLACE_ME";
export const AMAZON_LINK_PLACEHOLDER = "https://www.amazon.com/dp/REPLACE_ME";

export function isPlaceholder(url: string): boolean {
  return url.includes("REPLACE_ME");
}

export const books: Book[] = [
  {
    slug: "stones-of-the-seven-hills",
    title: "Stones of the Seven Hills",
    subtitle: "A History of Rome in Twelve Buildings",
    year: "2023",
    price: "$24",
    cover: {
      palette: ["#7C1F1F", "#B08D3A"],
      motif: "column",
    },
    description:
      "A walking history of the Eternal City told through twelve structures, from the Servian Wall to the Baroque facade of the Gesu. Each chapter is both an architectural reading and a meditation on the civilization that raised it.",
    details: [
      "Hardcover, 312 pages",
      "Illustrated with 40 line drawings",
      "Foreword by the author",
    ],
    buy: {
      primary: { label: "Buy direct ($24)", href: STRIPE_LINK_PLACEHOLDER },
      secondary: { label: "Available on Amazon", href: AMAZON_LINK_PLACEHOLDER },
    },
    excerpt:
      "Rome does not forget. The travertine of the Colosseum is quarried from the same hills that gave Trajan his columns; the bronze of St. Peter's baldachin was once the roof of the Pantheon. To walk these streets is to read a palimpsest in stone.",
  },
  {
    slug: "the-light-of-caravaggio",
    title: "The Light of Caravaggio",
    subtitle: "Faith, Violence, and the Roman Baroque",
    year: "2021",
    price: "$22",
    cover: {
      palette: ["#1F1812", "#D4B25A"],
      motif: "cross",
    },
    description:
      "An intimate account of Caravaggio's Roman years, when a young painter from Lombardy turned the city's chapels into theatres of grace. A book about pigment, about violence, and about the strange honesty of the Counter-Reformation.",
    details: [
      "Paperback, 248 pages",
      "16-page color insert",
      "Index and bibliography",
    ],
    buy: {
      primary: { label: "Buy direct ($22)", href: STRIPE_LINK_PLACEHOLDER },
      secondary: { label: "Available on Amazon", href: AMAZON_LINK_PLACEHOLDER },
    },
    excerpt:
      "He painted the calling of Matthew as one might paint a bar fight: a sudden gesture, a shaft of dirty light, a saint discovered mid-coin. Rome had never seen a Gospel told quite this way.",
  },
  {
    slug: "the-hours-of-the-aventine",
    title: "The Hours of the Aventine",
    subtitle: "Essays on Liturgy, Memory, and the Old Roman Church",
    year: "2019",
    price: "$18",
    cover: {
      palette: ["#5A1414", "#F5EEDC"],
      motif: "rose",
    },
    description:
      "Seventeen essays that move between the Aventine basilicas at dawn and the long Roman tradition of hours, vigils, and processions. A book for readers who want to know why Rome still keeps time the way it does.",
    details: [
      "Paperback, 196 pages",
      "Signed copies available direct",
    ],
    buy: {
      primary: { label: "Buy direct ($18)", href: STRIPE_LINK_PLACEHOLDER },
      secondary: { label: "Available on Amazon", href: AMAZON_LINK_PLACEHOLDER },
    },
    excerpt:
      "Lauds at Santa Sabina in November: the basilica is the same age as the doctrine of the Hypostatic Union, and the wooden doors that close behind me were carved while Augustine was still writing.",
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
