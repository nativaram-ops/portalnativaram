const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');

const curadasDir = path.join(__dirname, '..', 'public', 'assets', 'feitio', 'curadas');

const posters = [
  {
    video: path.join(curadasDir, 'feitio-video-caldeirao-borbulhando.mp4'),
    out: path.join(curadasDir, 'feitio-poster-caldeirao-borbulhando.jpg'),
    time: '00:00:01',
  },
  {
    video: path.join(curadasDir, 'feitio-video-caldeiroes-inox.mp4'),
    out: path.join(curadasDir, 'feitio-poster-caldeiroes-inox.jpg'),
    time: '00:00:02',
  },
  {
    video: path.join(curadasDir, 'feitio-video-garrafa-sacramento.mp4'),
    out: path.join(curadasDir, 'feitio-poster-garrafa-sacramento.jpg'),
    time: '00:00:01',
  },
];

for (const p of posters) {
  execSync(`"${ffmpeg}" -y -ss ${p.time} -i "${p.video}" -frames:v 1 -q:v 2 "${p.out}"`);
  console.log(`Poster created: ${path.basename(p.out)}`);
}
