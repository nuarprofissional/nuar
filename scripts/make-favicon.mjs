import sharp from "sharp";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "assets", "icon.png");
const bg = { r: 10, g: 10, b: 10, alpha: 1 };

async function buildFavicon(size, outPath, paddingRatio = 0.06) {
  const trimmed = await sharp(source).trim({ threshold: 12 }).toBuffer({ resolveWithObject: true });
  const inner = Math.round(size * (1 - paddingRatio * 2));

  await sharp(trimmed.data)
    .resize(inner, inner, { fit: "inside", withoutEnlargement: false })
    .extend({
      top: Math.floor((size - inner) / 2),
      bottom: Math.ceil((size - inner) / 2),
      left: Math.floor((size - inner) / 2),
      right: Math.ceil((size - inner) / 2),
      background: bg,
    })
    .png()
    .toFile(outPath);
}

mkdirSync(join(root, "app"), { recursive: true });
mkdirSync(join(root, "public"), { recursive: true });

await buildFavicon(512, join(root, "app", "icon.png"), 0.02);
await buildFavicon(512, join(root, "public", "favicon.png"), 0.02);
await buildFavicon(192, join(root, "public", "favicon-192.png"), 0.02);
await buildFavicon(32, join(root, "public", "favicon-32.png"), 0.02);

console.log("Favicons generated.");
