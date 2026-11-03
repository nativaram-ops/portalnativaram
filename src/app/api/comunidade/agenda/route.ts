import { NextRequest, NextResponse } from "next/server";
import {
  obterAgendaLiturgica,
  salvarItemAgenda,
  deletarItemAgenda,
} from "@/lib/db/comunidade";
import { ItemAgendaSchema } from "@/lib/validators/comunidade";
import { resolverTitularDaRequisicao } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const temploCodigo = searchParams.get("temploCodigo") || undefined;

    const agenda = await obterAgendaLiturgica(temploCodigo);
    return NextResponse.json({ success: true, agenda });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao consultar agenda";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const titular = resolverTitularDaRequisicao(request, body.temploCodigo);
    if (!titular || !titular.codigo) {
      return NextResponse.json(
        { success: false, error: "Entre no Portal do Dirigente para editar a agenda." },
        { status: 401 }
      );
    }

    if (body.id && !titular.isAdmin) {
      const atual = (await obterAgendaLiturgica()).find((i) => i.id === body.id);
      if (atual && atual.temploCodigo.toUpperCase() !== titular.codigo) {
        return NextResponse.json(
          { success: false, error: "Este rito pertence a outro templo." },
          { status: 403 }
        );
      }
    }

    const validado = ItemAgendaSchema.safeParse(body);
    if (!validado.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados de rito inválidos",
          detalhes: validado.error.errors,
        },
        { status: 400 }
      );
    }

    const temploCodigo = titular.codigo;

    const itemSalvo = await salvarItemAgenda({
      id: body.id,
      temploCodigo,
      ...validado.data,
    });

    return NextResponse.json({ success: true, item: itemSalvo });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao salvar rito na agenda";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const titular = resolverTitularDaRequisicao(request);

    if (!titular) {
      return NextResponse.json(
        { success: false, error: "Entre no Portal do Dirigente para editar a agenda." },
        { status: 401 }
      );
    }
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID do rito é obrigatório" },
        { status: 400 }
      );
    }

    const excluido = await deletarItemAgenda(id, titular.codigo, titular.isAdmin);
    if (!excluido) {
      return NextResponse.json(
        { success: false, error: "Permissão negada ou evento inexistente" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Rito removido da agenda",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Erro ao remover rito";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
