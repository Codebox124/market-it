"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Eye, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const visualsPortfolio = [
  {
    title: "Graphic Design",
    image: "/graphic-design.png",
    description: "Visual production covering an assortment of media, whether personal or business.",
    icon: "diamond",
  },
  {
    title: "Video Editing",
    image: "/video-editing.png",
    description: "Post-production, including motion graphics, animation, VFX, sound, and color correction.",
    icon: "diamond",
  },
  {
    title: "Photo Editing",
    image: "/photo-editing.png",
    description: "High-end image manipulation, creative effects, and quality improvement.",
    icon: "star",
  },
  {
    title: "Animation",
    image: "/1.png",
    description: "Illustrating custom art, characters, environments, and motion for your project.",
    icon: "star",
  },
  {
    title: "Website Design",
    image: "/website-design.jpg",
    description: "User-friendly, custom websites and apps for portfolios, awareness, commerce, or blogging.",
    icon: "star",
  },
  {
    title: "Advertising",
    image: "/advertising.jpg",
    description: "Implementing campaigns that locate and attract your prospective customers or supporters.",
    icon: "diamond",
    accent: "border-rose-500/20",
  },
  {
    title: "Social Media",
    image: "/social-media.jpg",
    description: "Providing all-encompassing account management, outreach, content creation, and growth.",
    icon: "star",
  },
  {
    title: "Flyer Distribution",
    image: "/flyer.jpg",
    description: "Focused offline marketing to reach people in the real world, both locally and globally.",
    icon: "feather",
    accent: "border-violet-500/20",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

// Generate refined particle properties
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

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; speedX: number; speedY: number; color: number; opacity: number }[]
  >([]);

  const canvasRef = useRef(null);
  const animationRef = useRef<number | null>(null);

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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || particles.length === 0) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Refined color palette - more sophisticated
    const colors = [
      'rgba(148, 163, 184, 0.4)',  // Slate
      'rgba(156, 163, 175, 0.4)',  // Gray
      'rgba(209, 213, 219, 0.3)',  // Light gray
      'rgba(229, 231, 235, 0.2)',  // Very light gray
    ];

    const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, opacity: number) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.globalAlpha = opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

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
        drawCircle(ctx, x, y, particle.size, particle.opacity);

        // Subtle connections
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
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.1 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded, particles, isMobile]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex py-32 items-center justify-center overflow-hidden">
        
        {/* Refined gradient background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
          }}
        />

        {/* Subtle animated canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 h-full opacity-60"
        />

        {/* Refined ambient orbs */}
        <div className="absolute inset-0 overflow-hidden z-20">
          {isLoaded && Array.from({ length: isMobile ? 3 : 5 }).map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * (isMobile ? 300 : 500) + 200,
                height: Math.random() * (isMobile ? 300 : 500) + 200,
                filter: 'blur(100px)',
                background: i % 3 === 0
                  ? 'radial-gradient(circle, rgba(148,163,184,0.15) 0%, rgba(148,163,184,0.02) 70%)'
                  : i % 3 === 1
                    ? 'radial-gradient(circle, rgba(203,213,225,0.12) 0%, rgba(203,213,225,0.02) 70%)'
                    : 'radial-gradient(circle, rgba(226,232,240,0.1) 0%, rgba(226,232,240,0.02) 70%)',
                opacity: 0.8,
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight
                ],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 25 + i * 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-30 max-w-[85%] w-full px-6 md:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
            className="space-y-12"
          >
            {/* Refined Logo */}
            <motion.div
              variants={fadeIn}
              custom={0}
              className="text-center"
            >
              <motion.h1
                className="text-4xl md:text-8xl font-light tracking-wider text-white mb-4"
                style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  textShadow: "0 0 40px rgba(255,255,255,0.1)",
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                MAKE <span className="font-extralight text-slate-300">IT</span>
                <motion.span
                  className="mx-8 text-slate-400 font-thin"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  &
                </motion.span>
                <span className="font-light text-slate-200">MARKET</span>
              </motion.h1>
              
              {/* Subtle underline */}
              <motion.div
                className="w-32 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              />
            </motion.div>

            {/* Refined description */}
            <motion.div
              variants={fadeIn}
              custom={1}
              className="max-w-4xl mx-auto"
            >
              <div 
                className="backdrop-blur-xl bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                }}
              >
                <motion.p
                  className="text-lg md:text-xl text-slate-200 font-light leading-relaxed text-center"
                  style={{
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    lineHeight: "1.7"
                  }}
                >
                  We <span className="font-medium text-white">create</span> exceptional visual content and 
                  <span className="font-medium text-white"> strategically market</span> for businesses, artists, and visionaries. 
                  Our comprehensive services span graphic design, photography, videography, web development, 
                  animation, and digital marketing—transforming ideas into compelling visual narratives 
                  that captivate and convert.
                </motion.p>
              </div>
            </motion.div>

            {/* Refined portfolio grid */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="pt-16"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {visualsPortfolio.map((item, index) => (
                  <Link href={`/visuals/${item.title.toLowerCase().replace(/\s+/g, "-")}`} key={index}>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 40 },
                        show: { 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            duration: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }
                        }
                      }}
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="relative  rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-white/10 shadow-xl">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                          
                          {/* Hover icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                              <Eye className="text-white" size={20} />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-3">
                          <h3 className="text-lg font-medium text-white tracking-wide">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                            {item.description}
                          </p>
                          
                          {/* CTA */}
                          <div className="pt-2">
                            <span className="inline-flex items-center text-slate-300 hover:text-white transition-colors text-sm font-medium group-hover:translate-x-1 transform transition-transform duration-300">
                              Explore <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  );
}

