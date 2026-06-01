const sharp = require('/tmp/sharp-install/node_modules/sharp');
const fs = require('fs');

const BASE = '/home/user/aube';
const Q = { quality: 88, progressive: true, mozjpeg: true };

const jobs = [
  // menu (4:5 portrait, 900x1125)
  ['aube-upload-part01/수정요청사항/매뉴/Beverage/아메리카노.png',     'menu-iced.jpg',       900, 1125],
  ['aube-upload-part01/수정요청사항/매뉴/Beverage/딸기라떼.png',       'menu-strawberry.jpg', 900, 1125],
  ['aube-upload-part02/수정요청사항/매뉴/Brunch/스파이시비프파스타.png', 'menu-pasta.jpg',      900, 1125],
  ['aube-upload-part02/수정요청사항/매뉴/Brunch/시즌샐러드.png',       'menu-salad.jpg',      900, 1125],
  ['aube-upload-part02/수정요청사항/매뉴/Brunch/아보카도쉬림프.png',    'menu-toast.jpg',      900, 1125],
  ['aube-upload-part02/수정요청사항/매뉴/hamburger/비프버거.png',      'menu-beef.jpg',       900, 1125],
  ['aube-upload-part02/수정요청사항/매뉴/hamburger/새우버거.png',      'menu-shrimp.jpg',     900, 1125],
  ['aube-upload-part02/수정요청사항/매뉴/hamburger/핫도그.png',        'menu-hotdog.jpg',     900, 1125],

  // hero (4:5 portrait, 1080x1350)
  ['aube-upload-part03/수정요청사항/메인/메인1.png', 'hero-1.jpg', 1080, 1350],
  ['aube-upload-part03/수정요청사항/메인/메인2.png', 'hero-2.jpg', 1080, 1350],
  ['aube-upload-part03/수정요청사항/메인/메인3.png', 'hero-3.jpg', 1080, 1350],
  ['aube-upload-part03/수정요청사항/메인/메인4.jpg', 'hero-4.jpg', 1080, 1350],

  // about (4:5)
  ['aube-upload-part03/수정요청사항/메인/메인 밑.png', 'about.jpg', 1100, 1375],

  // gallery (5:6, 900x1080)
  ['aube-upload-part04/수정요청사항/메인/밑1.png', 'gallery-1.jpg', 900, 1080],
  ['aube-upload-part04/수정요청사항/메인/밑2.png', 'gallery-2.jpg', 900, 1080],
  ['aube-upload-part04/수정요청사항/메인/밑3.png', 'gallery-3.jpg', 900, 1080],
  ['aube-upload-part04/수정요청사항/메인/밑4.png', 'gallery-4.jpg', 900, 1080],

  // space (4:3 landscape, 1080x810)
  ['aube-upload-part04/수정요청사항/메인/스페이스1.jpg', 'space-1.jpg', 1080, 810],
  ['aube-upload-part05/수정요청사항/메인/스페이스2.jpg', 'space-2.jpg', 1080, 810],
  ['aube-upload-part05/수정요청사항/메인/스페이스3.jpg', 'space-3.jpg', 1080, 810],

  // sns (1:1, 1080x1080)
  ['aube-upload-part06/수정요청사항/메인/인스타1.png', 'sns-1.jpg', 1080, 1080],
  ['aube-upload-part06/수정요청사항/메인/인스타2.png', 'sns-2.jpg', 1080, 1080],
  ['aube-upload-part06/수정요청사항/메인/인스타3.png', 'sns-3.jpg', 1080, 1080],
  ['aube-upload-part06/수정요청사항/메인/인스타4.png', 'sns-4.jpg', 1080, 1080],
  ['aube-upload-part06/수정요청사항/메인/인스타5.png', 'sns-5.jpg', 1080, 1080],
  ['aube-upload-part06/수정요청사항/메인/인스타6.png', 'sns-6.jpg', 1080, 1080],
];

(async () => {
  for (const [src, dst, w, h] of jobs) {
    const inP = `${BASE}/${src}`;
    const outP = `${BASE}/img/${dst}`;
    await sharp(inP)
      .resize(w, h, { fit: 'cover', position: 'centre' })
      .jpeg(Q)
      .toFile(outP);
    const kb = (fs.statSync(outP).size / 1024).toFixed(0);
    console.log(`${dst.padEnd(22)} ${w}x${h}  ${kb}KB`);
  }

  // og.jpg from hero-1 source — 1200x630 standard OG card
  const ogSrc = `${BASE}/aube-upload-part03/수정요청사항/메인/메인1.png`;
  const ogOut = `${BASE}/img/og.jpg`;
  await sharp(ogSrc)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(ogOut);
  const ogKb = (fs.statSync(ogOut).size / 1024).toFixed(0);
  console.log(`og.jpg                  1200x630  ${ogKb}KB`);
})();
