/*
 * Batch convert all raster images in /public to WebP.
 *
 * Usage:
 *   node scripts/convert-to-webp.js          # convert + keep originals
 *   node scripts/convert-to-webp.js --delete # convert + delete originals
 *
 * Notes:
 *  - Skips: .svg, .webp (already optimized), files in /node_modules
 *  - Quality: 80 (sharp default sweet spot)
 *  - Walks every subfolder of /public recursively.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const QUALITY = 80;
const DELETE_ORIGINALS = process.argv.includes("--delete");

const RASTER_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".jfif", ".PNG", ".JPG", ".JPEG", ".JFIF",
]);

// Skip these directories entirely (svg icon sets, junk folders, etc.)
const SKIP_DIRS = new Set(["node_modules"]);

const stats = { scanned: 0, converted: 0, skipped: 0, failed: 0, originalBytes: 0, webpBytes: 0 };

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(full);
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name);
    if (!RASTER_EXT.has(ext)) continue;

    stats.scanned++;
    const base = entry.name.slice(0, -ext.length);
    const out = path.join(dir, `${base}.webp`);

    if (fs.existsSync(out)) {
      stats.skipped++;
      continue;
    }

    try {
      const orig = await fs.promises.stat(full);
      stats.originalBytes += orig.size;

      await sharp(full)
        .webp({ quality: QUALITY })
        .toFile(out);

      const webp = await fs.promises.stat(out);
      stats.webpBytes += webp.size;
      stats.converted++;

      const savedPct = (((orig.size - webp.size) / orig.size) * 100).toFixed(0);
      const rel = path.relative(PUBLIC_DIR, full);
      console.log(`  ${rel}  ${(orig.size / 1024).toFixed(0)}KB -> ${(webp.size / 1024).toFixed(0)}KB  (-${savedPct}%)`);

      if (DELETE_ORIGINALS) {
        await fs.promises.unlink(full);
      }
    } catch (err) {
      stats.failed++;
      console.error(`  FAILED  ${path.relative(PUBLIC_DIR, full)}  ${err.message}`);
    }
  }
}

(async () => {
  console.log(`\nConverting images in ${PUBLIC_DIR} to WebP (quality ${QUALITY})...`);
  console.log(DELETE_ORIGINALS ? "Mode: delete originals after convert" : "Mode: keep originals\n");

  await walk(PUBLIC_DIR);

  const savedMB = ((stats.originalBytes - stats.webpBytes) / (1024 * 1024)).toFixed(1);
  const savedPct = stats.originalBytes
    ? (((stats.originalBytes - stats.webpBytes) / stats.originalBytes) * 100).toFixed(0)
    : "0";

  console.log(`\n--- summary ---`);
  console.log(`  scanned:   ${stats.scanned}`);
  console.log(`  converted: ${stats.converted}`);
  console.log(`  skipped:   ${stats.skipped}  (output already existed)`);
  console.log(`  failed:    ${stats.failed}`);
  console.log(`  saved:     ${savedMB} MB total (-${savedPct}%)`);
})();
