import Link from "next/link";
import { site } from "@/lib/site";

// The site name is rendered as a wordmark with the final word ("Italy")
// painted with the Italian flag stripes. We split on the last space so
// metadata (page <title>) can keep using the plain `site.name` string.
function splitWordmark(name: string): { prefix: string; tail: string } {
  const idx = name.lastIndexOf(" ");
  if (idx === -1) return { prefix: "", tail: name };
  return { prefix: name.slice(0, idx), tail: name.slice(idx + 1) };
}

export function Header() {
  const { prefix, tail } = splitWordmark(site.name);
  return (
    <header className="relative z-20">
      <div className="container-wide flex items-center justify-between pt-8 pb-6">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-display text-[15px] uppercase tracking-[0.18em] text-ink sm:text-xl md:text-2xl md:tracking-[0.22em]">
            {prefix ? <>{prefix} </> : null}
            <span className="italy-flag">{tail}</span>
          </span>
          <span className="hidden h-3 w-px bg-gold/60 sm:block" />
          <span className="hidden font-serif text-sm italic text-ink-soft sm:block">
            est. mmxix
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline font-display text-xs uppercase tracking-[0.24em] text-ink-soft hover:text-crimson"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-wide">
        <div className="rule-gold" />
      </div>

      <nav className="md:hidden">
        <ul className="container-wide flex flex-wrap items-center gap-x-5 gap-y-2 pt-4">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-display text-[11px] uppercase tracking-[0.22em] text-ink-soft hover:text-crimson"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
