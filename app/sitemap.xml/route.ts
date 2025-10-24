// /app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import { portfolioVisualProjects } from "@/data/data";
import { portfolioMarketingProjects } from "@/data/data";

const BASE_URL = "https://www.makeitandmarket.com";

// Dynamic pages dari portfolioProjects
const visualPages = Object.keys(portfolioVisualProjects).map(
  (service) => `visuals/${service}`
);
const marketingPages = Object.keys(portfolioMarketingProjects).map(
  (service) => `marketing/${service}`
);

const STATIC_PAGES = ["", "booking", "contact", "visuals", "marketing"];
const PAGES = [...STATIC_PAGES, ...visualPages, ...marketingPages];

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${PAGES.map((page) => `
      <url>
        <loc>${BASE_URL}/${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `).join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
