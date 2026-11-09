import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/home/EnquiryForm";
import VideoTile from "@/components/home/VideoTile";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Make It & Market",
  url: "https://www.makeitandmarket.com/",
  description:
    "Branding, design and content creation studio for mid-size and enterprise clients. Brand identity, graphic design, photography, video, animation and websites.",
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
    src: "/clientScroll/gm-tile.webp",
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
    title: "Brand Identity & 3D",
    image: "/content/logo CS Paris 7.webp",
    alt: "Brand identity and 3D design by Make It & Market",
    blurb:
      "Logos, identity systems and 3D brand work — marks built to be recognised anywhere.",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
  },
  {
    title: "Photography & Retouching",
    image: "/photo/photography-showcase.webp",
    alt: "Photography and retouching by Make It & Market",
    blurb:
      "Photography and retouching, finished to an editorial standard.",
    span: "md:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Editorial & Cover Design",
    image: "/content/book cover 3 KING.webp",
    alt: "Book cover and editorial design by Make It & Market",
    blurb:
      "Book covers and editorial design with typography that earns a second look.",
    fit: "contain",
    span: "md:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Website Design",
    image: "/clientShowcase/website-showcase.webp",
    alt: "Website design by Make It & Market",
    blurb:
      "Custom websites and landing pages — designed and built in-house to convert.",
    fit: "contain",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
  },
  {
    title: "Animation & Motion",
    image: "/animation/animation-showcase.webp",
    alt: "Animation and motion design by Make It & Market",
    blurb:
      "2D and 3D animation — characters, stories and brand films produced in-house.",
    fit: "contain",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
  },
  {
    title: "Campaign & Advertising Design",
    image: "/graphic/4 color sheet joel edit 2.webp",
    alt: "Campaign and advertising design by Make It & Market",
    blurb:
      "Campaign creative for print and digital — built to be read at a glance.",
    fit: "contain",
    span: "md:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Social Media",
    image: "/social/social-showcase.webp",
    alt: "Social media content by Make It & Market",
    blurb:
      "Content and campaigns that keep a brand present, consistent and worth following.",
    span: "md:col-span-5",
    aspect: "aspect-[4/3]",
    fit: "contain",
  },
  {
    title: "Video Production",
    image: "/video/video-showcase.webp",
    alt: "Video production by Make It & Market",
    blurb:
      "Commercials, brand films and social video — shot, edited and finished in-house.",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
    video: { webm: "/video/showcase.webm", mp4: "/video/showcase.mp4" },
  },
];

const services = [
  {
    title: "Brand Identity",
    body: "Logos, identity systems and brand guidelines that give a company a face worth remembering — and the rules to keep it consistent everywhere it appears.",
    deliverables: [
      "Logo & identity systems",
      "Brand guidelines",
      "Naming & messaging",
      "Art direction",
    ],
  },
  {
    title: "Design",
    body: "Graphic design across print and digital: campaigns, catalogs, packaging, presentations and editorial — designed to be taken seriously.",
    deliverables: [
      "Campaign & advertising design",
      "Print, catalogs & packaging",
      "Presentations & documents",
      "Editorial & covers",
    ],
  },
  {
    title: "Content Creation",
    body: "Photography, video and animation produced in-house — the content engines that keep a brand visible, current and credible.",
    deliverables: [
      "Photography & retouching",
      "Video production & editing",
      "2D & 3D animation",
      "Social content",
    ],
  },
  {
    title: "Websites",
    body: "Websites and digital experiences designed and built to convert — fast, elegant, and unmistakably yours.",
    deliverables: [
      "Website design & build",
      "Landing pages",
      "E-commerce",
      "Care & optimisation",
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
  { value: "4", label: "Disciplines under one roof" },
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

      {/* HERO */}
      <section className="relative pt-36 md:pt-44 pb-16 md:pb-20 overflow-hidden">
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
                src="/content/logo CS Paris 7.webp"
                alt="Brand identity design by Make It & Market"
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

      {/* MAIN REEL — the studio showreel that headlined the previous homepage */}
      <section aria-label="Make It & Market showreel">
        <video
          className="block w-full aspect-video object-cover"
          poster="/video/main-reel-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/video/main-reel.webm" type="video/webm" />
          <source src="/video/main-reel.mp4" type="video/mp4" />
        </video>
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
                className="relative h-24 md:h-32 bg-[color:var(--color-surface)] flex items-center justify-center"
              >
                {logo.disc ? (
                  <div className="relative h-[88%] aspect-square rounded-full bg-white overflow-hidden">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="(max-width: 1024px) 33vw, 20vw"
                      className="object-contain p-2"
                    />
                  </div>
                ) : (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(max-width: 1024px) 33vw, 20vw"
                    className={`object-contain p-3 md:p-4${logo.invert ? " invert" : ""}`}
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
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
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
                          ? "object-contain p-4"
                          : "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      }
                    />
                  )}
                </div>
                <h3 className="mt-6 font-fraunces text-2xl md:text-[1.7rem] font-medium text-[color:var(--color-paper)]">
                  {piece.title}
                </h3>
                <p className="mt-2 max-w-xl leading-relaxed text-[color:var(--color-ink-soft)]">
                  {piece.blurb}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-36 border-t border-[color:var(--color-line)] scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <h2 className="font-fraunces font-medium text-[color:var(--color-paper)] text-[clamp(2.2rem,5vw,4.2rem)] leading-none">
            What We Do
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            Four disciplines, one standard: work that holds its own in any
            boardroom, on any screen. Explore each in depth —{" "}
            <Link href="/marketing" className="underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-ink)]">
              marketing
            </Link>
            ,{" "}
            <Link href="/content-creation" className="underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-ink)]">
              content creation
            </Link>
            , and{" "}
            <Link href="/websites-apps" className="underline decoration-[color:var(--color-gold)] underline-offset-4 hover:text-[color:var(--color-ink)]">
              websites &amp; apps
            </Link>
            .
          </p>

          <div className="mt-14">
            {services.map((service) => (
              <article
                key={service.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-12 border-t border-[color:var(--color-line)]"
              >
                <h3 className="lg:col-span-4 font-fraunces text-3xl md:text-4xl font-medium text-[color:var(--color-paper)]">
                  {service.title}
                </h3>
                <p className="lg:col-span-4 text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
                  {service.body}
                </p>
                <ul className="lg:col-span-4 space-y-2.5">
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-36 border-t border-[color:var(--color-line)] scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <h2 className="font-fraunces font-medium text-[color:var(--color-paper)] text-[clamp(2.2rem,5vw,4.2rem)] leading-none">
            About
          </h2>
          <p className="mt-8 max-w-3xl font-fraunces text-2xl md:text-[2rem] leading-snug text-[color:var(--color-paper)]">
            Make It &amp; Market is a branding, design and content creation studio
            based in New York. We partner with mid-size and enterprise clients
            who need senior-level creative without agency bloat — direct access
            to the people doing the work, and a standard of finish that survives
            scrutiny.
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
            Client Voices
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
                Start a Conversation
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
