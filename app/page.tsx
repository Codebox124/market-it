"use client";

import { ArrowRight, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const visualsPortfolio = [
  {
    title: "Graphic Design",
    image: "/graphic-design.png",
    description: "Premium visual identity and brand design crafted with precision and creativity.",
     gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "Video Editing",
    image: "/video-editing.png",
    description: "Cinematic post-production with advanced motion graphics and seamless storytelling.",
   gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Photo Editing",
    image: "/photo-editing.png",
    description: "Professional image enhancement and artistic manipulation with meticulous attention to detail.",
  gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Animation",
    image: "/1.png",
    description: "Custom character design and fluid motion graphics that bring stories to life.",
  gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Website Design",
    image: "/website-design.jpg",
    description: "Cutting-edge web experiences with intuitive design and flawless functionality.",
     gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    title: "Advertising",
    image: "/advertising.jpg",
    description: "Strategic campaigns that captivate audiences and drive meaningful engagement.",
   gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    title: "Social Media",
    image: "/social-media.jpg",
    description: "Comprehensive social presence management with engaging content and growth strategies.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Flyer Distribution",
    image: "/flyer.jpg",
    description: "Targeted offline marketing campaigns that create real-world connections and impact.",
    icon: "feather",
   gradient: "from-yellow-500/20 to-orange-500/20",
  },
];



const generateParticles = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.1,
    speedY: (Math.random() - 0.5) * 0.1,
    opacity: Math.random() * 0.5 + 0.3,
  }));
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setParticles(generateParticles(mobile ? 40 : 80));
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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > 100) particle.x = 0;
        if (particle.x < 0) particle.x = 100;
        if (particle.y > 100) particle.y = 0;
        if (particle.y < 0) particle.y = 100;

        const x = (particle.x / 100) * canvas.width;
        const y = (particle.y / 100) * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.6})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isLoaded, particles]);

  return (
    <>
      <section className="relative min-h-screen w-full pt-12 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
        {/* Animated background canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
        />

        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />

        {/* Main content */}
        <div className="relative z-10 max-w-7xl w-full px-6 lg:px-12 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="space-y-16"
          >
            {/* Hero title */}
            <motion.div
              variants={fadeIn}
              custom={0}
              className="text-center space-y-8"
            >
              <h1 className="text-5xl md:text-8xl font-light tracking-tight">
                <span className="text-white font-extralight">MAKE</span>
                <span className="text-white/40 mx-4 md:mx-8 font-thin">IT</span>
                <span className="text-white/60 mx-2 font-thin">&</span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-normal">
                  MARKET
                </span>
              </h1>

              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                  Premium creative services and strategic marketing solutions for
                  <span className="text-white"> businesses</span>,
                  <span className="text-white"> artists</span>, and
                  <span className="text-white"> visionaries</span>
                </p>
              </div>
            </motion.div>

            {/* Services grid */}
            <motion.div
              variants={fadeIn}
              custom={1}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {visualsPortfolio.map((item, index) => (

                <Link href={`/visuals/${item.title.toLowerCase().replace(/\s+/g, "-")}`} key={index}>
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    custom={index + 2}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="group cursor-pointer"
                  >
                    <div className="relative  rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800/50">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} to-transparent opacity-60`} />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                            <Eye className="text-white" size={20} />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <h3 className="text-lg font-medium text-white tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>

                        <div className="flex items-center text-blue-400 text-sm font-medium pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>Explore</span>
                          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>

              ))}
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
      `}</style>
    </>
  );
}