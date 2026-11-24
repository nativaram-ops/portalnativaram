import React from "react";
import { creditoDaImagem } from "@/data/creditos-imagens";

/** Legenda visível de crédito para foto de terceiros (CC BY-SA 4.0). */
export function CreditoFoto({ arquivo, className = "" }: { arquivo: string; className?: string }) {
  const credito = creditoDaImagem(arquivo);
  if (!credito) return null;
  return (
    <span className={`text-[10px] text-areia-300/90 ${className}`}>
      Foto: {credito.autor},{" "}
      <a
        href={credito.licencaUrl}
        target="_blank"
        rel="noopener noreferrer license"
        className="underline underline-offset-2 hover:text-ambar-300"
      >
        {credito.licenca}
      </a>{" "}
      (modificada)
    </span>
  );
}
