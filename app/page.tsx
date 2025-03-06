"use client";

import Link from "next/link";
import { ArrowRight, } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

const ParallaxBackground = () => {
  const generateLines = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const height = Math.random() * 200 + 50;
      const width = Math.random() * 1 + 0.2;
      const delay = Math.random() * 5;
      const duration = Math.random() * 20 + 15;
      const top = Math.random() * 100;
      const opacity = Math.random() * 0.08 + 0.01;

      return (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            height: `${height}px`,
            width: `${width}px`,
            top: `${top}%`,
            left: `${i * (100 / count)}%`,
            opacity,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [opacity, opacity * 2, opacity],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        />
      );
    });
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {generateLines(12)}
    </div>
  );
};



const NoiseEffect = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
      backgroundSize: '100px 100px',
    }}
  />
);

const DistortionWave = () => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      <defs>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -11" result="gooey" />
        </filter>
      </defs>
      <g filter="url(#gooey)">
        {[...Array(8)].map((_, i) => {
          const delay = i * 0.2;
          const duration = 20 + i * 2;
          const baseY = 600 + i * 30;
          const amplitude = 50 - i * 5;

          return (
            <motion.circle
              key={i}
              cx="50%"
              cy={baseY}
              r={180 - i * 15}
              fill={`rgba(200, 200, 255, ${0.03 - i * 0.003})`}
              animate={{
                cy: [baseY - amplitude, baseY + amplitude, baseY - amplitude],
                cx: ["45%", "55%", "45%"],
                r: [180 - i * 15, 200 - i * 15, 180 - i * 15],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          );
        })}
      </g>
    </svg>
  );
};

// Refined animation variants for luxury feel
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing for smoother animations
    },
  }),
};

// Updated luxury services
const services = [
  {
    title: "VISUALS",
    description: "Bespoke visual identities crafted with precision to elevate your exclusive brand presence.",
    color: "from-emerald-300 to-teal-500",
    icon: "✦",
    list: [
      "🎥 Video Editing",
      "📸 Photo Editing",
      "🎨 Graphics Design",
      "🌍 Website Design",
    ],
    link: "/visuals",
  },
  {
    title: "MARKETING",
    description: "Strategic campaigns tailored for discerning audiences and exceptional market positioning.",
    color: "from-blue-300 to-indigo-500",
    icon: "✧",
    list: [
      "🚀 Branding",
      "📢 Advertising",
      "📱 Social Media",
      "📄 Flyer Distribution",
    ],
    link: "/marketing",
  },
];

interface RevealTextProps {
  children: ReactNode;
  staggerChildren?: number;
  delay?: number;
  once?: boolean;
}

const RevealText: React.FC<RevealTextProps> = ({ children, staggerChildren = 0.03, delay = 0, once = false }) => {
 
  const text = typeof children === "string" ? children.split("") : [];

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={{
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
      style={{ display: "inline-block" }}
    >
      {text.map((char, index) => (
        <motion.span
        className=""
          key={index}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                damping: 10,
                stiffness: 100,
              }
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add resize event listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <>
      {/* {!isMobile && isLoaded && <CustomCursor />} */}
      {/* Hero Section with Luxury Aesthetics */}
      <section className="relative min-h-screen w-full flex py-20 items-center justify-center bg-black text-white overflow-hidden">
        {/* Premium Background with Subtle Movement */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/hero.jpg")' }}
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.85, 0.9, 0.85]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: [0.4, 0.0, 0.2, 1] // Luxury-style easing
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/80 to-black/95"></div>
        </motion.div>

        <NoiseEffect />


        <DistortionWave />
        <ParallaxBackground />

        <div className="absolute inset-0 overflow-hidden">
          {isLoaded &&
            Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => {
              const size = Math.random() * (isMobile ? 150 : 200) + 50;
              const delay = Math.random() * 10;
              const duration = Math.random() * 15 + 20;
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              const color = i % 5 === 0
                ? 'radial-gradient(circle, rgba(254,240,138,0.15) 0%, rgba(251,191,36,0.05) 70%)' // Gold
                : i % 5 === 1
                  ? 'radial-gradient(circle, rgba(250,250,250,0.12) 0%, rgba(226,232,240,0.04) 70%)' // Silver
                  : i % 5 === 2
                    ? 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(59,130,246,0.05) 70%)' // Blue
                    : i % 5 === 3
                      ? 'radial-gradient(circle, rgba(214,188,250,0.15) 0%, rgba(168,85,247,0.05) 70%)' // Purple
                      : 'radial-gradient(circle, rgba(244,114,182,0.15) 0%, rgba(236,72,153,0.05) 70%)'; // Pink

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full blur-xl"
                  style={{
                    width: size,
                    height: size,
                    left: `${x}%`,
                    top: `${y}%`,
                    background: color,
                    boxShadow: `0 0 35px 5px rgba(255,255,255,0.1)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    x: [0, Math.random() * 40 - 20],
                    y: [0, Math.random() * 40 - 20],
                    opacity: [0, Math.random() * 0.2 + 0.6, Math.random() * 0.1 + 0.4],
                    scale: [1, Math.random() * 0.2 + 0.9, 1],
                  }}
                  transition={{
                    delay: delay,
                    duration: duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                />
              );
            })}
        </div>

        <motion.div
          className="absolute inset-0 bg-grid-white bg-grid-8 opacity-5"
          style={{
           
          }}
        />

        {/* Sophisticated Gradient Overlay */}
        <div className="absolute inset-0 opacity-15">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-500/10 to-rose-400/10"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          ></motion.div>
        </div>

        {/* Fine Gold Particle Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/80 opacity-80"></div>

        {/* Luxury Particles with Subtle Glow */}
        <div className="absolute inset-0 overflow-hidden">
          {isLoaded &&
            Array.from({ length: isMobile ? 10 : 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-xl"
                style={{
                  width: Math.random() * (isMobile ? 150 : 180) + 70,
                  height: Math.random() * (isMobile ? 150 : 180) + 70,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 4 === 0
                    ? 'radial-gradient(circle, rgba(254,240,138,0.15) 0%, rgba(251,191,36,0.05) 70%)' // Gold
                    : i % 4 === 1
                      ? 'radial-gradient(circle, rgba(250,250,250,0.12) 0%, rgba(226,232,240,0.04) 70%)' // Silver
                      : i % 4 === 2
                        ? 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(59,130,246,0.05) 70%)' // Blue
                        : 'radial-gradient(circle, rgba(214,188,250,0.15) 0%, rgba(168,85,247,0.05) 70%)', // Purple
                  boxShadow: i % 4 === 0
                    ? '0 0 35px 5px rgba(251,191,36,0.15)'
                    : i % 4 === 1
                      ? '0 0 35px 5px rgba(226,232,240,0.15)'
                      : i % 4 === 2
                        ? '0 0 35px 5px rgba(59,130,246,0.15)'
                        : '0 0 35px 5px rgba(168,85,247,0.15)',
                }}
                animate={{
                  x: [0, Math.random() * 60 - 30],
                  y: [0, Math.random() * 60 - 30],
                  opacity: [Math.random() * 0.2 + 0.7, Math.random() * 0.2 + 0.5, Math.random() * 0.2 + 0.7],
                }}
                transition={{
                  duration: Math.random() * 20 + 25,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: [0.4, 0.0, 0.2, 1], // Luxury-style easing
                }}
              />
            ))}
        </div>

        {/* Subtle Grid Pattern for Depth */}
        <div className="absolute inset-0 bg-grid-white bg-grid-8 opacity-5"></div>

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
                  staggerChildren: 0.25,
                },
              },
            }}
            className="space-y-10"
          >
            {/* Elegant Logo with Gold Accents */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="text-4xl md:text-7xl border border-white/20 backdrop-blur-md flex flex-col md:flex-row justify-center items-center py-6 px-8 font-extrabold leading-tight tracking-wider"
              style={{
                textShadow: "0 0 15px rgba(255,255,255,0.3), 0 0 30px rgba(59,130,246,0.3)",
                boxShadow: "0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)"
              }}
            >
              {/* Animated text reveal effect */}
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
                <RevealText staggerChildren={0.08} delay={0.8}>MAKE</RevealText>
              </div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white mx-0 md:mx-3">
                <RevealText staggerChildren={0.08} delay={1.2}>IT</RevealText>
              </div>

              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 mx-0 md:mx-3 my-2 md:my-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  textShadow: ["0 0 10px rgba(251,191,36,0.4)", "0 0 20px rgba(251,191,36,0.6)", "0 0 10px rgba(251,191,36,0.4)"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.4, 0.0, 0.2, 1],
                  delay: 1.5,
                }}
              >
                &
              </motion.span>

              <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
                <RevealText staggerChildren={0.08} delay={1.6}>MARKET</RevealText>
              </div>

              {/* Animated accents */}
              <motion.div
                className="absolute -right-4 -top-4 text-amber-200/60 text-2xl"
                animate={{
                  rotate: [0, 45, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
              >
                ✦
              </motion.div>
              <motion.div
                className="absolute -left-4 -bottom-4 text-blue-300/60 text-2xl"
                animate={{
                  rotate: [0, -45, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: [0.4, 0.0, 0.2, 1],
                  delay: 2,
                }}
              >
                ✧
              </motion.div>
            </motion.h1>

            {/* Sophisticated Navigation with Gold Accents */}
            <motion.nav
              variants={fadeIn}
              custom={0.5}
              className="text-lg md:text-xl font-medium my-10 md:my-16 flex justify-center md:justify-end gap-8 md:gap-14 backdrop-blur-md bg-white/5 rounded-full px-8 md:px-12 py-4 md:py-5 border border-white/10"
              style={{ boxShadow: "0 0 25px rgba(0,0,0,0.5), inset 0 0 1px rgba(255,255,255,0.1)" }}
              whileInView={{
                boxShadow: ["0 0 25px rgba(0,0,0,0.5), inset 0 0 1px rgba(255,255,255,0.1)",
                  "0 0 30px rgba(0,0,0,0.6), inset 0 0 2px rgba(255,255,255,0.15)",
                  "0 0 25px rgba(0,0,0,0.5), inset 0 0 1px rgba(255,255,255,0.1)"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              <Link href="/visuals" className="relative group cursor-pointer transition-colors duration-500">
                <span className="text-white/85 group-hover:text-amber-200 transition-colors duration-500">Visuals</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-amber-200 to-amber-300 group-hover:w-full transition-all duration-500"></span>
              </Link>
              <Link href="/marketing" className="relative group cursor-pointer transition-colors duration-500">
                <span className="text-white/85 group-hover:text-amber-200 transition-colors duration-500">Marketing</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-amber-200 to-amber-300 group-hover:w-full transition-all duration-500"></span>
              </Link>
              <Link href="/contact" className="relative group cursor-pointer transition-colors duration-500">
                <span className="text-white/85 group-hover:text-amber-200 transition-colors duration-500">Contact</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-amber-200 to-amber-300 group-hover:w-full transition-all duration-500"></span>
              </Link>
            </motion.nav>

            {/* Luxurious Description Box */}
            <motion.div
              variants={fadeIn}
              custom={1}
              className="bg-black/40 backdrop-blur-lg p-10 md:p-12 rounded-lg border border-white/10"
              style={{ boxShadow: "0 0 40px rgba(0,0,0,0.5), inset 0 0 2px rgba(255,255,255,0.05)" }}
              whileInView={{
                borderColor: ["rgba(255,255,255,0.1)", "rgba(251,191,36,0.1)", "rgba(255,255,255,0.1)"]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              <motion.p
                className="text-xl md:text-2xl text-gray-200 max-w-3xl font-light leading-relaxed tracking-wide"
                animate={{
                  color: ["rgba(229,231,235,1)", "rgba(255,255,255,1)", "rgba(229,231,235,1)"]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: [0.4, 0.0, 0.2, 1] }}
              >
                We provide <span className="font-medium text-amber-200">bespoke visual solutions</span> and
                <span className="font-medium text-blue-300"> strategic marketing</span> to elevate your brand presence.
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl text-gray-200 max-w-3xl font-light mt-8 leading-relaxed tracking-wide"
              >
                From exclusive distribution to cinematic productions,
                signature design to comprehensive brand strategy.
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl text-gray-200 max-w-3xl font-light mt-8 leading-relaxed tracking-wide"
              >
                We create <span className="italic">tailored experiences</span> and <span className="underline decoration-amber-200/50 decoration-1 underline-offset-4">distinctive campaigns</span> that deliver exceptional results, regardless of your market position.
              </motion.p>
            </motion.div>

            {/* Premium Services Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 pt-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/95 rounded-lg -z-10"
                    animate={{
                      scale: [1, 1.005, 1],
                      y: [0, -2, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: [0.4, 0.0, 0.2, 1],
                      delay: index * 0.5
                    }}
                  ></motion.div>
                  <div className="absolute inset-0 rounded-lg border border-white/5 backdrop-blur-sm overflow-hidden">
                    <motion.div
                      className={`absolute -inset-[200%] bg-gradient-to-r ${service.color} opacity-15 blur-3xl`}
                      animate={{
                        opacity: [0.15, 0.25, 0.15],
                        rotate: [0, 3, 0]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: [0.4, 0.0, 0.2, 1],
                        delay: index * 0.5
                      }}
                    ></motion.div>
                  </div>

                  <div className="relative p-10 md:p-12 z-10">
                    <motion.div
                      className="absolute top-8 right-8 md:top-10 md:right-10 text-3xl md:text-4xl text-amber-200/80"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 3, 0],
                        opacity: [0.8, 0.6, 0.8]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: [0.4, 0.0, 0.2, 1],
                        delay: index * 0.3
                      }}
                    >
                      {service.icon}
                    </motion.div>

                    <h3 className={`text-2xl md:text-3xl font-bold mb-6 tracking-wider bg-clip-text text-transparent bg-gradient-to-r ${index === 0 ? 'from-amber-200 to-yellow-400' : 'from-blue-300 to-indigo-400'}`}>
                      {service.title}
                    </h3>

                    <ul className="mt-10 md:mt-12 text-lg md:text-xl font-light space-y-6 md:space-y-7 text-gray-200">
                      {service.list.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center cursor-pointer transition-all duration-500"
                          animate={{
                            x: [0, 1, 0]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: [0.4, 0.0, 0.2, 1],
                            delay: idx * 0.3 + index * 0.5
                          }}
                        >
                          <span className="mr-3 opacity-85">{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <Link href={service.link} passHref>
                      <motion.div
                        className={`mt-12 md:mt-14 inline-flex items-center ${index === 0 ? 'text-amber-200' : 'text-blue-300'} font-medium cursor-pointer tracking-wide`}
                        animate={{
                          x: [0, 2, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: [0.4, 0.0, 0.2, 1],
                          delay: index * 0.3
                        }}
                      >
                        Explore Services
                        <motion.span
                          animate={{
                            x: [0, 3, 0]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: [0.4, 0.0, 0.2, 1],
                            delay: index * 0.3 + 0.5
                          }}
                        >
                          <ArrowRight className="ml-3 w-5 h-5" />
                        </motion.span>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

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