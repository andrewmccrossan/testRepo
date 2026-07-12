"use client";

import { useMemo, useState } from "react";

type DecoderCard = {
  code: string;
  title: string;
  imageUrl: string;
};

type Line =
  | { kind: "ok"; code: string; qty: number; card: DecoderCard }
  | { kind: "unknown"; code: string; qty: number }
  | { kind: "invalid"; raw: string };

// Parses a Stripe client_reference_id like "A3F2K9x4_B7Q1x8" into lines.
// Forgiving about separators (underscores, spaces, commas, newlines) since
// the string may be copied out of the Stripe dashboard imperfectly.
function parse(input: string, byCode: Map<string, DecoderCard>): Line[] {
  return input
    .trim()
    .split(/[\s_,]+/)
    .filter(Boolean)
    .map((entry): Line => {
      const m = entry.match(/^([A-Za-z0-9]+)x(\d+)$/);
      if (!m) return { kind: "invalid", raw: entry };
      const code = m[1].toUpperCase();
      const qty = parseInt(m[2], 10);
      const card = byCode.get(code);
      return card
        ? { kind: "ok", code, qty, card }
        : { kind: "unknown", code, qty };
    });
}

export function OrderDecoder({
  cards,
  packSize,
}: {
  cards: DecoderCard[];
  packSize: number;
}) {
  const [input, setInput] = useState("");

  const byCode = useMemo(() => {
    const m = new Map<string, DecoderCard>();
    for (const c of cards) m.set(c.code.toUpperCase(), c);
    return m;
  }, [cards]);

  const lines = input.trim() ? parse(input, byCode) : [];
  const total = lines.reduce(
    (n, l) => (l.kind === "invalid" ? n : n + l.qty),
    0,
  );
  const hasProblems = lines.some((l) => l.kind !== "ok");

  return (
    <div>
      <label
        htmlFor="ref"
        className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft"
      >
        Paste the order&rsquo;s client_reference_id
      </label>
      <textarea
        id="ref"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={2}
        placeholder="e.g. A3F2K9x4_B7Q1x8"
        spellCheck={false}
        className="mt-2 w-full border border-stone/60 bg-parchment-light/60 p-3 font-mono text-sm text-ink outline-none focus:border-crimson"
      />

      {lines.length > 0 && (
        <div className="mt-8">
          <p
            className={`font-display text-sm uppercase tracking-[0.2em] ${
              total === packSize ? "text-ink" : "text-crimson"
            }`}
          >
            {total} card{total === 1 ? "" : "s"} total
            {total !== packSize && ` — expected ${packSize}`}
          </p>

          <ul className="mt-4 space-y-3">
            {lines.map((line, i) => {
              if (line.kind === "invalid") {
                return (
                  <li
                    key={i}
                    className="border border-crimson/60 bg-crimson/5 p-3 font-serif text-sm text-crimson"
                  >
                    Couldn&rsquo;t read &ldquo;{line.raw}&rdquo; &mdash;
                    expected something like CODEx3.
                  </li>
                );
              }
              if (line.kind === "unknown") {
                return (
                  <li
                    key={i}
                    className="border border-crimson/60 bg-crimson/5 p-3 font-serif text-sm text-crimson"
                  >
                    {line.qty} &times; unknown code &ldquo;{line.code}&rdquo;
                    &mdash; no card with this code exists in Sanity (was it
                    deleted or renamed after the order?).
                  </li>
                );
              }
              return (
                <li
                  key={i}
                  className="flex items-center gap-4 border border-stone/60 bg-parchment-light/80 p-3"
                >
                  <img
                    src={line.card.imageUrl}
                    alt={line.card.title}
                    className="h-16 w-20 flex-none bg-parchment-light object-contain"
                  />
                  <p className="min-w-0 flex-1 font-display text-sm uppercase tracking-[0.14em] text-ink">
                    {line.card.title}
                  </p>
                  <p className="font-display text-2xl text-crimson">
                    &times;{line.qty}
                  </p>
                </li>
              );
            })}
          </ul>

          {!hasProblems && total === packSize && (
            <p className="mt-6 font-serif italic text-ink-soft">
              Complete pack of {packSize} &mdash; ready to print and ship.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
