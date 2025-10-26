import { serviceTitles, serviceDescriptions } from "@/data/data";

export default function Head({ params }: { params: { service: string } }) {
  const serviceKey = params.service;

  const title =
    serviceTitles[serviceKey] || "Marketing Portfolio | Make It & Market";
  const description =
    serviceDescriptions[serviceKey] ||
    "Explore our creative marketing portfolio including website and apps design, advertising, social media, flyer distribution."

  const url = `https://www.makeitandmarket.com/marketing/${serviceKey}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />
    </>
  );
}
