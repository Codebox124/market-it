"use client";

import { portfolioProjects, serviceDescriptions } from "@/data/data";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PortfolioPage() {
    const params = useParams();
    const service = Array.isArray(params?.service) ? params.service.join("-") : params?.service ?? "";
    const formattedService = service.replace(/-/g, " ");
    const description = (serviceDescriptions as Record<string, string>)[service] || "Discover our work in this category.";

    const projects = portfolioProjects[service];

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
                        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 uppercase tracking-wider relative animate-fade-in">
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
                            <div className="w-full max-w-6xl mx-auto relative">
                                {/* Enhanced Swiper */}
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        loop={true}
                                        navigation={{
                                            nextEl: ".custom-swiper-button-next",
                                            prevEl: ".custom-swiper-button-prev",
                                        }}
                                        pagination={{ 
                                            clickable: true,
                                            el: '.custom-pagination',
                                            bulletClass: 'custom-bullet',
                                            bulletActiveClass: 'custom-bullet-active'
                                        }}
                                        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                                        className="portfolio-swiper relative rounded-3xl overflow-hidden"
                                    >
                                        {projects.map((project, index) => (
                                            <SwiperSlide key={index} className="flex items-center justify-center py-8">
                                                <div className="w-full max-w-4xl group-slide">
                                                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] shadow-2xl">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-slide-hover:opacity-100 transition-opacity duration-500"></div>
                                                        <div className="relative p-8">
                                                            {project.video ? (
                                                                <iframe
                                                                    className="rounded-xl w-full h-[450px] md:h-[550px] shadow-2xl"
                                                                    src={project.video}
                                                                    title={project.title}
                                                                    frameBorder="0"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                ></iframe>
                                                            ) : (
                                                                <img
                                                                    src={project.image}
                                                                    alt={project.title}
                                                                    className="rounded-xl w-full h-[450px] md:h-[550px] object-cover shadow-2xl"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Custom Navigation Buttons */}
                                    <div className="custom-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-slate-600/30 rounded-full flex items-center justify-center cursor-pointer hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300 hover:scale-110 group">
                                        <svg className="w-6 h-6 text-white group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                        </svg>
                                    </div>
                                    <div className="custom-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-slate-600/30 rounded-full flex items-center justify-center cursor-pointer hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300 hover:scale-110 group">
                                        <svg className="w-6 h-6 text-white group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </div>

                                    {/* Custom Pagination */}
                                    <div className="custom-pagination flex justify-center mt-8 space-x-2"></div>
                                </div>
                            </div>
                        ) : (
                            // Enhanced Non-Animation Projects Grid
                            <div className="w-full">
                                <div className={`${projects.length === 1 ? "flex justify-center" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}`}>
                                    {projects.map((project, index) => (
                                        <div
                                            key={index}
                                            className={`group relative ${projects.length === 1 ? "max-w-2xl" : ""}`}
                                        >
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 shadow-xl hover:shadow-2xl">
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <div className="relative p-6">
                                                    {project.video ? (
                                                        <iframe
                                                            className="rounded-xl w-full h-80 shadow-lg"
                                                            src={project.video}
                                                            title={project.title}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                    ) : (
                                                        <img
                                                            src={project.image}
                                                            alt={project.title}
                                                            className="rounded-xl w-full h-80 object-contain mx-auto shadow-lg group-hover:scale-105 transition-transform duration-500"
                                                        />
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

            <style jsx global>{`
                .portfolio-swiper {
                    padding: 20px 0;
                }
                
                .portfolio-swiper .swiper-wrapper {
                    align-items: center;
                }
                
                .custom-bullet {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(148, 163, 184, 0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }
                
                .custom-bullet:hover {
                    background: rgba(59, 130, 246, 0.5);
                    transform: scale(1.1);
                }
                
                .custom-bullet-active {
                    background: linear-gradient(45deg, #3b82f6, #8b5cf6) !important;
                    transform: scale(1.3);
                    border-color: rgba(255, 255, 255, 0.2);
                }
                
                .portfolio-swiper .swiper-slide {
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out;
                }

                /* Hide default Swiper navigation */
                .portfolio-swiper .swiper-button-next,
                .portfolio-swiper .swiper-button-prev {
                    display: none;
                }
                
                .portfolio-swiper .swiper-pagination {
                    display: none;
                }
            `}</style>
        </div>
    );
}