import { NextRequest, NextResponse } from "next/server";
import {
  obterTodosPedidos,
  criarPedido,
  obterMetricasGerais,
  formatarMensagemWhatsApp,
} from "@/lib/db/pedidos";
import { NovoPedidoSchema } from "@/lib/validators/pedido";
import { StatusPedido } from "@/types/pedido";

const WHATSAPP_CONSELHO_PADRAO = "5568999979104";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const temploId = searchParams.get("temploId") || undefined;
    const status = (searchParams.get("status") as StatusPedido | "TODOS") || undefined;
    const busca = searchParams.get("busca") || undefined;
    const incluirMetricas = searchParams.get("metricas") === "true";

    const pedidos = await obterTodosPedidos({ temploId, status, busca });

    let metricas = null;
    if (incluirMetricas) {
      metricas = await obterMetricasGerais();
    }

    return NextResponse.json({
      sucesso: true,
      total: pedidos.length,
      pedidos,
      metricas,
    });
  } catch (error) {
    console.error("Erro ao listar pedidos litúrgicos:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha interna ao consultar solicitações de partilha." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = NovoPedidoSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Dados inválidos para a solicitação litúrgica.",
          detalhes: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const pedidoCriado = await criarPedido(parseResult.data);
    const whatsappQuery = formatarMensagemWhatsApp(pedidoCriado);
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONSELHO_PADRAO}?text=${whatsappQuery}`;

    return NextResponse.json(
      {
        sucesso: true,
        mensagem: "Solicitação litúrgica registrada com sucesso!",
        pedido: pedidoCriado,
        whatsappUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar pedido litúrgico:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha ao gravar solicitação no banco de dados." },
      { status: 500 }
    );
  }
}
