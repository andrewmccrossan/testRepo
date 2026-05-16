"use client";

import { useEffect, useMemo, useState } from "react";
import type { CardTheme, PhotoCard } from "@/lib/cards";

const STORAGE_KEY = "domus-aurea:card-selection";
const ALL = "all";

export function CardsBrowser({
  themes,
  cards,
  packSize,
  price,
  stripePaymentUrl,
}: {
  themes: CardTheme[];
  cards: PhotoCard[];
  packSize: number;
  price: string;
  stripePaymentUrl?: string;
}) {
  const [selection, setSelection] = useState<string[]>([]);
  const [activeTheme, setActiveTheme] = useState<string>(ALL);
  const [hydrated, setHydrated] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const cardsByCode = useMemo(() => {
    const m = new Map<string, PhotoCard>();
    for (const c of cards) m.set(c.code, c);
    return m;
  }, [cards]);

  // Rehydrate selection from localStorage, dropping any codes that no
  // longer exist (e.g. a card was removed in Sanity after the user picked
  // it). Also enforce the current packSize cap.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const valid = parsed
            .filter((v): v is string => typeof v === "string")
            .filter((code) => cardsByCode.has(code))
            .slice(0, packSize);
          setSelection(valid);
        }
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, [cardsByCode, packSize]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } catch {
      /* storage may be full or disabled — silently skip */
    }
  }, [selection, hydrated]);

  const toggle = (code: string) => {
    setSelection((prev) => {
      if (prev.includes(code)) return prev.filter((c) => c !== code);
      if (prev.length >= packSize) return prev;
      return [...prev, code];
    });
  };

  const clear = () => setSelection([]);

  const isComplete = selection.length === packSize;
  const remaining = Math.max(0, packSize - selection.length);

  const visibleCards =
    activeTheme === ALL
      ? cards
      : cards.filter((c) => c.themeSlug === activeTheme);

  const themeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of cards) counts[c.themeSlug] = (counts[c.themeSlug] ?? 0) + 1;
    return counts;
  }, [cards]);

  // Build the checkout URL. The Stripe Payment Link is fixed (one product
  // for the whole pack); the customer's specific selection rides along in
  // ?client_reference_id=CODE1,CODE2,... which shows up in the Stripe
  // dashboard for the order so Greg knows which cards to print.
  const checkoutHref =
    isComplete && stripePaymentUrl
      ? appendClientRef(stripePaymentUrl, selection.join(","))
      : null;

  const selectedCards = selection
    .map((code) => cardsByCode.get(code))
    .filter((c): c is PhotoCard => c !== undefined);

  return (
    <>
      {/* Theme filter */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        <ThemePill
          label="All"
          count={cards.length}
          active={activeTheme === ALL}
          onClick={() => setActiveTheme(ALL)}
        />
        {themes.map((t) => {
          const count = themeCounts[t.slug] ?? 0;
          if (count === 0) return null;
          return (
            <ThemePill
              key={t.slug}
              label={t.name}
              count={count}
              active={activeTheme === t.slug}
              onClick={() => setActiveTheme(t.slug)}
            />
          );
        })}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {visibleCards.map((card) => {
          const selected = selection.includes(card.code);
          const blocked = !selected && selection.length >= packSize;
          return (
            <button
              key={card.code}
              type="button"
              onClick={() => toggle(card.code)}
              disabled={blocked}
              aria-pressed={selected}
              aria-label={
                selected
                  ? `Remove ${card.title} from selection`
                  : blocked
                    ? `Selection full — remove a card to add ${card.title}`
                    : `Add ${card.title} to selection`
              }
              className={[
                "group relative block aspect-square overflow-hidden border bg-stone/30 text-left transition",
                selected
                  ? "border-crimson ring-2 ring-crimson ring-offset-2 ring-offset-parchment"
                  : "border-stone/60 hover:border-gold",
                blocked ? "cursor-not-allowed opacity-40" : "cursor-pointer",
              ].join(" ")}
            >
              <img
                src={card.imageUrl}
                alt={card.imageAlt ?? card.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-[1.02]"
              />
              {selected && (
                <span
                  aria-hidden
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-crimson font-display text-sm text-parchment-light shadow"
                >
                  &#10003;
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-3">
                <span className="block font-display text-[11px] uppercase tracking-[0.16em] text-parchment-light">
                  {card.title}
                </span>
                {card.themeName && (
                  <span className="mt-0.5 block font-serif text-[11px] italic text-parchment/80">
                    {card.themeName}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Expandable "your selection" panel */}
      {showPanel && selectedCards.length > 0 && (
        <div className="fixed inset-x-0 bottom-[88px] z-30 border-t border-stone/60 bg-parchment-light/95 backdrop-blur-md">
          <div className="container-wide max-h-[40vh] overflow-y-auto py-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft">
                Your selection
              </p>
              <button
                type="button"
                onClick={() => setShowPanel(false)}
                className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft hover:text-crimson"
              >
                Close
              </button>
            </div>
            <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
              {selectedCards.map((card) => (
                <li key={card.code} className="relative">
                  <img
                    src={card.imageUrl}
                    alt={card.imageAlt ?? card.title}
                    className="aspect-square w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => toggle(card.code)}
                    aria-label={`Remove ${card.title}`}
                    className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-parchment-light hover:bg-crimson"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone/60 bg-parchment-light/95 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(31,24,18,0.30)]">
        <div className="container-wide flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink">
              {selection.length} / {packSize} selected
            </p>
            <p className="font-serif text-xs italic text-ink-soft">
              {isComplete
                ? price
                  ? `${price} — ready to checkout`
                  : "Pack complete"
                : remaining === 1
                  ? "Pick 1 more"
                  : `Pick ${remaining} more`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {selection.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPanel((v) => !v)}
                className="font-display text-xs uppercase tracking-[0.18em] text-ink-soft underline decoration-gold underline-offset-4 hover:text-crimson"
              >
                {showPanel ? "Hide" : "View"}
              </button>
            )}
            {selection.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="font-display text-xs uppercase tracking-[0.18em] text-ink-soft hover:text-crimson"
              >
                Clear
              </button>
            )}
            {checkoutHref ? (
              <a href={checkoutHref} className="btn-primary">
                Checkout{price ? ` — ${price}` : ""}
              </a>
            ) : (
              <span
                className="btn-primary cursor-not-allowed opacity-50"
                aria-disabled="true"
                title={
                  !stripePaymentUrl
                    ? "Checkout not yet configured"
                    : `Pick ${remaining} more`
                }
              >
                {!stripePaymentUrl
                  ? "Checkout coming soon"
                  : `Pick ${remaining} more`}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ThemePill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "rounded-full border px-4 py-1.5 font-display text-xs uppercase tracking-[0.18em] transition",
        active
          ? "border-crimson bg-crimson text-parchment-light"
          : "border-stone/60 bg-parchment-light/60 text-ink-soft hover:border-gold hover:text-crimson",
      ].join(" ")}
    >
      {label}
      <span className={active ? "ml-2 opacity-80" : "ml-2 text-ink-soft/70"}>
        {count}
      </span>
    </button>
  );
}

function appendClientRef(url: string, ref: string): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}client_reference_id=${encodeURIComponent(ref)}`;
}
