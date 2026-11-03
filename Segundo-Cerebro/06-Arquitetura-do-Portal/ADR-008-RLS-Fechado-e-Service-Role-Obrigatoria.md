---
tipo: adr
status: em andamento
prioridade: alta
ferramenta_principal: Supabase / PostgreSQL
para_quem_e: Agentes de IA e Desenvolvedores
categoria: Decisão de Arquitetura
---

# ADR-008: RLS Fechado nas Tabelas Sensíveis e Service Role Obrigatória no Servidor

## Contexto
A migração `003-politicas-rls-aplicacao.sql` e os scripts `schema.sql` / `schema_comunidade.sql` criavam políticas `USING (true)` de leitura, gravação e remoção. A chave pública (anon) do Supabase vai para o navegador e está no repositório, que é público. Com essas políticas, qualquer pessoa podia ler `solicitacoes_homologacao` (incluindo `login_gerado` e `senha_gerada`), mudar o status de homologação e apagar publicações e agenda de outros templos. Apontado no plano `plans/011`, item 0.

## Decisão
1. **Migração `004-fechar-rls-tabelas-sensiveis.sql`:** remove todas as políticas das seis tabelas da aplicação (via `pg_policies`, independente do nome) e:
   - `solicitacoes_homologacao`, `pedidos_liturgicos`, `templos_credenciados`: nenhuma política pública e `REVOKE ALL` de `anon` e `authenticated`.
   - `publicacoes_comunidade`, `perfis_comunidade`, `agenda_liturgica`: só leitura pública do que está publicado; gravação revogada dos papéis públicos.
2. **O servidor precisa da `SUPABASE_SERVICE_ROLE_KEY`** (variável só de servidor, nunca `NEXT_PUBLIC_*`) para ler e gravar. Sem ela, `getDirectSupabaseClient()` registra erro no log de produção.
3. A `003` fica no repositório marcada como obsoleta; `schema.sql` e `schema_comunidade.sql` foram alinhados à `004` para que reexecutá-los não reabra o acesso.
4. Teste automatizado em `scripts/test-liturgico.mjs` garante que nenhum script SQL crie política de gravação pública ou política em tabela sensível.

## Consequências
- ✅ Dados de homologação, pedidos e credenciais deixam de ser legíveis pela chave pública.
- ⚠️ Substitui o trecho do [[ADR-005-Persistencia-Nuvem-Supabase-e-Auth]] que previa "leitura/gravação resiliente com Anon Key".
- ⚠️ Pré-requisito operacional: `SUPABASE_SERVICE_ROLE_KEY` configurada na Vercel antes de rodar a `004`. Sem ela, gravações caem no fallback local temporário (`os.tmpdir()`), que se perde entre execuções.
- ⚠️ Credenciais de templo geradas antes da `004` devem ser consideradas expostas e regeneradas.

## Atualização 2026-11-03
- A migração `005` (feita depois, para o botão de excluir) criava DELETE `USING (true)` sem `TO`, valendo para todos os papéis. Foi marcada como **obsoleta — não executar**; a `006` remove essas políticas caso já tenham sido criadas. O servidor apaga com a service role, que ignora o RLS. Ver [[ADR-010-Autorizacao-pela-Sessao-nas-APIs]].

## Status de execução
- Código e SQL prontos no repositório (2026-11-02).
- Pendente: confirmar a variável na Vercel, executar a `004` no SQL Editor do Supabase e regenerar credenciais. **A definir:** data de execução.

---

## Relações

### Depende de
- [[ADR-005-Persistencia-Nuvem-Supabase-e-Auth]]
- [[Banco-de-Dados-e-Persistencia-Local]]

### Alimenta / impulsiona
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]
- [[Indice-de-Recuperacao-Rapida]]
