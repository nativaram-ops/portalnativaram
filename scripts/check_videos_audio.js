const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '..', 'public', 'assets', 'feitio', 'curadas');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));

console.log('Checking curadas audio streams:');
for (const f of files) {
  try {
    execSync(`"${ffmpeg}" -i "${path.join(dir, f)}" 2>&1`);
  } catch (err) {
    const output = (err.stdout ? err.stdout.toString() : '') + (err.stderr ? err.stderr.toString() : '');
    const hasAudio = output.includes('Audio:');
    console.log(`- ${f}: hasAudio = ${hasAudio}`);
  }
}
