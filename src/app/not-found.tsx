import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg space-y-8">
        {/* Número 404 estilizado */}
        <div className="relative">
          <span className="text-[8rem] sm:text-[10rem] font-serif font-bold text-floresta-800/50 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-ambar-500/40 bg-floresta-900/80 text-ambar-400">
              <Compass className="h-8 w-8" />
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="space-y-3">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
            Trilha não encontrada
          </h1>
          <p className="text-sm text-areia-400 leading-relaxed max-w-md mx-auto">
            A página que você procura pode ter sido movida ou não existe mais.
            Volte à trilha principal para continuar sua jornada pelo portal
            da Cooperativa Etnobotânica Nativaram Brasil.
          </p>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" />
            <span>Página Inicial</span>
          </Link>
          <Link href="/contato" className="btn-secondary">
            <ArrowLeft className="h-4 w-4 text-ambar-400" />
            <span>Fale com os Guardiões</span>
          </Link>
        </div>

        {/* Ornamento */}
        <div className="divider-solar mx-auto max-w-xs" />
        <p className="text-[10px] text-areia-400/60 italic">
          &ldquo;Na floresta, não há caminhos errados — apenas rotas ainda não reveladas.&rdquo;
        </p>
      </div>
    </div>
  );
}
