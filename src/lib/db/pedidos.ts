import fs from "fs/promises";
import path from "path";
import {
  PedidoLiturgico,
  NovoPedidoInput,
  AtualizarPedidoInput,
  MetricasPedidos,
  StatusPedido,
} from "@/types/pedido";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "pedidos.json");

// Pedidos Iniciais de Demonstração (em estrita conformidade litúrgica)
const SEED_PEDIDOS: PedidoLiturgico[] = [
  {
    id: "SOL-2026-W842",
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
        nome: "10.1 Wirapuru (Semi-Mel)",
        codigoOuSubtitulo: "Pureza Tucunacá & Chacrona Rainha",
        quantidade: 10,
        unidade: "Litros",
        rateioUnitarioEstimado: 260,
        rateioTotalEstimado: 2600,
      },
      {
        id: "TSUNU",
        tipo: "RAPE_SAGRADO",
        nome: "Rapé Sagrado de Tsunú",
        codigoOuSubtitulo: "Cinzas de Pau Pereira e Tabaco Selvagem",
        quantidade: 2,
        unidade: "Frascos (20g)",
        rateioUnitarioEstimado: 65,
        rateioTotalEstimado: 130,
      },
    ],
    rateioTotal: 2730,
    dataCerimoniaPretendida: "2026-10-15",
    mensagemIntencao:
      "Trabalho de Alinhamento e Renovação Espiritual de Primavera. Solicitamos especial atenção à refrigeração durante o transporte aéreo.",
    status: "EM_TRANSITO_REFRIGERADO",
    loteVinculado: "AC-2026-08",
    codigoRastreio: "NTV-SP-842-BR",
    previsaoEntrega: "Em 48h (Entreposto Serra/ES → São Paulo/SP)",
    observacoesInternas: "Embalagem isotérmica selada #08-A com gelox ativado.",
    historico: [
      {
        status: "SOLICITADO",
        dataHora: "2026-08-20 14:30",
        observacao: "Solicitação recebida via portal institucional.",
        responsavel: "Sistema Integrado Nativaram",
      },
      {
        status: "HOMOLOGADO_CONSELHO",
        dataHora: "2026-08-21 10:15",
        observacao: "Conformidade documental CONAD 01/2010 verificada e aprovada.",
        responsavel: "Conselho Gestor Litúrgico",
      },
      {
        status: "EM_FEITIO_ACRE",
        dataHora: "2026-08-25 08:00",
        observacao: "Reserva de biomassa Tucunacá vinculada ao lote #AC-2026-08 em Cruzeiro do Sul/AC.",
        responsavel: "Mestre Caboclo (Feitor)",
      },
      {
        status: "AGUARDANDO_DESPACHO",
        dataHora: "2026-09-02 16:40",
        observacao: "Lote recebido no entreposto sudeste Serra/ES com laudo de pureza microbiológica aprovado.",
        responsavel: "Guardião de Logística",
      },
      {
        status: "EM_TRANSITO_REFRIGERADO",
        dataHora: "2026-09-06 09:20",
        observacao: "Despacho aéreo com rastreio NTV-SP-842-BR.",
        responsavel: "Guardião de Logística",
      },
    ],
    criadoEm: "2026-08-20T14:30:00Z",
    atualizadoEm: "2026-09-06T09:20:00Z",
  },
  {
    id: "SOL-2026-M913",
    temploId: "NAT-TEMPLO-913",
    temploNome: "Fraternidade Rainha da Floresta",
    cidade: "Belo Horizonte",
    estado: "MG",
    dirigenteNome: "Madrinha Helena Costa",
    dirigenteTelefone: "31998877665",
    dirigenteEmail: "helena@rainhadafloresta.org.br",
    cnpj: "45.678.901/0001-23",
    itens: [
      {
        id: "MEDICINA_MEL",
        tipo: "GRADUACAO_AYAHUASCA",
        nome: "Alquimia Sagrada Mel (Alta Redução)",
        codigoOuSubtitulo: "Densidade máxima sem conservantes",
        quantidade: 5,
        unidade: "kg",
        rateioUnitarioEstimado: 480,
        rateioTotalEstimado: 2400,
      },
      {
        id: "MULATEIRO",
        tipo: "RAPE_SAGRADO",
        nome: "Rapé Sagrado de Mulateiro",
        codigoOuSubtitulo: "Árvore da regeneração amazônica",
        quantidade: 3,
        unidade: "Frascos (20g)",
        rateioUnitarioEstimado: 65,
        rateioTotalEstimado: 195,
      },
    ],
    rateioTotal: 2595,
    dataCerimoniaPretendida: "2026-10-28",
    mensagemIntencao:
      "Cerimônia de renovação e agradecimento das matriarcas. O formato Mel facilita nosso armazenamento local.",
    status: "AGUARDANDO_DESPACHO",
    loteVinculado: "AC-2026-09",
    codigoRastreio: "NTV-MG-913-BR",
    previsaoEntrega: "Despacho previsto em 3 dias úteis",
    observacoesInternas: "Em análise refratométrica final no laboratório botânico.",
    historico: [
      {
        status: "SOLICITADO",
        dataHora: "2026-08-28 11:10",
        observacao: "Solicitação submetida pela Madrinha Helena.",
        responsavel: "Sistema Integrado Nativaram",
      },
      {
        status: "HOMOLOGADO_CONSELHO",
        dataHora: "2026-08-29 09:30",
        observacao: "Homologado pelo conselho gestor.",
        responsavel: "Conselho Gestor Litúrgico",
      },
      {
        status: "AGUARDANDO_DESPACHO",
        dataHora: "2026-09-05 14:00",
        observacao: "Em acondicionamento hermético especial no entreposto Serra/ES.",
        responsavel: "Guardião de Logística",
      },
    ],
    criadoEm: "2026-08-28T11:10:00Z",
    atualizadoEm: "2026-09-05T14:00:00Z",
  },
  {
    id: "SOL-2026-S982",
    temploId: "NAT-TEMPLO-982",
    temploNome: "Templo Caminho Solar",
    cidade: "Brasília",
    estado: "DF",
    dirigenteNome: "Dirigente Ana Terra",
    dirigenteTelefone: "61981234567",
    dirigenteEmail: "anaterra@caminhosolar.com.br",
    cnpj: "67.890.123/0001-45",
    itens: [
      {
        id: "7.1_ANHANGATA",
        tipo: "GRADUACAO_AYAHUASCA",
        nome: "7.1 Anhangatã (Rouxinol)",
        codigoOuSubtitulo: "Canto harmônico da floresta",
        quantidade: 20,
        unidade: "Litros",
        rateioUnitarioEstimado: 230,
        rateioTotalEstimado: 4600,
      },
    ],
    rateioTotal: 4600,
    dataCerimoniaPretendida: "2026-09-12",
    mensagemIntencao:
      "Vigília solar equinocial de primavera. Trabalho litúrgico com 80 comungantes.",
    status: "ENTREGUE_CONSAGRADO",
    loteVinculado: "AC-2026-07",
    codigoRastreio: "NTV-DF-982-BR",
    previsaoEntrega: "Entregue e Consagrado com Sucesso",
    observacoesInternas: "Recebido em conformidade com selo intacto.",
    historico: [
      {
        status: "SOLICITADO",
        dataHora: "2026-07-25 15:00",
        observacao: "Solicitação bimestral do templo.",
        responsavel: "Sistema Integrado Nativaram",
      },
      {
        status: "HOMOLOGADO_CONSELHO",
        dataHora: "2026-07-26 10:00",
        observacao: "Aprovado em plenária.",
        responsavel: "Conselho Gestor Litúrgico",
      },
      {
        status: "EM_FEITIO_ACRE",
        dataHora: "2026-08-01 07:00",
        observacao: "Feitio concluído e lacrado em Cruzeiro do Sul/AC.",
        responsavel: "Mestre Caboclo (Feitor)",
      },
      {
        status: "EM_TRANSITO_REFRIGERADO",
        dataHora: "2026-08-15 08:30",
        observacao: "Despachado.",
        responsavel: "Guardião de Logística",
      },
      {
        status: "ENTREGUE_CONSAGRADO",
        dataHora: "2026-08-18 17:45",
        observacao: "Entrega concluída na sede litúrgica de Brasília/DF.",
        responsavel: "Transportadora Especializada",
      },
    ],
    criadoEm: "2026-07-25T15:00:00Z",
    atualizadoEm: "2026-08-18T17:45:00Z",
  },
];

/**
 * Garante a existência do arquivo de banco de dados
 */
async function garantirBanco(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DB_FILE);
  } catch {
    // Se o arquivo não existir, semeia com os pedidos padrão
    await fs.writeFile(DB_FILE, JSON.stringify(SEED_PEDIDOS, null, 2), "utf-8");
  }
}

/**
 * Gravação atômica segura no disco (evita corrupção com .tmp e rename)
 */
async function salvarBancoAtomico(pedidos: PedidoLiturgico[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmpFile = `${DB_FILE}.tmp.${Date.now()}.${Math.random().toString(36).slice(2, 6)}`;
  await fs.writeFile(tmpFile, JSON.stringify(pedidos, null, 2), "utf-8");
  await fs.rename(tmpFile, DB_FILE);
}

/**
 * Gera um protocolo litúrgico único
 * Exemplo: SOL-2026-P8K2
 */
export function gerarProtocoloLiturgico(): string {
  const ano = new Date().getFullYear();
  const sufixo = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SOL-${ano}-${sufixo}`;
}

/**
 * Formata a mensagem para envio direto ao WhatsApp do Conselho Gestor
 */
export function formatarMensagemWhatsApp(pedido: PedidoLiturgico): string {
  const itensFormatados = pedido.itens
    .map(
      (item) =>
        `• *${item.nome}* (${item.codigoOuSubtitulo || item.tipo})\n  Quantidade: ${item.quantidade} ${item.unidade} | Rateio est.: R$ ${item.rateioTotalEstimado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
    )
    .join("\n");

  const msg = [
    `*COOPERATIVA NATIVARAM BRASIL — SOLICITAÇÃO LITÚRGICA*`,
    `📜 *Protocolo Oficial:* \`${pedido.id}\``,
    `📅 *Data do Pedido:* ${new Date(pedido.criadoEm).toLocaleDateString("pt-BR")}`,
    ``,
    `🏛️ *INSTITUIÇÃO COOPERADA:*`,
    `• *Templo:* ${pedido.temploNome} (${pedido.temploId})`,
    `• *CNPJ:* ${pedido.cnpj}`,
    `• *Local:* ${pedido.cidade} / ${pedido.estado}`,
    `• *Dirigente:* ${pedido.dirigenteNome}`,
    `• *WhatsApp:* ${pedido.dirigenteTelefone}`,
    `• *E-mail:* ${pedido.dirigenteEmail}`,
    ``,
    `🌿 *SACRAMENTOS & ALQUIMIAS SOLICITADAS:*`,
    itensFormatados,
    ``,
    `💰 *Rateio Cooperativo Estimado:* R$ ${pedido.rateioTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
    `⏳ *Data Prevista da Cerimônia:* ${pedido.dataCerimoniaPretendida}`,
    ``,
    `✨ *INTENÇÃO LITÚRGICA & OBSERVAÇÕES:*`,
    `"${pedido.mensagemIntencao}"`,
    ``,
    `⚖️ *CONFORMIDADE REGULATÓRIA:*`,
    `[x] Templo Homologado conforme Resolução CONAD nº 01/2010`,
    `[x] Rateio estrito de apoio logístico (sem caráter mercantil)`,
    `[x] Antecedência cerimonial respeitada para o feitio no Acre`,
    ``,
    `_Mensagem gerada via Portal do Dirigente Nativaram Brasil._`,
  ];

  return encodeURIComponent(msg.join("\n"));
}

/**
 * Formata mensagem de atualização de status do ADM para o Dirigente
 */
export function formatarMensagemAtualizacaoWhatsApp(
  pedido: PedidoLiturgico,
  novoStatus: StatusPedido,
  rastreio?: string
): string {
  const statusLabels: Record<StatusPedido, string> = {
    SOLICITADO: "Solicitação Registrada e Aguardando Análise Litúrgica",
    HOMOLOGADO_CONSELHO: "Homologado pelo Conselho Gestor Nativaram",
    EM_FEITIO_ACRE: "Em Feitio Tradicional no Acre (Cruzeiro do Sul)",
    AGUARDANDO_DESPACHO: "Preparação Isotérmica no Entreposto (Serra/ES)",
    EM_TRANSITO_REFRIGERADO: "Em Trânsito Refrigerado Especial",
    ENTREGUE_CONSAGRADO: "Entregue e Consagrado no Templo",
    CANCELADO_AJUSTE: "Ajuste Necessário na Solicitação",
  };

  const msg = [
    `*NATIVARAM BRASIL — ATUALIZAÇÃO LITÚRGICA*`,
    `Olá, *${pedido.dirigenteNome}* (${pedido.temploNome})!`,
    ``,
    `Informamos que a sua solicitação de partilha *${pedido.id}* teve seu status atualizado:`,
    `📌 *Novo Status:* ${statusLabels[novoStatus]}`,
    rastreio ? `📦 *Código de Rastreio:* \`${rastreio}\`` : "",
    pedido.loteVinculado ? `🌿 *Lote Vinculado:* Lote #${pedido.loteVinculado}` : "",
    pedido.previsaoEntrega ? `⏱️ *Previsão:* ${pedido.previsaoEntrega}` : "",
    ``,
    `Você pode acompanhar todos os detalhes e laudos fitoquímicos no *Portal do Dirigente*.`,
    `Que a força da floresta guie vossos trabalhos sagrados! 🌿✨`,
  ]
    .filter(Boolean)
    .join("\n");

  return encodeURIComponent(msg);
}

/**
 * Retorna todos os pedidos, com suporte a filtros
 */
export async function obterTodosPedidos(filtros?: {
  temploId?: string;
  status?: StatusPedido | "TODOS";
  busca?: string;
}): Promise<PedidoLiturgico[]> {
  await garantirBanco();
  const raw = await fs.readFile(DB_FILE, "utf-8");
  let pedidos: PedidoLiturgico[] = JSON.parse(raw);

  if (filtros?.temploId) {
    pedidos = pedidos.filter((p) => p.temploId.toUpperCase() === filtros.temploId?.toUpperCase());
  }

  if (filtros?.status && filtros.status !== "TODOS") {
    pedidos = pedidos.filter((p) => p.status === filtros.status);
  }

  if (filtros?.busca) {
    const termo = filtros.busca.toLowerCase();
    pedidos = pedidos.filter(
      (p) =>
        p.id.toLowerCase().includes(termo) ||
        p.temploNome.toLowerCase().includes(termo) ||
        p.dirigenteNome.toLowerCase().includes(termo) ||
        p.cidade.toLowerCase().includes(termo) ||
        (p.codigoRastreio && p.codigoRastreio.toLowerCase().includes(termo)) ||
        p.itens.some((i) => i.nome.toLowerCase().includes(termo))
    );
  }

  // Ordena por data de criação mais recente primeiro
  return pedidos.sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());
}

/**
 * Busca pedido por ID
 */
export async function obterPedidoPorId(id: string): Promise<PedidoLiturgico | null> {
  await garantirBanco();
  const pedidos = await obterTodosPedidos();
  return pedidos.find((p) => p.id.toUpperCase() === id.toUpperCase()) || null;
}

/**
 * Busca pedidos de um templo específico
 */
export async function obterPedidosPorTemplo(temploId: string): Promise<PedidoLiturgico[]> {
  return obterTodosPedidos({ temploId });
}

/**
 * Cria uma nova solicitação de partilha litúrgica
 */
export async function criarPedido(input: NovoPedidoInput): Promise<PedidoLiturgico> {
  await garantirBanco();
  const pedidos = await obterTodosPedidos();

  const id = gerarProtocoloLiturgico();
  const agora = new Date().toISOString();
  const agoraFormatada = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const itensCalculados = input.itens.map((item) => ({
    ...item,
    rateioTotalEstimado: item.quantidade * item.rateioUnitarioEstimado,
  }));

  const rateioTotal = itensCalculados.reduce((acc, item) => acc + item.rateioTotalEstimado, 0);

  const novoPedido: PedidoLiturgico = {
    id,
    temploId: input.temploId,
    temploNome: input.temploNome,
    cidade: input.cidade,
    estado: input.estado,
    dirigenteNome: input.dirigenteNome,
    dirigenteTelefone: input.dirigenteTelefone,
    dirigenteEmail: input.dirigenteEmail,
    cnpj: input.cnpj,
    itens: itensCalculados,
    rateioTotal,
    dataCerimoniaPretendida: input.dataCerimoniaPretendida,
    mensagemIntencao: input.mensagemIntencao,
    status: "SOLICITADO",
    historico: [
      {
        status: "SOLICITADO",
        dataHora: agoraFormatada,
        observacao: "Solicitação litúrgica registrada no portal da cooperativa.",
        responsavel: "Dirigente Homologado",
      },
    ],
    criadoEm: agora,
    atualizadoEm: agora,
  };

  pedidos.unshift(novoPedido);
  await salvarBancoAtomico(pedidos);
  return novoPedido;
}

/**
 * Atualiza um pedido existente (status, rastreio, notas internas, lote)
 */
export async function atualizarPedido(
  id: string,
  alteracoes: AtualizarPedidoInput
): Promise<PedidoLiturgico | null> {
  await garantirBanco();
  const pedidos = await obterTodosPedidos();
  const index = pedidos.findIndex((p) => p.id.toUpperCase() === id.toUpperCase());

  if (index === -1) return null;

  const pedidoAtual = pedidos[index];
  const agora = new Date().toISOString();
  const agoraFormatada = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusAnterior = pedidoAtual.status;
  const novoStatus = alteracoes.status || statusAnterior;

  const novoHistorico = [...pedidoAtual.historico];

  if (alteracoes.status && alteracoes.status !== statusAnterior) {
    novoHistorico.push({
      status: alteracoes.status,
      dataHora: agoraFormatada,
      observacao: alteracoes.observacaoHistorico || `Status alterado para ${alteracoes.status}`,
      responsavel: alteracoes.responsavel || "Conselho Gestor Litúrgico",
    });
  } else if (alteracoes.observacaoHistorico) {
    novoHistorico.push({
      status: novoStatus,
      dataHora: agoraFormatada,
      observacao: alteracoes.observacaoHistorico,
      responsavel: alteracoes.responsavel || "Conselho Gestor Litúrgico",
    });
  }

  const pedidoAtualizado: PedidoLiturgico = {
    ...pedidoAtual,
    status: novoStatus,
    loteVinculado: alteracoes.loteVinculado !== undefined ? alteracoes.loteVinculado : pedidoAtual.loteVinculado,
    codigoRastreio: alteracoes.codigoRastreio !== undefined ? alteracoes.codigoRastreio : pedidoAtual.codigoRastreio,
    previsaoEntrega: alteracoes.previsaoEntrega !== undefined ? alteracoes.previsaoEntrega : pedidoAtual.previsaoEntrega,
    observacoesInternas: alteracoes.observacoesInternas !== undefined ? alteracoes.observacoesInternas : pedidoAtual.observacoesInternas,
    historico: novoHistorico,
    atualizadoEm: agora,
  };

  pedidos[index] = pedidoAtualizado;
  await salvarBancoAtomico(pedidos);
  return pedidoAtualizado;
}

/**
 * Remove um pedido do banco de dados
 */
export async function excluirPedido(id: string): Promise<boolean> {
  await garantirBanco();
  const pedidos = await obterTodosPedidos();
  const novaLista = pedidos.filter((p) => p.id.toUpperCase() !== id.toUpperCase());

  if (novaLista.length === pedidos.length) return false;

  await salvarBancoAtomico(novaLista);
  return true;
}

/**
 * Métricas consolidadas das solicitações para o Painel ADM
 */
export async function obterMetricasGerais(): Promise<MetricasPedidos> {
  const pedidos = await obterTodosPedidos();

  let litrosTotais = 0;
  let solicitacoesPendentes = 0;
  let emFeitioNoAcre = 0;
  let emTransitoRefrigerado = 0;
  let entreguesConsagrados = 0;

  for (const pedido of pedidos) {
    if (pedido.status === "SOLICITADO" || pedido.status === "HOMOLOGADO_CONSELHO") {
      solicitacoesPendentes++;
    }
    if (pedido.status === "EM_FEITIO_ACRE") {
      emFeitioNoAcre++;
    }
    if (pedido.status === "EM_TRANSITO_REFRIGERADO" || pedido.status === "AGUARDANDO_DESPACHO") {
      emTransitoRefrigerado++;
    }
    if (pedido.status === "ENTREGUE_CONSAGRADO") {
      entreguesConsagrados++;
    }

    for (const item of pedido.itens) {
      if (item.unidade === "Litros" || item.unidade === "kg") {
        litrosTotais += item.quantidade;
      }
    }
  }

  return {
    totalSolicitacoes: pedidos.length,
    solicitacoesPendentes,
    emFeitioNoAcre,
    emTransitoRefrigerado,
    entreguesConsagrados,
    litrosTotaisProgramados: litrosTotais,
  };
}
