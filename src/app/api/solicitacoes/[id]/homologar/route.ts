import { NextResponse } from "next/server";

/**
 * ADR-016: o cadastro litúrgico foi encerrado e não há mais geração de acesso
 * para templos. A rota responde 410 (Gone).
 */
export async function POST() {
  return NextResponse.json(
    {
      sucesso: false,
      erro: "A homologação de acessos foi encerrada. Veja /entidades-religiosas.",
    },
    { status: 410 }
  );
}
