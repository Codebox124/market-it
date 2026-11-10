import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import MarketingClient from "./MarketingClient";
import { groupByCategory } from "@/utils/portfolio";

export const metadata: Metadata = {
  title: "Branding & Graphic Design Portfolio - Make It & Market",
  description:
    "Branding and graphic design by Make It & Market: logo design, brand messaging, advertising campaigns, flyers, business cards, menus, clothing, packaging, brochures, posters, books and cover art.",
  openGraph: {
    title: "Branding & Graphic Design Portfolio - Make It & Market",
    description:
      "Branding and graphic design by Make It & Market: logo design, brand messaging, advertising campaigns, flyers, business cards, menus, clothing, packaging, brochures, posters, books and cover art.",
    url: "https://www.makeitandmarket.com/marketing",
    type: "website",
    siteName: "Make It & Market",
  },
  twitter: {
    title: "Branding & Graphic Design Portfolio - Make It & Market",
    description:
      "Branding and graphic design by Make It & Market: logo design, brand messaging, advertising campaigns, flyers, business cards, menus, clothing, packaging, brochures, posters, books and cover art.",
    card: "summary_large_image",
    images: ["https://www.makeitandmarket.com/logo.png"],
  },
};

type Work = { src: string; category: string; type?: "image" | "video" };

const VIDEO_RE = /\.(mp4|webm)$/i;
const MEDIA_RE = /\.(webp|mp4|webm)$/i;

// Category groups like work together on the page (flyers with flyers,
// documents with documents). It is not shown as a label on the tiles.
function categorize(name: string): string {
  const n = name.toLowerCase();
  if (VIDEO_RE.test(n)) return "Video";
  if (/flyer/.test(n)) return "Flyers";
  if (/hoodie|winning/.test(n)) return "Clothing & Products";
  if (/ig-|instagram|social/.test(n)) return "Social Media";
  if (/investor|pitch/.test(n)) return "Presentations & Pitches";
  if (/brochure|report|itinerary|writing|sheet/.test(n))
    return "Documents & Brochures";
  if (/biz-card|business-card/.test(n)) return "Business Cards";
  return "Advertising";
}

const CATEGORY_ORDER = [
  "Flyers",
  "Advertising",
  "Clothing & Products",
  "Social Media",
  "Presentations & Pitches",
  "Documents & Brochures",
  "Business Cards",
  "Video",
];

// Auto-read every image/video in /public/marketingSection, skipping
// byte-identical duplicates.
function readMarketingFolder(): Work[] {
  const publicDir = path.join(process.cwd(), "public");
  const dir = path.join(publicDir, "marketingSection");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => MEDIA_RE.test(f));
  } catch {
    files = [];
  }
  files.sort((a, b) => a.localeCompare(b));

  const seen = new Set<string>();
  const out: Work[] = [];
  for (const f of files) {
    try {
      const hash = crypto
        .createHash("sha1")
        .update(fs.readFileSync(path.join(dir, f)))
        .digest("hex");
      if (seen.has(hash)) continue;
      seen.add(hash);
    } catch {
      /* if hashing fails, still include the file */
    }
    out.push({
      src: `/marketingSection/${f}`,
      category: categorize(f),
      type: VIDEO_RE.test(f) ? "video" : "image",
    });
  }
  return out;
}

export default function MarketingPage() {
  const works = groupByCategory(readMarketingFolder(), CATEGORY_ORDER);
  return <MarketingClient works={works} />;
}
