"use client";

import { useState } from "react";

type Hotspot = {
  id: string;
  x: number; // percent
  y: number;
  label: string;
  note: string;
};

const hotspots: Hotspot[] = [
  {
    id: "doors",
    x: 16,
    y: 50,
    label: "Cypress doors",
    note: "Carved c. 432. Eighteen of the original twenty-eight panels survive, including the earliest narrative crucifixion in Christian art.",
  },
  {
    id: "nave",
    x: 50,
    y: 50,
    label: "Nave",
    note: "Twenty-four columns of Proconnesian marble, spolia from a temple of Juno on the same hill. They are matched as pairs; pause halfway down to look at the capitals.",
  },
  {
    id: "apse",
    x: 86,
    y: 50,
    label: "Apse",
    note: "The 5th-century mosaic was lost; what remains is a Renaissance fresco of Christ enthroned with saints. Stand here at lauds in November.",
  },
  {
    id: "chapel",
    x: 70,
    y: 80,
    label: "Zamora chapel",
    note: "Holds the tomb of Munoz de Zamora, a 13th-century Dominican master general. Small, dim, and worth the detour.",
  },
];

export function AnnotatedPlan() {
  const [active, setActive] = useState<string>("doors");
  const current = hotspots.find((h) => h.id === active)!;

  return (
    <figure className="my-10 border border-stone/70 bg-parchment-light/70 p-6">
      <figcaption className="mb-4 text-center">
        <p className="eyebrow">Plan</p>
        <p className="mt-2 font-serif text-base italic text-ink-soft">
          Basilica of Santa Sabina, Aventine &mdash; click the markers
        </p>
      </figcaption>

      <div className="relative mx-auto aspect-[2/1] w-full max-w-2xl">
        <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden>
          {/* outer wall */}
          <rect x="20" y="40" width="320" height="120" fill="#FBF6E8" stroke="#1F1812" strokeWidth="1.5" />
          {/* apse */}
          <path d="M340 40 Q380 100 340 160" fill="#FBF6E8" stroke="#1F1812" strokeWidth="1.5" />
          {/* columns - two rows */}
          {[...Array(11)].map((_, i) => (
            <circle key={`top-${i}`} cx={60 + i * 25} cy={70} r={3} fill="#1F1812" />
          ))}
          {[...Array(11)].map((_, i) => (
            <circle key={`bot-${i}`} cx={60 + i * 25} cy={130} r={3} fill="#1F1812" />
          ))}
          {/* doorway */}
          <rect x="14" y="85" width="12" height="30" fill="#7C1F1F" />
          {/* altar */}
          <rect x="320" y="92" width="14" height="16" fill="#B08D3A" />
          {/* side chapel */}
          <rect x="265" y="160" width="40" height="18" fill="#FBF6E8" stroke="#1F1812" strokeWidth="1" />
        </svg>

        {hotspots.map((h) => (
          <button
            key={h.id}
            onClick={() => setActive(h.id)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
              active === h.id
                ? "h-6 w-6 border-2 border-crimson bg-crimson/30"
                : "h-5 w-5 border-2 border-gold bg-parchment-light hover:bg-gold/30"
            }`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            aria-label={h.label}
          >
            <span className="sr-only">{h.label}</span>
          </button>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-2xl border-l-2 border-gold pl-4">
        <p className="font-display text-xs uppercase tracking-[0.22em] text-crimson">
          {current.label}
        </p>
        <p className="mt-2 font-serif text-base leading-relaxed text-ink/90">
          {current.note}
        </p>
      </div>
    </figure>
  );
}
