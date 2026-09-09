const sharp = require('sharp');
const path = require('path');

const masterKits = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'kits-sacramentais-sinergia.png');
const dir25 = path.join(__dirname, '..', 'public', 'assets', 'sacramentos', '25g');

async function calibrateExact() {
  // 7 ERVAS: centered single bottle
  await sharp(masterKits)
    .extract({ left: 1940, top: 3120, width: 500, height: 500 })
    .jpeg({ quality: 92 })
    .toFile(path.join(dir25, '7-ervas.jpg'));

  // MULATEIRO: centered single bottle
  await sharp(masterKits)
    .extract({ left: 1140, top: 3120, width: 500, height: 500 })
    .jpeg({ quality: 92 })
    .toFile(path.join(dir25, 'mulateiro.jpg'));

  console.log('Saved calibrated single bottles for 7-ervas and mulateiro');
}

calibrateExact();
