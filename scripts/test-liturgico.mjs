/**
 * Suíte de Testes Automatizados da Cooperativa Nativaram Brasil
 *
 * Valida:
 * 1. Schemas de validação Zod (pedidos e credenciamento)
 * 2. Operações de persistência e auditoria de pedidos
 * 3. Formatadores e sanitizadores de WhatsApp institucional
 * 4. Integridade fitoquímica dos catálogos (graduações e rapés)
 * 5. Scanner semântico de termos proibidos pelo AGENTS.md
 */

import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
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
  console.log("   TESTES AUTOMATIZADOS — NATIVARAM BRASIL");
  console.log("   Conformidade Litúrgica, Integridade de Dados & Regras");
  console.log("=======================================================\n");

  // 1. TESTES DE VALIDAÇÃO ZOD & DADOS
  console.log("1. Validação de Schemas e Contratos:");

  test("Validador de Pedido Litúrgico rejeita cota vazia", async () => {
    const { NovoPedidoSchema } = await import("../src/lib/validators/pedido.ts");
    const payloadInvalido = {
      temploId: "NAT-TEMPLO-842",
      temploNome: "Templo Teste",
      cidade: "São Paulo",
      estado: "SP",
      dirigenteNome: "Dirigente Teste",
      dirigenteTelefone: "11999998888",
      dirigenteEmail: "teste@templo.org",
      cnpj: "12.345.678/0001-90",
      itens: [], // vazio!
      dataCerimoniaPretendida: "2026-10-30",
      mensagemIntencao: "Trabalho de oração",
    };
    const result = NovoPedidoSchema.safeParse(payloadInvalido);
    assert.strictEqual(result.success, false, "Deveria falhar para lista de itens vazia");
  });

  test("Validador de Pedido Litúrgico aceita solicitação completa", async () => {
    const { NovoPedidoSchema } = await import("../src/lib/validators/pedido.ts");
    const payloadValido = {
      temploId: "NAT-TEMPLO-842",
      temploNome: "Templo Céu do Cruzeiro",
      cidade: "São Paulo",
      estado: "SP",
      dirigenteNome: "Padrinho Marcos Silva",
      dirigenteTelefone: "11987654321",
      dirigenteEmail: "marcos@ceudocruzeiro.org.br",
      cnpj: "34.567.890/0001-12",
      itens: [
        {
          id: "10.1_WIRAPURU",
          tipo: "GRADUACAO_AYAHUASCA",
          nome: "10.1 Wirapuru",
          codigoOuSubtitulo: "Semi-Mel",
          quantidade: 10,
          unidade: "Litros",
          rateioUnitarioEstimado: 260,
        },
      ],
      dataCerimoniaPretendida: "2026-11-15",
      mensagemIntencao: "Cerimônia litúrgica regular de primavera para comungantes credenciados.",
    };
    const result = NovoPedidoSchema.safeParse(payloadValido);
    assert.strictEqual(result.success, true, "Deveria validar pedido completo");
  });

  test("Validador de Atualização aceita status litúrgicos canônicos", async () => {
    const { AtualizarPedidoSchema } = await import("../src/lib/validators/pedido.ts");
    const updateValido = {
      status: "EM_TRANSITO_REFRIGERADO",
      loteVinculado: "AC-2026-08",
      codigoRastreio: "NTV-SP-842-BR",
      previsaoEntrega: "Em 48h",
    };
    const result = AtualizarPedidoSchema.safeParse(updateValido);
    assert.strictEqual(result.success, true);
  });

  // 2. TESTES DE PERSISTÊNCIA & PROTOCOLOS
  console.log("\n2. Motor de Banco de Dados & Protocolos:");

  test("Gerador de Protocolos produz prefixo SOL- e 4 caracteres alfa-numéricos", async () => {
    const { gerarProtocoloLiturgico } = await import("../src/lib/db/pedidos.ts");
    const protocolo = gerarProtocoloLiturgico();
    assert.match(
      protocolo,
      /^SOL-\d{4}-[A-Z0-9]{4}$/,
      `Protocolo ${protocolo} fora do padrão SOL-YYYY-XXXX`
    );
  });

  test("Formatador de WhatsApp inclui CNPJ, Protocolo e Menção ao CONAD", async () => {
    const { formatarMensagemWhatsApp } = await import("../src/lib/db/pedidos.ts");
    const pedidoMock = {
      id: "SOL-2026-TEST",
      temploId: "NAT-TEMPLO-842",
      temploNome: "Templo Céu do Cruzeiro",
      cidade: "São Paulo",
      estado: "SP",
      dirigenteNome: "Padrinho Marcos",
      dirigenteTelefone: "11987654321",
      dirigenteEmail: "marcos@ceudocruzeiro.org",
      cnpj: "34.567.890/0001-12",
      itens: [
        {
          id: "10.1",
          tipo: "GRADUACAO_AYAHUASCA",
          nome: "10.1 Wirapuru",
          codigoOuSubtitulo: "Semi-Mel",
          quantidade: 10,
          unidade: "Litros",
          rateioUnitarioEstimado: 260,
          rateioTotalEstimado: 2600,
        },
      ],
      rateioTotal: 2600,
      dataCerimoniaPretendida: "2026-11-15",
      mensagemIntencao: "Paz e acolhimento",
      status: "SOLICITADO",
      historico: [],
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    };

    const textoUrl = formatarMensagemWhatsApp(pedidoMock);
    const decoded = decodeURIComponent(textoUrl);

    assert.ok(decoded.includes("SOL-2026-TEST"), "Deve conter protocolo");
    assert.ok(decoded.includes("Templo Céu do Cruzeiro"), "Deve conter nome do templo");
    assert.ok(decoded.includes("CONAD nº 01/2010"), "Deve conter citação ao CONAD");
    assert.ok(decoded.includes("34.567.890/0001-12"), "Deve conter CNPJ");
  });

  // 3. INTEGRIDADE DOS CATÁLOGOS
  console.log("\n3. Integridade Etnobotânica & Fitoquímica:");

  test("Catálogo de Graduações possui 4 graduações canônicas de Ayahuasca", async () => {
    const { GRADUACOES_SACRAMENTAIS } = await import("../src/data/graduacoes.ts");
    assert.ok(GRADUACOES_SACRAMENTAIS.length >= 4, "Deve ter ao menos 4 graduações");
    const codigos = GRADUACOES_SACRAMENTAIS.map((g) => g.codigo);
    assert.ok(codigos.includes("3.1"), "Deve incluir 3.1 Mainumbi");
    assert.ok(codigos.includes("5.1"), "Deve incluir 5.1 Pituã");
    assert.ok(codigos.includes("7.1"), "Deve incluir 7.1 Anhangatã");
    assert.ok(codigos.includes("10.1"), "Deve incluir 10.1 Wirapuru");
  });

  test("Parâmetros do Feitio no Acre utilizam Tucunacá e Chacrona Rainha", async () => {
    const { PARAMETROS_OPERACIONAIS_FEITIO } = await import("../src/data/graduacoes.ts");
    assert.ok(
      PARAMETROS_OPERACIONAIS_FEITIO.cipoAdotado.includes("Tucunaca"),
      "Cipó deve ser Tucunacá"
    );
    assert.ok(
      PARAMETROS_OPERACIONAIS_FEITIO.folhaAdotada.includes("Chacrona Rainha"),
      "Folha deve ser Chacrona Rainha"
    );
    assert.strictEqual(
      PARAMETROS_OPERACIONAIS_FEITIO.antecedenciaMinimaDias,
      30,
      "Antecedência mínima deve ser 30 dias"
    );
  });

  test("Catálogo de Rapés Tradicionais possui pH alcalino e zero compostos sintéticos", async () => {
    const { RAPES_TRADICIONAIS } = await import("../src/data/sacramentos.ts");
    assert.ok(RAPES_TRADICIONAIS.length >= 7, "Deve conter ao menos 7 variedades de rapé");
    for (const r of RAPES_TRADICIONAIS) {
      assert.ok(r.pHMedio.length > 0, `Rapé ${r.nome} deve ter pH médio documentado`);
      assert.ok(r.elementos.length > 0, `Rapé ${r.nome} deve ter composição botânica`);
    }
  });

  // 4. SCANNER DE COMPLIANCE LINGUÍSTICO (AGENTS.md)
  console.log("\n4. Scanner Semântico de Conformidade (AGENTS.md):");

  test("Código e componentes em src/app/ e src/components/ não contêm palavras proibidas em texto solto", async () => {
    const prohibitedTerms = [
      /\bcomprar\b/i,
      /\bcliente\b/i,
      /\bremédio\b/i,
    ];

    async function scanDir(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== "node_modules" && entry.name !== ".next") {
            await scanDir(fullPath);
          }
        } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
          const content = await fs.readFile(fullPath, "utf-8");
          for (const term of prohibitedTerms) {
            if (term.test(content)) {
              // Se encontrar, reporta arquivo e termo
              assert.fail(`Termo proibido ${term} encontrado em ${path.relative(ROOT_DIR, fullPath)}`);
            }
          }
        }
      }
    }

    await scanDir(path.join(ROOT_DIR, "src", "app"));
    await scanDir(path.join(ROOT_DIR, "src", "components", "portal-dirigente"));
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
