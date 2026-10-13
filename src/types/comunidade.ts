/**
 * ============================================================
 * COOPERATIVA ETNOBOTÂNICA NATIVARAM — TIPAGEM DE COMUNIDADE
 * Módulo: Blog Comunitário, Perfis de Templos e Agenda Litúrgica
 * ============================================================
 */

export type CategoriaPublicacao =
  | "REFLEXAO_DOUTRINARIA"
  | "RELATO_VIVENCIA"
  | "BOTANICA_TRADICIONAL"
  | "ARTE_E_POESIA"
  | "COMUNICADO_LITURGICO"
  | "ESTUDO_ETNOFARMACEUTICO";

export interface AnexoArquivo {
  nome: string;
  url: string;
  tamanho?: string;
  tipo: "PDF" | "SLIDE" | "DOCUMENTO" | "LINK_EXTERNO";
}

export interface EmbedSocial {
  plataforma: "INSTAGRAM" | "YOUTUBE" | "SPOTIFY" | "NOTEBOOKLM" | "OUTRO";
  url: string;
  titulo?: string;
}

export interface PublicacaoComunidade {
  id: string;
  temploCodigo: string; // Ex: "NAT-TEMPLO-842"
  temploNome: string;   // Ex: "Templo Céu do Cruzeiro"
  temploSlug: string;   // Ex: "ceu-do-cruzeiro"
  slug: string;         // Ex: "o-silencio-da-mata-e-a-chacrona"
  titulo: string;
  resumo: string;
  conteudoMarkdown: string;
  categoria: CategoriaPublicacao;
  categoriaLabel: string;
  imagemCapa?: string;
  fotosGaleria?: string[];
  anexos: AnexoArquivo[];
  embeds: EmbedSocial[];
  status: "PUBLICADO" | "RASCUNHO" | "ARQUIVADO";
  destaque?: boolean;
  visualizacoes: number;
  criadoEm: string;    // Data ISO ou formato pt-BR
  atualizadoEm: string;
}

export interface ItemAgendaLiturgica {
  id: string;
  temploCodigo: string;
  tituloRito: string;
  descricao?: string;
  dataEvento: string;     // YYYY-MM-DD
  horarioInicio: string;  // HH:mm
  vagasInfo?: string;     // Ex: "Vagas limitadas mediante anamnese"
  linkInscricao?: string; // WhatsApp ou link de formulário
  status: "CONFIRMADO" | "CANCELADO" | "CONCLUIDO";
}

export interface RedesSociaisTemplo {
  instagram?: string;
  youtube?: string;
  spotify?: string;
  facebook?: string;
  website?: string;
}

export interface PerfilTemploComunidade {
  codigoLiturgico: string; // Ex: "NAT-TEMPLO-842"
  slug: string;            // Ex: "ceu-do-cruzeiro"
  nomeInstituicao: string;
  dirigenteResponsavel: string;
  linhagem: string;        // Ex: "Linha do Santo Daime", "Xamanismo Universalista"
  cidade: string;
  estado: string;
  bioApresentacao: string;
  fotoPerfilUrl?: string;
  fotoCapaUrl?: string;
  fotosEspaco: string[];   // Fotos do altar, casa de feitio, salão litúrgico
  redesSociais: RedesSociaisTemplo;
  whatsappContato?: string;
  emailContato?: string;
  agenda: ItemAgendaLiturgica[];
  publicado: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface AlertaConformidadeLinguagem {
  termoDetectado: string;
  sugestaoAprovada: string;
  motivoConad: string;
}
