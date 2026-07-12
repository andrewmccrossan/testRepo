import Link from "next/link";
import { site } from "@/lib/site";
import { OrnamentDivider } from "./Ornament";

function renderWordmark(name: string) {
  const parts = name.split(/(\bItaly\b)/);
  return parts.map((part, i) =>
    part === "Italy" ? (
      <span key={i} className="italy-flag">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function Footer() {
  return (
    <footer className="mt-32">
      <div className="container-wide pb-16">
        <OrnamentDivider className="mb-12" />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-lg uppercase tracking-[0.22em] text-ink">
              {renderWordmark(site.name)}
            </p>
            <p className="mt-3 max-w-xs font-serif text-sm italic text-ink-soft">
              {site.tagline}
            </p>
          </div>

          <div>
            <p className="eyebrow">Wander</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-serif text-base">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-ink-soft hover:text-crimson">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Correspondence</p>
            <p className="mt-3 font-serif text-base text-ink-soft">
              Letters and notes are welcome at{" "}
              <a href={`mailto:${site.email}`} className="text-crimson underline decoration-gold/60 underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center border-t border-stone/50 pt-6">
          <p className="font-serif text-xs italic text-ink-soft">
            &copy; {new Date().getFullYear()} {site.author}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
