const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

async function test() {
  const filePath = path.join(__dirname, '..', 'public', 'documentos', 'Diretrizes Institucionais e Base de Conhecimento - Nativaram Brasil.pdf');
  const buffer = fs.readFileSync(filePath);
  try {
    const uint8 = new Uint8Array(buffer);
    const parser = new PDFParse(uint8);
    await parser.load();
    const text = await parser.getText();
    console.log('Success! Text length:', text.length);
    console.log('Sample text:\n', typeof text === 'string' ? text.slice(0, 500) : JSON.stringify(text).slice(0, 500));
  } catch(e) {
    console.error('Error:', e.message);
  }
}
test();
