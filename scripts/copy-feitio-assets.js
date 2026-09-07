const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\victo\\.gemini\\antigravity-ide\\brain\\93199a5f-83fc-4fa4-a8f6-980c4aba09bc';
const destDir = path.join(__dirname, '..', 'public', 'assets', 'feitio', 'curadas');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const mappings = [
  { from: 'feitio_vigilia_caldeirao_1788796831868.jpg', to: 'feitio-vigilia-noturna-feitor.jpg' },
  { from: 'colheita_rezo_chacrona_1788796871727.jpg', to: 'feitio-colheita-rezo-chacrona.jpg' },
  { from: 'quebracao_cipo_malhos_1788796918501.jpg', to: 'feitio-quebracao-cipo-malhos.jpg' }
];

for (const m of mappings) {
  const fromPath = path.join(srcDir, m.from);
  const toPath = path.join(destDir, m.to);
  if (fs.existsSync(fromPath)) {
    fs.copyFileSync(fromPath, toPath);
    console.log(`Copied ${m.from} -> ${m.to}`);
  } else {
    console.error(`File not found: ${fromPath}`);
  }
}
