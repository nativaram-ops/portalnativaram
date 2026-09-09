const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const masterDefum = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'arte-da-defumacao-essencias.png');
const masterKits = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'kits-sacramentais-sinergia.png');

const dir25 = path.join(__dirname, '..', 'public', 'assets', 'sacramentos', '25g');
const dirDefum = path.join(__dirname, '..', 'public', 'assets', 'sacramentos', 'defumacao');
const dirKits = path.join(__dirname, '..', 'public', 'assets', 'sacramentos', 'kits');

async function finalCrops() {
  console.log('--- Finalizing Defumação ---');
  const mapDefum = [
    { name: 'olibano-50g', left: 355, top: 1800, width: 800, height: 790 },
    { name: 'breu-branco-50g', left: 1395, top: 1800, width: 800, height: 790 },
    { name: 'palo-santo-50g', left: 2435, top: 1800, width: 800, height: 790 },
  ];
  for (const item of mapDefum) {
    await sharp(masterDefum)
      .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
      .jpeg({ quality: 92 })
      .toFile(path.join(dirDefum, `${item.name}.jpg`));
    console.log(`Defum: ${item.name}.jpg`);
  }

  console.log('--- Finalizing Kits ---');
  const mapKits = [
    { name: 'kit-kuripe-tepi', left: 360, top: 1210, width: 1400, height: 1300 },
    { name: 'kit-kuripe-folha', left: 1840, top: 1210, width: 1400, height: 1300 },
    { name: 'kit-trio-caboclos', left: 360, top: 2630, width: 1400, height: 1250 },
    { name: 'kit-trio-floresta', left: 1840, top: 2630, width: 1400, height: 1250 },
  ];
  for (const item of mapKits) {
    await sharp(masterKits)
      .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
      .jpeg({ quality: 92 })
      .toFile(path.join(dirKits, `${item.name}.jpg`));
    console.log(`Kit: ${item.name}.jpg`);
  }

  console.log('--- Extracting 7 Ervas and Mulateiro individual bottles ---');
  // From masterKits at top 2630:
  // 7 Ervas is the left bottle in kit-trio-floresta:
  // kit-trio-floresta starts at left 1840
  // In the 1400 width, left bottle is roughly x: 1840 + 100 = 1940, top: 2650, w: 450, h: 650
  // Or square ~ 672x672
  await sharp(masterKits)
    .extract({ left: 1880, top: 2750, width: 680, height: 680 })
    .jpeg({ quality: 92 })
    .toFile(path.join(dir25, '7-ervas.jpg'));
  console.log('Saved 7-ervas.jpg');

  // Mulateiro is the right bottle in kit-trio-caboclos:
  // kit-trio-caboclos starts at left 360
  // Right bottle is around left: 360 + 720 = 1080, top: 2750, w: 680, h: 680
  await sharp(masterKits)
    .extract({ left: 1040, top: 2750, width: 680, height: 680 })
    .jpeg({ quality: 92 })
    .toFile(path.join(dir25, 'mulateiro.jpg'));
  console.log('Saved mulateiro.jpg');
}

finalCrops().catch(console.error);
