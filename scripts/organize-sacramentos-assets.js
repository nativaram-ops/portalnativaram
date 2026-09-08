const fs = require('fs');
const path = require('path');

const baseRotulos = 'C:\\Users\\victo\\Downloads\\1_TRABALHO\\Nativaram Brasil\\Rotulos e Embalagens';
const baseBanners = 'C:\\Users\\victo\\Downloads\\1_TRABALHO\\Nativaram Brasil\\Banners e Identidade';

const out15g = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'labels-15g');
const out25g = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'labels-25g');
const outDefumacao = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'defumacao');

[out15g, out25g, outDefumacao].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Copy 15g labels
const dir15g = path.join(baseRotulos, 'ETIQUETA RAPÉ 15g  (3x5cm) - Certa');
if (fs.existsSync(dir15g)) {
  const files15g = fs.readdirSync(dir15g);
  files15g.forEach(f => {
    fs.copyFileSync(path.join(dir15g, f), path.join(out15g, f));
  });
  console.log(`Copied ${files15g.length} files to labels-15g`);
}

// Copy 25g labels
const dir25g = path.join(baseRotulos, 'ETIQUETAS RAPÉ 10.5x4.5cm - CERTA');
if (fs.existsSync(dir25g)) {
  const files25g = fs.readdirSync(dir25g);
  files25g.forEach(f => {
    fs.copyFileSync(path.join(dir25g, f), path.join(out25g, f));
  });
  console.log(`Copied ${files25g.length} files to labels-25g`);
}

// Copy defumacao / palo santo / resinas from Banners e Identidade
if (fs.existsSync(baseBanners)) {
  const bannerFiles = fs.readdirSync(baseBanners);
  bannerFiles.filter(f => {
    const full = path.join(baseBanners, f);
    return fs.statSync(full).isFile() && /palo|resina|defum|banner/i.test(f);
  }).forEach(f => {
    fs.copyFileSync(path.join(baseBanners, f), path.join(outDefumacao, f));
    console.log(`Copied banner: ${f}`);
  });
}
