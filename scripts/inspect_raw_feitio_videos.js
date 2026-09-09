const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const feitioDir = path.join(__dirname, '..', 'public', 'assets', 'feitio');
const files = fs.readdirSync(feitioDir).filter(f => f.endsWith('.mp4'));

console.log('--- ALL RAW FEITIO VIDEOS ---');
for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const full = path.join(feitioDir, f);
  const outJpg = path.join(feitioDir, `thumb_${i}.jpg`);
  try {
    execSync(`"${ffmpeg}" -y -ss 00:00:02 -i "${full}" -frames:v 1 -q:v 2 "${outJpg}" 2>&1`);
  } catch (e) {}
  
  let dur = 'unknown';
  try {
    const p = execSync(`"${ffmpeg}" -i "${full}" 2>&1`).toString();
    const m = p.match(/Duration: ([^,]+)/);
    dur = m ? m[1] : 'unknown';
  } catch (e) {
    const p = (e.stdout ? e.stdout.toString() : '') + (e.stderr ? e.stderr.toString() : '');
    const m = p.match(/Duration: ([^,]+)/);
    dur = m ? m[1] : 'unknown';
  }
  console.log(`[${i}] ${f} -> dur: ${dur} -> thumb: thumb_${i}.jpg`);
}
