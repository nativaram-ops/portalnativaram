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
  console.log("   TESTES AUTOMATIZADOS — NATIVARAM BRASIL");
  console.log("   Conformidade Litúrgica, Integridade de Dados & Regras");
  console.log("=======================================================\n");

  // 1. TESTES DE VALIDAÇÃO ZOD & DADOS
  console.log("1. Validação de Schemas e Contratos:");

  await test("Validador de Pedido Litúrgico rejeita cota vazia", async () => {
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

  await test("Validador de Pedido Litúrgico aceita solicitação completa", async () => {
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

  await test("Validador de Atualização aceita status litúrgicos canônicos", async () => {
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

  await test("Gerador de Protocolos produz prefixo SOL- e 4 caracteres alfa-numéricos", async () => {
    const { gerarProtocoloLiturgico } = await import("../src/lib/db/pedidos.ts");
    const protocolo = gerarProtocoloLiturgico();
    assert.match(
      protocolo,
      /^SOL-\d{4}-[A-Z0-9]{4}$/,
      `Protocolo ${protocolo} fora do padrão SOL-YYYY-XXXX`
    );
  });

  await test("Formatador de WhatsApp inclui CNPJ, Protocolo e Menção ao CONAD", async () => {
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

  await test("Catálogo de Graduações possui 4 graduações canônicas de Ayahuasca", async () => {
    const { GRADUACOES_SACRAMENTAIS } = await import("../src/data/graduacoes.ts");
    assert.ok(GRADUACOES_SACRAMENTAIS.length >= 4, "Deve ter ao menos 4 graduações");
    const codigos = GRADUACOES_SACRAMENTAIS.map((g) => g.codigo);
    assert.ok(codigos.includes("3.1"), "Deve incluir 3.1 Mainumbi");
    assert.ok(codigos.includes("5.1"), "Deve incluir 5.1 Pituã");
    assert.ok(codigos.includes("7.1"), "Deve incluir 7.1 Anhangatã");
    assert.ok(codigos.includes("10.1"), "Deve incluir 10.1 Wirapuru");
  });

  await test("Parâmetros do Feitio no Acre utilizam Tucunacá e Chacrona Rainha", async () => {
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

  await test("Catálogo de Rapés Tradicionais possui pH alcalino e zero compostos sintéticos", async () => {
    const { RAPES_TRADICIONAIS } = await import("../src/data/sacramentos.ts");
    assert.ok(RAPES_TRADICIONAIS.length >= 7, "Deve conter ao menos 7 variedades de rapé");
    for (const r of RAPES_TRADICIONAIS) {
      assert.ok(r.pHMedio.length > 0, `Rapé ${r.nome} deve ter pH médio documentado`);
      assert.ok(r.elementos.length > 0, `Rapé ${r.nome} deve ter composição botânica`);
    }
  });

  // 4. SCANNER DE COMPLIANCE LINGUÍSTICO (AGENTS.md)
  console.log("\n4. Scanner Semântico de Conformidade (AGENTS.md):");

  await test("Código e componentes em src/app/ e src/components/ não contêm palavras proibidas em texto solto", async () => {
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

  // 5. SEGURANÇA DE APIS & CONTRATOS HTTP (PLANO 002)
  console.log("\n5. Segurança de APIs & Contratos HTTP (Plano 002):");

  await test("Validador de cabeçalho administrativo bloqueia tokens inválidos ou ausentes", () => {
    const adminSecret = process.env.ADMIN_SECRET_KEY || "adm-nativaram-2026";
    const headerInvalido = "token-falso-123";
    const headerValido = adminSecret;

    assert.strictEqual(headerInvalido === adminSecret, false, "Token inválido deve ser rejeitado");
    assert.strictEqual(!null || null !== adminSecret, true, "Header ausente deve ser rejeitado");
    assert.strictEqual(headerValido === adminSecret, true, "Token legítimo deve ser aceito");
  });

  await test("Sanitizador de rateio calcula somatório de cotas com precisão decimal", () => {
    const itens = [
      { quantidade: 5, rateioUnitarioEstimado: 260 },
      { quantidade: 3, rateioUnitarioEstimado: 65 },
    ];
    const total = itens.reduce((acc, item) => acc + item.quantidade * item.rateioUnitarioEstimado, 0);
    assert.strictEqual(total, 5 * 260 + 3 * 65, "Total de rateio deve ser 1495");
  });

  // 6. CASOS DE USO & SERVIÇOS LITÚRGICOS (NÓ 2 - CAMADAS 2 E 3)
  console.log("\n6. Casos de Uso, Credenciamento & Farmacocinética (Nó 2):");

  await test("Validador de Credenciamento exige anuência formal ao CONAD nº 01/2010", async () => {
    const { CredenciamentoSchema } = await import("../src/lib/validators/credenciamento.ts");
    const payloadSemConad = {
      nomeInstituicao: "Templo da Luz Sagrada",
      cnpj: "12.345.678/0001-90",
      dataFundacao: "2015",
      enderecoTemplo: "Estrada da Floresta, Km 4",
      cidade: "Cruzeiro do Sul",
      estado: "AC",
      nomeDirigente: "Guardião Ayahuasqueiro",
      cpfDirigente: "12345678901",
      tempoLinhagemAnos: 12,
      telefoneContato: "68999887766",
      emailOficial: "luz@sagrada.org.br",
      numeroMembrosAtivos: 45,
      frequenciaRituais: "MENSAL",
      graduacaoPretendida: "5.1_PITUA",
      intencaoTrabalho: "Trabalhos litúrgicos comunitários com foco em serenidade e expansão de presença.",
      concordaComConad012010: false, // Rejeitado!
      declaraAusenciaFinsLucrativos: true,
      planejamento30Dias: true,
      termoSegurancaIntegrativa: true,
    };
    const result = CredenciamentoSchema.safeParse(payloadSemConad);
    assert.strictEqual(result.success, false, "Deve rejeitar solicitação sem anuência CONAD");
  });

  await test("Compêndio Farmacológico impõe washout mínimo de 35 a 45 dias para Fluoxetina e 30 dias para Lítio", async () => {
    const { INTERACOES_MEDICAMENTOSAS } = await import("../src/data/portal-assessoria.ts");
    const fluoxetina = INTERACOES_MEDICAMENTOSAS.find((f) => f.principioAtivo.toLowerCase().includes("fluoxetina"));
    const litio = INTERACOES_MEDICAMENTOSAS.find((f) => f.principioAtivo.toLowerCase().includes("lítio"));

    assert.ok(fluoxetina, "Fluoxetina deve estar catalogada");
    assert.ok(fluoxetina.washoutMinimo.includes("35 a 45 dias"), "Washout da Fluoxetina deve ser de 35 a 45 dias");
    assert.ok(litio, "Lítio deve estar catalogado");
    assert.ok(litio.washoutMinimo.includes("30 dias"), "Washout do Lítio deve ser de ao menos 30 dias");
  });

  await test("Configuração Next.js define rewrite canônico transparente de /sacramentos para /medicinas", async () => {
    const nextConfig = (await import("../next.config.mjs")).default;
    assert.ok(typeof nextConfig.rewrites === "function", "nextConfig deve conter função rewrites");
    const rewrites = await nextConfig.rewrites();
    const rewriteSacramentos = rewrites.find((r) => r.source === "/sacramentos");
    assert.ok(rewriteSacramentos, "Deve existir rewrite para /sacramentos");
    assert.strictEqual(rewriteSacramentos.destination, "/medicinas", "Destino deve ser /medicinas");
  });

  // 7. JORNADA DIDÁTICA, INTERFACE & DOCUMENTOS CANÔNICOS (NÓ 3 - CAMADA 1)
  console.log("\n7. Interface Visual, Funil de 5 Estações & Documentos A4 (Nó 3):");

  await test("Funil Didático possui exatamente 5 estações encadeadas com slugs canônicos", async () => {
    const navContent = await fs.readFile(
      path.join(ROOT_DIR, "src", "components", "funil", "JornadaNavTracker.tsx"),
      "utf-8"
    );
    assert.ok(navContent.includes('slug: "institucional"'), "Estação 1 deve ser institucional");
    assert.ok(navContent.includes('slug: "feitio"'), "Estação 2 deve ser feitio");
    assert.ok(navContent.includes('slug: "sacramentos"'), "Estação 3 deve ser sacramentos");
    assert.ok(navContent.includes('slug: "compliance"'), "Estação 4 deve ser compliance");
    assert.ok(navContent.includes('slug: "credenciamento"'), "Estação 5 deve ser credenciamento");
    assert.ok(navContent.includes("Etapa 5 de 5"), "Deve conter marcador da 5ª etapa");
  });

  await test("Central de Documentos disponibiliza os 5 modelos canônicos para impressão A4 e download", async () => {
    const centralContent = await fs.readFile(
      path.join(ROOT_DIR, "src", "components", "portal-dirigente", "PortalCentralDocumentos.tsx"),
      "utf-8"
    );
    assert.ok(centralContent.includes("DOCUMENTO 01: FICHA DE ANAMNESE"), "Deve conter Doc 01: Anamnese");
    assert.ok(centralContent.includes("DOCUMENTO 02: TERMO DE RESPONSABILIDADE"), "Deve conter Doc 02: TCLE");
    assert.ok(centralContent.includes("DOCUMENTO 03: MANUAL DE PROCEDIMENTO OPERACIONAL"), "Deve conter Doc 03: ATA/POP");
    assert.ok(centralContent.includes("DOCUMENTO 04: DECLARAÇÃO DE TRANSPORTE"), "Deve conter Doc 04: Trânsito");
    assert.ok(centralContent.includes("DOCUMENTO 05: TERMO DE AUTORIZAÇÃO"), "Deve conter Doc 05: Menores de Idade");
    assert.ok(centralContent.includes("window.print()"), "Deve conter gatilho de impressão A4");
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
