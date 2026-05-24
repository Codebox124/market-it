import Link from "next/link";

const visualLinks = [
  { name: "Graphic Design", href: "/visuals/graphic-design" },
  { name: "Video Editing", href: "/visuals/video-editing" },
  { name: "Photo Editing", href: "/visuals/photo-editing" },
  { name: "Animation", href: "/visuals/animation" },
];

const marketingLinks = [
  { name: "Advertising", href: "/marketing/advertising" },
  { name: "Social Media", href: "/marketing/social-media" },
  { name: "Flyer Distribution", href: "/marketing/flyer-distribution" },
  { name: "Websites & Apps", href: "/marketing/websites-apps" },
];

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "Arabic" },
  { code: "bn", label: "Bengali" },
  { code: "hk", label: "Cantonese" },
  { code: "fr", label: "French" },
  { code: "gu", label: "Gujarati" },
  { code: "hi", label: "Hindi" },
  { code: "id", label: "Indonesian" },
  { code: "zh", label: "Mandarin" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "pt", label: "Portuguese" },
  { code: "es", label: "Spanish" },
  { code: "tl", label: "Tagalog" },
  { code: "ur", label: "Urdu" },
  { code: "ru", label: "Russian" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] transition-colors duration-300"
    >
      {children}
    </Link>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="eyebrow mb-6">{children}</h3>;
}

export default function Footer() {
  return (
    <footer className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] border-t border-[color:var(--color-line)]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 pt-24 pb-10">
        {/* Closing statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-[color:var(--color-line)]">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-8">Studio</p>
            <Link href="/" className="inline-block">
              <span className="display-md text-[color:var(--color-ink)]">
                Make It &amp; Market.
              </span>
            </Link>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[color:var(--color-ink-soft)]">
              A full-service creative studio building identity, marketing, and
              motion for brands that intend to outlast the cycle.
            </p>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center px-7 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-accent-ink)] bg-[color:var(--color-ink)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300"
            >
              Let&apos;s talk
            </Link>
          </div>

          <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[color:var(--color-line)]">
            <ColumnHeading>Get in touch</ColumnHeading>
            <ul className="space-y-4 text-base">
              <li>
                <p className="eyebrow mb-1">Email</p>
                <a
                  href="mailto:info@makeitandmarket.com"
                  className="text-[color:var(--color-ink)] hover:text-[color:var(--color-ink-soft)] transition-colors"
                >
                  info@makeitandmarket.com
                </a>
              </li>
              <li>
                <p className="eyebrow mb-1">Phone</p>
                <a
                  href="tel:3476591708"
                  className="text-[color:var(--color-ink)] hover:text-[color:var(--color-ink-soft)] transition-colors"
                >
                  (347) 659 1708
                </a>
              </li>
              <li>
                <p className="eyebrow mb-1">Studio</p>
                <span className="text-[color:var(--color-ink-soft)]">NYC · Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 py-16">
          <div>
            <ColumnHeading>Visuals</ColumnHeading>
            <ul className="space-y-3 text-sm">
              {visualLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Marketing</ColumnHeading>
            <ul className="space-y-3 text-sm">
              {marketingLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2">
            <ColumnHeading>Languages</ColumnHeading>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <FooterLink href={`/${lang.code}`}>{lang.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-[color:var(--color-line)]">
          <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-ink-muted)]">
            &copy; {new Date().getFullYear()} Make It &amp; Market
          </p>
          <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-ink-muted)]">
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
