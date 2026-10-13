import { NextRequest, NextResponse } from "next/server";
import {
  obterPublicacoesComunidade,
  salvarPublicacao,
} from "@/lib/db/comunidade";
import { PublicacaoSchema, verificarConformidadeTexto } from "@/lib/validators/comunidade";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const temploCodigo = searchParams.get("temploCodigo") || undefined;
    const categoria = searchParams.get("categoria") || undefined;
    const busca = searchParams.get("busca") || undefined;
    const todosStatus = searchParams.get("todosStatus") === "true";

    const posts = await obterPublicacoesComunidade({
      temploCodigo,
      categoria,
      busca,
      apenasPublicados: !todosStatus,
    });

    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao consultar publicações" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

    // Mapeamento do label da categoria
    const labelsMap: Record<string, string> = {
      REFLEXAO_DOUTRINARIA: "Reflexão Doutrinária",
      RELATO_VIVENCIA: "Relato de Vivência",
      BOTANICA_TRADICIONAL: "Botânica Tradicional",
      ARTE_E_POESIA: "Arte & Poesia Sacra",
      COMUNICADO_LITURGICO: "Comunicado Litúrgico",
      ESTUDO_ETNOFARMACEUTICO: "Estudo Fitoquímico",
    };

    const temploCodigo = body.temploCodigo || "NAT-TEMPLO-842";
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
      status,
      destaque,
    });

    return NextResponse.json({
      success: true,
      post: postSalvo,
      alertasCompliance: alertas,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao salvar publicação" },
      { status: 500 }
    );
  }
}
