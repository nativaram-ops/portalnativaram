/**
 * Testes da Matriz de Interações Medicamentosas (Plano 010, parte A)
 *
 * Rodar com:
 *   cmd.exe /c "node node_modules/jiti/bin/jiti.js scripts/test-matriz.mjs"
 *
 * Valida:
 * 1. Modelo de dados (motivo, evidência, fontes, revisão) em todas as entradas
 * 2. Correções de conteúdo da seção A2 (marcas removidas, entradas separadas)
 * 3. Novas entradas da seção A3
 * 4. Busca sem acento e priorizada por princípio ativo / marca (A5)
 * 5. Exportação CSV/PDF com as colunas novas, sem o falso .xls (plano 011, A9)
 */

import assert from "node:assert";

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

async function runAllTests() {
  console.log("\n=======================================================");
  console.log("   TESTES — MATRIZ DE INTERAÇÕES MEDICAMENTOSAS");
  console.log("=======================================================\n");

  const dados = await import("../src/data/portal-assessoria.ts");
  const { INTERACOES_MEDICAMENTOSAS: LISTA } = dados;

  const acharPorMarca = (marca) =>
    LISTA.find((i) => i.nomesComerciais.some((m) => m.toLowerCase().startsWith(marca.toLowerCase())));
  const acharPorAtivo = (ativo) =>
    LISTA.filter((i) => i.principioAtivo.toLowerCase().includes(ativo.toLowerCase()));

  // 1. MODELO DE DADOS
  console.log("1. Modelo de dados (A4):");

  await test("Toda entrada tem motivo, evidência, fontes (array) e revisao.status válidos", () => {
    for (const i of LISTA) {
      assert.ok(["INTERACAO", "CONDICAO_DE_BASE", "AMBOS"].includes(i.motivo), `${i.id}: motivo inválido (${i.motivo})`);
      assert.ok(["A", "B", "C", "D"].includes(i.evidencia), `${i.id}: evidência inválida (${i.evidencia})`);
      assert.ok(Array.isArray(i.fontes), `${i.id}: fontes deve ser array`);
      assert.ok(i.revisao && ["PENDENTE", "REVISADO"].includes(i.revisao.status), `${i.id}: revisao.status inválido`);
    }
  });

  await test("Nenhuma entrada está marcada como revisada (ninguém revisou ainda)", () => {
    const revisadas = LISTA.filter((i) => i.revisao.status !== "PENDENTE").map((i) => i.id);
    assert.deepStrictEqual(revisadas, [], `Entradas marcadas como revisadas sem revisor: ${revisadas.join(", ")}`);
  });

  await test("Toda fonte tem título, ano numérico e URL https://", () => {
    for (const i of LISTA) {
      for (const f of i.fontes) {
        assert.ok(f.titulo && f.titulo.length > 5, `${i.id}: fonte sem título`);
        assert.ok(Number.isInteger(f.ano) && f.ano > 1900, `${i.id}: fonte com ano inválido`);
        assert.ok(f.url.startsWith("https://"), `${i.id}: fonte com URL não https (${f.url})`);
      }
    }
  });

  await test("IDs são únicos e nenhuma marca aparece em duas entradas", () => {
    const ids = LISTA.map((i) => i.id);
    assert.strictEqual(new Set(ids).size, ids.length, "IDs duplicados");
    const visto = new Map();
    for (const i of LISTA) {
      for (const marca of i.nomesComerciais) {
        const chave = marca.toLowerCase();
        assert.ok(!visto.has(chave), `Marca "${marca}" em ${visto.get(chave)} e ${i.id}`);
        visto.set(chave, i.id);
      }
    }
  });

  await test("PENDENCIAS_CLINICAS é exportada como lista de textos não vazia", () => {
    assert.ok(Array.isArray(dados.PENDENCIAS_CLINICAS), "PENDENCIAS_CLINICAS deve ser array");
    assert.ok(dados.PENDENCIAS_CLINICAS.length >= 8, "Deve conter ao menos as 8 contradições da tabela A1");
    for (const p of dados.PENDENCIAS_CLINICAS) assert.strictEqual(typeof p, "string");
  });

  await test("Compatibilidade: fluoxetina 35 a 45 dias, lítio 30 dias, >= 150 marcas", () => {
    const fluox = LISTA.find((f) => f.principioAtivo.toLowerCase().includes("fluoxetina"));
    const litio = LISTA.find((f) => f.principioAtivo.toLowerCase().includes("lítio"));
    assert.ok(fluox.washoutMinimo.includes("35 a 45 dias"));
    assert.ok(litio.washoutMinimo.includes("30 dias"));
    const total = LISTA.reduce((acc, i) => acc + i.nomesComerciais.length, 0);
    assert.ok(total >= 150, `Total de marcas ${total}`);
  });

  // 2. CORREÇÕES A2
  console.log("\n2. Correções de conteúdo (A2):");

  await test("Marcas 'Nardil', 'Marplan' e 'Girotto' não existem na matriz", () => {
    const todas = LISTA.flatMap((i) => i.nomesComerciais.map((m) => m.toLowerCase()));
    for (const proibida of ["nardil", "marplan", "girotto"]) {
      assert.ok(!todas.some((m) => m.includes(proibida)), `Marca ${proibida} ainda presente`);
    }
  });

  await test("Lamotrigina está em entrada própria com motivo CONDICAO_DE_BASE, separada do fenobarbital", () => {
    const entradas = acharPorAtivo("lamotrigina");
    assert.strictEqual(entradas.length, 1, "Lamotrigina deve aparecer em uma única entrada");
    const lamo = entradas[0];
    assert.strictEqual(lamo.motivo, "CONDICAO_DE_BASE");
    assert.ok(!lamo.principioAtivo.toLowerCase().includes("fenobarbital"), "Fenobarbital deve estar em outra entrada");
    assert.ok(lamo.mecanismo.includes("34"), "Texto deve citar os 34 relatos com lamotrigina (Nayak 2021)");
    assert.ok(lamo.fontes.some((f) => f.url === "https://pubmed.ncbi.nlm.nih.gov/34348413/"));
  });

  await test("Lítio cita Nayak 2021 (62 relatos, 47%, 39%) e trata o inositol como hipótese", () => {
    const litio = LISTA.find((i) => i.id === "estabilizador-carbonato-litio");
    assert.ok(litio.mecanismo.includes("62"), "Deve citar 62 relatos");
    assert.ok(litio.mecanismo.includes("47%"));
    assert.ok(litio.mecanismo.includes("39%"));
    assert.ok(/hipótese/i.test(litio.mecanismo), "Mecanismo do inositol deve aparecer como hipótese");
    assert.ok(!/epidemiológic/i.test(litio.mecanismo), "Não é estudo epidemiológico");
    assert.strictEqual(litio.diretrizPdf, "NAO_PODE_PARTICIPAR", "Veto deve ser mantido");
    assert.ok(litio.fontes.some((f) => f.url === "https://pubmed.ncbi.nlm.nih.gov/34348413/"));
    const tox = dados.TOXICIDADE_LITIO;
    assert.ok(tox.incidenciaConvulsao.includes("62"), "TOXICIDADE_LITIO deve citar 62 relatos");
    assert.ok(!/UTI/.test(tox.incidenciaConvulsao), "Não deve afirmar internação em UTI");
    assert.ok(/hipótese/i.test(tox.mecanismo), "TOXICIDADE_LITIO.mecanismo deve ser hipótese");
  });

  await test("Linezolida/azul de metileno separados dos inibidores de CYP (ciprofloxacino etc.)", () => {
    const linezolida = acharPorAtivo("linezolida");
    const cipro = acharPorAtivo("ciprofloxacino");
    assert.strictEqual(linezolida.length, 1);
    assert.strictEqual(cipro.length, 1);
    assert.notStrictEqual(linezolida[0].id, cipro[0].id, "Devem ser entradas distintas");
    assert.ok(linezolida[0].nomesComerciais.some((m) => m.startsWith("Sepurin")), "Sepurin deve estar na entrada dos IMAOs ocultos");
  });

  await test("Clorfeniramina separada do DXM e sem o rótulo de 'potente inibidor de SERT'", () => {
    const clorf = acharPorAtivo("clorfeniramina");
    const dxm = acharPorAtivo("dextrometorfano");
    assert.strictEqual(clorf.length, 1);
    assert.strictEqual(dxm.length, 1);
    assert.notStrictEqual(clorf[0].id, dxm[0].id);
    for (const i of [...clorf, ...dxm]) {
      assert.ok(!/clorfeniramina[^.]*potentes? inibidor/i.test(i.mecanismo), `${i.id}: ainda chama clorfeniramina de potente inibidor`);
    }
  });

  await test("GLP-1 não usa mais a regra de 48 h e cita o guia ASA 2024", () => {
    const glp1 = LISTA.find((i) => i.id === "glp1-ozempic-mounjaro-saxenda");
    assert.ok(!glp1.washoutMinimo.includes("48h"), "Regra de 48 h deve sair");
    assert.ok(/prescritor/i.test(glp1.washoutMinimo + glp1.recomendacaoLiturgica));
    assert.ok(glp1.fontes.some((f) => f.url.startsWith("https://asahq.org/")));
  });

  await test("Triptanos: naratriptano e eletriptano descritos como não dependentes da MAO-A", () => {
    const trip = LISTA.find((i) => i.id === "enxaqueca-triptanos-ergotaminicos");
    assert.ok(/naratriptano e (o )?eletriptano não/i.test(trip.mecanismo), "Mecanismo deve distinguir naratriptano/eletriptano");
  });

  await test("FAQ 8 separa a CONAD da política interna e FAQ 10 não diz 'perfeitamente legal'", () => {
    const faq8 = dados.FAQ_DIRIGENTE.find((f) => f.id === "faq-8");
    const faq10 = dados.FAQ_DIRIGENTE.find((f) => f.id === "faq-10");
    assert.ok(/poder familiar/i.test(faq8.resposta));
    assert.ok(/política interna/i.test(faq8.resposta + (faq8.destaqueConselho || "")));
    assert.ok(!/perfeitamente legal/i.test(faq10.resposta));
    assert.ok(/internacional/i.test(faq10.resposta));
    assert.ok(/companhia aérea/i.test(faq10.resposta));
  });

  // 3. NOVAS ENTRADAS A3
  console.log("\n3. Novas entradas (A3):");

  await test("Marcas e substâncias novas estão catalogadas", () => {
    for (const marca of ["Miosan", "Mirtax", "Benziflex", "Neosaldina", "Atentah", "Spravato", "Motilium", "Peridal"]) {
      assert.ok(acharPorMarca(marca), `Marca ${marca} ausente`);
    }
    for (const ativo of ["ciclobenzaprina", "isometepteno", "atomoxetina", "cetamina", "domperidona", "sinefrina", "amiodarona", "5-meo-dmt", "kambô", "ibogaína", "peganum harmala", "jurema", "mescalina", "mdma", "cocaína", "anfetamina", "álcool", "cannabis"]) {
      assert.ok(acharPorAtivo(ativo).length >= 1, `Princípio ${ativo} ausente`);
    }
  });

  await test("5-MeO-DMT cita o relato de óbito de 2005", () => {
    const meo = acharPorAtivo("5-meo-dmt")[0];
    assert.ok(meo.fontes.some((f) => f.url === "https://pubmed.ncbi.nlm.nih.gov/16356341/"));
  });

  // 4. BUSCA
  console.log("\n4. Busca (A5):");

  await test("normalizarTexto remove acentos e caixa", () => {
    assert.strictEqual(dados.normalizarTexto("Ácido Valpróico LÍTIO"), "acido valproico litio");
  });

  const casosBusca = [
    ["litio", "estabilizador-carbonato-litio"],
    ["valproico", "anticonvulsivante-valproico"],
    ["Neosaldina", (i) => i.principioAtivo.toLowerCase().includes("isometepteno")],
    ["miosan", (i) => i.principioAtivo.toLowerCase().includes("ciclobenzaprina")],
    ["sepurin", (i) => i.principioAtivo.toLowerCase().includes("linezolida")],
  ];
  for (const [termo, esperado] of casosBusca) {
    await test(`Busca por "${termo}" retorna a entrada certa em primeiro lugar`, () => {
      const r = dados.buscarInteracoes(termo, LISTA);
      assert.ok(r.length >= 1, "Nenhum resultado");
      const ok = typeof esperado === "string" ? r[0].id === esperado : esperado(r[0]);
      assert.ok(ok, `Primeiro resultado foi ${r[0].id}`);
    });
  }

  await test("Busca primária não varre o texto do mecanismo; texto livre é opcional", () => {
    // "inositol" só aparece no mecanismo do lítio
    assert.strictEqual(dados.buscarInteracoes("inositol", LISTA).length, 0);
    const livre = dados.buscarInteracoes("inositol", LISTA, { incluirTextoLivre: true });
    assert.ok(livre.some((i) => i.id === "estabilizador-carbonato-litio"));
  });

  await test("Termo vazio devolve a lista inteira", () => {
    assert.strictEqual(dados.buscarInteracoes("  ", LISTA).length, LISTA.length);
  });

  // 5. EXPORTAÇÃO
  console.log("\n5. Exportação (plano 011, A9):");

  await test("Lista nominal inclui motivo, evidência e status de revisão; entradas sem marca também aparecem", async () => {
    const exp = await import("../src/lib/export-medicamentos.ts");
    const linhas = exp.obterListaNominalMedicamentos();
    for (const l of linhas) {
      assert.ok(l.motivo && l.evidencia && l.statusRevisao, `${l.nomeComercial}: colunas novas ausentes`);
    }
    assert.ok(linhas.some((l) => /kambô/i.test(l.principioAtivo)), "Entrada sem marca (kambô) deve gerar linha");
  });

  await test("CSV gerado tem colunas de motivo, evidência e revisão", async () => {
    const exp = await import("../src/lib/export-medicamentos.ts");
    const csv = exp.gerarCsvMedicamentos();
    const cabecalho = csv.split("\r\n")[0];
    assert.ok(/Motivo/.test(cabecalho));
    assert.ok(/Evidencia/.test(cabecalho));
    assert.ok(/Revisao/.test(cabecalho));
  });

  await test("O falso .xls (HTML com extensão trocada) não é mais gerado", async () => {
    const fs = await import("node:fs/promises");
    const src = await fs.readFile(new URL("../src/lib/export-medicamentos.ts", import.meta.url), "utf-8");
    assert.ok(!src.includes(".xls\""), "Não deve haver download .xls");
    assert.ok(!src.includes("application/vnd.ms-excel"), "Não deve haver MIME de Excel");
  });

  console.log("\n=======================================================");
  console.log(`   RESULTADOS: ${passed} passaram | ${failed} falharam`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

runAllTests().catch((err) => {
  console.error("ERRO FATAL NA EXECUÇÃO DOS TESTES:", err);
  process.exit(1);
});
