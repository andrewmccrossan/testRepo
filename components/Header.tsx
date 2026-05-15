import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="relative z-20">
      <div className="container-wide flex items-center justify-between pt-8 pb-6">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-display text-2xl uppercase tracking-[0.22em] text-ink">
            {site.name}
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
