const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');

const file = path.join(__dirname, '..', 'public', 'assets', 'feitio', 'WhatsApp Video 2026-09-06 at 10.00.20.mp4');
const outDir = path.join(__dirname, '..', 'public', 'assets', 'feitio', 'curadas');

[1, 3, 5, 8].forEach(sec => {
  const out = path.join(outDir, `cauldron_sample_${sec}s.jpg`);
  execSync(`"${ffmpeg}" -y -ss 00:00:0${sec} -i "${file}" -frames:v 1 -q:v 2 "${out}" 2>&1`);
  console.log(`sec ${sec} -> ${out}`);
});
