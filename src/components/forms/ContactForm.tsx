import React from "react";
import Link from "next/link";
import { Mail, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import {
  EMAIL_INSTITUCIONAL,
  WHATSAPP_CONSELHO_FORMATADO,
  linkEmailInstitucional,
  linkWhatsAppConselho,
} from "@/lib/contato";

/**
 * Canais de contato institucional. Não há formulário: o site não coleta dados.
 * A conversa acontece fora do site, por WhatsApp ou e-mail.
 */
export const ContactForm = () => {
  return (
    <div className="rounded-xl border border-ambar-500/30 bg-floresta-900/60 p-6 sm:p-8 space-y-6 shadow-lg">
      <div className="border-b border-ambar-500/20 pb-4 space-y-2">
        <h2 className="font-serif text-lg font-bold text-areia-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-ambar-400" />
          <span>Contato Institucional</span>
        </h2>
        <p className="text-sm text-areia-300 leading-relaxed">
          Entidades religiosas constituídas podem falar com a coordenação do projeto pelo
          e-mail ou WhatsApp institucional. Não coletamos dados pelo site.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={linkWhatsAppConselho(
            "Olá, gostaria de falar com a coordenação do projeto Cooperativa Nativaram."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp {WHATSAPP_CONSELHO_FORMATADO}</span>
        </a>
        <a
          href={linkEmailInstitucional("Contato institucional - Cooperativa Nativaram")}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-ambar-500/40 bg-floresta-950/70 hover:bg-floresta-800 px-5 py-3 text-xs font-bold uppercase tracking-wider text-ambar-300 transition-all active:scale-[0.98]"
        >
          <Mail className="h-4 w-4" />
          <span>{EMAIL_INSTITUCIONAL}</span>
        </a>
      </div>

      <div className="rounded-lg border border-ambar-500/15 bg-floresta-950/60 p-4 flex items-start gap-2.5">
        <ShieldCheck className="h-4 w-4 text-ambar-400 shrink-0 mt-0.5" />
        <p className="text-xs text-areia-400 leading-relaxed">
          Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios.
          Ao escrever por WhatsApp ou e-mail, os dados que você enviar ficam nesses serviços.
          Saiba mais na{" "}
          <Link href="/privacidade" className="text-ambar-400 underline underline-offset-2 hover:text-ambar-300">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
