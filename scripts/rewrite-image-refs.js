/*
 * Rewrites image path string literals in source files to use .webp.
 *
 * Only touches string literals that look like:
 *   "/some/path.png"   |   '/some/path.jpg'
 *   "/some/path.jpeg"  |   "/some/path.jfif"
 *   ./path.png in @/public/X.png imports — covered
 *
 * Skips: .svg, .mp4, .webm, .pdf, already-.webp paths.
 * Only acts when a sibling .webp file actually exists in /public.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

// Files to walk. Exclude node_modules, .next, etc.
const SOURCE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".css"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "scripts", "public", "sanity"]);

const RASTER_EXT_PATTERN = /\.(png|jpe?g|jfif)(?=["'`)\s])/gi;

let totalChanged = 0;
const fileSummary = [];

function publicHasSibling(rawPath) {
  // rawPath looks like /folder/file.png OR folder/file.png
  let rel = rawPath.startsWith("/") ? rawPath.slice(1) : rawPath;
  // ignore external URLs
  if (rel.startsWith("http") || rel.includes("://")) return false;
  const ext = path.extname(rel);
  const stem = rel.slice(0, -ext.length);
  const webp = path.join(PUBLIC_DIR, stem + ".webp");
  return fs.existsSync(webp);
}

function rewriteContent(content) {
  let changes = 0;

  // Match string literals "..." or '...' that contain a raster image path
  // and convert just that path's extension.
  const STRING_LITERAL = /(["'`])([^"'`\n]+?\.(?:png|jpe?g|jfif))(\1)/gi;

  const next = content.replace(STRING_LITERAL, (match, openQ, inner, closeQ) => {
    // Skip URLs
    if (inner.startsWith("http") || inner.startsWith("data:") || inner.includes("://")) {
      return match;
    }
    // Confirm the sibling .webp exists in /public so we don't 404 anything.
    if (!publicHasSibling(inner)) return match;

    const ext = path.extname(inner);
    const rewritten = inner.slice(0, -ext.length) + ".webp";
    changes++;
    return `${openQ}${rewritten}${closeQ}`;
  });

  return { content: next, changes };
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".") && entry.name !== ".env") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(full);
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name);
    if (!SOURCE_EXT.has(ext)) continue;

    const original = fs.readFileSync(full, "utf8");
    const { content, changes } = rewriteContent(original);
    if (changes > 0) {
      fs.writeFileSync(full, content, "utf8");
      totalChanged += changes;
      fileSummary.push({ file: path.relative(ROOT, full), changes });
    }
  }
}

console.log(`\nRewriting image refs (.png/.jpg/.jpeg/.jfif -> .webp) in source files...\n`);
walk(ROOT);

for (const { file, changes } of fileSummary) {
  console.log(`  ${changes.toString().padStart(3)}  ${file}`);
}
console.log(`\n--- summary ---`);
console.log(`  files touched:  ${fileSummary.length}`);
console.log(`  refs rewritten: ${totalChanged}`);
