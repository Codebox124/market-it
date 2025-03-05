
"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Animation Variants
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
    description:
      "Crafting a compelling identity that aligns with your audience and business goals.",
    color: "from-green-400 to-green-600",
    list: [
      "🎥 Video Editing",
      "📸 Photo Editing",
      "🎨 Graphic Design",
      "🌍 Website Design",
    ],
  },
  {
    title: "MARKETING",
    description:
      "We produce high-quality visual and written content tailored for engagement.",
    color: "from-blue-400 to-blue-600",
    list: [
      "🚀 Branding",
      "📢 Advertising",
      "📱 Social Media",
      "📄 Flyer Distribution",
    ],
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
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/hero.jpg")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-black/100"></div>
        </div>

        {/* Floating Particles */}
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
        <div className="relative z-10 max-w-6xl  w-full px-6 md:px-12  ">
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
              className="text-3xl md:text-7xl border-4 flex justify-center items-center py-2 font-extrabold space-x-2 leading-tight"
            >
              MAKE IT
              <motion.span className="text-green-400"> &</motion.span>

              <motion.span className="text-blue-400"> MARKET</motion.span>
            </motion.h1>

            <nav className="text-lg md:text-xl  font-medium mY-12 flex justify-end gap-8 text-gray-200">
              <span className="cursor-pointer hover:text-gray-900 transition duration-300">Visuals</span>
              <span className="cursor-pointer hover:text-gray-900 transition duration-300">Marketing</span>
              <span className="cursor-pointer hover:text-gray-900 transition duration-300">Contact</span>
            </nav>

            <motion.p
              variants={fadeIn}
              custom={1}
              className="text-xl md:text-2xl   text-gray-300 max-w-3xl  font-light"
            >
              We provide full-services Visuals and
              marketing solutions to help you achieve your goal.
            </motion.p>
            <motion.p
              variants={fadeIn}
              custom={1}
              className="text-xl md:text-2xl   text-gray-300 max-w-3xl  font-light"
            >
              From Handing Out Flyers to editing a film
              ,graphics design to solidifying business strategy
            </motion.p>
            <motion.p
              variants={fadeIn}
              custom={1}
              className="text-xl md:text-2xl   text-gray-300 max-w-3xl  font-light"
            >
              We craft custom content and marketing campaigns that get things done for you. No matter if you are large or small.
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
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>

              <Link
                href="/marketing"
                className="group relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-lg shadow-xl hover:shadow-blue-400/20 transition-all duration-300"
              >
                <span className="relative z-10">Marketing Strategies</span>
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
            </motion.div>

            {/* Scroll Down Indicator */}
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

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What We Offer
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <ul className="mt-6 text-xl font-medium space-y-4 text-gray-200">
                  {service.list.map((item, idx) => (
                    <li
                      key={idx}
                      className="hover:text-gray-200 cursor-pointer transition duration-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


// import Head from "next/head";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center bg-gray-100 text-gray-900 px-6">
//       <Head>
//         <title className="text-white bg-clip-text bg-gradient-to-r from-green-400 to-green-300">Make It & Market</title>
//         <meta name="description" content="Full-service visuals and marketing solutions." />
//       </Head>

//       {/* Header */}
//       <header className="w-full max-w-5xl text-center py-8">
//         <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-widest uppercase border-8 border-green-300 px-6 py-4 inline-block">
//           MAKE IT & MARKET
//         </h1>
//         <nav className="text-lg md:text-xl  font-medium mt-6 flex justify-center gap-8 text-gray-200">
//           <span className="cursor-pointer hover:text-gray-900 transition duration-300">Visuals</span>
//           <span className="cursor-pointer hover:text-gray-900 transition duration-300">Marketing</span>
//           <span className="cursor-pointer hover:text-gray-900 transition duration-300">Contact</span>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="text-center mt-16 max-w-3xl">
//         <p className="text-2xl leading-relaxed font-light text-gray-200">
//           Elevate your brand with high-end visuals and strategic marketing solutions.
//         </p>
//         <p className="text-xl leading-relaxed mt-6 font-light text-gray-200">
//           From cinematic video production to iconic branding...
//           <br />...we bring your vision to life with premium execution.
//         </p>
//         <p className="text-xl leading-relaxed mt-6 font-light text-gray-200">
//           Whether you're a startup or a legacy brand, we tailor our services for maximum impact.
//         </p>

//         {/* Visuals & Marketing Sections */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 text-left max-w-3xl">
//           <Link href='/visuals'>
//             <div className="bg-white shadow-xl p-8 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
//               <h2 className="font-bold text-3xl border-b-4 border-gray-900 inline-block pb-2">
//                 VISUALS
//               </h2>
// <ul className="mt-6 text-xl font-medium space-y-4 text-gray-800">
//   <li className="hover:text-gray-900 cursor-pointer transition duration-300">🎥 Video Editing</li>
//   <li className="hover:text-gray-900 cursor-pointer transition duration-300">📸 Photo Editing</li>
//   <li className="hover:text-gray-900 cursor-pointer transition duration-300">🎨 Graphic Design</li>
//   <li className="hover:text-gray-900 cursor-pointer transition duration-300">🌍 Website Design</li>
// </ul>
//             </div>

//           </Link>

//           <Link href='marketing'>
//             <div className="bg-white shadow-xl p-8 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
//               <h2 className="font-bold text-3xl border-b-4 border-gray-900 inline-block pb-2">
//                 MARKETING
//               </h2>
//               <ul className="mt-6 text-xl font-medium space-y-4 text-gray-800">
//                 <li className="hover:text-gray-900 cursor-pointer transition duration-300">📢 Branding</li>
//                 <li className="hover:text-gray-900 cursor-pointer transition duration-300">📈 Advertising</li>
//                 <li className="hover:text-gray-900 cursor-pointer transition duration-300">💬 Social Media</li>
//                 <li className="hover:text-gray-900 cursor-pointer transition duration-300">📰 Flyer Distribution</li>
//               </ul>
//             </div>
//           </Link>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="mt-20 text-center text-gray-600 text-lg pb-8">
//         © {new Date().getFullYear()} Make It & Market. All rights reserved.
//       </footer>
//     </div>
//   );
// }

