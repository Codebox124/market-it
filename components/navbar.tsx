"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Work", href: "/marketing" },
  { name: "Services", href: "#" },
  { name: "Journal", href: "/en/blog" },
  { name: "Pay", href: "/booking" },
  { name: "Contact", href: "/contact" },
];

const serviceItems = [
  { name: "Graphic Design", href: "/visuals/graphic-design" },
  { name: "Video Editing", href: "/visuals/video-editing" },
  { name: "Photo Editing", href: "/visuals/photo-editing" },
  { name: "Animation", href: "/visuals/animation" },
  { name: "Websites & Apps", href: "/marketing/websites-apps" },
  { name: "Advertising", href: "/marketing/advertising" },
  { name: "Social Media", href: "/marketing/social-media" },
  { name: "Flyer Distribution", href: "/marketing/flyer-distribution" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesHover, setIsServicesHover] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openServices = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsServicesHover(true);
  };

  const closeServices = () => {
    hoverTimeout.current = setTimeout(() => setIsServicesHover(false), 200);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,border,padding] duration-500 ${
        scrolled || isMobileOpen
          ? "bg-[color:var(--color-canvas)]/85 backdrop-blur-xl border-b border-[color:var(--color-line)] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center">
          {/* Wordmark — bold all-caps, single weight */}
          <Link
            href="/"
            className="group select-none"
            aria-label="Make It & Market — home"
          >
            <span className="text-[0.72rem] tracking-[0.32em] uppercase font-semibold text-[color:var(--color-ink)]">
              Make It &amp; Market
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href !== "#" &&
                (pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href)));

              if (item.name === "Services") {
                const servicesActive =
                  pathname.startsWith("/visuals") ||
                  pathname.startsWith("/marketing");
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServices}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs tracking-[0.18em] uppercase transition-colors duration-300 ${
                        servicesActive || isServicesHover
                          ? "text-[color:var(--color-ink)]"
                          : "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${
                          isServicesHover ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>

                    <AnimatePresence>
                      {isServicesHover && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-0 top-full pt-3 w-[280px]"
                        >
                          <div className="bg-[color:var(--color-surface)] border border-[color:var(--color-line)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] py-3">
                            {serviceItems.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="block px-5 py-2.5 text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)] hover:bg-[color:var(--color-surface-muted)] transition-colors duration-200"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-xs tracking-[0.18em] uppercase transition-colors duration-300 ${
                    isActive
                      ? "text-[color:var(--color-ink)]"
                      : "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right side: CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-[color:var(--color-accent-ink)] bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300"
            >
              Let&apos;s Talk
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] transition-colors duration-200"
              aria-label="Toggle menu"
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
                  {navItems.map((item) => {
                    if (item.name === "Services") {
                      return (
                        <li key={item.name}>
                          <button
                            onClick={() =>
                              setIsMobileServicesOpen(!isMobileServicesOpen)
                            }
                            className="w-full flex items-center justify-between py-3 text-sm tracking-[0.18em] uppercase text-[color:var(--color-ink)]"
                          >
                            <span>Services</span>
                            <ChevronDown
                              size={16}
                              strokeWidth={1.5}
                              className={`transition-transform duration-300 ${
                                isMobileServicesOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {isMobileServicesOpen && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="overflow-hidden pl-2 border-l border-[color:var(--color-line)] my-1"
                              >
                                {serviceItems.map((sub) => (
                                  <li key={sub.name}>
                                    <Link
                                      href={sub.href}
                                      onClick={() => setIsMobileOpen(false)}
                                      className="block py-2 pl-4 text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)] transition-colors"
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block py-3 text-sm tracking-[0.18em] uppercase text-[color:var(--color-ink)]"
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-xs tracking-[0.18em] uppercase text-[color:var(--color-accent-ink)] bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300"
                >
                  Let&apos;s Talk
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
