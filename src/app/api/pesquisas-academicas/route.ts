import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/auth/session";
import { BuscarPesquisasQuerySchema } from "@/lib/validators/observatorio";
import {
  buscarPesquisasAcademicas,
  formatarCadernoNotebookLM,
} from "@/lib/observatorio/academic-search";

export async function GET(request: NextRequest) {
  try {
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "local";

    if (!checkRateLimit(`obs-search:${clientIp}`, 30, 60_000)) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Limite de buscas por minuto atingido. Aguarde alguns segundos.",
        },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const parsed = BuscarPesquisasQuerySchema.safeParse({
      q: searchParams.get("q") || "",
      doi: searchParams.get("doi") || undefined,
      eixo: searchParams.get("eixo") || undefined,
      somenteAcessoAberto: searchParams.get("somenteAcessoAberto") === "true",
      formato: searchParams.get("formato") === "markdown" ? "markdown" : "json",
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Parâmetros de busca inválidos.",
          detalhes: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const resultado = await buscarPesquisasAcademicas(parsed.data);

    if (parsed.data.formato === "markdown") {
      const md = formatarCadernoNotebookLM(resultado.artigos);
      return new NextResponse(md, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Content-Disposition": 'inline; filename="observatorio-nativaram-referencias.md"',
        },
      });
    }

    return NextResponse.json({
      sucesso: true,
      ...resultado,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao buscar literatura acadêmica.";
    return NextResponse.json({ sucesso: false, erro: message }, { status: 500 });
  }
}
