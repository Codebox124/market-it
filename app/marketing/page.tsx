"use client";

import Image from "next/image";
import { Rocket, Target, Share2, Send, ArrowRight } from "lucide-react";
import BackButton from "@/components/Button";
import { motion } from "framer-motion";

const marketingPortfolio = [
  {
    title: "Branding",
    image: "/branding.png",
    description:
      "Crafting unique brand identities that resonate and differentiate.",
    icon: Rocket,
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Advertising",
    image: "/advertising.png",
    description:
      "Strategic ad campaigns that capture attention and drive conversions.",
    icon: Target,
    color: "from-green-400 to-green-600",
  },
  {
    title: "Social Media",
    image: "/social-media.png",
    description: "Engaging social media management and content strategies.",
    icon: Share2,
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Flyer Distribution",
    image: "/flyer.png",
    description:
      "Targeted offline marketing to reach local and regional audiences.",
    icon: Send,
    color: "from-pink-400 to-pink-600",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Marketing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24">
      <BackButton />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <motion.div
          variants={fadeInUp}
          custom={0}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Elevate Your Brand with Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
              Marketing Solutions
            </span>
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl leading-relaxed">
            Our tailored marketing strategies help businesses build brand
            authority, engage audiences, and drive sales effectively.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {marketingPortfolio.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index + 1}
                whileHover={{ y: -10 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700/50"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-r ${item.color}`}
                  >
                    <IconComponent className="text-white" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <a
                    href="#"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={fadeInUp}
          custom={6}
          className="mt-20 text-center"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold rounded-lg shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            Get a Free Consultation
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
