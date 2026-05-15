export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
      <svg
        viewBox="0 0 60 14"
        className="h-3.5 w-14 text-gold"
        fill="currentColor"
        aria-hidden
      >
        <path d="M30 0 L33 6 L40 4 L34.5 9 L40 14 L33 12 L30 14 L27 12 L20 14 L25.5 9 L20 4 L27 6 Z" />
        <circle cx="6" cy="7" r="1.4" />
        <circle cx="14" cy="7" r="1" />
        <circle cx="46" cy="7" r="1" />
        <circle cx="54" cy="7" r="1.4" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

export function CrossMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} fill="currentColor" aria-hidden>
      <path d="M10 0h4v12h10v4H14v16h-4V16H0v-4h10z" />
    </svg>
  );
}

export function LaurelMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M60 50 C 40 50, 20 40, 10 20" />
      <path d="M60 50 C 80 50, 100 40, 110 20" />
      {[...Array(6)].map((_, i) => {
        const t = (i + 1) / 7;
        const x = 60 - (50 * t);
        const y = 50 - (30 * t) + 2 * Math.sin(i);
        return (
          <ellipse key={`l-${i}`} cx={x} cy={y} rx="6" ry="2.5" transform={`rotate(${-30 - i * 3} ${x} ${y})`} />
        );
      })}
      {[...Array(6)].map((_, i) => {
        const t = (i + 1) / 7;
        const x = 60 + (50 * t);
        const y = 50 - (30 * t) + 2 * Math.sin(i);
        return (
          <ellipse key={`r-${i}`} cx={x} cy={y} rx="6" ry="2.5" transform={`rotate(${30 + i * 3} ${x} ${y})`} />
        );
      })}
      <circle cx="60" cy="52" r="2" fill="currentColor" />
    </svg>
  );
}

export function ColumnMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 80" className={className} fill="currentColor" aria-hidden>
      <rect x="2" y="0" width="20" height="4" />
      <rect x="3" y="4" width="18" height="3" />
      <path d="M5 7 L5 73 M9 7 L9 73 M13 7 L13 73 M17 7 L17 73 M19 7 L19 73" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <rect x="3" y="73" width="18" height="3" />
      <rect x="2" y="76" width="20" height="4" />
    </svg>
  );
}

export function RoseMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <circle cx="40" cy="40" r="36" />
      <circle cx="40" cy="40" r="28" />
      <circle cx="40" cy="40" r="10" />
      {[...Array(8)].map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 40 + Math.cos(a) * 10;
        const y1 = 40 + Math.sin(a) * 10;
        const x2 = 40 + Math.cos(a) * 36;
        const y2 = 40 + Math.sin(a) * 36;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      {[...Array(8)].map((_, i) => {
        const a = (i * Math.PI) / 4 + Math.PI / 8;
        const cx = 40 + Math.cos(a) * 20;
        const cy = 40 + Math.sin(a) * 20;
        return <circle key={`p-${i}`} cx={cx} cy={cy} r="6" />;
      })}
    </svg>
  );
}

export function MotifByName({ name, className }: { name: "cross" | "laurel" | "column" | "rose"; className?: string }) {
  switch (name) {
    case "cross":
      return <CrossMotif className={className} />;
    case "laurel":
      return <LaurelMotif className={className} />;
    case "column":
      return <ColumnMotif className={className} />;
    case "rose":
      return <RoseMotif className={className} />;
  }
}
