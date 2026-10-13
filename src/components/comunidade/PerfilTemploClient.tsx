"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building,
  MapPin,
  Calendar,
  Share2,
  BookOpen,
  MessageCircle,
  Globe,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  X,
  FileText,
} from "lucide-react";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import {
  PerfilTemploComunidade,
  PublicacaoComunidade,
  ItemAgendaLiturgica,
} from "@/types/comunidade";
import { PageHero } from "@/components/ui/PageHero";
import { SectionDivider } from "@/components/ui/SectionDivider";

interface Props {
  perfil: PerfilTemploComunidade;
  posts: PublicacaoComunidade[];
}

export const PerfilTemploClient: React.FC<Props> = ({ perfil, posts }) => {
  const [selectedFotoModal, setSelectedFotoModal] = useState<string | null>(null);

  const telefoneLimpo = (perfil.whatsappContato || "").replace(/\D/g, "");
  const whatsappUrl = telefoneLimpo
    ? `https://wa.me/${telefoneLimpo}?text=${encodeURIComponent(
        `Olá, encontrei o perfil do ${perfil.nomeInstituicao} através da Cooperativa Nativaram e gostaria de orientações sobre os ritos.`
      )}`
    : null;

  return (
    <div className="space-y-0 animate-fade-in">
      {/* ═══════════════════════════════════════════
          HERO DO TEMPLO & HOMOLOGAÇÃO LITÚRGICA
          ═══════════════════════════════════════════ */}
      <PageHero
        badgeIcon={<ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />}
        badgeText={`Homologação Litúrgica Oficial • ${perfil.codigoLiturgico}`}
        maxWidth="max-w-4xl"
        title={
          <>
            {perfil.nomeInstituicao}
            <br />
            <span className="text-gradient-solar text-xl sm:text-3xl font-serif">
              {perfil.linhagem}
            </span>
          </>
        }
        description={`Dirigente: ${perfil.dirigenteResponsavel} • ${perfil.cidade}, ${perfil.estado}. Casa de acolhimento e consagração litúrgica amparada na Resolução CONAD nº 01/2010.`}
      />

      <SectionDivider variant="solar" />

      {/* ═══════════════════════════════════════════
          CONTEÚDO PRINCIPAL DO PERFIL
          ═══════════════════════════════════════════ */}
      <section className="py-section-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Barra de Navegação de Retorno */}
          <div className="flex items-center justify-between">
            <Link
              href="/estudos"
              className="inline-flex items-center gap-2 text-xs font-semibold text-ambar-400 hover:text-ambar-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Mural da Comunidade</span>
            </Link>

            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
              ✓ Credenciamento Ativo
            </span>
          </div>

          {/* Grid Principal: Bio + Contatos Rápidos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna 1 & 2: Apresentação e Galeria do Espaço */}
            <div className="lg:col-span-2 space-y-8">
              {/* Card de Apresentação Doutrinária */}
              <div className="card-elevated rounded-3xl p-6 sm:p-8 space-y-4 border-ambar-500/25 bg-floresta-950/90">
                <div className="flex items-center gap-2 border-b border-ambar-500/15 pb-3">
                  <Building className="h-5 w-5 text-ambar-400" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-areia-100">
                    História, Missão & Linha Espiritual
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-areia-200 leading-relaxed font-light whitespace-pre-line">
                  {perfil.bioApresentacao}
                </p>

                <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-areia-400">
                  <span className="bg-floresta-900 px-3 py-1 rounded-lg border border-ambar-500/20">
                    🏛️ Linhagem: {perfil.linhagem}
                  </span>
                  <span className="bg-floresta-900 px-3 py-1 rounded-lg border border-ambar-500/20">
                    📍 {perfil.cidade}/{perfil.estado}
                  </span>
                </div>
              </div>

              {/* Galeria de Fotos do Espaço Sagrado / Altar */}
              {perfil.fotosEspaco.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-serif text-lg font-bold text-areia-100 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-ambar-400" />
                    <span>Registros do Espaço Litúrgico & Altar</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {perfil.fotosEspaco.map((foto, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedFotoModal(foto)}
                        className="cursor-pointer group relative h-56 rounded-2xl overflow-hidden bg-floresta-950 border border-ambar-500/25 shadow-elevated"
                      >
                        <img
                          src={foto}
                          alt="Espaço do templo"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-floresta-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs font-semibold text-areia-100 bg-floresta-900/90 px-3 py-1.5 rounded-lg border border-ambar-500/40">
                            Ampliar Foto
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Publicações Desta Congregação */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between border-b border-ambar-500/15 pb-3">
                  <h4 className="font-serif text-lg font-bold text-areia-100 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-ambar-400" />
                    <span>Estudos & Reflexões Publicadas ({posts.length})</span>
                  </h4>
                </div>

                {posts.length === 0 ? (
                  <p className="text-xs text-areia-400 italic">
                    Este templo ainda não possui publicações abertas no mural.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="card-elevated rounded-2xl p-5 sm:p-6 bg-floresta-950/80 border border-ambar-500/20 space-y-3 hover:border-ambar-500/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-ambar-300 bg-ambar-500/15 px-2 py-0.5 rounded">
                            {post.categoriaLabel}
                          </span>
                          <span className="text-[11px] text-areia-400 font-mono">
                            {post.criadoEm}
                          </span>
                        </div>

                        <h5 className="font-serif text-base sm:text-lg font-bold text-areia-100">
                          {post.titulo}
                        </h5>

                        <p className="text-xs text-areia-300 font-light leading-relaxed">
                          {post.resumo}
                        </p>

                        <div className="pt-2 border-t border-ambar-500/10 flex items-center justify-between">
                          <span className="text-[11px] text-areia-400 font-mono">
                            {post.visualizacoes} leituras
                          </span>
                          <Link
                            href={`/estudos#${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs text-ambar-400 hover:text-ambar-300 font-semibold"
                          >
                            <span>Ler no Mural</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Coluna 3: Agenda de Ritos & Contatos Oficiais */}
            <div className="space-y-8">
              {/* Card de Contato Direto */}
              <div className="card-elevated rounded-3xl p-6 sm:p-7 space-y-5 border-2 border-ambar-500/30 bg-gradient-to-br from-floresta-900 to-floresta-950">
                <div className="border-b border-ambar-500/20 pb-3">
                  <h4 className="font-serif text-base font-bold text-areia-100">
                    Canais de Acolhimento & Triagem
                  </h4>
                  <p className="text-[11px] text-areia-300 font-light mt-0.5">
                    Entre em contato com o dirigente responsável para informações de anamnese.
                  </p>
                </div>

                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs font-semibold px-4 py-3 w-full inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Falar no WhatsApp do Templo</span>
                  </a>
                )}

                <div className="space-y-2 pt-2 border-t border-ambar-500/15">
                  {perfil.redesSociais.instagram && (
                    <a
                      href={perfil.redesSociais.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-floresta-950 border border-ambar-500/20 text-xs text-areia-200 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <InstagramIcon className="h-4 w-4" />
                        <span>Instagram Oficial</span>
                      </span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  )}

                  {perfil.redesSociais.youtube && (
                    <a
                      href={perfil.redesSociais.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-floresta-950 border border-ambar-500/20 text-xs text-areia-200 hover:text-red-400 hover:border-red-500/40 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <YouTubeIcon className="h-4 w-4" />
                        <span>Canal no YouTube</span>
                      </span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  )}

                  {perfil.redesSociais.website && (
                    <a
                      href={perfil.redesSociais.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-floresta-950 border border-ambar-500/20 text-xs text-areia-200 hover:text-ambar-300 hover:border-ambar-500/40 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Website Institucional</span>
                      </span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  )}
                </div>
              </div>

              {/* Agenda Litúrgica de Encontros */}
              <div className="card-elevated rounded-3xl p-6 sm:p-7 space-y-4 border-ambar-500/25 bg-floresta-950/90">
                <div className="flex items-center gap-2 border-b border-ambar-500/15 pb-3">
                  <Calendar className="h-5 w-5 text-ambar-400" />
                  <h4 className="font-serif text-base font-bold text-areia-100">
                    Calendário de Ritos & Encontros
                  </h4>
                </div>

                {perfil.agenda.length === 0 ? (
                  <p className="text-xs text-areia-400 italic">
                    Nenhum encontro litúrgico aberto no calendário para as próximas semanas.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {perfil.agenda.map((rito) => (
                      <div
                        key={rito.id}
                        className="p-3.5 rounded-xl bg-floresta-900/60 border border-ambar-500/20 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-ambar-400">
                          <span>📅 {rito.dataEvento} • {rito.horarioInicio}</span>
                          <span className="text-emerald-400">Confirmado</span>
                        </div>

                        <h6 className="font-serif font-bold text-areia-100">
                          {rito.tituloRito}
                        </h6>

                        {rito.descricao && (
                          <p className="text-areia-300 text-[11px] font-light">
                            {rito.descricao}
                          </p>
                        )}

                        {rito.vagasInfo && (
                          <span className="text-[10px] text-amber-300/80 font-mono block">
                            ⚠️ {rito.vagasInfo}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Aviso Deontológico CONAD */}
              <div className="p-4 rounded-2xl bg-floresta-900/40 border border-ambar-500/20 text-[11px] text-areia-400 leading-relaxed font-light space-y-1">
                <span className="text-amber-400 font-semibold block flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Marco CONAD 01/2010:
                </span>
                <p>
                  As sessões desta congregação são restritas a ritos confessionais. A participação de novos buscadores é condicionada ao preenchimento de ficha de anamnese e observância das regras de segurança integrativa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Foto Ampliada */}
      {selectedFotoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-floresta-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedFotoModal(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border-2 border-ambar-500/40 shadow-solar">
            <img
              src={selectedFotoModal}
              alt="Espaço ampliado"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setSelectedFotoModal(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-floresta-950/80 text-areia-100 hover:bg-floresta-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
