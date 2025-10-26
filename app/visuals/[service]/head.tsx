import { serviceTitles } from "@/data/data";

export default function Head({ params }: { params: { service: string } }) {
  const serviceKey = params.service;
  const title = serviceTitles[serviceKey] || "Visual Portfolio | Make It & Market";

  const descriptionMap: Record<string, string> = {
    "graphic-design": "Creative graphic design services delivering stunning visuals for branding and marketing.",
    "animation": "Custom animation projects that bring stories and brands to life with motion.",
    "video-editing": "Professional video editing for storytelling, marketing, and brand visuals.",
    "photo-editing": "High-quality photo editing for flawless, creative visual presentations."
  };

  const description =
    descriptionMap[serviceKey] ||
    "Explore our creative portfolio of visual design projects.";

  const url = `https://www.makeitandmarket.com/visuals/${serviceKey}`;

  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={url} />
    </>
  );
}
