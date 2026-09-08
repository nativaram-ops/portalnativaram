const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const master25 = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'rapes-linha-completa-25g.png');

async function detectBoxes() {
  // We can sample vertical and horizontal profiles or test standard coordinates
  // 3600 width:
  // Margin left ~360, col gap ~70, 4 columns:
  // 360 + 4 * W + 3 * gap = 3600 => W ~ 685 px
  // Let's sample pixels or test crops
  const { data, info } = await sharp(master25).raw().toBuffer({ resolveWithObject: true });
  console.log('Image buffer length:', data.length, info);

  // Let's find rows where image content starts
  // The background is beige/sand color: rgb around 230-240
  // Each card photo has forest greens and dark tones
  const height = info.height;
  const width = info.width;
  const channels = info.channels;

  // Let's find y range for row 1, 2, 3
  // Scan vertical line at x = 700 (middle of column 1)
  const x = 700;
  let inCard = false;
  let cardRanges = [];
  let startY = 0;

  for (let y = 0; y < height; y++) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    // Background is high lightness sand color (r > 200, g > 200, b > 180)
    const isBg = r > 210 && g > 210 && b > 190;
    if (!isBg && !inCard) {
      inCard = true;
      startY = y;
    } else if (isBg && inCard) {
      inCard = false;
      if (y - startY > 200) {
        cardRanges.push({ startY, endY: y, height: y - startY });
      }
    }
  }
  console.log('Vertical card ranges at x=700:', cardRanges);

  // Now scan horizontal line in row 1
  if (cardRanges.length > 0) {
    const midY = Math.floor((cardRanges[0].startY + cardRanges[0].endY) / 2);
    let inCol = false;
    let colRanges = [];
    let startX = 0;
    for (let c = 0; c < width; c++) {
      const idx = (midY * width + c) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const isBg = r > 210 && g > 210 && b > 190;
      if (!isBg && !inCol) {
        inCol = true;
        startX = c;
      } else if (isBg && inCol) {
        inCol = false;
        if (c - startX > 200) {
          colRanges.push({ startX, endX: c, width: c - startX });
        }
      }
    }
    console.log('Horizontal col ranges at midY=' + midY + ':', colRanges);
  }
}

detectBoxes();
