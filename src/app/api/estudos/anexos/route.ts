import { NextRequest, NextResponse } from "next/server";
import { resolverTitularDaRequisicao } from "@/lib/auth/session";
import {
  anexarEstudoObservatorio,
  listarAnexosObservatorio,
} from "@/lib/db/observatorio";
import { obterPerfisTemplos } from "@/lib/db/comunidade";
import {
  NovoAnexoObservatorioSchema,
  validarConformidadeAnexo,
} from "@/lib/validators/observatorio";
import { EixoTematicoObservatorio } from "@/types/observatorio";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eixoRaw = searchParams.get("eixo");
    const busca = searchParams.get("busca") || undefined;
    const eixo =
      eixoRaw &&
      ["ayahuasca", "etnobotanica_jurua", "seguranca_imao", "direito_conad", "agrofloresta"].includes(
        eixoRaw
      )
        ? (eixoRaw as EixoTematicoObservatorio)
        : undefined;

    const anexos = await listarAnexosObservatorio({ eixo, busca });
    return NextResponse.json({ sucesso: true, total: anexos.length, anexos });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao consultar anexos acadêmicos.";
    return NextResponse.json({ sucesso: false, erro: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const titular = resolverTitularDaRequisicao(request);
    if (!titular) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Entre no Portal do Dirigente para anexar pesquisas ao acervo do observatório.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = NovoAnexoObservatorioSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Dados do artigo acadêmico inválidos.",
          detalhes: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const alertas = validarConformidadeAnexo(
      parsed.data.sinteseLinguagemClara,
      parsed.data.notaDirigente
    );
    if (alertas.length > 0) {
      return NextResponse.json(
        {
          sucesso: false,
          erro:
            "A síntese ou nota institucional contém termos vetados pelo Dicionário Semântico da cooperativa.",
          alertasCompliance: alertas,
        },
        { status: 422 }
      );
    }

    const codigoAutor = titular.isAdmin ? "ADM-NATIVARAM" : titular.codigo;
    let nomeAutor = titular.isAdmin
      ? "Conselho Gestor — Cooperativa Nativaram"
      : `Templo ${titular.codigo}`;

    if (!titular.isAdmin) {
      const perfis = await obterPerfisTemplos().catch(() => []);
      const perfil = perfis.find((p) => p.codigoLiturgico.toUpperCase() === titular.codigo);
      if (perfil?.nomeInstituicao) {
        nomeAutor = perfil.nomeInstituicao;
      }
    }

    const { criado, duplicado } = await anexarEstudoObservatorio({
      doi: parsed.data.doi,
      titulo: parsed.data.titulo,
      autores: parsed.data.autores,
      ano: parsed.data.ano,
      periodico: parsed.data.periodico,
      urlOrigem: parsed.data.urlOrigem,
      pdfAbertoUrl: parsed.data.pdfAbertoUrl || undefined,
      eixoTematico: parsed.data.eixoTematico,
      sinteseLinguagemClara: parsed.data.sinteseLinguagemClara,
      notaDirigente: parsed.data.notaDirigente || undefined,
      adicionadoPorCodigo: codigoAutor,
      adicionadoPorNome: nomeAutor,
    });

    if (duplicado) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Este DOI já está anexado ao Observatório Etnobotânico.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        sucesso: true,
        mensagem: "Pesquisa acadêmica verificada e anexada ao Observatório!",
        anexo: criado,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao anexar pesquisa.";
    return NextResponse.json({ sucesso: false, erro: message }, { status: 500 });
  }
}
