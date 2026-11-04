import { NextRequest, NextResponse } from "next/server";
import {
  obterTodosPedidos,
  criarPedido,
  obterMetricasGerais,
  formatarMensagemWhatsApp,
} from "@/lib/db/pedidos";
import { NovoPedidoSchema } from "@/lib/validators/pedido";
import { StatusPedido } from "@/types/pedido";
import { resolverTitularDaRequisicao } from "@/lib/auth/session";
import { rateioUnitarioOficial } from "@/lib/rateio";

const WHATSAPP_COOPERATIVA = "556899779104";

const STATUS_VALIDOS: readonly string[] = [
  "SOLICITADO",
  "HOMOLOGADO_CONSELHO",
  "EM_FEITIO_ACRE",
  "AGUARDANDO_DESPACHO",
  "EM_TRANSITO_REFRIGERADO",
  "ENTREGUE_CONSAGRADO",
  "CANCELADO_AJUSTE",
  "TODOS",
] as const;

function parseStatus(raw: string | null): StatusPedido | "TODOS" | undefined {
  if (!raw) return undefined;
  return STATUS_VALIDOS.includes(raw) ? (raw as StatusPedido | "TODOS") : undefined;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pedidos têm telefone, e-mail e CNPJ: só o Conselho vê todos; o dirigente vê
    // apenas os do templo da sessão, seja qual for o temploId pedido na URL.
    const titular = resolverTitularDaRequisicao(request);
    if (!titular) {
      return NextResponse.json(
        { sucesso: false, erro: "Entre no Portal do Dirigente para consultar pedidos." },
        { status: 401 }
      );
    }

    const temploId = titular.isAdmin
      ? searchParams.get("temploId") || undefined
      : titular.codigo;
    const status = parseStatus(searchParams.get("status"));
    const busca = searchParams.get("busca") || undefined;
    const incluirMetricas = titular.isAdmin && searchParams.get("metricas") === "true";

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
    const titular = resolverTitularDaRequisicao(request);
    if (!titular) {
      return NextResponse.json(
        { sucesso: false, erro: "Entre no Portal do Dirigente para solicitar." },
        { status: 401 }
      );
    }

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

    // Valores sempre pela tabela oficial; grupo sem CNPJ não recebe valores (o
    // Conselho analisa a solicitação pelo WhatsApp e define se procede).
    let itens;
    try {
      itens = parseResult.data.itens.map((item) => ({
        ...item,
        rateioUnitarioEstimado: titular.grupoInformal ? 0 : rateioUnitarioOficial(item),
      }));
    } catch {
      return NextResponse.json(
        { sucesso: false, erro: "A solicitação contém item fora do catálogo da cooperativa." },
        { status: 400 }
      );
    }

    // O templo do pedido é o da sessão (o Conselho pode registrar para qualquer um).
    const dadosPedido = {
      ...parseResult.data,
      itens,
      temploId: titular.isAdmin ? parseResult.data.temploId : titular.codigo,
    };
    const pedidoCriado = await criarPedido(dadosPedido);
    const whatsappQuery = formatarMensagemWhatsApp(pedidoCriado);
    const whatsappUrl = `https://wa.me/${WHATSAPP_COOPERATIVA}?text=${whatsappQuery}`;

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
