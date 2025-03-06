"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
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
      "🌍 Website Design",
    ],
  },
  {
    title: "MARKETING",
    description: "We produce high-quality visual and written content tailored for engagement.",
    color: "from-blue-400 to-indigo-600",
    icon: "🚀",
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden">
        {/* Background Overlay with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("/hero.jpg")',
            transform: isLoaded ? `translate(${mousePosition.x / 100}px, ${mousePosition.y / 100}px)` : 'none',
            transition: 'transform 0.2s ease-out',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-black/100"></div>
        </div>

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-x"></div>
        </div>

        {/* Floating Particles with Glow */}
        <div className="absolute inset-0 overflow-hidden">
          {isLoaded &&
            Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-xl"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 3 === 0 
                    ? 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, rgba(59,130,246,0.1) 70%)' 
                    : i % 3 === 1 
                    ? 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(139,92,246,0.1) 70%)'
                    : 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(219,39,119,0.1) 70%)',
                  boxShadow: i % 3 === 0 
                    ? '0 0 30px 5px rgba(56,189,248,0.3)' 
                    : i % 3 === 1 
                    ? '0 0 30px 5px rgba(168,85,247,0.3)'
                    : '0 0 30px 5px rgba(236,72,153,0.3)',
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  scale: [1, Math.random() * 0.4 + 0.8, 1],
                }}
                transition={{
                  duration: Math.random() * 20 + 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
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
            {/* Glowing Logo */}
            <motion.h1
              variants={fadeIn}
              custom={0}
              className="text-3xl md:text-7xl border-4 border-white/30 backdrop-blur-sm flex justify-center items-center py-4 px-6 font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white"
              style={{
                textShadow: "0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(59,130,246,0.5)",
                boxShadow: "0 0 30px rgba(59,130,246,0.3), inset 0 0 20px rgba(59,130,246,0.2)"
              }}
            >
              MAKE IT
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 mx-2"
                animate={{ 
                  textShadow: ["0 0 10px rgba(16,185,129,0.7)", "0 0 20px rgba(16,185,129,0.9)", "0 0 10px rgba(16,185,129,0.7)"] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              > &</motion.span>

              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600"
                animate={{ 
                  textShadow: ["0 0 10px rgba(59,130,246,0.7)", "0 0 20px rgba(59,130,246,0.9)", "0 0 10px rgba(59,130,246,0.7)"] 
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              > MARKET</motion.span>
            </motion.h1>

            {/* Glassmorphism Navigation */}
            <motion.nav 
              variants={fadeIn}
              custom={0.5}
              className="text-lg md:text-xl font-medium my-12 flex justify-end gap-8 backdrop-blur-md bg-white/5 rounded-full px-8 py-4 border border-white/10"
              style={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
            >
              <span className="cursor-pointer hover:text-emerald-400 transition duration-300">Visuals</span>
              <span className="cursor-pointer hover:text-blue-400 transition duration-300">Marketing</span>
              <span className="cursor-pointer hover:text-purple-400 transition duration-300">Contact</span>
            </motion.nav>

            <motion.div
              variants={fadeIn}
              custom={1}
              className="bg-black/30 backdrop-blur-md p-8 rounded-2xl border border-white/10"
              style={{ boxShadow: "0 0 30px rgba(0,0,0,0.3)" }}
            >
              <motion.p
                className="text-xl md:text-2xl text-gray-200 max-w-3xl font-light leading-relaxed"
                animate={{ 
                  color: ["rgba(229,231,235,1)", "rgba(255,255,255,1)", "rgba(229,231,235,1)"] 
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                We provide <span className="font-semibold text-emerald-400">full-service Visuals</span> and
                <span className="font-semibold text-blue-400"> marketing solutions</span> to help you achieve your goal.
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl text-gray-200 max-w-3xl font-light mt-4 leading-relaxed"
              >
                From handing out flyers to editing a film,
                graphics design to solidifying business strategy.
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl text-gray-200 max-w-3xl font-light mt-4 leading-relaxed"
              >
                We craft <span className="italic">custom content</span> and <span className="underline decoration-blue-400 decoration-2 underline-offset-4">marketing campaigns</span> that get things done for you. No matter if you are large or small.
              </motion.p>
            </motion.div>

            {/* Services Section with Hover Effects */}
            <motion.div
              variants={fadeIn}
              custom={2}
              className="flex flex-col md:flex-row justify-center gap-6 pt-8 md:mt-20"
            >
              <Link
                href="/visuals"
                className="group relative overflow-hidden px-10 py-5 bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-semibold rounded-lg shadow-xl transition-all duration-500 hover:shadow-emerald-500/30 hover:scale-105"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <motion.span 
                  className="relative z-10 flex items-center"
                  whileHover={{ x: 5 }}
                >
                  Visual Solutions
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Link>

              <Link
                href="/marketing"
                className="group relative overflow-hidden px-10 py-5 bg-gradient-to-br from-blue-500 to-indigo-700 text-white font-semibold rounded-lg shadow-xl transition-all duration-500 hover:shadow-blue-500/30 hover:scale-105"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <motion.span 
                  className="relative z-10 flex items-center"
                  whileHover={{ x: 5 }}
                >
                  Marketing Strategies
                  <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.span>
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
                <span className="text-sm mb-2 font-light tracking-widest">DISCOVER MORE</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="bg-white/10 rounded-full p-2 backdrop-blur-sm border border-white/20"
                  style={{ boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
                >
                  <ChevronDown size={24} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
          <div className="absolute inset-0 bg-grid-white/5 bg-grid-8"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
        
        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block text-sm font-medium tracking-widest text-blue-400 uppercase mb-3 bg-blue-500/10 px-4 py-1 rounded-full">Our Services</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              What We Offer
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-2xl transform group-hover:scale-105 transition-all duration-300 -z-10"></div>
                <div className="absolute inset-0 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
                  <div className={`absolute -inset-[150%] bg-gradient-to-r ${service.color} opacity-30 blur-3xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                </div>
                
                <div className="relative p-8 md:p-10 z-10">
                  <div className="absolute top-6 right-6 text-4xl">{service.icon}</div>
                  
                  <h3 className={`text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${service.color}`}>
                    {service.title}
                  </h3>
                  
                  <ul className="mt-8 text-xl font-medium space-y-5 text-gray-200">
                    {service.list.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center group/item cursor-pointer transition-all duration-300 hover:translate-x-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="mr-3 opacity-80 group-hover/item:opacity-100">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.div 
                    className="mt-10 inline-flex items-center text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Featured Projects Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-24 bg-gradient-to-r from-black/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-10 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute -inset-[100%] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur-3xl opacity-30"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to elevate your brand?</h3>
                <p className="text-gray-300 md:text-lg">Let's create something extraordinary together.</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 font-medium rounded-lg flex items-center shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300"
              >
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
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





// "use client";

// import Link from "next/link";
// import { ArrowRight, Check, ChevronDown } from "lucide-react";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// // Animation Variants
// const fadeIn = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   }),
// };

// const services = [
//   {
//     title: "VISUALS",
//     description:
//       "Crafting a compelling identity that aligns with your audience and business goals.",
//     color: "from-green-400 to-green-600",
//     list: [
//       "🎥 Video Editing",
//       "📸 Photo Editing",
//       "🎨 Graphic Design",
//       "🌍 Website Design",
//     ],
//   },
//   {
//     title: "MARKETING",
//     description:
//       "We produce high-quality visual and written content tailored for engagement.",
//     color: "from-blue-400 to-blue-600",
//     list: [
//       "🚀 Branding",
//       "📢 Advertising",
//       "📱 Social Media",
//       "📄 Flyer Distribution",
//     ],
//   },
// ];

// export default function Home() {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden">
//         {/* Background Overlay */}
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: 'url("/hero.jpg")' }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-black/100"></div>
//         </div>

//         {/* Floating Particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           {isLoaded &&
//             Array.from({ length: 20 }).map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute rounded-full bg-blue-400/20 blur-xl"
//                 style={{
//                   width: Math.random() * 200 + 50,
//                   height: Math.random() * 200 + 50,
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                 }}
//                 animate={{
//                   x: [0, Math.random() * 100 - 50],
//                   y: [0, Math.random() * 100 - 50],
//                 }}
//                 transition={{
//                   duration: Math.random() * 10 + 10,
//                   repeat: Infinity,
//                   repeatType: "reverse",
//                   ease: "easeInOut",
//                 }}
//               />
//             ))}
//         </div>

//         {/* Content */}
//         <div className="relative z-10 max-w-6xl  w-full px-6 md:px-12  ">
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: { opacity: 0 },
//               visible: {
//                 opacity: 1,
//                 transition: {
//                   staggerChildren: 0.2,
//                 },
//               },
//             }}
//             className="space-y-8"
//           >
//             <motion.h1
//               variants={fadeIn}
//               custom={0}
//               className="text-3xl md:text-7xl border-4 flex justify-center items-center py-2 font-extrabold space-x-2 leading-tight"
//             >
//               MAKE IT
//               <motion.span className="text-green-400"> &</motion.span>

//               <motion.span className="text-blue-400"> MARKET</motion.span>
//             </motion.h1>

//             <nav className="text-lg md:text-xl  font-medium mY-12 flex justify-end gap-8 text-gray-200">
//               <span className="cursor-pointer hover:text-gray-900 transition duration-300">Visuals</span>
//               <span className="cursor-pointer hover:text-gray-900 transition duration-300">Marketing</span>
//               <span className="cursor-pointer hover:text-gray-900 transition duration-300">Contact</span>
//             </nav>

//             <motion.p
//               variants={fadeIn}
//               custom={1}
//               className="text-xl md:text-2xl   text-gray-300 max-w-3xl  font-light"
//             >
//               We provide full-services Visuals and
//               marketing solutions to help you achieve your goal.
//             </motion.p>
//             <motion.p
//               variants={fadeIn}
//               custom={1}
//               className="text-xl md:text-2xl   text-gray-300 max-w-3xl  font-light"
//             >
//               From Handing Out Flyers to editing a film
//               ,graphics design to solidifying business strategy
//             </motion.p>
//             <motion.p
//               variants={fadeIn}
//               custom={1}
//               className="text-xl md:text-2xl   text-gray-300 max-w-3xl  font-light"
//             >
//               We craft custom content and marketing campaigns that get things done for you. No matter if you are large or small.
//             </motion.p>

//             {/* Services Section */}
//             <motion.div
//               variants={fadeIn}
//               custom={2}
//               className="flex flex-col md:flex-row justify-center gap-6 pt-8 md:mt-20"
//             >
//               <Link
//                 href="/visuals"
//                 className="group relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-lg shadow-xl hover:shadow-green-400/20 transition-all duration-300"
//               >
//                 <span className="relative z-10">Visual Solutions</span>
//                 <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
//               </Link>

//               <Link
//                 href="/marketing"
//                 className="group relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-lg shadow-xl hover:shadow-blue-400/20 transition-all duration-300"
//               >
//                 <span className="relative z-10">Marketing Strategies</span>
//                 <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
//               </Link>
//             </motion.div>

//             {/* Scroll Down Indicator */}
//             <motion.div
//               variants={fadeIn}
//               custom={3}
//               className="absolute bottom-10 left-1/2 transform md:-translate-y-20 -translate-x-1/2 text-white/70 cursor-pointer hover:text-white transition-colors"
//               onClick={() => {
//                 window.scrollTo({
//                   top: window.innerHeight,
//                   behavior: "smooth",
//                 });
//               }}
//             >
//               <div className="flex flex-col items-center">
//                 <span className="text-sm mb-2">Discover More</span>
//                 <motion.div
//                   animate={{ y: [0, 10, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                 >
//                   <ChevronDown size={24} />
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-24 bg-gradient-to-b from-gray-900 to-black text-white">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               What We Offer
//             </h2>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {services.map((service, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
//               >
//                 <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
//                 <ul className="mt-6 text-xl font-medium space-y-4 text-gray-200">
//                   {service.list.map((item, idx) => (
//                     <li
//                       key={idx}
//                       className="hover:text-gray-200 cursor-pointer transition duration-300"
//                     >
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


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

