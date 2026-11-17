import { AnexoEstudoPublicado, EixoTematicoObservatorio } from "@/types/observatorio";
import {
  createHybridJsonStore,
  getDirectSupabaseClient,
  gravarNoSupabase,
  withTimeout,
} from "./core-hybrid-store";

export const ANEXOS_SEMENTE_VERIFICADOS: AnexoEstudoPublicado[] = [
  {
    id: "ANX-2026-PH334",
    doi: "10.3390/ph13110334",
    titulo:
      "Toxicokinetics and Toxicodynamics of Ayahuasca Alkaloids N,N-Dimethyltryptamine (DMT), Harmine, Harmaline and Tetrahydroharmine: Clinical and Forensic Impact",
    autores: "Brito-da-Costa AM, Dias-da-Silva D, Gomes NGM, Dinis-Oliveira RJ, Madureira-Carvalho Á.",
    ano: "2020",
    periodico: "Pharmaceuticals (Basel, Switzerland)",
    urlOrigem: "https://europepmc.org/articles/PMC7690791",
    pdfAbertoUrl: "https://www.mdpi.com/1424-8247/13/11/334/pdf",
    eixoTematico: "seguranca_imao",
    sinteseLinguagemClara:
      "Revisão em acesso aberto que detalha como os alcaloides do cipó e da folha atuam no organismo, destacando o bloqueio reversível da enzima MAO-A e reforçando a necessidade de triagem rigorosa contra interações serotoninérgicas.",
    notaDirigente:
      "Fonte externa revisada por pares utilizada como referência de estudo para protocolos de acolhimento e segurança integrativa.",
    statusRevisao: "REVISAO_EXTERNA_PARES",
    adicionadoPorCodigo: "ADM-NATIVARAM",
    adicionadoPorNome: "Conselho Gestor — Cooperativa Nativaram",
    criadoEm: "2026-11-17T00:00:00.000Z",
  },
  {
    id: "ANX-2026-HERITAGE",
    doi: "10.4324/9780429001161-9",
    titulo: "A Genealogy of the Ayahuasca Cultural Heritage Registration Process in Brazil",
    autores: "Bia C. Labate, Glauber Loures de Assis",
    ano: "2023",
    periodico: "Religious Freedom and the Global Regulation of Ayahuasca",
    urlOrigem: "https://doi.org/10.4324/9780429001161-9",
    eixoTematico: "direito_conad",
    sinteseLinguagemClara:
      "Capítulo acadêmico que reconstitui o processo histórico de reconhecimento cultural da ayahuasca no Brasil junto ao IPHAN e o amparo institucional ao exercício religioso tradicional.",
    statusRevisao: "REVISAO_EXTERNA_PARES",
    adicionadoPorCodigo: "ADM-NATIVARAM",
    adicionadoPorNome: "Conselho Gestor — Cooperativa Nativaram",
    criadoEm: "2026-11-17T00:00:00.000Z",
  },
  {
    id: "ANX-2026-AFTERGLOW",
    doi: "10.1007/s00213-019-05445-3",
    titulo: "Ayahuasca’s ‘afterglow’: improved mindfulness and cognitive flexibility in ayahuasca drinkers",
    autores: "Ashleigh Murphy-Beiner, Kirstie Soar",
    ano: "2020",
    periodico: "Psychopharmacology",
    urlOrigem: "https://doi.org/10.1007/s00213-019-05445-3",
    eixoTematico: "etnobotanica_jurua",
    sinteseLinguagemClara:
      "Pesquisa observacional publicada em periódico científico analisando atenção plena e flexibilidade cognitiva após vivências rituais; registro estritamente descritivo, sem finalidade médica.",
    statusRevisao: "REVISAO_EXTERNA_PARES",
    adicionadoPorCodigo: "ADM-NATIVARAM",
    adicionadoPorNome: "Conselho Gestor — Cooperativa Nativaram",
    criadoEm: "2026-11-17T00:00:00.000Z",
  },
];

const anexosStore = createHybridJsonStore<AnexoEstudoPublicado>({
  filename: "anexos_academicos.json",
  seedData: ANEXOS_SEMENTE_VERIFICADOS,
  getKey: (item) => item.id.trim().toUpperCase(),
});

interface AnexoRow {
  id: string;
  doi: string;
  titulo: string;
  autores: string;
  ano: string;
  periodico: string;
  url_origem: string;
  pdf_aberto_url: string | null;
  eixo_tematico: EixoTematicoObservatorio;
  sintese_linguagem_clara: string;
  nota_dirigente: string | null;
  status_revisao: "REVISAO_EXTERNA_PARES";
  adicionado_por_codigo: string;
  adicionado_por_nome: string;
  criado_em: string;
}

function mapRowToAnexo(r: AnexoRow): AnexoEstudoPublicado {
  return {
    id: r.id,
    doi: r.doi,
    titulo: r.titulo,
    autores: r.autores,
    ano: r.ano,
    periodico: r.periodico,
    urlOrigem: r.url_origem,
    pdfAbertoUrl: r.pdf_aberto_url || undefined,
    eixoTematico: r.eixo_tematico,
    sinteseLinguagemClara: r.sintese_linguagem_clara,
    notaDirigente: r.nota_dirigente || undefined,
    statusRevisao: r.status_revisao || "REVISAO_EXTERNA_PARES",
    adicionadoPorCodigo: r.adicionado_por_codigo,
    adicionadoPorNome: r.adicionado_por_nome,
    criadoEm: r.criado_em,
  };
}

function mapAnexoToRow(a: AnexoEstudoPublicado): AnexoRow {
  return {
    id: a.id,
    doi: a.doi,
    titulo: a.titulo,
    autores: a.autores,
    ano: a.ano,
    periodico: a.periodico,
    url_origem: a.urlOrigem,
    pdf_aberto_url: a.pdfAbertoUrl || null,
    eixo_tematico: a.eixoTematico,
    sintese_linguagem_clara: a.sinteseLinguagemClara,
    nota_dirigente: a.notaDirigente || null,
    status_revisao: a.statusRevisao,
    adicionado_por_codigo: a.adicionadoPorCodigo,
    adicionado_por_nome: a.adicionadoPorNome,
    criado_em: a.criadoEm,
  };
}

async function lerTodosMesclados(): Promise<AnexoEstudoPublicado[]> {
  const locais = await anexosStore.readAll();
  const porDoi = new Map<string, AnexoEstudoPublicado>();
  for (const item of locais) {
    porDoi.set(item.doi.trim().toLowerCase(), item);
  }

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await withTimeout<{
        data: AnexoRow[] | null;
        error: unknown;
      }>(
        supabase
          .from("anexos_academicos")
          .select("*")
          .order("criado_em", { ascending: false }),
        2000
      );
      if (!error && Array.isArray(data)) {
        for (const row of data) {
          const mapped = mapRowToAnexo(row);
          porDoi.set(mapped.doi.trim().toLowerCase(), mapped);
        }
      }
    } catch {
      // Silencioso antes da migração 007 ou offline: segue com o cache local atômico
    }
  }

  return Array.from(porDoi.values());
}

export async function listarAnexosObservatorio(filtros?: {
  eixo?: EixoTematicoObservatorio;
  busca?: string;
}): Promise<AnexoEstudoPublicado[]> {
  const todos = await lerTodosMesclados();
  const termo = (filtros?.busca || "").trim().toLowerCase();

  return todos
    .filter((item) => {
      if (filtros?.eixo && item.eixoTematico !== filtros.eixo) return false;
      if (!termo) return true;
      return (
        item.titulo.toLowerCase().includes(termo) ||
        item.autores.toLowerCase().includes(termo) ||
        item.periodico.toLowerCase().includes(termo) ||
        item.doi.toLowerCase().includes(termo) ||
        item.sinteseLinguagemClara.toLowerCase().includes(termo)
      );
    })
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

export async function anexarEstudoObservatorio(
  novo: Omit<AnexoEstudoPublicado, "id" | "statusRevisao" | "criadoEm">
): Promise<{ criado?: AnexoEstudoPublicado; duplicado?: boolean }> {
  const todos = await lerTodosMesclados();
  const doiNorm = novo.doi.trim().toLowerCase();
  if (todos.some((item) => item.doi.trim().toLowerCase() === doiNorm)) {
    return { duplicado: true };
  }

  const sufixo = Math.random().toString(36).substring(2, 6).toUpperCase();
  const registro: AnexoEstudoPublicado = {
    ...novo,
    id: `ANX-${new Date().getFullYear()}-${sufixo}`,
    statusRevisao: "REVISAO_EXTERNA_PARES",
    criadoEm: new Date().toISOString(),
  };

  await anexosStore.upsert(registro);

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    await gravarNoSupabase(
      supabase.from("anexos_academicos").upsert(mapAnexoToRow(registro)),
      "gravar anexo acadêmico"
    );
  }

  return { criado: registro };
}

export async function obterAnexoPorId(id: string): Promise<AnexoEstudoPublicado | null> {
  const todos = await lerTodosMesclados();
  const chave = id.trim().toUpperCase();
  return todos.find((a) => a.id.trim().toUpperCase() === chave) || null;
}

export async function removerAnexoObservatorio(id: string): Promise<boolean> {
  const chave = id.trim().toUpperCase();
  const todos = await lerTodosMesclados();
  if (!todos.some((a) => a.id.trim().toUpperCase() === chave)) {
    return false;
  }

  await anexosStore.remove(chave);

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      await withTimeout(
        supabase.from("anexos_academicos").delete().eq("id", chave),
        2000
      );
    } catch {
      // Falha remota não impede limpeza do disco local
    }
  }

  return true;
}
