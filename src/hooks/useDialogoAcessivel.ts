"use client";

import { useEffect, useRef } from "react";

const SELETOR_FOCAVEIS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "object",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

interface OpcoesDialogoAcessivel {
  /** O diálogo está visível na tela. */
  aberto: boolean;
  /** Fecha o diálogo (chamado pelo Escape quando `fecharComEscape` for verdadeiro). */
  aoFechar?: () => void;
  /** Padrão: true. Use false em confirmações que não podem ser interrompidas. */
  fecharComEscape?: boolean;
}

/**
 * Comportamento de diálogo modal acessível (WCAG 2.1 AA), sem dependência externa:
 * foco inicial no elemento de `focoInicialRef` (ou no primeiro focável), Tab preso
 * dentro de `containerRef`, Escape fecha e, ao fechar, o foco volta ao elemento
 * que abriu o diálogo.
 */
export function useDialogoAcessivel<
  C extends HTMLElement = HTMLDivElement,
  F extends HTMLElement = HTMLButtonElement,
>({ aberto, aoFechar, fecharComEscape = true }: OpcoesDialogoAcessivel) {
  const containerRef = useRef<C>(null);
  const focoInicialRef = useRef<F>(null);

  // Mantém as opções mais recentes sem reinstalar os ouvintes a cada render.
  const opcoesRef = useRef({ aoFechar, fecharComEscape });
  useEffect(() => {
    opcoesRef.current = { aoFechar, fecharComEscape };
  });

  useEffect(() => {
    if (!aberto) return;

    const anterior =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focaveis = () =>
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(SELETOR_FOCAVEIS) ?? []
      ).filter((el) => el.getClientRects().length > 0);

    const alvoInicial = focoInicialRef.current ?? focaveis()[0] ?? containerRef.current;
    alvoInicial?.focus();

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const { aoFechar: fechar, fecharComEscape: podeFechar } = opcoesRef.current;
        if (podeFechar && fechar) {
          e.preventDefault();
          fechar();
        }
        return;
      }
      if (e.key !== "Tab" || !containerRef.current) return;

      const lista = focaveis();
      if (lista.length === 0) {
        e.preventDefault();
        containerRef.current.focus();
        return;
      }
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      const ativo = document.activeElement;
      const foraDoDialogo = !containerRef.current.contains(ativo);

      if (e.shiftKey && (ativo === primeiro || foraDoDialogo)) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && (ativo === ultimo || foraDoDialogo)) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      if (anterior && document.contains(anterior)) anterior.focus();
    };
  }, [aberto]);

  return { containerRef, focoInicialRef };
}
