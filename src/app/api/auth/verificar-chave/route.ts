import { NextRequest, NextResponse } from "next/server";
import { validarCredenciaisDirigente } from "@/lib/db/homologacoes";
import { checkRateLimit, setSessionCookie } from "@/lib/auth/session";
import { VerificarChaveSchema } from "@/lib/validators/solicitacao";

const ADMIN_LOGINS = [
  "adm-nativaram",
  "adm@nativaram.com.br",
  "admin@nativaram.com.br",
  "contato@nativaram.com.br",
  "conselho@nativaram.com.br",
];

export async function POST(request: NextRequest) {
  try {
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "local";

    if (!checkRateLimit(`auth:${clientIp}`, 15, 60_000)) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Limite de tentativas excedido. Aguarde um minuto e tente novamente.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parseResult = VerificarChaveSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Código de acesso ou chave de segurança não informados corretamente.",
          detalhes: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { login, senha } = parseResult.data;
    const loginLower = login.toLowerCase();
    const adminPassword = process.env.ADMIN_MASTER_PASSWORD || "adm2026";

    if (ADMIN_LOGINS.includes(loginLower) && senha === adminPassword) {
      const response = NextResponse.json({
        sucesso: true,
        role: "ADMIN",
        congregao: {
          id: "ADM-NATIVARAM",
          loginGerado: "ADM-NATIVARAM",
          nome: "Conselho Gestor — Cooperativa Nativaram",
          dirigente: "Conselho Gestor Litúrgico",
          cidade: "Cruzeiro do Sul / AC",
          tipo: "INSTITUICAO_FORMAL",
          status: "HOMOLOGADO",
        },
      });
      setSessionCookie(response, { role: "ADMIN", codigo: "ADM-NATIVARAM" });
      return response;
    }

    const congregao = await validarCredenciaisDirigente(login, senha);

    if (!congregao) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Credenciais litúrgicas não encontradas ou não homologadas.",
        },
        { status: 401 }
      );
    }

    const codigo = congregao.loginGerado || congregao.id;
    const response = NextResponse.json({
      sucesso: true,
      role: "DIRIGENTE",
      congregao: {
        id: codigo,
        loginGerado: codigo,
        nome: congregao.nomeEntidade,
        dirigente: congregao.nomeResponsavel,
        cidade: `${congregao.cidade} / ${congregao.estado}`,
        tipo: congregao.tipo,
        status: congregao.status,
      },
    });

    setSessionCookie(response, { role: "DIRIGENTE", codigo });
    return response;
  } catch (error) {
    console.error("Erro ao validar credenciais:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha ao validar credenciais de acesso." },
      { status: 500 }
    );
  }
}
