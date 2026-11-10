import Link from "next/link";
import { SITE_LANGUAGES, type HomeStrings } from "@/components/home/homeStrings";

export default function FooterI18n({
  lang,
  strings,
}: {
  lang: string;
  strings: HomeStrings["footer"];
}) {
  return (
    <footer className="dark-band bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] border-t border-[color:var(--color-line)]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-14 border-b border-[color:var(--color-line)]">
          <div>
            <Link href={`/${lang}`} className="block">
              <img
                src="/logo-trimmed.webp"
                alt="Make It & Market"
                className="block h-14 md:h-16 w-auto object-contain"
              />
            </Link>
            <p className="mt-6 text-base text-[color:var(--color-ink-soft)]">
              {strings.tagline}
            </p>
            {strings.translationNote ? (
              <p className="mt-3 text-sm text-[color:var(--color-ink-muted)]">
                {strings.translationNote}
              </p>
            ) : null}
          </div>

          <div className="text-base text-[color:var(--color-ink-soft)] space-y-2 lg:text-right">
            <p>info@makeitandmarket.com</p>
            <p>(347) 659 1708</p>
          </div>
        </div>

        <nav aria-label={strings.languagesLabel} className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-8">
          <span className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-ink-muted)]">
            {strings.languagesLabel}
          </span>
          {SITE_LANGUAGES.map((l) => (
            <Link
              key={l.code}
              href={l.path}
              className={
                l.code === lang
                  ? "text-sm text-[color:var(--color-gold)]"
                  : "text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-gold)] transition-colors"
              }
            >
              {l.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8">
          <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-ink-muted)]">
            &copy; {new Date().getFullYear()} Make It &amp; Market
          </p>
          <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-ink-muted)]">
            {strings.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
