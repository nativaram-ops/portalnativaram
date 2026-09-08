const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const master25 = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'rapes-linha-completa-25g.png');
const master15 = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'rapes-frascos-15g.png');
const masterDefum = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'arte-da-defumacao-essencias.png');
const masterKits = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'kits-sacramentais-sinergia.png');

const out25 = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'rapes-25g');
const out15 = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'rapes-15g');
const outResinas = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'resinas');
const outKits = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'kits');

[out25, out15, outResinas, outKits].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function main() {
  const meta25 = await sharp(master25).metadata();
  console.log('Master 25g dimensions:', meta25.width, 'x', meta25.height);
  
  const meta15 = await sharp(master15).metadata();
  console.log('Master 15g dimensions:', meta15.width, 'x', meta15.height);

  const metaDefum = await sharp(masterDefum).metadata();
  console.log('Master Defum dimensions:', metaDefum.width, 'x', metaDefum.height);

  const metaKits = await sharp(masterKits).metadata();
  console.log('Master Kits dimensions:', metaKits.width, 'x', metaKits.height);
}

main();
