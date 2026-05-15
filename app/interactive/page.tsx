import Link from "next/link";
import { OrnamentDivider, RoseMotif } from "@/components/Ornament";

export const metadata = { title: "Interactive" };

const chapters = [
  {
    number: "I",
    title: "The Bronze Doors",
    status: "available",
    href: "/interactive/chapter-1",
    blurb:
      "Standing at the threshold of Santa Sabina, where the oldest narrative crucifixion in the West is carved into cypress that is older than the Quran.",
  },
  {
    number: "II",
    title: "The Catacombs of Domitilla",
    status: "soon",
    blurb:
      "An underground basilica, a Good Shepherd in faded ochre, and the slow Christianization of a Roman family villa.",
  },
  {
    number: "III",
    title: "Santa Pudenziana",
    status: "soon",
    blurb:
      "The earliest apse mosaic in Rome &mdash; Christ enthroned in a Roman senatorial scene that no one in the senate would have recognized.",
  },
  {
    number: "IV",
    title: "The Lateran Baptistery",
    status: "soon",
    blurb:
      "Eight sides for eight days; the geometry of resurrection, and why Constantine's daughter wanted it this way.",
  },
];

export default function InteractivePage() {
  return (
    <>
      <section className="container-wide pt-16 pb-12 text-center">
        <p className="eyebrow">Liber Aperitus &mdash; the open book</p>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-wide text-ink md:text-6xl">
          A Pilgrim&apos;s Rome
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-ink-soft">
          A manuscript-in-progress, presented one chapter at a time as an
          interactive object. Read it slowly. Open the footnotes. Look at the
          plan of the church.
        </p>

        <div className="mx-auto mt-10 flex max-w-lg items-center gap-6">
          <span className="h-px flex-1 bg-gold/50" />
          <RoseMotif className="h-12 w-12 text-crimson" />
          <span className="h-px flex-1 bg-gold/50" />
        </div>
      </section>

      <section className="container-wide pb-8">
        <div className="mx-auto max-w-3xl rounded-sm border border-stone/70 bg-parchment-light/60 p-8 md:p-10">
          <p className="eyebrow">A note to the reader</p>
          <p className="mt-3 font-serif text-lg italic leading-relaxed text-ink-soft">
            Some chapters of this work will be free; some will eventually be
            available to subscribers. For now, the first chapter is open to all,
            and you are kindly asked to write to me with any reactions, errors,
            or quarrels.
          </p>
        </div>
      </section>

      <section className="container-wide pb-24 pt-8">
        <p className="eyebrow mb-6 text-center">Contents</p>
        <ol className="mx-auto max-w-3xl space-y-4">
          {chapters.map((ch) => (
            <li key={ch.number}>
              <ChapterRow chapter={ch} />
            </li>
          ))}
        </ol>

        <OrnamentDivider className="mt-16" />

        <p className="mt-10 text-center font-serif italic text-ink-soft">
          New chapters appear when they are ready, not before.
        </p>
      </section>
    </>
  );
}

function ChapterRow({
  chapter,
}: {
  chapter: { number: string; title: string; status: string; href?: string; blurb: string };
}) {
  const Inner = (
    <div className="group flex items-start gap-6 border border-stone/60 bg-parchment-light/60 p-6 transition hover:border-gold/70">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-gold/60 font-display text-xl text-crimson">
        {chapter.number}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-xl uppercase tracking-wide text-ink">
            {chapter.title}
          </h3>
          {chapter.status === "soon" && (
            <span className="font-display text-[10px] uppercase tracking-[0.3em] text-ink-soft">
              In preparation
            </span>
          )}
          {chapter.status === "available" && (
            <span className="font-display text-[10px] uppercase tracking-[0.3em] text-crimson">
              Available
            </span>
          )}
        </div>
        <p
          className="mt-2 font-serif italic leading-relaxed text-ink-soft"
          dangerouslySetInnerHTML={{ __html: chapter.blurb }}
        />
      </div>
      {chapter.href && (
        <div className="self-center font-display text-xs uppercase tracking-[0.22em] text-crimson group-hover:text-crimson-dark">
          Read &rarr;
        </div>
      )}
    </div>
  );

  if (chapter.href) {
    return (
      <Link href={chapter.href} className="block">
        {Inner}
      </Link>
    );
  }
  return Inner;
}
