import Link from "next/link";
import { Footnote } from "@/components/Footnote";
import { AnnotatedPlan } from "@/components/AnnotatedPlan";
import { ReadingProgress } from "@/components/ReadingProgress";
import { OrnamentDivider } from "@/components/Ornament";

export const metadata = { title: "Chapter I — The Bronze Doors" };

export default function ChapterOne() {
  return (
    <>
      <ReadingProgress />

      <article className="container-prose pt-14 pb-12">
        <Link
          href="/interactive"
          className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft hover:text-crimson"
        >
          &larr; Contents
        </Link>

        <header className="mt-10 text-center">
          <p className="eyebrow">A Pilgrim&apos;s Rome &middot; Chapter I</p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-tight tracking-wide text-ink md:text-5xl">
            The Bronze Doors
          </h1>
          <p className="mt-3 font-serif text-2xl italic leading-snug text-ink-soft">
            Santa Sabina, Aventine &mdash; or, how to walk into the fifth century
          </p>
          <OrnamentDivider className="mt-10" />
        </header>

        <div className="prose-roman mt-12">
          <p className="drop-cap">
            The first thing to know about the doors of Santa Sabina is that they
            are not made of bronze. They are cypress, dark with sixteen
            centuries of incense and weather and the careful hands of Dominican
            sacristans
            <Footnote n={1}>
              The basilica has been in Dominican care since 1219, when Honorius
              III gave it to St. Dominic. The order&apos;s general curia is still
              housed in the adjoining convent.
            </Footnote>
            , and the people who call them bronze have not been close enough to
            see the wood grain.
          </p>

          <p>
            But the mistake is forgivable. They are massive, almost five meters
            tall, set into a Roman doorway in a Roman wall on a Roman hill, and
            in the half-light of the narthex they could be anything. What they
            actually are is, depending on how you count, either the oldest
            surviving wooden Christian doors in the world or simply the oldest
            object in Rome that anyone has been allowed to touch since the
            reign of Theodosius II
            <Footnote n={2}>
              Carbon dating and stylistic analysis converge on a date of
              c. 430&ndash;432, contemporary with the construction of the
              basilica by Peter of Illyria.
            </Footnote>
            .
          </p>

          <AnnotatedPlan />

          <h2>I.</h2>

          <p>
            The doors carry twenty-eight panels, of which eighteen survive. The
            iconography is not what a modern visitor would expect from a
            building this old. There is no Christ Pantocrator, no Lamb of God,
            no monogrammed chi-rho. There is, instead, a Moses receiving the
            law, an Elijah ascending in a chariot, and &mdash; in the upper
            left, where any sensible Roman would have looked first &mdash; a
            crucifixion.
          </p>

          <p>
            This crucifixion is the earliest narrative depiction of the event in
            Christian art. Christ is shown with two thieves, all three small,
            stiff, and frontal, against a wall of toy houses meant to indicate
            Jerusalem. Their arms are out. They are wearing perizomata
            <Footnote n={3}>
              Loin-cloths. The Roman world had not yet decided how to depict the
              naked, dying body of God, and the doors split the difference.
            </Footnote>
            . There are no crosses behind them, which is the part that
            modern viewers most often miss: at this date the cross was not yet
            the universal sign of the faith, and depicting one upright behind a
            human figure would have been, to a fifth-century Roman, mostly a
            depiction of an execution.
          </p>

          <blockquote>
            What changes between this panel and a Bernini Calvary is not the
            theology. The theology is identical. What changes is the willingness
            of the artist to look directly at the wood.
          </blockquote>

          <h2>II.</h2>

          <p>
            Push the doors open &mdash; they will resist; they have weight
            &mdash; and you are standing in one of the most argued-about rooms
            in Rome. The basilica is austere by Roman standards. Twenty-four
            columns of Proconnesian marble, all of them spolia from an earlier
            building, march down the nave in two even rows. Above the columns,
            a fifth-century inscription in gold mosaic on a blue ground reads
            <em> ECCLESIA NON FACTA MANU</em> &mdash; a church not made by
            hands. It is an unusual claim to make about a building.
          </p>

          <p>
            The inscription is a quotation, of course, from Hebrews 9, and the
            joke is that the building it describes is one of the most
            self-consciously made structures in late antique Rome. Peter of
            Illyria, the founding priest, signed the work and named the
            emperors and the popes; this was a public commission with a
            budget.
            <Footnote n={4}>
              The Roman habit of naming patrons in dedicatory inscriptions is,
              as far as we can tell, unbroken from the Augustan forum to the
              cornerstones of Vatican II.
            </Footnote>
            And yet the inscription is not lying. The room argues, very gently,
            that what matters in the building is not the marble or the
            commission but the act it permits: the eucharist, performed daily
            since at least 432.
          </p>

          <h2>III.</h2>

          <p>
            Stand at the western end and look east. The morning light comes in
            through the high clerestory windows
            <Footnote n={5}>
              The windows still use selenite panes, a translucent gypsum that
              gives the light its peculiar pearl-grey quality. Glass arrived
              much later.
            </Footnote>
            and falls in long parallel bars on the marble floor. There is, on
            most weekdays, no one else here. The Dominican community sings
            lauds at seven and vespers at six, and between those two moments
            the room belongs to whoever has the patience to sit in it.
          </p>

          <p>
            What is sometimes said about Santa Sabina is that it is the
            best-preserved early Christian basilica in Rome. This is true and
            also slightly misleading. It is not preserved; it is used. There is
            a difference, and the difference is the subject of this book.
          </p>
        </div>

        <OrnamentDivider className="mt-16" />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border border-stone/70 bg-parchment-light/60 p-6">
          <div>
            <p className="eyebrow">Next chapter</p>
            <p className="mt-1 font-display text-lg uppercase tracking-wide text-ink">
              II &middot; The Catacombs of Domitilla
            </p>
            <p className="font-serif italic text-ink-soft">In preparation</p>
          </div>
          <Link href="/interactive" className="btn-ghost">
            Back to contents
          </Link>
        </div>
      </article>
    </>
  );
}
