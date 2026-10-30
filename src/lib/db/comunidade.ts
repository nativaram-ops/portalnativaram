import fs from "fs/promises";
import os from "os";
import path from "path";
import {
  PublicacaoComunidade,
  PerfilTemploComunidade,
  ItemAgendaLiturgica,
} from "../../types/comunidade";
import {
  isSupabaseConfigured,
  SUPABASE_PUBLIC_URL,
  SUPABASE_PUBLIC_ANON_KEY,
} from "../supabase/client";
import { createClient } from "@supabase/supabase-js";

let cachedDirectClient: any = null;

function getDirectSupabaseClient(): any {
  if (!isSupabaseConfigured()) return null;
  if (cachedDirectClient) return cachedDirectClient;

  if (!SUPABASE_PUBLIC_URL || !SUPABASE_PUBLIC_ANON_KEY) return null;

  try {
    cachedDirectClient = createClient(
      SUPABASE_PUBLIC_URL,
      SUPABASE_PUBLIC_ANON_KEY,
      {
        auth: { persistSession: false },
      }
    );
    return cachedDirectClient;
  } catch {
    return null;
  }
}

const DATA_DIR = path.join(process.cwd(), "data");
const POSTS_FILE = path.join(DATA_DIR, "comunidade_posts.json");
const PERFIS_FILE = path.join(DATA_DIR, "comunidade_perfis.json");
const AGENDA_FILE = path.join(DATA_DIR, "comunidade_agenda.json");

// Helper de timeout estrito para chamadas Supabase (Padrão Resiliente)
async function withTimeout<T>(promise: Promise<T>, ms = 2000): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Database operation timeout")), ms)
  );
  return Promise.race([promise, timeout]);
}

// ══════════════════════════════════════════════════════════
// DADOS SEMENTE CANÔNICOS (SEED INICIAL)
// ══════════════════════════════════════════════════════════

export const PERFIS_INICIAIS: PerfilTemploComunidade[] = [
  {
    codigoLiturgico: "NAT-TEMPLO-842",
    slug: "ceu-do-cruzeiro",
    nomeInstituicao: "Templo Céu do Cruzeiro",
    dirigenteResponsavel: "Padrinho Marcos Silva",
    linhagem: "Linha do Santo Daime",
    cidade: "São Paulo",
    estado: "SP",
    bioApresentacao:
      "Igreja filiada e homologada para trabalhos litúrgicos de concentração, hinários de cura espiritual e missas da doutrina. Cultivamos o respeito ao sacramento puro e à memória da floresta amazônica sob as resoluções do CONAD.",
    fotoPerfilUrl: "/documentos/nativaram-catalogo-v4.pdf",
    fotoCapaUrl: "",
    fotosEspaco: [
      "/images/feitio-caldeirao-tucunaca.jpg",
      "/images/cipo-tucunaca-bruto-barracao.jpg",
    ],
    redesSociais: {
      instagram: "https://instagram.com/ceudocruzeiro.oficial",
      youtube: "https://youtube.com/@ceudocruzeiro",
      website: "https://ceudocruzeiro.org.br",
    },
    whatsappContato: "5511987654321",
    emailContato: "contato@ceudocruzeiro.org.br",
    agenda: [],
    publicado: true,
    criadoEm: "14/02/2024",
    atualizadoEm: "13/10/2026",
  },
  {
    codigoLiturgico: "NAT-TEMPLO-913",
    slug: "rainha-da-floresta",
    nomeInstituicao: "Fraternidade Rainha da Floresta",
    dirigenteResponsavel: "Madre Clara Albuquerque",
    linhagem: "Xamanismo Universalista",
    cidade: "Petrópolis",
    estado: "RJ",
    bioApresentacao:
      "Espaço sagrado de reconexão sensorial, vigílias e ritos tradicionais da floresta na serra carioca. Conduzimos cerimônias de acalento e ancoramento meditativo amparados na etnobotânica dos povos originários.",
    fotoPerfilUrl: "",
    fotoCapaUrl: "",
    fotosEspaco: [
      "/images/feitio-vigilia-noturna.jpg",
      "/images/folhas-chacrona-orvalho.jpg",
    ],
    redesSociais: {
      instagram: "https://instagram.com/fraternidaderainhadafloresta",
      spotify: "https://open.spotify.com/playlist/floresta-sagrada",
    },
    whatsappContato: "5521998877665",
    emailContato: "contato@rainhadafloresta.org.br",
    agenda: [],
    publicado: true,
    criadoEm: "02/08/2025",
    atualizadoEm: "13/10/2026",
  },
];

export const POSTS_INICIAIS: PublicacaoComunidade[] = [
  {
    id: "PUB-2026-001",
    temploCodigo: "NAT-TEMPLO-842",
    temploNome: "Templo Céu do Cruzeiro",
    temploSlug: "ceu-do-cruzeiro",
    slug: "o-silencio-da-mata-e-a-purificacao-do-cipo",
    titulo: "O Silêncio da Mata e o Ponto Firme do Feitio Tucunacá",
    resumo:
      "Reflexão sobre a consagração do cipó Tucunacá purista de Cruzeiro do Sul e como a densidade 10.1 Wirapuru ampara os hinários de concentração.",
    conteudoMarkdown: `Na tradição daimista, o feitio é uma oração contínua que começa semanas antes da fervura dos caldeirões. Quando recebemos as remessas certificadas pela Cooperativa Nativaram, a transparência fitoquímica e a filtragem em menores micras garantem que a congregação vivencie o sacramento em seu estado de mais pura limpidez.

### O Cuidado com o Preparo
O Daime não requer aditivos ou qualquer desvio botânico. O cipó *Banisteriopsis caapi* da variedade Tucunacá, colhido na bacia do Juruá, traz a nobreza das beta-carbolinas estáveis (Harmina e Tetrahidroharmina).

> *"O silêncio do templo antes da primeira concha é o espaço onde a mente humana se aquieta e a força divina se manifesta."*

Em nossa última sessão de concentração, observamos como a decantação sem borras caústicas proporciona um trabalho sereno, permitindo aos irmãos acolher a doutrina com reverência e lucidez.`,
    categoria: "REFLEXAO_DOUTRINARIA",
    categoriaLabel: "Reflexão Doutrinária",
    imagemCapa: "/images/feitio-caldeirao-tucunaca.jpg",
    fotosGaleria: [
      "/images/folhas-chacrona-orvalho.jpg",
      "/images/cipo-tucunaca-bruto-barracao.jpg",
    ],
    anexos: [
      {
        nome: "Laudo Fitoquímico Tucunacá (HPLC)",
        url: "/documentos/fitoquimica-cipo-tucunaca-ayahuasca.pdf",
        tamanho: "4.3 KB",
        tipo: "PDF",
      },
    ],
    embeds: [
      {
        plataforma: "YOUTUBE",
        url: "https://www.youtube.com/watch?v=feitio-daime-doc",
        titulo: "Registro do Canto dos Feitores",
      },
    ],
    status: "PUBLICADO",
    destaque: true,
    visualizacoes: 142,
    criadoEm: "10/10/2026",
    atualizadoEm: "10/10/2026",
  },
  {
    id: "PUB-2026-002",
    temploCodigo: "NAT-TEMPLO-913",
    temploNome: "Fraternidade Rainha da Floresta",
    temploSlug: "rainha-da-floresta",
    slug: "a-alquimia-das-cinzas-de-tsunu-no-rape-tradicional",
    titulo: "A Sinergia Sagrada das Cinzas de Tsunu no Rapé Cerimonial",
    resumo:
      "Ensaio prático sobre a biogeoquímica das cinzas alcalinas no rapé sagrado e o papel do auto-acolhimento nas pausas conscientes.",
    conteudoMarkdown: `O rapé tradicional dos povos do Acre é uma das expressões mais elevadas da química vegetal intuitiva. Longe de ser um fumo recreativo, a combinação das cinzas nobres da casca do Tsunu (*Platycyamus regnellii*) com as folhas do fumo da corda proporciona um tamponamento de pH próximo a 10.0.

### A Força da Base Livre
Esse pH alcalino permite que o composto vegetal atue com suavidade imediata nas vias superiores, promovendo uma pausa consciente de clareza mental e silenciamento dos ruídos cotidianos.

Recomendamos sempre em nossas cerimônias de acalento:
1. Respire três vezes antes do sopro do Kuripe ou Tepi.
2. Mentalize uma intenção limpa de desapego e quietude.
3. Permaneça em postura ereta, acolhendo o calor que desce pelo corpo.`,
    categoria: "BOTANICA_TRADICIONAL",
    categoriaLabel: "Botânica Tradicional",
    imagemCapa: "/images/feitio-vigilia-noturna.jpg",
    fotosGaleria: [],
    anexos: [
      {
        nome: "Dossiê das Cinzas Sagradas no Rapé",
        url: "/documentos/alquimia-biogeoquimica-cinzas-rape.pdf",
        tamanho: "4.7 KB",
        tipo: "PDF",
      },
    ],
    embeds: [],
    status: "PUBLICADO",
    destaque: false,
    visualizacoes: 98,
    criadoEm: "08/10/2026",
    atualizadoEm: "08/10/2026",
  },
];

export const AGENDA_INICIAL: ItemAgendaLiturgica[] = [
  {
    id: "AGE-001",
    temploCodigo: "NAT-TEMPLO-842",
    tituloRito: "Sessão Doutrinária de Concentração & Estudo de Hinário",
    descricao:
      "Trabalho espiritual de silêncio e cânticos doutrinários. Obrigatória entrevista prévia de anamnese e cumprimento das 5 semanas de washout para candidatos.",
    dataEvento: "2026-10-24",
    horarioInicio: "19:30",
    vagasInfo: "Vagas limitadas mediante anamnese CONAD 01/2010",
    linkInscricao: "https://wa.me/5511987654321?text=Ola,%20gostaria%20de%20participar%20da%20anamnese",
    status: "CONFIRMADO",
  },
  {
    id: "AGE-002",
    temploCodigo: "NAT-TEMPLO-913",
    tituloRito: "Vigília Noturna de Reconexão e Rito com Rapé Tradicional",
    descricao:
      "Círculo sagrado com cantos da floresta, fogueira ritual e consagração de medicinas tradicionais de proteção e quietude da mente.",
    dataEvento: "2026-11-07",
    horarioInicio: "20:00",
    vagasInfo: "Inscrições abertas para cooperados e visitantes acolhidos",
    linkInscricao: "https://wa.me/5521998877665?text=Ola,%20tenho%20interesse%20na%20vigilia",
    status: "CONFIRMADO",
  },
];

// ══════════════════════════════════════════════════════════
// ROTINAS DE PERSISTÊNCIA LOCAL ATÔMICA
// ══════════════════════════════════════════════════════════

async function garantirArquivosLocais(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    try {
      await fs.access(POSTS_FILE);
    } catch {
      await fs.writeFile(POSTS_FILE, JSON.stringify(POSTS_INICIAIS, null, 2), "utf-8");
    }

    try {
      await fs.access(PERFIS_FILE);
    } catch {
      await fs.writeFile(PERFIS_FILE, JSON.stringify(PERFIS_INICIAIS, null, 2), "utf-8");
    }

    try {
      await fs.access(AGENDA_FILE);
    } catch {
      await fs.writeFile(AGENDA_FILE, JSON.stringify(AGENDA_INICIAL, null, 2), "utf-8");
    }
  } catch (err) {
    console.warn("Aviso ao inicializar arquivos locais da comunidade:", err);
  }
}

async function salvarArquivoAtomico(caminho: string, dados: any): Promise<void> {
  const payload = JSON.stringify(dados, null, 2);
  try {
    const tmp = `${caminho}.tmp.${Date.now()}.${Math.random().toString(36).substring(2, 6)}`;
    await fs.writeFile(tmp, payload, "utf-8");
    await fs.rename(tmp, caminho);
  } catch {
    // Em ambiente serverless read-only (EROFS), persiste em os.tmpdir()
  }

  try {
    const tmpFallback = path.join(os.tmpdir(), `nativaram_${path.basename(caminho)}`);
    await fs.writeFile(tmpFallback, payload, "utf-8");
  } catch {
    // Ignora erro secundário de tmpdir
  }
}

// ══════════════════════════════════════════════════════════
// MÉTODOS DE CONSULTA E GRAVAÇÃO HÍBRIDA
// ══════════════════════════════════════════════════════════

/**
 * Retorna todas as publicações com filtros opcionais
 */
export async function obterPublicacoesComunidade(filtros?: {
  temploCodigo?: string;
  categoria?: string;
  busca?: string;
  apenasPublicados?: boolean;
}): Promise<PublicacaoComunidade[]> {
  await garantirArquivosLocais();

  // 1. Tentar Supabase se disponível
  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      let query = supabase.from("publicacoes_comunidade").select("*");
      if (filtros?.apenasPublicados !== false) {
        query = query.eq("status", "PUBLICADO");
      }
      if (filtros?.temploCodigo) {
        query = query.eq("templo_codigo", filtros.temploCodigo);
      }
      if (filtros?.categoria && filtros.categoria !== "todas") {
        query = query.eq("categoria", filtros.categoria);
      }

      const res: any = await withTimeout(
        query.order("criado_em", { ascending: false }) as any
      );
      const data = res?.data;
      const error = res?.error;

      if (!error && data && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          temploCodigo: item.templo_codigo,
          temploNome: item.templo_nome || "Templo Credenciado",
          temploSlug: item.templo_slug || "templo",
          slug: item.slug,
          titulo: item.titulo,
          resumo: item.resumo,
          conteudoMarkdown: item.conteudo_markdown,
          categoria: item.categoria,
          categoriaLabel: item.categoria_label || "Publicação Litúrgica",
          imagemCapa: item.imagem_capa_url,
          fotosGaleria: item.fotos_galeria || [],
          anexos: item.arquivos_anexos || [],
          embeds: item.embeds_sociais || [],
          status: item.status,
          destaque: item.destaque || false,
          visualizacoes: item.visualizacoes || 0,
          criadoEm: item.criado_em,
          atualizadoEm: item.atualizado_em,
        }));
      }
    } catch {
      // Fallback gracioso para arquivo local
    }
  }

  // 2. Leitura local
  try {
    const raw = await fs.readFile(POSTS_FILE, "utf-8");
    let posts: PublicacaoComunidade[] = JSON.parse(raw);

    if (filtros?.apenasPublicados !== false) {
      posts = posts.filter((p) => p.status === "PUBLICADO");
    }
    if (filtros?.temploCodigo) {
      posts = posts.filter((p) => p.temploCodigo.toUpperCase() === filtros.temploCodigo!.toUpperCase());
    }
    if (filtros?.categoria && filtros.categoria !== "todas") {
      posts = posts.filter((p) => p.categoria === filtros.categoria);
    }
    if (filtros?.busca) {
      const q = filtros.busca.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.titulo.toLowerCase().includes(q) ||
          p.resumo.toLowerCase().includes(q) ||
          p.temploNome.toLowerCase().includes(q)
      );
    }

    return posts;
  } catch {
    return POSTS_INICIAIS;
  }
}

/**
 * Retorna uma publicação específica por slug
 */
export async function obterPublicacaoPorSlug(slug: string): Promise<PublicacaoComunidade | null> {
  const posts = await obterPublicacoesComunidade({ apenasPublicados: false });
  return posts.find((p) => p.slug === slug || p.id === slug) || null;
}

/**
 * Salva ou atualiza uma publicação
 */
export async function salvarPublicacao(
  post: Omit<PublicacaoComunidade, "id" | "criadoEm" | "atualizadoEm" | "visualizacoes"> & {
    id?: string;
  }
): Promise<PublicacaoComunidade> {
  await garantirArquivosLocais();
  const posts = await obterPublicacoesComunidade({ apenasPublicados: false });

  const agora = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const id = post.id || `PUB-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const postCompleto: PublicacaoComunidade = {
    ...post,
    id,
    visualizacoes: (post as any).visualizacoes || 0,
    criadoEm: (post as any).criadoEm || agora,
    atualizadoEm: agora,
  };

  const idx = posts.findIndex((p) => p.id === id);
  if (idx >= 0) {
    posts[idx] = { ...posts[idx], ...postCompleto };
  } else {
    posts.unshift(postCompleto);
  }

  await salvarArquivoAtomico(POSTS_FILE, posts);

  // Tentar sincronizar em nuvem no Supabase
  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      await withTimeout(
        supabase.from("publicacoes_comunidade").upsert({
          id: postCompleto.id,
          templo_codigo: postCompleto.temploCodigo,
          templo_nome: postCompleto.temploNome,
          templo_slug: postCompleto.temploSlug,
          slug: postCompleto.slug,
          titulo: postCompleto.titulo,
          resumo: postCompleto.resumo,
          conteudo_markdown: postCompleto.conteudoMarkdown,
          categoria: postCompleto.categoria,
          categoria_label: postCompleto.categoriaLabel,
          imagem_capa_url: postCompleto.imagemCapa,
          fotos_galeria: postCompleto.fotosGaleria,
          arquivos_anexos: postCompleto.anexos,
          embeds_sociais: postCompleto.embeds,
          status: postCompleto.status,
          destaque: postCompleto.destaque,
          visualizacoes: postCompleto.visualizacoes,
        })
      );
    } catch {
      // Mantido seguro no JSON local
    }
  }

  return postCompleto;
}

/**
 * Exclui uma publicação
 */
export async function deletarPublicacao(id: string, temploCodigo: string): Promise<boolean> {
  await garantirArquivosLocais();
  let posts = await obterPublicacoesComunidade({ apenasPublicados: false });

  const post = posts.find((p) => p.id === id);
  if (!post) return false;

  // Verificação de posse (ou permissão de admin)
  if (post.temploCodigo.toUpperCase() !== temploCodigo.toUpperCase() && !temploCodigo.includes("adm")) {
    return false;
  }

  posts = posts.filter((p) => p.id !== id);
  await salvarArquivoAtomico(POSTS_FILE, posts);

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      await withTimeout(supabase.from("publicacoes_comunidade").delete().eq("id", id));
    } catch {
      // Ignora falha remota
    }
  }

  return true;
}

// ══════════════════════════════════════════════════════════
// PERFIS DE TEMPLOS
// ══════════════════════════════════════════════════════════

export async function obterPerfisTemplos(): Promise<PerfilTemploComunidade[]> {
  await garantirArquivosLocais();
  try {
    const raw = await fs.readFile(PERFIS_FILE, "utf-8");
    const perfis: PerfilTemploComunidade[] = JSON.parse(raw);
    const agendaGeral = await obterAgendaLiturgica();

    // Vincula a agenda correspondente a cada templo
    return perfis.map((p) => ({
      ...p,
      agenda: agendaGeral.filter((a) => a.temploCodigo.toUpperCase() === p.codigoLiturgico.toUpperCase()),
    }));
  } catch {
    return PERFIS_INICIAIS;
  }
}

export async function obterPerfilPorSlugOuCodigo(
  slugOuCodigo: string
): Promise<PerfilTemploComunidade | null> {
  const perfis = await obterPerfisTemplos();
  const busca = slugOuCodigo.toUpperCase();
  return (
    perfis.find(
      (p) =>
        p.slug.toUpperCase() === busca ||
        p.codigoLiturgico.toUpperCase() === busca
    ) || null
  );
}

export async function salvarPerfilTemplo(
  perfil: PerfilTemploComunidade
): Promise<PerfilTemploComunidade> {
  await garantirArquivosLocais();
  const perfis = await obterPerfisTemplos();

  const idx = perfis.findIndex(
    (p) => p.codigoLiturgico.toUpperCase() === perfil.codigoLiturgico.toUpperCase()
  );

  const agora = new Date().toLocaleDateString("pt-BR");
  const atualizado = { ...perfil, atualizadoEm: agora };

  if (idx >= 0) {
    perfis[idx] = atualizado;
  } else {
    perfis.push(atualizado);
  }

  await salvarArquivoAtomico(PERFIS_FILE, perfis);
  return atualizado;
}

// ══════════════════════════════════════════════════════════
// AGENDA LITÚRGICA
// ══════════════════════════════════════════════════════════

export async function obterAgendaLiturgica(temploCodigo?: string): Promise<ItemAgendaLiturgica[]> {
  await garantirArquivosLocais();
  try {
    const raw = await fs.readFile(AGENDA_FILE, "utf-8");
    let itens: ItemAgendaLiturgica[] = JSON.parse(raw);
    if (temploCodigo) {
      itens = itens.filter((i) => i.temploCodigo.toUpperCase() === temploCodigo.toUpperCase());
    }
    return itens;
  } catch {
    return AGENDA_INICIAL;
  }
}

export async function salvarItemAgenda(
  item: Omit<ItemAgendaLiturgica, "id"> & { id?: string }
): Promise<ItemAgendaLiturgica> {
  await garantirArquivosLocais();
  const agenda = await obterAgendaLiturgica();

  const id = item.id || `AGE-${Date.now().toString().slice(-4)}`;
  const itemCompleto: ItemAgendaLiturgica = { ...item, id };

  const idx = agenda.findIndex((i) => i.id === id);
  if (idx >= 0) {
    agenda[idx] = itemCompleto;
  } else {
    agenda.push(itemCompleto);
  }

  await salvarArquivoAtomico(AGENDA_FILE, agenda);
  return itemCompleto;
}

export async function deletarItemAgenda(id: string, temploCodigo: string): Promise<boolean> {
  await garantirArquivosLocais();
  let agenda = await obterAgendaLiturgica();

  const item = agenda.find((i) => i.id === id);
  if (!item) return false;

  if (item.temploCodigo.toUpperCase() !== temploCodigo.toUpperCase() && !temploCodigo.includes("adm")) {
    return false;
  }

  agenda = agenda.filter((i) => i.id !== id);
  await salvarArquivoAtomico(AGENDA_FILE, agenda);
  return true;
}
