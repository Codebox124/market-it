"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const works = [
  { src: "/website/website.webp", category: "Website" },
  { src: "/website/website 2.webp", category: "Website" },
  { src: "/website/website 3.webp", category: "Website" },
  { src: "/website/port web RUN.webp", category: "Website" },
  { src: "/website/port website fence.webp", category: "Website" },
  { src: "/website/port website hair.webp", category: "Website" },
  { src: "/website/port website kidz.webp", category: "Website" },
  { src: "/website/port website movies.webp", category: "Website" },
  { src: "/website/portfolio website exopest.webp", category: "Website" },
  { src: "/website/port web expediters.webp", category: "Website" },
  { src: "/website/port web Moses Villani.webp", category: "Website" },
  { src: "/website/caymana.co Landing Page edit.webp", category: "Landing Page" },
  { src: "/website/blog 3.webp", category: "Blog" },
  { src: "/website/shifto 4.webp", category: "App" },
  { src: "/website/app image 3rd & 20 2.webp", category: "App" },
  { src: "/website/ReelFriends (1).webp", category: "App" },
];

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function WebsitesAppsPage() {
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
                Websites &amp; Apps.
              </h1>
              <p className="mt-10 md:mt-12 text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-soft)] font-light max-w-3xl">
                Responsive websites and app development to claim your place in the
                digital space — for business, for pleasure, for a cause. Custom
                builds, landing pages, and platforms shipped end-to-end.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================ PORTFOLIO GRID ============================ */}
      <section className="relative border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {works.map((work, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={i}
                variants={fade}
                className="group relative aspect-[4/3] overflow-hidden bg-[color:var(--color-surface)]"
              >
                <img
                  src={work.src}
                  alt={work.category}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
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
                Build your site, build your app.
              </h2>
              <Link
                href="/contact"
                className="self-start inline-flex items-center px-7 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-accent-ink)] bg-[color:var(--color-ink)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300 whitespace-nowrap"
              >
                Contact the agency
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
