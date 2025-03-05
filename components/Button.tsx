"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function BackButton({ href = "/" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={href}
        className="fixed top-24 left-6 z-50 bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-full p-3 group flex items-center justify-center hover:bg-gray-700 transition-all duration-300"
      >
        <ArrowLeft
          className="text-white group-hover:-translate-x-0.5 transition-transform"
          size={20}
        />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-white whitespace-nowrap">
          Back to Home
        </span>
      </Link>
    </motion.div>
  );
}
