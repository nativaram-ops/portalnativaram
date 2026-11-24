import { NextResponse } from "next/server";

/**
 * ADR-016: o site não recebe pedidos. A partilha acontece só entre entidades
 * religiosas constituídas, fora do site, por termo e custeio comprovado.
 */
const RESPOSTA = {
  sucesso: false,
  erro: "Este site não recebe pedidos. Veja /transparencia e /entidades-religiosas.",
};

export async function GET() {
  return NextResponse.json(RESPOSTA, { status: 410 });
}

export async function POST() {
  return NextResponse.json(RESPOSTA, { status: 410 });
}
