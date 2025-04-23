"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
    >
      <div className="flex justify-between items-center w-full text-white font-bold text-2xl">
      

        <div className="ml-auto px-6">
          <Link
            href="/contact"
            className="px-5 flex justify-center items-center py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all text-center"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}

    </motion.nav>
  );
}
