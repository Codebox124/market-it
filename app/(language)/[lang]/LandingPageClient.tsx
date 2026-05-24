"use client";

import { Loader2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import LatestBlogs from "@/components/home/LatestBlogs";

// --- MOTION ---
const editorial = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

// --- SERVICE → ROUTE / IMAGE MAPPING ---
const visualAssets: Record<string, { image: string; href: string }> = {
  advertising: { image: "/advertising.webp", href: "/marketing/advertising" },
  social_media: { image: "/social-media.jpg", href: "/marketing/social-media" },
  web_app: { image: "/website-design.jpg", href: "/marketing/websites-apps" },
  graphic_design: { image: "/graphic-design.png", href: "/visuals/graphic-design" },
  video_editing: { image: "/video-editing.webp", href: "/visuals/video-editing" },
  animation: { image: "/1.png", href: "/visuals/animation" },
};

// Marquee tokens — just the wordmark, repeated
const marqueePhrases = [
  "Make It & Market",
  "Studio",
  "Make It & Market",
  "New York",
  "Make It & Market",
  "Est. Worldwide",
];

interface LandingPageProps {
  dict: any;
  lang: string;
}

export default function LandingPageClient({ dict, lang }: LandingPageProps) {
  const form = useRef<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  // Horizontal pin-scroll for the WORK section (desktop only).
  // Section is tall (500vh); inside, a sticky 100vh viewport holds the
  // header on top + horizontal cards track. As you scroll vertically,
  // the track translates X from 0 → -194vw, panning all 6 cards into view.
  // After the section ends, normal scroll resumes into the manifesto.
  const workSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: workProgress } = useScroll({
    target: workSectionRef,
    offset: ["start start", "end end"],
  });
  const workTrackX = useTransform(workProgress, [0, 1], ["0vw", "-194vw"]);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm("service_7cevh3y", "template_y9qp8oc", form.current, {
        publicKey: "HemS8Yf--_i_cJRW8",
      })
      .then(
        () => {
          setIsSubmitting(false);
          setFormData({ user_name: "", user_email: "", message: "" });
          alert(dict.contact.alerts.success);
        },
        (error) => {
          setIsSubmitting(false);
          console.error("FAILED...", error.text);
          alert(dict.contact.alerts.error);
        }
      );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const servicesKeys = Object.keys(dict.services_section.items);
  const allServices = servicesKeys.map((key) => {
    const asset = visualAssets[key] || { image: "", href: "#" };
    return { ...dict.services_section.items[key], ...asset, key };
  });

  return (
    <div className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] min-h-screen">
      {/* ============================ HERO ============================ */}
      <section className="noir-grain relative min-h-screen flex flex-col">
        <div className="relative flex-1 flex items-center max-w-[1600px] mx-auto w-full px-6 lg:px-10 pt-40 pb-24">
          <div className="w-full">
            <motion.h1
              variants={editorial}
              custom={0}
              initial="hidden"
              animate="visible"
              className="display-xl text-[color:var(--color-ink)]"
            >
              Make It<br />
              &amp; Market.
            </motion.h1>

            <motion.div
              variants={editorial}
              custom={1}
              initial="hidden"
              animate="visible"
              className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-6xl"
            >
              <p className="md:col-span-6 text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-soft)] font-light">
                {dict.hero.subtitle}
              </p>
              <div className="md:col-span-6 flex flex-wrap items-start md:items-end gap-4 md:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-7 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-accent-ink)] bg-[color:var(--color-ink)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300"
                >
                  Start a project
                </Link>
                <Link
                  href="/marketing"
                  className="inline-flex items-center px-7 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-ink)] border border-[color:var(--color-line-strong)] hover:border-[color:var(--color-ink)] transition-colors duration-300"
                >
                  View the work
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom locale strip */}
        <div className="relative max-w-[1600px] mx-auto w-full px-6 lg:px-10 pb-10">
          <div className="flex items-end justify-between gap-8 pt-8 border-t border-[color:var(--color-line)]">
            <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-ink-muted)]">
              Studio · New York
            </p>
            <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-ink-muted)]">
              MMXXVI
            </p>
          </div>
        </div>
      </section>

      {/* ============================ MARQUEE ============================ */}
      <section className="border-y border-[color:var(--color-line)] py-10 md:py-14 overflow-hidden">
        <div className="marquee">
          <div className="marquee-track">
            {[...marqueePhrases, ...marqueePhrases, ...marqueePhrases, ...marqueePhrases].map((phrase, i) => (
              <span
                key={i}
                className="font-display text-3xl md:text-5xl font-medium tracking-[-0.03em] text-[color:var(--color-ink)]"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ WORK — DESKTOP PINNED HORIZONTAL ============================ */}
      <section
        ref={workSectionRef}
        className="hidden lg:block relative h-[500vh]"
      >
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-[color:var(--color-canvas)]">
          {/* Pinned header */}
          <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-10 pt-32 pb-10 flex-shrink-0">
            <div className="grid grid-cols-12 gap-12 items-end">
              <div className="col-span-3">
                <p className="eyebrow">001 — Practice</p>
              </div>
              <h2 className="col-span-7 display-lg text-[color:var(--color-ink)]">
                Six disciplines.<br />
                One studio.
              </h2>
              <p className="col-span-2 numeral self-end text-right">
                Scroll →
              </p>
            </div>
          </div>

          {/* Horizontal track */}
          <div className="flex-1 flex items-center overflow-hidden">
            <motion.div
              style={{ x: workTrackX }}
              className="flex gap-[4vw] pl-[4vw] pr-[8vw] will-change-transform"
            >
              {allServices.map((item, index) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="group flex-shrink-0 w-[45vw] block"
                >
                  <div className="relative overflow-hidden bg-[color:var(--color-surface)] aspect-[4/3]">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.15] transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                      />
                    )}
                    {/* Legibility scrim — top + bottom, transparent middle */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-canvas)]/55 via-transparent to-[color:var(--color-canvas)]/85 transition-opacity duration-700 group-hover:opacity-70" />

                    {/* Top row: numeral + category */}
                    <div className="absolute top-5 left-6 right-6 flex items-baseline justify-between">
                      <span className="font-display text-2xl font-light text-[color:var(--color-ink)] tracking-tight">
                        0{index + 1}
                      </span>
                      <span className="text-[0.7rem] tracking-[0.22em] uppercase text-[color:var(--color-ink-soft)]">
                        {item.category_label}
                      </span>
                    </div>

                    {/* Bottom row: title + arrow */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                      <h3 className="font-display text-3xl xl:text-5xl font-medium leading-[1] tracking-[-0.03em] text-[color:var(--color-ink)]">
                        {item.title}
                      </h3>
                      <span className="pb-1 text-2xl text-[color:var(--color-ink)] flex-shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                        →
                      </span>
                    </div>
                  </div>

                  {/* Caption below image */}
                  <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-ink-soft)] line-clamp-2 max-w-md">
                    {item.description}
                  </p>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================ WORK — MOBILE/TABLET GRID ============================ */}
      <section className="lg:hidden relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-20 md:mb-28"
          >
            <div className="md:col-span-3">
              <p className="eyebrow">001 — Practice</p>
            </div>
            <h2 className="md:col-span-9 display-lg text-[color:var(--color-ink)]">
              Six disciplines.<br />
              One studio.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
            {allServices.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={item.href} className="group block">
                  <div className="relative overflow-hidden bg-[color:var(--color-surface)] aspect-[4/5]">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.15] transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-canvas)]/55 via-transparent to-[color:var(--color-canvas)]/85 transition-opacity duration-700 group-hover:opacity-70" />

                    {/* Top row: numeral + category */}
                    <div className="absolute top-5 left-5 right-5 flex items-baseline justify-between">
                      <span className="font-display text-2xl font-light text-[color:var(--color-ink)] tracking-tight">
                        0{index + 1}
                      </span>
                      <span className="hidden md:inline text-[0.7rem] tracking-[0.22em] uppercase text-[color:var(--color-ink-soft)]">
                        {item.category_label}
                      </span>
                    </div>

                    {/* Bottom row: title */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="font-display text-3xl md:text-4xl font-medium leading-[1] tracking-[-0.03em] text-[color:var(--color-ink)]">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-ink-soft)] line-clamp-3 max-w-md">
                    {item.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ MANIFESTO ============================ */}
      <section className="relative border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-32 md:py-44">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="md:col-span-3">
              <p className="eyebrow">002 — Studio</p>
            </div>
            <div className="md:col-span-9 max-w-4xl">
              <p className="font-display text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-[-0.025em] text-[color:var(--color-ink)]">
                We build brands the way a craftsman builds anything worth keeping —
                slowly, deliberately, with respect for the people who will live with the result.
              </p>
              <p className="mt-12 text-base leading-relaxed text-[color:var(--color-ink-soft)] max-w-2xl">
                From identity systems to film direction, every project is a study in restraint.
                The goal is never to be loud; it is to be remembered.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section className="relative border-t border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <p className="eyebrow">003 — {dict.contact.label}</p>
              <h2 className="display-lg mt-8 text-[color:var(--color-ink)]">
                {dict.contact.title}
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-[color:var(--color-ink-soft)] max-w-md font-light">
                {dict.contact.subtitle}
              </p>

              <div className="mt-12 pt-8 border-t border-[color:var(--color-line)] space-y-5 text-sm">
                <div>
                  <p className="eyebrow mb-2">Email</p>
                  <a
                    href="mailto:info@makeitandmarket.com"
                    className="text-base text-[color:var(--color-ink)] hover:text-[color:var(--color-ink-soft)] transition-colors"
                  >
                    info@makeitandmarket.com
                  </a>
                </div>
                <div>
                  <p className="eyebrow mb-2">Phone</p>
                  <a
                    href="tel:3476591708"
                    className="text-base text-[color:var(--color-ink)] hover:text-[color:var(--color-ink-soft)] transition-colors"
                  >
                    (347) 659 1708
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <form ref={form} onSubmit={sendEmail} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <FormField
                    label={dict.contact.form.name_label}
                    name="user_name"
                    type="text"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder={dict.contact.form.name_placeholder}
                  />
                  <FormField
                    label={dict.contact.form.email_label}
                    name="user_email"
                    type="email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    placeholder={dict.contact.form.email_placeholder}
                  />
                </div>
                <div>
                  <label className="block eyebrow mb-3">
                    {dict.contact.form.message_label}
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder={dict.contact.form.message_placeholder}
                    className="w-full bg-transparent border-b border-[color:var(--color-line-strong)] focus:border-[color:var(--color-ink)] outline-none py-3 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-muted)] transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-accent-ink)] bg-[color:var(--color-ink)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={14} strokeWidth={1.5} />
                      {dict.contact.form.loading_text}
                    </>
                  ) : (
                    <>{dict.contact.form.submit_button}</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================ JOURNAL ============================ */}
      <section className="border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-28 md:py-40">
          <LatestBlogs lang={lang} />
        </div>
      </section>
    </div>
  );
}

// --- LOCAL FORM FIELD ---
function FormField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block eyebrow mb-3">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-[color:var(--color-line-strong)] focus:border-[color:var(--color-ink)] outline-none py-3 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-muted)] transition-colors duration-300"
      />
    </div>
  );
}
