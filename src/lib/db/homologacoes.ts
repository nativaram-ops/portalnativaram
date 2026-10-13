import fs from "fs/promises";
import path from "path";

export interface SolicitacaoAcesso {
  id: string; // Protocolo (ex: NAT-2026-A1B2 ou REC-2026-C3D4)
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

// Congregações pré-homologadas no sistema
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

async function garantirBanco(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      await fs.writeFile(DB_FILE, JSON.stringify(DADOS_INICIAIS, null, 2), "utf-8");
    }
  } catch (err) {
    console.warn("Aviso ao inicializar banco de solicitações de homologação:", err);
  }
}

export async function obterTodasSolicitacoes(): Promise<SolicitacaoAcesso[]> {
  await garantirBanco();
  try {
    const raw = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return DADOS_INICIAIS;
  }
}

export async function registrarSolicitacao(
  nova: Omit<SolicitacaoAcesso, "status" | "dataEnvio">
): Promise<SolicitacaoAcesso> {
  await garantirBanco();
  const solicitacoes = await obterTodasSolicitacoes();

  const dataEnvio = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const registroCompleto: SolicitacaoAcesso = {
    ...nova,
    status: "PENDENTE_LIBERACAO",
    dataEnvio,
  };

  // Se já existir com o mesmo id, atualiza, senão adiciona no topo
  const index = solicitacoes.findIndex((s) => s.id === registroCompleto.id);
  if (index >= 0) {
    solicitacoes[index] = { ...solicitacoes[index], ...registroCompleto };
  } else {
    solicitacoes.unshift(registroCompleto);
  }

  await fs.writeFile(DB_FILE, JSON.stringify(solicitacoes, null, 2), "utf-8");
  return registroCompleto;
}

/**
 * Homologa a solicitação no ADM gerando Login e Senha automáticos
 */
export async function homologarSolicitacao(id: string): Promise<{
  solicitacao: SolicitacaoAcesso;
  loginGerado: string;
  senhaGerada: string;
  mensagemWhatsApp: string;
  whatsappUrl: string;
} | null> {
  await garantirBanco();
  const solicitacoes = await obterTodasSolicitacoes();
  const index = solicitacoes.findIndex((s) => s.id.toUpperCase() === id.toUpperCase());

  if (index === -1) return null;

  const sol = solicitacoes[index];

  // 1. Gerar Login único
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const prefixo = sol.tipo === "INSTITUICAO_FORMAL" ? "NAT-TEMPLO" : "NAT-GRP";
  const loginGerado = sol.loginGerado || `${prefixo}-${randomSuffix}`;

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
  await fs.writeFile(DB_FILE, JSON.stringify(solicitacoes, null, 2), "utf-8");

  // 3. Montar Mensagem pronta para o WhatsApp do Dirigente
  const telefoneLimpo = sol.telefone.replace(/\D/g, "");
  const ddi = telefoneLimpo.startsWith("55") ? "" : "55";
  const numeroCompleto = `${ddi}${telefoneLimpo}`;

  const msg = [
    `🏛️ *COOPERATIVA NATIVARAM — ACESSO LITÚRGICO LIBERADO!*`,
    ``,
    `Olá, *${sol.nomeResponsavel}*!`,
    `A solicitação para *${sol.nomeEntidade}* (Protocolo \`${sol.id}\`) foi devidamente apreciada e *HOMOLOGADA* pelo Conselho Gestor da Cooperativa.`,
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
  const whatsappUrl = `https://wa.me/${numeroCompleto}?text=${encodeURIComponent(mensagemWhatsApp)}`;

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
  await garantirBanco();
  const solicitacoes = await obterTodasSolicitacoes();
  const loginUpper = login.trim().toUpperCase();
  const senhaLimpa = senha.trim();

  const match = solicitacoes.find((s) => {
    if (s.status !== "HOMOLOGADO") return false;
    const loginValido =
      (s.loginGerado && s.loginGerado.toUpperCase() === loginUpper) ||
      s.id.toUpperCase() === loginUpper;
    if (!loginValido) return false;

    if (s.senhaGerada) {
      return s.senhaGerada === senhaLimpa;
    }
    return senhaLimpa.length >= 4;
  });

  return match || null;
}
