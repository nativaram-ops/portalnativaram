const fs = require('fs');
const path = require('path');

const base = 'C:\\Users\\victo\\Downloads\\1_TRABALHO\\Nativaram Brasil\\Rotulos e Embalagens';
const txts = fs.readdirSync(base).filter(f => f.endsWith('.txt'));

txts.forEach(t => {
  console.log(`\n=== ${t} ===`);
  const content = fs.readFileSync(path.join(base, t), 'utf8');
  console.log(content.slice(0, 500));
});
