"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm("service_7cevh3y", "template_y9qp8oc", form.current, {
        publicKey: "HemS8Yf--_i_cJRW8",
      })
      .then(
        () => {
          setIsSubmitting(false);
          setFormData({ name: "", email: "", message: "" });
          alert("Message sent. We'll be in touch soon.");
        },
        (error) => {
          setIsSubmitting(false);
          console.error("FAILED...", error.text);
          alert("Failed to send. Please try again later.");
        }
      );
  };

  return (
    <div className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] min-h-screen">
      {/* HERO */}
      <section className="noir-grain relative">
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 pt-36 md:pt-44 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12"
          >
            <div className="md:col-span-3">
              <p className="eyebrow">Contact</p>
            </div>
            <div className="md:col-span-9">
              <h1 className="display-xl text-[color:var(--color-ink)]">
                Let&apos;s make<br />
                something lasting.
              </h1>
              <p className="mt-10 max-w-xl text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-soft)] font-light">
                Have a project in mind? Tell us about it — we&apos;ll respond
                within one business day.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FORM */}
      <section className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Direct lines */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <p className="eyebrow">Direct lines</p>
              <h2 className="display-md mt-8 text-[color:var(--color-ink)]">
                Reach us directly.
              </h2>

              <div className="mt-14 space-y-10 text-sm">
                <div className="pb-6 border-b border-[color:var(--color-line)]">
                  <p className="eyebrow mb-3">Email</p>
                  <a
                    href="mailto:info@makeitandmarket.com"
                    className="text-lg text-[color:var(--color-ink)] hover:text-[color:var(--color-ink-soft)] transition-colors"
                  >
                    info@makeitandmarket.com
                  </a>
                </div>
                <div className="pb-6 border-b border-[color:var(--color-line)]">
                  <p className="eyebrow mb-3">Phone</p>
                  <a
                    href="tel:3476591708"
                    className="text-lg text-[color:var(--color-ink)] hover:text-[color:var(--color-ink-soft)] transition-colors"
                  >
                    (347) 659 1708
                  </a>
                </div>
                <div>
                  <p className="eyebrow mb-3">Response</p>
                  <p className="text-base text-[color:var(--color-ink-soft)]">
                    Within one business day.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="lg:col-span-7"
            >
              <form ref={form} onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <div>
                    <label className="block eyebrow mb-3">Name</label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-[color:var(--color-line-strong)] focus:border-[color:var(--color-ink)] outline-none py-3 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-muted)] transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block eyebrow mb-3">Email</label>
                    <input
                      type="email"
                      name="user_email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      placeholder="email@example.com"
                      className="w-full bg-transparent border-b border-[color:var(--color-line-strong)] focus:border-[color:var(--color-ink)] outline-none py-3 text-base text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-muted)] transition-colors duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block eyebrow mb-3">Project Details</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    placeholder="Tell us about your project, timeline, and goals…"
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
