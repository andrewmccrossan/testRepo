// Customer reviews shown on individual book pages, keyed by book slug.
// Curated by hand from real reader feedback — wording is verbatim. Books
// without an entry simply don't render a reviews section. If Greg starts
// collecting these regularly, promote this to a `reviews` array field on
// the book schema in Sanity.

export type BookReview = {
  paragraphs: string[];
  attribution: string;
};

const bookReviews: Record<string, BookReview[]> = {
  "the-hours-of-the-aventine": [
    {
      paragraphs: [
        "After I returned from my recent trip to Rome, I was looking to find a book that would give me information and capture the beauty of the various churches I visited. This book exceeded my expectations in providing both a useful guidebook on a great many of the wonderful churches in Rome and in providing brilliant color photos of the churches in a hardcover volume that is great coffee table edition to share memories of Rome! When the package arrived, I was delighted to see it included this huge, richly photographed volume with the major churches and basilicas of Rome, as well as some of the important churches that are not often found in other illustrated Rome church books, including station churches, like SS Apostoli, San Martino ai Monti, San Crisogono, SS Giovanni e Paolo, San Giorgio al Velabro, SS Cosma e Damiano and Santa Sabina.",
      ],
      attribution: "S",
    },
    {
      paragraphs: [
        "After a recent pilgrimage to Rome, I needed a book that would help me learn about the history, architecture, and beautiful art I saw in the churches (although I saw only 13, not 60)! This big, beautiful, and informative book exceeds expectations. The book is filled with detailed photographs and explanations of architecture, sculpture, frescoes, mosaics, and more. I’m looking forward to my next trip to Rome, to sit with this book in the churches I visit, and gain a better understanding and appreciation of what is around me. Great purchase!",
      ],
      attribution: "S",
    },
    {
      paragraphs: [
        "A superb book. Magnificent photographs are complemented by insightful text detailing the history and architecture of Rome’s churches. Even a casual perusal of this volume will cause the reader to conclude that it’s time to return to Rome and see those churches again --- with a greater appreciation of their art and history. What a triumph for the author -- and what a great benefit to us as readers and pilgrims!",
      ],
      attribution: "JCB",
    },
  ],
  "epic-journey-book": [
    {
      paragraphs: [
        "As a frequent traveler to Rome preparing for my fifth visit during the upcoming Jubilee, I’ve tried numerous guidebooks on Roman churches but nothing compares to Greg Pulles’ “Rediscovering the Churches of Rome.” This meticulously organized book has saved me from the countless hours I was spending cobbling together my own resources!",
        "What sets this book apart are the brilliantly designed walks that take you through sixty churches across eleven carefully planned routes. The maps are exceptional - clear, detailed, and practical. No more walking in circles trying to find these architectural and spiritual treasures!",
        "While perfect for first-time visitors, this guide truly shines for those returning to Rome who want to explore beyond the usual tourist spots. It complements the knowledge gained from Mountain Butorac (The Catholic Traveler) tours and blog, approaching these sacred spaces from both educational and sacramental perspectives.",
        "Pulles strikes the perfect balance between practical information and spiritual context. Whether you’re an art enthusiast, history buff, or pilgrim, this book enriches your experience of Rome’s magnificent churches.",
        "If you’re planning a trip to Rome (especially for the Jubilee), do yourself a favor and get this book. It’s the companion I’ve been searching for through four previous visits, and I’m thrilled to have found it for my fifth!",
      ],
      attribution: "L",
    },
    {
      paragraphs: [
        "I wish I would have known about this wonderful book on my previous trips to Rome. I recently returned from my seventh trip and having this detailed guide made all the difference. I was able to plan my visit to many of the churches I had wanted to see for the longest time. I often heard about many of these churches, especially from The Catholic Traveler, but wasn’t sure how to organize the visits to make the most of it with limited time. This book is an excellent source, if you are interested in visiting the magnificent sacred places in the Eternal City.",
      ],
      attribution: "P",
    },
  ],
};

export function getBookReviews(slug: string): BookReview[] {
  return bookReviews[slug] ?? [];
}
