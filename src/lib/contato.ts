/**
 * Canais institucionais de contato da coordenação do projeto Cooperativa Nativaram.
 * O site não coleta dados: o contato acontece fora dele, por WhatsApp ou e-mail.
 */
export const WHATSAPP_CONSELHO = "5568999979104";
export const WHATSAPP_CONSELHO_FORMATADO = "(68) 99997-9104";
export const EMAIL_INSTITUCIONAL = "nativaram@gmail.com";

/** Link do WhatsApp institucional, com mensagem opcional. */
export function linkWhatsAppConselho(texto?: string): string {
  const base = `https://wa.me/${WHATSAPP_CONSELHO}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

/** Link mailto do e-mail institucional, com assunto opcional. */
export function linkEmailInstitucional(assunto?: string): string {
  return assunto
    ? `mailto:${EMAIL_INSTITUCIONAL}?subject=${encodeURIComponent(assunto)}`
    : `mailto:${EMAIL_INSTITUCIONAL}`;
}
