import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  obterPerfilPorSlugOuCodigo,
  obterPublicacoesComunidade,
} from "@/lib/db/comunidade";
import { PerfilTemploClient } from "@/components/comunidade/PerfilTemploClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const perfil = await obterPerfilPorSlugOuCodigo(slug);

  if (!perfil) {
    return {
      title: "Templo Não Encontrado | Cooperativa Nativaram",
    };
  }

  return {
    title: `${perfil.nomeInstituicao} — ${perfil.linhagem} | Cooperativa Nativaram`,
    description: `Perfil institucional de ${perfil.nomeInstituicao} (${perfil.cidade}/${perfil.estado}). Agenda litúrgica, fotos do espaço sagrado e publicações amparadas no CONAD 01/2010.`,
    openGraph: {
      title: `${perfil.nomeInstituicao} | Cooperativa Nativaram`,
      description: perfil.bioApresentacao.slice(0, 160),
    },
  };
}

export default async function PerfilTemploPage({ params }: Props) {
  const { slug } = await params;
  const perfil = await obterPerfilPorSlugOuCodigo(slug);

  if (!perfil) {
    notFound();
  }

  const posts = await obterPublicacoesComunidade({
    temploCodigo: perfil.codigoLiturgico,
  });

  return <PerfilTemploClient perfil={perfil} posts={posts} />;
}
