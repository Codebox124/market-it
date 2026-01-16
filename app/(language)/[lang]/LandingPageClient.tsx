"use client";

import {
  ArrowRight,
  Send,
  Mail,
  User,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import LatestBlogs from "@/components/home/LatestBlogs";

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

// --- CONFIGURATION (MANUAL LINKS DISINI) ---
// Mapping Aset Visual & Link Static
const visualAssets: Record<
  string,
  { image: string; gradient: string; href: string }
> = {
  advertising: {
    image: "/advertising.webp",
    gradient: "from-pink-500/20 to-rose-500/20",
    href: "/marketing/advertising", // Link Manual
  },
  social_media: {
    image: "/social-media.jpg",
    gradient: "from-purple-500/20 to-pink-500/20",
    href: "/marketing/social-media", // Link Manual
  },
  web_app: {
    image: "/website-design.jpg",
    gradient: "from-indigo-500/20 to-blue-500/20",
    href: "/marketing/websites-apps", // Link Manual
  },
  graphic_design: {
    image: "/graphic-design.png",
    gradient: "from-violet-500/20 to-purple-500/20",
    href: "/visuals/graphic-design", // Link Manual
  },
  video_editing: {
    image: "/video-editing.webp",
    gradient: "from-blue-500/20 to-cyan-500/20",
    href: "/visuals/video-editing", // Link Manual
  },
  animation: {
    image: "/1.png",
    gradient: "from-orange-500/20 to-red-500/20",
    href: "/visuals/animation", // Link Manual
  },
};

// --- PARTICLE LOGIC ---
const generateParticles = (count: number, isMobile: boolean) => {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * (isMobile ? 2 : 3) + 0.5,
    speedX: (Math.random() - 0.5) * 0.15,
    speedY: (Math.random() - 0.5) * 0.15,
    color: Math.floor(Math.random() * 4),
    opacity: Math.random() * 0.6 + 0.2,
  }));
};

interface LandingPageProps {
  dict: any;
  lang: string;
}

export default function LandingPageClient({ dict, lang }: LandingPageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // --- EMAILJS STATE & LOGIC ---
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

  // --- CANVAS LOGIC ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setParticles(generateParticles(mobile ? 50 : 100, mobile));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || particles.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const colors = [
      "rgba(148, 163, 184, 0.4)",
      "rgba(156, 163, 175, 0.4)",
      "rgba(209, 213, 219, 0.3)",
      "rgba(229, 231, 235, 0.2)",
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x > 100) particle.x = 0;
        if (particle.x < 0) particle.x = 100;
        if (particle.y > 100) particle.y = 0;
        if (particle.y < 0) particle.y = 100;

        const x = (particle.x / 100) * canvas.width;
        const y = (particle.y / 100) * canvas.height;

        ctx.fillStyle = colors[particle.color];
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        for (let j = i + 1; j < particles.length; j++) {
          const particle2 = particles[j];
          const x2 = (particle2.x / 100) * canvas.width;
          const y2 = (particle2.y / 100) * canvas.height;
          const distance = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
          const maxDistance = isMobile ? 80 : 120;
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(148, 163, 184, ${
              0.1 * (1 - distance / maxDistance)
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isLoaded, particles, isMobile]);

  // --- DATA PREPARATION ---
  const servicesKeys = Object.keys(dict.services_section.items);
  const allServices = servicesKeys.map((key) => {
    // Ambil konfigurasi manual (image, gradient, href)
    const asset = visualAssets[key] || {
      image: "",
      gradient: "",
      href: "#",
    };

    return {
      ...dict.services_section.items[key], // Title & Desc dari JSON
      ...asset, // Image, Gradient & Href dari Config Manual
      key: key,
    };
  });

  return (
    <>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-50 pt-12">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20" />
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 max-w-7xl xl:max-w-[87%] w-full mx-auto px-6 lg:px-12 py-16 xl:py-8 flex flex-col items-center">
          {/* --- HERO SECTION --- */}
          <div className="text-center space-y-8 mb-6">
              <div className="relative inline-block group">
                {/* Electric Arc / Lightning Effect */}
                <div className="absolute -inset-4 pointer-events-none z-0">
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
                    animate={{
                      opacity: [0, 1, 0, 0, 1, 0],
                      filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "linear",
                    }}
                  >
                    <svg
                      viewBox="0 0 400 150"
                      className="w-[120%] h-[150%] absolute -top-[25%] -left-[10%] drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    >
                      <motion.path
                        d="M20,75 L60,40 L90,90 L130,30 L160,80 L200,20 L240,90 L280,30 L320,80 L360,40"
                        fill="none"
                        stroke="cyan"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.path
                        d="M40,110 L80,60 L120,100 L160,50 L200,90 L240,40 L280,100 L320,50"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 0.4,
                          repeat: Infinity,
                          repeatDelay: 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Pulsing BG for Base Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-emerald-400/20 blur-xl rounded-lg"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.h1
                  variants={fadeIn}
                  custom={0}
                  className="relative z-10 text-3xl md:text-7xl border-4 border-white/70 backdrop-blur-sm flex justify-center items-center py-4 px-6 font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    textShadow:
                      "0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(59,130,246,0.3)",
                    boxShadow:
                      "0 0 20px rgba(59,130,246,0.2), inset 0 0 10px rgba(255,255,255,0.5), 0 0 5px rgba(255,255,255,0.8)",
                  }}
                  animate={{
                     boxShadow: [
                      "0 0 20px rgba(59,130,246,0.2), inset 0 0 10px rgba(255,255,255,0.5), 0 0 5px rgba(255,255,255,0.8)",
                      "0 0 30px rgba(59,130,246,0.4), inset 0 0 15px rgba(255,255,255,0.6), 0 0 10px rgba(255,255,255,0.9)",
                      "0 0 20px rgba(59,130,246,0.2), inset 0 0 10px rgba(255,255,255,0.5), 0 0 5px rgba(255,255,255,0.8)",
                     ]
                  }}
                  transition={{
                    // To adjust speed: Change 'duration' (higher = slower)
                    duration: 5, // Slowed down from 2
                    repeat: Infinity,
                    repeatDelay: 1, 
                  }}
                >

                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-400"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(16,185,129,0.4)",
                        "0 0 10px rgba(16,185,129,0.45)",
                        "0 0 5px rgba(16,185,129,0.4)",
                      ],
                      opacity: [1, 0.95, 1] 
                    }}
                    transition={{
                      // Speed for "MAKE IT"
                      duration: 0.8, // Slowed down from 2
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    MAKE <span className="px-5">IT</span>
                  </motion.span>
                  <motion.span
                    className="bg-clip-text pr-6 bg-gradient-to-r text-white"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(16,185,129,0.4)",
                        "0 0 15px rgba(16,185,129,0.7)",
                        "0 0 5px rgba(16,185,129,0.4)",
                      ],
                    }}
                    transition={{
                      // Speed for "&"
                      duration: 0.8, // Slowed down from 2
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    {" "}
                    &{" "}
                  </motion.span>
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(59,130,246,0.4)",
                        "0 0 10px rgba(59,130,246,0.45)",
                        "0 0 5px rgba(59,130,246,0.4)",
                      ],
                      opacity: [1, 0.9, 1]
                    }}
                    transition={{
                      // Speed for "MARKET"
                      duration: 0.8, // Slowed down from 2
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    {" "}
                    MARKET{" "}
                  </motion.span>
                </motion.h1>
              </div>

            <motion.h2
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
            >
              {dict.hero.subtitle}
            </motion.h2>
          </div>

          {/* --- CATEGORY PILLS (Sekarang Bisa Diklik & Link Manual) --- */}
          <div className="w-full flex justify-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={2}
              className="w-full max-w-4xl mb-20"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 text-center gap-4 md:gap-6 text-sm md:text-xl">
                {allServices.map((service, idx) => (
                  <Link href={service.href} key={idx} className="block">
                    <div className="px-2 md:px-6 py-3 rounded-full border-2 border-gray-200 bg-white/50 backdrop-blur-sm text-gray-700 font-medium hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all duration-300 cursor-pointer select-none text-center">
                      {service.category_label}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* --- SERVICES GRID --- */}
          <div className="w-full space-y-10 mb-24">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center justify-center space-x-4"
            >
              <div className="h-px w-12 bg-gray-300"></div>
              <h3 className="text-2xl font-semibold text-gray-800 uppercase tracking-widest text-center">
                {dict.services_section.title}
              </h3>
              <div className="h-px w-12 bg-gray-300"></div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {allServices.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <div
                      className="group cursor-pointer h-full"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{
                        transform:
                          hoveredIndex === index
                            ? "translateY(-10px)"
                            : "translateY(0px)",
                        transition: "transform 0.3s ease-out",
                      }}
                    >
                      <div className="relative rounded-3xl overflow-hidden bg-white h-full flex flex-col shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 mb-4">
                            {item.description}
                          </p>
                          <div className="mt-auto flex items-center text-sm font-semibold text-blue-500 opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <span>{dict.services_section.explore_button}</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- CONTACT FORM --- */}
          <div className="w-full max-w-2xl mx-auto">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 border border-blue-100">
                {dict.contact.label}
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                {dict.contact.title}
              </h3>
              <p className="text-gray-500 mt-2">{dict.contact.subtitle}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50"
            >
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User size={16} /> {dict.contact.form.name_label}
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder={dict.contact.form.name_placeholder}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail size={16} /> {dict.contact.form.email_label}
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder={dict.contact.form.email_placeholder}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MessageSquare size={16} />{" "}
                    {dict.contact.form.message_label}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder={dict.contact.form.message_placeholder}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />{" "}
                      {dict.contact.form.loading_text}
                    </>
                  ) : (
                    <>
                      <Send size={18} /> {dict.contact.form.submit_button}
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
          
          <div className="max-w-7xl xl:max-w-[87%] mx-auto px-6 lg:px-12 mt-20">
             <LatestBlogs lang={lang} />
          </div>

        </div>
      </div>
    </>
  );
}
