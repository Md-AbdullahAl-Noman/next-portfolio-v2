import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'public', 'favicons');
const svg = await readFile(path.join(outDir, 'icon.svg'));

const targets = [
  { file: 'favicon-16x16.png', size: 16 },
  { file: 'favicon_16.png', size: 16 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'android-chrome-192x192.png', size: 192 },
  { file: 'android-chrome-512x512.png', size: 512 },
];

for (const { file, size } of targets) {
  await sharp(svg, { density: 72 * (size / 512) * 8 })
    .resize(size, size)
    .png()
    .toFile(path.join(outDir, file));
  console.log(`generated ${file}`);
}

const icoSources = await Promise.all(
  [16, 32, 48].map((size) =>
    sharp(svg, { density: 72 * (size / 512) * 8 }).resize(size, size).png().toBuffer(),
  ),
);
const ico = await pngToIco(icoSources);
await writeFile(path.join(outDir, 'favicon.ico'), ico);
await writeFile(path.join(root, 'public', 'favicon.ico'), ico);
console.log('generated favicon.ico');
