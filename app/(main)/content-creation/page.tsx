"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const works = [
  { src: "/graphic/3.webp", category: "Graphic" },
  { src: "/animation/1.webp", category: "Animation" },
  { src: "/photo/pic.webp", category: "Photo" },
  { src: "/graphic/4.webp", category: "Graphic" },
  { src: "/animation/4.webp", category: "Animation" },
  { src: "/photo/pic2.webp", category: "Photo" },
  { src: "/graphic/20.webp", category: "Graphic" },
  { src: "/animation/7.webp", category: "Animation" },
  { src: "/photo/pic3.webp", category: "Photo" },
  { src: "/graphic/biz card.webp", category: "Graphic" },
  { src: "/animation/10.webp", category: "Animation" },
  { src: "/photo/pic4.webp", category: "Photo" },
  { src: "/graphic/elon poster.webp", category: "Graphic" },
  { src: "/animation/13.webp", category: "Animation" },
  { src: "/photo/pic5.webp", category: "Photo" },
  { src: "/graphic/banner MICHAEL P.webp", category: "Graphic" },
  { src: "/animation/16.webp", category: "Animation" },
  { src: "/photo/pic6.webp", category: "Photo" },
  { src: "/graphic/Highball-RON_2.webp", category: "Graphic" },
  { src: "/animation/19.webp", category: "Animation" },
  { src: "/photo/pic7.webp", category: "Photo" },
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

export default function ContentCreationPage() {
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
                Content Creation.
              </h1>
              <p className="mt-10 md:mt-12 text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-soft)] font-light max-w-3xl">
                Looking for creative help? Graphic design, video production, animation,
                and photography — original work shaped around your brand, your story,
                and the audience you want to reach.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================ PORTFOLIO GRID ============================ */}
      <section className="relative border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {works.map((work, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                custom={i}
                variants={fade}
                className="group relative aspect-square overflow-hidden bg-[color:var(--color-surface)]"
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
                Have a creative project? Let&apos;s make it.
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
