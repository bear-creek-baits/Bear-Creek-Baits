// Web copy of a customer catch photo: turned upright, longest side 1400px, WebP, all metadata (GPS,
// camera) dropped. Prints the [width, height] to put in src/data/catches.ts.
// Usage (from site/): node scripts/catch-photo.mjs "<photo.jpg>" public/catches/<name>.webp
import sharp from 'sharp';

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error('Usage: node scripts/catch-photo.mjs "<photo.jpg>" public/catches/<name>.webp');
  process.exit(1);
}
const info = await sharp(src).rotate().resize(1400, 1400, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 76 }).toFile(out);
console.log(`${out}: [${info.width}, ${info.height}], ${Math.round(info.size / 1024)} KB`);
