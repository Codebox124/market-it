"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Animation variants
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
    title: "Brand Strategy",
    description:
      "Develop a cohesive brand identity that resonates with your target audience.",
    color: "from-green-400 to-green-600",
  },
  {
    title: "Content Creation",
    description:
      "Produce engaging visual and written content that tells your brand story.",
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Digital Marketing",
    description:
      "Implement data-driven campaigns that drive traffic and conversions.",
    color: "from-purple-400 to-purple-600",
  },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden">
        {/* Animated Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/hero.jpg")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {isLoaded &&
            Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-blue-400/20 blur-xl"
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl w-full px-6 md:px-12 text-center pt-24">
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
            <motion.h1
              variants={fadeIn}
              custom={0}
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
            >
              Elevate Your Brand <br />
              With{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300"
                animate={{
                  backgroundPosition: ["0% center", "100% center"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Strategic Design
              </motion.span>{" "}
              &{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300"
                animate={{
                  backgroundPosition: ["0% center", "100% center"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                }}
              >
                Marketing
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              custom={1}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light"
            >
              WE PROVIDE FULL-SERVICE VISUALS AND MARKETING SOLUTIONS TO HELP
              YOU ACHIEVE YOUR GOALS.
            </motion.p>

            {/* Services Section */}
            <motion.div
              variants={fadeIn}
              custom={2}
              className="flex flex-col md:flex-row justify-center gap-6 pt-8 md:mt-20"
            >
              <Link
                href="/visuals"
                className="group relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-lg shadow-xl hover:shadow-green-400/20 transition-all duration-300"
              >
                <span className="relative z-10">Visual Solutions</span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>

              <Link
                href="/marketing"
                className="group relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-lg shadow-xl hover:shadow-blue-400/20 transition-all duration-300"
              >
                <span className="relative z-10">Marketing Strategies</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeIn}
              custom={3}
              className="absolute bottom-10 left-1/2 transform md:-translate-y-20 -translate-x-1/2 text-white/70 cursor-pointer hover:text-white transition-colors"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm mb-2">Discover More</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown size={24} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We combine strategic thinking with creative execution to deliver
              results that exceed expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 border border-gray-700/50"
              >
                <div
                  className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-r ${service.color}`}
                >
                  <Check className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Brand?
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-10">
              Let's collaborate to create a strategy that drives results and
              sets you apart from the competition.
            </p>
            <Link
              href="#contact"
              className="inline-block px-8 py-4 bg-white text-blue-900 font-bold rounded-lg shadow-xl hover:shadow-blue-300/30 transition-all duration-300 text-lg"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
