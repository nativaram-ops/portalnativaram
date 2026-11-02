/**
 * Testes da Central de Documentos do Portal do Dirigente — Cooperativa Nativaram
 *
 * Valida (planos 010 B1–B4 e 011 B5):
 * 1. Fonte única: os textos dos documentos vivem em src/data/documentos/
 * 2. Ausência de cláusulas de exoneração e fundamentos legais incorretos
 * 3. Metadados obrigatórios (versão, data, status de revisão) em todo documento
 * 4. Presença dos documentos novos (06 a 11) e do conteúdo mínimo de cada um
 * 5. Higiene dos arquivos de knowledge-base/notebooklm
 *
 * Execução: cmd.exe /c "node node_modules/jiti/bin/jiti.js scripts/test-documentos.mjs"
 */

import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const DIR_DOCUMENTOS = path.join(ROOT_DIR, "src", "data", "documentos");
const DIR_KB = path.join(ROOT_DIR, "knowledge-base", "notebooklm");
const ARQ_COMPONENTE = path.join(
  ROOT_DIR,
  "src",
  "components",
  "portal-dirigente",
  "PortalCentralDocumentos.tsx"
);

const CONTEXTO_TESTE = {
  temploNome: "Templo Teste",
  temploCidade: "Cidade Teste / UF",
  temploDirigente: "Dirigente Teste",
  temploRegistro: "00.000.000/0000-00",
  dataEmissao: "02 de novembro de 2026",
};

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

async function listarArquivos(dir, extensoes) {
  const saida = [];
  let entradas = [];
  try {
    entradas = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return saida;
  }
  for (const e of entradas) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) saida.push(...(await listarArquivos(p, extensoes)));
    else if (extensoes.some((x) => e.name.endsWith(x))) saida.push(p);
  }
  return saida;
}

async function carregarModulo() {
  return import("../src/data/documentos/index.ts");
}

async function runAllTests() {
  console.log("\n=======================================================");
  console.log("   TESTES — CENTRAL DE DOCUMENTOS (COOPERATIVA NATIVARAM)");
  console.log("=======================================================\n");

  // 1. TEXTOS PROIBIDOS
  console.log("1. Textos proibidos (jurídico, marca, moldura do NotebookLM):");

  const PROIBIDOS = [
    "isenta",
    "culpa exclusiva",
    "RDC ANVISA nº 09/2015",
    "RDC ANVISA 9/2015",
    "RDC 9/2015",
    "Nativaram Brasil",
    "Aqui está a transcrição",
    "Status do Seu Acervo",
    "13.787",
    "1.821/2007",
  ];

  await test("Nenhum arquivo de documentos, do componente ou da knowledge-base contém texto proibido", async () => {
    const arquivos = [
      ...(await listarArquivos(DIR_DOCUMENTOS, [".ts", ".tsx"])),
      ARQ_COMPONENTE,
      ...(await listarArquivos(DIR_KB, [".md"])),
    ];
    assert.ok(arquivos.length >= 8, `Esperava ao menos 8 arquivos, achei ${arquivos.length}`);
    const achados = [];
    for (const arq of arquivos) {
      const conteudo = (await fs.readFile(arq, "utf-8")).toLowerCase();
      for (const termo of PROIBIDOS) {
        if (conteudo.includes(termo.toLowerCase())) {
          achados.push(`${path.relative(ROOT_DIR, arq)} → "${termo}"`);
        }
      }
    }
    assert.deepStrictEqual(achados, [], `Ocorrências proibidas:\n      ${achados.join("\n      ")}`);
  });

  // 2. FONTE ÚNICA
  console.log("\n2. Fonte única dos textos:");

  await test("Componente importa os documentos de src/data/documentos e não carrega textos duplicados", async () => {
    const comp = await fs.readFile(ARQ_COMPONENTE, "utf-8");
    assert.ok(comp.includes("@/data/documentos"), "Componente deve importar de @/data/documentos");
    assert.ok(!comp.includes("getTextoCompleto"), "Não deve haver mais o gerador de texto duplicado");
    assert.ok(!comp.includes("MÓDULO I:"), "Conteúdo dos documentos não deve estar no componente");
    assert.ok(comp.includes("window.print()"), "Deve manter a impressão A4");
    const linhas = comp.split("\n").length;
    assert.ok(linhas < 600, `Componente deveria ter menos de 600 linhas, tem ${linhas}`);
  });

  // 3. METADADOS
  console.log("\n3. Metadados obrigatórios:");

  await test("Todos os documentos têm id, número, título, versão, data da versão e lista de revisão", async () => {
    const { DOCUMENTOS_CENTRAL } = await carregarModulo();
    assert.ok(Array.isArray(DOCUMENTOS_CENTRAL) && DOCUMENTOS_CENTRAL.length >= 11, "Esperava ao menos 11 documentos");
    for (const doc of DOCUMENTOS_CENTRAL) {
      assert.ok(doc.id && doc.numero && doc.titulo, `Documento sem id/número/título: ${JSON.stringify(doc.id)}`);
      assert.ok(typeof doc.versao === "string" && doc.versao.trim(), `${doc.id} sem versão`);
      assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(doc.dataVersao), `${doc.id} com dataVersao inválida: ${doc.dataVersao}`);
      assert.ok(Array.isArray(doc.revisaoPendente), `${doc.id} sem revisaoPendente`);
    }
  });

  await test("Documentos aparecem numerados em ordem crescente (01, 02, 03…)", async () => {
    const { DOCUMENTOS_CENTRAL } = await carregarModulo();
    const numeros = DOCUMENTOS_CENTRAL.map((d) => d.numero);
    const esperado = numeros.map((_, i) => String(i + 1).padStart(2, "0"));
    assert.deepStrictEqual(numeros, esperado);
  });

  await test("Documentos com conteúdo clínico ou jurídico declaram revisão pendente", async () => {
    const { DOCUMENTOS_CENTRAL } = await carregarModulo();
    const porId = Object.fromEntries(DOCUMENTOS_CENTRAL.map((d) => [d.id, d]));
    for (const id of ["ANAMNESE", "TERMO", "MENORES", "POLITICA_PRIVACIDADE"]) {
      assert.ok(
        porId[id].revisaoPendente.some((r) => /jurídica/i.test(r)),
        `${id} deve marcar revisão jurídica pendente`
      );
    }
    for (const id of ["ANAMNESE", "PARECER_MEDICO", "RECONFIRMACAO_D0", "CARTAO_EMERGENCIA"]) {
      assert.ok(
        porId[id].revisaoPendente.some((r) => /clínica/i.test(r)),
        `${id} deve marcar revisão clínica pendente`
      );
    }
  });

  // 4. DOCUMENTOS NOVOS
  console.log("\n4. Documentos novos (plano 010, B3):");

  await test("Existem Doc 06 (parecer), 07 (D-0), 08 (emergência), 09 (guia), cartão e política de privacidade", async () => {
    const { DOCUMENTOS_CENTRAL } = await carregarModulo();
    const ids = DOCUMENTOS_CENTRAL.map((d) => d.id);
    for (const id of [
      "ANAMNESE",
      "TERMO",
      "ATA",
      "TRANSITO",
      "MENORES",
      "PARECER_MEDICO",
      "RECONFIRMACAO_D0",
      "PLANO_EMERGENCIA",
      "GUIA_PARTICIPANTE",
      "CARTAO_EMERGENCIA",
      "POLITICA_PRIVACIDADE",
    ]) {
      assert.ok(ids.includes(id), `Falta o documento ${id}`);
    }
  });

  await test("Gerador de Markdown produz título, versão e status de revisão de cada documento", async () => {
    const { DOCUMENTOS_CENTRAL, gerarMarkdown } = await carregarModulo();
    for (const doc of DOCUMENTOS_CENTRAL) {
      const md = gerarMarkdown(doc, CONTEXTO_TESTE);
      assert.ok(md.includes(doc.titulo), `Markdown de ${doc.id} sem o título`);
      assert.ok(md.includes(`DOCUMENTO ${doc.numero}`), `Markdown de ${doc.id} sem o número`);
      assert.ok(md.includes(doc.versao), `Markdown de ${doc.id} sem a versão`);
      assert.ok(md.includes("Cooperativa Nativaram") || md.includes("COOPERATIVA NATIVARAM"), `Markdown de ${doc.id} sem a marca`);
      assert.ok(!md.includes("undefined") && !md.includes("[object Object]"), `Markdown de ${doc.id} com valor não resolvido`);
    }
  });

  await test("Ficha de anamnese tem tabela de medicamentos, pergunta aberta de 60 dias, C-SSRS e validade", async () => {
    const { DOCUMENTOS_CENTRAL, gerarMarkdown } = await carregarModulo();
    const ficha = DOCUMENTOS_CENTRAL.find((d) => d.id === "ANAMNESE");
    const md = gerarMarkdown(ficha, CONTEXTO_TESTE);
    for (const coluna of ["Medicamento", "Dose", "Para quê", "Quem prescreveu", "Data da última tomada", "Suspensão supervisionada"]) {
      assert.ok(md.includes(coluna), `Tabela de medicamentos sem a coluna "${coluna}"`);
    }
    for (const termo of ["60 dias", "Neosaldina", "Torsilax", "Vick 44E", "pré-treino"]) {
      assert.ok(md.includes(termo), `Pergunta aberta sem "${termo}"`);
    }
    assert.ok(md.includes("C-SSRS") && md.includes("Columbia Lighthouse Project"), "Sem instrução do C-SSRS oficial");
    for (const termo of ["Kambô", "5-MeO-DMT", "Ibogaína", "Arruda-síria"]) {
      assert.ok(md.includes(termo), `Sem pergunta sobre ${termo}`);
    }
    assert.ok(/válida até/i.test(md), "Sem campo de validade da ficha");
    assert.ok(/(documento|doc) 07/i.test(md), "Sem menção à reconfirmação no dia (Doc 07)");
    assert.ok(md.includes("Tabela de Medicamentos do Portal"), "Sem remissão à matriz oficial");
    assert.ok(!md.includes("47%"), "Ficha não deve repetir o dado de 47% fora de contexto");
  });

  await test("Cartão da equipe de saúde cita IMAO-A, DMT, horário e fármacos a evitar", async () => {
    const { DOCUMENTOS_CENTRAL, gerarMarkdown } = await carregarModulo();
    const doc = DOCUMENTOS_CENTRAL.find((d) => d.id === "CARTAO_EMERGENCIA");
    const md = gerarMarkdown(doc, CONTEXTO_TESTE).toLowerCase();
    for (const termo of ["imao-a", "dmt", "meperidina", "tramadol", "fentanil", "azul de metileno", "__h"]) {
      assert.ok(md.includes(termo), `Cartão sem "${termo}"`);
    }
  });

  await test("Guia do participante proíbe suspender remédio por conta própria", async () => {
    const { DOCUMENTOS_CENTRAL, gerarMarkdown } = await carregarModulo();
    const doc = DOCUMENTOS_CENTRAL.find((d) => d.id === "GUIA_PARTICIPANTE");
    const md = gerarMarkdown(doc, CONTEXTO_TESTE).toLowerCase();
    assert.ok(md.includes("nunca") && md.includes("por conta própria"), "Guia sem o aviso de não suspender remédio");
  });

  await test("Política de privacidade e termos trazem retenção a preencher, art. 11 da LGPD e encarregado", async () => {
    const { DOCUMENTOS_CENTRAL, gerarMarkdown } = await carregarModulo();
    for (const id of ["ANAMNESE", "TERMO", "POLITICA_PRIVACIDADE"]) {
      const md = gerarMarkdown(DOCUMENTOS_CENTRAL.find((d) => d.id === id), CONTEXTO_TESTE);
      assert.ok(md.includes("art. 11, I"), `${id} sem base legal de consentimento (art. 11, I)`);
      assert.ok(/encarregado/i.test(md), `${id} sem campo de encarregado`);
      assert.ok(!md.includes("20 anos") && !md.includes("20 (vinte) anos"), `${id} não deve fixar guarda de 20 anos`);
    }
    const politica = gerarMarkdown(DOCUMENTOS_CENTRAL.find((d) => d.id === "POLITICA_PRIVACIDADE"), CONTEXTO_TESTE);
    assert.ok(politica.includes('art. 11, II, "e"'), "Política sem proteção da vida (art. 11, II, e)");
  });

  await test("Parecer médico e reconfirmação D-0 têm os campos exigidos", async () => {
    const { DOCUMENTOS_CENTRAL, gerarMarkdown } = await carregarModulo();
    const parecer = gerarMarkdown(DOCUMENTOS_CENTRAL.find((d) => d.id === "PARECER_MEDICO"), CONTEXTO_TESTE);
    for (const termo of ["CRM", "IMAO-A reversível", "DMT", "liberad"]) {
      assert.ok(parecer.includes(termo), `Parecer sem "${termo}"`);
    }
    const d0 = gerarMarkdown(DOCUMENTOS_CENTRAL.find((d) => d.id === "RECONFIRMACAO_D0"), CONTEXTO_TESTE);
    for (const termo of ["72 h", "Pressão arterial", "Frequência cardíaca", "Glicemia", "APTO", "INAPTO"]) {
      assert.ok(d0.includes(termo), `Reconfirmação D-0 sem "${termo}"`);
    }
  });

  // 5. KNOWLEDGE-BASE
  console.log("\n5. Higiene de knowledge-base/notebooklm:");

  await test("Arquivos não começam com bloco de código nem carregam LaTeX quebrado", async () => {
    const arquivos = await listarArquivos(DIR_KB, [".md"]);
    for (const arq of arquivos) {
      const c = await fs.readFile(arq, "utf-8");
      const nome = path.basename(arq);
      assert.ok(!c.trimStart().startsWith("```"), `${nome} começa com bloco de código`);
      assert.ok(!c.includes("\\\\("), `${nome} contém LaTeX quebrado \\\\(`);
      assert.ok(!c.includes("💡"), `${nome} contém moldura do NotebookLM`);
      const cercas = (c.match(/^```/gm) || []).length;
      assert.ok(cercas % 2 === 0, `${nome} tem blocos de código desbalanceados (${cercas})`);
    }
  });

  await test("Compêndio restaura as plantas, remete à matriz e corrige o dado do lítio", async () => {
    const c = await fs.readFile(path.join(DIR_KB, "etnofarmacologia-interacoes-contraindicacoes-ayahuasca.md"), "utf-8");
    assert.ok(!/^1\. \*\*cujas folhas/m.test(c), "Lista de plantas ainda começa sem o nome");
    assert.ok(c.includes("Psychotria viridis") && c.includes("Banisteriopsis caapi"), "Plantas ausentes");
    assert.ok(c.includes("Tabela de Medicamentos do Portal"), "Sem remissão à matriz oficial");
    assert.ok(c.includes("62 relatos"), "Dado do lítio sem o número correto de relatos");
    assert.ok(!c.includes("Estudos epidemiológicos e observacionais demonstram"), "Ainda chama relatos de estudo epidemiológico");
  });

  console.log("\n=======================================================");
  console.log(`   RESULTADO: ${passed} passaram, ${failed} falharam`);
  console.log("=======================================================\n");
  if (failed > 0) process.exit(1);
}

runAllTests();
