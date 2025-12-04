import MarketingClient from "./MarketingClient";

export const metadata = {
  title: "Marketing Portfolio | Make It & Market",
  description:
    "Discover our marketing portfolio of website and app design, advertising, social media visuals, and flyer distribution that help businesses make real impact.",
  openGraph: {
    title: "Marketing Portfolio | Make It & Market",
    description:
      "Explore our portfolio in website design, advertising, social media visuals, and flyer distribution.",
    url: "https://www.makeitandmarket.com/marketing",
    type: "website",
    siteName: "Make It & Market",
    images: [
      {
        url: "https://www.makeitandmarket.com/og-marketing.jpg",
        width: 1200,
        height: 630,
        alt: "Marketing portfolio — Make It & Market",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Portfolio | Make It & Market",
    description:
      "Discover website design, ads, social media, and flyer projects in our marketing portfolio.",
    images: ["https://www.makeitandmarket.com/og-marketing.jpg"],
  },
};

export default function Page() {
  return <MarketingClient />;
}
