import { NextRequest, NextResponse } from "next/server";
import {
  obterAgendaLiturgica,
  salvarItemAgenda,
  deletarItemAgenda,
} from "@/lib/db/comunidade";
import { ItemAgendaSchema } from "@/lib/validators/comunidade";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const temploCodigo = searchParams.get("temploCodigo") || undefined;

    const agenda = await obterAgendaLiturgica(temploCodigo);
    return NextResponse.json({ success: true, agenda });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao consultar agenda" },
      { status: 500 }
    );
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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao salvar rito na agenda" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const temploCodigo = searchParams.get("temploCodigo");

    if (!id || !temploCodigo) {
      return NextResponse.json(
        { success: false, error: "ID e código litúrgico são obrigatórios" },
        { status: 400 }
      );
    }

    const excluido = await deletarItemAgenda(id, temploCodigo);
    if (!excluido) {
      return NextResponse.json(
        { success: false, error: "Permissão negada ou evento inexistente" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, message: "Rito removido da agenda" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao remover rito" },
      { status: 500 }
    );
  }
}
