/**
 * Mensagem de WhatsApp enviada ao Conselho Gestor ao concluir um cadastro
 * (Credenciamento de templos e Ficha de Reconhecimento de grupos).
 */
export const WHATSAPP_CONSELHO = "556899779104";

export interface DadosMensagemCadastro {
  tipo: "CREDENCIAMENTO" | "RECONHECIMENTO";
  protocolo: string;
  entidade: string;
  responsavel: string;
  telefone: string;
  localidade: string;
  graduacao: string;
  detalhe?: string;
}

export function montarMensagemCadastro(d: DadosMensagemCadastro): string {
  const ficha =
    d.tipo === "CREDENCIAMENTO"
      ? "Ficha de Credenciamento"
      : "Ficha de Reconhecimento";

  return [
    `✅ *COOPERATIVA NATIVARAM — CADASTRO REALIZADO*`,
    ``,
    `Olá, Conselho Gestor da Cooperativa Nativaram!`,
    `Acabamos de concluir a ${ficha} no portal e solicitamos a *análise e a liberação do acesso* ao Portal do Dirigente.`,
    ``,
    `📜 *Protocolo:* ${d.protocolo}`,
    `🏛️ *Entidade / Grupo:* ${d.entidade}`,
    `👤 *Responsável:* ${d.responsavel}`,
    `📱 *Contato:* ${d.telefone}`,
    `📍 *Localidade:* ${d.localidade}`,
    `🌿 *Graduação:* ${d.graduacao}${d.detalhe ? ` (${d.detalhe})` : ""}`,
    ``,
    `Ficamos à disposição para esclarecer qualquer pergunta por aqui. Aguardamos o retorno com nosso código de acesso.`,
  ].join("\n");
}

export function urlWhatsAppConselho(texto: string): string {
  return `https://wa.me/${WHATSAPP_CONSELHO}?text=${encodeURIComponent(texto)}`;
}

/**
 * Reserva a aba do WhatsApp. Deve ser chamada de forma síncrona no início do
 * envio do formulário (gesto do usuário), senão o navegador bloqueia o pop-up.
 */
export function reservarJanelaWhatsApp(): Window | null {
  if (typeof window === "undefined") return null;
  try {
    return window.open("", "_blank");
  } catch {
    return null;
  }
}

/** Direciona a aba reservada para o WhatsApp; se bloqueada, o botão da tela de sucesso cobre. */
export function abrirWhatsAppReservado(janela: Window | null, url: string): void {
  if (!janela || janela.closed) return;
  try {
    janela.location.href = url;
  } catch {
    // Mantém o botão manual como alternativa.
  }
}
