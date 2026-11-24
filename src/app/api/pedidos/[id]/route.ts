import { NextResponse } from "next/server";

/** ADR-016: o site não recebe nem gerencia pedidos. */
const RESPOSTA = {
  sucesso: false,
  erro: "Este site não recebe pedidos. Veja /transparencia.",
};

export async function GET() {
  return NextResponse.json(RESPOSTA, { status: 410 });
}

export async function PATCH() {
  return NextResponse.json(RESPOSTA, { status: 410 });
}

export async function DELETE() {
  return NextResponse.json(RESPOSTA, { status: 410 });
}
