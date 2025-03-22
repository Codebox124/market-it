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
        <div className="bg-black h-full text-white px-6 py-24">
            <div className="flex flex-col items-center max-w-7xl mx-auto justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600 uppercase animate-fade-in">
                    {formattedService}
                </h1>
                <p className="text-gray-300 mt-4 text-center max-w-7xl">
                    {description}
                </p>

                {projects ? (
                    service === "animation" ? (
                        <>
                            {/* Swiper (Slider) Section */}
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                loop={true}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                className="w-full max-w-6xl flex items-center justify-center mx-auto mt-6"
                            >
                                {projects.map((project, index) => (
                                    <SwiperSlide key={index} className="flex items-center justify-center">
                                        <div className="w-full max-w-3xl p-4 rounded-lg shadow-xl bg-gray-900">
                                            {project.video ? (
                                                <iframe
                                                    className="rounded-lg w-full h-[500px]"
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
                                                    className="rounded-lg w-full h-[500px] object-cover"
                                                />
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))}
                                {/* Custom Navigation Buttons */}
                                <div className="swiper-button-prev text-4xl text-blue-500"></div>
                                <div className="swiper-button-next text-4xl text-blue-500"></div>
                            </Swiper>

                            {/* Video Below Swiper */}
                            {projects.some((p) => p.video) && (
                                <div className="mt-10 w-full max-w-4xl">
                                  
                                    <iframe
                                        className="rounded-lg w-full h-[500px]"
                                        src={projects.find((p) => p.video)?.video}
                                        title="Featured Animation"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </>
                    ) : (
                        // Non-Animation Projects Grid
                        <div className={`mt-6 ${projects.length === 1 ? "flex justify-center" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}`}>
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg shadow-lg ${projects.length === 1 ? "w-[500px] text-center" : ""}`}
                                >
                                    {project.video ? (
                                        <iframe
                                            className="rounded-lg w-full h-80"
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
                                            className="rounded-lg w-full h-80 object-contain mx-auto"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <p className="mt-6 text-gray-400">No projects found for {formattedService}.</p>
                )}
            </div>
        </div>
    );
}
