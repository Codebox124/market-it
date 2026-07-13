import fs from "fs";
import path from "path";
import crypto from "crypto";
import ContentCreationClient from "./ContentCreationClient";
import { interleaveByCategory } from "@/utils/portfolio";

type Work = { src: string; category: string; type?: "image" | "video" };

const VIDEO_RE = /\.(mp4|webm)$/i;
const MEDIA_RE = /\.(webp|mp4|webm)$/i;

// Category is used only to spread the grid for visual variety — it is no
// longer shown as a label on the tiles.
function categorize(relPath: string): string {
  const n = relPath.toLowerCase();
  if (VIDEO_RE.test(n)) return "Video";
  if (/\/animation\//.test(n)) return "Animation";
  if (/photo|colorgrade|retouch|fx\d/.test(n)) return "Photo";
  return "Graphic";
}

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
  const works = interleaveByCategory(readContentFolder());
  return <ContentCreationClient works={works} />;
}
