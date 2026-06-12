import fs from "fs";
import path from "path";
import WebsitesAppsClient from "./WebsitesAppsClient";

type Work = { src: string; category: string };

function categorize(name: string): string {
  const n = name.toLowerCase();
  if (/app|shifto|reelfriends|img_/.test(n)) return "App";
  if (/landing/.test(n)) return "Landing Page";
  if (/blog/.test(n)) return "Blog";
  return "Website";
}

function getWorks(): Work[] {
  const dir = path.join(process.cwd(), "public", "website");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => /\.webp$/i.test(f));
  } catch {
    files = [];
  }
  files.sort((a, b) => a.localeCompare(b));
  return files.map((f) => ({
    src: `/website/${f}`,
    category: categorize(f),
  }));
}

export default function WebsitesAppsPage() {
  const works = getWorks();
  return <WebsitesAppsClient works={works} />;
}
