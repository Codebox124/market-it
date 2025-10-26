import { serviceTitles } from "@/data/data";

export default function Head({ params }: { params: { service: string } }) {
  const serviceKey = params.service;
  const title = serviceTitles[serviceKey] || "Visual Portfolio | Make It & Market";

  const descriptionMap: Record<string, string> = {
    "advertising": "Discover creative advertising campaigns that drive real impact for your brand.",
    "social-media": "Engaging social media marketing visuals designed to boost your brand presence.",
    "flyer-distribution": "Targeted flyer distribution services to reach audiences locally and globally.",
    "website-and-apps-design": "Explore user-focused website and app designs that convert visitors into customers.",
    "graphic-design": "Creative graphic design services delivering stunning visuals for branding and marketing.",
    "animation": "Custom animation projects that bring stories and brands to life with motion.",
    "video-editing": "Professional video editing for storytelling, marketing, and brand visuals.",
    "photo-editing": "High-quality photo editing for flawless, creative visual presentations."
  };

  const description =
    descriptionMap[serviceKey] ||
    "Explore our creative portfolio of marketing and visual design projects.";

  const url = `https://www.makeitandmarket.com/visuals/${serviceKey}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
    </>
  );
}
