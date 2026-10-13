import { NextRequest, NextResponse } from "next/server";
import {
  obterTodasSolicitacoes,
  registrarSolicitacao,
  SolicitacaoAcesso,
} from "@/lib/db/homologacoes";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const tipo = searchParams.get("tipo");
    const busca = searchParams.get("busca");

    let solicitacoes = await obterTodasSolicitacoes();

    if (status && status !== "TODOS") {
      solicitacoes = solicitacoes.filter((s) => s.status === status);
    }

    if (tipo && tipo !== "TODOS") {
      solicitacoes = solicitacoes.filter((s) => s.tipo === tipo);
    }

    if (busca) {
      const termo = busca.toLowerCase();
      solicitacoes = solicitacoes.filter(
        (s) =>
          s.id.toLowerCase().includes(termo) ||
          s.nomeEntidade.toLowerCase().includes(termo) ||
          s.nomeResponsavel.toLowerCase().includes(termo) ||
          s.cidade.toLowerCase().includes(termo) ||
          (s.loginGerado && s.loginGerado.toLowerCase().includes(termo))
      );
    }

    const pendentes = solicitacoes.filter((s) => s.status === "PENDENTE_LIBERACAO").length;
    const homologados = solicitacoes.filter((s) => s.status === "HOMOLOGADO").length;

    return NextResponse.json({
      sucesso: true,
      total: solicitacoes.length,
      metricas: {
        total: solicitacoes.length,
        pendentes,
        homologados,
      },
      solicitacoes,
    });
  } catch (error) {
    console.error("Erro ao listar solicitações de homologação:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha ao consultar solicitações." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.nomeEntidade || !body.nomeResponsavel || !body.telefone) {
      return NextResponse.json(
        { sucesso: false, erro: "Dados obrigatórios não informados." },
        { status: 400 }
      );
    }

    const registro = await registrarSolicitacao({
      id: body.id,
      tipo: body.tipo || "INSTITUICAO_FORMAL",
      nomeEntidade: body.nomeEntidade,
      nomeResponsavel: body.nomeResponsavel,
      telefone: body.telefone,
      email: body.email || "",
      cidade: body.cidade || "",
      estado: body.estado || "",
      cnpj: body.cnpj,
      linhagem: body.linhagem || "Tradição Ancestral",
      graduacao: body.graduacao || "5.1 Pituã",
      volumeEstimado: body.volumeEstimado || "5 Litros",
      intencao: body.intencao || "Ritos de oração e reconexão espiritual.",
    });

    return NextResponse.json(
      {
        sucesso: true,
        solicitacao: registro,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar solicitação:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha ao registrar solicitação." },
      { status: 500 }
    );
  }
}
