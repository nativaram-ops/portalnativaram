const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\victo\\.gemini\\antigravity-ide\\brain\\93199a5f-83fc-4fa4-a8f6-980c4aba09bc';
const destDir = path.join(__dirname, '..', 'public', 'assets', 'manifesto');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const mappings = [
  { from: 'nascidos_raio_sol_1788795366165.jpg', to: 'nascidos-raio-de-sol.jpg' },
  { from: 'alquimia_dois_mundos_1788795392404.jpg', to: 'alquimia-entre-dois-mundos.jpg' },
  { from: 'agrofloresta_projetos_luz_1788795468517.jpg', to: 'agrofloresta-projetos-de-luz.jpg' }
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
