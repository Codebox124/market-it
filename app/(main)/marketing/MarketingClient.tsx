"use client";

import BackButton from "@/components/Button";
import { motion } from "framer-motion";
import Link from "next/link";

const marketingPortfolio = [
  {
    title: "Websites & Apps",
    slug: "websites-apps",
    image: "/website-design.jpg",
    description:
      "User-friendly, custom websites and apps for portfolios, awareness, commerce, or blogging.",
    discipline: "Product · Web · Build",
  },
  {
    title: "Advertising",
    slug: "advertising",
    image: "/advertising.webp",
    description:
      "Implementing campaigns that locate and attract your prospective customers or supporters.",
    discipline: "Strategy · Campaign · Media",
  },
  {
    title: "Social Media",
    slug: "social-media",
    image: "/social-media.jpg",
    description:
      "Providing all-encompassing account management, outreach, content creation, and growth.",
    discipline: "Content · Community · Growth",
  },
  {
    title: "Flyer Distribution",
    slug: "flyer-distribution",
    image: "/flyer.jpg",
    description:
      "Focused offline marketing to reach people in the real world, both locally and globally.",
    discipline: "Print · Field · Outreach",
  },
];

export default function MarketingClient() {
  return (
    <div className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] min-h-screen">
      <BackButton />

      {/* HERO */}
      <section className="noir-grain relative">
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 pt-36 md:pt-44 pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-16"
          >
            <div className="md:col-span-3">
              <p className="eyebrow">Portfolio</p>
            </div>
            <div className="md:col-span-9">
              <h1 className="display-xl text-[color:var(--color-ink)]">
                Marketing<br />
                practice.
              </h1>
              <p className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-soft)] font-light">
                Custom marketing services that help businesses, brands, and people
                build credibility, attention, and engagement.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <div className="space-y-32 md:space-y-44">
            {marketingPortfolio.map((item, index) => {
              const reverse = index % 2 === 1;
              return (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end"
                >
                  <div
                    className={`md:col-span-7 ${reverse ? "md:col-start-6 md:order-2" : ""}`}
                  >
                    <Link href={`/marketing/${item.slug}`} className="group block">
                      <div className="relative overflow-hidden bg-[color:var(--color-surface)] aspect-[4/3]">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover grayscale-[0.15] transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
                        />
                      </div>
                    </Link>
                  </div>
                  <div
                    className={`md:col-span-5 ${reverse ? "md:col-start-1 md:row-start-1 md:order-1" : ""}`}
                  >
                    <div className="flex items-baseline justify-between mb-8 pb-6 border-b border-[color:var(--color-line)]">
                      <span className="numeral-lg">0{index + 1}</span>
                      <span className="numeral">{item.discipline}</span>
                    </div>
                    <Link href={`/marketing/${item.slug}`} className="group block">
                      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-[1] tracking-[-0.03em] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-ink-soft)] transition-colors duration-500">
                        {item.title}
                      </h2>
                      <p className="mt-6 text-base leading-relaxed text-[color:var(--color-ink-soft)] max-w-md">
                        {item.description}
                      </p>
                      <span className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)] group-hover:text-[color:var(--color-ink)] transition-colors duration-300">
                        View practice
                        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-32 md:mt-44 pt-16 border-t border-[color:var(--color-line)] flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          >
            <h3 className="display-md text-[color:var(--color-ink)] max-w-2xl">
              Have a vision<br />in mind?
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-accent-ink)] bg-[color:var(--color-ink)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300"
            >
              Start a conversation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
