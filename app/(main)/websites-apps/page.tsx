import fs from "fs";
import path from "path";
import crypto from "crypto";
import WebsitesAppsClient from "./WebsitesAppsClient";
import { interleaveByCategory } from "@/utils/portfolio";

type Work = { src: string; category: string };

// Category is used only to spread the grid for visual variety — it is not
// shown as a label on the tiles.
function categorize(name: string): string {
  const n = name.toLowerCase();
  if (/app|shifto|reelfriends|img_/.test(n)) return "App";
  if (/landing/.test(n)) return "Landing Page";
  if (/blog/.test(n)) return "Blog";
  return "Website";
}

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
  const works = interleaveByCategory(getWorks());
  return <WebsitesAppsClient works={works} />;
}
