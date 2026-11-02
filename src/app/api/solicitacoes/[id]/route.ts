import { NextRequest, NextResponse } from "next/server";
import {
  obterTodasSolicitacoes,
  excluirSolicitacao,
} from "@/lib/db/homologacoes";
import { verifyAdminRequest } from "@/lib/auth/session";

export async function GET(
  request: NextRequest,
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

    const solicitacoes = await obterTodasSolicitacoes();
    const idUpper = id.trim().toUpperCase();
    const solicitacao = solicitacoes.find(
      (s) =>
        s.id.toUpperCase() === idUpper ||
        (s.loginGerado && s.loginGerado.toUpperCase() === idUpper)
    );

    if (!solicitacao) {
      return NextResponse.json(
        { sucesso: false, erro: "Solicitação não encontrada." },
        { status: 404 }
      );
    }

    const isAdmin = verifyAdminRequest(request);
    const dados = isAdmin
      ? solicitacao
      : {
          id: solicitacao.id,
          tipo: solicitacao.tipo,
          nomeEntidade: solicitacao.nomeEntidade,
          cidade: solicitacao.cidade,
          estado: solicitacao.estado,
          status: solicitacao.status,
          dataEnvio: solicitacao.dataEnvio,
        };

    return NextResponse.json({ sucesso: true, solicitacao: dados });
  } catch (error: any) {
    console.error("Erro ao consultar solicitação:", error);
    return NextResponse.json(
      { sucesso: false, erro: error.message || "Erro interno." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyAdminRequest(request)) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Acesso restrito ao Conselho Gestor para exclusão de cadastros.",
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

    const sucesso = await excluirSolicitacao(id);

    return NextResponse.json({
      sucesso,
      mensagem: "Cadastro e perfil da instituição removidos com sucesso.",
    });
  } catch (error: any) {
    console.error("Erro ao excluir solicitação:", error);
    return NextResponse.json(
      { sucesso: false, erro: error.message || "Falha ao excluir solicitação." },
      { status: 500 }
    );
  }
}

