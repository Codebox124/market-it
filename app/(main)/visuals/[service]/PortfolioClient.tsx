"use client";

import { useState, useEffect } from "react";
import { X, Play, Search } from "lucide-react";

interface Project {
  title?: string;
  descriptionservice?: string;
  image?: string;
  video?: string;
}

interface PortfolioClientProps {
  service: string;
  formattedService: string;
  descriptionservice: string;
  projects: Project[];
}

export default function PortfolioClient({
  service,
  formattedService,
  descriptionservice,
  projects,
}: PortfolioClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      projects.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProjects((prev) => [...prev, index]);
        }, index * 90);
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [projects]);

  const getVideoUrl = (url: string | undefined): string | undefined => {
    if (!url) return url;
    if (url.includes("cloudinary.com")) {
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}autoplay=false&controls=true`;
    }
    if (url.includes("youtube.com/embed/") || url.includes("youtu.be/")) {
      const cleanUrl = url.split("?")[0];
      return `${cleanUrl}?autoplay=0&rel=0`;
    }
    if (url.includes("vimeo.com")) {
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}autoplay=0`;
    }
    return url;
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] min-h-screen relative">
      <div className="noir-grain relative max-w-[1600px] mx-auto px-6 lg:px-10 pt-36 md:pt-44 pb-28 md:pb-40">
        {/* Editorial header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-24 md:mb-32">
          <div className="md:col-span-3">
            <p className="eyebrow">
              <span className="numeral">[ Visuals ]</span>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-[color:var(--color-ink-muted)] max-w-[14rem]">
              Selected work · Campaign archive
            </p>
          </div>
          <div className="md:col-span-9">
            <h1 className="display-xl text-[color:var(--color-ink)]">
              {formattedService}<span className="text-[color:var(--color-accent)]">.</span>
            </h1>
            <p className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-soft)] font-light">
              {descriptionservice}
            </p>
          </div>
        </div>

        {/* Project body */}
        {projects && projects.length > 0 ? (
          service === "animation" ? (
            <div className="space-y-16">
              {projects.some((p) => p.video) && (
                <div
                  className="relative group cursor-pointer"
                  onClick={() => openModal(projects.find((p) => p.video)!)}
                  style={{
                    opacity: visibleProjects.includes(0) ? 1 : 0,
                    transform: visibleProjects.includes(0)
                      ? "translateY(0)"
                      : "translateY(24px)",
                    transition:
                      "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[color:var(--color-noir-surface)]">
                    <iframe
                      className="w-full h-full pointer-events-none"
                      src={getVideoUrl(projects.find((p) => p.video)?.video)}
                      title="Featured"
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[color:var(--color-noir)]/40">
                      <div className="w-16 h-16 rounded-full bg-[color:var(--color-noir-ink)] flex items-center justify-center">
                        <Play
                          size={18}
                          strokeWidth={1.5}
                          className="text-[color:var(--color-noir)] ml-0.5"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {projects.slice(1).map((project, index) => (
                  <ProjectTile
                    key={index}
                    project={project}
                    visible={visibleProjects.includes(index + 1)}
                    index={index + 1}
                    onClick={() => openModal(project)}
                    getVideoUrl={getVideoUrl}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              className={
                projects.length === 1
                  ? "flex justify-center"
                  : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
              }
            >
              {projects.map((project, index) => (
                <ProjectTile
                  key={index}
                  project={project}
                  visible={visibleProjects.includes(index)}
                  index={index}
                  onClick={() => openModal(project)}
                  getVideoUrl={getVideoUrl}
                  fullWidth={projects.length === 1}
                />
              ))}
            </div>
          )
        ) : (
          <div className="border-t border-[color:var(--color-noir-line)] pt-20 text-center">
            <div className="mx-auto w-12 h-12 mb-6 flex items-center justify-center border border-[color:var(--color-noir-line-strong)]">
              <Search size={20} strokeWidth={1.25} className="text-[color:var(--color-noir-ink-muted)]" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-[color:var(--color-noir-ink)] mb-2">
              No projects yet
            </h2>
            <p className="text-[color:var(--color-noir-ink-muted)] text-sm tracking-wide">
              New work for{" "}
              <span className="text-[color:var(--color-noir-ink-soft)]">
                {formattedService}
              </span>{" "}
              is in production.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[color:var(--color-noir)]/90 backdrop-blur-sm p-4 md:p-8"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-[70] w-10 h-10 flex items-center justify-center text-[color:var(--color-noir-ink)] hover:bg-[color:var(--color-noir-ink)]/10 transition-colors duration-200"
            aria-label="Close"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
          <div
            className="relative max-w-6xl w-full max-h-[90vh] overflow-auto bg-[color:var(--color-noir)]"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedProject.video ? (
              <iframe
                className="w-full aspect-video"
                src={getVideoUrl(selectedProject.video)}
                title={selectedProject.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                loading="lazy"
                className="w-full max-h-[90vh] object-contain mx-auto"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- TILE ---
function ProjectTile({
  project,
  visible,
  index,
  onClick,
  getVideoUrl,
  fullWidth = false,
}: {
  project: Project;
  visible: boolean;
  index: number;
  onClick: () => void;
  getVideoUrl: (url: string | undefined) => string | undefined;
  fullWidth?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer ${fullWidth ? "max-w-2xl w-full" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.05}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 0.05}s`,
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-noir-surface)]">
        {project.video ? (
          <>
            <iframe
              className="w-full h-full pointer-events-none object-cover"
              src={getVideoUrl(project.video)}
              title={project.title}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[color:var(--color-noir)]/50">
              <div className="w-12 h-12 rounded-full bg-[color:var(--color-noir-ink)] flex items-center justify-center">
                <Play
                  size={14}
                  strokeWidth={1.5}
                  className="text-[color:var(--color-noir)] ml-0.5"
                  fill="currentColor"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[color:var(--color-noir)]/40">
              <div className="w-12 h-12 rounded-full bg-[color:var(--color-noir-ink)] flex items-center justify-center">
                <Search size={14} strokeWidth={1.5} className="text-[color:var(--color-noir)]" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
