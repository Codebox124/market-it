"use client";

import BackButton from "@/components/Button";
import { Eye, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const visualsPortfolio = [
  {
    title: "Video Editing",
    image: "/video-editing.png",
    description:
      "Cinematic storytelling through professional video post-production.",
  },
  {
    title: "Photo Editing",
    image: "/photo-editing.png",
    description: "Precision retouching and creative image enhancement.",
  },
  {
    title: "Graphic Design",
    image: "/graphic-design.png",
    description: "Innovative visual communication and brand identity design.",
  },
  {
    title: "Website Design",
    image: "/website-design.png",
    description: "Responsive, user-centric web experiences that convert.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Visuals() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24">
      <BackButton />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300">
              Visuals Portfolio
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Transforming ideas into stunning visual experiences across multiple
            mediums.
          </p>
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
              whileHover={{ y: -10 }}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-green-500/10 transition-all duration-300 border border-gray-700/50"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSk..."
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-green-500 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="text-white" size={24} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
                >
                  View project <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-20 text-center"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-green-400 text-white font-bold rounded-lg shadow-xl hover:shadow-green-500/20 transition-all duration-300"
          >
            Start Your Visual Project
          </a>
        </motion.div>
      </div>
    </div>
  );
}
