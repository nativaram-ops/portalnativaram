import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { ReconhecimentoSchema } from "@/lib/validators/reconhecimento";
import {
  generateProtocoloReconhecimento,
  formatReconhecimentoWhatsApp,
  ReconhecimentoDossier,
} from "@/lib/reconhecimento/engine";
import { getGraduacaoPorId } from "@/data/graduacoes";
import { registrarSolicitacao } from "@/lib/db/homologacoes";

const DATA_DIR = path.join(process.cwd(), "data");
const RECONHECIMENTOS_FILE = path.join(DATA_DIR, "reconhecimentos.json");

// Número oficial de atendimento fraterno da Cooperativa Nativaram
const WHATSAPP_COOPERATIVA = "556899779104";

async function garantirArquivoReconhecimentos() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(RECONHECIMENTOS_FILE);
    } catch {
      await fs.writeFile(RECONHECIMENTOS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.warn("Aviso ao inicializar arquivo de reconhecimentos:", err);
  }
}

export async function GET() {
  try {
    await garantirArquivoReconhecimentos();
    const raw = await fs.readFile(RECONHECIMENTOS_FILE, "utf-8");
    const registros = JSON.parse(raw);
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

    // Persistência local atômica
    await garantirArquivoReconhecimentos();
    try {
      const raw = await fs.readFile(RECONHECIMENTOS_FILE, "utf-8");
      const lista = JSON.parse(raw);
      lista.unshift({
        id: protocolo,
        ...dossier,
        criadoEm: new Date().toISOString(),
        status: "RECEBIDO_EM_ANALISE",
      });
      await fs.writeFile(RECONHECIMENTOS_FILE, JSON.stringify(lista, null, 2), "utf-8");
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
