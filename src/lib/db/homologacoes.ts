import {
  getDirectSupabaseClient,
  withTimeout,
  gravarNoSupabase,
  createHybridJsonStore,
} from "./core-hybrid-store";

export interface SolicitacaoAcesso {
  id: string; // Protocolo (ex: NAT-2026-A1B2 ou REC-2026-OLYY)
  tipo: "INSTITUICAO_FORMAL" | "GRUPO_INFORMAL";
  nomeEntidade: string;
  nomeResponsavel: string;
  telefone: string;
  email: string;
  cidade: string;
  estado: string;
  cnpj?: string;
  linhagem: string;
  graduacao: string;
  volumeEstimado: string;
  intencao: string;
  status: "PENDENTE_LIBERACAO" | "HOMOLOGADO" | "RECUSADO";
  loginGerado?: string;
  senhaGerada?: string;
  dataEnvio: string;
  dataHomologacao?: string;
  observacoesConselho?: string;
}

interface SolicitacaoRow {
  id: string;
  tipo: "INSTITUICAO_FORMAL" | "GRUPO_INFORMAL";
  nome_entidade: string;
  nome_responsavel: string;
  telefone: string;
  email: string;
  cidade: string;
  estado: string;
  cnpj: string | null;
  linhagem: string;
  graduacao: string;
  volume_estimado: string;
  intencao: string;
  status: "PENDENTE_LIBERACAO" | "HOMOLOGADO" | "RECUSADO";
  login_gerado: string | null;
  senha_gerada: string | null;
  data_envio: string;
  data_homologacao: string | null;
  observacoes_conselho: string | null;
}

function mapRowToSolicitacao(row: SolicitacaoRow): SolicitacaoAcesso {
  return {
    id: row.id,
    tipo: row.tipo || "INSTITUICAO_FORMAL",
    nomeEntidade: row.nome_entidade,
    nomeResponsavel: row.nome_responsavel,
    telefone: row.telefone || "",
    email: row.email || "",
    cidade: row.cidade || "",
    estado: row.estado || "",
    cnpj: row.cnpj || undefined,
    linhagem: row.linhagem || "",
    graduacao: row.graduacao || "",
    volumeEstimado: row.volume_estimado || "",
    intencao: row.intencao || "",
    status: row.status || "PENDENTE_LIBERACAO",
    loginGerado: row.login_gerado || undefined,
    senhaGerada: row.senha_gerada || undefined,
    dataEnvio: row.data_envio || "",
    dataHomologacao: row.data_homologacao || undefined,
    observacoesConselho: row.observacoes_conselho || undefined,
  };
}

function mapSolicitacaoToRow(sol: SolicitacaoAcesso): SolicitacaoRow {
  return {
    id: sol.id,
    tipo: sol.tipo,
    nome_entidade: sol.nomeEntidade,
    nome_responsavel: sol.nomeResponsavel,
    telefone: sol.telefone || "",
    email: sol.email || "",
    cidade: sol.cidade || "",
    estado: sol.estado || "",
    cnpj: sol.cnpj || null,
    linhagem: sol.linhagem || "",
    graduacao: sol.graduacao || "",
    volume_estimado: sol.volumeEstimado || "",
    intencao: sol.intencao || "",
    status: sol.status,
    login_gerado: sol.loginGerado || null,
    senha_gerada: sol.senhaGerada || null,
    data_envio: sol.dataEnvio || "",
    data_homologacao: sol.dataHomologacao || null,
    observacoes_conselho: sol.observacoesConselho || null,
  };
}

// Congregações e solicitações canônicas garantidas no sistema
const DADOS_INICIAIS: SolicitacaoAcesso[] = [
  {
    id: "NAT-TEMPLO-842",
    tipo: "INSTITUICAO_FORMAL",
    nomeEntidade: "Templo Céu do Cruzeiro",
    nomeResponsavel: "Padrinho Marcos Silva",
    telefone: "11987654321",
    email: "marcos@ceudocruzeiro.org",
    cidade: "São Paulo",
    estado: "SP",
    cnpj: "34.567.890/0001-12",
    linhagem: "Linha do Santo Daime",
    graduacao: "10.1 Wirapuru",
    volumeEstimado: "10 Litros",
    intencao: "Sessões doutrinárias e hinários de alinhamento espiritual.",
    status: "HOMOLOGADO",
    loginGerado: "NAT-TEMPLO-842",
    senhaGerada: "cruzeiro2026",
    dataEnvio: "14/05/2025",
    dataHomologacao: "14/05/2025",
  },
  {
    id: "NAT-TEMPLO-913",
    tipo: "INSTITUICAO_FORMAL",
    nomeEntidade: "Fraternidade Rainha da Floresta",
    nomeResponsavel: "Madre Clara Albuquerque",
    telefone: "21998877665",
    email: "clara@rainhadafloresta.org",
    cidade: "Petrópolis",
    estado: "RJ",
    cnpj: "45.678.901/0001-23",
    linhagem: "Xamanismo Universalista",
    graduacao: "5.1 Pituã",
    volumeEstimado: "15 Litros",
    intencao: "Ritos de autocuidado e reconexão sensorial.",
    status: "HOMOLOGADO",
    loginGerado: "NAT-TEMPLO-913",
    senhaGerada: "floresta2026",
    dataEnvio: "02/08/2025",
    dataHomologacao: "03/08/2025",
  },
];

const solicitacoesStore = createHybridJsonStore<SolicitacaoAcesso>({
  filename: "solicitacoes_homologacao.json",
  seedData: DADOS_INICIAIS,
  getKey: (item) => item.id.trim().toUpperCase(),
});

function mesclarSolicitacoes(...listas: SolicitacaoAcesso[][]): SolicitacaoAcesso[] {
  const mapa = new Map<string, SolicitacaoAcesso>();
  // Ordem de prioridade: listas mais recentes sobrescrevem dados iniciais se já homologadas
  for (const lista of listas) {
    for (const item of lista) {
      if (!item || !item.id) continue;
      const chave = item.id.trim().toUpperCase();
      const existente = mapa.get(chave);
      if (!existente) {
        mapa.set(chave, { ...item, id: chave });
      } else {
        // Preserva o status HOMOLOGADO e credenciais geradas se um dos registros já tiver sido aprovado
        const usarNovo =
          item.status === "HOMOLOGADO" ||
          (existente.status !== "HOMOLOGADO" && Boolean(item.nomeEntidade));
        if (usarNovo) {
          mapa.set(chave, {
            ...existente,
            ...item,
            id: chave,
            loginGerado: item.loginGerado || existente.loginGerado,
            senhaGerada: item.senhaGerada || existente.senhaGerada,
            dataHomologacao: item.dataHomologacao || existente.dataHomologacao,
          });
        }
      }
    }
  }
  return Array.from(mapa.values());
}

/** Marca gravada pelo Conselho ao excluir um cadastro (status RECUSADO + esta observação). */
export const MARCA_EXCLUSAO = "EXCLUIDO_PELO_ADMIN";

const estaExcluida = (s: SolicitacaoAcesso) => s.observacoesConselho === MARCA_EXCLUSAO;

/**
 * Todas as solicitações, inclusive as excluídas pelo Conselho. Uso interno: quem grava
 * precisa preservar a marca de exclusão para que ela vença cópias antigas (dados
 * iniciais ou o armazenamento temporário de outra instância serverless).
 */
async function obterSolicitacoesComExcluidas(): Promise<SolicitacaoAcesso[]> {
  const locais = await solicitacoesStore.readAll();
  let remotas: SolicitacaoAcesso[] = [];

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await withTimeout<{
        data: SolicitacaoRow[] | null;
        error: unknown;
      }>(
        supabase.from("solicitacoes_homologacao").select("*"),
        2000
      );
      if (!error && data && data.length > 0) {
        remotas = data.map(mapRowToSolicitacao);
      }
    } catch {
      // Fallback silencioso para armazenamento híbrido local
    }
  }

  const mescladas = mesclarSolicitacoes(DADOS_INICIAIS, remotas, locais);

  // A exclusão vence: se qualquer cópia (nuvem ou local) traz a marca, o cadastro
  // fica excluído, mesmo que outra cópia ainda diga HOMOLOGADO.
  const excluidas = new Set(
    [...remotas, ...locais].filter(estaExcluida).map((s) => s.id.trim().toUpperCase())
  );
  return mescladas.map((s) =>
    excluidas.has(s.id) ? { ...s, status: "RECUSADO" as const, observacoesConselho: MARCA_EXCLUSAO } : s
  );
}

export async function obterTodasSolicitacoes(): Promise<SolicitacaoAcesso[]> {
  const ativas = (await obterSolicitacoesComExcluidas()).filter((s) => !estaExcluida(s));

  // Ordenar: PENDENTE_LIBERACAO primeiro, depois HOMOLOGADO
  return ativas.sort((a, b) => {
    if (a.status === "PENDENTE_LIBERACAO" && b.status !== "PENDENTE_LIBERACAO") return -1;
    if (a.status !== "PENDENTE_LIBERACAO" && b.status === "PENDENTE_LIBERACAO") return 1;
    return 0;
  });
}

export async function registrarSolicitacao(
  nova: Omit<SolicitacaoAcesso, "status" | "dataEnvio"> & {
    status?: SolicitacaoAcesso["status"];
    dataEnvio?: string;
  }
): Promise<SolicitacaoAcesso> {
  const solicitacoes = await obterSolicitacoesComExcluidas();

  const dataEnvio =
    nova.dataEnvio ||
    new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const idNormalizado = nova.id.trim().toUpperCase();

  const registroCompleto: SolicitacaoAcesso = {
    ...nova,
    id: idNormalizado,
    status: nova.status || "PENDENTE_LIBERACAO",
    dataEnvio,
  };

  const index = solicitacoes.findIndex((s) => s.id.toUpperCase() === idNormalizado);
  if (index >= 0) {
    solicitacoes[index] = {
      ...solicitacoes[index],
      ...registroCompleto,
      // Se já estava homologado, mantém credenciais salvo se reenviado explicitamente
      status:
        solicitacoes[index].status === "HOMOLOGADO" && !nova.status
          ? "HOMOLOGADO"
          : registroCompleto.status,
      loginGerado: solicitacoes[index].loginGerado || registroCompleto.loginGerado,
      senhaGerada: solicitacoes[index].senhaGerada || registroCompleto.senhaGerada,
    };
  } else {
    solicitacoes.unshift(registroCompleto);
  }

  const salvo =
    solicitacoes.find((s) => s.id.toUpperCase() === idNormalizado) || registroCompleto;

  await solicitacoesStore.writeAll(solicitacoes);

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    await gravarNoSupabase(
      supabase.from("solicitacoes_homologacao").upsert(mapSolicitacaoToRow(salvo)),
      "gravar em solicitacoes_homologacao"
    );
  }

  return salvo;
}

/**
 * Homologa a solicitação no ADM gerando Login e Senha automáticos.
 * Aceita dados complementares opcionais caso o Administrador atualize nome, dirigente ou WhatsApp no ato da aprovação.
 */
export async function homologarSolicitacao(
  id: string,
  dadosComplementares?: Partial<
    Pick<
      SolicitacaoAcesso,
      | "nomeEntidade"
      | "nomeResponsavel"
      | "telefone"
      | "email"
      | "cidade"
      | "estado"
      | "linhagem"
      | "graduacao"
      | "volumeEstimado"
      | "intencao"
      | "tipo"
    >
  >
): Promise<{
  solicitacao: SolicitacaoAcesso;
  loginGerado: string;
  senhaGerada: string;
  mensagemWhatsApp: string;
  whatsappUrl: string;
} | null> {
  const solicitacoes = await obterSolicitacoesComExcluidas();
  const idUpper = id.trim().toUpperCase();
  let index = solicitacoes.findIndex((s) => s.id.toUpperCase() === idUpper);

  // Se o protocolo foi recebido externamente (ex: WhatsApp) e ainda não constava na lista, cria na hora
  if (index === -1) {
    const tipoInferido: SolicitacaoAcesso["tipo"] =
      dadosComplementares?.tipo ||
      (idUpper.startsWith("REC-") ? "GRUPO_INFORMAL" : "INSTITUICAO_FORMAL");

    const novaCriada: SolicitacaoAcesso = {
      id: idUpper,
      tipo: tipoInferido,
      nomeEntidade:
        dadosComplementares?.nomeEntidade || `Congregação Homologada (${idUpper})`,
      nomeResponsavel:
        dadosComplementares?.nomeResponsavel || "Dirigente Responsável",
      telefone: dadosComplementares?.telefone || "",
      email: dadosComplementares?.email || "",
      cidade: dadosComplementares?.cidade || "Brasil",
      estado: dadosComplementares?.estado || "BR",
      linhagem: dadosComplementares?.linhagem || "Tradição Ayahuasqueira",
      graduacao: dadosComplementares?.graduacao || "3.1 Mainumbi",
      volumeEstimado: dadosComplementares?.volumeEstimado || "5 Litros",
      intencao:
        dadosComplementares?.intencao ||
        `Homologação direta pelo protocolo ${idUpper}.`,
      status: "PENDENTE_LIBERACAO",
      dataEnvio: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    solicitacoes.unshift(novaCriada);
    index = 0;
  }

  const sol = {
    ...solicitacoes[index],
    ...(dadosComplementares
      ? Object.fromEntries(
          Object.entries(dadosComplementares).filter(
            ([, v]) => v !== undefined && v !== ""
          )
        )
      : {}),
  } as SolicitacaoAcesso;

  // 1. Gerar Login único baseado no protocolo para fácil rastreabilidade
  const sufixoProtocolo =
    idUpper.split("-").pop() || Math.random().toString(36).substring(2, 6).toUpperCase();
  const prefixo = sol.tipo === "INSTITUICAO_FORMAL" ? "NAT-TEMPLO" : "NAT-GRP";
  const loginGerado = sol.loginGerado || `${prefixo}-${sufixoProtocolo}`;

  // 2. Gerar Senha segura e fácil
  const randomPassNum = Math.floor(1000 + Math.random() * 9000);
  const senhaGerada = sol.senhaGerada || `Luz${new Date().getFullYear()}-${randomPassNum}`;

  const dataHomologacao = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const atualizada: SolicitacaoAcesso = {
    ...sol,
    status: "HOMOLOGADO",
    loginGerado,
    senhaGerada,
    dataHomologacao,
  };

  solicitacoes[index] = atualizada;
  await solicitacoesStore.writeAll(solicitacoes);

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    await gravarNoSupabase(
      supabase.from("solicitacoes_homologacao").upsert(mapSolicitacaoToRow(atualizada)),
      "gravar em solicitacoes_homologacao"
    );
  }

  // 3. Montar Mensagem pronta para o WhatsApp do Dirigente
  const telefoneLimpo = (atualizada.telefone || "").replace(/\D/g, "");
  const ddi = telefoneLimpo.startsWith("55") ? "" : "55";
  const numeroCompleto = `${ddi}${telefoneLimpo}`;

  const msg = [
    `🏛️ *COOPERATIVA NATIVARAM — ACESSO LITÚRGICO LIBERADO!*`,
    ``,
    `Olá, *${atualizada.nomeResponsavel}*!`,
    `A solicitação para *${atualizada.nomeEntidade}* (Protocolo \`${atualizada.id}\`) foi devidamente apreciada e *HOMOLOGADA* pelo Conselho Gestor da Cooperativa Nativaram.`,
    ``,
    `Suas credenciais exclusivas para entrada no Portal do Dirigente foram geradas:`,
    `🔑 *Código de Acesso (Login):* \`${loginGerado}\``,
    `🔐 *Chave de Segurança (Senha):* \`${senhaGerada}\``,
    ``,
    `🌐 *Acesse o Portal:*`,
    `https://nativaramcoop.eco.br/portal-dirigente`,
    ``,
    `No portal você poderá registrar solicitações de partilha, consultar laudos do Acre, usar a calculadora litúrgica e emitir documentos oficiais A4.`,
    ``,
    `_Que a luz e a memória da floresta abençoem seus trabalhos e sua congregação._`,
  ];

  const mensagemWhatsApp = msg.join("\n");
  const whatsappUrl =
    telefoneLimpo.length >= 10
      ? `https://wa.me/${numeroCompleto}?text=${encodeURIComponent(mensagemWhatsApp)}`
      : `https://wa.me/?text=${encodeURIComponent(mensagemWhatsApp)}`;

  return {
    solicitacao: atualizada,
    loginGerado,
    senhaGerada,
    mensagemWhatsApp,
    whatsappUrl,
  };
}

/**
 * Validação de credenciais pelo PortalLoginGate
 */
export async function validarCredenciaisDirigente(
  login: string,
  senha: string
): Promise<SolicitacaoAcesso | null> {
  const solicitacoes = await obterTodasSolicitacoes();
  const loginLimpo = login.trim();
  const loginUpper = loginLimpo.toUpperCase();
  const loginLower = loginLimpo.toLowerCase();
  const senhaLimpa = senha.trim();

  const match = solicitacoes.find((s) => {
    if (s.status !== "HOMOLOGADO") return false;
    const loginValido =
      (s.loginGerado && s.loginGerado.toUpperCase() === loginUpper) ||
      s.id.toUpperCase() === loginUpper ||
      (s.email && s.email.trim().toLowerCase() === loginLower);
    if (!loginValido) return false;

    // Sem chave gerada não há como autenticar: nenhum valor é aceito.
    return Boolean(s.senhaGerada) && s.senhaGerada === senhaLimpa;
  });

  return match || null;
}

/**
 * Exclui permanentemente o cadastro de uma instituição / congregação
 * no repositório híbrido local e na nuvem Supabase.
 */
export async function excluirSolicitacao(id: string): Promise<boolean> {
  const idUpper = id.trim().toUpperCase();
  const solicitacoes = await obterSolicitacoesComExcluidas();

  const alvo = solicitacoes.find(
    (s) =>
      !estaExcluida(s) &&
      (s.id.toUpperCase() === idUpper ||
        (s.loginGerado && s.loginGerado.toUpperCase() === idUpper))
  );
  if (!alvo) return false;

  const marcado: SolicitacaoAcesso = {
    ...alvo,
    status: "RECUSADO",
    observacoesConselho: MARCA_EXCLUSAO,
  };

  // Mantém a linha com a marca (em vez de apagá-la) para que nenhuma cópia antiga ressuscite o acesso.
  await solicitacoesStore.writeAll(solicitacoes.map((s) => (s.id === alvo.id ? marcado : s)));

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    await gravarNoSupabase(
      supabase.from("solicitacoes_homologacao").upsert(mapSolicitacaoToRow(marcado)),
      "gravar exclusão em solicitacoes_homologacao"
    );

    const codigo = (alvo.loginGerado || alvo.id).toUpperCase();
    for (const tabela of ["templos_credenciados", "perfis_comunidade"]) {
      const { error: erroTabela } = await withTimeout<{ error: unknown }>(
        supabase.from(tabela).delete().eq("codigo_liturgico", codigo),
        3000
      );
      if (erroTabela) console.error(`[homologacoes] Falha ao remover de ${tabela}:`, erroTabela);
    }
  }

  return true;
}
