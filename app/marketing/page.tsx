"use client";

import Image from "next/image";
import { Diamond, Crown, Award, Feather, ArrowRight, Eye } from "lucide-react";
import BackButton from "@/components/Button";
import { motion } from "framer-motion";

const marketingPortfolio = [
    {
        title: "Branding",
        image: "/branding.png",
        description:
            "Crafting your brand identity strategy and public image from scratch or as-is",
        icon: Crown,
        accent: "border-amber-700/30",
    },
    {
        title: "Advertising",
        image: "/advertising.jpg",
        description:
            "Implementing campaigns that locate and attract your prospective customers or supporters",
        icon: Diamond,
        accent: "border-rose-700/30",
    },
    {
        title: "Social Media",
        image: "/social-media.jpg",
        description: "Providing all-encompassing account management outreach content creation and growth"
    },
    {
        title: "Flyer Distribution",
        image: "/flyer.jpg",
        description:
            "Focused offline marketing to reach people in the real world both local and distant ",
        icon: Feather,
        accent: "border-indigo-700/30",
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

export default function Marketing() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 overflow-hidden">
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
                        transition: {
                            staggerChildren: 0.15,
                        },
                    },
                }}
                className="max-w-7xl mx-auto px-6 py-16 relative z-10"
            >
                <motion.div
                    variants={fadeInUp}
                    custom={0}
                    className="text-center mb-20"
                >
                    <div className="flex justify-center mb-4">
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                    </div>
                    <h1 className="md:text-6xl text-4xl font-thin tracking-wider leading-tight mb-6">
                        Elevate
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-purple-400 font-medium mt-1">
                            Your Brand with Our Marketing Solutions
                        </span>
                    </h1>
                    <div className="flex justify-center mt-6">
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                    </div>
                    <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto italic font-light">
                        Our tailored marketing strategies help businesses build brand authority, engage audiences, and drive sales effectively.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
                    {marketingPortfolio.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{
                                rotateY: 5,
                                rotateX: 5,
                                scale: 1.02,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                            }}
                            className="group backdrop-blur-sm rounded-none overflow-hidden transition-all duration-500 border-t border-l border-amber-800/20 bg-gradient-to-br from-gray-900/80 to-black"
                        >
                            {/* Image Section */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSk..."
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="bg-amber-500 backdrop-blur-md p-3 transform rotate-45 scale-0 group-hover:scale-100 transition-transform duration-500">
                                        <Eye className="text-black transform -rotate-45" size={24} />
                                    </div>
                                </div>
                            </div>


                            <div className="p-8 relative flex flex-col h-[170px] justify-between">
                                <h2 className="text-lg tracking-wider uppercase font-light">{item.title}</h2>
                                <p className="text-gray-400 text-sm font-light">{item.description}</p>


                                <a
                                    href="#"
                                    className="inline-flex items-center text-amber-400/80 hover:text-amber-300 transition-colors uppercase text-xs tracking-widest absolute bottom-0"
                                >
                                    Explore <ArrowRight className="ml-2 h-3 w-3" />
                                </a>
                            </div>
                        </motion.div>


                    ))}
                </div>

                <motion.div
                    variants={fadeInUp}
                    custom={6}
                    className="mt-24 text-center"
                >
                    <a
                        href="/contact"
                        className="relative inline-block px-12 py-5 overflow-hidden group"
                    >
                        <span className="absolute top-0 left-0 w-full h-full bg-transparent border border-amber-700/50 translate-x-0 translate-y-0 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></span>
                        <span className="absolute top-0 left-0 w-full h-full bg-transparent border border-rose-700/50 translate-x-0 translate-y-0 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></span>
                        <span className="relative block text-amber-300 uppercase tracking-widest text-sm font-light">
                            Contact
                        </span>
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}