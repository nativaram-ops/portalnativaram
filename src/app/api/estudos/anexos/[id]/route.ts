import { NextRequest, NextResponse } from "next/server";
import { resolverTitularDaRequisicao } from "@/lib/auth/session";
import { obterAnexoPorId, removerAnexoObservatorio } from "@/lib/db/observatorio";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const titular = resolverTitularDaRequisicao(request);
    if (!titular) {
      return NextResponse.json(
        { sucesso: false, erro: "Autenticação necessária para remover anexos." },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const anexo = await obterAnexoPorId(id);
    if (!anexo) {
      return NextResponse.json(
        { sucesso: false, erro: "Anexo não encontrado no Observatório." },
        { status: 404 }
      );
    }

    const mesmoAutor =
      anexo.adicionadoPorCodigo.toUpperCase() === titular.codigo.toUpperCase();
    if (!titular.isAdmin && !mesmoAutor) {
      return NextResponse.json(
        { sucesso: false, erro: "Apenas o templo autor ou o Conselho Gestor podem remover este anexo." },
        { status: 403 }
      );
    }

    await removerAnexoObservatorio(anexo.id);
    return NextResponse.json({ sucesso: true, id: anexo.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao remover anexo.";
    return NextResponse.json({ sucesso: false, erro: message }, { status: 500 });
  }
}
