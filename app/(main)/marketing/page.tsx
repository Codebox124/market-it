import fs from "fs";
import path from "path";
import crypto from "crypto";
import MarketingClient from "./MarketingClient";
import { interleaveByCategory } from "@/utils/portfolio";

type Work = { src: string; category: string; type?: "image" | "video" };

const VIDEO_RE = /\.(mp4|webm)$/i;
const MEDIA_RE = /\.(webp|mp4|webm)$/i;

// Category is used only to spread the grid for visual variety — it is not
// shown as a label on the tiles.
function categorize(name: string): string {
  const n = name.toLowerCase();
  if (VIDEO_RE.test(n)) return "Video";
  if (/flyer/.test(n)) return "Flyer";
  if (/ig-|social|investor|report|pitch/.test(n)) return "Social";
  return "Advertising";
}

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
  const works = interleaveByCategory(readMarketingFolder());
  return <MarketingClient works={works} />;
}
