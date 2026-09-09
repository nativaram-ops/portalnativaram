const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const feitioDir = path.join(__dirname, '..', 'public', 'assets', 'feitio');
const curadasDir = path.join(feitioDir, 'curadas');

console.log('--- EXTRACTING FRAMES FROM RAW FEITIO VIDEOS ---');
const rawFiles = fs.readdirSync(feitioDir).filter(f => f.endsWith('.mp4'));
rawFiles.forEach((f, i) => {
  const out = path.join(feitioDir, `frame_raw_${i}_${f.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`);
  execSync(`"${ffmpeg}" -y -ss 00:00:02 -i "${path.join(feitioDir, f)}" -frames:v 1 -q:v 2 "${out}"`);
  console.log(`${f} -> ${path.basename(out)}`);
});

console.log('--- EXTRACTING FRAMES FROM CURADAS VIDEOS ---');
const curadasFiles = fs.readdirSync(curadasDir).filter(f => f.endsWith('.mp4'));
curadasFiles.forEach((f, i) => {
  const out = path.join(curadasDir, `frame_curada_${i}_${f.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`);
  execSync(`"${ffmpeg}" -y -ss 00:00:02 -i "${path.join(curadasDir, f)}" -frames:v 1 -q:v 2 "${out}"`);
  console.log(`${f} -> ${path.basename(out)}`);
});
