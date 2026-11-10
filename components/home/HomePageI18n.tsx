import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/home/EnquiryForm";
import VideoTile from "@/components/home/VideoTile";
import ReelVideo from "@/components/home/ReelVideo";
import type { HomeStrings } from "@/components/home/homeStrings";

// Localized homepage — mirrors components/home/HomePage.tsx section for
// section, with all copy coming from dictionaries/<lang>.json ("home" key).

const clientLogoMedia: { src: string; invert?: boolean; disc?: boolean }[] = [
  { src: "/clientScroll/exopest-tile.webp" },
  { src: "/clientScroll/de-zavala-tile.webp" },
  { src: "/clientScroll/builditect-tile.webp", invert: true },
  { src: "/clientScroll/terra-tile.webp", disc: true },
  { src: "/clientScroll/popcorn-tile.webp" },
  { src: "/clientScroll/gm-tile-v3.webp" },
  { src: "/clientScroll/hot-or-not-tile.webp" },
  { src: "/clientScroll/reefnreem-tile.webp", invert: true },
  { src: "/clientScroll/arc-tile.webp" },
  { src: "/clientScroll/northeast-tile.webp" },
  { src: "/clientScroll/olivers-tile.webp" },
  { src: "/clientScroll/forever-tile.webp", disc: true },
  { src: "/clientScroll/moses-tile.webp" },
  { src: "/clientScroll/kids-dynasty-tile.webp", disc: true },
  { src: "/clientScroll/laara-tile.webp", invert: true },
];

const workMedia: {
  image: string;
  span: string;
  aspect: string;
  fit?: "cover" | "contain";
  video?: { webm: string; mp4: string };
}[] = [
  {
    image: "/video/video-showcase-v6.webp",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
    video: { webm: "/video/showcase-v2.webm", mp4: "/video/showcase-v2.mp4" },
  },
  { image: "/clientShowcase/website-showcase-v3.webp", fit: "contain", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { image: "/graphic/strategy-showcase-v2.webp", fit: "contain", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { image: "/social/social-showcase-v4.webp", fit: "contain", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { image: "/content/branding-showcase-v3.webp", fit: "contain", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { image: "/animation/animation-showcase-v2.webp", fit: "contain", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { image: "/content/presentations-showcase-v9.webp", fit: "contain", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { image: "/content/documents-showcase-v3.webp", fit: "contain", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { image: "/content/3d-showcase-v2.webp", fit: "contain", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { image: "/content/cover-art-spread.webp", fit: "contain", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { image: "/photo/photography-showcase-v4.webp", fit: "contain", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { image: "/content/drawing-sketch-showcase-v4.webp", fit: "contain", span: "md:col-span-6", aspect: "aspect-[4/3]" },
];

const serviceHrefs = ["/branding", "/design", "/content-creation"];

export default function HomePageI18n({
  lang,
  home,
}: {
  lang: string;
  home: HomeStrings;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Make It & Market",
    url: `https://www.makeitandmarket.com/${lang}`,
    description: home.jsonLdDescription,
    email: "info@makeitandmarket.com",
    telephone: "+1-347-659-1708",
    areaServed: "New York",
    slogan: "We build brands the market remembers.",
    knowsAbout: [
      "Brand Identity",
      "Graphic Design",
      "Content Creation",
      "Photography",
      "Video Production",
      "Animation",
      "Website Design",
    ],
  };

  return (
    <div
      className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)]"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* MAIN REEL */}
      <section aria-label={home.hero.reelLabel}>
        <ReelVideo />
      </section>

      {/* HERO */}
      <section className="relative pt-20 md:pt-24 pb-16 md:pb-20 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <p className="eyebrow !text-[color:var(--color-gold)] mb-8">
            {home.hero.eyebrow}
          </p>
          <h1 className="font-fraunces font-medium text-[color:var(--color-paper)] text-[clamp(2.9rem,7.5vw,6.8rem)] leading-[1.02] max-w-6xl">
            {home.hero.h1a}{" "}
            <em className="italic text-[color:var(--color-gold)]">{home.hero.h1b}</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            {home.hero.body}
          </p>
          <div className="mt-10">
            <a
              href="#work"
              className="inline-flex items-center px-8 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[#0b0b0d] bg-[color:var(--color-gold)] hover:bg-[color:var(--color-gold-strong)] transition-colors duration-300"
            >
              {home.hero.cta}
            </a>
          </div>

          <figure className="mt-16 md:mt-20">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#111111]">
              <Image
                src="/content/hero-timessquare.webp"
                alt={home.hero.heroAlt}
                fill
                priority
                sizes="(max-width: 1600px) 100vw, 1600px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-sm text-[color:var(--color-ink-muted)]">
              {home.hero.caption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section aria-label={home.logos.ariaLabel} className="py-16 md:py-24 border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <h2 className="text-center text-[0.7rem] font-medium tracking-[0.32em] uppercase text-[color:var(--color-ink-muted)]">
            {home.logos.heading}
          </h2>
          <div className="logo-strip dark-band mt-10 grid grid-cols-3 lg:grid-cols-5 gap-px bg-[color:var(--color-line)] border border-[color:var(--color-line)]">
            {clientLogoMedia.map((logo, i) => (
              <div
                key={logo.src}
                className="relative h-24 md:h-36 bg-[color:var(--color-surface)] flex items-center justify-center"
              >
                {logo.disc ? (
                  <div className="relative h-[94%] aspect-square rounded-full bg-white overflow-hidden">
                    <Image
                      src={logo.src}
                      alt={home.logos.alts[i] ?? ""}
                      fill
                      sizes="(max-width: 1024px) 33vw, 20vw"
                      className="object-contain p-1.5"
                    />
                  </div>
                ) : (
                  <Image
                    src={logo.src}
                    alt={home.logos.alts[i] ?? ""}
                    fill
                    sizes="(max-width: 1024px) 33vw, 20vw"
                    className={`object-contain p-2 md:p-2${logo.invert ? " invert" : ""}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="py-24 md:py-36 border-t border-[color:var(--color-line)] scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <h2 className="font-fraunces font-medium text-[color:var(--color-paper)] text-[clamp(2.2rem,5vw,4.2rem)] leading-none">
            {home.work.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            {home.work.intro}
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-16 md:gap-x-8 md:gap-y-24">
            {workMedia.map((piece, i) => {
              const text = home.work.tiles[i];
              if (!text) return null;
              return (
                <article key={piece.image} className={`${piece.span} group`}>
                  <div
                    className={`relative w-full ${piece.aspect} overflow-hidden bg-[#111111]`}
                  >
                    {piece.video ? (
                      <VideoTile
                        poster={piece.image}
                        alt={text.alt}
                        webm={piece.video.webm}
                        mp4={piece.video.mp4}
                      />
                    ) : (
                      <Image
                        src={piece.image}
                        alt={text.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className={
                          piece.fit === "contain"
                            ? "object-contain p-2"
                            : "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        }
                      />
                    )}
                  </div>
                  <h3 className="mt-6 font-fraunces font-medium text-[color:var(--color-paper)] text-[1.3rem] md:text-[1.5rem] lg:text-[1.65rem] whitespace-nowrap">
                    {text.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[color:var(--color-ink-soft)] text-[clamp(0.82rem,1.02vw,1rem)] lg:whitespace-nowrap">
                    {text.blurb}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-16 border-t border-[color:var(--color-line)] scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <h2 className="font-fraunces font-medium text-[color:var(--color-paper)] text-[clamp(2.2rem,5vw,4.2rem)] leading-none">
            {home.services.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            {home.services.introBefore}
            <Link href="/branding" className="underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-ink)]">
              {home.services.introLinks[0]}
            </Link>
            ,{" "}
            <Link href="/design" className="underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-ink)]">
              {home.services.introLinks[1]}
            </Link>
            ,{" "}
            <Link href="/content-creation" className="underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-ink)]">
              {home.services.introLinks[2]}
            </Link>
            .
          </p>

          <div className="mt-10">
            {home.services.blocks.map((service, i) => (
              <article
                key={service.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-x-12 lg:gap-y-4 py-10 lg:py-7 border-t border-[color:var(--color-line)]"
              >
                <h3 className="lg:col-span-4 font-fraunces text-3xl md:text-4xl font-medium text-[color:var(--color-paper)]">
                  <Link
                    href={serviceHrefs[i]}
                    className="transition-colors hover:text-[color:var(--color-gold)]"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="lg:col-span-4 text-lg leading-[1.55] text-[color:var(--color-ink-soft)]">
                  {service.body}
                </p>
                <ul className="lg:col-span-4 space-y-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-[color:var(--color-ink-soft)]"
                    >
                      <span aria-hidden className="text-[color:var(--color-gold)]">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="lg:col-span-12">
                  <Link
                    href={serviceHrefs[i]}
                    className="text-[color:var(--color-gold)] underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-ink)]"
                  >
                    {home.services.portfolioLink}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="pt-14 pb-24 md:pt-20 md:pb-36 border-t border-[color:var(--color-line)] scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <h2 className="font-fraunces font-medium text-[color:var(--color-paper)] text-[clamp(2.2rem,5vw,4.2rem)] leading-none">
            {home.about.heading}
          </h2>
          <p className="mt-8 max-w-3xl font-fraunces text-2xl md:text-[2rem] leading-snug text-[color:var(--color-paper)]">
            {home.about.statement}
          </p>

          <div className="dark-band mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--color-line)] border border-[color:var(--color-line)]">
            {home.about.steps.map((step) => (
              <article key={step.title} className="bg-[color:var(--color-surface)] p-8">
                <h3 className="font-fraunces text-xl font-medium text-[color:var(--color-paper)]">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[color:var(--color-ink-soft)]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>

          <dl className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {home.about.stats.map((stat) => (
              <div key={stat.label} className="border-t border-[color:var(--color-line-strong)] pt-6">
                <dd className="font-fraunces text-5xl md:text-6xl font-medium text-[color:var(--color-gold)]">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-sm tracking-[0.14em] uppercase text-[color:var(--color-ink-soft)]">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section aria-label={home.testimonials.ariaLabel} className="py-24 md:py-36 border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <h2 className="font-fraunces font-medium text-[color:var(--color-paper)] text-[clamp(2.2rem,5vw,4.2rem)] leading-none">
            {home.testimonials.heading}
          </h2>

          <div className="dark-band mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-line)] border border-[color:var(--color-line)]">
            {home.testimonials.items.map((t) => (
              <figure key={t.name} className="bg-[color:var(--color-surface)] p-8 md:p-10 flex flex-col">
                <blockquote className="font-fraunces text-xl leading-relaxed text-[color:var(--color-paper)] flex-grow">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 text-sm tracking-[0.18em] uppercase text-[color:var(--color-gold)]">
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-36 border-t border-[color:var(--color-line)] scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-fraunces font-medium text-[color:var(--color-paper)] text-[clamp(2.2rem,5vw,4.2rem)] leading-none">
                {home.contact.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
                {home.contact.body}
              </p>
              <div className="mt-10 space-y-5 text-lg">
                <p>
                  <a
                    href="mailto:info@makeitandmarket.com"
                    className="text-[color:var(--color-ink)] underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-gold-strong)] transition-colors"
                  >
                    info@makeitandmarket.com
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+13476591708"
                    className="text-[color:var(--color-ink)] underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-gold-strong)] transition-colors"
                  >
                    (347) 659 1708
                  </a>
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <EnquiryForm strings={home.contact.form} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
