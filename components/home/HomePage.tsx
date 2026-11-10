import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/home/EnquiryForm";
import VideoTile from "@/components/home/VideoTile";
import ReelVideo from "@/components/home/ReelVideo";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Make It & Market",
  url: "https://www.makeitandmarket.com/",
  description:
    "Branding, design and content creation studio for a wide array of businesses and entrepreneurs. Brand identity, graphic design, photography, video, animation and websites.",
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

const clientLogos: { src: string; alt: string; invert?: boolean; disc?: boolean }[] = [
  {
    src: "/clientScroll/exopest-tile.webp",
    alt: "EXOPEST Pest Control — brand identity designed by Make It & Market",
  },
  {
    src: "/clientScroll/de-zavala-tile.webp",
    alt: "De Zavala Elementary — logo designed by Make It & Market",
  },
  {
    src: "/clientScroll/builditect-tile.webp",
    alt: "Builditect Roofing — logo designed by Make It & Market",
    invert: true,
  },
  {
    src: "/clientScroll/terra-tile.webp",
    alt: "Terra Design Group — logo designed by Make It & Market",
    disc: true,
  },
  {
    src: "/clientScroll/popcorn-tile.webp",
    alt: "Popcorn TV — logo designed by Make It & Market",
  },
  {
    src: "/clientScroll/gm-tile-v3.webp",
    alt: "Glow Minds Agency — logo designed by Make It & Market",
  },
  {
    src: "/clientScroll/hot-or-not-tile.webp",
    alt: "Hot or Not — logo designed by Make It & Market",
  },
  {
    src: "/clientScroll/reefnreem-tile.webp",
    alt: "ReefNReem Films — logo designed by Make It & Market",
    invert: true,
  },
  {
    src: "/clientScroll/arc-tile.webp",
    alt: "ARC — logo designed by Make It & Market",
  },
  {
    src: "/clientScroll/northeast-tile.webp",
    alt: "Northeast Hydraulics & Machine — logo designed by Make It & Market",
  },
  {
    src: "/clientScroll/olivers-tile.webp",
    alt: "Oliver's Tacos al Carbon — logo designed by Make It & Market",
  },
  {
    src: "/clientScroll/forever-tile.webp",
    alt: "The Forever Runway — logo designed by Make It & Market",
    disc: true,
  },
  {
    src: "/clientScroll/moses-tile.webp",
    alt: "Moses Villani — logo designed by Make It & Market",
  },
  {
    src: "/clientScroll/kids-dynasty-tile.webp",
    alt: "Kids Dynasty Daycare — logo designed by Make It & Market",
    disc: true,
  },
  {
    src: "/clientScroll/laara-tile.webp",
    alt: "Laara Raynier Mastercutter Academy — logo designed by Make It & Market",
    invert: true,
  },
];

const work: {
  title: string;
  image: string;
  alt: string;
  blurb: string;
  span: string;
  aspect: string;
  fit?: "cover" | "contain";
  video?: { webm: string; mp4: string };
}[] = [
  {
    title: "Video Production",
    image: "/video/video-showcase-v6.webp",
    alt: "Video production by Make It & Market",
    blurb:
      "Commercials, brand films and social video — shot, edited and finished in-house.",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
    video: { webm: "/video/showcase-v2.webm", mp4: "/video/showcase-v2.mp4" },
  },
  {
    title: "App & Website Design",
    image: "/clientShowcase/website-showcase-v3.webp",
    alt: "App and website design by Make It & Market",
    blurb:
      "Custom websites, apps and landing pages — designed and built to convert.",
    fit: "contain",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Advertising & Campaign Design",
    image: "/graphic/strategy-showcase-v2.webp",
    alt: "Advertising and campaign design by Make It & Market",
    blurb:
      "Campaign creative for print and digital — built to be read at a glance.",
    fit: "contain",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Social Media",
    image: "/social/social-showcase-v4.webp",
    alt: "Social media content by Make It & Market",
    blurb:
      "Content and campaigns that keep a brand present, consistent, worth following.",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
    fit: "contain",
  },
  {
    title: "Branding & Identity",
    image: "/content/branding-showcase-v3.webp",
    alt: "Branding and identity design by Make It & Market",
    blurb:
      "Logos and identity systems — marks built to be recognised anywhere.",
    fit: "contain",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Animation & Motion",
    image: "/animation/animation-showcase-v2.webp",
    alt: "Animation and motion design by Make It & Market",
    blurb:
      "2D and 3D animation — characters, stories and brand films produced in-house.",
    fit: "contain",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Presentations",
    image: "/content/presentations-showcase-v9.webp",
    alt: "Presentation design by Make It & Market",
    blurb:
      "Pitch decks and presentations — designed to hold a room and land the point.",
    fit: "contain",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Documents",
    image: "/content/documents-showcase-v3.webp",
    alt: "Document design by Make It & Market",
    blurb:
      "Brochures, reports and documents — designed, typeset and print-ready.",
    fit: "contain",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
  },
  {
    title: "3D Modeling",
    image: "/content/3d-showcase-v2.webp",
    alt: "3D modeling by Make It & Market",
    blurb:
      "Objects, products and brand worlds — modelled and rendered in 3D.",
    fit: "contain",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Cover Art & Book Design",
    image: "/content/cover-art-spread.webp",
    alt: "Book cover design, front and back, by Make It & Market",
    blurb:
      "Cover art and book design with typography that earns a second look.",
    fit: "contain",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Photography & Retouching",
    image: "/photo/photography-showcase-v4.webp",
    alt: "Photography by Make It & Market",
    blurb:
      "Photography shot, retouched and finished to an editorial standard.",
    fit: "contain",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Drawing & Sketch Artwork",
    image: "/content/drawing-sketch-showcase-v4.webp",
    alt: "Drawing and sketch artwork by Make It & Market",
    blurb:
      "Hand-drawn artwork and sketches — concepts developed in pencil and ink.",
    fit: "contain",
    span: "md:col-span-6",
    aspect: "aspect-[4/3]",
  },
];

const services = [
  {
    title: "Branding",
    href: "/branding",
    body: "Logo design, brand messaging and identity systems that give a business a face worth remembering — carried through advertising campaigns, websites and apps, with SEO and ranking help so the brand gets found, not just seen.",
    deliverables: [
      "Logo & messaging",
      "Campaign & advertising design",
      "Websites & apps",
      "SEO & ranking help",
    ],
  },
  {
    title: "Design",
    href: "/design",
    body: "Graphic design across print and product: flyers, business cards and menus; clothing, products and packaging; brochures, presentations and documents; posters, books and cover art — designed to be taken seriously.",
    deliverables: [
      "Flyers, business cards & menus",
      "Clothing, products & packaging",
      "Brochures, presentations & documents",
      "Posters, books & cover art",
    ],
  },
  {
    title: "Content Creation",
    href: "/content-creation",
    body: "Video production and editing, 2D/3D animation and motion graphics, drawings and digital artwork, photography and retouching — produced in-house to keep a brand visible, current and credible.",
    deliverables: [
      "Video production & editing",
      "2D/3D animation & motion graphics",
      "Drawings & digital artwork",
      "Photography & retouching",
    ],
  },
];

const processSteps = [
  {
    title: "Discover",
    body: "We learn the business, the audience and the competitive field before a single pixel moves.",
  },
  {
    title: "Define",
    body: "Strategy and creative direction, agreed up front — so the work that follows has a spine.",
  },
  {
    title: "Design",
    body: "Identity, design and content produced iteratively, with senior eyes on every deliverable.",
  },
  {
    title: "Deliver",
    body: "Launched, documented and supported — assets, guidelines and files your team can run with.",
  },
];

const stats = [
  { value: "500+", label: "Portfolio pieces produced" },
  { value: "40+", label: "Brands & organisations served" },
  { value: "3", label: "Disciplines under one roof" },
];

const testimonials = [
  {
    quote:
      "Thank you for your patience and for being meticulous with my campaign.",
    name: "Sherri S.",
  },
  {
    quote:
      "First of all, thank you very much for your outstanding services provided to me and within a timely manner.",
    name: "Joseph A.",
  },
  {
    quote: "Great results. Literally had me like wow over here!",
    name: "Kajuan R.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* MAIN REEL — leads the page; the fixed nav floats over it */}
      <section aria-label="Make It & Market showreel">
        <ReelVideo />
      </section>

      {/* HERO */}
      <section className="relative pt-20 md:pt-24 pb-16 md:pb-20 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <p className="eyebrow !text-[color:var(--color-gold)] mb-8">
            Branding · Design · Content Creation
          </p>
          <h1 className="font-fraunces font-medium text-[color:var(--color-paper)] text-[clamp(2.9rem,7.5vw,6.8rem)] leading-[1.02] max-w-6xl">
            We build brands the market{" "}
            <em className="italic text-[color:var(--color-gold)]">remembers.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            Make It &amp; Market is a branding, design and content creation studio
            for companies that refuse to blend in. Identity, design, film and
            digital — conceived and produced under one roof, to an enterprise
            standard.
          </p>
          <div className="mt-10">
            <a
              href="#work"
              className="inline-flex items-center px-8 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[#0b0b0d] bg-[color:var(--color-gold)] hover:bg-[color:var(--color-gold-strong)] transition-colors duration-300"
            >
              See the Work
            </a>
          </div>

          <figure className="mt-16 md:mt-20">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[color:var(--color-surface)]">
              <Image
                src="/content/hero-timessquare.webp"
                alt="Times Square at night, New York City"
                fill
                priority
                sizes="(max-width: 1600px) 100vw, 1600px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-sm text-[color:var(--color-ink-muted)]">
              Branding, design and content creation — under one roof.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section aria-label="Selected clients" className="py-16 md:py-24 border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <h2 className="text-center text-[0.7rem] font-medium tracking-[0.32em] uppercase text-[color:var(--color-ink-muted)]">
            Trusted by ambitious brands
          </h2>
          <div className="mt-10 grid grid-cols-3 lg:grid-cols-5 gap-px bg-[color:var(--color-line)] border border-[color:var(--color-line)]">
            {clientLogos.map((logo) => (
              <div
                key={logo.src}
                className="relative h-24 md:h-36 bg-[color:var(--color-surface)] flex items-center justify-center"
              >
                {logo.disc ? (
                  <div className="relative h-[94%] aspect-square rounded-full bg-white overflow-hidden">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="(max-width: 1024px) 33vw, 20vw"
                      className="object-contain p-1.5"
                    />
                  </div>
                ) : (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
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
            Selected Work
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            A selection from the portfolio — identity systems, editorial design,
            photography, film and digital experiences, produced for clients
            across healthcare, hospitality, publishing, fashion and the arts.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-16 md:gap-x-8 md:gap-y-24">
            {work.map((piece) => (
              <article key={piece.title} className={`${piece.span} group`}>
                <div
                  className={`relative w-full ${piece.aspect} overflow-hidden bg-[color:var(--color-surface)]`}
                >
                  {piece.video ? (
                    <VideoTile
                      poster={piece.image}
                      alt={piece.alt}
                      webm={piece.video.webm}
                      mp4={piece.video.mp4}
                    />
                  ) : (
                    <Image
                      src={piece.image}
                    alt={piece.alt}
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
                  {piece.title}
                </h3>
                <p className="mt-2 leading-relaxed text-[color:var(--color-ink-soft)] text-[clamp(0.82rem,1.02vw,1rem)] lg:whitespace-nowrap">
                  {piece.blurb}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-16 border-t border-[color:var(--color-line)] scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <h2 className="font-fraunces font-medium text-[color:var(--color-paper)] text-[clamp(2.2rem,5vw,4.2rem)] leading-none">
            What We Do
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            Three disciplines, one standard: work that holds its own in any
            boardroom, on any screen. Explore each in depth —{" "}
            <Link href="/branding" className="underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-ink)]">
              branding
            </Link>
            ,{" "}
            <Link href="/design" className="underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-ink)]">
              design
            </Link>
            ,{" "}
            <Link href="/content-creation" className="underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-ink)]">
              content creation
            </Link>
            .
          </p>

          <div className="mt-10">
            {services.map((service) => (
              <article
                key={service.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-x-12 lg:gap-y-4 py-10 lg:py-7 border-t border-[color:var(--color-line)]"
              >
                <h3 className="lg:col-span-4 font-fraunces text-3xl md:text-4xl font-medium text-[color:var(--color-paper)]">
                  <Link
                    href={service.href}
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
                    href={service.href}
                    className="text-[color:var(--color-gold)] underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-ink)]"
                  >
                    See the full portfolio →
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
            About
          </h2>
          <p className="mt-8 max-w-3xl font-fraunces text-2xl md:text-[2rem] leading-snug text-[color:var(--color-paper)]">
            Make It &amp; Market is a branding, design and content creation studio
            based in New York. We partner with a wide array of businesses and
            entrepreneurs, giving them senior-level creative assistance
            without agency bloat: direct access to the people doing the work,
            and a standard of
            finish that survives scrutiny.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--color-line)] border border-[color:var(--color-line)]">
            {processSteps.map((step) => (
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
            {stats.map((stat) => (
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

      {/* CLIENT VOICES */}
      <section aria-label="Client testimonials" className="py-24 md:py-36 border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <h2 className="font-fraunces font-medium text-[color:var(--color-paper)] text-[clamp(2.2rem,5vw,4.2rem)] leading-none">
            Client Testimonials
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-line)] border border-[color:var(--color-line)]">
            {testimonials.map((t) => (
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
                Contact
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
                Tell us about the brand you&apos;re building. We respond to every
                serious inquiry within one business day.
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
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
