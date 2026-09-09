const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const masterDefum = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'arte-da-defumacao-essencias.png');
const masterKits = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'kits-sacramentais-sinergia.png');

const dirDefum = path.join(__dirname, '..', 'public', 'assets', 'sacramentos', 'defumacao');
const dirKits = path.join(__dirname, '..', 'public', 'assets', 'sacramentos', 'kits');

async function fixCrops() {
  console.log('--- Fixing Defumação Crops ---');
  // top = 1750, height = 790
  const mapDefum = [
    { name: 'olibano-50g', left: 355, top: 1750, width: 800, height: 790 },
    { name: 'breu-branco-50g', left: 1395, top: 1750, width: 800, height: 790 },
    { name: 'palo-santo-50g', left: 2435, top: 1750, width: 800, height: 790 },
  ];

  for (const item of mapDefum) {
    const targetPath = path.join(dirDefum, `${item.name}.jpg`);
    await sharp(masterDefum)
      .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
      .jpeg({ quality: 92 })
      .toFile(targetPath);
    console.log(`Saved Fixed Defum: ${item.name}.jpg`);
  }

  console.log('--- Checking Kits Master Coordinates ---');
  // In masterKits, top starts around 1180 or 1200
  // Let's test kit crops at top: 1200
  const mapKits = [
    { name: 'kit-kuripe-tepi', left: 360, top: 1210, width: 1400, height: 1300 },
    { name: 'kit-kuripe-folha', left: 1840, top: 1210, width: 1400, height: 1300 },
    { name: 'kit-trio-caboclos', left: 360, top: 2570, width: 1400, height: 1300 },
    { name: 'kit-trio-floresta', left: 1840, top: 2570, width: 1400, height: 1300 },
  ];

  for (const item of mapKits) {
    const targetPath = path.join(dirKits, `${item.name}.jpg`);
    await sharp(masterKits)
      .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
      .jpeg({ quality: 92 })
      .toFile(targetPath);
    console.log(`Saved Fixed Kit: ${item.name}.jpg`);
  }
}

fixCrops().catch(console.error);
