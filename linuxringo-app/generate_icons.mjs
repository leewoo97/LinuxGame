import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SVG_PATH = './icon.svg';
const RES_DIR = './android/app/src/main/res';

const SIZES = [
  { folder: 'mipmap-mdpi',    size: 48 },
  { folder: 'mipmap-hdpi',    size: 72 },
  { folder: 'mipmap-xhdpi',   size: 96 },
  { folder: 'mipmap-xxhdpi',  size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

const svgBuffer = fs.readFileSync(SVG_PATH);

async function generate() {
  for (const { folder, size } of SIZES) {
    const dir = path.join(RES_DIR, folder);
    fs.mkdirSync(dir, { recursive: true });

    const buf = await sharp(svgBuffer).resize(size, size).png().toBuffer();

    for (const name of ['ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png']) {
      const out = path.join(dir, name);
      fs.writeFileSync(out, buf);
      console.log(`  ✓ ${out} (${size}x${size})`);
    }
  }

  // Play Store 512x512
  const playDir = './android';
  const playBuf = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  const playPath = path.join(playDir, 'play_store_icon.png');
  fs.writeFileSync(playPath, playBuf);
  console.log(`\n  ✓ Play Store 아이콘: ${playPath} (512x512)`);

  console.log('\n모든 아이콘 생성 완료!');
}

generate().catch(console.error);
