const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
console.log('FFmpeg path:', ffmpeg);
try {
  const version = execSync(`"${ffmpeg}" -version`).toString();
  console.log('FFmpeg working! First line:', version.split('\n')[0]);
} catch (e) {
  console.error('Error running ffmpeg:', e.message);
}







