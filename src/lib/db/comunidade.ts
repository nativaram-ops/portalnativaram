import {
  PublicacaoComunidade,
  PerfilTemploComunidade,
  ItemAgendaLiturgica,
  CategoriaPublicacao,
  AnexoArquivo,
  EmbedSocial,
  RedesSociaisTemplo,
} from "../../types/comunidade";
import {
  getDirectSupabaseClient,
  withTimeout,
  createHybridJsonStore,
} from "./core-hybrid-store";

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
      "Igreja filiada e homologada para trabalhos litúrgicos de concentração, hinários de alinhamento espiritual e missas da doutrina. Cultivamos o respeito ao sacramento puro e à memória da floresta amazônica sob as resoluções do CONAD.",
    fotoPerfilUrl: "",
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
      "Círculo sagrado com cantos da floresta, fogueira ritual e consagração de preparados tradicionais de proteção e quietude da mente.",
    dataEvento: "2026-11-07",
    horarioInicio: "20:00",
    vagasInfo: "Inscrições abertas para cooperados e visitantes acolhidos",
    linkInscricao: "https://wa.me/5521998877665?text=Ola,%20tenho%20interesse%20na%20vigilia",
    status: "CONFIRMADO",
  },
];

// ══════════════════════════════════════════════════════════
// REPOSITÓRIOS HÍBRIDOS ATÔMICOS (data/ + os.tmpdir())
// ══════════════════════════════════════════════════════════

const postsStore = createHybridJsonStore<PublicacaoComunidade>({
  filename: "comunidade_posts.json",
  seedData: POSTS_INICIAIS,
  getKey: (item) => item.id.trim().toUpperCase(),
});

const perfisStore = createHybridJsonStore<PerfilTemploComunidade>({
  filename: "comunidade_perfis.json",
  seedData: PERFIS_INICIAIS,
  getKey: (item) => item.codigoLiturgico.trim().toUpperCase(),
});

const agendaStore = createHybridJsonStore<ItemAgendaLiturgica>({
  filename: "comunidade_agenda.json",
  seedData: AGENDA_INICIAL,
  getKey: (item) => item.id.trim().toUpperCase(),
});

interface PublicacaoRow {
  id: string;
  templo_codigo: string;
  templo_nome: string | null;
  templo_slug: string | null;
  slug: string;
  titulo: string;
  resumo: string;
  conteudo_markdown: string;
  categoria: CategoriaPublicacao;
  categoria_label: string | null;
  imagem_capa_url: string | null;
  fotos_galeria: string[] | null;
  arquivos_anexos: AnexoArquivo[] | null;
  embeds_sociais: EmbedSocial[] | null;
  status: PublicacaoComunidade["status"];
  destaque: boolean | null;
  visualizacoes: number | null;
  criado_em: string;
  atualizado_em: string;
}

interface PerfilRow {
  codigo_liturgico: string;
  slug: string;
  nome_instituicao: string;
  dirigente_responsavel: string;
  linhagem: string;
  cidade: string;
  estado: string;
  bio_apresentacao: string;
  foto_perfil_url: string | null;
  foto_capa_url: string | null;
  fotos_espaco: string[] | null;
  redes_sociais: RedesSociaisTemplo | null;
  whatsapp_contato: string | null;
  email_contato: string | null;
  publicado: boolean | null;
  criado_em: string;
  atualizado_em: string;
}

interface AgendaRow {
  id: string;
  templo_codigo: string;
  titulo_rito: string;
  descricao: string | null;
  data_evento: string;
  horario_inicio: string;
  vagas_info: string | null;
  link_inscricao: string | null;
  status: ItemAgendaLiturgica["status"];
}

function mapRowToPublicacao(item: PublicacaoRow): PublicacaoComunidade {
  return {
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
    imagemCapa: item.imagem_capa_url || undefined,
    fotosGaleria: item.fotos_galeria || [],
    anexos: item.arquivos_anexos || [],
    embeds: item.embeds_sociais || [],
    status: item.status,
    destaque: item.destaque || false,
    visualizacoes: item.visualizacoes || 0,
    criadoEm: item.criado_em,
    atualizadoEm: item.atualizado_em,
  };
}

function mapRowToPerfil(row: PerfilRow): PerfilTemploComunidade {
  return {
    codigoLiturgico: row.codigo_liturgico,
    slug: row.slug,
    nomeInstituicao: row.nome_instituicao,
    dirigenteResponsavel: row.dirigente_responsavel,
    linhagem: row.linhagem,
    cidade: row.cidade,
    estado: row.estado,
    bioApresentacao: row.bio_apresentacao,
    fotoPerfilUrl: row.foto_perfil_url?.endsWith(".pdf") ? "" : (row.foto_perfil_url || ""),
    fotoCapaUrl: row.foto_capa_url || "",
    fotosEspaco: row.fotos_espaco || [],
    redesSociais: row.redes_sociais || {},
    whatsappContato: row.whatsapp_contato || undefined,
    emailContato: row.email_contato || undefined,
    agenda: [],
    publicado: row.publicado ?? true,
    criadoEm: row.criado_em,
    atualizadoEm: row.atualizado_em,
  };
}

function mapPerfilToRow(perfil: PerfilTemploComunidade): PerfilRow {
  return {
    codigo_liturgico: perfil.codigoLiturgico,
    slug: perfil.slug,
    nome_instituicao: perfil.nomeInstituicao,
    dirigente_responsavel: perfil.dirigenteResponsavel,
    linhagem: perfil.linhagem,
    cidade: perfil.cidade,
    estado: perfil.estado,
    bio_apresentacao: perfil.bioApresentacao,
    foto_perfil_url: perfil.fotoPerfilUrl || null,
    foto_capa_url: perfil.fotoCapaUrl || null,
    fotos_espaco: perfil.fotosEspaco || [],
    redes_sociais: perfil.redesSociais || {},
    whatsapp_contato: perfil.whatsappContato || null,
    email_contato: perfil.emailContato || null,
    publicado: perfil.publicado,
    criado_em: perfil.criadoEm,
    atualizado_em: perfil.atualizadoEm,
  };
}

function mapRowToAgenda(row: AgendaRow): ItemAgendaLiturgica {
  return {
    id: row.id,
    temploCodigo: row.templo_codigo,
    tituloRito: row.titulo_rito,
    descricao: row.descricao || undefined,
    dataEvento: row.data_evento,
    horarioInicio: row.horario_inicio,
    vagasInfo: row.vagas_info || undefined,
    linkInscricao: row.link_inscricao || undefined,
    status: row.status,
  };
}

function mapAgendaToRow(item: ItemAgendaLiturgica): AgendaRow {
  return {
    id: item.id,
    templo_codigo: item.temploCodigo,
    titulo_rito: item.tituloRito,
    descricao: item.descricao || null,
    data_evento: item.dataEvento,
    horario_inicio: item.horarioInicio,
    vagas_info: item.vagasInfo || null,
    link_inscricao: item.linkInscricao || null,
    status: item.status,
  };
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
  let posts = await postsStore.readAll();

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await withTimeout<{
        data: PublicacaoRow[] | null;
        error: unknown;
      }>(
        supabase
          .from("publicacoes_comunidade")
          .select("*")
          .order("criado_em", { ascending: false }),
        2000
      );

      if (!error && data && data.length > 0) {
        const mapa = new Map<string, PublicacaoComunidade>();
        for (const row of data) {
          const mapped = mapRowToPublicacao(row);
          mapa.set(mapped.id.toUpperCase(), mapped);
        }
        for (const local of posts) {
          mapa.set(local.id.toUpperCase(), local);
        }
        posts = Array.from(mapa.values());
      }
    } catch {
      // Fallback gracioso para repositório híbrido local
    }
  }

  if (filtros?.apenasPublicados !== false) {
    posts = posts.filter((p) => p.status === "PUBLICADO");
  }
  if (filtros?.temploCodigo) {
    posts = posts.filter(
      (p) => p.temploCodigo.toUpperCase() === filtros.temploCodigo!.toUpperCase()
    );
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
}

/**
 * Retorna uma publicação específica por slug ou id
 */
export async function obterPublicacaoPorSlug(
  slug: string
): Promise<PublicacaoComunidade | null> {
  const posts = await obterPublicacoesComunidade({ apenasPublicados: false });
  return posts.find((p) => p.slug === slug || p.id === slug) || null;
}

/**
 * Salva ou atualiza uma publicação
 */
export async function salvarPublicacao(
  post: Omit<
    PublicacaoComunidade,
    "id" | "criadoEm" | "atualizadoEm" | "visualizacoes"
  > & {
    id?: string;
    visualizacoes?: number;
    criadoEm?: string;
  }
): Promise<PublicacaoComunidade> {
  const posts = await postsStore.readAll();

  const agora = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const id =
    post.id || `PUB-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const postCompleto: PublicacaoComunidade = {
    ...post,
    id,
    visualizacoes: post.visualizacoes || 0,
    criadoEm: post.criadoEm || agora,
    atualizadoEm: agora,
  };

  const idx = posts.findIndex((p) => p.id === id);
  if (idx >= 0) {
    posts[idx] = { ...posts[idx], ...postCompleto };
  } else {
    posts.unshift(postCompleto);
  }

  await postsStore.writeAll(posts);

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
          imagem_capa_url: postCompleto.imagemCapa || null,
          fotos_galeria: postCompleto.fotosGaleria || [],
          arquivos_anexos: postCompleto.anexos || [],
          embeds_sociais: postCompleto.embeds || [],
          status: postCompleto.status,
          destaque: postCompleto.destaque || false,
          visualizacoes: postCompleto.visualizacoes,
          criado_em: postCompleto.criadoEm,
          atualizado_em: postCompleto.atualizadoEm,
        }),
        2000
      );
    } catch {
      // Mantido seguro no repositório híbrido local
    }
  }

  return postCompleto;
}

export const salvarPublicacaoComunidade = salvarPublicacao;

/**
 * Exclui uma publicação verificando titularidade do templo ou permissão de administrador
 */
export async function deletarPublicacao(
  id: string,
  temploCodigo: string,
  isAdmin = false
): Promise<boolean> {
  let posts = await postsStore.readAll();

  const post = posts.find((p) => p.id === id);
  if (!post) return false;

  if (!isAdmin && post.temploCodigo.toUpperCase() !== temploCodigo.toUpperCase()) {
    return false;
  }

  posts = posts.filter((p) => p.id !== id);
  await postsStore.writeAll(posts);

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      await withTimeout(
        supabase.from("publicacoes_comunidade").delete().eq("id", id),
        2000
      );
    } catch {
      // Ignora falha remota
    }
  }

  return true;
}

export const deletarPublicacaoComunidade = deletarPublicacao;

// ══════════════════════════════════════════════════════════
// PERFIS DE TEMPLOS
// ══════════════════════════════════════════════════════════

export async function obterPerfisTemplos(): Promise<PerfilTemploComunidade[]> {
  let perfis = await perfisStore.readAll();

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await withTimeout<{
        data: PerfilRow[] | null;
        error: unknown;
      }>(supabase.from("perfis_comunidade").select("*"), 2000);

      if (!error && data && data.length > 0) {
        const mapa = new Map<string, PerfilTemploComunidade>();
        for (const p of perfis) {
          mapa.set(p.codigoLiturgico.toUpperCase(), p);
        }
        for (const row of data) {
          const mapped = mapRowToPerfil(row);
          mapa.set(mapped.codigoLiturgico.toUpperCase(), mapped);
        }
        perfis = Array.from(mapa.values());
      }
    } catch {
      // Fallback para repositório híbrido local
    }
  }

  const agendaGeral = await obterAgendaLiturgica();

  return perfis.map((p) => ({
    ...p,
    fotoPerfilUrl: p.fotoPerfilUrl?.endsWith(".pdf") ? "" : (p.fotoPerfilUrl || ""),
    agenda: agendaGeral.filter(
      (a) => a.temploCodigo.toUpperCase() === p.codigoLiturgico.toUpperCase()
    ),
  }));
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

export const obterPerfilTemploPorSlug = obterPerfilPorSlugOuCodigo;

export async function salvarPerfilTemplo(
  perfil: PerfilTemploComunidade
): Promise<PerfilTemploComunidade> {
  const perfis = await perfisStore.readAll();

  const idx = perfis.findIndex(
    (p) => p.codigoLiturgico.toUpperCase() === perfil.codigoLiturgico.toUpperCase()
  );

  const agora = new Date().toLocaleDateString("pt-BR");
  const atualizado: PerfilTemploComunidade = {
    ...perfil,
    fotoPerfilUrl: perfil.fotoPerfilUrl?.endsWith(".pdf")
      ? ""
      : (perfil.fotoPerfilUrl || ""),
    atualizadoEm: agora,
  };

  if (idx >= 0) {
    perfis[idx] = atualizado;
  } else {
    perfis.push(atualizado);
  }

  await perfisStore.writeAll(perfis);

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      await withTimeout(
        supabase.from("perfis_comunidade").upsert(mapPerfilToRow(atualizado)),
        2000
      );
    } catch {
      // Mantido seguro no repositório híbrido local
    }
  }

  return atualizado;
}

// ══════════════════════════════════════════════════════════
// AGENDA LITÚRGICA
// ══════════════════════════════════════════════════════════

export async function obterAgendaLiturgica(
  temploCodigo?: string
): Promise<ItemAgendaLiturgica[]> {
  let itens = await agendaStore.readAll();

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await withTimeout<{
        data: AgendaRow[] | null;
        error: unknown;
      }>(supabase.from("agenda_liturgica").select("*"), 2000);

      if (!error && data && data.length > 0) {
        const mapa = new Map<string, ItemAgendaLiturgica>();
        for (const row of data) {
          const mapped = mapRowToAgenda(row);
          mapa.set(mapped.id.toUpperCase(), mapped);
        }
        for (const item of itens) {
          mapa.set(item.id.toUpperCase(), item);
        }
        itens = Array.from(mapa.values());
      }
    } catch {
      // Fallback para repositório híbrido local
    }
  }

  if (temploCodigo) {
    itens = itens.filter(
      (i) => i.temploCodigo.toUpperCase() === temploCodigo.toUpperCase()
    );
  }
  return itens;
}

export async function salvarItemAgenda(
  item: Omit<ItemAgendaLiturgica, "id"> & { id?: string }
): Promise<ItemAgendaLiturgica> {
  const agenda = await agendaStore.readAll();

  const id = item.id || `AGE-${Date.now().toString().slice(-4)}`;
  const itemCompleto: ItemAgendaLiturgica = { ...item, id };

  const idx = agenda.findIndex((i) => i.id === id);
  if (idx >= 0) {
    agenda[idx] = itemCompleto;
  } else {
    agenda.push(itemCompleto);
  }

  await agendaStore.writeAll(agenda);

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      await withTimeout(
        supabase.from("agenda_liturgica").upsert(mapAgendaToRow(itemCompleto)),
        2000
      );
    } catch {
      // Mantido seguro no repositório híbrido local
    }
  }

  return itemCompleto;
}

export async function deletarItemAgenda(
  id: string,
  temploCodigo: string,
  isAdmin = false
): Promise<boolean> {
  let agenda = await agendaStore.readAll();

  const item = agenda.find((i) => i.id === id);
  if (!item) return false;

  if (!isAdmin && item.temploCodigo.toUpperCase() !== temploCodigo.toUpperCase()) {
    return false;
  }

  agenda = agenda.filter((i) => i.id !== id);
  await agendaStore.writeAll(agenda);

  const supabase = getDirectSupabaseClient();
  if (supabase) {
    try {
      await withTimeout(
        supabase.from("agenda_liturgica").delete().eq("id", id),
        2000
      );
    } catch {
      // Ignora falha remota
    }
  }

  return true;
}
