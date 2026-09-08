const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const master25 = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'rapes-linha-completa-25g.png');
const master15 = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'rapes-frascos-15g.png');
const masterDefum = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'arte-da-defumacao-essencias.png');
const masterKits = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'kits-sacramentais-sinergia.png');

const dir25 = path.join(__dirname, '..', 'public', 'assets', 'sacramentos', '25g');
const dir15 = path.join(__dirname, '..', 'public', 'assets', 'sacramentos', '15g');
const dirDefum = path.join(__dirname, '..', 'public', 'assets', 'sacramentos', 'defumacao');
const dirKits = path.join(__dirname, '..', 'public', 'assets', 'sacramentos', 'kits');

[dir25, dir15, dirDefum, dirKits].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function processAll() {
  console.log('--- Cropping 25g Rapés ---');
  const cols = [360, 1098, 1836, 2574];
  const rows = [1362, 2092, 2822];
  const W = 672;
  const H = 672;

  const map25 = [
    { name: 'murici', col: 0, row: 0 },
    { name: 'rainha', col: 1, row: 0 },
    { name: 'jurema-preta', col: 2, row: 0 },
    { name: 'nissural', col: 3, row: 0 },
    { name: 'cacau', col: 0, row: 1 },
    { name: 'pixuri', col: 1, row: 1 },
    { name: 'parica', col: 2, row: 1 },
    { name: 'tsunu', col: 3, row: 1 },
    { name: 'cumaru', col: 0, row: 2 },
    { name: 'veia-de-paje', col: 1, row: 2 },
  ];

  for (const item of map25) {
    const left = cols[item.col];
    const top = rows[item.row];
    const targetPath = path.join(dir25, `${item.name}.jpg`);
    await sharp(master25)
      .extract({ left, top, width: W, height: H })
      .jpeg({ quality: 92 })
      .toFile(targetPath);
    console.log(`Saved 25g: ${item.name}.jpg`);
  }

  console.log('--- Cropping 15g Rapés ---');
  // In master15 (3600 x 4500), there are 2 columns and 2 rows
  // Let's find top and left:
  // Margin left ~360, width ~1400 each? Or let's inspect coordinates
  const meta15 = await sharp(master15).metadata();
  // 2 large square-ish cards:
  // Col 0: left ~360, Col 1: left ~1840, W ~1400
  // Top row starts around y = 1360
  // Let's crop the 4 15g bottles:
  const map15 = [
    { name: 'murici-15g', left: 360, top: 1360, width: 1400, height: 1400 },
    { name: 'rainha-15g', left: 1840, top: 1360, width: 1400, height: 1400 },
    { name: 'jurema-preta-15g', left: 360, top: 2840, width: 1400, height: 1400 },
    { name: 'nissural-15g', left: 1840, top: 2840, width: 1400, height: 1400 },
  ];

  for (const item of map15) {
    const targetPath = path.join(dir15, `${item.name}.jpg`);
    await sharp(master15)
      .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
      .jpeg({ quality: 92 })
      .toFile(targetPath);
    console.log(`Saved 15g: ${item.name}.jpg`);
  }

  console.log('--- Cropping Defumação & Resinas ---');
  // In masterDefum (3600 x 4500), 3 items in a single horizontal band:
  // 1: Olíbano, 2: Breu Branco, 3: Palo Santo
  // Width ~850 each, height ~850
  // Starts around y = 2200 to 3100
  const mapDefum = [
    { name: 'olibano-50g', left: 350, top: 2200, width: 880, height: 880 },
    { name: 'breu-branco-50g', left: 1360, top: 2200, width: 880, height: 880 },
    { name: 'palo-santo-50g', left: 2370, top: 2200, width: 880, height: 880 },
  ];

  for (const item of mapDefum) {
    const targetPath = path.join(dirDefum, `${item.name}.jpg`);
    await sharp(masterDefum)
      .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
      .jpeg({ quality: 92 })
      .toFile(targetPath);
    console.log(`Saved Defum: ${item.name}.jpg`);
  }

  console.log('--- Cropping Kits ---');
  // In masterKits (3600 x 4500): 2x2 grid
  const mapKits = [
    { name: 'kit-kuripe-tepi', left: 360, top: 1530, width: 1400, height: 1400 },
    { name: 'kit-kuripe-folha', left: 1840, top: 1530, width: 1400, height: 1400 },
    { name: 'kit-trio-caboclos', left: 360, top: 3010, width: 1400, height: 1400 },
    { name: 'kit-trio-floresta', left: 1840, top: 3010, width: 1400, height: 1400 },
  ];

  for (const item of mapKits) {
    const targetPath = path.join(dirKits, `${item.name}.jpg`);
    await sharp(masterKits)
      .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
      .jpeg({ quality: 92 })
      .toFile(targetPath);
    console.log(`Saved Kit: ${item.name}.jpg`);
  }

  console.log('=== EXTRACTION FINISHED SUCCESSFULLY ===');
}

processAll().catch(console.error);
