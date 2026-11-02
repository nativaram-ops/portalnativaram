/**
 * Testes da Biblioteca Pública de Documentos (/estudos) — Cooperativa Nativaram
 *
 * Plano 011, bloco A. Valida:
 * 1. Todo arquivo citado em estudos.ts, EstudosClient.tsx, comunidade.ts e
 *    data/comunidade_posts.json existe em public/documentos/
 * 2. public/documentos/ é a biblioteca enxuta (no máximo 8 arquivos, nomes em kebab-case)
 * 3. Nenhum documento interno (anúncios, pareceres, manuais de compliance) está publicado
 * 4. Marca, vocabulário do AGENTS.md e aviso +18 nos textos públicos
 * 5. Tamanhos exibidos conferem com o tamanho real dos arquivos
 *
 * Rodar: cmd.exe /c "node node_modules/jiti/bin/jiti.js scripts/test-biblioteca.mjs"
 */

import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(ROOT_DIR, "public", "documentos");

const ESTUDOS_TS = path.join(ROOT_DIR, "src", "data", "estudos.ts");
const ESTUDOS_CLIENT = path.join(ROOT_DIR, "src", "components", "estudos", "EstudosClient.tsx");
const COMUNIDADE_TS = path.join(ROOT_DIR, "src", "lib", "db", "comunidade.ts");
const COMUNIDADE_POSTS = path.join(ROOT_DIR, "data", "comunidade_posts.json");

const AVISO_18 = "Aviso de Segurança Integrativa (+18)";

// Documentos internos do item A1 do plano 011: nunca podem estar em public/.
const DOCUMENTOS_INTERNOS = [
  "nativaram-relatorio-assessoria-governanca.pdf",
  "assessoria-nativaram-relatorio.md",
  "dossie-estrategico-compliance-nativaram.md",
  "nativaram-parecer-juridico-comunicacao.pdf",
  "parecer-juridico-comunicacao-ayahuasca.md",
  "manual-compliance-nativaram.pdf",
  "nativaram-manual-compliance-definitivo.pdf",
  "nativaram-manual-comunicacao-compliance.pdf",
  "Diretrizes de Comunicação e Compliance Nativaram Brasil.pdf",
];

// Vocabulário proibido pelo AGENTS.md em texto público (títulos, descrições, .md publicados).
const TERMOS_PROIBIDOS = [
  /\bcuras?\b/i,
  /\bcurar\b/i,
  /\bcurad[oa]s?\b/i,
  /\bcurativ/i,
  /\bmedicinas?\b/i,
  /\bmedicinal/i,
  /\bremédios?\b/i,
  /\btratamentos?\b/i,
  /\bterapi/i,
  /\bterapêutic/i,
  /\bdoen[cç]as?\b/i,
  /\bpatologi/i,
  /\bsintomas?\b/i,
  /\bdoses?\b/i,
  /\bdosage[mn]s?\b/i,
  /\bprescri/i,
  /\bsnuff\b/i,
  /\balucin[oó]gen/i,
  /\bpsicod[eé]lic/i,
  /\blojas?\b/i,
  /\bvendas?\b/i,
  /\bpreços?\b/i,
  /\bcarrinho\b/i,
  /\bcomprar\b/i,
  /\badquirir\b/i,
  /\bclientes?\b/i,
  /\bprodutos?\b/i,
  /\bansiedade\b/i,
  /\bestresse\b/i,
  /\bdepress/i,
  /ocitocina/i,
];

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

async function listarDocumentos() {
  const entries = await fs.readdir(DOCS_DIR, { withFileTypes: true });
  return entries.filter((e) => e.isFile()).map((e) => e.name);
}

async function existe(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

/** Todas as referências a arquivos de /documentos/ nos arquivos que exibem a biblioteca. */
async function coletarReferencias() {
  const refs = new Set();
  const [estudos, client, comunidade, posts] = await Promise.all([
    fs.readFile(ESTUDOS_TS, "utf-8"),
    fs.readFile(ESTUDOS_CLIENT, "utf-8"),
    fs.readFile(COMUNIDADE_TS, "utf-8"),
    fs.readFile(COMUNIDADE_POSTS, "utf-8"),
  ]);
  for (const m of estudos.matchAll(/pdfArquivo:\s*"([^"]+)"/g)) refs.add(m[1]);
  for (const m of client.matchAll(/arquivo:\s*"([^"]+)"/g)) refs.add(m[1]);
  for (const texto of [estudos, client, comunidade, posts]) {
    for (const m of texto.matchAll(/\/documentos\/([^"`'\s)]+)/g)) {
      if (!m[1].includes("$")) refs.add(m[1]);
    }
  }
  return [...refs];
}

/** "957 KB" / "18,1 MB" → bytes */
function tamanhoEmBytes(rotulo) {
  const m = /^([\d.,]+)\s*(KB|MB)\b/.exec(rotulo.trim());
  if (!m) throw new Error(`Rótulo de tamanho ilegível: "${rotulo}"`);
  const numero = parseFloat(m[1].replace(/\./g, "").replace(",", "."));
  return numero * (m[2] === "MB" ? 1024 * 1024 : 1024);
}

async function conferirTamanho(arquivo, rotulo) {
  const { size } = await fs.stat(path.join(DOCS_DIR, arquivo));
  const exibido = tamanhoEmBytes(rotulo);
  const diferenca = Math.abs(exibido - size) / size;
  assert.ok(
    diferenca <= 0.06,
    `${arquivo}: exibido "${rotulo}" mas o arquivo tem ${size} bytes (${(size / 1024).toFixed(1)} KB)`
  );
}

function procurarTermosProibidos(texto, origem) {
  for (const termo of TERMOS_PROIBIDOS) {
    const m = termo.exec(texto);
    if (m) {
      const inicio = Math.max(0, m.index - 50);
      const trecho = texto.slice(inicio, m.index + 50).replace(/\s+/g, " ");
      assert.fail(`${origem}: termo proibido ${termo} em "…${trecho}…"`);
    }
  }
}

async function runAllTests() {
  console.log("\n=======================================================");
  console.log("   TESTES DA BIBLIOTECA PÚBLICA — COOPERATIVA NATIVARAM");
  console.log("=======================================================\n");

  console.log("1. Integridade dos links:");

  await test("Todo arquivo citado em estudos.ts, EstudosClient.tsx e comunidade existe em public/documentos/", async () => {
    const refs = await coletarReferencias();
    assert.ok(refs.length > 0, "Nenhuma referência encontrada (parser quebrado?)");
    const faltando = [];
    for (const ref of refs) {
      if (!(await existe(path.join(DOCS_DIR, decodeURIComponent(ref))))) faltando.push(ref);
    }
    assert.deepStrictEqual(faltando, [], `Arquivos referenciados que não existem: ${faltando.join(", ")}`);
  });

  console.log("\n2. Biblioteca enxuta (A6 + A10):");

  await test("public/documentos/ tem no máximo 8 arquivos", async () => {
    const arquivos = await listarDocumentos();
    assert.ok(arquivos.length <= 8, `Há ${arquivos.length} arquivos: ${arquivos.join(", ")}`);
  });

  await test("Nomes de arquivo em kebab-case: sem espaço, acento, maiúscula ou \"(1)\"", async () => {
    const arquivos = await listarDocumentos();
    const ruins = arquivos.filter((a) => !/^[a-z0-9]+(-[a-z0-9]+)*\.(pdf|md)$/.test(a));
    assert.deepStrictEqual(ruins, [], `Nomes fora do padrão: ${ruins.join(" | ")}`);
  });

  await test("Nenhum documento interno do item A1 está publicado em public/documentos/", async () => {
    const arquivos = await listarDocumentos();
    const publicados = DOCUMENTOS_INTERNOS.filter((d) => arquivos.includes(d));
    assert.deepStrictEqual(publicados, [], `Internos ainda públicos: ${publicados.join(", ")}`);
  });

  console.log("\n3. Marca, vocabulário e aviso +18 (A2, A3, A5, A8):");

  await test("Nenhum .md público contém \"Nativaram Brasil\" e todos têm o aviso +18 no topo e no rodapé", async () => {
    const mds = (await listarDocumentos()).filter((a) => a.endsWith(".md"));
    for (const md of mds) {
      const texto = await fs.readFile(path.join(DOCS_DIR, md), "utf-8");
      assert.ok(!/Nativaram Brasil/i.test(texto), `${md} contém "Nativaram Brasil"`);
      const ocorrencias = texto.split(AVISO_18).length - 1;
      assert.ok(ocorrencias >= 2, `${md}: aviso +18 deve aparecer no topo e no rodapé (achou ${ocorrencias})`);
      const inicio = texto.slice(0, 1500);
      assert.ok(inicio.includes(AVISO_18), `${md}: aviso +18 ausente no topo`);
    }
  });

  await test("Nenhum .md público usa vocabulário proibido, alegação de ocitocina ou marcador de citação sem bibliografia", async () => {
    const mds = (await listarDocumentos()).filter((a) => a.endsWith(".md"));
    for (const md of mds) {
      const texto = await fs.readFile(path.join(DOCS_DIR, md), "utf-8");
      // URLs de fontes citadas não são texto da cooperativa (ex.: slug "uma-medicina-indigena").
      procurarTermosProibidos(texto.replace(/https?:\/\/\S+/g, ""), md);
      assert.ok(!/\[cite:/i.test(texto), `${md}: marcador [cite: …] do NotebookLM`);
      assert.ok(!/\[\d+(,\s*\d+)*\]/.test(texto), `${md}: marcador numérico de citação [n, m]`);
    }
  });

  await test("Títulos, subtítulos e fontes exibidos em /estudos não contêm \"Nativaram Brasil\"", async () => {
    const { estudosData } = await import("../src/data/estudos.ts");
    for (const e of estudosData) {
      for (const campo of ["titulo", "subtitulo", "autorOuFonte", "categoriaLabel"]) {
        assert.ok(!/Nativaram Brasil/i.test(e[campo]), `estudos.ts [${e.id}].${campo}: "${e[campo]}"`);
      }
    }
    const client = await fs.readFile(ESTUDOS_CLIENT, "utf-8");
    assert.ok(!/Nativaram Brasil/i.test(client), "EstudosClient.tsx contém \"Nativaram Brasil\"");
    const estudos = await fs.readFile(ESTUDOS_TS, "utf-8");
    assert.ok(!/Nativaram Brasil/i.test(estudos), "estudos.ts contém \"Nativaram Brasil\"");
  });

  await test("Textos exibidos em estudos.ts e EstudosClient.tsx não usam vocabulário proibido", async () => {
    procurarTermosProibidos(await fs.readFile(ESTUDOS_TS, "utf-8"), "estudos.ts");
    procurarTermosProibidos(await fs.readFile(ESTUDOS_CLIENT, "utf-8"), "EstudosClient.tsx");
  });

  await test("Nenhum documento se apresenta como \"Estudo científico oficial\" e a CONAD aparece como comentário", async () => {
    for (const arq of [ESTUDOS_TS, ESTUDOS_CLIENT]) {
      const texto = await fs.readFile(arq, "utf-8");
      assert.ok(!/estudo cient[ií]fico oficial/i.test(texto), `${path.basename(arq)}: "Estudo científico oficial"`);
    }
    const { estudosData } = await import("../src/data/estudos.ts");
    const conad = estudosData.filter((e) => /CONAD/.test(e.titulo));
    assert.ok(conad.length > 0, "Nenhum item CONAD em estudos.ts");
    for (const e of conad) {
      assert.ok(/Coment[aá]rio da Cooperativa Nativaram/.test(e.titulo), `Título CONAD sem "Comentário da Cooperativa Nativaram": "${e.titulo}"`);
    }
  });

  await test("Texto oficial da Resolução CONAD 01/2010 é oferecido por link gov.br", async () => {
    const client = await fs.readFile(ESTUDOS_CLIENT, "utf-8");
    assert.ok(
      /https:\/\/www\.gov\.br\/mj\/[^"\s]*resolucao_n__01_2010[^"\s]*\.pdf/.test(client),
      "Link oficial (gov.br) da Resolução CONAD 01/2010 ausente em EstudosClient.tsx"
    );
  });

  await test("Página /estudos exibe o aviso +18 junto da lista de downloads", async () => {
    const client = await fs.readFile(ESTUDOS_CLIENT, "utf-8");
    assert.ok(client.includes(AVISO_18), "EstudosClient.tsx sem o aviso de segurança integrativa (+18)");
  });

  console.log("\n4. Tamanhos exibidos (A7):");

  await test("Tamanhos exibidos em estudos.ts e EstudosClient.tsx conferem com o arquivo real (±6%)", async () => {
    const { estudosData } = await import("../src/data/estudos.ts");
    for (const e of estudosData) await conferirTamanho(e.pdfArquivo, e.pdfTamanho);
    // A tabela de EstudosClient.tsx deriva de estudosData; se voltar a ter pares literais, também são conferidos.
    const client = await fs.readFile(ESTUDOS_CLIENT, "utf-8");
    for (const [, arquivo, tamanho] of client.matchAll(/arquivo:\s*"([^"]+)",\s*tamanho:\s*"([^"]+)"/g)) {
      await conferirTamanho(arquivo, tamanho);
    }
    // Anexos da comunidade que apontam para /documentos/
    for (const arq of [COMUNIDADE_TS, COMUNIDADE_POSTS]) {
      const texto = await fs.readFile(arq, "utf-8");
      for (const [, arquivo, tamanho] of texto.matchAll(/"?url"?:\s*"\/documentos\/([^"]+)",\s*"?tamanho"?:\s*"([^"]+)"/g)) {
        await conferirTamanho(arquivo, tamanho);
      }
    }
  });

  console.log("\n=======================================================");
  console.log(`   RESULTADOS: ${passed} passaram | ${failed} falharam`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runAllTests().catch((err) => {
  console.error("ERRO FATAL NA EXECUÇÃO DOS TESTES:", err);
  process.exit(1);
});
