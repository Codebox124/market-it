"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";


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
      "🚀 Animations",
    ],
    link: "/visuals",
  },
  {
    title: "MARKETING",
    description: "We produce high-quality visual and written content tailored for engagement.",
    color: "from-blue-400 to-indigo-600",
    icon: "🚀",
    list: [
      "🌍 Websites",
      "📣 Advertising",
      "📱 Social Media",
      "📄 Flyer Distribution",
    ],
    link: "/marketing",
  },
];

// Generate particle properties
const generateParticles = (count: number, isMobile: boolean) => {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * (isMobile ? 3 : 4) + 1,
    speedX: (Math.random() - 0.5) * 0.2,
    speedY: (Math.random() - 0.5) * 0.2,
    color: Math.floor(Math.random() * 5),
  }));
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; speedX: number; speedY: number; color: number }[]
  >([]);

  const canvasRef = useRef(null);
  const animationRef = useRef<number | null>(null);



  useEffect(() => {
    setIsLoaded(true);

    // Check if device is mobile
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Generate particles based on screen size
      setParticles(generateParticles(mobile ? 70 : 150, mobile));
    };

    // Initial check
    checkMobile();

    // Add resize event listener
    window.addEventListener("resize", checkMobile);

    // Clean up
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

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Color palette
    const colors = [
      'rgba(255, 215, 0, 0.7)',  // Gold
      'rgba(212, 175, 55, 0.7)',  // Pink
      'rgba(255, 223, 99, 0.7)',  // Emerald
      'rgba(255, 215, 0, 0.7)',  // Gold
      'rgba(212, 175, 55, 0.7)',  // Amber
    ];

    // Animation loop
    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, points: number = 5) => {
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points;
        const r = i % 2 === 0 ? radius : radius / 2;
        const xPos = x + r * Math.cos(angle);
        const yPos = y + r * Math.sin(angle);
        ctx.lineTo(xPos, yPos);
      }
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x > 100) particle.x = 0;
        if (particle.x < 0) particle.x = 100;
        if (particle.y > 100) particle.y = 0;
        if (particle.y < 0) particle.y = 100;

        // Draw star particle
        const x = (particle.x / 100) * canvas.width;
        const y = (particle.y / 100) * canvas.height;

        ctx.fillStyle = colors[particle.color];
        drawStar(ctx, x, y, particle.size, 5);

        // Draw connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const particle2 = particles[j];
          const x2 = (particle2.x / 100) * canvas.width;
          const y2 = (particle2.y / 100) * canvas.height;

          const distance = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
          const maxDistance = isMobile ? 100 : 150;

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / maxDistance)})`;
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
      <section className="relative min-h-screen w-full flex py-32 items-center justify-center bg-black text-white overflow-hidden">

        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full"
          style={{ background: 'linear-gradient(to bottom, #000000, #0f1729, #0a0f20)' }}
        />

        {/* Glowing Orbs Background - Add some depth with larger colored orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {isLoaded && Array.from({ length: isMobile ? 5 : 8 }).map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * (isMobile ? 200 : 400) + 100,
                height: Math.random() * (isMobile ? 200 : 400) + 100,
                filter: 'blur(80px)',
                background: i % 5 === 0
                  ? 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.01) 70%)'
                  : i % 5 === 1
                    ? 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.01) 70%)'
                    : i % 5 === 2
                      ? 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.01) 70%)'
                      : i % 5 === 3
                        ? 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.01) 70%)'
                        : 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.01) 70%)',
                opacity: 0.6,
                zIndex: 1,
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
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Floating geometry elements for added modern feel */}
        <div className="absolute inset-0 overflow-hidden">
          {isLoaded && Array.from({ length: isMobile ? 6 : 12 }).map((_, i) => {
            // Randomize shape type
            const shapeType = Math.floor(Math.random() * 3); // 0: circle, 1: square, 2: triangle
            const size = Math.random() * (isMobile ? 40 : 60) + 20;

            return (
              <motion.div
                key={`shape-${i}`}
                className={`absolute ${shapeType === 1 ? '' : shapeType === 2 ? 'shape-triangle' : 'rounded-full'}`}
                style={{
                  width: shapeType === 2 ? 0 : size,
                  height: shapeType === 2 ? 0 : size,
                  borderRadius: shapeType === 1 ? '10%' : '',
                  border: `1px solid rgba(255,255,255,${Math.random() * 0.2 + 0.05})`,
                  borderWidth: Math.random() < 0.5 ? '1px' : '2px',
                  backgroundColor: 'transparent',
                  zIndex: 1,
                  ...(shapeType === 2 ? {
                    borderLeft: `${size / 2}px solid transparent`,
                    borderRight: `${size / 2}px solid transparent`,
                    borderBottom: `${size}px solid rgba(255,255,255,${Math.random() * 0.2 + 0.05})`,
                  } : {})
                }}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                  rotate: 0
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
                  opacity: [0, 0.4, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 25 + Math.random() * 15,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: i * 2,
                }}
              />
            );
          })}
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
            {/* Glowing Logo - Enhanced animation */}
            <motion.h1
              variants={fadeIn}
              custom={0}
              className="text-3xl md:text-7xl border-4 border-white/30 backdrop-blur-sm flex justify-center items-center py-4 px-6 font-extrabold leading-tight text-transparent bg-clip-text  bg-gradient-to-r from-emerald-300 to-emerald-500 "
              style={{
                textShadow: "0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(59,130,246,0.5)",
                boxShadow: "0 0 30px rgba(59,130,246,0.3), inset 0 0 20px rgba(59,130,246,0.2)"
              }}
            >
              MAKE <span className="px-5">IT</span>
              <motion.span
                className=" bg-clip-text pr-6 bg-gradient-to-r text-white"
                animate={{
                  textShadow: ["0 0 10px rgba(16,185,129,0.5)", "0 0 20px rgba(16,185,129,0.8)", "0 0 10px rgba(16,185,129,0.5)"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              > & </motion.span>

              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600"
                animate={{
                  textShadow: ["0 0 10px rgba(59,130,246,0.5)", "0 0 20px rgba(59,130,246,0.8)", "0 0 10px rgba(59,130,246,0.5)"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              > MARKET</motion.span>
            </motion.h1>



            <motion.div
              variants={fadeIn}
              custom={1}
              className="bg-black/30 backdrop-blur-md p-8 md:p-10 rounded-2xl border text-center items-center  flex flex-col border-white/10"
              style={{ boxShadow: "0 0 30px rgba(0,0,0,0.3)" }}
              whileHover={{
                boxShadow: "0 0 40px rgba(0,0,0,0.4), 0 0 15px rgba(59,130,246,0.2)",
                transition: { duration: 1 }
              }}
            >
              <div  className="flex items-center justify-center mt-6 md:justify-start w-full">
                <motion.p
                  className="text-lg heroText md:text-2xl text-gray-200 font-light leading-relaxed max-w-full"
                  animate={{
                    color: ["rgba(229,231,235,1)", "rgba(255,255,255,1)", "rgba(229,231,235,1)"]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  We provide full-service  <span className="font-semibold text-emerald-400">visuals</span> and
                  <span className="font-semibold text-blue-400"> marketing </span>solutions to help you achieve your goal.
                </motion.p>
              </div>

              <div className="flex items-center justify-center mt-6 md:justify-start w-full">
                <motion.p
                  className="text-lg heroText md:text-2xl text-gray-200 font-light leading-relaxed max-w-full  "
                >
                  From handing out flyers to editing a film... <span className="font-normal">Graphic design to solidifying business strategy.</span>
                </motion.p>
              </div>
              <div className="flex items-center justify-center mt-6 md:justify-start w-full">
                <motion.p
                  className="text-lg heroText md:text-2xl text-gray-200 font-light leading-relaxed max-w-full  "
                >
                  We craft custom content and marketing campaigns, no matter if you are large or small.
                </motion.p>
              </div>


            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}

                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-2xl transform group-hover:scale-102 transition-all duration-300 -z-10"></div>
                  <div className="absolute inset-0 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
                    <motion.div
                      className={`absolute -inset-[150%] bg-gradient-to-r ${service.color} opacity-30 blur-3xl`}

                    />
                  </div>

                  <div className="relative items-center flex flex-col p-8 md:p-10 z-10">


                    <h3 className={`text-2xl md:text-3xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r ${service.color}`}>
                      {service.title}
                    </h3>

                    <ul className="mt-8 md:mt-10 text-lg md:text-xl font-medium space-y-5 md:space-y-6 text-gray-200">
                      {service.list.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center group/item cursor-pointer transition-all duration-300 "
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




          </motion.div>
        </div>
      </section>


      <style jsx global>{`
        .shape-triangle {
          width: 0;
          height: 0;
        }
        @keyframes pulse-glow {
          0%, 100% { filter: blur(8px) brightness(1); }
          50% { filter: blur(12px) brightness(1.3); }
        }
        .pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}