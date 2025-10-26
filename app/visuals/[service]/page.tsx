import { portfolioVisualProjects, serviceDescriptions, serviceTitles } from "@/data/data";
import PortfolioClient from "./PortfolioClient";

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const service = resolvedParams.service?.replace(/-/g, " ") ?? "";
  const title = `${serviceTitles[resolvedParams.service]}| Portfolio`;
  const description = serviceDescriptions[resolvedParams.service] || "Discover our work in this category.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const service = Array.isArray(resolvedParams.service)? resolvedParams.service.join("-"): resolvedParams.service ?? "";

  const formattedService = service.replace(/-/g, " ");
  const descriptionservice = serviceDescriptions[service] || "Discover our work in this category.";
  const projects = portfolioVisualProjects[service] || [];

  return (
    <PortfolioClient
      service={service}
      formattedService={formattedService}
      descriptionservice={descriptionservice}
      projects={projects}
    />
  );
}
