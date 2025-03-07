"use client";

import BackButton from "@/components/Button";
import { Eye, ArrowRight, Diamond, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const visualsPortfolio = [
    {
        title: "Video Editing",
        image: "/video-editing.png",
        description:
            "Cinematic storytelling through professional video post-production.",
        icon: "diamond",
    },
    {
        title: "Photo Editing",
        image: "/photo-editing.png",
        description: "Precision retouching and creative image enhancement.",
        icon: "star",
    },
    {
        title: "Graphic Design",
        image: "/graphic-design.png",
        description: "Innovative visual communication and brand identity design.",
        icon: "diamond",
    },
    {
        title: "Website Design",
        image: "/website-design.png",
        description: "Responsive, user-centric web experiences that convert.",
        icon: "star",
    },
];

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "diamond":
            return <Diamond className="h-6 w-6" />;
        case "star":
            return <Star className="h-6 w-6" />;
        default:
            return <Diamond className="h-6 w-6" />;
    }
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Visuals() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
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
                    <h1 className="text-6xl font-thin tracking-wider leading-tight mb-6">
                    Our
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-purple-400 font-medium mt-1">
                        Visuals Portfolio
                        </span>
                    </h1>
                    <div className="flex justify-center mt-6">
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                    </div>
                    <p className="mt-8 text-lg text-gray-300 max-w-2xl mx-auto italic font-light">
                    Transforming ideas into stunning visual experiences across multiple mediums.
                    </p>
                </motion.header>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000"
                >
                    {visualsPortfolio.map((item, index) => (
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
                            <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm p-2 rounded-full">
                                {getIcon(item.icon)}
                            </div>
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
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
                            <div className="p-8 relative">
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-800/40 to-transparent"></div>
                                <h2 className="text-xl tracking-wider uppercase font-light mb-3">{item.title}</h2>
                                <p className="text-gray-400 mb-6 text-sm font-light">{item.description}</p>
                                <a
                                    href="#"
                                    className="inline-flex items-center text-amber-400/80 hover:text-amber-300 transition-colors uppercase text-xs tracking-widest"
                                >
                                   View project <ArrowRight className="ml-2 h-3 w-3" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="mt-24 text-center"
                >
                    <a
                        href="#contact"
                        className="relative inline-block px-12 py-5 overflow-hidden group"
                    >
                        <span className="absolute top-0 left-0 w-full h-full bg-transparent border border-amber-700/50 translate-x-0 translate-y-0 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></span>
                        <span className="absolute top-0 left-0 w-full h-full bg-transparent border border-purple-700/50 translate-x-0 translate-y-0 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></span>
                        <span className="relative block text-amber-300 uppercase tracking-widest text-sm font-light">
                           Contact 
                        </span>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}