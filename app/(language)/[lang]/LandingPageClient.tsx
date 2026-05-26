"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";

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

// Marquee — neutral wordmark loop (no "Studio")
const marqueePhrases = [
  "Make It & Market",
  "New York",
  "Make It & Market",
  "Marketing Agency",
  "Make It & Market",
  "Worldwide",
];

// Placeholder client/affiliate names — REPLACE WITH REAL LOGO ASSETS WHEN CLIENT SUPPLIES
const clientPlaceholders = [
  "Alpha & Co.",
  "Brighton",
  "Form Group",
  "Meridian",
  "Northgate",
  "Solace",
  "Trace",
  "Vega Group",
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

  return (
    <div className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] min-h-screen">
      {/* ============================ HERO ============================ */}
      <section className="noir-grain relative min-h-screen flex flex-col overflow-hidden">
        {/* Background video — drop /public/logo.mp4 in. Until then this is invisible. */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/upscaledLogo.png"
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          aria-hidden
        >
          <source src="/logo.webm" type="video/webm" />
          <source src="/logo.mp4" type="video/mp4" />
        </video>

        {/* Legibility scrim — darkens top + bottom edges, lets midtones breathe */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[color:var(--color-canvas)]/60 via-[color:var(--color-canvas)]/20 to-[color:var(--color-canvas)]/90" />

        <div className="relative z-10 flex-1 flex items-center max-w-[1600px] mx-auto w-full px-6 lg:px-10 pt-40 pb-24">
          <div className="w-full">
            <motion.div
              variants={editorial}
              custom={0}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              <img
                src="/upscaledLogo.png"
                alt="Make It & Market"
                className="w-full max-w-[640px] md:max-w-[760px] h-auto object-contain"
              />
            </motion.div>

            <motion.div
              variants={editorial}
              custom={1}
              initial="hidden"
              animate="visible"
              className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 max-w-6xl"
            >
              <p className="md:col-span-7 text-lg md:text-2xl leading-relaxed text-[color:var(--color-ink-soft)] font-light">
                Versatile marketing solutions for entrepreneurs, companies and causes.
              </p>
              <div className="md:col-span-5 flex flex-wrap items-start md:items-end gap-4 md:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-7 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-accent-ink)] bg-[color:var(--color-ink)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300"
                >
                  Start a campaign
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom locale strip */}
        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 lg:px-10 pb-10">
          <div className="flex items-end justify-between gap-8 pt-8 border-t border-[color:var(--color-line)]">
            <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-ink-muted)]">
              New York · Worldwide
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

      {/* ============================ ABOUT ============================ */}
      <section className="relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-32 md:py-44">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="md:col-span-3">
              <p className="eyebrow">001 — About</p>
            </div>
            <div className="md:col-span-9 max-w-4xl">
              <p className="font-display text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-[-0.025em] text-[color:var(--color-ink)]">
                Make It &amp; Market is a marketing agency that offers effective advertising
                and outreach services. Whether it&apos;s Google, social media, email blasts,
                mass text messages, billboards, commercials, or flyer distribution — we&apos;ll
                get you closer to your goal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================ OUR AFFILIATES & CLIENTS ============================ */}
      {/* No pin-scroll — clients render as a continuous marquee so the page
          flows without sticking. Replace placeholders with real CLIENT logos
          when Carl supplies the folder. */}
      <section className="relative border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 pt-24 md:pt-32 pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end"
          >
            <div className="md:col-span-3">
              <p className="eyebrow">002 — Trusted by</p>
            </div>
            <h2 className="md:col-span-9 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1] tracking-[-0.03em] text-[color:var(--color-ink)] md:whitespace-nowrap">
              Our affiliates &amp; clients.
            </h2>
          </motion.div>
        </div>

        {/* Logo marquee — continuous horizontal scroll, never pins */}
        <div className="overflow-hidden border-y border-[color:var(--color-line)] py-10 md:py-14 bg-[color:var(--color-surface)]">
          <div className="marquee">
            <div className="marquee-track">
              {[...clientPlaceholders, ...clientPlaceholders, ...clientPlaceholders, ...clientPlaceholders].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center min-w-[16rem] md:min-w-[20rem] px-6"
                >
                  <span className="font-display text-2xl md:text-4xl font-medium tracking-[-0.025em] text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] transition-colors duration-300 whitespace-nowrap">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second row marching opposite direction */}
        <div className="overflow-hidden border-b border-[color:var(--color-line)] py-10 md:py-14">
          <div className="marquee">
            <div
              className="marquee-track"
              style={{ animationDirection: "reverse", animationDuration: "70s" }}
            >
              {[...clientPlaceholders.slice().reverse(), ...clientPlaceholders.slice().reverse(), ...clientPlaceholders.slice().reverse(), ...clientPlaceholders.slice().reverse()].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center min-w-[16rem] md:min-w-[20rem] px-6"
                >
                  <span className="font-display text-2xl md:text-4xl font-medium tracking-[-0.025em] text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] transition-colors duration-300 whitespace-nowrap">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FEATURE REEL ============================ */}
      {/* Full-bleed second video — drops into /public/reel.mp4 (optional /public/reel.webm).
          Falls back to /hero.jpg poster while file is missing. */}
      <section className="relative border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 pt-28 md:pt-36 pb-8 md:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-10 md:mb-14">
            <div className="md:col-span-3">
              <p className="eyebrow">003 — In motion</p>
            </div>
            <h2 className="md:col-span-9 display-lg text-[color:var(--color-ink)]">
              The agency,<br />in motion.
            </h2>
          </div>
        </div>
        <div className="relative w-full aspect-video bg-[color:var(--color-surface)] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/reel.webm" type="video/webm" />
            <source src="/reel.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section className="relative border-t border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-16 md:mb-20"
          >
            <div className="md:col-span-3">
              <p className="eyebrow">004 — Contact us</p>
            </div>
            <h2 className="md:col-span-9 display-lg text-[color:var(--color-ink)]">
              Contact us.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Direct lines */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <p className="text-lg leading-relaxed text-[color:var(--color-ink-soft)] max-w-md font-light">
                Tell us about your campaign, and we&apos;ll respond within one business day.
              </p>

              <div className="mt-12 pt-8 border-t border-[color:var(--color-line)] space-y-6 text-sm">
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

            {/* Form — boxed for legibility */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <form
                ref={form}
                onSubmit={sendEmail}
                className="border border-[color:var(--color-line-strong)] bg-[color:var(--color-canvas)] p-8 md:p-12 space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Name"
                    name="user_name"
                    type="text"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                  <FormField
                    label="Email"
                    name="user_email"
                    type="email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block eyebrow mb-3 text-[color:var(--color-ink)]">
                    Campaign details
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about your campaign…"
                    className="w-full bg-transparent border border-[color:var(--color-line-strong)] focus:border-[color:var(--color-ink)] outline-none px-4 py-3 text-base text-white placeholder:text-neutral-400 transition-colors duration-300 resize-none"
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
                      Sending…
                    </>
                  ) : (
                    <>Send message</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- LOCAL FORM FIELD (boxed) ---
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
      <label className="block eyebrow mb-3 text-[color:var(--color-ink)]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full bg-transparent border border-[color:var(--color-line-strong)] focus:border-[color:var(--color-ink)] outline-none px-4 py-3 text-base text-white placeholder:text-neutral-400 transition-colors duration-300"
      />
    </div>
  );
}
