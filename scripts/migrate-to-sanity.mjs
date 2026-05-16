/**
 * One-shot migration: imports the existing hardcoded posts and books from
 * lib/posts.ts and lib/books.ts into Sanity. Idempotent — running twice
 * does not create duplicates (uses createOrReplace with deterministic _ids).
 *
 * Run with:
 *   SANITY_AUTH_TOKEN=sk... node scripts/migrate-to-sanity.mjs
 */
import { createClient } from "@sanity/client";
import crypto from "node:crypto";

if (!process.env.SANITY_AUTH_TOKEN) {
  console.error("SANITY_AUTH_TOKEN env var is required.");
  process.exit(1);
}

const client = createClient({
  projectId: "34m6fz10",
  dataset: "production",
  apiVersion: "2026-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const k = () => crypto.randomBytes(6).toString("hex");

const paragraph = (text) => ({
  _type: "block",
  _key: k(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});

const posts = [
  {
    _type: "post",
    _id: "post.on-the-meaning-of-gold",
    title: "On the Meaning of Gold",
    subtitle: "Why Byzantine icons refuse perspective, and what they offer instead.",
    slug: { _type: "slug", current: "on-the-meaning-of-gold" },
    date: "2026-04-22",
    tag: "Sacred Art",
    readingTime: "9 min read",
    excerpt:
      "A Western viewer trained on Raphael may find the gold ground of a Byzantine icon flat, even primitive. It is anything but. The gold is not background. It is the condition under which the figure can be seen at all.",
    body: [
      "A Western viewer trained on Raphael may find the gold ground of a Byzantine icon flat, even primitive. There is no horizon, no atmospheric perspective, no convincing room in which the saint stands. Just the face, the hands, and a sheet of beaten gold behind them, indifferent to the laws of optics.",
      "But the gold is not background. It is the condition under which the figure can be seen at all. Where Renaissance painting opens a window onto a world, the icon closes the window and replaces it with something stranger: a surface that catches your candle, your breath, the small movement of your body in front of it, and gives them back as light. The icon is not depicting a room. It is depicting the only room that matters, which is the one you are standing in.",
      "This is why Byzantine masters worked so hard on the chrysography, the fine gold striations on a robe or a Gospel book. The light is not coming from a sun behind the painter's left shoulder. The light is coming from inside the figure itself, and the gold lines on the cloth are not highlights but veins of it.",
      "When Rome inherited this tradition, in the apses of Santa Prassede and Santa Maria in Trastevere, the gold did not disappear. It went up onto the curving ceilings and waited there for the Counter-Reformation to rediscover it. Bernini's baldachin is, among other things, a Byzantine apse turned inside out: the gold has come down from the ceiling and is now a tent over the altar.",
      "To read a Roman church well is to remember that the gold is older than the perspective. The perspective is a guest. The gold is the host.",
    ].map(paragraph),
  },
  {
    _type: "post",
    _id: "post.what-bernini-knew",
    title: "What Bernini Knew About Crowds",
    subtitle: "The colonnade of St. Peter's is not architecture. It is hospitality.",
    slug: { _type: "slug", current: "what-bernini-knew" },
    date: "2026-03-08",
    tag: "Architecture",
    readingTime: "7 min read",
    excerpt:
      "Walk into St. Peter's Square from the Borgo and the colonnade reaches around you before you understand what is happening. This is not a metaphor. It is a piece of engineering aimed precisely at your nervous system.",
    body: [
      "Walk into St. Peter's Square from the Borgo and the colonnade reaches around you before you understand what is happening. This is not a metaphor. It is a piece of engineering aimed precisely at your nervous system.",
      "Bernini was working with a real problem. The basilica's facade, by Maderno, is too wide and too short. Its proportions had been compromised by structural concerns in the nave behind it. Approached head on, it sits like a dish: low, broad, faintly disappointing for the largest church in Christendom.",
      "The colonnade solves the facade by changing what you are looking at. It introduces a foreground, in the form of two enormous arms, that pulls your eye into a long oval before releasing it onto the dome. By the time you notice Maderno's facade, it is no longer the subject of the composition. The subject is you, standing in the embrace.",
      "The Latin verb is amplecti, to embrace. Bernini used it himself when describing the project. The Church gathers her children, he said, in maternal arms. It is the kind of theological language we usually distrust in architects. In this case the architecture earns it.",
      "Stand at the focal stones set into the pavement and the four rows of columns collapse into one. The colonnade disappears as a structure and reappears as a fact. Whatever Bernini knew about crowds, he learned it here: that a crowd, properly held, becomes a congregation.",
    ].map(paragraph),
  },
  {
    _type: "post",
    _id: "post.the-aventine-keyhole",
    title: "The Aventine Keyhole",
    subtitle: "On a small Roman view that has been quietly perfect for 250 years.",
    slug: { _type: "slug", current: "the-aventine-keyhole" },
    date: "2026-01-30",
    tag: "Rome",
    readingTime: "5 min read",
    excerpt:
      "There is a door on the Aventine with a keyhole, and through the keyhole you can see, in perfect alignment, three sovereign territories at once. It is the kind of small civic joke that Rome specializes in.",
    body: [
      "There is a door on the Aventine with a keyhole, and through the keyhole you can see, in perfect alignment, three sovereign territories at once: the garden of the Knights of Malta in the immediate foreground, the city of Rome in the middle distance, and, framed perfectly by a hedge corridor, the dome of St. Peter's at the far end. It is the kind of small civic joke that Rome specializes in.",
      "The keyhole was not, as far as we can tell, intentional. The garden was designed by Piranesi in 1765, when he was given the commission by the Knights, but the keyhole alignment seems to have emerged from the geometry rather than from a plan to produce it. It is one of those rare cases where a city accidentally writes a sentence about itself.",
      "The sentence reads, roughly: from a small enclosed garden, through a long line of trees, one can see the Church. That is also a description of medieval contemplative life, of the Roman noble villa, and of every Catholic novel from Newman to Greene. The keyhole is, in this sense, the most concise piece of theology in the city.",
      "It is also, more practically, a charming way to spend ten minutes on a Sunday morning before lunch in Testaccio.",
    ].map(paragraph),
  },
];

const books = [
  {
    _type: "book",
    _id: "book.stones-of-the-seven-hills",
    title: "Stones of the Seven Hills",
    subtitle: "A History of Rome in Twelve Buildings",
    slug: { _type: "slug", current: "stones-of-the-seven-hills" },
    year: "2023",
    price: "$24",
    coverBackgroundColor: "#7C1F1F",
    coverAccentColor: "#B08D3A",
    coverMotif: "column",
    description:
      "A walking history of the Eternal City told through twelve structures, from the Servian Wall to the Baroque facade of the Gesu. Each chapter is both an architectural reading and a meditation on the civilization that raised it.",
    details: [
      "Hardcover, 312 pages",
      "Illustrated with 40 line drawings",
      "Foreword by the author",
    ],
    buyPrimaryLabel: "Buy direct ($24)",
    // buyPrimaryUrl intentionally left empty — renders as "Coming soon"
    buySecondaryLabel: "Available on Amazon",
    // buySecondaryUrl intentionally left empty
    excerpt:
      "Rome does not forget. The travertine of the Colosseum is quarried from the same hills that gave Trajan his columns; the bronze of St. Peter's baldachin was once the roof of the Pantheon. To walk these streets is to read a palimpsest in stone.",
  },
  {
    _type: "book",
    _id: "book.the-light-of-caravaggio",
    title: "The Light of Caravaggio",
    subtitle: "Faith, Violence, and the Roman Baroque",
    slug: { _type: "slug", current: "the-light-of-caravaggio" },
    year: "2021",
    price: "$22",
    coverBackgroundColor: "#1F1812",
    coverAccentColor: "#D4B25A",
    coverMotif: "cross",
    description:
      "An intimate account of Caravaggio's Roman years, when a young painter from Lombardy turned the city's chapels into theatres of grace. A book about pigment, about violence, and about the strange honesty of the Counter-Reformation.",
    details: [
      "Paperback, 248 pages",
      "16-page color insert",
      "Index and bibliography",
    ],
    buyPrimaryLabel: "Buy direct ($22)",
    buySecondaryLabel: "Available on Amazon",
    excerpt:
      "He painted the calling of Matthew as one might paint a bar fight: a sudden gesture, a shaft of dirty light, a saint discovered mid-coin. Rome had never seen a Gospel told quite this way.",
  },
  {
    _type: "book",
    _id: "book.the-hours-of-the-aventine",
    title: "The Hours of the Aventine",
    subtitle: "Essays on Liturgy, Memory, and the Old Roman Church",
    slug: { _type: "slug", current: "the-hours-of-the-aventine" },
    year: "2019",
    price: "$18",
    coverBackgroundColor: "#5A1414",
    coverAccentColor: "#F5EEDC",
    coverMotif: "rose",
    description:
      "Seventeen essays that move between the Aventine basilicas at dawn and the long Roman tradition of hours, vigils, and processions. A book for readers who want to know why Rome still keeps time the way it does.",
    details: ["Paperback, 196 pages", "Signed copies available direct"],
    buyPrimaryLabel: "Buy direct ($18)",
    buySecondaryLabel: "Available on Amazon",
    excerpt:
      "Lauds at Santa Sabina in November: the basilica is the same age as the doctrine of the Hypostatic Union, and the wooden doors that close behind me were carved while Augustine was still writing.",
  },
];

async function main() {
  for (const doc of [...posts, ...books]) {
    await client.createOrReplace(doc);
    console.log(`OK  ${doc._type.padEnd(5)} ${doc.title}`);
  }
  console.log(`\nImported ${posts.length} posts and ${books.length} books.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
