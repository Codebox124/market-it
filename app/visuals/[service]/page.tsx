"use client";

import { portfolioProjects } from "@/data/data";
import { useParams } from "next/navigation";


export default function PortfolioPage() {
    const params = useParams();
    const service = Array.isArray(params?.service) ? params.service.join("-") : params?.service ?? "";
    const formattedService = service.replace(/-/g, " ");

    const projects = portfolioProjects[service];

    return (
        <div className=" bg-black text-white  flex flex-col items-center justify-center px-6 py-24">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-400 uppercase animate-fade-in">
                {formattedService} Portfolio
            </h1>
            <p className="text-gray-300 mt-4 text-center max-w-lg">
                Explore my past projects in {formattedService}.
            </p>

            {projects ? (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="rounded-lg w-full object-cover h-48"
                            />
                            <h2 className="mt-4 text-xl font-semibold">{project.title}</h2>
                            <p className="text-gray-400 text-sm">{project.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-6 text-gray-400">No projects found for {formattedService}.</p>
            )}
        </div>
    );
}
