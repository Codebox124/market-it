import { serviceTitles, serviceDescriptions } from "@/data/data";

export default function Head({ params }: { params: { service: string } }) {
  const serviceKey = params.service;

  const title =
    serviceTitles[serviceKey] || "Visual Portfolio | Make It & Market";
  const description =
    serviceDescriptions[serviceKey] ||
    "Explore our creative visual portfolio including design, video, photo, and animation projects.";

  const url = `https://www.makeitandmarket.com/visuals/${serviceKey}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />
    </>
  );
}
