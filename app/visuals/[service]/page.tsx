"use client";

import { portfolioProjects, serviceDescriptions } from "@/data/data";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

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
    const description = serviceDescriptions[service] || "Discover our work in this category.";
    const projects: Project[] = portfolioProjects[service] || [];
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

    // Animation effect for grid items
    useEffect(() => {
        const timer = setTimeout(() => {
            projects.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleProjects(prev => [...prev, index]);
                }, index * 100);
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [projects]);
    
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-gray-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute top-32 right-32 w-24 h-24 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 left-32 w-32 h-32 bg-gradient-to-br from-pink-300/20 to-orange-300/20 rounded-full blur-xl"></div>

            <div className="relative z-10 px-6 py-24">
                <div className="flex flex-col items-center max-w-7xl mx-auto justify-center">
                    {/* Enhanced Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 uppercase tracking-wider relative mb-6">
                            {formattedService}
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-100/30 to-purple-100/30 blur-2xl -z-10 rounded-2xl"></div>
                        </h1>
                        <div className="max-w-4xl mx-auto">
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light tracking-wide">
                                {description}
                            </p>
                            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                        </div>
                    </div>

                    {projects && projects.length > 0 ? (
                        service === "animation" ? (
                            /* Animation projects with special layout */
                            <div className="w-full space-y-12">
                                {/* Featured large video */}
                                {projects.some((p) => p.video) && (
                                    <div className="w-full max-w-4xl mx-auto mb-16">
                                        <div 
                                            className="relative group cursor-pointer" 
                                            onClick={() => openModal(projects.find((p) => p.video)!)}
                                            style={{
                                                opacity: visibleProjects.includes(0) ? 1 : 0,
                                                transform: visibleProjects.includes(0) ? 'translateY(0px)' : 'translateY(50px)',
                                                transition: 'all 0.8s ease-out'
                                            }}
                                        >
                                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-cyan-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                                            <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200/80 shadow-lg shadow-gray-300/30 hover:shadow-2xl hover:shadow-gray-400/30 transition-all duration-700">
                                                <div className="p-6">
                                                    <div className="relative">
                                                        <iframe
                                                            className="rounded-2xl w-full h-[400px] shadow-xl pointer-events-none"
                                                            src={getVideoUrl(projects.find((p) => p.video)?.video)}
                                                            title="Featured Animation"
                                                            frameBorder="0"
                                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                                                            <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                                                <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
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

                                {/* Grid of remaining projects */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {projects.slice(1).map((project, index) => (
                                        <div
                                            key={index}
                                            className="group relative cursor-pointer"
                                            onClick={() => openModal(project)}
                                            style={{
                                                opacity: visibleProjects.includes(index + 1) ? 1 : 0,
                                                transform: visibleProjects.includes(index + 1) ? 'translateY(0px)' : 'translateY(30px)',
                                                transition: `all 0.8s ease-out ${(index + 1) * 0.1}s`
                                            }}
                                        >
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-cyan-200/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                            <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200/60 hover:border-blue-300/60 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50">
                                                <div className="relative p-4">
                                                    {project.video ? (
                                                        <div className="relative">
                                                            <iframe
                                                                className="rounded-xl w-full h-48 shadow-lg pointer-events-none"
                                                                src={getVideoUrl(project.video)}
                                                                title={project.title}
                                                                frameBorder="0"
                                                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                            ></iframe>
                                                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                                                <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                                                    <svg className="w-6 h-6 text-blue-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
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
                                                                className="rounded-xl w-full h-48 object-cover shadow-lg group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                                                <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        ) : (
                            /* Regular projects grid */
                            <div className="w-full">
                                <div className={`${projects.length === 1 ? "flex justify-center" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"}`}>
                                    {projects.map((project, index) => (
                                        <div
                                            key={index}
                                            className={`group relative cursor-pointer ${projects.length === 1 ? "max-w-md" : ""}`}
                                            onClick={() => openModal(project)}
                                            style={{
                                                opacity: visibleProjects.includes(index) ? 1 : 0,
                                                transform: visibleProjects.includes(index) ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.95)',
                                                transition: `all 0.6s ease-out ${index * 0.1}s`
                                            }}
                                        >
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-cyan-200/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                            <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200/60 hover:border-blue-300/60 transition-all duration-500 hover:transform hover:scale-105 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50">
                                                <div className="relative">
                                                    {project.video ? (
                                                        <div className="relative">
                                                            <iframe
                                                                className="rounded-xl w-full h-36 shadow-lg pointer-events-none"
                                                                src={getVideoUrl(project.video)}
                                                                title={project.title}
                                                                frameBorder="0"
                                                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                            ></iframe>
                                                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                                                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                                                    <svg className="w-5 h-5 text-blue-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
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
                                                                className="rounded-xl w-full h-36 object-cover shadow-lg group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                                                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        /* Enhanced Empty State */
                        <div className="text-center py-24">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
                                </div>
                                <div className="relative z-10">
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl text-gray-700 font-semibold mb-2">No Projects Yet</h2>
                                    <p className="text-lg text-gray-500 mb-1">
                                        No projects found for <span className="text-gray-700 font-medium">{formattedService}</span>
                                    </p>
                                    <p className="text-gray-400">Check back soon for new additions</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Full View */}
            {isModalOpen && selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={closeModal}>
                    <div className="relative max-w-6xl w-full max-h-[90vh] overflow-auto">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-60 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:text-gray-900 transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-sm border border-gray-200/80 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                            <div className="p-6">
                                {selectedProject.video ? (
                                    <iframe
                                        className="rounded-2xl w-full h-[70vh] shadow-2xl"
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
                                        className="rounded-2xl w-full max-h-[70vh] object-contain shadow-2xl mx-auto"
                                    />
                                )}
                               
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
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