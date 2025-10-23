"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Home, User, Briefcase, Mail, ChevronDown, Book } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Contact", href: "/contact", icon: Mail },
    { name: "Booking", href: "/booking", icon: Book },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-white/95 backdrop-blur-xl border-b border-gray-200/50 py-3 shadow-2xl shadow-gray-900/5"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3"
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img width={150} height={50} alt="logo" src="/logo.png" />

              </div>

            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 3).map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden ${pathname === item.href
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                    <span>{item.name}</span>

                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Button & Mobile Menu */}
          <div className="flex items-center space-x-4">

            {/* Enhanced Contact Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Link
                href="/contact"

                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Mail size={16} />
                  <span>Get Started</span>
                </span>


              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 shadow-sm"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-2xl p-6">
                <div className="space-y-3">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 group ${pathname === item.href
                            ? "text-emerald-600 bg-emerald-50 border border-emerald-200/50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
                            }`}
                        >
                          <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                          <span>{item.name}</span>
                          {item.name === "Contact" && (
                            <div className="ml-auto">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile Contact Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mt-6 pt-6 border-t border-gray-200/50"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full px-6 py-4 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    <Mail size={16} />
                    <span>Get Started</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle bottom border when scrolled */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
        />
      )}
    </motion.nav>
  );
}