import Link from "next/link";

const serviceLinks = [
  { name: "Marketing", href: "/marketing/advertising" },
  { name: "Content Creation", href: "/visuals/graphic-design" },
  { name: "Websites & Apps", href: "/marketing/websites-apps" },
];

const siteLinks = [
  { name: "Home", href: "/" },
  { name: "Pay", href: "/booking" },
  { name: "Contact", href: "/contact" },
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
            <p className="eyebrow mb-8">Agency</p>
            <Link href="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Make It & Market"
                className="h-24 md:h-36 w-auto object-contain"
              />
            </Link>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[color:var(--color-ink-soft)]">
              A marketing agency helping brands, businesses, and causes reach their audience
              through advertising, outreach, content, and the web.
            </p>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center px-7 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-accent-ink)] bg-[color:var(--color-ink)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300"
            >
              Start a campaign
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
                <p className="eyebrow mb-1">Location</p>
                <span className="text-[color:var(--color-ink-soft)]">New York · Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16 py-16">
          <div>
            <ColumnHeading>Services</ColumnHeading>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Site</ColumnHeading>
            <ul className="space-y-3 text-sm">
              {siteLinks.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.name}</FooterLink>
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
