import fs from "fs";
import path from "path";
import ContentCreationClient from "./ContentCreationClient";

type Work = { src: string; category: string };

// Existing curated portfolio (lives in /graphic, /animation, /photo)
const curated: Work[] = [
  { src: "/graphic/3.webp", category: "Graphic" },
  { src: "/animation/1.webp", category: "Animation" },
  { src: "/photo/pic.webp", category: "Photo" },
  { src: "/graphic/4.webp", category: "Graphic" },
  { src: "/animation/4.webp", category: "Animation" },
  { src: "/photo/pic2.webp", category: "Photo" },
  { src: "/graphic/20.webp", category: "Graphic" },
  { src: "/animation/7.webp", category: "Animation" },
  { src: "/photo/pic3.webp", category: "Photo" },
  { src: "/graphic/biz card.webp", category: "Graphic" },
  { src: "/animation/10.webp", category: "Animation" },
  { src: "/photo/pic4.webp", category: "Photo" },
  { src: "/graphic/elon poster.webp", category: "Graphic" },
  { src: "/animation/13.webp", category: "Animation" },
  { src: "/photo/pic5.webp", category: "Photo" },
  { src: "/graphic/banner MICHAEL P.webp", category: "Graphic" },
  { src: "/animation/16.webp", category: "Animation" },
  { src: "/photo/pic6.webp", category: "Photo" },
  { src: "/graphic/Highball-RON_2.webp", category: "Graphic" },
  { src: "/animation/19.webp", category: "Animation" },
  { src: "/photo/pic7.webp", category: "Photo" },
];

function categorize(relPath: string): string {
  const n = relPath.toLowerCase();
  if (/\/animation\//.test(n)) return "Animation";
  if (/photo|colorgrade|retouch|fx\d/.test(n)) return "Photo";
  return "Graphic";
}

// Recursively collect every .webp under /public/content
function readContentFolder(): Work[] {
  const root = path.join(process.cwd(), "public", "content");
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
      } else if (/\.webp$/i.test(e.name)) {
        const rel = full
          .slice(path.join(process.cwd(), "public").length)
          .split(path.sep)
          .join("/");
        out.push({ src: rel, category: categorize(rel) });
      }
    }
  };
  walk(root);
  out.sort((a, b) => a.src.localeCompare(b.src));
  return out;
}

export default function ContentCreationPage() {
  const works = [...curated, ...readContentFolder()];
  return <ContentCreationClient works={works} />;
}
