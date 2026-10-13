import { NextRequest, NextResponse } from "next/server";
import { validarCredenciaisDirigente } from "@/lib/db/homologacoes";

export async function POST(request: NextRequest) {
  try {
    const { login, senha } = await request.json();

    if (!login) {
      return NextResponse.json(
        { sucesso: false, erro: "Código de acesso não informado." },
        { status: 400 }
      );
    }

    const congregao = await validarCredenciaisDirigente(login, senha || "");

    if (!congregao) {
      return NextResponse.json(
        { sucesso: false, erro: "Credenciais litúrgicas não encontradas ou não homologadas." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      sucesso: true,
      congregao: {
        id: congregao.loginGerado || congregao.id,
        nome: congregao.nomeEntidade,
        dirigente: congregao.nomeResponsavel,
        cidade: `${congregao.cidade} / ${congregao.estado}`,
        tipo: congregao.tipo,
        status: congregao.status,
      },
    });
  } catch (error) {
    console.error("Erro ao validar credenciais:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha ao validar credenciais de acesso." },
      { status: 500 }
    );
  }
}
