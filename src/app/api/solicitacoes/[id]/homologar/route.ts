import { NextRequest, NextResponse } from "next/server";
import { homologarSolicitacao } from "@/lib/db/homologacoes";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { sucesso: false, erro: "ID da solicitação não informado." },
        { status: 400 }
      );
    }

    const resultado = await homologarSolicitacao(id);

    if (!resultado) {
      return NextResponse.json(
        { sucesso: false, erro: "Solicitação não encontrada para homologação." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      sucesso: true,
      ...resultado,
    });
  } catch (error) {
    console.error("Erro ao homologar solicitação:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha interna ao homologar e gerar credenciais." },
      { status: 500 }
    );
  }
}
