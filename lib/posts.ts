export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  dateLabel: string;
  readingTime: string;
  tag: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "on-the-meaning-of-gold",
    title: "On the Meaning of Gold",
    subtitle: "Why Byzantine icons refuse perspective, and what they offer instead.",
    date: "2026-04-22",
    dateLabel: "April 22, 2026",
    readingTime: "9 min read",
    tag: "Sacred Art",
    excerpt:
      "A Western viewer trained on Raphael may find the gold ground of a Byzantine icon flat, even primitive. It is anything but. The gold is not background. It is the condition under which the figure can be seen at all.",
    body: [
      "A Western viewer trained on Raphael may find the gold ground of a Byzantine icon flat, even primitive. There is no horizon, no atmospheric perspective, no convincing room in which the saint stands. Just the face, the hands, and a sheet of beaten gold behind them, indifferent to the laws of optics.",
      "But the gold is not background. It is the condition under which the figure can be seen at all. Where Renaissance painting opens a window onto a world, the icon closes the window and replaces it with something stranger: a surface that catches your candle, your breath, the small movement of your body in front of it, and gives them back as light. The icon is not depicting a room. It is depicting the only room that matters, which is the one you are standing in.",
      "This is why Byzantine masters worked so hard on the chrysography, the fine gold striations on a robe or a Gospel book. The light is not coming from a sun behind the painter's left shoulder. The light is coming from inside the figure itself, and the gold lines on the cloth are not highlights but veins of it.",
      "When Rome inherited this tradition, in the apses of Santa Prassede and Santa Maria in Trastevere, the gold did not disappear. It went up onto the curving ceilings and waited there for the Counter-Reformation to rediscover it. Bernini's baldachin is, among other things, a Byzantine apse turned inside out: the gold has come down from the ceiling and is now a tent over the altar.",
      "To read a Roman church well is to remember that the gold is older than the perspective. The perspective is a guest. The gold is the host.",
    ],
  },
  {
    slug: "what-bernini-knew",
    title: "What Bernini Knew About Crowds",
    subtitle: "The colonnade of St. Peter's is not architecture. It is hospitality.",
    date: "2026-03-08",
    dateLabel: "March 8, 2026",
    readingTime: "7 min read",
    tag: "Architecture",
    excerpt:
      "Walk into St. Peter's Square from the Borgo and the colonnade reaches around you before you understand what is happening. This is not a metaphor. It is a piece of engineering aimed precisely at your nervous system.",
    body: [
      "Walk into St. Peter's Square from the Borgo and the colonnade reaches around you before you understand what is happening. This is not a metaphor. It is a piece of engineering aimed precisely at your nervous system.",
      "Bernini was working with a real problem. The basilica's facade, by Maderno, is too wide and too short. Its proportions had been compromised by structural concerns in the nave behind it. Approached head on, it sits like a dish: low, broad, faintly disappointing for the largest church in Christendom.",
      "The colonnade solves the facade by changing what you are looking at. It introduces a foreground, in the form of two enormous arms, that pulls your eye into a long oval before releasing it onto the dome. By the time you notice Maderno's facade, it is no longer the subject of the composition. The subject is you, standing in the embrace.",
      "The Latin verb is amplecti, to embrace. Bernini used it himself when describing the project. The Church gathers her children, he said, in maternal arms. It is the kind of theological language we usually distrust in architects. In this case the architecture earns it.",
      "Stand at the focal stones set into the pavement and the four rows of columns collapse into one. The colonnade disappears as a structure and reappears as a fact. Whatever Bernini knew about crowds, he learned it here: that a crowd, properly held, becomes a congregation.",
    ],
  },
  {
    slug: "the-aventine-keyhole",
    title: "The Aventine Keyhole",
    subtitle: "On a small Roman view that has been quietly perfect for 250 years.",
    date: "2026-01-30",
    dateLabel: "January 30, 2026",
    readingTime: "5 min read",
    tag: "Rome",
    excerpt:
      "There is a door on the Aventine with a keyhole, and through the keyhole you can see, in perfect alignment, three sovereign territories at once. It is the kind of small civic joke that Rome specializes in.",
    body: [
      "There is a door on the Aventine with a keyhole, and through the keyhole you can see, in perfect alignment, three sovereign territories at once: the garden of the Knights of Malta in the immediate foreground, the city of Rome in the middle distance, and, framed perfectly by a hedge corridor, the dome of St. Peter's at the far end. It is the kind of small civic joke that Rome specializes in.",
      "The keyhole was not, as far as we can tell, intentional. The garden was designed by Piranesi in 1765, when he was given the commission by the Knights, but the keyhole alignment seems to have emerged from the geometry rather than from a plan to produce it. It is one of those rare cases where a city accidentally writes a sentence about itself.",
      "The sentence reads, roughly: from a small enclosed garden, through a long line of trees, one can see the Church. That is also a description of medieval contemplative life, of the Roman noble villa, and of every Catholic novel from Newman to Greene. The keyhole is, in this sense, the most concise piece of theology in the city.",
      "It is also, more practically, a charming way to spend ten minutes on a Sunday morning before lunch in Testaccio.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
