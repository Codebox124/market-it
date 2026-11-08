import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Branding, Design & Content Creation in New York | Make It & Market",
  description:
    "Make It & Market is a New York branding, design and content creation studio for mid-size and enterprise clients — brand identity, graphic design, photography, video, animation and websites, produced to an enterprise standard.",
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
  },
};

export default function Home() {
  return <HomePage />;
}
