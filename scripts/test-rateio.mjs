/**
 * Testes do cálculo de rateio por volume (src/data/graduacoes.ts).
 *
 * Execução: cmd.exe /c "node node_modules/jiti/bin/jiti.js scripts/test-rateio.mjs"
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

async function run() {
  console.log("\n=======================================================");
  console.log("   TESTES DO RATEIO POR VOLUME");
  console.log("=======================================================\n");

  const { obterCotaRateio, TABELA_EVOLUTIVA_RATEIO, GRADUACOES_SACRAMENTAIS } = await import(
    "../src/data/graduacoes.ts"
  );

  await test("Toda graduação do catálogo tem linha própria na tabela de rateio (inclusive Mel e Gel)", () => {
    for (const g of GRADUACOES_SACRAMENTAIS) {
      const linha = TABELA_EVOLUTIVA_RATEIO.find((t) => t.graduacaoId === g.id);
      assert.ok(linha, `Sem linha de rateio para ${g.id}`);
      assert.strictEqual(
        obterCotaRateio(g.id, 7).valorUnitario,
        linha.valor5a10L,
        `${g.id} deve usar o próprio valor, não o de outra graduação`
      );
    }
  });

  await test("Mel e Gel não recebem o valor da Pituã", () => {
    assert.strictEqual(obterCotaRateio("SACRAMENTO_MEL", 7).valorUnitario, 460);
    assert.strictEqual(obterCotaRateio("SACRAMENTO_GEL", 7).valorUnitario, 1250);
    assert.strictEqual(obterCotaRateio("SACRAMENTO_GEL", 7).unidade, "Quilo (kg)");
  });

  await test("Código desconhecido gera erro em vez de valor de outra graduação", () => {
    assert.throws(() => obterCotaRateio("MEL", 7));
    assert.throws(() => obterCotaRateio("GEL", 7));
    assert.throws(() => obterCotaRateio("5", 7), "Prefixo não pode casar por aproximação");
    assert.throws(() => obterCotaRateio("", 7));
  });

  await test("Código curto exato continua aceito (3.1, 5.1, 7.1, 10.1)", () => {
    assert.strictEqual(obterCotaRateio("10.1", 7).valorUnitario, 380);
    assert.strictEqual(obterCotaRateio("3.1", 12).valorUnitario, 200);
  });

  await test("Faixas: abaixo de 5, 5 a <10, 10 a 20 e acima de 20 (sob consulta)", () => {
    const casos = [
      [4.99, "abaixoMinimo", 260],
      [5, "5a10L", 260],
      [9.99, "5a10L", 260],
      [10, "10a20L", 240],
      [20, "10a20L", 240],
    ];
    for (const [qtd, faixa, unitario] of casos) {
      const r = obterCotaRateio("5.1_PITUA", qtd);
      assert.strictEqual(r.faixa, faixa, `${qtd} L deveria cair em ${faixa}`);
      assert.strictEqual(r.valorUnitario, unitario);
      assert.strictEqual(r.valorTotal, Number((qtd * unitario).toFixed(2)));
    }
  });

  await test("Acima de 20 L/kg não promete total: valor sob consulta do Conselho", () => {
    const r = obterCotaRateio("5.1_PITUA", 20.01);
    assert.strictEqual(r.faixa, "acima20L");
    assert.strictEqual(r.aCombinar, true);
    assert.strictEqual(r.valorTotal, null, "Total acima de 20 L é definido pelo Conselho");
  });

  console.log("\n=======================================================");
  console.log(`   RESULTADOS: ${passed} passaram | ${failed} falharam`);
  console.log("=======================================================\n");
  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error("ERRO FATAL:", err);
  process.exit(1);
});
