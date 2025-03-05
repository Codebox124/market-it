"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-2xl">
          <span className="text-green-400">Make</span>
          <span className="text-white">It</span>
          <span className="text-blue-400">&Market</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/visuals"
            className="text-white hover:text-green-400 transition-colors"
          >
            Visuals
          </Link>
          <Link
            href="/marketing"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Marketing
          </Link>
          <Link
            href="#contact"
            className="px-5 py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-lg"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <Link
              href="/visuals"
              className="text-white hover:text-green-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Visuals
            </Link>
            <Link
              href="/marketing"
              className="text-white hover:text-blue-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Marketing
            </Link>
            <Link
              href="#contact"
              className="px-5 py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all text-center"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
