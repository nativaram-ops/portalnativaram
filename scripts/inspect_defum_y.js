const sharp = require('sharp');
const path = require('path');

const masterDefum = path.join(__dirname, '..', 'public', 'assets', 'nativaram-oficial', 'institucional', 'arte-da-defumacao-essencias.png');

async function check() {
  const dirDefum = path.join(__dirname, '..', 'public', 'assets', 'sacramentos', 'defumacao');
  
  // Let's test y from 1650 to 2450 with 800x800
  await sharp(masterDefum)
    .extract({ left: 350, top: 1680, width: 800, height: 800 })
    .jpeg({ quality: 92 })
    .toFile(path.join(dirDefum, 'olibano-test.jpg'));

  await sharp(masterDefum)
    .extract({ left: 1350, top: 1680, width: 800, height: 800 })
    .jpeg({ quality: 92 })
    .toFile(path.join(dirDefum, 'breu-test.jpg'));

  await sharp(masterDefum)
    .extract({ left: 2360, top: 1680, width: 800, height: 800 })
    .jpeg({ quality: 92 })
    .toFile(path.join(dirDefum, 'palo-test.jpg'));
    
  console.log('Saved defum tests');
}

check();
