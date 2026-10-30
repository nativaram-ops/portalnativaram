import { NextRequest, NextResponse } from "next/server";
import {
  obterTodasSolicitacoes,
  registrarSolicitacao,
} from "@/lib/db/homologacoes";
import { verifyAdminRequest } from "@/lib/auth/session";
import { RegistrarSolicitacaoSchema } from "@/lib/validators/solicitacao";

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

    const pendentes = solicitacoes.filter(
      (s) => s.status === "PENDENTE_LIBERACAO"
    ).length;
    const homologados = solicitacoes.filter(
      (s) => s.status === "HOMOLOGADO"
    ).length;

    const isAdmin = verifyAdminRequest(request);
    const solicitacoesSeguras = isAdmin
      ? solicitacoes
      : solicitacoes.map(
          ({
            senhaGerada: _senha,
            telefone: _telefone,
            email: _email,
            cnpj: _cnpj,
            ...dadosPublicos
          }) => dadosPublicos
        );

    return NextResponse.json({
      sucesso: true,
      total: solicitacoesSeguras.length,
      metricas: {
        total: solicitacoesSeguras.length,
        pendentes,
        homologados,
      },
      solicitacoes: solicitacoesSeguras,
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
    const parseResult = RegistrarSolicitacaoSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Dados obrigatórios não informados ou inválidos.",
          detalhes: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const dados = parseResult.data;
    const idProtocolo =
      dados.id ||
      `NAT-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const registro = await registrarSolicitacao({
      id: idProtocolo,
      tipo: dados.tipo,
      nomeEntidade: dados.nomeEntidade,
      nomeResponsavel: dados.nomeResponsavel,
      telefone: dados.telefone,
      email: dados.email,
      cidade: dados.cidade,
      estado: dados.estado,
      cnpj: dados.cnpj,
      linhagem: dados.linhagem,
      graduacao: dados.graduacao,
      volumeEstimado: dados.volumeEstimado,
      intencao: dados.intencao,
      status: "PENDENTE_LIBERACAO",
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
