"use client";

import { portfolioProjects } from "@/data/data";
import { useParams } from "next/navigation";

export default function PortfolioPage() {
    const params = useParams();
    const service = Array.isArray(params?.service) ? params.service.join("-") : params?.service ?? "";
    const formattedService = service.replace(/-/g, " ");

    const projects = portfolioProjects[service];

    return (
        <div className="bg-black h-full text-white px-6 py-24">
            <div className="flex flex-col items-center max-w-7xl mx-auto justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-amber-400 uppercase animate-fade-in">
                    {formattedService}
                </h1>

                {projects ? (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <div key={index} className="p-4 rounded-lg shadow-lg">
                                {project.video ? (

                                    <iframe
                                        className="rounded-lg w-[500px] h-80 "
                                        src={project.video}
                                        title={project.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    // Show Image
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="rounded-lg w-full object-contain h-full"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-6 text-gray-400">No projects found for {formattedService}.</p>
                )}
            </div>
        </div>
    );
}
