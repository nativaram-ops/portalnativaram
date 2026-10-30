"use client";

import React, { useState, useEffect, useDeferredValue } from "react";
import Link from "next/link";
import {
  FileText,
  PlusCircle,
  Sparkles,
  Calendar,
  Building,
  Image as ImageIcon,
  Share2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Upload,
  Eye,
  Music,
  Globe,
  MessageCircle,
  HelpCircle,
  Send,
  X,
  FileCheck,
} from "lucide-react";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import {
  PublicacaoComunidade,
  PerfilTemploComunidade,
  ItemAgendaLiturgica,
  CategoriaPublicacao,
  AlertaConformidadeLinguagem,
} from "@/types/comunidade";
import { verificarConformidadeTexto } from "@/lib/validators/comunidade";
import { comprimirImagemParaWebP } from "@/lib/utils/image-compressor";

interface Props {
  temploCodigo: string;
  temploNome: string;
  cidade: string;
}

type SubTab = "POSTS" | "NOVO_POST" | "PERFIL" | "AGENDA";

export const PortalComunidadeGestao: React.FC<Props> = ({
  temploCodigo,
  temploNome,
  cidade,
}) => {
  const [subTab, setSubTab] = useState<SubTab>("POSTS");
  const [loading, setLoading] = useState(false);
  const [sucessoMsg, setSucessoMsg] = useState<string | null>(null);
  const [erroMsg, setErroMsg] = useState<string | null>(null);

  // Estados de dados
  const [minhasPublicacoes, setMinhasPublicacoes] = useState<PublicacaoComunidade[]>([]);
  const [meuPerfil, setMeuPerfil] = useState<PerfilTemploComunidade | null>(null);
  const [minhaAgenda, setMinhaAgenda] = useState<ItemAgendaLiturgica[]>([]);

  // Estados do formulário de novo post
  const [postTitulo, setPostTitulo] = useState("");
  const [postCategoria, setPostCategoria] = useState<CategoriaPublicacao>("REFLEXAO_DOUTRINARIA");
  const [postResumo, setPostResumo] = useState("");
  const [postConteudo, setPostConteudo] = useState("");
  const [postImagemCapa, setPostImagemCapa] = useState("");
  const [imagemCompressaoInfo, setImagemCompressaoInfo] = useState<string | null>(null);
  const [socialUrl, setSocialUrl] = useState("");
  const [socialPlataforma, setSocialPlataforma] = useState<"INSTAGRAM" | "YOUTUBE" | "SPOTIFY">("INSTAGRAM");
  const [embeds, setEmbeds] = useState<Array<{ plataforma: any; url: string; titulo?: string }>>([]);
  const [anexoNome, setAnexoNome] = useState("");
  const [anexoUrl, setAnexoUrl] = useState("");
  const [anexos, setAnexos] = useState<Array<{ nome: string; url: string; tipo: any }>>([]);

  // Linter de conformidade CONAD em tempo real
  const [alertasCompliance, setAlertasCompliance] = useState<AlertaConformidadeLinguagem[]>([]);

  // Estados do perfil
  const [perfilBio, setPerfilBio] = useState("");
  const [perfilLinhagem, setPerfilLinhagem] = useState("Linha do Santo Daime");
  const [perfilInstagram, setPerfilInstagram] = useState("");
  const [perfilYoutube, setPerfilYoutube] = useState("");
  const [perfilSpotify, setPerfilSpotify] = useState("");
  const [perfilWebsite, setPerfilWebsite] = useState("");
  const [perfilWhatsapp, setPerfilWhatsapp] = useState("");

  // Estados da agenda
  const [ritoTitulo, setRitoTitulo] = useState("");
  const [ritoData, setRitoData] = useState("");
  const [ritoHorario, setRitoHorario] = useState("");
  const [ritoVagas, setRitoVagas] = useState("Vagas limitadas mediante anamnese CONAD");
  const [ritoDescricao, setRitoDescricao] = useState("");

  // Carregar dados iniciais
  useEffect(() => {
    carregarDados();
  }, [temploCodigo]);

  // Executar linter léxico com useDeferredValue sempre que o título, resumo ou conteúdo mudar
  const textoCombinado = useDeferredValue(`${postTitulo} ${postResumo} ${postConteudo}`);
  useEffect(() => {
    const alertas = verificarConformidadeTexto(textoCombinado);
    setAlertasCompliance(alertas);
  }, [textoCombinado]);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [resPosts, resPerfil, resAgenda] = await Promise.all([
        fetch(`/api/comunidade/posts?temploCodigo=${encodeURIComponent(temploCodigo)}&todosStatus=true`),
        fetch(`/api/comunidade/perfis?codigo=${encodeURIComponent(temploCodigo)}`),
        fetch(`/api/comunidade/agenda?temploCodigo=${encodeURIComponent(temploCodigo)}`),
      ]);

      const [dataPosts, dataPerfil, dataAgenda] = await Promise.all([
        resPosts.json(),
        resPerfil.json(),
        resAgenda.json(),
      ]);

      if (dataPosts.success) {
        setMinhasPublicacoes(dataPosts.posts);
      }

      if (dataPerfil.success && dataPerfil.perfil) {
        const p = dataPerfil.perfil;
        setMeuPerfil(p);
        setPerfilBio(p.bioApresentacao || "");
        setPerfilLinhagem(p.linhagem || "Linha do Santo Daime");
        setPerfilInstagram(p.redesSociais?.instagram || "");
        setPerfilYoutube(p.redesSociais?.youtube || "");
        setPerfilSpotify(p.redesSociais?.spotify || "");
        setPerfilWebsite(p.redesSociais?.website || "");
        setPerfilWhatsapp(p.whatsappContato || "");
      }

      if (dataAgenda.success) {
        setMinhaAgenda(dataAgenda.agenda);
      }
    } catch (err) {
      console.warn("Erro ao carregar dados da comunidade:", err);
    } finally {
      setLoading(false);
    }
  };

  // Upload e compressão automática de imagem para WebP
  const handleUploadFotoCapa = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const tamanhoOriginalKb = Math.round(file.size / 1024);
      setImagemCompressaoInfo("Otimizando e convertendo para WebP...");

      const webpDataUrl = await comprimirImagemParaWebP(file, {
        maxWidth: 1600,
        quality: 0.82,
      });

      // Calcular tamanho aproximado do dataUrl
      const tamanhoWebpKb = Math.round((webpDataUrl.length * 3) / 4 / 1024);
      setPostImagemCapa(webpDataUrl);
      setImagemCompressaoInfo(
        `✓ Imagem reduzida de ${tamanhoOriginalKb} KB para ${tamanhoWebpKb} KB (WebP de alta fidelidade)`
      );
    } catch (err: any) {
      setErroMsg("Erro ao processar imagem: " + (err.message || "Tente outro arquivo."));
    }
  };

  // Adicionar embed social
  const handleAdicionarEmbed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialUrl.trim()) return;
    setEmbeds((prev) => [...prev, { plataforma: socialPlataforma, url: socialUrl.trim() }]);
    setSocialUrl("");
  };

  // Adicionar anexo
  const handleAdicionarAnexo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anexoNome.trim() || !anexoUrl.trim()) return;
    setAnexos((prev) => [...prev, { nome: anexoNome.trim(), url: anexoUrl.trim(), tipo: "PDF" }]);
    setAnexoNome("");
    setAnexoUrl("");
  };

  // Publicar post
  const handlePublicarPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroMsg(null);
    setSucessoMsg(null);

    if (!postTitulo.trim() || !postResumo.trim() || !postConteudo.trim()) {
      setErroMsg("Preencha título, resumo e o conteúdo da publicação.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/comunidade/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          temploCodigo,
          temploNome,
          titulo: postTitulo,
          resumo: postResumo,
          conteudoMarkdown: postConteudo,
          categoria: postCategoria,
          imagemCapa: postImagemCapa || undefined,
          anexos,
          embeds,
          status: "PUBLICADO",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erro ao publicar");
      }

      setSucessoMsg("Publicação transmitida com sucesso para o mural público!");
      // Limpar formulário
      setPostTitulo("");
      setPostResumo("");
      setPostConteudo("");
      setPostImagemCapa("");
      setImagemCompressaoInfo(null);
      setEmbeds([]);
      setAnexos([]);
      setSubTab("POSTS");
      await carregarDados();
    } catch (err: any) {
      setErroMsg(err.message || "Falha ao gravar publicação.");
    } finally {
      setLoading(false);
    }
  };

  // Excluir post
  const handleExcluirPost = async (id: string) => {
    if (!confirm("Deseja realmente remover esta publicação do mural da comunidade?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/comunidade/posts/${id}?temploCodigo=${encodeURIComponent(temploCodigo)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMinhasPublicacoes((prev) => prev.filter((p) => p.id !== id));
        setSucessoMsg("Publicação removida com sucesso.");
      }
    } catch {
      setErroMsg("Erro ao remover publicação.");
    } finally {
      setLoading(false);
    }
  };

  // Salvar perfil do templo
  const handleSalvarPerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErroMsg(null);
    try {
      const res = await fetch("/api/comunidade/perfis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigoLiturgico: temploCodigo,
          nomeInstituicao: temploNome,
          dirigenteResponsavel: meuPerfil?.dirigenteResponsavel || "Dirigente",
          linhagem: perfilLinhagem,
          cidade,
          estado: meuPerfil?.estado || "SP",
          bioApresentacao: perfilBio,
          redesSociais: {
            instagram: perfilInstagram || undefined,
            youtube: perfilYoutube || undefined,
            spotify: perfilSpotify || undefined,
            website: perfilWebsite || undefined,
          },
          whatsappContato: perfilWhatsapp || undefined,
          publicado: true,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSucessoMsg("Perfil público do templo atualizado com sucesso!");
      await carregarDados();
    } catch (err: any) {
      setErroMsg("Erro ao salvar perfil: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Salvar rito na agenda
  const handleAdicionarRito = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ritoTitulo.trim() || !ritoData || !ritoHorario) {
      setErroMsg("Preencha o título do rito, a data e o horário.");
      return;
    }

    setLoading(true);
    setErroMsg(null);
    try {
      const res = await fetch("/api/comunidade/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          temploCodigo,
          tituloRito: ritoTitulo,
          dataEvento: ritoData,
          horarioInicio: ritoHorario,
          vagasInfo: ritoVagas,
          descricao: ritoDescricao,
          status: "CONFIRMADO",
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setSucessoMsg("Rito agendado no calendário litúrgico!");
      setRitoTitulo("");
      setRitoData("");
      setRitoHorario("");
      setRitoDescricao("");
      await carregarDados();
    } catch (err: any) {
      setErroMsg("Erro ao agendar rito: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Remover rito
  const handleRemoverRito = async (id: string) => {
    if (!confirm("Remover este rito da agenda?")) return;
    try {
      const res = await fetch(`/api/comunidade/agenda?id=${id}&temploCodigo=${encodeURIComponent(temploCodigo)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMinhaAgenda((prev) => prev.filter((a) => a.id !== id));
      }
    } catch {
      setErroMsg("Erro ao remover rito.");
    }
  };

  // Substituição automática com base no linter de compliance
  const aplicarSugestaoCompliance = (termoDetectado: string, sugestaoAprovada: string) => {
    const substituir = (texto: string) => {
      const regex = new RegExp(`\\b${termoDetectado}\\b`, "gi");
      return texto.replace(regex, sugestaoAprovada.split(",")[0].trim());
    };
    setPostTitulo(substituir(postTitulo));
    setPostResumo(substituir(postResumo));
    setPostConteudo(substituir(postConteudo));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ═══════════════════════════════════════════
          CABEÇALHO DA ABA & NAVEGAÇÃO DE SUB-ABAS
          ═══════════════════════════════════════════ */}
      <div className="card-elevated rounded-2xl p-6 sm:p-8 border-ambar-500/30 bg-gradient-to-br from-floresta-950 via-floresta-900 to-floresta-950 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-ambar-500/15 border border-ambar-500/30 px-3 py-1 text-[11px] font-semibold text-ambar-300 uppercase tracking-widest">
              <Share2 className="h-3.5 w-3.5 text-ambar-400" />
              <span>Comunidade Litúrgica & Vozes da Floresta</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-areia-100">
              Gestão de Conteúdo, Perfil & Ritos
            </h3>
            <p className="text-xs sm:text-sm text-areia-300 font-light max-w-2xl">
              Publique reflexões, fotos do seu espaço sagrado, anexe estudos e divulgue os ritos da congregação no mural público do portal, visível para todos os visitantes e cooperados.
            </p>
          </div>

          {meuPerfil?.slug && (
            <Link
              href={`/estudos/comunidade/${meuPerfil.slug}`}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ambar-500/20 hover:bg-ambar-500/30 text-ambar-300 px-4 py-2.5 text-xs font-semibold border border-ambar-500/40 transition-colors shrink-0"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Ver Perfil Público</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </Link>
          )}
        </div>

        {/* Notificações de Sucesso / Erro */}
        {sucessoMsg && (
          <div className="rounded-xl p-4 bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-between gap-3 text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{sucessoMsg}</span>
            </div>
            <button onClick={() => setSucessoMsg(null)} className="text-emerald-400 hover:text-emerald-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {erroMsg && (
          <div className="rounded-xl p-4 bg-red-950/80 border border-red-500/40 flex items-center justify-between gap-3 text-xs text-red-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
              <span>{erroMsg}</span>
            </div>
            <button onClick={() => setErroMsg(null)} className="text-red-400 hover:text-red-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Fita de Sub-Abas Otimizada para Mobile com Touch Inércia */}
        <div className="flex overflow-x-auto touch-scroll-x sm:flex-wrap items-center gap-2 pt-2 border-t border-ambar-500/15">
          {[
            { id: "POSTS" as const, label: `Minhas Publicações (${minhasPublicacoes.length})`, icon: FileText },
            { id: "NOVO_POST" as const, label: "Nova Publicação", icon: PlusCircle, destaque: true },
            { id: "PERFIL" as const, label: "Perfil & Espaço Sagrado", icon: Building },
            { id: "AGENDA" as const, label: `Agenda de Ritos (${minhaAgenda.length})`, icon: Calendar },
          ].map(({ id, label, icon: Icon, destaque }) => {
            const isSelected = subTab === id;
            return (
              <button
                key={id}
                onClick={() => setSubTab(id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? "bg-ambar-500 text-floresta-950 shadow-solar font-bold scale-[1.02]"
                    : destaque
                    ? "bg-ambar-500/15 text-ambar-300 border border-ambar-500/30 hover:bg-ambar-500/25"
                    : "bg-floresta-900/60 border border-ambar-500/20 text-areia-300 hover:border-ambar-500/40 hover:text-areia-100"
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? "text-floresta-950" : "text-ambar-400"}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SUB-ABA 1: MINHAS PUBLICAÇÕES
          ═══════════════════════════════════════════ */}
      {subTab === "POSTS" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-lg font-bold text-areia-100 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-ambar-400" />
              <span>Publicações Transmitidas pela Congregação</span>
            </h4>
            <button
              onClick={() => setSubTab("NOVO_POST")}
              className="btn-primary text-xs font-semibold px-4 py-2 inline-flex items-center gap-1.5"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Escrever Nova Publicação</span>
            </button>
          </div>

          {minhasPublicacoes.length === 0 ? (
            <div className="card-elevated rounded-2xl p-12 text-center space-y-4">
              <Share2 className="h-12 w-12 text-ambar-400/40 mx-auto" />
              <h5 className="font-serif text-base font-semibold text-areia-200">
                Sua congregação ainda não possui publicações registradas
              </h5>
              <p className="text-xs text-areia-400 max-w-md mx-auto">
                Compartilhe reflexões de cerimônias, relatos de consagração botânica ou avisos com toda a comunidade do portal.
              </p>
              <button
                onClick={() => setSubTab("NOVO_POST")}
                className="btn-primary text-xs font-semibold px-5 py-2.5"
              >
                Criar Primeira Publicação
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {minhasPublicacoes.map((post) => (
                <div
                  key={post.id}
                  className="card-elevated rounded-2xl p-6 bg-floresta-950/80 border border-ambar-500/20 flex flex-col justify-between space-y-4 hover:border-ambar-500/40 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-ambar-500/10 pb-2">
                      <span className="text-[10px] font-mono text-ambar-300 bg-ambar-500/15 px-2 py-0.5 rounded border border-ambar-500/25">
                        {post.categoriaLabel}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-areia-400 font-mono">
                        <span>{post.criadoEm}</span>
                        <span>•</span>
                        <span>{post.visualizacoes} leituras</span>
                      </div>
                    </div>

                    <h5 className="font-serif text-lg font-bold text-areia-100 leading-snug">
                      {post.titulo}
                    </h5>
                    <p className="text-xs text-areia-300 font-light line-clamp-2">
                      {post.resumo}
                    </p>

                    {post.imagemCapa && (
                      <div className="h-32 w-full rounded-xl overflow-hidden bg-floresta-900 border border-ambar-500/15">
                        <img
                          src={post.imagemCapa}
                          alt={post.titulo}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-ambar-500/10">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>{post.status}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/estudos#${post.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs text-ambar-400 hover:text-ambar-300 px-3 py-1.5 rounded-lg border border-ambar-500/20 hover:bg-floresta-900"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Ver no Mural</span>
                      </Link>
                      <button
                        onClick={() => handleExcluirPost(post.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                        title="Remover publicação"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════
          SUB-ABA 2: NOVA PUBLICAÇÃO (EDITOR + COMPLIANCE)
          ═══════════════════════════════════════════ */}
      {subTab === "NOVO_POST" && (
        <form onSubmit={handlePublicarPost} className="card-elevated rounded-2xl p-6 sm:p-8 space-y-6 border-ambar-500/30 bg-floresta-950/90">
          <div className="border-b border-ambar-500/15 pb-4 space-y-1">
            <h4 className="font-serif text-xl font-bold text-areia-100 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-ambar-400" />
              <span>Redigir Nova Publicação para o Mural Aberto</span>
            </h4>
            <p className="text-xs text-areia-400 font-light">
              Compartilhe a sabedoria da sua congregação. O sistema audita termos médicos em tempo real para proteção jurídica CONAD.
            </p>
          </div>

          {/* Banner do Linter de Conformidade CONAD em Tempo Real */}
          {alertasCompliance.length > 0 ? (
            <div className="rounded-2xl p-5 bg-amber-950/70 border-2 border-amber-500/50 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-serif text-sm font-bold">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span>Aviso de Conformidade CONAD 01/2010 (Termos Sensíveis Detectados)</span>
              </div>
              <p className="text-xs text-areia-300 leading-relaxed font-light">
                Para manter a salvaguarda legal da cooperativa e do seu templo, evite alegações médicas ou de comércio. O sistema sugere as seguintes substituições canônicas:
              </p>
              <div className="space-y-2 pt-1">
                {alertasCompliance.map((alerta, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-floresta-950/80 border border-amber-500/30 text-xs"
                  >
                    <div>
                      <span className="font-mono text-red-400 font-bold uppercase mr-2">
                        &ldquo;{alerta.termoDetectado}&rdquo;
                      </span>
                      <span className="text-areia-300">
                        Substituir por: <strong className="text-emerald-300">{alerta.sugestaoAprovada}</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => aplicarSugestaoCompliance(alerta.termoDetectado, alerta.sugestaoAprovada)}
                      className="btn-secondary text-[11px] py-1 px-3 self-end sm:self-auto shrink-0"
                    >
                      Aplicar Sugestão
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl p-3 bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Conformidade Litúrgica: Nenhum termo sensível detectado no texto.</span>
            </div>
          )}

          {/* Campos Básicos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-mono text-ambar-300 uppercase tracking-wider block">
                Título da Publicação *
              </label>
              <input
                type="text"
                value={postTitulo}
                onChange={(e) => setPostTitulo(e.target.value)}
                placeholder="Ex: O Silêncio da Floresta e a Firmeza no Rito Tradicional..."
                className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-3 text-base sm:text-sm text-areia-100 placeholder-areia-400/40 focus:border-ambar-400 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-ambar-300 uppercase tracking-wider block">
                Categoria Litúrgica *
              </label>
              <select
                value={postCategoria}
                onChange={(e) => setPostCategoria(e.target.value as any)}
                className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-3 text-base sm:text-sm text-areia-100 focus:border-ambar-400 focus:outline-none"
              >
                <option value="REFLEXAO_DOUTRINARIA">Reflexão Doutrinária</option>
                <option value="RELATO_VIVENCIA">Relato de Vivência</option>
                <option value="BOTANICA_TRADICIONAL">Botânica Tradicional</option>
                <option value="ARTE_E_POESIA">Arte & Poesia Sacra</option>
                <option value="COMUNICADO_LITURGICO">Comunicado Litúrgico</option>
                <option value="ESTUDO_ETNOFARMACEUTICO">Estudo Fitoquímico</option>
              </select>
            </div>
          </div>

          {/* Resumo */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-ambar-300 uppercase tracking-wider block">
              Resumo Breve (Exibido no Card do Mural) *
            </label>
            <textarea
              rows={2}
              value={postResumo}
              onChange={(e) => setPostResumo(e.target.value)}
              placeholder="Síntese de 2 a 3 linhas que resume o propósito deste compartilhamento..."
              className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-3 text-base sm:text-sm text-areia-100 placeholder-areia-400/40 focus:border-ambar-400 focus:outline-none"
              required
            />
          </div>

          {/* Imagem de Capa com Compressão WebP Automática */}
          <div className="rounded-2xl p-5 bg-floresta-900/60 border border-ambar-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-ambar-300 uppercase tracking-wider">
                <ImageIcon className="h-4 w-4 text-ambar-400" />
                <span>Foto de Capa do Post (Compressão WebP Automática)</span>
              </div>
              <span className="text-[11px] text-areia-400 font-mono">
                Preserva plano grátis & mobile
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-floresta-800 hover:bg-floresta-700 text-areia-100 px-4 py-3 text-xs font-semibold border border-ambar-500/30 transition-colors w-full sm:w-auto justify-center">
                <Upload className="h-4 w-4 text-ambar-400" />
                <span>Escolher Imagem (Celular ou PC)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadFotoCapa}
                  className="hidden"
                />
              </label>

              {imagemCompressaoInfo && (
                <span className="text-xs text-emerald-400 font-mono">{imagemCompressaoInfo}</span>
              )}
            </div>

            {postImagemCapa && (
              <div className="relative h-44 w-full max-w-md rounded-xl overflow-hidden border border-ambar-500/30">
                <img
                  src={postImagemCapa}
                  alt="Prévia da capa"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPostImagemCapa("");
                    setImagemCompressaoInfo(null);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-950/80 text-red-300 hover:bg-red-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Conteúdo Completo */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-ambar-300 uppercase tracking-wider block">
              Texto Completo do Estudo / Reflexão *
            </label>
            <textarea
              rows={8}
              value={postConteudo}
              onChange={(e) => setPostConteudo(e.target.value)}
              placeholder="Escreva livremente sua mensagem. Você pode usar títulos (# Título), listas e citações (> citação)..."
              className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-3 text-base sm:text-sm text-areia-100 placeholder-areia-400/40 focus:border-ambar-400 focus:outline-none font-sans"
              required
            />
          </div>

          {/* Mídias & Embeds Sociais (Custo Zero de Infraestrutura) */}
          <div className="rounded-2xl p-5 bg-floresta-900/60 border border-ambar-500/20 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-ambar-300 uppercase tracking-wider">
              <Share2 className="h-4 w-4 text-ambar-400" />
              <span>Incorporar Postagem de Outra Rede (Instagram / YouTube / Spotify)</span>
            </div>
            <p className="text-xs text-areia-400 font-light">
              Vídeos e músicas rodam direto da rede de origem, com zero consumo de disco e zero custo para o portal.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={socialPlataforma}
                onChange={(e) => setSocialPlataforma(e.target.value as any)}
                className="rounded-xl border border-ambar-500/30 bg-floresta-950 px-3 py-2 text-xs text-areia-100"
              >
                <option value="INSTAGRAM">Instagram</option>
                <option value="YOUTUBE">YouTube</option>
                <option value="SPOTIFY">Spotify</option>
              </select>
              <input
                type="url"
                value={socialUrl}
                onChange={(e) => setSocialUrl(e.target.value)}
                placeholder="Cole o link da postagem, vídeo ou playlist..."
                className="flex-1 rounded-xl border border-ambar-500/30 bg-floresta-950 px-4 py-2 text-xs text-areia-100 placeholder-areia-400/40"
              />
              <button
                type="button"
                onClick={handleAdicionarEmbed}
                className="btn-secondary text-xs px-4 py-2 shrink-0"
              >
                Adicionar Link
              </button>
            </div>

            {embeds.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono text-ambar-400 uppercase tracking-wider">
                  Mídias Incorporadas:
                </span>
                {embeds.map((emb, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-floresta-950/80 border border-ambar-500/15 text-xs text-areia-200"
                  >
                    <span className="truncate">{emb.plataforma}: {emb.url}</span>
                    <button
                      type="button"
                      onClick={() => setEmbeds((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300 text-xs px-2"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Anexos de Arquivos / NotebookLM */}
          <div className="rounded-2xl p-5 bg-floresta-900/60 border border-ambar-500/20 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-ambar-300 uppercase tracking-wider">
              <FileText className="h-4 w-4 text-ambar-400" />
              <span>Anexar Dossiê, PDF ou Caderno NotebookLM</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={anexoNome}
                onChange={(e) => setAnexoNome(e.target.value)}
                placeholder="Nome do arquivo (ex: Laudo Botânico Tucunacá)"
                className="sm:w-1/3 rounded-xl border border-ambar-500/30 bg-floresta-950 px-4 py-2 text-xs text-areia-100 placeholder-areia-400/40"
              />
              <input
                type="url"
                value={anexoUrl}
                onChange={(e) => setAnexoUrl(e.target.value)}
                placeholder="Link do arquivo (Google Drive / NotebookLM / PDF)"
                className="flex-1 rounded-xl border border-ambar-500/30 bg-floresta-950 px-4 py-2 text-xs text-areia-100 placeholder-areia-400/40"
              />
              <button
                type="button"
                onClick={handleAdicionarAnexo}
                className="btn-secondary text-xs px-4 py-2 shrink-0"
              >
                Anexar
              </button>
            </div>

            {anexos.length > 0 && (
              <div className="space-y-1.5 pt-2">
                {anexos.map((anx, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-floresta-950/80 border border-ambar-500/15 text-xs text-areia-200"
                  >
                    <span>📄 {anx.nome} ({anx.url})</span>
                    <button
                      type="button"
                      onClick={() => setAnexos((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300 text-xs px-2"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botão de Envio */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-ambar-500/15">
            <button
              type="button"
              onClick={() => setSubTab("POSTS")}
              className="btn-secondary text-xs px-5 py-3 w-full sm:w-auto"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-xs font-semibold px-6 py-3 w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>{loading ? "Gravando..." : "Publicar no Mural da Comunidade"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ═══════════════════════════════════════════
          SUB-ABA 3: PERFIL DO TEMPLO & ESPAÇO SAGRADO
          ═══════════════════════════════════════════ */}
      {subTab === "PERFIL" && (
        <form onSubmit={handleSalvarPerfil} className="card-elevated rounded-2xl p-6 sm:p-8 space-y-6 border-ambar-500/30 bg-floresta-950/90">
          <div className="border-b border-ambar-500/15 pb-4 space-y-1">
            <h4 className="font-serif text-xl font-bold text-areia-100 flex items-center gap-2">
              <Building className="h-5 w-5 text-ambar-400" />
              <span>Perfil Institucional & Espaço Sagrado do Templo</span>
            </h4>
            <p className="text-xs text-areia-400 font-light">
              Essas informações formam a página pública do seu templo (`/estudos/comunidade/{meuPerfil?.slug || "seu-templo"}`), permitindo que buscadores conheçam sua linhagem e entrem em contato de forma segura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-ambar-300 uppercase tracking-wider block">
                Nome do Templo / Congregação
              </label>
              <input
                type="text"
                value={temploNome}
                disabled
                className="w-full rounded-xl border border-ambar-500/20 bg-floresta-900/50 px-4 py-3 text-sm text-areia-400 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-ambar-300 uppercase tracking-wider block">
                Linhagem Doutrinária *
              </label>
              <input
                type="text"
                value={perfilLinhagem}
                onChange={(e) => setPerfilLinhagem(e.target.value)}
                placeholder="Ex: Linha do Santo Daime, Xamanismo Universalista, UDV..."
                className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-3 text-sm text-areia-100 focus:border-ambar-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-ambar-300 uppercase tracking-wider block">
              Bio / Apresentação do Templo & Missão Espiritual *
            </label>
            <textarea
              rows={4}
              value={perfilBio}
              onChange={(e) => setPerfilBio(e.target.value)}
              placeholder="Descreva a história da congregação, princípios de acolhimento e a relação de respeito com os sacramentos da floresta..."
              className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-3 text-sm text-areia-100 focus:border-ambar-400 focus:outline-none"
              required
            />
          </div>

          {/* Contatos & Redes */}
          <div className="rounded-2xl p-5 bg-floresta-900/60 border border-ambar-500/20 space-y-4">
            <span className="text-xs font-mono text-ambar-300 uppercase tracking-wider block">
              Canais Oficiais de Contato & Redes Sociais
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-areia-300 flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>WhatsApp de Acolhimento / Triagem</span>
                </label>
                <input
                  type="text"
                  value={perfilWhatsapp}
                  onChange={(e) => setPerfilWhatsapp(e.target.value)}
                  placeholder="5511987654321"
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-950 px-4 py-2.5 text-xs text-areia-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-areia-300 flex items-center gap-1.5">
                  <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
                  <span>Perfil do Instagram</span>
                </label>
                <input
                  type="url"
                  value={perfilInstagram}
                  onChange={(e) => setPerfilInstagram(e.target.value)}
                  placeholder="https://instagram.com/seutemplo"
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-950 px-4 py-2.5 text-xs text-areia-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-areia-300 flex items-center gap-1.5">
                  <YouTubeIcon className="h-3.5 w-3.5 text-red-400" />
                  <span>Canal do YouTube</span>
                </label>
                <input
                  type="url"
                  value={perfilYoutube}
                  onChange={(e) => setPerfilYoutube(e.target.value)}
                  placeholder="https://youtube.com/@seutemplo"
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-950 px-4 py-2.5 text-xs text-areia-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-areia-300 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-amber-400" />
                  <span>Website Próprio / Outro Link</span>
                </label>
                <input
                  type="url"
                  value={perfilWebsite}
                  onChange={(e) => setPerfilWebsite(e.target.value)}
                  placeholder="https://seutemplo.org.br"
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-950 px-4 py-2.5 text-xs text-areia-100"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-xs font-semibold px-6 py-3 inline-flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{loading ? "Salvando..." : "Salvar Perfil Institucional"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ═══════════════════════════════════════════
          SUB-ABA 4: AGENDA LITÚRGICA
          ═══════════════════════════════════════════ */}
      {subTab === "AGENDA" && (
        <div className="space-y-8">
          {/* Formulário de Novo Rito */}
          <form onSubmit={handleAdicionarRito} className="card-elevated rounded-2xl p-6 sm:p-8 space-y-5 border-ambar-500/30 bg-floresta-950/90">
            <div className="border-b border-ambar-500/15 pb-3 space-y-1">
              <h4 className="font-serif text-lg font-bold text-areia-100 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-ambar-400" />
                <span>Agendar Encontro Litúrgico / Cerimônia</span>
              </h4>
              <p className="text-xs text-areia-400 font-light">
                Divulgue as datas dos seus trabalhos para a comunidade. Todos os encontros públicos exibem a exigência de anamnese prévia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[11px] font-mono text-ambar-300 uppercase tracking-wider block">
                  Título do Encontro *
                </label>
                <input
                  type="text"
                  value={ritoTitulo}
                  onChange={(e) => setRitoTitulo(e.target.value)}
                  placeholder="Ex: Hinário de São João / Vigília de Reconexão..."
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-2.5 text-xs text-areia-100"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-ambar-300 uppercase tracking-wider block">
                  Data do Evento *
                </label>
                <input
                  type="date"
                  value={ritoData}
                  onChange={(e) => setRitoData(e.target.value)}
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-2.5 text-xs text-areia-100"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-ambar-300 uppercase tracking-wider block">
                  Horário de Início *
                </label>
                <input
                  type="time"
                  value={ritoHorario}
                  onChange={(e) => setRitoHorario(e.target.value)}
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-2.5 text-xs text-areia-100"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-ambar-300 uppercase tracking-wider block">
                  Aviso de Vagas & Triagem
                </label>
                <input
                  type="text"
                  value={ritoVagas}
                  onChange={(e) => setRitoVagas(e.target.value)}
                  placeholder="Vagas limitadas mediante anamnese"
                  className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-2.5 text-xs text-areia-100"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-ambar-300 uppercase tracking-wider block">
                Orientações aos Participantes (Opcional)
              </label>
              <textarea
                rows={2}
                value={ritoDescricao}
                onChange={(e) => setRitoDescricao(e.target.value)}
                placeholder="Roupas claras, alimentação leve, não ingestão de álcool 72h antes..."
                className="w-full rounded-xl border border-ambar-500/30 bg-floresta-900 px-4 py-2 text-xs text-areia-100"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-xs font-semibold px-5 py-2.5 inline-flex items-center gap-1.5"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Adicionar ao Calendário</span>
              </button>
            </div>
          </form>

          {/* Listagem de Ritos Atuais */}
          <div className="space-y-4">
            <h5 className="font-serif text-base font-bold text-areia-100">
              Próximos Encontros Programados ({minhaAgenda.length})
            </h5>

            {minhaAgenda.length === 0 ? (
              <p className="text-xs text-areia-400 italic">
                Nenhum encontro litúrgico cadastrado na agenda deste templo.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {minhaAgenda.map((rito) => (
                  <div
                    key={rito.id}
                    className="p-5 rounded-2xl bg-floresta-950/80 border border-ambar-500/20 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-ambar-400">
                        <span>📅 {rito.dataEvento} • {rito.horarioInicio}</span>
                        <span className="text-emerald-400">{rito.status}</span>
                      </div>
                      <h6 className="font-serif text-sm font-bold text-areia-100">
                        {rito.tituloRito}
                      </h6>
                      {rito.descricao && (
                        <p className="text-xs text-areia-300 font-light">
                          {rito.descricao}
                        </p>
                      )}
                      {rito.vagasInfo && (
                        <span className="text-[10px] text-ambar-300/80 font-mono block">
                          ⚠️ {rito.vagasInfo}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-end pt-2 border-t border-ambar-500/10">
                      <button
                        onClick={() => handleRemoverRito(rito.id)}
                        className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-950/40 inline-flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Remover Rito</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
