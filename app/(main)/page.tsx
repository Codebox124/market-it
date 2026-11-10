import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Branding, Design & Content Creation in New York | Make It & Market",
  description:
    "Make It & Market is a New York branding, design and content creation studio for a wide array of businesses and entrepreneurs — brand identity, graphic design, photography, video, animation and websites, produced to an enterprise standard.",
  alternates: {
    canonical: "https://www.makeitandmarket.com/",
  },
  openGraph: {
    title: "Branding, Design & Content Creation in New York | Make It & Market",
    description:
      "We build brands the market remembers. Identity, design, film and digital — conceived and produced under one roof, to an enterprise standard.",
    url: "https://www.makeitandmarket.com/",
    siteName: "Make It & Market",
    type: "website",
    images: [
      {
        url: "https://www.makeitandmarket.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Make It & Market",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Branding, Design & Content Creation in New York | Make It & Market",
    description:
      "We build brands the market remembers. Identity, design, film and digital — conceived and produced under one roof, to an enterprise standard.",
    images: ["https://www.makeitandmarket.com/og-image.jpg"],
  },
};

export default function Home() {
  return <HomePage />;
}
