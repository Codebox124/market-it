"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Work = { src: string; category: string; type?: "image" | "video" };

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: (i % 12) * 0.05,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function MarketingClient({ works }: { works: Work[] }) {
  return (
    <div className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] min-h-screen">
      {/* ============================ HERO ============================ */}
      <section className="relative pt-40 md:pt-48 pb-20 md:pb-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end"
          >
            <div className="md:col-span-3">
              <p className="eyebrow">Service</p>
            </div>
            <div className="md:col-span-9 max-w-5xl">
              <h1 className="display-lg text-[color:var(--color-ink)]">
                Marketing.
              </h1>
              <p className="mt-10 md:mt-12 text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-soft)] font-light max-w-3xl">
                Advertising campaigns, flyer distribution, and social media outreach
                that move the needle for entrepreneurs, companies, and causes — from
                local print to digital reach, online to on the ground.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================ PORTFOLIO GRID ============================ */}
      <section className="relative border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
            {works.map((work, i) => (
              <motion.div
                key={work.src}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={i}
                variants={fade}
                className="group relative aspect-square overflow-hidden bg-[color:var(--color-surface)]"
              >
                {work.type === "video" ? (
                  <video
                    src={work.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <img
                    src={work.src}
                    alt={work.category}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-white/90">
                    {work.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="relative border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-28 md:py-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-3">
              <p className="eyebrow">Next</p>
            </div>
            <div className="md:col-span-9 max-w-4xl flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              <h2 className="display-md text-[color:var(--color-ink)]">
                Start a marketing campaign.
              </h2>
              <Link
                href="/contact"
                className="self-start inline-flex items-center px-7 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-accent-ink)] bg-[color:var(--color-ink)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300 whitespace-nowrap"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
