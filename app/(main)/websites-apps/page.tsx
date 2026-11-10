import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import WebsitesAppsClient from "./WebsitesAppsClient";
import { groupByCategory } from "@/utils/portfolio";

export const metadata: Metadata = {
  title: "Web, App & Content Creation Agency - Make It & Market",
  description:
    "Make It & Market is a full-service digital agency offering website & app development, content creation & marketing services. Transform your business today.",
  openGraph: {
    title: "Web, App & Content Creation Agency - Make It & Market",
    description:
      "Make It & Market is a full-service digital agency offering website & app development, content creation & marketing services. Transform your business today.",
    url: "https://www.makeitandmarket.com/websites-apps",
    type: "website",
    siteName: "Make It & Market",
  },
  twitter: {
    title: "Web, App & Content Creation Agency - Make It & Market",
    description:
      "Make It & Market is a full-service digital agency offering website & app development, content creation & marketing services. Transform your business today.",
    card: "summary_large_image",
    images: ["https://www.makeitandmarket.com/logo.png"],
  },
};

type Work = { src: string; category: string };

// Category groups like work together on the page (websites with
// websites, apps with apps). It is not shown as a label on the tiles.
function categorize(name: string): string {
  const n = name.toLowerCase();
  if (/app|shifto|reelfriends/.test(n)) return "Apps";
  if (/landing/.test(n)) return "Landing Pages";
  if (/blog/.test(n)) return "Blogs";
  return "Websites";
}

const CATEGORY_ORDER = ["Websites", "Apps", "Landing Pages", "Blogs"];

// Auto-read every .webp in /public/website, skipping byte-identical duplicates.
function getWorks(): Work[] {
  const dir = path.join(process.cwd(), "public", "website");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => /\.webp$/i.test(f));
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
    out.push({ src: `/website/${f}`, category: categorize(f) });
  }
  return out;
}

export default function WebsitesAppsPage() {
  const works = groupByCategory(getWorks(), CATEGORY_ORDER);
  return <WebsitesAppsClient works={works} />;
}
