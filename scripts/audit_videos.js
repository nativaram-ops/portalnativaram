const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '..', 'public', 'assets', 'feitio', 'curadas');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));

console.log('--- CURADAS VIDEOS AUDIT ---');
for (const f of files) {
  const fullPath = path.join(dir, f);
  const size = fs.statSync(fullPath).size;
  try {
    const probe = execSync(`"${ffmpeg}" -i "${fullPath}" 2>&1`).toString();
    const hasAudio = probe.includes('Audio:');
    const durMatch = probe.match(/Duration: ([^,]+)/);
    const resMatch = probe.match(/Video: .*, (\d+x\d+)/);
    console.log(`${f}:`);
    console.log(`  Size: ${size} bytes`);
    console.log(`  Duration: ${durMatch ? durMatch[1] : 'unknown'}`);
    console.log(`  Resolution: ${resMatch ? resMatch[1] : 'unknown'}`);
    console.log(`  Has Audio: ${hasAudio}`);
  } catch (err) {
    const probe = (err.stdout ? err.stdout.toString() : '') + (err.stderr ? err.stderr.toString() : '');
    const hasAudio = probe.includes('Audio:');
    const durMatch = probe.match(/Duration: ([^,]+)/);
    const resMatch = probe.match(/Video: .*, (\d+x\d+)/);
    console.log(`${f}:`);
    console.log(`  Size: ${size} bytes`);
    console.log(`  Duration: ${durMatch ? durMatch[1] : 'unknown'}`);
    console.log(`  Resolution: ${resMatch ? resMatch[1] : 'unknown'}`);
    console.log(`  Has Audio: ${hasAudio}`);
  }
}
