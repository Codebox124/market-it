import { portfolioVisualProjects, serviceDescriptions, serviceTitles } from "@/data/data";
import PortfolioClient from "./PortfolioClient";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const service = resolvedParams.service?.replace(/-/g, " ") ?? "";
  const title =`${serviceTitles[resolvedParams.service]}`
  const description = serviceDescriptions[resolvedParams.service] || "Discover our work in this category.";
  const canonicals = `https://www.makeitandmarket.com/marketing/${resolvedParams.service}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicals
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

const validServices = [
  "graphic-design",
  "video-editing",
  "photo-editing",
  "animation",
];

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const service = Array.isArray(resolvedParams.service)? resolvedParams.service.join("-"): resolvedParams.service ?? "";

  const formattedService = service.replace(/-/g, " ");
  const descriptionservice = serviceDescriptions[service] || "Discover our work in this category.";
  const projects = portfolioVisualProjects[service] || [];
  if (!validServices.includes(resolvedParams.service)) {
    notFound();
  }

  return (
    <PortfolioClient
      service={service}
      formattedService={formattedService}
      descriptionservice={descriptionservice}
      projects={projects}
    />
  );
}
