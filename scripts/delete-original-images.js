/*
 * After verifying the site renders correctly with .webp images, run this to
 * delete the original .png/.jpg/.jpeg/.jfif files in /public — but ONLY when
 * a sibling .webp exists for the same name.
 *
 * Usage:
 *   node scripts/delete-original-images.js --dry-run    # list what WOULD be deleted
 *   node scripts/delete-original-images.js              # actually delete
 *
 * Safety:
 *  - Never deletes a file unless its .webp sibling is present.
 *  - Skips .svg, .gif, .webp, .ico, video files.
 *  - Walks /public only.
 */

const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const DRY_RUN = process.argv.includes("--dry-run");

const RASTER_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".jfif", ".PNG", ".JPG", ".JPEG", ".JFIF",
]);

const stats = { scanned: 0, deleted: 0, skipped: 0, bytesFreed: 0 };

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name);
    if (!RASTER_EXT.has(ext)) continue;

    stats.scanned++;
    const base = entry.name.slice(0, -ext.length);
    const webpSibling = path.join(dir, `${base}.webp`);

    if (!fs.existsSync(webpSibling)) {
      stats.skipped++;
      console.log(`  KEEP  ${path.relative(PUBLIC_DIR, full)}  (no .webp sibling)`);
      continue;
    }

    const size = (await fs.promises.stat(full)).size;
    stats.bytesFreed += size;
    stats.deleted++;

    if (DRY_RUN) {
      console.log(`  WOULD DELETE  ${path.relative(PUBLIC_DIR, full)}  (${(size / 1024).toFixed(0)}KB)`);
    } else {
      await fs.promises.unlink(full);
      console.log(`  DELETED       ${path.relative(PUBLIC_DIR, full)}  (${(size / 1024).toFixed(0)}KB)`);
    }
  }
}

(async () => {
  console.log(`\n${DRY_RUN ? "DRY RUN — no files will be touched." : "Deleting original raster files where a .webp sibling exists."}\n`);
  await walk(PUBLIC_DIR);

  console.log(`\n--- summary ---`);
  console.log(`  scanned:    ${stats.scanned}`);
  console.log(`  ${DRY_RUN ? "would delete" : "deleted    "}: ${stats.deleted}`);
  console.log(`  kept:       ${stats.skipped}  (no webp sibling)`);
  console.log(`  ${DRY_RUN ? "would free" : "freed     "}: ${(stats.bytesFreed / (1024 * 1024)).toFixed(1)} MB`);
})();
