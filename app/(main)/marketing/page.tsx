import fs from "fs";
import path from "path";
import MarketingClient from "./MarketingClient";

type Work = { src: string; category: string; type?: "image" | "video" };

// Existing curated portfolio (lives in /advertising, /flyer, /social)
const curated: Work[] = [
  { src: "/advertising/ad 1.webp", category: "Advertising" },
  { src: "/flyer/2.webp", category: "Flyer" },
  { src: "/social/1.webp", category: "Social" },
  { src: "/advertising/ad 4.webp", category: "Advertising" },
  { src: "/flyer/7.webp", category: "Flyer" },
  { src: "/social/2.webp", category: "Social" },
  { src: "/advertising/ad preview.webp", category: "Advertising" },
  { src: "/flyer/10.webp", category: "Flyer" },
  { src: "/social/3.webp", category: "Social" },
  { src: "/advertising/brad campaign 2.webp", category: "Advertising" },
  { src: "/flyer/13.webp", category: "Flyer" },
  { src: "/social/4.webp", category: "Social" },
  { src: "/advertising/audie campaign.webp", category: "Advertising" },
  { src: "/flyer/18.webp", category: "Flyer" },
  { src: "/social/5.webp", category: "Social" },
  { src: "/advertising/port google ads kids matter.webp", category: "Advertising" },
  { src: "/flyer/20.webp", category: "Flyer" },
  { src: "/social/6.webp", category: "Social" },
];

function categorize(name: string): string {
  const n = name.toLowerCase();
  if (/flyer/.test(n)) return "Flyer";
  if (/ig-|social|investor|report|pitch/.test(n)) return "Social";
  return "Advertising";
}

// Auto-read every .webp / .mp4 dropped into /public/marketingSection
function readMarketingFolder(): Work[] {
  const dir = path.join(process.cwd(), "public", "marketingSection");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => /\.(webp|mp4)$/i.test(f));
  } catch {
    files = [];
  }
  files.sort((a, b) => a.localeCompare(b));
  return files.map((f) => ({
    src: `/marketingSection/${f}`,
    category: /\.mp4$/i.test(f) ? "Video" : categorize(f),
    type: /\.mp4$/i.test(f) ? ("video" as const) : ("image" as const),
  }));
}

export default function MarketingPage() {
  const works = [...curated, ...readMarketingFolder()];
  return <MarketingClient works={works} />;
}
