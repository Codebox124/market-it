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

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const canvasRef = useRef(null);
  const animationRef = useRef<number | null>(null);
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; speedX: number; speedY: number; color: number; opacity: number }[]
  >([]);

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
      <section className="relative min-h-screen w-full pt-12 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Animated background canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 opacity-60"
        />

        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_60%)]" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-2xl" />

        {/* Main content */}
        <div className="relative z-10 max-w-7xl w-full px-6 lg:px-12 py-24">
          <div className="space-y-16">
            {/* Hero title */}
            <div className="text-center space-y-8">
              <h1 className="text-3xl md:text-8xl font-light tracking-tight">
                <span className="text-gray-900 font-light">MAKE</span>
                <span className="text-gray-500 mx-4 md:mx-8 font-thin">IT</span>
                <span className="text-gray-600 mx-2 font-thin">&</span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                  MARKET
                </span>
              </h1>

              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                  Premium creative services and strategic marketing solutions for
                  <span className="text-gray-900 font-medium"> businesses</span>,
                  <span className="text-gray-900 font-medium"> artists</span>, and
                  <span className="text-gray-900 font-medium"> visionaries</span>
                </p>
              </div>
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {visualsPortfolio.map((item, index) => (
                <Link href={`/visuals/${item.title.toLowerCase().replace(/\s+/g, "-")}`} key={index}>
                  <div
                    key={index}
                    className="group cursor-pointer"

                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      transform: hoveredIndex === index ? 'translateY(-12px)' : 'translateY(0px)',
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100/80 hover:shadow-2xl hover:shadow-gray-300/30 transition-all duration-500">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />

                        {/* Hover overlay */}
                        <div
                          className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        >
                          <div className={`bg-white/90 backdrop-blur-md p-4 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg border border-white/20`}>

                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>

                        <div className={`flex items-center text-sm font-semibold pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                          <span>Explore Services</span>
                          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Gradient accent border on hover */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r  to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                    </div>
                  </div>
                </Link>

              ))}
            </div>

            {/* Call to action */}
            <div className="text-center pt-12">
              <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg shadow-gray-200/50 border border-gray-100">
                <span className="text-gray-700 font-medium">Ready to elevate your brand?</span>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:scale-105">
                  Get Started
                </button>
              </div>
            </div>
          </div>
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