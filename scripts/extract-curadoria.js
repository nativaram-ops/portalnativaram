const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

async function run() {
  const filePath = path.join(__dirname, '..', 'public', 'documentos', 'curadoria-nativaram-ayahuasca.pdf');
  const buffer = fs.readFileSync(filePath);
  const uint8 = new Uint8Array(buffer);
  const parser = new PDFParse(uint8);
  await parser.load();
  const result = await parser.getText();
  const text = (result.pages || []).map((p, idx) => `--- PAGE ${idx+1} ---\n` + p.text).join('\n\n');
  fs.writeFileSync(path.join(__dirname, 'curadoria-ayahuasca-dump.txt'), text, 'utf8');
  console.log(`Extracted curadoria-nativaram-ayahuasca.pdf: ${(result.pages||[]).length} pages, ${text.length} chars`);
}
run();
