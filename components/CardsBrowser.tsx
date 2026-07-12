"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PhotoCard } from "@/lib/cards";

const STORAGE_KEY = "domus-aurea:card-pack";

type Selection = Record<string, number>;

function sumQuantities(s: Selection): number {
  let n = 0;
  for (const v of Object.values(s)) n += v;
  return n;
}

export function CardsBrowser({
  cards,
  packSize,
  price,
  stripePaymentUrl,
}: {
  cards: PhotoCard[];
  packSize: number;
  price: string;
  stripePaymentUrl?: string;
}) {
  const [selection, setSelection] = useState<Selection>({});
  const [hydrated, setHydrated] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);

  // The selection bar is position:fixed, so by itself it would cover the
  // last thing on the page (the footer). Reserve space for it by padding
  // the body to the bar's rendered height — measured live, since the bar
  // wraps to two lines on narrow screens and grows when the pack panel
  // is open.
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const apply = () => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, []);

  const cardsByCode = useMemo(() => {
    const m = new Map<string, PhotoCard>();
    for (const c of cards) m.set(c.code, c);
    return m;
  }, [cards]);

  // Rehydrate from localStorage. Drop unknown codes (a card may have been
  // removed in Sanity since the user picked it) and cap the running total
  // at packSize in case packSize was lowered.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          const valid: Selection = {};
          let running = 0;
          for (const [code, qty] of Object.entries(parsed)) {
            if (typeof qty !== "number" || qty <= 0) continue;
            if (!cardsByCode.has(code)) continue;
            const room = packSize - running;
            if (room <= 0) break;
            const take = Math.min(qty, room);
            valid[code] = take;
            running += take;
          }
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
      /* storage may be full or disabled */
    }
  }, [selection, hydrated]);

  const total = useMemo(() => sumQuantities(selection), [selection]);
  const isComplete = total === packSize;
  const remaining = Math.max(0, packSize - total);
  const canAdd = total < packSize;

  const increment = (code: string) =>
    setSelection((s) => {
      if (sumQuantities(s) >= packSize) return s;
      return { ...s, [code]: (s[code] ?? 0) + 1 };
    });

  const decrement = (code: string) =>
    setSelection((s) => {
      const cur = s[code] ?? 0;
      if (cur <= 0) return s;
      const next = { ...s };
      if (cur === 1) delete next[code];
      else next[code] = cur - 1;
      return next;
    });

  const clear = () => setSelection({});

  // Stripe Payment Links can't carry a structured cart. We append the
  // selection as ?client_reference_id=CODE1xN_CODE2xN_... — that string
  // shows up next to each order in the Stripe dashboard so Greg knows
  // which photographs and quantities to print. Stripe restricts
  // client_reference_id to [A-Za-z0-9_-], so entries are joined with "_"
  // (not commas, which Stripe rejects). Card codes are [A-Z0-9] and the
  // "x" quantity separator is alphanumeric, so the whole string is safe.
  const refString = Object.entries(selection)
    .filter(([, q]) => q > 0)
    .map(([code, q]) => `${code}x${q}`)
    .join("_");

  const checkoutHref =
    isComplete && stripePaymentUrl
      ? appendClientRef(stripePaymentUrl, refString)
      : null;

  const selectionEntries = Object.entries(selection).filter(([, q]) => q > 0);

  return (
    <>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => {
          const qty = selection[card.code] ?? 0;
          const selected = qty > 0;
          return (
            <div
              key={card.code}
              className={[
                "flex flex-col overflow-hidden border bg-parchment-light/60 transition",
                selected
                  ? "border-crimson shadow-[0_0_0_1px_rgba(124,31,31,0.6)]"
                  : "border-stone/60 hover:border-gold",
              ].join(" ")}
            >
              <div className="relative aspect-[5/4] bg-stone/30">
                <img
                  src={card.imageUrl}
                  alt={card.imageAlt ?? card.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {selected && (
                  <span
                    aria-hidden
                    className="absolute right-2 top-2 flex h-9 min-w-[2.25rem] items-center justify-center rounded-full bg-crimson px-2 font-display text-sm text-parchment-light shadow"
                  >
                    &times;{qty}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between gap-3 p-3">
                <div>
                  <p
                    className="font-display text-[12px] uppercase leading-snug tracking-[0.16em] text-ink"
                    title={card.title}
                  >
                    {card.title}
                  </p>
                  {card.description && (
                    <p className="mt-1 font-serif text-xs italic leading-snug text-ink-soft">
                      {card.description}
                    </p>
                  )}
                </div>
                <Stepper
                  qty={qty}
                  onIncrement={() => increment(card.code)}
                  onDecrement={() => decrement(card.code)}
                  canIncrement={canAdd}
                  label={card.title}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* One fixed container holds the optional "Your pack" panel stacked
          on top of the always-visible status bar. Nesting them avoids any
          hardcoded offset between the two — the panel can grow and the
          bar can wrap without colliding. */}
      <div
        ref={barRef}
        className="fixed inset-x-0 bottom-0 z-40 flex flex-col border-t border-stone/60 bg-parchment-light/95 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(31,24,18,0.30)]"
      >
        {showPanel && selectionEntries.length > 0 && (
          <div className="max-h-[40vh] overflow-y-auto border-b border-stone/40">
            <div className="container-wide py-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft">
                  Your pack
                </p>
                <button
                  type="button"
                  onClick={() => setShowPanel(false)}
                  className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft hover:text-crimson"
                >
                  Close
                </button>
              </div>
              <ul className="space-y-2">
                {selectionEntries.map(([code, qty]) => {
                  const card = cardsByCode.get(code);
                  if (!card) return null;
                  return (
                    <li
                      key={code}
                      className="flex items-center gap-3 border border-stone/60 bg-parchment-light/80 p-2"
                    >
                      <img
                        src={card.imageUrl}
                        alt={card.imageAlt ?? card.title}
                        className="aspect-[5/4] h-14 flex-none object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-[12px] uppercase tracking-[0.16em] text-ink">
                          {card.title}
                        </p>
                      </div>
                      <Stepper
                        qty={qty}
                        onIncrement={() => increment(code)}
                        onDecrement={() => decrement(code)}
                        canIncrement={canAdd}
                        label={card.title}
                        compact
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        <div className="container-wide flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-ink">
              {total} / {packSize} in pack
            </p>
            <p className="font-serif text-xs italic text-ink-soft">
              {isComplete
                ? price
                  ? `${price} — ready to checkout`
                  : "Pack complete"
                : remaining === 1
                  ? "Add 1 more"
                  : `Add ${remaining} more`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {total > 0 && (
              <button
                type="button"
                onClick={() => setShowPanel((v) => !v)}
                className="font-display text-xs uppercase tracking-[0.18em] text-ink-soft underline decoration-gold underline-offset-4 hover:text-crimson"
              >
                {showPanel ? "Hide" : "View"}
              </button>
            )}
            {total > 0 && (
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
                    : `Add ${remaining} more`
                }
              >
                {!stripePaymentUrl
                  ? "Checkout coming soon"
                  : `Add ${remaining} more`}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Stepper({
  qty,
  onIncrement,
  onDecrement,
  canIncrement,
  label,
  compact = false,
}: {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  canIncrement: boolean;
  label: string;
  compact?: boolean;
}) {
  const btnSize = compact ? "h-7 w-7 text-base" : "h-9 w-9 text-lg";
  const num = compact ? "text-sm min-w-[1.25rem]" : "text-base min-w-[1.5rem]";
  return (
    <div className="flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={onDecrement}
        disabled={qty === 0}
        aria-label={`Remove one ${label}`}
        className={`flex ${btnSize} items-center justify-center rounded-full border border-stone/60 font-display leading-none text-ink-soft transition enabled:hover:border-crimson enabled:hover:text-crimson disabled:opacity-30`}
      >
        &minus;
      </button>
      <span
        className={`font-display ${num} text-center text-ink`}
        aria-live="polite"
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={!canIncrement}
        aria-label={`Add one ${label}`}
        className={`flex ${btnSize} items-center justify-center rounded-full border border-stone/60 font-display leading-none text-ink-soft transition enabled:hover:border-crimson enabled:hover:text-crimson disabled:opacity-30`}
      >
        &#43;
      </button>
    </div>
  );
}

function appendClientRef(url: string, ref: string): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}client_reference_id=${encodeURIComponent(ref)}`;
}
