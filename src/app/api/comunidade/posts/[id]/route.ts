import { NextRequest, NextResponse } from "next/server";
import { obterPublicacaoPorSlug, deletarPublicacao } from "@/lib/db/comunidade";
import { resolverTitularDaRequisicao } from "@/lib/auth/session";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await obterPublicacaoPorSlug(id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Publicação não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao consultar publicação";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // O templo dono vem da sessão; o código na URL não autoriza nada.
    const titular = resolverTitularDaRequisicao(request);
    if (!titular) {
      return NextResponse.json(
        { success: false, error: "Entre no Portal do Dirigente para excluir." },
        { status: 401 }
      );
    }

    const excluido = await deletarPublicacao(id, titular.codigo, titular.isAdmin);

    if (!excluido) {
      return NextResponse.json(
        {
          success: false,
          error: "Não foi possível excluir. Permissão negada ou publicação inexistente.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Publicação removida com sucesso",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao excluir publicação";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
