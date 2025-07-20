"use client";

import { portfolioProjects, serviceDescriptions } from "@/data/data";
import { useParams } from "next/navigation";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Define the Project type
interface Project {
    title?: string;
    description?: string;
    image?: string;
    video?: string;
}

export default function PortfolioPage() {
    const params = useParams();
    const service = Array.isArray(params?.service) ? params.service.join("-") : params?.service ?? "";
    const formattedService = service.replace(/-/g, " ");
    const description = (serviceDescriptions as Record<string, string>)[service] || "Discover our work in this category.";
    const projects: Project[] = portfolioProjects[service];
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };
    
    // Function to modify video URLs to disable autoplay
    const getVideoUrl = (url: string | undefined): string | undefined => {
        if (!url) return url;

        // Handle Cloudinary URLs
        if (url.includes('cloudinary.com')) {
            const separator = url.includes('?') ? '&' : '?';
            return `${url}${separator}autoplay=false&controls=true`;
        }

        // Handle YouTube URLs
        if (url.includes('youtube.com/embed/') || url.includes('youtu.be/')) {
            const cleanUrl = url.split('?')[0];
            return `${cleanUrl}?autoplay=0&rel=0`;
        }

        // For other video platforms, add autoplay=0 if supported
        if (url.includes('vimeo.com')) {
            const separator = url.includes('?') ? '&' : '?';
            return `${url}${separator}autoplay=0`;
        }

        return url;
    };

    const openModal = (project: Project): void => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 px-6 py-24">
                <div className="flex flex-col items-center max-w-7xl mx-auto justify-center">
                    {/* Enhanced Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 uppercase tracking-wider relative">
                            {formattedService}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl -z-10 rounded-lg"></div>
                        </h1>
                        <div className="mt-6 max-w-4xl">
                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light tracking-wide">
                                {description}
                            </p>
                            <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
                        </div>
                    </div>

                    {projects ? (
                        service === "animation" ? (
                            <div className="w-full space-y-12">
                                {/* Enhanced Carousel for Animation Projects */}
                                <div className="relative">
                                    <Carousel
                                        responsive={responsive}
                                        showDots={false}
                                        autoPlay={true}
                                        autoPlaySpeed={3000}
                                        infinite={true}
                                        className="w-full mx-auto portfolio-carousel"
                                    >
                                        {projects.map((project, index) => (
                                            <div key={index} className="flex items-center justify-center px-4">
                                                <div className="w-full max-w-2xl group cursor-pointer" onClick={() => openModal(project)}>
                                                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-[1.05] shadow-2xl">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                        <div className="relative p-4">
                                                            {project.video ? (
                                                                <div className="relative">
                                                                    <iframe
                                                                        className="rounded-xl w-full h-[280px] shadow-xl pointer-events-none"
                                                                        src={getVideoUrl(project.video)}
                                                                        title={project.title}
                                                                        frameBorder="0"
                                                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowFullScreen
                                                                    ></iframe>
                                                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                                                <path d="M8 5v14l11-7z" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="relative">
                                                                    <img
                                                                        src={project.image}
                                                                        alt={project.title}
                                                                        className="rounded-xl w-full h-[280px] object-cover shadow-xl"
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>

                                {/* Enhanced Featured Video */}
                                {projects.some((p) => p.video) && (
                                    <div className="w-full max-w-3xl mx-auto">
                                        <div className="relative group cursor-pointer" onClick={() => openModal(projects.find((p) => p.video)!)}>
                                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500"></div>
                                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
                                                <div className="p-4">
                                                    <div className="relative">
                                                        <iframe
                                                            className="rounded-xl w-full h-[350px] shadow-2xl pointer-events-none"
                                                            src={getVideoUrl(projects.find((p) => p.video)?.video)}
                                                            title="Featured Animation"
                                                            frameBorder="0"
                                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M8 5v14l11-7z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Enhanced Non-Animation Projects Grid - Smaller Thumbnails
                            <div className="w-full">
                                <div className={`${projects.length === 1 ? "flex justify-center" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"}`}>
                                    {projects.map((project, index) => (
                                        <div
                                            key={index}
                                            className={`group relative cursor-pointer bg-blue-200 ${projects.length === 1 ? "max-w-md" : ""}`}
                                            onClick={() => openModal(project)}
                                        >
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 shadow-xl hover:shadow-2xl">
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <div className="relative p-3">
                                                    {project.video ? (
                                                        <div className="relative">
                                                            <iframe
                                                                className="rounded-xl w-full h-32 shadow-lg pointer-events-none"
                                                                src={getVideoUrl(project.video)}
                                                                title={project.title}
                                                                frameBorder="0"
                                                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                            ></iframe>
                                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M8 5v14l11-7z" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative">
                                                            <img
                                                                src={project.image}
                                                                alt={project.title}
                                                                className="rounded-xl w-full h-32 object-contain shadow-lg group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ) : (
                        // Enhanced Empty State
                        <div className="text-center py-20">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
                                </div>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                        </svg>
                                    </div>
                                    <p className="text-xl text-gray-400 font-light">
                                        No projects found for <span className="text-white font-medium">{formattedService}</span>
                                    </p>
                                    <p className="text-gray-500 mt-2">Check back soon for new additions</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Full View */}
            {isModalOpen && selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={closeModal}>
                    <div className="relative max-w-6xl w-full max-h-[90vh] overflow-auto">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-60 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                            <div className="p-6">
                                {selectedProject.video ? (
                                    <iframe
                                        className="rounded-xl w-full h-[70vh] shadow-2xl"
                                        src={getVideoUrl(selectedProject.video)}
                                        title={selectedProject.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="rounded-xl w-full max-h-[70vh] object-contain shadow-2xl mx-auto"
                                    />
                                )}
                                {selectedProject.title && (
                                    <h3 className="text-2xl font-bold text-white mt-4 text-center">{selectedProject.title}</h3>
                                )}
                                {selectedProject.description && (
                                    <p className="text-gray-300 mt-2 text-center">{selectedProject.description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .portfolio-carousel .react-multi-carousel-track {
                    padding: 10px 0;
                }
                
                .portfolio-carousel .react-multi-carousel-dot-list {
                    bottom: -50px;
                }
                
                .portfolio-carousel .react-multi-carousel-dot button {
                    background: rgba(148, 163, 184, 0.3);
                    border: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                
                .portfolio-carousel .react-multi-carousel-dot--active button {
                    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
                    transform: scale(1.2);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out;
                }

                /* Hide scrollbar but allow scrolling */
                .overflow-auto::-webkit-scrollbar {
                    display: none;
                }
                .overflow-auto {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}