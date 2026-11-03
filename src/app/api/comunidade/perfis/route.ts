import { NextRequest, NextResponse } from "next/server";
import {
  obterPerfisTemplos,
  obterPerfilPorSlugOuCodigo,
  salvarPerfilTemplo,
  deletarPerfilTemplo,
} from "@/lib/db/comunidade";
import { verifyAdminRequest, resolverTitularDaRequisicao } from "@/lib/auth/session";
import { PerfilTemploSchema } from "@/lib/validators/comunidade";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const codigo = searchParams.get("codigo");

    if (slug || codigo) {
      const perfil = await obterPerfilPorSlugOuCodigo(slug || codigo || "");
      if (!perfil) {
        return NextResponse.json(
          { success: false, error: "Perfil não encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, perfil });
    }

    const perfis = await obterPerfisTemplos();
    return NextResponse.json({ success: true, perfis });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao consultar perfis" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // O perfil editado é sempre o do templo da sessão (o Conselho pode indicar outro).
    const titular = resolverTitularDaRequisicao(request, body.codigoLiturgico);
    if (!titular || !titular.codigo) {
      return NextResponse.json(
        { success: false, error: "Entre no Portal do Dirigente para editar o perfil." },
        { status: 401 }
      );
    }

    const validado = PerfilTemploSchema.safeParse(body);
    if (!validado.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados do perfil inválidos",
          detalhes: validado.error.errors,
        },
        { status: 400 }
      );
    }

    const codigoLiturgico = titular.codigo;
    const slug =
      body.slug ||
      validado.data.nomeInstituicao
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const perfilSalvo = await salvarPerfilTemplo({
      codigoLiturgico,
      slug,
      ...validado.data,
      agenda: body.agenda || [],
      criadoEm: body.criadoEm || new Date().toLocaleDateString("pt-BR"),
      atualizadoEm: new Date().toLocaleDateString("pt-BR"),
    });

    return NextResponse.json({ success: true, perfil: perfilSalvo });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao atualizar perfil" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const codigo = searchParams.get("codigo");
    const identificador = slug || codigo;

    if (!identificador) {
      return NextResponse.json(
        { success: false, error: "Identificador (slug ou código) obrigatório" },
        { status: 400 }
      );
    }

    const isAdmin = verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Acesso restrito para exclusão de perfis" },
        { status: 401 }
      );
    }

    const sucesso = await deletarPerfilTemplo(identificador);
    if (!sucesso) {
      return NextResponse.json(
        { success: false, error: "Perfil não encontrado para exclusão" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, mensagem: "Perfil excluído com sucesso" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao excluir perfil" },
      { status: 500 }
    );
  }
}
