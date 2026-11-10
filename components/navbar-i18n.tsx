"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import type { HomeStrings } from "@/components/home/homeStrings";

export default function NavbarI18n({
  lang,
  strings,
}: {
  lang: string;
  strings: HomeStrings["nav"];
}) {
  const navItems = [
    { name: strings.work, href: `/${lang}#work` },
    { name: strings.services, href: `/${lang}#services` },
    { name: strings.about, href: `/${lang}#about` },
  ];
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,border,padding] duration-500 ${
        scrolled || isMobileOpen
          ? "bg-[color:var(--color-canvas)]/85 backdrop-blur-xl border-b border-[color:var(--color-line)] py-3"
          : "bg-gradient-to-b from-black/55 via-black/25 to-transparent py-5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center">
          {/* Wordmark */}
          <Link
            href={`/${lang}`}
            className={`font-fraunces text-lg md:text-xl font-medium tracking-tight [text-shadow:0_1px_12px_rgba(0,0,0,0.65)] ${scrolled || isMobileOpen ? "text-[color:var(--color-paper)]" : "text-[#f4f1ea]"}`}
          >
            Make It <span className="text-[color:var(--color-gold)]">&amp;</span> Market
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm tracking-[0.18em] uppercase font-medium [text-shadow:0_1px_12px_rgba(0,0,0,0.65)] hover:text-[color:var(--color-gold-strong)] transition-colors duration-300 ${scrolled || isMobileOpen ? "text-[color:var(--color-paper)]" : "text-[#f4f1ea]"}`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={`/${lang}#contact`}
              className="ml-4 inline-flex items-center px-5 py-2.5 text-sm tracking-[0.18em] uppercase font-medium text-[#0b0b0d] bg-[color:var(--color-gold)] hover:bg-[color:var(--color-gold-strong)] transition-colors duration-300"
            >
              {strings.contact}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`lg:hidden p-2 transition-colors duration-200 ${scrolled || isMobileOpen ? "text-[color:var(--color-ink)]" : "text-[#f4f1ea]"}`}
            aria-label={strings.toggleMenu}
          >
            <AnimatePresence mode="wait">
              {isMobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-[color:var(--color-line)]">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="block py-3 text-sm tracking-[0.18em] uppercase text-[color:var(--color-ink)]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${lang}#contact`}
                  onClick={() => setIsMobileOpen(false)}
                  className="mt-6 inline-flex w-full items-center justify-center px-5 py-3.5 text-xs tracking-[0.18em] uppercase font-medium text-[#0b0b0d] bg-[color:var(--color-gold)] hover:bg-[color:var(--color-gold-strong)] transition-colors duration-300"
                >
                  {strings.contact}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
