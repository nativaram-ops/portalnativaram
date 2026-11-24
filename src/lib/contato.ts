/**
 * Canais institucionais de contato da coordenação do projeto Cooperativa Nativaram.
 * O site não coleta dados: o contato acontece fora dele, por WhatsApp ou e-mail.
 *
 * O WhatsApp é um canal só de contato com a cooperativa. Todo botão do site usa
 * LINK_WHATSAPP (mesma mensagem inicial, sem pedido, valor ou envio).
 * Componente único: src/components/ui/BotaoWhatsApp.tsx.
 */
export const WHATSAPP_CONSELHO = "5568999979104";
export const WHATSAPP_CONSELHO_FORMATADO = "(68) 99997-9104";
export const EMAIL_INSTITUCIONAL = "nativaram@gmail.com";

export const MENSAGEM_WHATSAPP =
  "Olá! Gostaria de falar com a coordenação do projeto Cooperativa Nativaram.";

export const LINK_WHATSAPP = `https://wa.me/${WHATSAPP_CONSELHO}?text=${encodeURIComponent(
  MENSAGEM_WHATSAPP
)}`;

/** Link mailto do e-mail institucional, com assunto opcional. */
export function linkEmailInstitucional(assunto?: string): string {
  return assunto
    ? `mailto:${EMAIL_INSTITUCIONAL}?subject=${encodeURIComponent(assunto)}`
    : `mailto:${EMAIL_INSTITUCIONAL}`;
}
