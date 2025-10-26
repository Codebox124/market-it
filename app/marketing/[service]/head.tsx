import { serviceTitles } from "@/data/data";

export default function Head({ params }: { params: { service: string } }) {
  const serviceKey = params.service;
  const title = serviceTitles[serviceKey] || "Visual Portfolio | Make It & Market";

  const descriptionMap: Record<string, string> = {
    "advertising": "Discover creative advertising campaigns that drive real impact for your brand.",
    "social-media": "Engaging social media marketing visuals designed to boost your brand presence.",
    "flyer-distribution": "Targeted flyer distribution services to reach audiences locally and globally.",
    "website-and-apps-design": "Explore user-focused website and app designs that convert visitors into customers.",
};

  const description =
    descriptionMap[serviceKey] ||
    "Explore our creative portfolio of marketing and visual design projects.";

  const url = `https://www.makeitandmarket.com/marketing/${serviceKey}`;

  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={url} />
    </>
  );
}
