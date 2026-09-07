const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const docsToGenerate = [
  {
    src: 'assessoria-nativaram-relatorio.md',
    dest: 'nativaram-relatorio-assessoria-governanca.pdf',
    title: 'Manual Unificado de Governança, Compliance Jurídico e Conformidade Algorítmica',
    category: 'Governança & Compliance • Marco 2026',
  },
  {
    src: 'estudo-etnobotanico-feitio-purista-ayahuasca.md',
    dest: 'nativaram-estudo-feitio-purista-ayahuasca.pdf',
    title: 'Estudo Etnobotânico Comparativo: Variedades de Banisteriopsis caapi e a Ciência do Feitio Purista',
    category: 'Etnociência & Fitoquímica • Ayahuasca',
  },
  {
    src: 'o-feitio-da-ayahuasca-graduacoes-forca.md',
    dest: 'nativaram-estudo-graduacoes-forca.pdf',
    title: 'O Feitio da Ayahuasca: Dinâmicas de Preparação, Sinergia Farmacológica e Graduações de Força',
    category: 'Farmacologia Sagrada & Graduações Daimistas',
  },
  {
    src: 'parecer-juridico-comunicacao-ayahuasca.md',
    dest: 'nativaram-parecer-juridico-comunicacao.pdf',
    title: 'Análise de Conformidade e Parecer Jurídico-Normativo: Uso Ritualístico e Diretrizes de Comunicação',
    category: 'Direito Constitucional & Deontologia CONAD',
  },
  {
    src: 'nativaram-rapes-sagrados-floresta-e-ciencia.md',
    dest: 'nativaram-rapes-sagrados-floresta-e-ciencia.pdf',
    title: 'Rapés Sagrados: Essências Entre a Floresta e a Ciência — Diálogo Entre Saber Ancestral e Ciência Moderna',
    category: 'Etnobotânica dos Rapés & Sabedoria da Floresta',
  },
];

function sanitizeLine(line) {
  // Remove markdown symbols for basic PDF rendering
  return line
    .replace(/^#+\s*/, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[\d+(?:,\s*\d+)*\]/g, '') // remove citation brackets like [1, 2]
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/^>\s*/, '')
    .trim();
}

function generatePdf(config) {
  return new Promise((resolve, reject) => {
    const srcPath = path.join(__dirname, '..', 'public', 'documentos', config.src);
    const destPath = path.join(__dirname, '..', 'public', 'documentos', config.dest);

    if (!fs.existsSync(srcPath)) {
      console.warn(`Source not found: ${srcPath}`);
      return resolve();
    }

    const rawContent = fs.readFileSync(srcPath, 'utf-8');
    const lines = rawContent.split(/\r?\n/);

    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
      bufferPages: true,
      info: {
        Title: config.title,
        Author: 'Cooperativa Etnobotânica Nativaram Brasil',
        Subject: config.category,
        Keywords: 'Nativaram Brasil, Etnociência, NotebookLM, CONAD 01/2010',
      },
    });

    const writeStream = fs.createWriteStream(destPath);
    doc.pipe(writeStream);

    // Cover / Header banner
    doc.rect(0, 0, doc.page.width, 100).fill('#16281E');
    doc.fillColor('#D4A359').fontSize(10).font('Helvetica-Bold').text('COOPERATIVA ETNOBOTÂNICA NATIVARAM BRASIL', 50, 28, { tracking: 2 });
    doc.fillColor('#F8F6F0').fontSize(8).font('Helvetica').text('Acervo de Inteligência Etnobotânica • Google NotebookLM Integration', 50, 44);
    doc.fillColor('#D4A359').fontSize(8).font('Helvetica-Bold').text(config.category.toUpperCase(), 50, 58, { tracking: 1 });

    doc.moveDown(4);
    doc.fillColor('#16281E').fontSize(18).font('Helvetica-Bold').text(config.title, 50, 120, { width: doc.page.width - 100 });
    doc.moveDown(0.5);

    // Decorative rule
    doc.rect(50, doc.y, doc.page.width - 100, 2).fill('#D4A359');
    doc.moveDown(1.5);

    let inTable = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        doc.moveDown(0.4);
        continue;
      }

      if (line.startsWith('---')) {
        doc.moveDown(0.5);
        doc.rect(50, doc.y, doc.page.width - 100, 1).fill('#E2D7C3');
        doc.moveDown(0.5);
        continue;
      }

      if (line.startsWith('# ')) {
        doc.moveDown(1);
        doc.fillColor('#16281E').fontSize(15).font('Helvetica-Bold').text(sanitizeLine(line));
        doc.moveDown(0.3);
      } else if (line.startsWith('## ')) {
        doc.moveDown(0.8);
        doc.fillColor('#16281E').fontSize(13).font('Helvetica-Bold').text(sanitizeLine(line));
        doc.moveDown(0.2);
      } else if (line.startsWith('### ')) {
        doc.moveDown(0.6);
        doc.fillColor('#7A5826').fontSize(11).font('Helvetica-Bold').text(sanitizeLine(line));
        doc.moveDown(0.2);
      } else if (line.startsWith('#### ')) {
        doc.moveDown(0.5);
        doc.fillColor('#2C3E2D').fontSize(10).font('Helvetica-Bold').text(sanitizeLine(line));
        doc.moveDown(0.2);
      } else if (line.startsWith('* ') || line.startsWith('- ') || line.startsWith('• ')) {
        const bulletText = sanitizeLine(line.replace(/^[\*\-•]\s*/, ''));
        doc.fillColor('#1C1917').fontSize(9.5).font('Helvetica').text(`•  ${bulletText}`, 65, doc.y, {
          width: doc.page.width - 115,
          lineGap: 2,
        });
        doc.moveDown(0.2);
      } else if (line.startsWith('|')) {
        // Table line
        if (line.includes('---')) continue;
        const cells = line.split('|').filter(c => c.trim().length > 0).map(c => sanitizeLine(c));
        doc.fillColor('#2C3E2D').fontSize(8.5).font('Helvetica').text(cells.join('  |  '), 55, doc.y, {
          width: doc.page.width - 110,
        });
        doc.moveDown(0.2);
      } else {
        const clean = sanitizeLine(line);
        if (clean) {
          doc.fillColor('#1C1917').fontSize(9.5).font('Helvetica').text(clean, 50, doc.y, {
            width: doc.page.width - 100,
            align: 'justify',
            lineGap: 3,
          });
          doc.moveDown(0.3);
        }
      }

      // Check if near page bottom to add page break safely
      if (doc.y > doc.page.height - 70) {
        doc.addPage();
      }
    }

    // Add footers with page numbers
    const range = doc.bufferedPageRange();
    for (let p = 0; p < range.count; p++) {
      doc.switchToPage(p);
      doc.rect(50, doc.page.height - 40, doc.page.width - 100, 0.5).fill('#D4A359');
      doc.fillColor('#7A5826').fontSize(7.5).font('Helvetica')
        .text(
          `Nativaram Brasil • Resolução CONAD 01/2010 • Uso Ritualístico e Etnobotânico Exclusivo (+18) — Página ${p + 1} de ${range.count}`,
          50,
          doc.page.height - 32,
          { align: 'center', width: doc.page.width - 100 }
        );
    }

    doc.end();

    writeStream.on('finish', () => {
      const stats = fs.statSync(destPath);
      console.log(`Generated: ${config.dest} (${(stats.size / 1024).toFixed(1)} KB, ${range.count} pages)`);
      resolve();
    });
    writeStream.on('error', reject);
  });
}

async function run() {
  for (const doc of docsToGenerate) {
    await generatePdf(doc);
  }
  console.log('All NotebookLM PDFs built successfully!');
}

run().catch(console.error);
