import VisualsClient from "./VisualClient";

export const metadata = {
  title: "Visual Portfolio | Make It & Market",
  description:
    "Explore our creative visual portfolio featuring graphic design, video editing, photo enhancement, and custom animation projects for businesses and creators.",
  openGraph: {
    title: "Visual Portfolio | Make It & Market",
    description:
      "Explore our visual portfolio featuring graphic design, video editing, photography, and animation.",
    url: "https://www.makeitandmarket.com/visuals",
    type: "website",
    siteName: "Make It & Market",
    images: [
      {
        url: "https://www.makeitandmarket.com/logo-png",
        width: 1200,
        height: 630,
        alt: "Visual portfolio — Make It & Market",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Portfolio | Make It & Market",
    description:
      "Discover our creative works in graphic design, video editing, photo retouching, and animation.",
    images: ["https://www.makeitandmarket.com/logo.png"],
  },
};



export default async function Page() {
  return <VisualsClient />;
}
