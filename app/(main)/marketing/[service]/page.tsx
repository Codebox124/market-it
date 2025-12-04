import { portfolioMarketingProjects, serviceDescriptions, serviceTitles } from "@/data/data";
import PortfolioClient from "./PortfolioClient";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const service = resolvedParams.service?.replace(/-/g, " ").replace(/\//g, "-").replace(/[^a-z0-9-]/g, "") ?? "";
  const title =`${serviceTitles[resolvedParams.service]}`;
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
  "websites-apps",
  "advertising",
  "social-media",
  "flyer-distribution",
];

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const service = Array.isArray(resolvedParams.service)? resolvedParams.service.join("-"): resolvedParams.service ?? "";

  let formattedService = service.replace(/-/g, " ").replace(/\//g, " ").replace(/[^a-z0-9-]/g, " ");
  const descriptionservice = serviceDescriptions[service] || "Discover our work in this category.";
  const projects = portfolioMarketingProjects[service] || [];
  if (formattedService === "websites apps"){
    formattedService = formattedService.replace(/ /g, "/");
  }
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
