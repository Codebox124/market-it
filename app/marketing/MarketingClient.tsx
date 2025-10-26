"use client";

import Image from "next/image";
import { ArrowRight, Eye } from "lucide-react";
import BackButton from "@/components/Button";
import { motion } from "framer-motion";
import Link from "next/link";

const marketingPortfolio = [
  {
    title: "Website and Apps Design",
    image: "/website-design.jpg",
    description:
      "User-friendly, custom websites and apps for portfolios, awareness, commerce, or blogging.",
  },
  {
    title: "Advertising",
    image: "/advertising.webp",
    description:
      "Implementing campaigns that locate and attract your prospective customers or supporters.",
  },
  {
    title: "Social Media",
    image: "/social-media.jpg",
    description:
      "Providing all-encompassing account management, outreach, content creation, and growth.",
  },
  {
    title: "Flyer Distribution",
    image: "/flyer.jpg",
    description:
      "Focused offline marketing to reach people in the real world, both locally and globally.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function MarketingClient() {
  return (
    <div className="min-h-screen bg-[#090e19] text-white pt-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-80 h-80 bg-rose-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>

      <BackButton />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="max-w-7xl mx-auto px-6 py-16 relative z-10"
      >
        <motion.div variants={fadeInUp} custom={0} className="text-center mb-20">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>

          <h1 className="md:text-6xl text-4xl font-thin tracking-wider leading-tight mb-6">
            <span className="bg-gradient-to-r text-transparent bg-clip-text from-blue-300 to-blue-600">
              MARKETING
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">
              Portfolio
            </span>
          </h1>

          <div className="flex justify-center mt-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>

          <h2 className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto italic font-light">
            Our custom marketing services help businesses, brands, and people
            build credibility, attention, and engagement.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-4 gap-8">
          {marketingPortfolio.map((item, index) => (
            <Link
              key={index}
              href={`/marketing/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <motion.div
                whileHover={{
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
                className="group backdrop-blur-sm overflow-hidden transition-all duration-500 bg-[#090e19]"
              >
                {/* Image Section */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700"
                    quality={80}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-amber-500 backdrop-blur-md p-3 transform rotate-45 scale-0 group-hover:scale-100 transition-transform duration-500">
                      <Eye className="text-black transform -rotate-45" size={24} />
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="p-8 relative flex flex-col h-[200px] justify-between">
                  <h2 className="text-lg tracking-wider uppercase font-light">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 text-sm font-light">{item.description}</p>

                  <span className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors uppercase text-xs tracking-widest absolute bottom-0">
                    Explore <ArrowRight className="ml-2 h-3 w-3" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div variants={fadeInUp} custom={6} className="mt-24 text-center">
          <a
            href="/contact"
            className="relative inline-block px-12 py-5 overflow-hidden group"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-transparent border border-amber-700/50 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></span>
            <span className="absolute top-0 left-0 w-full h-full bg-transparent border border-blue-700/50 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></span>
            <span className="relative block text-green-500 uppercase tracking-widest text-sm font-light">
              Contact
            </span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
