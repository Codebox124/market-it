"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const services = [
  {
    title: "VISUALS",
    description: "Crafting a compelling identity that aligns with your audience and business goals.",
    color: "from-emerald-400 to-teal-600",
    icon: "✨",
    list: [
      "🎥 Video Editing",
      "📸 Photo Editing",
      "🎨 Graphic Design",
      "🌍 Website Design",
    ],
    link: "/visuals",
  },
  {
    title: "MARKETING",
    description: "We produce high-quality visual and written content tailored for engagement.",
    color: "from-blue-400 to-indigo-600",
    icon: "🚀",
    list: [
      "🚀 Branding",
      "📢 Advertising",
      "📱 Social Media",
      "📄 Flyer Distribution",
    ],
    link: "/marketing",
  },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Mouse move handler - only active on non-mobile
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      if (!isMobile) {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };
    
    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex pt-20 items-center justify-center bg-black text-white overflow-hidden">
        {/* Background Overlay with Parallax Effect (disabled on mobile) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("/hero.jpg")',
            transform: isLoaded && !isMobile ? `translate(${mousePosition.x / 100}px, ${mousePosition.y / 100}px)` : 'none',
            transition: 'transform 0.2s ease-out',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-black/100"></div>
        </div>

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-x"></div>
        </div>

        {/* Floating Particles with Glow */}
        <div className="absolute inset-0 overflow-hidden">
          {isLoaded &&
            Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-xl"
                style={{
                  width: Math.random() * (isMobile ? 200 : 300) + 50,
                  height: Math.random() * (isMobile ? 200 : 300) + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 3 === 0 
                    ? 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, rgba(59,130,246,0.1) 70%)' 
                    : i % 3 === 1 
                    ? 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(139,92,246,0.1) 70%)'
                    : 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(219,39,119,0.1) 70%)',
                  boxShadow: i % 3 === 0 
                    ? '0 0 30px 5px rgba(56,189,248,0.3)' 
                    : i % 3 === 1 
                    ? '0 0 30px 5px rgba(168,85,247,0.3)'
                    : '0 0 30px 5px rgba(236,72,153,0.3)',
                }}
                animate={{
                  x: [0, Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50)],
                  y: [0, Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50)],
                  scale: [1, Math.random() * 0.4 + 0.8, 1],
                }}
                transition={{
                  duration: Math.random() * 20 + 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl w-full px-6 md:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="space-y-8"
          >
            {/* Glowing Logo */}
            <motion.h1
              variants={fadeIn}
              custom={0}
              className="text-3xl md:text-7xl border-4 border-white/30 backdrop-blur-sm flex justify-center items-center py-4 px-6 font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white"
              style={{
                textShadow: "0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(59,130,246,0.5)",
                boxShadow: "0 0 30px rgba(59,130,246,0.3), inset 0 0 20px rgba(59,130,246,0.2)"
              }}
            >
              MAKE IT
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 mx-3"
                animate={{ 
                  textShadow: ["0 0 10px rgba(16,185,129,0.7)", "0 0 20px rgba(16,185,129,0.9)", "0 0 10px rgba(16,185,129,0.7)"] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              > &</motion.span>

              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600"
                animate={{ 
                  textShadow: ["0 0 10px rgba(59,130,246,0.7)", "0 0 20px rgba(59,130,246,0.9)", "0 0 10px rgba(59,130,246,0.7)"] 
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              > MARKET</motion.span>
            </motion.h1>

            {/* Glassmorphism Navigation - Improved spacing and alignment */}
            <motion.nav 
              variants={fadeIn}
              custom={0.5}
              className="text-lg md:text-xl font-medium my-8 md:my-14 flex justify-center md:justify-end gap-6 md:gap-10 backdrop-blur-md bg-white/5 rounded-full px-6 md:px-10 py-3 md:py-4 border border-white/10"
              style={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
            >
              <span className="cursor-pointer hover:text-emerald-400 transition duration-300">Visuals</span>
              <span className="cursor-pointer hover:text-blue-400 transition duration-300">Marketing</span>
              <span className="cursor-pointer hover:text-purple-400 transition duration-300">Contact</span>
            </motion.nav>

            <motion.div
              variants={fadeIn}
              custom={1}
              className="bg-black/30 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/10"
              style={{ boxShadow: "0 0 30px rgba(0,0,0,0.3)" }}
            >
              <motion.p
                className="text-lg md:text-2xl text-gray-200 max-w-3xl font-light leading-relaxed"
                animate={{ 
                  color: ["rgba(229,231,235,1)", "rgba(255,255,255,1)", "rgba(229,231,235,1)"] 
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                We provide <span className="font-semibold text-emerald-400">full-service Visuals</span> and
                <span className="font-semibold text-blue-400"> marketing solutions</span> to help you achieve your goal.
              </motion.p>
              <motion.p
                className="text-lg md:text-2xl text-gray-200 max-w-3xl font-light mt-6 leading-relaxed"
              >
                From handing out flyers to editing a film,
                graphics design to solidifying business strategy.
              </motion.p>
              <motion.p
                className="text-lg md:text-2xl text-gray-200 max-w-3xl font-light mt-6 leading-relaxed"
              >
                We craft <span className="italic">custom content</span> and <span className="underline decoration-blue-400 decoration-2 underline-offset-4">marketing campaigns</span> that get things done for you. No matter if you are large or small.
              </motion.p>
            </motion.div>

            {/* Services Section with Hover Effects - Improved spacing */}
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, scale: 1.01 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-2xl transform group-hover:scale-102 transition-all duration-300 -z-10"></div>
          <div className="absolute inset-0 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
            <div className={`absolute -inset-[150%] bg-gradient-to-r ${service.color} opacity-30 blur-3xl group-hover:opacity-40 transition-opacity duration-500`}></div>
          </div>

          <div className="relative p-8 md:p-10 z-10">
            <div className="absolute top-6 right-6 md:top-8 md:right-8 text-3xl md:text-4xl">
              {service.icon}
            </div>

            <h3 className={`text-2xl md:text-3xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r ${service.color}`}>
              {service.title}
            </h3>

            <ul className="mt-8 md:mt-10 text-lg md:text-xl font-medium space-y-5 md:space-y-6 text-gray-200">
              {service.list.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center group/item cursor-pointer transition-all duration-300 hover:translate-x-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="mr-3 opacity-80 group-hover/item:opacity-100">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Updated "Learn More" to use Link */}
            <Link href={service.link} passHref>
              <motion.div
                className="mt-10 md:mt-12 inline-flex items-center text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
                whileHover={{ x: 5 }}
              >
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
{/* 
          <motion.div
              variants={fadeIn}
              custom={2}
              className="flex flex-col md:flex-row justify-center gap-5 md:gap-8 pt-8 md:pt-10 md:mt-20"
            >
              <Link
                href="/visuals"
                className="group relative overflow-hidden px-8 md:px-12 py-5 md:py-6 bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-semibold rounded-lg shadow-xl transition-all duration-500 hover:shadow-emerald-500/30 hover:scale-105"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <motion.span 
                  className="relative z-10 flex items-center justify-center md:justify-start"
                  whileHover={{ x: 5 }}
                >
                  Visual Solutions
                  <ArrowRight className="inline-block ml-3 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Link>

              <Link
                href="/marketing"
                className="group relative overflow-hidden px-8 md:px-12 py-5 md:py-6 bg-gradient-to-br from-blue-500 to-indigo-700 text-white font-semibold rounded-lg shadow-xl transition-all duration-500 hover:shadow-blue-500/30 hover:scale-105"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <motion.span 
                  className="relative z-10 flex items-center justify-center md:justify-start"
                  whileHover={{ x: 5 }}
                >
                  Marketing Strategies
                  <ArrowRight className="inline-block ml-3 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Link>
            </motion.div> */}

            {/* Scroll Down Indicator */}
            <motion.div
              variants={fadeIn}
              custom={3}
              className="absolute bottom-10 left-1/2 transform md:-translate-y-20 -translate-x-1/2 text-white/70 cursor-pointer hover:text-white transition-colors"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              {/* <div className="md:flex flex-col hidden items-center">
                <span className="text-xs md:text-sm mb-3 font-light tracking-widest">DISCOVER MORE</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="bg-white/10 rounded-full p-2 backdrop-blur-sm border border-white/20"
                  style={{ boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </div> */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
     
      
      {/* Add custom styles for additional effects */}
      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        .bg-grid-white {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 0h1v1H0V0zm1 0H0v1h1V0z' fill='%23FFFFFF' fill-opacity='0.05'/%3E%3C/svg%3E");
        }
        .bg-grid-8 {
          background-size: 50px 50px;
        }
      `}</style>
    </>
  );
}