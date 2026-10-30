import { NextRequest, NextResponse } from "next/server";
import { ReconhecimentoSchema } from "@/lib/validators/reconhecimento";
import {
  generateProtocoloReconhecimento,
  formatReconhecimentoWhatsApp,
  ReconhecimentoDossier,
} from "@/lib/reconhecimento/engine";
import { getGraduacaoPorId } from "@/data/graduacoes";
import { registrarSolicitacao } from "@/lib/db/homologacoes";
import { createHybridJsonStore } from "@/lib/db/core-hybrid-store";
import { verifyAdminRequest } from "@/lib/auth/session";

interface RegistroReconhecimento extends ReconhecimentoDossier {
  id: string;
  criadoEm: string;
  status: string;
}

const reconhecimentosStore = createHybridJsonStore<RegistroReconhecimento>({
  filename: "reconhecimentos.json",
  seedData: [],
  getKey: (item) => item.id.trim().toUpperCase(),
});

// Número oficial de atendimento fraterno da Cooperativa Nativaram
const WHATSAPP_COOPERATIVA = "556899779104";

export async function GET(request: NextRequest) {
  try {
    if (!verifyAdminRequest(request)) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Acesso restrito ao Conselho Gestor para consulta de fichas de reconhecimento.",
        },
        { status: 401 }
      );
    }

    const registros = await reconhecimentosStore.readAll();
    return NextResponse.json({
      sucesso: true,
      total: registros.length,
      registros,
    });
  } catch (error) {
    console.error("Erro ao listar fichas de reconhecimento:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha ao consultar fichas de reconhecimento." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = ReconhecimentoSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          sucesso: false,
          erro: "Dados de reconhecimento inválidos.",
          detalhes: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const protocolo = generateProtocoloReconhecimento();
    const dataSubmissao = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const graduacaoInfo = getGraduacaoPorId(data.graduacaoPretendida);

    const dossier: ReconhecimentoDossier = {
      protocolo,
      dataSubmissao,
      data,
      graduacaoInfo,
    };

    // Persistência unificada na fila de Homologação do ADM
    try {
      await registrarSolicitacao({
        id: protocolo,
        tipo: "GRUPO_INFORMAL",
        nomeEntidade: data.nomeIdentificacao,
        nomeResponsavel: data.nomeResponsavel,
        telefone: data.telefoneContato,
        email: data.emailContato,
        cidade: data.cidade,
        estado: data.estado,
        linhagem: data.linhagemEspiritual,
        graduacao: graduacaoInfo
          ? `${graduacaoInfo.codigo} ${graduacaoInfo.nomeSagrado}`
          : data.graduacaoPretendida,
        volumeEstimado: `${data.litragemEstimadaMensal} Litros`,
        intencao: data.intencaoTrabalho,
        dataEnvio: dataSubmissao,
      });
    } catch (homologErr) {
      console.warn("Aviso ao registrar na fila de homologação:", homologErr);
    }

    // Persistência híbrida atômica (data/ + os.tmpdir() para resiliência EROFS)
    try {
      const lista = await reconhecimentosStore.readAll();
      lista.unshift({
        id: protocolo,
        ...dossier,
        criadoEm: new Date().toISOString(),
        status: "RECEBIDO_EM_ANALISE",
      });
      await reconhecimentosStore.writeAll(lista);
    } catch (fsErr) {
      console.warn("Aviso na persistência em disco de reconhecimento:", fsErr);
    }

    const whatsappMensagem = formatReconhecimentoWhatsApp(dossier);
    const whatsappUrl = `https://wa.me/${WHATSAPP_COOPERATIVA}?text=${whatsappMensagem}`;

    return NextResponse.json(
      {
        sucesso: true,
        protocolo,
        dataSubmissao,
        whatsappUrl,
        dossier,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao submeter ficha de reconhecimento:", error);
    return NextResponse.json(
      { sucesso: false, erro: "Falha interna ao processar acolhimento litúrgico." },
      { status: 500 }
    );
  }
}
