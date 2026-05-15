"use client";

import { useState, useRef, useEffect } from "react";

export function Footnote({
  n,
  children,
}: {
  n: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <span ref={ref} className="relative inline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center justify-center align-super font-display text-[10px] leading-none ${
          open
            ? "border-crimson bg-crimson text-parchment-light"
            : "border-gold/70 text-crimson hover:bg-gold/15"
        } -mt-2 ml-0.5 h-4 w-4 border transition`}
        aria-label={`Open footnote ${n}`}
      >
        {n}
      </button>
      {open && (
        <span className="absolute left-1/2 top-full z-30 mt-2 w-72 -translate-x-1/2 border border-gold/70 bg-parchment-light p-4 text-left font-serif text-sm not-italic leading-relaxed text-ink shadow-lg sm:w-80">
          <span className="block font-display text-[10px] uppercase tracking-[0.22em] text-crimson">
            Footnote {n}
          </span>
          <span className="mt-1 block">{children}</span>
        </span>
      )}
    </span>
  );
}
