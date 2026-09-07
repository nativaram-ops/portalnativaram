const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const files = [
  'sobre nós nativaram.pdf',
  'documento-institucional-nativaram.pdf',
  'Diretrizes Institucionais e Base de Conhecimento - Nativaram Brasil.pdf',
  'Diretrizes de Comunicação e Compliance Nativaram Brasil.pdf',
  'manual-compliance-nativaram.pdf',
  'nativaram-manual-compliance-definitivo.pdf'
];

async function run() {
  let output = '';
  for (const file of files) {
    const filePath = path.join(__dirname, '..', 'public', 'documentos', file);
    if (!fs.existsSync(filePath)) {
      output += `\n=== FILE NOT FOUND: ${file} ===\n`;
      continue;
    }
    output += `\n\n=======================================================\n`;
    output += `=== DOCUMENT: ${file} ===\n`;
    output += `=======================================================\n\n`;
    try {
      const buffer = fs.readFileSync(filePath);
      const uint8 = new Uint8Array(buffer);
      const parser = new PDFParse(uint8);
      await parser.load();
      const result = await parser.getText();
      const fullText = (result.pages || []).map((p, idx) => `--- PAGE ${idx + 1} ---\n` + p.text).join('\n\n');
      output += fullText;
      console.log(`Parsed ${file}: ${(result.pages || []).length} pages, ${fullText.length} chars`);
    } catch (e) {
      output += `Error reading ${file}: ${e.message}\n`;
      console.error(`Error reading ${file}:`, e.message);
    }
  }

  const outPath = path.join(__dirname, 'institutional-dump.txt');
  fs.writeFileSync(outPath, output, 'utf8');
  console.log(`Extracted text written to ${outPath} (${output.length} characters)`);
}

run();
