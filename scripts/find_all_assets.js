const fs = require('fs');
const path = require('path');

const root = 'C:\\Users\\victo\\Downloads\\1_TRABALHO\\Nativaram Brasil';

function walk(dir, depth = 0) {
  if (depth > 3) return;
  try {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      const full = path.join(dir, item);
      const isDir = fs.statSync(full).isDirectory();
      const indent = '  '.repeat(depth);
      if (isDir) {
        console.log(`${indent}[DIR] ${item}`);
        walk(full, depth + 1);
      } else {
        if (/\.(png|jpg|jpeg|webp)$/i.test(item)) {
          console.log(`${indent} - ${item}`);
        }
      }
    }
  } catch (e) {}
}

console.log('=== Nativaram Brasil Asset Tree ===');
walk(root);
