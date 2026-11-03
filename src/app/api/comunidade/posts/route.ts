import { NextRequest, NextResponse } from "next/server";
import {
  obterPublicacoesComunidade,
  salvarPublicacao,
} from "@/lib/db/comunidade";
import { PublicacaoSchema, verificarConformidadeTexto } from "@/lib/validators/comunidade";
import { resolverTitularDaRequisicao } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let temploCodigo = searchParams.get("temploCodigo") || undefined;
    const categoria = searchParams.get("categoria") || undefined;
    const busca = searchParams.get("busca") || undefined;

    // Rascunhos e arquivados só para o próprio templo (ou o Conselho).
    let todosStatus = false;
    if (searchParams.get("todosStatus") === "true") {
      const titular = resolverTitularDaRequisicao(request, temploCodigo);
      if (titular) {
        todosStatus = true;
        if (!titular.isAdmin) temploCodigo = titular.codigo;
      }
    }

    const posts = await obterPublicacoesComunidade({
      temploCodigo,
      categoria,
      busca,
      apenasPublicados: !todosStatus,
    });

    return NextResponse.json({ success: true, posts });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao consultar publicações";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const titular = resolverTitularDaRequisicao(request, body.temploCodigo);
    if (!titular || !titular.codigo) {
      return NextResponse.json(
        { success: false, error: "Entre no Portal do Dirigente para publicar." },
        { status: 401 }
      );
    }

    // Edição de post existente: só o templo dono (ou o Conselho).
    if (body.id && !titular.isAdmin) {
      const existentes = await obterPublicacoesComunidade({ apenasPublicados: false });
      const atual = existentes.find((p) => p.id === body.id);
      if (atual && atual.temploCodigo.toUpperCase() !== titular.codigo) {
        return NextResponse.json(
          { success: false, error: "Esta publicação pertence a outro templo." },
          { status: 403 }
        );
      }
    }

    // Validação Zod dos campos
    const validado = PublicacaoSchema.safeParse(body);
    if (!validado.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados de publicação inválidos",
          detalhes: validado.error.errors,
        },
        { status: 400 }
      );
    }

    const {
      titulo,
      resumo,
      conteudoMarkdown,
      categoria,
      imagemCapa,
      fotosGaleria,
      anexos,
      embeds,
      status,
      destaque,
    } = validado.data;

    // Auditoria de Conformidade CONAD/ANVISA em tempo real
    const textoCompleto = `${titulo} ${resumo} ${conteudoMarkdown}`;
    const alertas = verificarConformidadeTexto(textoCompleto);
    const statusEfetivo =
      alertas.length > 0 && status === "PUBLICADO" ? "RASCUNHO" : status;

    // Mapeamento do label da categoria
    const labelsMap: Record<string, string> = {
      REFLEXAO_DOUTRINARIA: "Reflexão Doutrinária",
      RELATO_VIVENCIA: "Relato de Vivência",
      BOTANICA_TRADICIONAL: "Botânica Tradicional",
      ARTE_E_POESIA: "Arte & Poesia Sacra",
      COMUNICADO_LITURGICO: "Comunicado Litúrgico",
      ESTUDO_ETNOFARMACEUTICO: "Estudo Fitoquímico",
    };

    const temploCodigo = titular.codigo;
    const temploNome = body.temploNome || "Templo Credenciado";
    const temploSlug =
      body.temploSlug ||
      temploNome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const slug =
      body.slug ||
      titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const postSalvo = await salvarPublicacao({
      id: body.id,
      temploCodigo,
      temploNome,
      temploSlug,
      slug,
      titulo,
      resumo,
      conteudoMarkdown,
      categoria,
      categoriaLabel: labelsMap[categoria] || "Publicação Litúrgica",
      imagemCapa,
      fotosGaleria,
      anexos,
      embeds,
      status: statusEfetivo,
      destaque,
    });

    return NextResponse.json({
      success: true,
      post: postSalvo,
      alertasCompliance: alertas,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao salvar publicação";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
