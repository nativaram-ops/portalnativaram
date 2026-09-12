import { NextRequest, NextResponse } from "next/server";
import {
  obterPedidoPorId,
  atualizarPedido,
  excluirPedido,
  formatarMensagemAtualizacaoWhatsApp,
} from "@/lib/db/pedidos";
import { AtualizarPedidoSchema } from "@/lib/validators/pedido";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pedido = await obterPedidoPorId(id);

    if (!pedido) {
      return NextResponse.json(
        { sucesso: false, erro: `Solicitação ${id} não encontrada.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ sucesso: true, pedido });
  } catch (error) {
    console.error("Erro ao buscar pedido por ID:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha ao consultar solicitação." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("x-nativaram-auth");
    const adminSecret = process.env.ADMIN_SECRET_KEY || "adm-nativaram-2026";
    if (!authHeader || authHeader !== adminSecret) {
      return NextResponse.json(
        { sucesso: false, erro: "Acesso litúrgico não autorizado para atualização." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const parseResult = AtualizarPedidoSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Dados inválidos para atualização.",
          detalhes: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const pedidoAtualizado = await atualizarPedido(id, parseResult.data);
    if (!pedidoAtualizado) {
      return NextResponse.json(
        { sucesso: false, erro: `Solicitação ${id} não encontrada.` },
        { status: 404 }
      );
    }

    // Gera o link de notificação WhatsApp para o dirigente do templo
    let whatsappNotificacaoUrl = "";
    if (parseResult.data.status || parseResult.data.codigoRastreio) {
      const telefoneLimpo = pedidoAtualizado.dirigenteTelefone.replace(/\D/g, "");
      const numeroDestino = telefoneLimpo.startsWith("55") ? telefoneLimpo : `55${telefoneLimpo}`;
      const textoMsg = formatarMensagemAtualizacaoWhatsApp(
        pedidoAtualizado,
        pedidoAtualizado.status,
        pedidoAtualizado.codigoRastreio
      );
      whatsappNotificacaoUrl = `https://wa.me/${numeroDestino}?text=${textoMsg}`;
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: `Solicitação ${id} atualizada com sucesso.`,
      pedido: pedidoAtualizado,
      whatsappNotificacaoUrl,
    });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha ao atualizar solicitação litúrgica." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("x-nativaram-auth");
    const adminSecret = process.env.ADMIN_SECRET_KEY || "adm-nativaram-2026";
    if (!authHeader || authHeader !== adminSecret) {
      return NextResponse.json(
        { sucesso: false, erro: "Acesso litúrgico não autorizado para exclusão." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const removido = await excluirPedido(id);

    if (!removido) {
      return NextResponse.json(
        { sucesso: false, erro: `Solicitação ${id} não encontrada.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: `Solicitação ${id} removida com sucesso.`,
    });
  } catch (error) {
    console.error("Erro ao excluir pedido:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha ao excluir solicitação." },
      { status: 500 }
    );
  }
}
