---
tipo: adr
status: em andamento
prioridade: alta
ferramenta_principal: Next.js Route Handlers
para_quem_e: Agentes de IA e Desenvolvedores
categoria: Decisão de Arquitetura
---

# ADR-010: Quem age em nome de qual templo vem só da sessão assinada

## Contexto
A auditoria do plano `plans/012` (2026-11-03) encontrou, com o repositório público no GitHub:
- Login de dirigente aceito sem cadastro quando a chave seguia o formato das chaves geradas, e cadastro homologado sem chave aceitando qualquer valor.
- Qualquer conta do Supabase Auth virando administrador (`modo: "ADMIN"` no corpo, "adm" no e-mail ou `user_metadata`, que o próprio usuário edita).
- Cookie de sessão assinado com a chave pública (anon) ou com um valor escrito no código quando faltava `ADMIN_SECRET_KEY`.
- Rotas de comunidade e pedidos sem autenticação, usando o `temploCodigo` enviado pelo navegador; pedidos com telefone, e-mail e CNPJ legíveis por qualquer visitante.
- Formulário público de credenciamento sobrescrevendo cadastro existente pelo `id`.
- Migração `005` criando DELETE aberto a todos os papéis.

## Decisão
1. **Titular da requisição:** `resolverTitularDaRequisicao()` em `src/lib/auth/session.ts`. Conselho (ADMIN) pode agir por qualquer templo; dirigente age só pelo templo gravado no cookie assinado; visitante recebe 401. Usado em `api/comunidade/{posts,posts/[id],agenda,perfis}` e `api/pedidos/{,[id]}`.
2. **Papel no Supabase Auth:** `resolverPapelSupabase()` em `src/lib/auth/papel.ts`. ADMIN só com `app_metadata.role = "admin"` ou e-mail da lista do Conselho; DIRIGENTE só com `app_metadata.codigo_liturgico`. `app_metadata` só é gravado pelo servidor/painel do Supabase.
3. **Segredo de sessão:** `ADMIN_SECRET_KEY`, ou a service role do Supabase. Sem nenhum dos dois em produção, nenhuma sessão é emitida ou aceita.
4. **Login de dirigente:** só cadastro existente, HOMOLOGADO e com chave gerada. O painel admin não "homologa localmente" quando a API falha e não guarda chaves no `localStorage`.
5. **Credenciamento público:** só cria (409 se o protocolo existe); `loginGerado` não aparece para visitantes.
6. **Migrações:** `005` marcada como obsoleta; `006` remove as políticas dela. O teste de RLS lê todas as migrações e exige `FOR SELECT` e `TO` em toda política.
7. **Testes nunca tocam o Supabase de produção:** `NATIVARAM_TEST=1` faz `isSupabaseConfigured()` devolver `false`.

## Consequências
- ✅ 8 testes novos em `scripts/test-liturgico.mjs`, incluindo chamadas reais aos handlers das rotas (`importarRota`).
- ⚠️ Contas de dirigente no Supabase Auth precisam de `app_metadata.codigo_liturgico`; contas de admin, de `app_metadata.role = "admin"` (ou e-mail na lista do Conselho). Sem isso, caem na validação por código e chave.
- ⚠️ Dirigente com cookie expirado (12 h) recebe 401 ao publicar ou pedir; precisa entrar de novo.
- ⚠️ Em produção sem `ADMIN_SECRET_KEY` e sem service role, o login falha (fechado de propósito).
- Substitui o trecho de "resiliência de sessão" do [[ADR-005-Persistencia-Nuvem-Supabase-e-Auth]].

## Pendente (plano 012)
- Valor do pedido recalculado no servidor (depende do Pacote C, cálculo de rateio).
- Exclusão de instituição durável entre instâncias da Vercel (Pacote B2).

---

## Relações

### Depende de
- [[ADR-005-Persistencia-Nuvem-Supabase-e-Auth]]
- [[ADR-008-RLS-Fechado-e-Service-Role-Obrigatoria]]

### Alimenta / impulsiona
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]
- [[Indice-de-Recuperacao-Rapida]]
- [[Roadmap-e-Componentes-do-Site]]
