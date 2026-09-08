const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const master25 = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'rapes-linha-completa-25g.png');

async function testCrop() {
  // 4 columns:
  // Each card is square (e.g. 680x680 or 700x700)
  // Let's test a slice from y: 1350 to 2050
  // Left margin is around 360 px
  // Gap between columns is around 40-50 px
  // 4 * W + 3 * gap + 2 * margin = 3600
  // Let's test W = 680, gap = 45, margin = 360
  // Col 0: left = 360
  // Col 1: left = 360 + 680 + 45 = 1085
  // Col 2: left = 1085 + 680 + 45 = 1810
  // Col 3: left = 1810 + 680 + 45 = 2535
  // Width: 680
  // Row 0: top = 1360, height = 680
  // Row 1: top = 1360 + 680 + 45 = 2085, height = 680
  // Row 2: top = 2085 + 680 + 45 = 2810, height = 680

  const outDir = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'test-crops');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const testCoords = [
    { name: 'murici-test', left: 360, top: 1360, width: 685, height: 685 },
    { name: 'rainha-test', left: 1085, top: 1360, width: 685, height: 685 },
    { name: 'parica-test', left: 1810, top: 2090, width: 685, height: 685 },
  ];

  for (const t of testCoords) {
    await sharp(master25)
      .extract({ left: t.left, top: t.top, width: t.width, height: t.height })
      .toFile(path.join(outDir, `${t.name}.jpg`));
    console.log('Saved', t.name);
  }
}

testCrop();
