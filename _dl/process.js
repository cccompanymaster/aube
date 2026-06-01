const sharp = require('/tmp/sharp-install/node_modules/sharp');
const fs = require('fs');
const path = require('path');

const SRC_DIR = '/home/user/aube/_dl';
const OUT_DIR = '/home/user/aube/img';

const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.src'));

(async () => {
  for (const f of files) {
    const name = f.replace(/\.src$/, '.jpg');
    const src = path.join(SRC_DIR, f);
    const dst = path.join(OUT_DIR, name);
    const meta = await sharp(src).metadata();
    if (meta.width < 800 || meta.height < 800) {
      console.log(`SKIP ${name} — source too small (${meta.width}x${meta.height})`);
      continue;
    }
    await sharp(src)
      .resize(900, 900, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 88, progressive: true, mozjpeg: true })
      .toFile(dst);
    const size = fs.statSync(dst).size;
    console.log(`OK   ${name}  ${(size/1024).toFixed(0)}KB`);
  }
})();
