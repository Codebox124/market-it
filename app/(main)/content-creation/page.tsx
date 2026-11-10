import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import ContentCreationClient from "./ContentCreationClient";
import { groupByCategory } from "@/utils/portfolio";

export const metadata: Metadata = {
  title: "Content Creation Portfolio - Make It & Market",
  description:
    "Content creation by Make It & Market: video production and editing, 2D/3D animation and motion graphics, drawings and digital artwork, photography and retouching.",
  openGraph: {
    title: "Content Creation Portfolio - Make It & Market",
    description:
      "Content creation by Make It & Market: video production and editing, 2D/3D animation and motion graphics, drawings and digital artwork, photography and retouching.",
    url: "https://www.makeitandmarket.com/content-creation",
    type: "website",
    siteName: "Make It & Market",
  },
  twitter: {
    title: "Content Creation Portfolio - Make It & Market",
    description:
      "Content creation by Make It & Market: video production and editing, 2D/3D animation and motion graphics, drawings and digital artwork, photography and retouching.",
    card: "summary_large_image",
    images: ["https://www.makeitandmarket.com/logo.png"],
  },
};

type Work = { src: string; category: string; type?: "image" | "video" };

const VIDEO_RE = /\.(mp4|webm)$/i;
const MEDIA_RE = /\.(webp|mp4|webm)$/i;

// Category groups like work together on the page (animation with
// animation, photography with photography). It is not shown as a label
// on the tiles.
function categorize(relPath: string): string {
  const n = relPath.toLowerCase();
  if (VIDEO_RE.test(n)) return "Video";
  if (/\/animation\//.test(n)) return "Animation";
  if (/photo|colorgrade|retouch/.test(n)) return "Photography & Retouching";
  if (/cover|poster/.test(n)) return "Covers & Posters";
  if (/presentation|document/.test(n)) return "Presentations & Documents";
  if (/logo|branding/.test(n)) return "Logos & Branding";
  if (/3d/.test(n)) return "3D";
  if (/drawing|sketch/.test(n)) return "Drawing & Artwork";
  return "Graphic Design";
}

const CATEGORY_ORDER = [
  "Video",
  "Animation",
  "Photography & Retouching",
  "Covers & Posters",
  "Presentations & Documents",
  "Logos & Branding",
  "3D",
  "Drawing & Artwork",
  "Graphic Design",
];

// Read every image/video under /public/content, skipping byte-identical
// duplicates. Drop any video folder in here and it appears automatically.
function readContentFolder(): Work[] {
  const publicDir = path.join(process.cwd(), "public");
  const root = path.join(publicDir, "content");
  const seen = new Set<string>();
  const out: Work[] = [];

  const walk = (dir: string) => {
    let entries: fs.Dirent[] = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full);
        continue;
      }
      if (!MEDIA_RE.test(e.name)) continue;
      // Drop exact-duplicate files (same bytes under a different name).
      try {
        const hash = crypto
          .createHash("sha1")
          .update(fs.readFileSync(full))
          .digest("hex");
        if (seen.has(hash)) continue;
        seen.add(hash);
      } catch {
        /* if hashing fails, still include the file */
      }
      const rel = full.slice(publicDir.length).split(path.sep).join("/");
      out.push({
        src: rel,
        category: categorize(rel),
        type: VIDEO_RE.test(e.name) ? "video" : "image",
      });
    }
  };

  walk(root);
  out.sort((a, b) => a.src.localeCompare(b.src));
  return out;
}

export default function ContentCreationPage() {
  const works = groupByCategory(readContentFolder(), CATEGORY_ORDER);
  return <ContentCreationClient works={works} />;
}
