import { NextRequest, NextResponse } from "next/server";
import { homologarSolicitacao } from "@/lib/db/homologacoes";
import { verifyAdminRequest } from "@/lib/auth/session";
import {
  HomologarComplementoSchema,
  HomologarComplementoInput,
} from "@/lib/validators/solicitacao";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyAdminRequest(request)) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Acesso restrito ao Conselho Gestor para homologação de congregações.",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { sucesso: false, erro: "ID da solicitação não informado." },
        { status: 400 }
      );
    }

    let dadosComplementares: HomologarComplementoInput | undefined = undefined;
    try {
      const body = await request.json();
      if (body && typeof body === "object") {
        const parsed = HomologarComplementoSchema.safeParse(body);
        if (!parsed.success) {
          return NextResponse.json(
            {
              sucesso: false,
              erro: "Dados complementares inválidos para homologação.",
              detalhes: parsed.error.flatten().fieldErrors,
            },
            { status: 400 }
          );
        }
        dadosComplementares = parsed.data;
      }
    } catch {
      // Request sem body JSON (chamada simples)
    }

    const resultado = await homologarSolicitacao(id, dadosComplementares);

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
      {
        sucesso: false,
        erro: "Falha interna ao homologar e gerar credenciais.",
      },
      { status: 500 }
    );
  }
}
