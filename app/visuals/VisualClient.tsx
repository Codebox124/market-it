"use client";

import BackButton from "@/components/Button";
import { Eye, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const visualsPortfolio = [
  {
    title: "Graphic Design",
    image: "/graphic-design.png",
    descriptionservice: "Visual production covering an assortment of media, whether personal or business.",
  },
  {
    title: "Video Editing",
    image: "/video-editing.png",
    descriptionservice: "Post-production, including motion graphics, animation, VFX, sound, and color correction.",
  },
  {
    title: "Photo Editing",
    image: "/photo-editing.png",
    descriptionservice: "High-end image manipulation, creative effects, and quality improvement.",
  },
  {
    title: "Animation",
    image: "/1.png",
    descriptionservice: "Illustrating custom art, characters, environments, and motion for your project.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function VisualsClient() {
  return (
    <div className="min-h-screen bg-[#090e19] text-white pt-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-amber-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-indigo-900/20 rounded-full blur-3xl"></div>
      </div>

      <BackButton />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>
          <h1 className="md:text-6xl text-4xl font-thin tracking-wider leading-tight mb-6">
            <span className="bg-gradient-to-r text-transparent bg-clip-text from-emerald-300 to-emerald-500">
              VISUALS
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">
              Portfolio
            </span>
          </h1>

          <div className="flex justify-center mt-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>
          <h2 className="mt-8 text-lg text-gray-300 max-w-2xl mx-auto italic font-light">
            Our artistic skills transform ideas into fully realized content for your marketing plans or creative projects.
          </h2>
        </motion.header>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {visualsPortfolio.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                rotateY: 5,
                rotateX: 5,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
              className="group backdrop-blur-sm overflow-hidden transition-all duration-500 bg-[#090e19]"
            >
              <Link href={`/visuals/${item.title.toLowerCase().replace(/\s+/g, "-")}`} className="block h-full">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700"
                    quality={80}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-blue-600 backdrop-blur-md p-3 transform rotate-45 scale-0 group-hover:scale-100 transition-transform duration-500">
                      <Eye className="text-black transform -rotate-45" size={24} />
                    </div>
                  </div>
                </div>

                <div className="p-8 relative flex flex-col h-[170px] justify-between">
                  <h2 className="text-lg tracking-wider uppercase font-light">{item.title}</h2>
                  <p className="text-gray-400 text-sm font-light">{item.descriptionservice}</p>

                  <div className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors uppercase text-xs tracking-widest absolute bottom-0">
                    Explore <ArrowRight className="ml-2 h-3 w-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-24 text-center"
        >
          <a href="/contact" className="relative inline-block px-12 py-5 overflow-hidden group">
            <span className="absolute top-0 left-0 w-full h-full bg-transparent border border-amber-700/50 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></span>
            <span className="absolute top-0 left-0 w-full h-full bg-transparent border border-blue-700/50 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></span>
            <span className="relative block text-green-500 uppercase tracking-widest text-sm font-light">
              Contact
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
