import { NextRequest, NextResponse } from "next/server";
import {
  obterAgendaLiturgica,
  salvarItemAgenda,
  deletarItemAgenda,
} from "@/lib/db/comunidade";
import { ItemAgendaSchema } from "@/lib/validators/comunidade";
import { verifyAdminRequest } from "@/lib/auth/session";

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

    const temploCodigo = body.temploCodigo || "NAT-TEMPLO-842";

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
    const temploCodigo = searchParams.get("temploCodigo") || "";
    const isAdmin = verifyAdminRequest(request);

    if (!id || (!temploCodigo && !isAdmin)) {
      return NextResponse.json(
        { success: false, error: "ID e código litúrgico são obrigatórios" },
        { status: 400 }
      );
    }

    const excluido = await deletarItemAgenda(id, temploCodigo, isAdmin);
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
