"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BackButton({ href = "/" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={href}
        className="fixed top-24 left-6 lg:left-10 z-40 group inline-flex items-center gap-2 px-4 py-2.5 border border-[color:var(--color-line-strong)] text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)] hover:border-[color:var(--color-accent)] transition-colors duration-300 backdrop-blur-md bg-[color:var(--color-canvas)]/40"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
        <span className="text-xs tracking-[0.22em] uppercase">Back</span>
      </Link>
    </motion.div>
  );
}
