import { ArtigoAcademicoExterno, EixoTematicoObservatorio, ResultadoBuscaAcademica } from "@/types/observatorio";
import { EIXOS_OBSERVATORIO } from "@/lib/validators/observatorio";

const SEARCH_CACHE = new Map<string, { exp: number; data: ResultadoBuscaAcademica }>();
const CACHE_TTL_MS = 10 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 4500;

export function limparTextoAcademico(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizarDoi(raw: unknown): string {
  if (typeof raw !== "string") return "";
  const cleaned = raw
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
    .replace(/^doi:\s*/i, "")
    .trim();
  return /^10\.\d{4,9}\/\S+$/i.test(cleaned) ? cleaned : "";
}

export function reconstruirResumoOpenAlex(invertedIndex: unknown): string {
  if (!invertedIndex || typeof invertedIndex !== "object" || Array.isArray(invertedIndex)) {
    return "";
  }
  const tokens: { pos: number; word: string }[] = [];
  for (const [word, positions] of Object.entries(invertedIndex as Record<string, unknown>)) {
    if (!Array.isArray(positions)) continue;
    for (const pos of positions) {
      if (typeof pos === "number" && Number.isFinite(pos) && pos >= 0 && pos < 2000) {
        tokens.push({ pos, word });
      }
    }
  }
  tokens.sort((a, b) => a.pos - b.pos);
  return tokens.map((t) => t.word).join(" ").trim();
}

function ehTituloDescartavel(titulo: string): boolean {
  if (!titulo || titulo.length < 8) return true;
  return /^(corrigendum|erratum|editorial note|retraction notice)\b/i.test(titulo.trim());
}

/**
 * Pipeline determinístico (Karpathy Pilar 4):
 * Descarta registros sem DOI válido, retratações/erratas e duplicatas antes de exibir ou resumir.
 */
export function filtrarEDesduplicarArtigos(
  brutos: ArtigoAcademicoExterno[],
  somenteAcessoAberto = false
): ArtigoAcademicoExterno[] {
  const porDoi = new Map<string, ArtigoAcademicoExterno>();

  for (const item of brutos) {
    const doi = normalizarDoi(item.doi);
    const titulo = limparTextoAcademico(item.titulo);
    if (!doi || ehTituloDescartavel(titulo)) continue;

    const normalizado: ArtigoAcademicoExterno = {
      ...item,
      doi,
      titulo,
      autores: limparTextoAcademico(item.autores) || "Autores não informados na base",
      ano: /^\d{4}$/.test(String(item.ano)) ? String(item.ano) : "",
      periodico: limparTextoAcademico(item.periodico) || "Periódico indexado",
      resumo: limparTextoAcademico(item.resumo),
      urlOrigem: /^https:\/\//i.test(item.urlOrigem)
        ? item.urlOrigem
        : `https://doi.org/${doi}`,
      pdfAbertoUrl:
        item.pdfAbertoUrl && /^https:\/\//i.test(item.pdfAbertoUrl)
          ? item.pdfAbertoUrl
          : undefined,
    };

    if (!normalizado.ano) continue;

    const chave = doi.toLowerCase();
    const existente = porDoi.get(chave);
    if (!existente) {
      porDoi.set(chave, normalizado);
    } else {
      const novoPontua =
        (normalizado.acessoAberto ? 2 : 0) +
        (normalizado.pdfAbertoUrl ? 2 : 0) +
        (normalizado.resumo.length > existente.resumo.length ? 1 : 0);
      const antigoPontua =
        (existente.acessoAberto ? 2 : 0) +
        (existente.pdfAbertoUrl ? 2 : 0);
      if (novoPontua > antigoPontua) {
        porDoi.set(chave, {
          ...existente,
          ...normalizado,
          resumo: normalizado.resumo || existente.resumo,
          pdfAbertoUrl: normalizado.pdfAbertoUrl || existente.pdfAbertoUrl,
          acessoAberto: normalizado.acessoAberto || existente.acessoAberto,
        });
      }
    }
  }

  return Array.from(porDoi.values())
    .filter((a) => !somenteAcessoAberto || a.acessoAberto)
    .sort((a, b) => {
      if (a.acessoAberto !== b.acessoAberto) return a.acessoAberto ? -1 : 1;
      return Number(b.ano) - Number(a.ano);
    });
}

async function fetchComTimeout(url: string, headers: Record<string, string> = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...headers,
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function mapearRegistroEuropePmc(r: Record<string, unknown>): ArtigoAcademicoExterno {
  const doi = normalizarDoi(r.doi);
  const urls =
    (r.fullTextUrlList as { fullTextUrl?: Array<Record<string, string>> } | undefined)
      ?.fullTextUrl || [];
  const oaPdf = urls.find(
    (u) => u.availabilityCode === "OA" && u.documentStyle === "pdf" && /^https:\/\//i.test(u.url || "")
  )?.url;
  const oaHtml = urls.find(
    (u) => u.availabilityCode === "OA" && u.documentStyle === "html" && /^https:\/\//i.test(u.url || "")
  )?.url;
  const journalInfo = r.journalInfo as { journal?: { title?: string } } | undefined;
  const periodico =
    (typeof r.journalTitle === "string" && r.journalTitle) ||
    journalInfo?.journal?.title ||
    "";
  const isOA = r.isOpenAccess === "Y" || Boolean(oaPdf || oaHtml);

  return {
    doi,
    titulo: String(r.title || ""),
    autores: String(r.authorString || ""),
    ano: String(r.pubYear || ""),
    periodico,
    resumo: String(r.abstractText || ""),
    urlOrigem: oaHtml || (doi ? `https://doi.org/${doi}` : ""),
    pdfAbertoUrl: oaPdf,
    acessoAberto: isOA,
    fonteApi: "EUROPE_PMC",
  };
}

function mapearItemCrossref(item: Record<string, unknown>): ArtigoAcademicoExterno {
  const doi = normalizarDoi(item.DOI);
  const titleArr = Array.isArray(item.title) ? item.title : [];
  const containerArr = Array.isArray(item["container-title"])
    ? (item["container-title"] as string[])
    : [];
  const authorsRaw = Array.isArray(item.author)
    ? (item.author as Array<{ given?: string; family?: string }>)
    : [];
  const autores = authorsRaw
    .slice(0, 6)
    .map((a) => [a.given, a.family].filter(Boolean).join(" ").trim())
    .filter(Boolean)
    .join(", ");
  const issued = item.issued as { "date-parts"?: number[][] } | undefined;
  const ano = String(issued?.["date-parts"]?.[0]?.[0] || "");
  const links = Array.isArray(item.link)
    ? (item.link as Array<{ URL?: string; "content-type"?: string }>)
    : [];
  const pdfLink = links.find(
    (l) => l["content-type"]?.includes("pdf") && /^https:\/\//i.test(l.URL || "")
  )?.URL;

  return {
    doi,
    titulo: String(titleArr[0] || ""),
    autores: authorsRaw.length > 6 ? `${autores} et al.` : autores,
    ano,
    periodico: String(containerArr[0] || ""),
    resumo: typeof item.abstract === "string" ? item.abstract : "",
    urlOrigem: doi ? `https://doi.org/${doi}` : "",
    pdfAbertoUrl: pdfLink,
    acessoAberto: Boolean(pdfLink),
    fonteApi: "CROSSREF",
  };
}

async function consultarEuropePMC(query: string): Promise<ArtigoAcademicoExterno[]> {
  const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(
    query
  )}&format=json&resultType=core&pageSize=8`;
  const data = (await fetchComTimeout(url)) as {
    resultList?: { result?: Array<Record<string, unknown>> };
  } | null;
  const rows = data?.resultList?.result;
  if (!Array.isArray(rows)) return [];
  return rows.map(mapearRegistroEuropePmc);
}

async function consultarCrossref(query: string): Promise<ArtigoAcademicoExterno[]> {
  const url = `https://api.crossref.org/works?query=${encodeURIComponent(
    query
  )}&rows=8&mailto=contato@nativaram.com.br`;
  const data = (await fetchComTimeout(url, {
    "User-Agent": "CooperativaNativaram/1.0 (mailto:contato@nativaram.com.br)",
  })) as { message?: { items?: Array<Record<string, unknown>> } } | null;
  const items = data?.message?.items;
  if (!Array.isArray(items)) return [];
  return items.map(mapearItemCrossref);
}

async function consultarCrossrefPorDoi(doi: string): Promise<ArtigoAcademicoExterno[]> {
  const url = `https://api.crossref.org/works/${encodeURIComponent(
    doi
  )}?mailto=contato@nativaram.com.br`;
  const data = (await fetchComTimeout(url, {
    "User-Agent": "CooperativaNativaram/1.0 (mailto:contato@nativaram.com.br)",
  })) as { message?: Record<string, unknown> } | null;
  if (!data?.message || typeof data.message !== "object") return [];
  return [mapearItemCrossref(data.message)];
}

export async function buscarPesquisasAcademicas(params: {
  q?: string;
  doi?: string;
  eixo?: EixoTematicoObservatorio;
  somenteAcessoAberto?: boolean;
}): Promise<ResultadoBuscaAcademica> {
  const doiExato = normalizarDoi(params.doi || params.q);
  const eixoObj = EIXOS_OBSERVATORIO.find((e) => e.id === params.eixo);
  const consultaEfetiva = doiExato
    ? doiExato
    : (params.q?.trim() || eixoObj?.queryPadrao || EIXOS_OBSERVATORIO[0].queryPadrao).slice(0, 140);
  const cacheKey = `${doiExato ? `doi:${doiExato.toLowerCase()}` : consultaEfetiva.toLowerCase()}::oa=${Boolean(
    params.somenteAcessoAberto
  )}`;
  const cached = SEARCH_CACHE.get(cacheKey);
  if (cached && cached.exp > Date.now()) {
    return { ...cached.data, emCache: true };
  }

  if (process.env.NATIVARAM_TEST === "1") {
    return {
      consulta: consultaEfetiva,
      totalEncontrado: 0,
      artigos: [],
      fontesConsultadas: [doiExato ? "MODO_TESTE_DOI_EXATO" : "MODO_TESTE_LOCAL"],
      emCache: false,
    };
  }

  const [epmcRes, crossrefRes] = await Promise.allSettled(
    doiExato
      ? [consultarEuropePMC(`DOI:"${doiExato}"`), consultarCrossrefPorDoi(doiExato)]
      : [consultarEuropePMC(consultaEfetiva), consultarCrossref(consultaEfetiva)]
  );

  const combinados: ArtigoAcademicoExterno[] = [];
  const fontesConsultadas: string[] = [];

  if (epmcRes.status === "fulfilled" && epmcRes.value.length > 0) {
    combinados.push(...epmcRes.value);
    fontesConsultadas.push("Europe PMC");
  }
  if (crossrefRes.status === "fulfilled" && crossrefRes.value.length > 0) {
    combinados.push(...crossrefRes.value);
    fontesConsultadas.push("Crossref");
  }

  const artigos = filtrarEDesduplicarArtigos(combinados, Boolean(params.somenteAcessoAberto)).slice(
    0,
    12
  );

  const resultado: ResultadoBuscaAcademica = {
    consulta: consultaEfetiva,
    totalEncontrado: artigos.length,
    artigos,
    fontesConsultadas: fontesConsultadas.length > 0 ? fontesConsultadas : ["Europe PMC", "Crossref"],
    emCache: false,
  };

  if (SEARCH_CACHE.size >= 40) {
    const primeiraChave = SEARCH_CACHE.keys().next().value;
    if (primeiraChave) SEARCH_CACHE.delete(primeiraChave);
  }
  SEARCH_CACHE.set(cacheKey, { exp: Date.now() + CACHE_TTL_MS, data: resultado });

  return resultado;
}

export function formatarCitacaoABNT(a: Pick<ArtigoAcademicoExterno, "autores" | "titulo" | "periodico" | "ano" | "doi">): string {
  return `${a.autores}. ${a.titulo}. ${a.periodico}, ${a.ano}. DOI: https://doi.org/${a.doi}.`;
}

export function formatarBibTeX(a: Pick<ArtigoAcademicoExterno, "autores" | "titulo" | "periodico" | "ano" | "doi">): string {
  const slugAutor = (a.autores.split(/[,\s]+/)[0] || "autor").toLowerCase().replace(/[^a-z]/g, "");
  return [
    `@article{${slugAutor}${a.ano},`,
    `  title = {${a.titulo}},`,
    `  author = {${a.autores}},`,
    `  journal = {${a.periodico}},`,
    `  year = {${a.ano}},`,
    `  doi = {${a.doi}},`,
    `  url = {https://doi.org/${a.doi}}`,
    `}`,
  ].join("\n");
}

export function formatarCadernoNotebookLM(artigos: ArtigoAcademicoExterno[]): string {
  const linhas = [
    "# Caderno de Referências Acadêmicas — Observatório Etnobotânico Nativaram",
    "",
    "> **Nota Institucional (+18):** Este pacote reúne exclusivamente referências externas revisadas por pares coletadas via Europe PMC / Crossref. Não constitui recomendação clínica nem material comercial da Cooperativa Nativaram (CONAD 01/2010).",
    "",
  ];

  artigos.forEach((a, idx) => {
    linhas.push(`## ${idx + 1}. ${a.titulo} (${a.ano})`);
    linhas.push(`- **Autores:** ${a.autores}`);
    linhas.push(`- **Periódico:** ${a.periodico}`);
    linhas.push(`- **DOI:** https://doi.org/${a.doi}`);
    if (a.pdfAbertoUrl) linhas.push(`- **Texto / PDF Aberto:** ${a.pdfAbertoUrl}`);
    linhas.push(`- **Resumo indexado:** ${a.resumo || "Resumo não disponibilizado pela base; consultar fonte original pelo DOI."}`);
    linhas.push("");
  });

  return linhas.join("\n");
}
