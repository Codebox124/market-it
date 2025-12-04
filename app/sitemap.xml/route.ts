import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { portfolioVisualProjects, portfolioMarketingProjects } from "@/data/data";

const BASE_URL = "https://www.makeitandmarket.com";

const LANGUAGES = [
  "en", "id", "fr", "bn", "hk", "gu", "hi", "zh", 
  "ja", "ko", "ar", "pt", "es", "tl", "ur", "ru",
];

const GLOBAL_STATIC = ["", "booking", "contact", "visuals", "marketing"];

const visualPages = Object.keys(portfolioVisualProjects).map(
  (service) => `visuals/${service}`
);
const marketingPages = Object.keys(portfolioMarketingProjects).map(
  (service) => `marketing/${service}`
);

const ALL_GLOBAL_PAGES = [...GLOBAL_STATIC, ...visualPages, ...marketingPages];

export async function GET() {
  const globalUrls = ALL_GLOBAL_PAGES.map((page) => {
    return page ? `${BASE_URL}/${page}` : BASE_URL;
  });

  const langUrls = LANGUAGES.flatMap((lang) => [
    `${BASE_URL}/${lang}`,
    `${BASE_URL}/${lang}/blog`,
  ]);

  const query = `*[_type == "post"] {
    "slug": slug.current,
    language,
    _updatedAt
  }`;
  
  const posts = await client.fetch(query, {}, { cache: 'no-store' });

  const blogPostUrls = posts.map((post: any) => ({
    url: `${BASE_URL}/${post.language}/blog/${post.slug}`,
    lastmod: post._updatedAt
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${globalUrls.map((url) => `
      <url>
        <loc>${url}</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
    `).join("")}

    ${langUrls.map((url) => `
      <url>
        <loc>${url}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
    `).join("")}

    ${blogPostUrls.map((post: any) => `
      <url>
        <loc>${post.url}</loc>
        <lastmod>${post.lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `).join("")}

  </urlset>`;

  return new NextResponse(sitemap, {
    headers: { 
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, must-revalidate"
    },
  });
}