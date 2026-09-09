const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');

function getAllMp4Files(dir, fileList = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      getAllMp4Files(full, fileList);
    } else if (item.endsWith('.mp4') && !item.endsWith('.noaudio.mp4')) {
      fileList.push(full);
    }
  }
  return fileList;
}

const allMp4s = getAllMp4Files(publicDir);
console.log(`Found ${allMp4s.length} MP4 files in public/`);

for (const mp4 of allMp4s) {
  // Check if it has audio
  let hasAudio = false;
  try {
    const probe = execSync(`"${ffmpeg}" -i "${mp4}" 2>&1`).toString();
    hasAudio = probe.includes('Audio:');
  } catch (err) {
    const probe = (err.stdout ? err.stdout.toString() : '') + (err.stderr ? err.stderr.toString() : '');
    hasAudio = probe.includes('Audio:');
  }

  if (hasAudio) {
    console.log(`Stripping audio from: ${path.relative(publicDir, mp4)}`);
    const temp = mp4 + '.mute.mp4';
    execSync(`"${ffmpeg}" -y -i "${mp4}" -c:v copy -an "${temp}" 2>&1`);
    fs.unlinkSync(mp4);
    fs.renameSync(temp, mp4);
    console.log(`  -> Successfully muted!`);
  } else {
    console.log(`Already silent: ${path.relative(publicDir, mp4)}`);
  }
}

console.log('--- ALL MP4 FILES IN PUBLIC ARE NOW 100% SILENT / NO AUDIO STREAM ---');
