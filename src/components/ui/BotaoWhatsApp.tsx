import React from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { LINK_WHATSAPP, WHATSAPP_CONSELHO_FORMATADO } from "@/lib/contato";

interface BotaoWhatsAppProps {
  /** "botao": botão verde cheio. "link": texto discreto (rodapé, listas). */
  variante?: "botao" | "link";
  className?: string;
}

/**
 * Botão único de WhatsApp do site: só para falar com a cooperativa.
 * Mesmo link e mesma mensagem em todas as páginas (src/lib/contato.ts).
 */
export const BotaoWhatsApp = ({ variante = "botao", className = "" }: BotaoWhatsAppProps) => {
  if (variante === "link") {
    return (
      <a
        href={LINK_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors ${className}`}
      >
        <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
        <span>WhatsApp {WHATSAPP_CONSELHO_FORMATADO}</span>
        <span className="sr-only">(abre em nova aba)</span>
      </a>
    );
  }

  return (
    <a
      href={LINK_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 px-5 py-3 text-white shadow-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-floresta-950 ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span className="flex flex-col text-left leading-tight">
        <span className="text-xs font-bold uppercase tracking-wider">Falar com a cooperativa</span>
        <span className="text-[11px] font-medium text-emerald-100">
          WhatsApp {WHATSAPP_CONSELHO_FORMATADO}
        </span>
      </span>
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
};
