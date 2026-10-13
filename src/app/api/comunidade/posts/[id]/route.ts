import { NextRequest, NextResponse } from "next/server";
import { obterPublicacaoPorSlug, deletarPublicacao } from "@/lib/db/comunidade";

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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao consultar publicação" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const temploCodigo = searchParams.get("temploCodigo") || "";

    if (!temploCodigo) {
      return NextResponse.json(
        { success: false, error: "Código litúrgico de autorização ausente" },
        { status: 401 }
      );
    }

    const excluido = await deletarPublicacao(id, temploCodigo);

    if (!excluido) {
      return NextResponse.json(
        {
          success: false,
          error: "Não foi possível excluir. Permissão negada ou publicação inexistente.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, message: "Publicação removida com sucesso" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao excluir publicação" },
      { status: 500 }
    );
  }
}
