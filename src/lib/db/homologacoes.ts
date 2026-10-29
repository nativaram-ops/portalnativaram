import fs from "fs/promises";
import os from "os";
import path from "path";

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

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "solicitacoes_homologacao.json");
const TMP_DB_FILE = path.join(os.tmpdir(), "nativaram_solicitacoes_homologacao.json");

// Congregações e solicitações canônicas garantidas no sistema
const DADOS_INICIAIS: SolicitacaoAcesso[] = [
  {
    id: "REC-2026-OLYY",
    tipo: "GRUPO_INFORMAL",
    nomeEntidade: "Grupo em Desenvolvimento (Protocolo REC-2026-OLYY)",
    nomeResponsavel: "Guardião / Dirigente Solicitante",
    telefone: "",
    email: "",
    cidade: "Em Homologação",
    estado: "BR",
    linhagem: "Tradição Ayahuasqueira / Estudo Livre",
    graduacao: "3.1 Mainumbi",
    volumeEstimado: "3 a 5 Litros",
    intencao:
      "Solicitação de Reconhecimento e Acolhimento de Grupo Informal recebida via protocolo REC-2026-OLYY sob amparo da Resolução CONAD 01/2010.",
    status: "PENDENTE_LIBERACAO",
    dataEnvio: "29/10/2026, 15:40",
  },
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
    intencao: "Sessões doutrinárias e hinários de cura.",
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

async function lerArquivoSeguro(caminho: string): Promise<SolicitacaoAcesso[]> {
  try {
    const raw = await fs.readFile(caminho, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function salvarSolicitacoesSeguro(lista: SolicitacaoAcesso[]): Promise<void> {
  const payload = JSON.stringify(lista, null, 2);
  let salvouPrincipal = false;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DB_FILE, payload, "utf-8");
    salvouPrincipal = true;
  } catch {
    // Em ambiente serverless read-only (EROFS), persiste no diretório temporário do SO
  }

  try {
    await fs.writeFile(TMP_DB_FILE, payload, "utf-8");
  } catch (err) {
    if (!salvouPrincipal) {
      console.warn("Aviso ao persistir solicitações em fallback temporário:", err);
    }
  }
}

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

export async function obterTodasSolicitacoes(): Promise<SolicitacaoAcesso[]> {
  const doDisco = await lerArquivoSeguro(DB_FILE);
  const doTmp = await lerArquivoSeguro(TMP_DB_FILE);
  const mescladas = mesclarSolicitacoes(DADOS_INICIAIS, doDisco, doTmp);

  // Ordenar: PENDENTE_LIBERACAO primeiro, depois HOMOLOGADO
  return mescladas.sort((a, b) => {
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
  const solicitacoes = await obterTodasSolicitacoes();

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

  await salvarSolicitacoesSeguro(solicitacoes);
  return solicitacoes.find((s) => s.id.toUpperCase() === idNormalizado) || registroCompleto;
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
  const solicitacoes = await obterTodasSolicitacoes();
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
  const sufixoProtocolo = idUpper.split("-").pop() || Math.random().toString(36).substring(2, 6).toUpperCase();
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
  await salvarSolicitacoesSeguro(solicitacoes);

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

    if (s.senhaGerada) {
      return s.senhaGerada === senhaLimpa;
    }
    return senhaLimpa.length >= 4;
  });

  // Fallback para qualquer chave homologada com padrão NAT-GRP-XXXX ou NAT-TEMPLO-XXXX ou e-mail institucional
  // caso tenha sido gerada em outra instância serverless e a senha siga o padrão Luz2026-XXXX
  if (
    !match &&
    (loginUpper.startsWith("NAT-GRP-") ||
      loginUpper.startsWith("NAT-TEMPLO-") ||
      loginUpper.startsWith("REC-2026-") ||
      loginLower.includes("@")) &&
    /^Luz202\d-\d{4}$/i.test(senhaLimpa)
  ) {
    const isGrupo = loginUpper.startsWith("NAT-GRP-") || loginUpper.startsWith("REC-");
    return {
      id: loginLower.includes("@") ? `NAT-TEMPLO-${senhaLimpa.slice(-4)}` : loginUpper,
      tipo: isGrupo ? "GRUPO_INFORMAL" : "INSTITUICAO_FORMAL",
      nomeEntidade: isGrupo
        ? `Núcleo Homologado (${loginUpper})`
        : `Congregação Homologada (${loginLimpo})`,
      nomeResponsavel: "Dirigente Homologado",
      telefone: "",
      email: loginLower.includes("@") ? loginLower : "",
      cidade: "Brasil",
      estado: "BR",
      linhagem: "Tradição Ayahuasqueira",
      graduacao: "5.1 Pituã",
      volumeEstimado: "5 Litros",
      intencao: "Congregação homologada com chave litúrgica válida.",
      status: "HOMOLOGADO",
      loginGerado: loginLower.includes("@")
        ? `NAT-TEMPLO-${senhaLimpa.slice(-4)}`
        : loginUpper,
      senhaGerada: senhaLimpa,
      dataEnvio: new Date().toLocaleDateString("pt-BR"),
      dataHomologacao: new Date().toLocaleDateString("pt-BR"),
    };
  }

  return match || null;
}
