const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const curadasDir = path.join(__dirname, '..', 'public', 'assets', 'feitio', 'curadas');
const feitioDir = path.join(__dirname, '..', 'public', 'assets', 'feitio');

const videosToProcess = [
  {
    // Caldeirão borbulhando com colher / concha (o verdadeiro borbulhar no caldeirão)
    source: path.join(feitioDir, 'WhatsApp Video 2026-09-06 at 10.00.20.mp4'),
    target: path.join(curadasDir, 'feitio-video-caldeirao-borbulhando.mp4'),
    alsoAs: path.join(curadasDir, 'feitio-video-fervura.mp4'), // substitui o antigo que era a garrafa
  },
  {
    // Caldeirões de inox em linha com vapor na mata
    source: path.join(feitioDir, 'WhatsApp Video 2026-09-06 at 10.05.10.mp4'),
    target: path.join(curadasDir, 'feitio-video-caldeiroes-inox.mp4'),
  },
  {
    // A garrafa do sacramento envasado
    source: path.join(feitioDir, 'WhatsApp Video 2026-09-06 at 10.00.19.mp4'),
    target: path.join(curadasDir, 'feitio-video-garrafa-sacramento.mp4'),
  },
  {
    // Caixa térmica com garrafas envasadas
    source: path.join(feitioDir, 'WhatsApp Video 2026-09-06 at 10.03.58.mp4'),
    target: path.join(curadasDir, 'feitio-video-caixa-garrafas.mp4'),
  },
];

for (const v of videosToProcess) {
  if (!fs.existsSync(v.source)) {
    console.warn(`Source not found: ${v.source}`);
    continue;
  }
  const tempOut = v.target + '.tmp.mp4';
  console.log(`Processing (stripping audio): ${path.basename(v.source)} -> ${path.basename(v.target)}`);
  
  // -an strips audio completely, -c:v copy preserves video quality without re-encoding
  const cmd = `"${ffmpeg}" -y -i "${v.source}" -c:v copy -an "${tempOut}"`;
  execSync(cmd, { stdio: 'inherit' });
  
  if (fs.existsSync(v.target)) fs.unlinkSync(v.target);
  fs.renameSync(tempOut, v.target);
  console.log(`Created: ${v.target} (${fs.statSync(v.target).size} bytes)`);

  if (v.alsoAs) {
    fs.copyFileSync(v.target, v.alsoAs);
    console.log(`Also copied to: ${v.alsoAs}`);
  }
}

console.log('--- ALL VIDEOS CONVERTED TO MUTE (NO AUDIO TRACK) ---');
