"use client";

import { ArrowRight, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { title } from "process";
import LatestBlogs from "@/components/home/LatestBlogs";

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

interface Project {
  title?: string;
  descriptionservice?: string;
  image?: string;
  video?: string;
}

const visualsPortfolio = [
  {
    title: "Graphic Design",
    image: "/graphic-design.png",
    descriptionservice:
      "Creative graphic design services spanning logos, flyers, books, film, PowerPoint, business cards, products, menus and artwork",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "Video Editing",
    image: "/video-editing.webp",
    descriptionservice:
      "Video editing for commercials, films, music videos and social media. Services include cleanup, captions, color grading, music, sound and effects.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Photo Editing",
    image: "/photo-editing.png",
    descriptionservice:
      "Profesional photo editing and retouching services to enhance quality, adjust color, add text, replace unwanted items or combine multiple images.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Animation",
    image: "/1.png",
    descriptionservice:
      "Creating 2D and 3D animation revolved around characters, environments, modeling, motion and conceptualizing to give life to your vision.",
    gradient: "from-orange-500/20 to-red-500/20",
  },
];
const marketingPortfolio = [
  {
    title: "Websites/Apps",
    image: "/website-design.jpg",
    descriptionservice:
      "Responsive web and app development to claim your place within the digital space, whether it's for business, pleasure or a cause.",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    title: "Advertising",
    image: "/advertising.webp",
    descriptionservice:
      "Promotional work to target your audience through methods such as Google Ads, social media outreach, email blasts and mass text messaging.",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    title: "Social Media",
    image: "/social-media.jpg",
    descriptionservice:
      "All-around social media consulting, management and content creation to assist with growing your audience engagement across all popular platforms.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Flyer Distribution",
    image: "/flyer.jpg",
    descriptionservice:
      "Targeted flyer distribution campaigns to reach local and global audiences with high-impact printed marketing materials.",
    icon: "feather",
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
];

const ClientPortfolio = [
  {
    image: "/clientShowcase/client (1).png",
    title: "client1",
  },
  {
    image: "/clientShowcase/client (2).png",
    title: "client2",
  },
  {
    image: "/clientShowcase/client (3).png",
    title: "client3",
  },
  {
    image: "/clientShowcase/client (4).png",
    title: "client4",
  },
  {
    image: "/clientShowcase/client (5).png",
    title: "client5",
  },
  {
    image: "/clientShowcase/client (6).png",
    title: "client6",
  },
  {
    image: "/clientShowcase/client (7).png",
    title: "client7",
  },
  {
    image: "/clientShowcase/client (8).png",
    title: "client8",
  },
  {
    image: "/clientShowcase/client (9).png",
    title: "client9",
  },
  {
    image: "/clientShowcase/client (10).png",
    title: "client10",
  },
  {
    image: "/clientShowcase/client (11).png",
    title: "client11",
  },
  {
    image: "/clientShowcase/client (12).png",
    title: "client12",
  },
  {
    image: "/clientShowcase/client (13).png",
    title: "client13",
  },
  {
    image: "/clientShowcase/client (14).png",
    title: "client14",
  },
  {
    image: "/clientShowcase/client (15).png",
    title: "client15",
  },
  {
    image: "/clientShowcase/client (16).png",
    title: "client16",
  },
  {
    image: "/clientShowcase/client (17).png",
    title: "client17",
  },
  {
    image: "/clientShowcase/client (18).png",
    title: "client18",
  },
  {
    image: "/clientShowcase/client (19).png",
    title: "client19",
  },
  {
    image: "/clientShowcase/client (20).png",
    title: "client20",
  },
  {
    image: "/clientShowcase/client (21).png",
    title: "client21",
  },
  {
    image: "/clientShowcase/client (22).png",
    title: "client22",
  },
  {
    image: "/clientShowcase/client (23).png",
    title: "client23",
  },
  {
    image: "/clientShowcase/client (24).png",
    title: "client24",
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
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const canvasRef = useRef(null);
  const animationRef = useRef<number | null>(null);
  const [particles, setParticles] = useState<
    {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: number;
      opacity: number;
    }[]
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

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || particles.length === 0) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Refined color palette - more sophisticated
    const colors = [
      "rgba(148, 163, 184, 0.4)", // Slate
      "rgba(156, 163, 175, 0.4)", // Gray
      "rgba(209, 213, 219, 0.3)", // Light gray
      "rgba(229, 231, 235, 0.2)", // Very light gray
    ];

    const drawCircle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      opacity: number
    ) => {
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded, particles, isMobile]);

  return (
    <>
      <section className="relative min-h-screen w-full pt-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Animated background canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />

        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_60%)]" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-2xl" />

        {/* Main content */}
        <div className="relative z-10 max-w-7xl xl:max-w-[87%] w-full px-6 lg:px-12 py-10 xl:py-4">
          <div className="space-y-16 xl:space-y-4">
            {/* Hero title */}
            <div className="text-center space-y-8">
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
                          repeatDelay: 0.4,
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
                    duration: 3,
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
                        "0 0 10px rgba(16,185,129,0.7)",
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
                    MARKET
                  </motion.span>
                </motion.h1>
              </div>

              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                  Effective marketing solutions and versatile creative services
                  for
                  <span className="text-gray-900 font-medium"> businesses</span>
                  ,<span className="text-gray-900 font-medium"> artists</span>,
                  and
                  <span className="text-gray-900 font-medium">
                    {" "}
                    visionaries
                  </span>
                </h2>
              </div>
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-4 h-full">
              {visualsPortfolio.map((item, index) => (
                <Link
                  href={`/visuals/${item.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/\//g, "-")
                    .replace(/[^a-z0-9-]/g, "")}`}
                  key={index}
                >
                  <div
                    key={index}
                    className="group cursor-pointer"
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      transform:
                        hoveredIndex === index
                          ? "translateY(-12px)"
                          : "translateY(0px)",
                      transition: "transform 0.3s ease-out",
                    }}
                  >
                    <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100/80 hover:shadow-2xl hover:shadow-gray-300/30 transition-all duration-500">
                      {/* Image */}
                      <div className="relative h-48 xl:h-36 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div
                            className={`bg-white/90 backdrop-blur-md p-4 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg border border-white/20`}
                          ></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 xl:p-3 space-y-4 xl:space-y-1 flex flex-col flex-grow">
                        <h3 className="text-lg xl:text-base font-semibold text-gray-900 tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-6 xl:line-clamp-4">
                          {item.descriptionservice}
                        </p>

                        <div
                          className={`flex mt-auto items-center text-sm font-semibold pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        >
                          <span>Explore Services</span>
                          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Gradient accent border on hover */}
                      <div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-r  to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                      />
                    </div>
                  </div>
                </Link>
              ))}
              {marketingPortfolio.map((item, index) => (
                <Link
                  href={`/marketing/${item.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/\//g, "-")
                    .replace(/[^a-z0-9-]/g, "")}`}
                  key={index}
                >
                  <div
                    key={index}
                    className="group cursor-pointer"
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      transform:
                        hoveredIndex === index
                          ? "translateY(-12px)"
                          : "translateY(0px)",
                      transition: "transform 0.3s ease-out",
                    }}
                  >
                    <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg shadow-gray-200/50 border border-gray-100/80 hover:shadow-2xl hover:shadow-gray-300/30 transition-all duration-500">
                      {/* Image */}
                      <div className="relative h-48 xl:h-36 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div
                            className={`bg-white/90 backdrop-blur-md p-4 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg border border-white/20`}
                          ></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 xl:p-3 space-y-4 xl:space-y-1">
                        <h3 className="text-lg xl:text-base font-semibold text-gray-900 tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-6 xl:line-clamp-4">
                          {item.descriptionservice}
                        </p>

                        <div
                          className={`flex items-center text-sm font-semibold pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        >
                          <span>Explore Services</span>
                          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Gradient accent border on hover */}
                      <div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-r  to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Showcase Section */}
      <section className="relative py-10 bg-gradient-to-b from-white via-blue-50/10 to-white">
        <div className="max-w-7xl xl:max-w-[87%] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
          >
            CLIENTS
          </motion.h2>

          <div
            className={`${
              ClientPortfolio.length === 1
                ? "flex justify-center"
                : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
            }`}
          >
            {ClientPortfolio.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => openModal(project)}
                className={`group relative cursor-pointer ${
                  ClientPortfolio.length === 1 ? "max-w-md" : ""
                }`}
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-cyan-200/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {/* Card */}
                <div
                  onClick={() => openModal(project)}
                  className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200/60 hover:border-blue-300/60 transition-all duration-500 hover:scale-[1.03] shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-xl bg-white flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-contain shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                        <Eye className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-800 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {project.descriptionservice ||
                        project.descriptionservice ||
                        ""}
                    </p>
                  </div> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {isModalOpen && selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <div
              className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-sm border border-gray-200/80 shadow-2xl p-6 md:p-16"
              onClick={(e) => e.stopPropagation()} // biar klik di dalam modal gak nutup
            >
              {/* Tombol close */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-60 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-gray-900 transition-colors shadow-lg"
              >
                ✕
              </button>

              {/* Gambar project */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                loading="lazy"
                className="rounded-2xl w-full max-h-[70vh] object-contain shadow-2xl mx-auto"
              />

              {/* Deskripsi */}
              {/* <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {selectedProject.title}
        </h3>
        <p className="text-gray-600 mt-2">
          {selectedProject.descriptionservice}
        </p>
      </div> */}
            </div>
          </div>
        )}
      </section>

      {/* Latest Blogs Section */}
      <LatestBlogs lang="en" />

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
