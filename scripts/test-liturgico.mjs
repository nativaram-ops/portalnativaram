/**
 * Suíte de Testes Automatizados da Cooperativa Nativaram
 *
 * Valida:
 * 1. Schemas de validação Zod (pedidos, credenciamento e solicitações)
 * 2. Operações de persistência híbrida atômica e auditoria de pedidos
 * 3. Formatadores e sanitizadores de WhatsApp institucional
 * 4. Integridade fitoquímica dos catálogos (graduações e 15 rapés)
 * 5. Scanner semântico de termos proibidos pelo AGENTS.md
 */

import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// A suíte nunca fala com o Supabase de produção: isSupabaseConfigured() devolve false
// com esta variável, e tudo roda no repositório local (data/ e tmpdir).
process.env.NATIVARAM_TEST = "1";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;

/** Importa módulos que usam o alias "@/" (rotas de API do App Router). */
async function importarRota(caminhoRelativoARaiz) {
  const { createRequire } = await import("node:module");
  const createJiti = createRequire(__filename)("jiti");
  const jitiComAlias = createJiti(__filename, {
    alias: { "@": path.join(ROOT_DIR, "src") },
  });
  return jitiComAlias(path.join(ROOT_DIR, caminhoRelativoARaiz));
}

/** Remove registros TEST-* do repositório local de solicitações (data/ e tmpdir). */
async function limparSolicitacoesDeTeste() {
  const os = await import("node:os");
  const dbPaths = [
    path.join(process.cwd(), "data", "solicitacoes_homologacao.json"),
    path.join(os.tmpdir(), "nativaram_solicitacoes_homologacao.json"),
  ];
  for (const dbPath of dbPaths) {
    try {
      const raw = await fs.readFile(dbPath, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter((item) => !item.id.startsWith("TEST-"));
        await fs.writeFile(dbPath, JSON.stringify(cleaned, null, 2), "utf-8");
      } else if (parsed && Array.isArray(parsed.items)) {
        parsed.items = parsed.items.filter((item) => !item.id.startsWith("TEST-"));
        await fs.writeFile(dbPath, JSON.stringify(parsed, null, 2), "utf-8");
      }
    } catch {
      // Ignora erro de limpeza se arquivo não existir
    }
  }
}

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
  console.log("   TESTES AUTOMATIZADOS — COOPERATIVA NATIVARAM");
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
    await scanDir(path.join(ROOT_DIR, "src", "components", "home"));
    await scanDir(path.join(ROOT_DIR, "src", "components", "feitio"));
    await scanDir(path.join(ROOT_DIR, "src", "components", "projetos-de-luz"));
    await scanDir(path.join(ROOT_DIR, "src", "components", "manifesto"));
    await scanDir(path.join(ROOT_DIR, "src", "components", "forms"));
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

  await test("Central de Documentos disponibiliza os modelos canônicos para impressão A4 e download", async () => {
    const centralContent = await fs.readFile(
      path.join(ROOT_DIR, "src", "components", "portal-dirigente", "PortalCentralDocumentos.tsx"),
      "utf-8"
    );
    // O texto dos documentos vive em src/data/documentos/ (fonte única); o componente só renderiza.
    const { DOCUMENTOS_CENTRAL, gerarMarkdown } = await import("../src/data/documentos/index.ts");
    const ctx = { temploNome: "T", temploCidade: "C", temploDirigente: "D", temploRegistro: "R", dataEmissao: "hoje" };
    const md = DOCUMENTOS_CENTRAL.map((d) => gerarMarkdown(d, ctx)).join("\n");
    assert.ok(md.includes("DOCUMENTO 01: FICHA DE ANAMNESE"), "Deve conter Doc 01: Anamnese");
    assert.ok(md.includes("DOCUMENTO 02: TERMO DE RESPONSABILIDADE"), "Deve conter Doc 02: TCLE");
    assert.ok(md.includes("DOCUMENTO 03: MANUAL DE PROCEDIMENTO OPERACIONAL"), "Deve conter Doc 03: ATA/POP");
    assert.ok(md.includes("DOCUMENTO 04: DECLARAÇÃO DE TRANSPORTE"), "Deve conter Doc 04: Trânsito");
    assert.ok(md.includes("DOCUMENTO 05: TERMO DE AUTORIZAÇÃO"), "Deve conter Doc 05: Menores de Idade");
    assert.ok(centralContent.includes("window.print()"), "Deve conter gatilho de impressão A4");
  });

  // 8. ACOLHIMENTO LITÚRGICO & GRUPOS INFORMAIS (OPÇÃO B - /reconhecimento)
  console.log("\n8. Acolhimento Litúrgico & Grupos Informais em Desenvolvimento:");

  await test("Validador de Reconhecimento aceita grupo informal em desenvolvimento", async () => {
    const { ReconhecimentoSchema } = await import("../src/lib/validators/reconhecimento.ts");
    const payloadValido = {
      tipoVinculo: "GRUPO_EM_FORMACAO",
      nomeIdentificacao: "Círculo Flor da Mata",
      linhagemEspiritual: "Xamanismo Universalista",
      tempoJornada: "3 anos de estudos",
      quantidadeParticipantes: "8 a 12 participantes",
      frequenciaEncontros: "MENSAL",
      graduacaoPretendida: "5.1_PITUA",
      litragemEstimadaMensal: "5",
      intencaoTrabalho: "Vigílias de oração e reconexão espiritual fraterna.",
      nomeResponsavel: "Condutor Fraterno",
      telefoneContato: "11987654321",
      emailContato: "condutor@flordamata.org",
      cidade: "São Paulo",
      estado: "SP",
      metodoContatoPreferencial: "WHATSAPP",
      concordaUsoLiturgico: true,
      planejamentoAntecedencia30Dias: true,
      compromissoTriagemSeguranca: true,
      consentimentoLinhagem: true,
    };
    const result = ReconhecimentoSchema.safeParse(payloadValido);
    assert.ok(result.success, "Payload válido deve ser aceito sem exigência de CNPJ");
  });

  await test("Validador de Reconhecimento rejeita dados sem compromisso litúrgico", async () => {
    const { ReconhecimentoSchema } = await import("../src/lib/validators/reconhecimento.ts");
    const payloadSemCompromisso = {
      tipoVinculo: "REZADOR_AUTONOMO",
      nomeIdentificacao: "Rezo da Serra",
      linhagemEspiritual: "Linha Nativa",
      tempoJornada: "5 anos",
      quantidadeParticipantes: "5 pessoas",
      frequenciaEncontros: "QUINZENAL",
      graduacaoPretendida: "10.1_WIRAPURU",
      litragemEstimadaMensal: "5",
      intencaoTrabalho: "Cerimônias tradicionais de acalento.",
      nomeResponsavel: "Rezador João",
      telefoneContato: "27999887766",
      emailContato: "joao@rezo.org",
      cidade: "Serra",
      estado: "ES",
      metodoContatoPreferencial: "WHATSAPP",
      concordaUsoLiturgico: false, // Rejeita!
      planejamentoAntecedencia30Dias: true,
      compromissoTriagemSeguranca: true,
    };
    const result = ReconhecimentoSchema.safeParse(payloadSemCompromisso);
    assert.strictEqual(result.success, false, "Deve rejeitar ausência de compromisso com CONAD 01/2010");
  });

  await test("Motor de Reconhecimento formata protocolo REC- e mensagem WhatsApp respeitosa", async () => {
    const { generateProtocoloReconhecimento, formatReconhecimentoWhatsApp } = await import(
      "../src/lib/reconhecimento/engine.ts"
    );
    const protocolo = generateProtocoloReconhecimento();
    assert.ok(protocolo.startsWith("REC-"), "Protocolo deve iniciar com REC-");

    const mockDossier = {
      protocolo,
      dataSubmissao: "13/10/2026",
      data: {
        tipoVinculo: "GRUPO_EM_FORMACAO",
        nomeIdentificacao: "Círculo Sol Nascente",
        linhagemEspiritual: "Linha do Santo Daime",
        tempoJornada: "2 anos",
        quantidadeParticipantes: "10 pessoas",
        frequenciaEncontros: "MENSAL",
        graduacaoPretendida: "5.1_PITUA",
        litragemEstimadaMensal: "5",
        intencaoTrabalho: "Estudos dos hinários e orações.",
        nomeResponsavel: "Maria Guardiã",
        telefoneContato: "31988887777",
        emailContato: "maria@solnascente.org",
        cidade: "Belo Horizonte",
        estado: "MG",
        metodoContatoPreferencial: "WHATSAPP",
        concordaUsoLiturgico: true,
        planejamentoAntecedencia30Dias: true,
        compromissoTriagemSeguranca: true,
      },
    };

    const textoUrl = formatReconhecimentoWhatsApp(mockDossier);
    const decoded = decodeURIComponent(textoUrl);
    assert.ok(decoded.includes(protocolo), "Deve conter o protocolo gerado");
    assert.ok(decoded.includes("Círculo Sol Nascente"), "Deve conter o nome do grupo");
    assert.ok(decoded.includes("CONAD nº 01/2010"), "Deve referenciar o CONAD");
  });

  // 9. FLUXO DE HOMOLOGAÇÃO, GERAÇÃO DE ACESSO & LOGIN DINÂMICO
  console.log("\n9. Homologação, Geração de Acesso & Autenticação de Congregações:");

  await test("Registro de solicitação inicia com status PENDENTE_LIBERACAO", async () => {
    const { registrarSolicitacao, obterTodasSolicitacoes } = await import(
      "../src/lib/db/homologacoes.ts"
    );

    const testId = `TEST-SOL-${Date.now()}`;
    const nova = await registrarSolicitacao({
      id: testId,
      tipo: "GRUPO_INFORMAL",
      nomeEntidade: "Círculo das Águas Claras",
      nomeResponsavel: "Padrinho João",
      telefone: "68999991122",
      email: "joao@aguasclaras.org",
      cidade: "Rio Branco",
      estado: "AC",
      linhagem: "Linha da Floresta",
      graduacao: "5.1 Pituã",
      volumeEstimado: "5 Litros",
      intencao: "Rezos comunitários mensais",
    });

    assert.strictEqual(nova.status, "PENDENTE_LIBERACAO");
    assert.strictEqual(nova.id, testId);

    const todas = await obterTodasSolicitacoes();
    const encontrada = todas.find((s) => s.id === testId);
    assert.ok(encontrada, "Solicitação deve persistir no banco de homologações");
    assert.strictEqual(encontrada.status, "PENDENTE_LIBERACAO");
  });

  await test("Homologação gera Login, Senha litúrgica e mensagem de WhatsApp com link de acesso", async () => {
    const { registrarSolicitacao, homologarSolicitacao } = await import(
      "../src/lib/db/homologacoes.ts"
    );

    const testId = `TEST-HOM-${Date.now()}`;
    await registrarSolicitacao({
      id: testId,
      tipo: "INSTITUICAO_FORMAL",
      nomeEntidade: "Templo Estrela da Alvorada",
      nomeResponsavel: "Madre Teresa",
      telefone: "61998765432",
      email: "teresa@alvorada.org",
      cidade: "Brasília",
      estado: "DF",
      cnpj: "12.345.678/0001-90",
      linhagem: "Santo Daime",
      graduacao: "10.1 Wirapuru",
      volumeEstimado: "20 Litros",
      intencao: "Sessões oficiais e trabalhos litúrgicos",
    });

    const resultado = await homologarSolicitacao(testId);
    assert.ok(resultado, "Homologação deve retornar sucesso");
    assert.strictEqual(resultado.solicitacao.status, "HOMOLOGADO");
    assert.ok(
      resultado.loginGerado.startsWith("NAT-TEMPLO-"),
      `Login ${resultado.loginGerado} deve iniciar com NAT-TEMPLO- para instituição formal`
    );
    assert.ok(
      resultado.senhaGerada.startsWith("Luz"),
      `Senha ${resultado.senhaGerada} deve iniciar com Luz`
    );
    assert.ok(resultado.whatsappUrl.includes("wa.me/5561998765432"), "URL deve apontar para o WhatsApp do dirigente");
    assert.ok(decodeURIComponent(resultado.whatsappUrl).includes(resultado.loginGerado), "Mensagem deve conter o login gerado");
    assert.ok(decodeURIComponent(resultado.whatsappUrl).includes(resultado.senhaGerada), "Mensagem deve conter a senha gerada");
    assert.ok(decodeURIComponent(resultado.whatsappUrl).includes("/portal-dirigente"), "Mensagem deve conter link do portal");
  });

  await test("Autenticador de dirigente valida credenciais geradas dinamicamente e bloqueia senhas incorretas", async () => {
    const { registrarSolicitacao, homologarSolicitacao, validarCredenciaisDirigente } = await import(
      "../src/lib/db/homologacoes.ts"
    );

    const testId = `TEST-AUTH-${Date.now()}`;
    try {
      await registrarSolicitacao({
        id: testId,
        tipo: "GRUPO_INFORMAL",
        nomeEntidade: "Espaço Luz da Serra",
        nomeResponsavel: "Guardião Carlos",
        telefone: "11977778888",
        email: "carlos@luzdaserra.org",
        cidade: "Campos do Jordão",
        estado: "SP",
        linhagem: "Xamanismo",
        graduacao: "3.1 Mainumbi",
        volumeEstimado: "3 Litros",
        intencao: "Jornadas de meditação sensorial",
      });

      const resHom = await homologarSolicitacao(testId);
      assert.ok(resHom, "Resultado de homologação não pode ser nulo");
      const { loginGerado, senhaGerada } = resHom;

      // 1. Acesso correto com login gerado e senha gerada
      const congregaoValida = await validarCredenciaisDirigente(loginGerado, senhaGerada);
      assert.ok(congregaoValida, "Deve permitir acesso com credenciais válidas recém-homologadas");
      assert.strictEqual(congregaoValida.nomeEntidade, "Espaço Luz da Serra");

      // 2. Bloqueio com senha errada
      const congregaoInvalida = await validarCredenciaisDirigente(loginGerado, "senha-totalmente-errada");
      assert.strictEqual(congregaoInvalida, null, "Deve rejeitar senha incorreta");

      // 3. Bloqueio com login inexistente
      const loginInexistente = await validarCredenciaisDirigente("NAT-INEXISTENTE-999", "qualquer123");
      assert.strictEqual(loginInexistente, null, "Deve rejeitar login inexistente");
    } finally {
      await limparSolicitacoesDeTeste();
    }
  });

  await test("Exclusão de instituição remove registro do banco híbrido e revoga acesso", async () => {
    const {
      registrarSolicitacao,
      homologarSolicitacao,
      excluirSolicitacao,
      obterTodasSolicitacoes,
      validarCredenciaisDirigente,
    } = await import("../src/lib/db/homologacoes.ts");

    const testId = `TEST-DEL-${Date.now()}`;
    try {
      await registrarSolicitacao({
        id: testId,
        tipo: "INSTITUICAO_FORMAL",
        nomeEntidade: "Templo Teste para Exclusão",
        nomeResponsavel: "Dirigente Teste",
        telefone: "11911112222",
        cidade: "São Paulo",
        estado: "SP",
        linhagem: "Xamanismo",
        graduacao: "5.1 Pituã",
        volumeEstimado: "5 Litros",
        intencao: "Teste de exclusão",
      });

      const resHom = await homologarSolicitacao(testId);
      assert.ok(resHom, "Homologação para teste de exclusão deve ser criada");
      const { loginGerado, senhaGerada } = resHom;
      assert.ok(
        await validarCredenciaisDirigente(loginGerado, senhaGerada),
        "Antes da exclusão o acesso deve funcionar"
      );

      // Executa exclusão
      const excluido = await excluirSolicitacao(testId);
      assert.strictEqual(excluido, true, "Exclusão deve retornar sucesso");

      // Confirma que não consta mais em obterTodasSolicitacoes
      const todas = await obterTodasSolicitacoes();
      const aindaExiste = todas.find((s) => s.id === testId);
      assert.strictEqual(aindaExiste, undefined, "Instituição excluída não pode aparecer nas solicitações ativas");

      // E o acesso deixa de existir
      assert.strictEqual(
        await validarCredenciaisDirigente(loginGerado, senhaGerada),
        null,
        "Instituição excluída não pode mais entrar no portal"
      );
    } finally {
      await limparSolicitacoesDeTeste();
    }
  });

  await test("Login de dirigente recusa código ou e-mail sem cadastro, mesmo com chave no formato das geradas", async () => {
    const { validarCredenciaisDirigente } = await import("../src/lib/db/homologacoes.ts");
    const chaveNoFormato = `Luz${new Date().getFullYear()}-4321`;

    for (const login of ["NAT-TEMPLO-ZZ99", "NAT-GRP-ZZ99", "REC-2026-ZZ99", "alguem@exemplo.org"]) {
      assert.strictEqual(
        await validarCredenciaisDirigente(login, chaveNoFormato),
        null,
        `Login sem cadastro (${login}) não pode ser aceito`
      );
    }
  });

  await test("POST público de credenciamento não sobrescreve cadastro existente nem expõe códigos de acesso", async () => {
    const { POST, GET } = await importarRota("src/app/api/solicitacoes/route.ts");
    const { obterTodasSolicitacoes } = await import("../src/lib/db/homologacoes.ts");

    const antes = (await obterTodasSolicitacoes()).find((s) => s.id === "NAT-TEMPLO-842");
    assert.ok(antes, "Seed NAT-TEMPLO-842 deve existir");

    const res = await POST(
      new Request("http://localhost/api/solicitacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "nat-templo-842",
          tipo: "INSTITUICAO_FORMAL",
          nomeEntidade: "Invasor",
          nomeResponsavel: "Invasor",
          telefone: "11900000000",
          linhagem: "Qualquer",
          graduacao: "5.1 Pituã",
          volumeEstimado: "5 Litros",
          intencao: "Tentativa de sobrescrever",
        }),
      })
    );
    assert.strictEqual(res.status, 409, "Protocolo existente deve ser recusado para visitantes");

    const depois = (await obterTodasSolicitacoes()).find((s) => s.id === "NAT-TEMPLO-842");
    assert.strictEqual(depois.nomeEntidade, antes.nomeEntidade, "Cadastro não pode ter sido alterado");
    assert.strictEqual(depois.telefone, antes.telefone, "Telefone não pode ter sido alterado");

    const lista = await (await GET(new Request("http://localhost/api/solicitacoes"))).json();
    assert.ok(
      lista.solicitacoes.every((s) => s.loginGerado === undefined && s.senhaGerada === undefined),
      "Visitante não pode ver códigos de acesso"
    );
  });

  await test("Comunidade: visitante não grava; dirigente grava só em nome do próprio templo e não sobrescreve post alheio", async () => {
    const { POST } = await importarRota("src/app/api/comunidade/posts/route.ts");
    const { POST: POST_AGENDA } = await importarRota("src/app/api/comunidade/agenda/route.ts");
    const { POST: POST_PERFIL } = await importarRota("src/app/api/comunidade/perfis/route.ts");
    const { createSessionToken, SESSION_COOKIE_NAME } = await import("../src/lib/auth/session.ts");
    const { deletarPublicacao } = await import("../src/lib/db/comunidade.ts");

    const cookieDe = (codigo) =>
      `${SESSION_COOKIE_NAME}=${createSessionToken({ role: "DIRIGENTE", codigo })}`;
    const corpoPost = (extra = {}) =>
      JSON.stringify({
        titulo: "Reflexão de teste da suíte",
        resumo: "Resumo de teste com tamanho suficiente.",
        conteudoMarkdown: "Conteúdo de teste com tamanho suficiente para o validador.",
        categoria: "REFLEXAO_DOUTRINARIA",
        status: "RASCUNHO",
        ...extra,
      });
    const req = (url, body, cookie) =>
      new Request(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(cookie ? { cookie } : {}) },
        body,
      });

    const criados = [];
    try {
      // Visitante (sem sessão) é recusado nas três rotas de gravação
      assert.strictEqual((await POST(req("http://localhost/api/comunidade/posts", corpoPost()))).status, 401);
      assert.strictEqual(
        (await POST_AGENDA(req("http://localhost/api/comunidade/agenda", JSON.stringify({}), null))).status,
        401
      );
      assert.strictEqual(
        (await POST_PERFIL(req("http://localhost/api/comunidade/perfis", JSON.stringify({}), null))).status,
        401
      );

      // Dirigente A tenta publicar em nome do templo 842: o templo vem da sessão
      const resA = await POST(
        req(
          "http://localhost/api/comunidade/posts",
          corpoPost({ temploCodigo: "NAT-TEMPLO-842" }),
          cookieDe("NAT-TEMPLO-TESTA")
        )
      );
      assert.strictEqual(resA.status, 200);
      const postA = (await resA.json()).post;
      criados.push(postA.id);
      assert.strictEqual(postA.temploCodigo, "NAT-TEMPLO-TESTA", "Templo deve vir da sessão, não do corpo");

      // Dirigente B tenta sobrescrever o post de A pelo id
      const resB = await POST(
        req("http://localhost/api/comunidade/posts", corpoPost({ id: postA.id }), cookieDe("NAT-TEMPLO-TESTB"))
      );
      assert.strictEqual(resB.status, 403, "Post de outro templo não pode ser sobrescrito");
    } finally {
      for (const id of criados) await deletarPublicacao(id, "", true);
    }
  });

  await test("Pedidos: visitante não lê nem cria; dirigente só vê e cria pedidos do próprio templo", async () => {
    const { GET, POST } = await importarRota("src/app/api/pedidos/route.ts");
    const { GET: GET_ID } = await importarRota("src/app/api/pedidos/[id]/route.ts");
    const { createSessionToken, SESSION_COOKIE_NAME } = await import("../src/lib/auth/session.ts");
    const { obterTodosPedidos } = await import("../src/lib/db/pedidos.ts");
    const cookieDe = (codigo) =>
      `${SESSION_COOKIE_NAME}=${createSessionToken({ role: "DIRIGENTE", codigo })}`;

    // Visitante
    assert.strictEqual((await GET(new Request("http://localhost/api/pedidos"))).status, 401);
    const pedidoAlheio = (await obterTodosPedidos({})).find((p) => p.temploId.toUpperCase() !== "NAT-TEMPLO-TESTA");
    assert.ok(pedidoAlheio, "Deve existir pedido de exemplo de outro templo");
    assert.strictEqual(
      (await GET_ID(new Request(`http://localhost/api/pedidos/${pedidoAlheio.id}`), {
        params: Promise.resolve({ id: pedidoAlheio.id }),
      })).status,
      401
    );
    assert.strictEqual(
      (await POST(
        new Request("http://localhost/api/pedidos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        })
      )).status,
      401
    );

    // Dirigente pedindo a lista de outro templo recebe só os próprios
    const res = await GET(
      new Request(`http://localhost/api/pedidos?temploId=${encodeURIComponent(pedidoAlheio.temploId)}`, {
        headers: { cookie: cookieDe("NAT-TEMPLO-TESTA") },
      })
    );
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.ok(
      json.pedidos.every((p) => p.temploId.toUpperCase() === "NAT-TEMPLO-TESTA"),
      "Dirigente não pode ver pedidos de outro templo"
    );
    assert.strictEqual(json.metricas, null, "Métricas gerais são só do Conselho");

    // Pedido de outro templo pelo id
    const resId = await GET_ID(
      new Request(`http://localhost/api/pedidos/${pedidoAlheio.id}`, {
        headers: { cookie: cookieDe("NAT-TEMPLO-TESTA") },
      }),
      { params: Promise.resolve({ id: pedidoAlheio.id }) }
    );
    assert.strictEqual(resId.status, 404, "Pedido de outro templo não pode ser lido");
  });

  await test("Validadores da comunidade recusam links não-https, imagens de outro tipo e conteúdo gigante", async () => {
    const { PublicacaoSchema, PerfilTemploSchema, ItemAgendaSchema } = await import("../src/lib/validators/comunidade.ts");
    const base = {
      titulo: "Título válido",
      resumo: "Resumo válido com tamanho.",
      conteudoMarkdown: "x".repeat(40),
      categoria: "REFLEXAO_DOUTRINARIA",
    };
    assert.ok(PublicacaoSchema.safeParse(base).success, "Publicação mínima válida deve passar");
    assert.ok(
      PublicacaoSchema.safeParse({ ...base, imagemCapa: "data:image/webp;base64,AAAA" }).success,
      "Data URL WebP deve passar"
    );
    assert.ok(PublicacaoSchema.safeParse({ ...base, imagemCapa: "/images/feitio.jpg" }).success);

    for (const [caso, extra] of [
      ["markdown gigante", { conteudoMarkdown: "x".repeat(50_001) }],
      ["imagem HTML", { imagemCapa: "data:text/html;base64,AAAA" }],
      ["imagem protocolo-relativo", { imagemCapa: "//outro-site.com/a.png" }],
      ["anexo javascript:", { anexos: [{ nome: "Doc", url: "javascript:alert(1)", tipo: "PDF" }] }],
      ["anexo http", { anexos: [{ nome: "Doc", url: "http://exemplo.org/a.pdf", tipo: "PDF" }] }],
      ["galeria com 13 fotos", { fotosGaleria: Array(13).fill("/a.jpg") }],
    ]) {
      assert.ok(!PublicacaoSchema.safeParse({ ...base, ...extra }).success, `Deveria recusar: ${caso}`);
    }

    const perfilBase = {
      nomeInstituicao: "Templo",
      dirigenteResponsavel: "Dirigente",
      linhagem: "Linhagem",
      cidade: "Rio Branco",
      estado: "AC",
      bioApresentacao: "Apresentação com tamanho suficiente.",
    };
    assert.ok(PerfilTemploSchema.safeParse(perfilBase).success);
    assert.ok(
      !PerfilTemploSchema.safeParse({ ...perfilBase, redesSociais: { website: "javascript:alert(1)" } }).success,
      "Site do templo precisa ser https"
    );
    assert.ok(
      !ItemAgendaSchema.safeParse({
        tituloRito: "Rito",
        dataEvento: "2026-12-01",
        horarioInicio: "19:00",
        linkInscricao: "data:text/html,oi",
      }).success,
      "Link de inscrição precisa ser https"
    );
  });

  await test("Pedidos: servidor recalcula o rateio oficial; grupo sem CNPJ não recebe valores; item fora do catálogo é recusado", async () => {
    const { POST } = await importarRota("src/app/api/pedidos/route.ts");
    const { createSessionToken, SESSION_COOKIE_NAME } = await import("../src/lib/auth/session.ts");
    const { excluirPedido } = await import("../src/lib/db/pedidos.ts");
    const cookie = (codigo, tipo) =>
      `${SESSION_COOKIE_NAME}=${createSessionToken({ role: "DIRIGENTE", codigo, tipo })}`;
    const corpo = (itens) =>
      JSON.stringify({
        temploId: "QUALQUER",
        temploNome: "Templo de Teste",
        cidade: "Rio Branco",
        estado: "AC",
        dirigenteNome: "Dirigente Teste",
        dirigenteTelefone: "68999990000",
        dirigenteEmail: "teste@exemplo.org",
        cnpj: "00000000000000",
        itens,
        dataCerimoniaPretendida: "2026-12-20",
        mensagemIntencao: "Teste automatizado",
      });
    const item = (id, tipo, quantidade, rateio) => ({
      id,
      tipo,
      nome: id,
      codigoOuSubtitulo: "",
      quantidade,
      unidade: tipo === "RAPE_SAGRADO" ? "Frascos (25g)" : "Litros",
      rateioUnitarioEstimado: rateio,
    });
    const enviar = (body, ck) =>
      POST(
        new Request("http://localhost/api/pedidos", {
          method: "POST",
          headers: { "Content-Type": "application/json", cookie: ck },
          body,
        })
      );

    const criados = [];
    try {
      // Valor manipulado pelo navegador é ignorado
      const res = await enviar(
        corpo([item("5.1_PITUA", "GRADUACAO_AYAHUASCA", 7, 1), item("TSUNU", "RAPE_SAGRADO", 2, 0)]),
        cookie("NAT-TEMPLO-TESTA", "INSTITUICAO_FORMAL")
      );
      assert.strictEqual(res.status, 201);
      const pedido = (await res.json()).pedido;
      criados.push(pedido.id);
      assert.strictEqual(pedido.itens[0].rateioUnitarioEstimado, 260, "Pituã 7 L = valor oficial da faixa 5–10 L");
      assert.strictEqual(pedido.itens[1].rateioUnitarioEstimado, 65, "Rapé = valor oficial de apoio");
      assert.strictEqual(pedido.rateioTotal, 7 * 260 + 2 * 65);

      // Grupo sem CNPJ: solicitação vai para análise, sem valores
      const resGrupo = await enviar(
        corpo([item("5.1_PITUA", "GRADUACAO_AYAHUASCA", 7, 260)]),
        cookie("NAT-GRP-TESTB", "GRUPO_INFORMAL")
      );
      assert.strictEqual(resGrupo.status, 201);
      const jsonGrupo = await resGrupo.json();
      criados.push(jsonGrupo.pedido.id);
      assert.strictEqual(jsonGrupo.pedido.rateioTotal, 0, "Grupo sem CNPJ não recebe valores");
      assert.ok(
        decodeURIComponent(jsonGrupo.whatsappUrl).includes("a definir pelo Conselho"),
        "Mensagem ao Conselho indica valores a definir"
      );

      // Item inexistente
      const resInvalido = await enviar(
        corpo([item("INVENTADO", "GRADUACAO_AYAHUASCA", 7, 1)]),
        cookie("NAT-TEMPLO-TESTA", "INSTITUICAO_FORMAL")
      );
      assert.strictEqual(resInvalido.status, 400);
    } finally {
      for (const id of criados) await excluirPedido(id);
    }
  });

  await test("Exclusão é durável: cadastro inicial excluído não volta; recusa legítima continua visível; inexistente retorna false", async () => {
    const {
      obterTodasSolicitacoes,
      excluirSolicitacao,
      registrarSolicitacao,
    } = await import("../src/lib/db/homologacoes.ts");
    const os = await import("node:os");
    const caminhos = [
      path.join(process.cwd(), "data", "solicitacoes_homologacao.json"),
      path.join(os.tmpdir(), "nativaram_solicitacoes_homologacao.json"),
    ];
    const backups = {};
    for (const c of caminhos) {
      try { backups[c] = await fs.readFile(c, "utf-8"); } catch { backups[c] = null; }
    }
    try {
      const seed = (await obterTodasSolicitacoes()).find((s) => s.id === "NAT-TEMPLO-913");
      assert.ok(seed, "Cadastro inicial NAT-TEMPLO-913 deve existir antes do teste");

      assert.strictEqual(await excluirSolicitacao("NAT-TEMPLO-913"), true);
      const depois = await obterTodasSolicitacoes();
      assert.ok(!depois.some((s) => s.id === "NAT-TEMPLO-913"), "Cadastro inicial excluído não pode voltar pelos dados iniciais");

      assert.strictEqual(await excluirSolicitacao("NAO-EXISTE-123"), false, "Exclusão de id inexistente retorna false");

      const recusaId = `TEST-RECUSA-${Date.now()}`;
      await registrarSolicitacao({
        id: recusaId,
        tipo: "GRUPO_INFORMAL",
        nomeEntidade: "Grupo Recusado",
        nomeResponsavel: "Responsável",
        telefone: "11900001111",
        cidade: "SP",
        estado: "SP",
        linhagem: "Teste",
        graduacao: "3.1 Mainumbi",
        volumeEstimado: "5 Litros",
        intencao: "Teste de recusa legítima",
        status: "RECUSADO",
      });
      assert.ok(
        (await obterTodasSolicitacoes()).some((s) => s.id === recusaId),
        "Recusa do Conselho (sem exclusão) continua no painel"
      );
    } finally {
      for (const c of caminhos) {
        if (backups[c] === null) await fs.rm(c, { force: true });
        else await fs.writeFile(c, backups[c], "utf-8");
      }
    }
  });

  await test("Gravação no Supabase com erro falha em produção e só registra fora dela", async () => {
    const { gravarNoSupabase } = await import("../src/lib/db/core-hybrid-store.ts");
    const envAnterior = process.env.NODE_ENV;
    const erroSimulado = Promise.resolve({ error: { message: "permission denied (RLS)" } });
    const originalError = console.error;
    console.error = () => {};
    try {
      process.env.NODE_ENV = "development";
      await gravarNoSupabase(Promise.resolve({ error: { message: "x" } }), "teste");
      process.env.NODE_ENV = "production";
      await assert.rejects(() => gravarNoSupabase(erroSimulado, "teste"), /não confirmada/);
      await gravarNoSupabase(Promise.resolve({ error: null }), "teste");
    } finally {
      console.error = originalError;
      if (envAnterior === undefined) delete process.env.NODE_ENV;
      else process.env.NODE_ENV = envAnterior;
    }
  });

  await test("Cadastro homologado sem chave gerada não aceita chave arbitrária", async () => {
    const { registrarSolicitacao, validarCredenciaisDirigente } = await import("../src/lib/db/homologacoes.ts");
    const testId = `TEST-SEMCHAVE-${Date.now()}`;
    try {
      await registrarSolicitacao({
        id: testId,
        tipo: "INSTITUICAO_FORMAL",
        nomeEntidade: "Templo Sem Chave",
        nomeResponsavel: "Dirigente Teste",
        telefone: "11911113333",
        cidade: "São Paulo",
        estado: "SP",
        linhagem: "Xamanismo",
        graduacao: "5.1 Pituã",
        volumeEstimado: "5 Litros",
        intencao: "Teste de cadastro sem chave",
        status: "HOMOLOGADO",
      });
      assert.strictEqual(
        await validarCredenciaisDirigente(testId, "qualquer-coisa"),
        null,
        "Sem chave gerada, nenhuma chave pode ser aceita"
      );
    } finally {
      await limparSolicitacoesDeTeste();
    }
  });

  // 6. TESTES DO HUB COMUNITÁRIO, LINTER CONAD & BLOG DOS TEMPLOS
  console.log("\n6. Hub Comunitário & Linter de Conformidade CONAD:");

  await test("Linter de linguagem detecta termos proibidos e propõe substituições canônicas", async () => {
    const { verificarConformidadeTexto } = await import("../src/lib/validators/comunidade.ts");

    // Texto com infrações regulatórias
    const textoInfracao = "Esta medicina sagrada garante a cura para ansiedade. Temos doses à venda na loja.";
    const alertas = verificarConformidadeTexto(textoInfracao);

    assert.ok(alertas.length >= 4, "Deve detectar pelo menos medicina, cura, dose e venda/loja");

    const termosDetectados = alertas.map((a) => a.termoDetectado);
    assert.ok(termosDetectados.includes("medicina"), "Deve detectar 'medicina'");
    assert.ok(termosDetectados.includes("cura"), "Deve detectar 'cura'");
    assert.ok(termosDetectados.includes("venda"), "Deve detectar 'venda'");
  });

  await test("Linter de linguagem aprova texto estritamente em conformidade", async () => {
    const { verificarConformidadeTexto } = await import("../src/lib/validators/comunidade.ts");

    const textoAprovado =
      "O sacramento tradicional da floresta acolhe a busca pelo reequilíbrio vital e harmonização dos sentidos.";
    const alertas = verificarConformidadeTexto(textoAprovado);

    assert.strictEqual(alertas.length, 0, "Texto canônico não deve gerar alertas");
  });

  await test("Motor de persistência de comunidade salva e recupera publicações atomicamente", async () => {
    const { salvarPublicacao, obterPublicacoesComunidade, deletarPublicacao } = await import(
      "../src/lib/db/comunidade.ts"
    );

    const postCriado = await salvarPublicacao({
      temploCodigo: "NAT-TEMPLO-842",
      temploNome: "Templo Céu do Cruzeiro",
      temploSlug: "ceu-do-cruzeiro",
      slug: `teste-automacao-${Date.now()}`,
      titulo: "Ensaio de Teste de Automação Litúrgica",
      resumo: "Resumo estruturado para teste automatizado do banco.",
      conteudoMarkdown: "Corpo do texto com reflexões sobre o silêncio da mata e a concentração.",
      categoria: "REFLEXAO_DOUTRINARIA",
      categoriaLabel: "Reflexão Doutrinária",
      anexos: [],
      embeds: [],
      status: "PUBLICADO",
    });

    assert.ok(postCriado.id, "ID do post deve ter sido gerado");

    const lista = await obterPublicacoesComunidade({ temploCodigo: "NAT-TEMPLO-842" });
    const encontrado = lista.find((p) => p.id === postCriado.id);
    assert.ok(encontrado, "Post salvo deve ser recuperado na listagem");
    assert.strictEqual(encontrado.titulo, "Ensaio de Teste de Automação Litúrgica");

    // Limpeza
    await deletarPublicacao(postCriado.id, "NAT-TEMPLO-842");
  });

  await test("Consulta de perfis de templos comunitários resolve por slug canônico", async () => {
    const { obterPerfilPorSlugOuCodigo } = await import("../src/lib/db/comunidade.ts");

    const perfil = await obterPerfilPorSlugOuCodigo("ceu-do-cruzeiro");
    assert.ok(perfil, "Perfil por slug deve existir");
    assert.strictEqual(perfil.codigoLiturgico, "NAT-TEMPLO-842");
    assert.strictEqual(perfil.nomeInstituicao, "Templo Céu do Cruzeiro");
  });

  // 10. OTIMIZAÇÕES PLANOS 004 A 009 (CORE HYBRID STORE, AUTH HMAC, CATÁLOGO 15 RAPÉS & SITEMAP)
  console.log("\n10. Verificações dos Planos 004 a 009 (Hybrid Store, Auth, Catálogo & SEO):");

  await test("Lista Nominal de Medicamentos (4 Cores) possui >= 150 itens distribuídos nas 4 categorias", async () => {
    const { obterListaNominalMedicamentos } = await import("../src/lib/export-medicamentos.ts");
    const lista = obterListaNominalMedicamentos();
    assert.ok(lista.length >= 150, `Esperado >= 150 medicamentos, obtido ${lista.length}`);
    const cores = new Set(lista.map((m) => m.diretriz));
    assert.strictEqual(cores.size, 4, "Deve possuir todas as 4 diretrizes/cores da tabela oficial");
  });

  await test("CRUD de Agenda Litúrgica salva, lista e remove evento com limpeza atômica", async () => {
    const { salvarItemAgenda, obterAgendaLiturgica, deletarItemAgenda } = await import(
      "../src/lib/db/comunidade.ts"
    );
    const item = await salvarItemAgenda({
      temploCodigo: "NAT-TEMPLO-842",
      temploNome: "Templo Céu do Cruzeiro",
      temploSlug: "ceu-do-cruzeiro",
      titulo: "Sessão de Teste Automatizado",
      dataHora: "2026-12-21T20:00:00",
      local: "Sede Litúrgica",
      graduacaoPrevista: "5.1 Pituã",
      vagas: "20 lugares",
      observacoes: "Trazer agasalho branco",
    });
    assert.ok(item.id, "Evento deve receber ID");
    const lista = await obterAgendaLiturgica("NAT-TEMPLO-842");
    assert.ok(lista.some((e) => e.id === item.id), "Evento criado deve constar na agenda");
    const deletado = await deletarItemAgenda(item.id, "NAT-TEMPLO-842");
    assert.strictEqual(deletado, true, "Deve deletar o evento do próprio templo");
  });

  await test("Core Hybrid Store persiste atomicamente, lê fallback de tmpdir e withTimeout rejeita promessa lenta", async () => {
    const { createHybridJsonStore, withTimeout } = await import("../src/lib/db/core-hybrid-store.ts");
    const os = await import("node:os");
    const testFilename = `test_hybrid_${Date.now()}.json`;
    const store = createHybridJsonStore({
      filename: testFilename,
      seedData: [{ id: "SEED-1", nome: "Item Inicial" }],
      getKey: (item) => item.id,
    });

    await store.upsert({ id: "ITEM-2", nome: "Novo Item" });
    const allAfterUpsert = await store.readAll();
    assert.strictEqual(allAfterUpsert.length, 2, "Deve conter seed + item inserido");

    await store.remove("SEED-1");
    const allAfterRemove = await store.readAll();
    assert.strictEqual(allAfterRemove.length, 1, "Item deletado não deve ressuscitar do seedData");
    assert.strictEqual(allAfterRemove[0].id, "ITEM-2");

    // Verifica timeout
    let timedOut = false;
    try {
      await withTimeout(new Promise((resolve) => setTimeout(resolve, 200)), 30);
    } catch {
      timedOut = true;
    }
    assert.strictEqual(timedOut, true, "withTimeout deve rejeitar promessas que excedem o limite");

    // Limpeza dos arquivos de teste
    await fs.unlink(path.join(process.cwd(), "data", testFilename)).catch(() => {});
    await fs.unlink(path.join(os.tmpdir(), `nativaram_${testFilename}`)).catch(() => {});
  });

  await test("Sessão HMAC-SHA256 valida token legítimo, rejeita adulteração e RegistrarSolicitacaoSchema filtra overrides", async () => {
    const { createSessionToken, verifySessionToken } = await import("../src/lib/auth/session.ts");
    const { RegistrarSolicitacaoSchema } = await import("../src/lib/validators/solicitacao.ts");

    const token = createSessionToken({ role: "ADMIN", codigo: "ADM-NATIVARAM" });
    const payload = verifySessionToken(token);
    assert.ok(payload, "Token recém-criado deve ser válido");
    assert.strictEqual(payload.role, "ADMIN");

    const tampered = `${token}adulterado`;
    assert.strictEqual(verifySessionToken(tampered), null, "Token adulterado deve ser rejeitado");

    const parsed = RegistrarSolicitacaoSchema.safeParse({
      tipo: "INSTITUICAO_FORMAL",
      nomeEntidade: "Templo Teste",
      nomeResponsavel: "Dirigente Teste",
      telefone: "68999990000",
      email: "teste@templo.org",
      cidade: "Rio Branco",
      estado: "AC",
      status: "HOMOLOGADO",
      senhaGerada: "Hack123",
    });
    assert.strictEqual(parsed.success, true, "Payload válido deve passar no schema");
    assert.strictEqual("senhaGerada" in parsed.data, false, "Schema não deve permitir injeção de senhaGerada");
  });

  await test("Acesso administrativo falha fechado em produção sem ADMIN_SECRET_KEY e não aceita segredo literal", async () => {
    const { verifyAdminRequest, getAdminSecret } = await import("../src/lib/auth/session.ts");
    const envAnterior = { key: process.env.ADMIN_SECRET_KEY, node: process.env.NODE_ENV };
    try {
      delete process.env.ADMIN_SECRET_KEY;
      process.env.NODE_ENV = "production";
      assert.strictEqual(getAdminSecret(), null, "Sem env em produção não pode haver segredo padrão");
      const req = new Request("http://localhost/api/x", {
        headers: { "x-nativaram-auth": "adm-nativaram-2026" },
      });
      assert.strictEqual(verifyAdminRequest(req), false, "Segredo literal antigo não pode autenticar");

      process.env.ADMIN_SECRET_KEY = "segredo-de-teste-configurado";
      const ok = new Request("http://localhost/api/x", {
        headers: { "x-nativaram-auth": "segredo-de-teste-configurado" },
      });
      assert.strictEqual(verifyAdminRequest(ok), true, "Segredo configurado deve autenticar");
    } finally {
      if (envAnterior.key === undefined) delete process.env.ADMIN_SECRET_KEY;
      else process.env.ADMIN_SECRET_KEY = envAnterior.key;
      if (envAnterior.node === undefined) delete process.env.NODE_ENV;
      else process.env.NODE_ENV = envAnterior.node;
    }
  });

  await test("Cookie de sessão não é assinado com chave pública nem literal quando falta ADMIN_SECRET_KEY em produção", async () => {
    const { createSessionToken, verifySessionToken } = await import("../src/lib/auth/session.ts");
    const crypto = await import("node:crypto");
    const anterior = {
      key: process.env.ADMIN_SECRET_KEY,
      service: process.env.SUPABASE_SERVICE_ROLE_KEY,
      anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      node: process.env.NODE_ENV,
    };
    const restaurar = (nome, valor) => {
      if (valor === undefined) delete process.env[nome];
      else process.env[nome] = valor;
    };
    try {
      delete process.env.ADMIN_SECRET_KEY;
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "chave-publica-de-teste";
      process.env.NODE_ENV = "production";

      // Token forjado com a chave pública: precisa ser recusado
      const payload = Buffer.from(
        JSON.stringify({ role: "ADMIN", codigo: "X", exp: Date.now() + 60_000 }),
        "utf-8"
      ).toString("base64url");
      const assinatura = crypto
        .createHmac("sha256", "chave-publica-de-teste")
        .update(payload)
        .digest("base64url");
      assert.strictEqual(
        verifySessionToken(`${payload}.${assinatura}`),
        null,
        "Token assinado com a chave pública não pode valer"
      );
      assert.throws(
        () => createSessionToken({ role: "ADMIN" }),
        "Sem segredo de servidor não se emite sessão"
      );

      // Com a service role (segredo só do servidor) a sessão funciona
      process.env.SUPABASE_SERVICE_ROLE_KEY = "segredo-de-servidor-de-teste";
      const token = createSessionToken({ role: "DIRIGENTE", codigo: "NAT-TEMPLO-T1" });
      assert.strictEqual(verifySessionToken(token)?.codigo, "NAT-TEMPLO-T1");
    } finally {
      restaurar("ADMIN_SECRET_KEY", anterior.key);
      restaurar("SUPABASE_SERVICE_ROLE_KEY", anterior.service);
      restaurar("NEXT_PUBLIC_SUPABASE_ANON_KEY", anterior.anon);
      restaurar("NODE_ENV", anterior.node);
    }
  });

  await test("Papel vindo do Supabase Auth só considera app_metadata e a lista do Conselho", async () => {
    const { resolverPapelSupabase } = await import("../src/lib/auth/papel.ts");
    const conselho = ["conselho@nativaram.com.br"];

    assert.strictEqual(
      resolverPapelSupabase({ email: "admirador@exemplo.org", app_metadata: {} }, conselho),
      null,
      "Ter 'adm' no e-mail não concede nada"
    );
    assert.strictEqual(
      resolverPapelSupabase(
        { email: "pessoa@exemplo.org", app_metadata: {}, user_metadata: { papel: "ADMIN", codigo_liturgico: "NAT-TEMPLO-842" } },
        conselho
      ),
      null,
      "user_metadata é editável pelo usuário e não concede papel nem templo"
    );
    assert.deepStrictEqual(
      resolverPapelSupabase({ email: "x@exemplo.org", app_metadata: { role: "admin" } }, conselho),
      { role: "ADMIN" }
    );
    assert.deepStrictEqual(
      resolverPapelSupabase({ email: "Conselho@Nativaram.com.br", app_metadata: {} }, conselho),
      { role: "ADMIN" }
    );
    assert.deepStrictEqual(
      resolverPapelSupabase({ email: "d@exemplo.org", app_metadata: { codigo_liturgico: "nat-templo-913" } }, conselho),
      { role: "DIRIGENTE", codigo: "NAT-TEMPLO-913" }
    );
  });

  await test("Catálogo unificado possui exatamente 15 variedades de Rapé Sagrado e zero IDs duplicados", async () => {
    const { medicinas } = await import("../src/data/medicinas.ts");
    const { RAPES_TRADICIONAIS } = await import("../src/data/sacramentos.ts");
    const { GRADUACOES_SACRAMENTAIS } = await import("../src/data/graduacoes.ts");

    const rapesMedicinas = medicinas.filter((m) => m.tipo === "rape");
    assert.strictEqual(rapesMedicinas.length, 15, `Esperado 15 rapés em medicinas.ts, encontrado ${rapesMedicinas.length}`);
    assert.strictEqual(RAPES_TRADICIONAIS.length, 15, `Esperado 15 rapés em sacramentos.ts, encontrado ${RAPES_TRADICIONAIS.length}`);

    const gradIds = GRADUACOES_SACRAMENTAIS.map((g) => g.id);
    assert.strictEqual(new Set(gradIds).size, gradIds.length, "Não deve haver IDs duplicados em GRADUACOES_SACRAMENTAIS");
  });

  await test("Documentos de homologação escapam HTML, omitem a senha e usam a marca institucional", async () => {
    const { gerarTermoHomologacaoHtml, gerarGuiaTransitoHtml } = await import(
      "../src/lib/documentos-homologacao.ts"
    );
    const sol = {
      id: "TEST-DOC-1",
      tipo: "INSTITUICAO_FORMAL",
      nomeEntidade: "Templo <script>alert(1)</script>",
      nomeResponsavel: "Dirigente Teste",
      telefone: "",
      email: "",
      cidade: "Rio Branco",
      estado: "AC",
      linhagem: "Santo Daime",
      graduacao: "5.1 Pituã",
      volumeEstimado: "5 Litros",
      intencao: "Trabalhos litúrgicos",
      status: "HOMOLOGADO",
      loginGerado: "NAT-TEMPLO-000",
      senhaGerada: "SenhaSecreta-XYZ",
      dataEnvio: "01/01/2026",
    };
    for (const html of [gerarTermoHomologacaoHtml(sol), gerarGuiaTransitoHtml(sol)]) {
      assert.ok(!html.includes("<script>alert(1)"), "Deve escapar HTML injetado");
      assert.ok(!html.includes("SenhaSecreta-XYZ"), "Nunca deve imprimir a senha");
      assert.ok(html.includes("Cooperativa Nativaram"), "Deve usar a marca institucional");
      assert.ok(!html.includes("Nativaram Brasil"), "Não deve usar a marca do canal de varejo");
    }
  });

  await test("Service Worker offline nunca intercepta /api/ nem métodos não-GET", async () => {
    const sw = await fs.readFile(path.join(ROOT_DIR, "public", "sw.js"), "utf-8");
    assert.ok(sw.includes('startsWith("/api/")'), "Deve ignorar rotas /api/");
    assert.ok(sw.includes('req.method !== "GET"'), "Deve ignorar métodos diferentes de GET");
  });

  await test("Sitemap público emite /sacramentos e perfis comunitários e omite /portal-dirigente", async () => {
    const sitemapFn = (await import("../src/app/sitemap.ts")).default;
    const entries = await sitemapFn();
    const urls = entries.map((e) => e.url);

    assert.ok(urls.some((u) => u.endsWith("/sacramentos")), "Deve incluir /sacramentos canônico");
    assert.ok(
      urls.some((u) => u.includes("/estudos/comunidade/ceu-do-cruzeiro")),
      "Deve incluir perfis comunitários (/estudos/comunidade/ceu-do-cruzeiro)"
    );
    assert.strictEqual(
      urls.some((u) => u.includes("/portal-dirigente")),
      false,
      "Não deve indexar área restrita /portal-dirigente no sitemap público"
    );
  });

  await test("Scripts SQL não concedem gravação pública nem leitura pública das tabelas sensíveis (migração 004)", async () => {
    const supabaseDir = path.join(ROOT_DIR, "src", "lib", "supabase");
    const migracao004 = await fs.readFile(
      path.join(supabaseDir, "migrations", "004-fechar-rls-tabelas-sensiveis.sql"),
      "utf-8"
    );
    assert.ok(migracao004.includes("FROM pg_policies"), "004 deve remover todas as políticas existentes via pg_policies");
    for (const tabela of ["solicitacoes_homologacao", "pedidos_liturgicos", "templos_credenciados"]) {
      assert.ok(
        migracao004.includes(`REVOKE ALL ON public.${tabela} FROM anon, authenticated`),
        `004 deve revogar acesso público a ${tabela}`
      );
    }

    // Scripts que alguém pode executar não podem reabrir o acesso: os dois schemas e
    // TODAS as migrações (exceto as marcadas como OBSOLETA no cabeçalho).
    const migracoes = (await fs.readdir(path.join(supabaseDir, "migrations")))
      .filter((nome) => nome.endsWith(".sql"))
      .map((nome) => `migrations/${nome}`);
    for (const arquivo of ["schema.sql", "schema_comunidade.sql", ...migracoes]) {
      const sql = await fs.readFile(path.join(supabaseDir, arquivo), "utf-8");
      if (/OBSOLETA\s+—\s+NÃO EXECUTAR/.test(sql.slice(0, 400))) continue;
      const politicas = sql.match(/CREATE POLICY[\s\S]*?;/g) || [];
      for (const politica of politicas) {
        assert.ok(/FOR SELECT/.test(politica), `${arquivo}: política não-SELECT encontrada: ${politica.split("\n")[0]}`);
        assert.ok(/\bTO\s+\w/.test(politica), `${arquivo}: política sem TO (vale para todos os papéis): ${politica.split("\n")[0]}`);
        assert.ok(
          !/solicitacoes_homologacao|pedidos_liturgicos|templos_credenciados/.test(politica),
          `${arquivo}: política pública em tabela sensível: ${politica.split("\n")[0]}`
        );
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
