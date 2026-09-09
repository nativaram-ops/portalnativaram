const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'src', 'data', 'medicinas.ts');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Update interface
content = content.replace(
  '  emoji: string;\n}',
  '  emoji: string;\n  foto?: string;\n  foto15g?: string;\n  disponivel15g?: boolean;\n}'
);

const photoMap = {
  '7-ervas': { foto: '/assets/sacramentos/25g/7-ervas.jpg', disponivel15g: true },
  'cacau': { foto: '/assets/sacramentos/25g/cacau.jpg', disponivel15g: true },
  'cumaru': { foto: '/assets/sacramentos/25g/cumaru.jpg', disponivel15g: true },
  'jurema-preta': { foto: '/assets/sacramentos/25g/jurema-preta.jpg', foto15g: '/assets/sacramentos/15g/jurema-preta-15g.jpg', disponivel15g: true },
  'mentolado': { foto: '/assets/sacramentos/25g/pixuri.jpg', disponivel15g: true },
  'mulateiro': { foto: '/assets/sacramentos/25g/mulateiro.jpg', disponivel15g: true },
  'murici': { foto: '/assets/sacramentos/25g/murici.jpg', foto15g: '/assets/sacramentos/15g/murici-15g.jpg', disponivel15g: true },
  'nissural': { foto: '/assets/sacramentos/25g/nissural.jpg', foto15g: '/assets/sacramentos/15g/nissural-15g.jpg', disponivel15g: true },
  'parica': { foto: '/assets/sacramentos/25g/parica.jpg', disponivel15g: true },
  'pixuri': { foto: '/assets/sacramentos/25g/pixuri.jpg', disponivel15g: true },
  'rainha': { foto: '/assets/sacramentos/25g/rainha.jpg', foto15g: '/assets/sacramentos/15g/rainha-15g.jpg', disponivel15g: true },
  'samauma': { foto: '/assets/sacramentos/25g/tsunu.jpg', disponivel15g: true },
  'sansara': { foto: '/assets/sacramentos/25g/rainha.jpg', disponivel15g: true },
  'tsunu': { foto: '/assets/sacramentos/25g/tsunu.jpg', disponivel15g: true },
  'veia-de-paje': { foto: '/assets/sacramentos/25g/veia-de-paje.jpg', disponivel15g: true },
};

for (const [slug, data] of Object.entries(photoMap)) {
  const regex = new RegExp(`(slug:\\s*["']${slug}["'][\\s\\S]*?emoji:\\s*["'][^"']+["'],?)`, 'g');
  content = content.replace(regex, (match) => {
    if (match.includes('foto:')) return match;
    let additions = `\n    foto: "${data.foto}",\n    disponivel15g: ${data.disponivel15g},`;
    if (data.foto15g) {
      additions += `\n    foto15g: "${data.foto15g}",`;
    }
    return match + additions;
  });
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully updated src/data/medicinas.ts with photo metadata!');
