# Plano 012 — Auditoria geral: acesso ao portal, rateio, compliance público e saúde do repositório

- **Escrito contra o commit:** `a80b85e` (2026-11-03). Antes de executar, rode `git log --oneline a80b85e..HEAD` e confira se os arquivos citados mudaram. Se mudaram, releia o trecho antes de editar.
- **Linha de base verificada nesta data:** `npm test` = 90 testes passando (37+27+14+12); `npx tsc --noEmit` exit 0; `npm run lint` 0 erros / 12 avisos; `next build` OK; GitHub Actions verde nos 3 últimos commits.
- **Como foi feito:** 4 frentes de auditoria em paralelo (segurança/backend, front/performance/a11y, propósito/domínio/compliance, testes/DX/excesso de código). Todo achado P0 e P1 abaixo foi conferido no código por quem escreveu este plano.
- **Comandos de verificação (Windows, sempre via cmd):** `cmd.exe /c npm test`, `cmd.exe /c npx tsc --noEmit --incremental false`, `cmd.exe /c npm run lint`, `cmd.exe /c npx next build`.

> **Fato que muda as prioridades:** o repositório `nativaram-ops/portalnativaram` é **PÚBLICO** no GitHub. Tudo o que está versionado (dados em `data/*.json`, `docs/fontes/internos/`, o cofre `Segundo-Cerebro/`) pode ser lido por qualquer pessoa, inclusive no histórico.

---

## 0. Ações humanas imediatas (não são código; ninguém além do responsável pode fazer)

| # | Ação | Por quê |
|---|------|---------|
| 0.1 | **Tornar o repositório privado** (GitHub → Settings → General → Danger Zone → Change visibility). A Vercel continua publicando normalmente. | Encerra a exposição pública de dados pessoais, credenciais e documentos jurídicos internos. O que já foi publicado deve ser tratado como vazado (itens 0.2 e 0.3). |
| 0.2 | Trocar as chaves de acesso dos dirigentes que estão em `data/solicitacoes_homologacao.json` (3 registros homologados com chave em texto) e a credencial administrativa registrada em `Segundo-Cerebro/06-Arquitetura-do-Portal/Indice-de-Recuperacao-Rapida.md` (seção "Credenciais"). | Estão num repositório público. Os valores não são repetidos aqui. |
| 0.3 | O registro `REC-2026-GIX0` (criado em 02/11/2026, commit `35afd7a`) parece ser de uma pessoa real: e-mail pessoal, telefone e intenção religiosa. Avaliar com o encarregado de dados se cabe comunicar o titular (LGPD art. 48) e remover o registro do git. | Convicção religiosa é dado sensível (LGPD art. 5º, II). |
| 0.4 | Na Vercel, confirmar que `ADMIN_SECRET_KEY` e `SUPABASE_SERVICE_ROLE_KEY` existem em Production. | Sem a primeira, o cookie de sessão é assinado com chave pública ou literal do código (A3). Sem a segunda, a migração 004 trava as gravações. |
| 0.5 | No Supabase: rodar a migração **004** e a **006**, e **não** rodar a **005** (ver A7). Em Authentication → Providers → Email, desligar o cadastro público ("Allow new users to sign up"). | A 005 recria DELETE aberto; o cadastro público permite a qualquer um criar conta, e hoje qualquer conta vira admin (A2). |

---

## Pacote A — Acesso ao portal e às APIs (P0)

> **Andamento (2026-11-03): A1–A8 executados** (ADR-010). Ficou para depois: recalcular o valor do pedido no servidor (A5, depende do Pacote C) e a dica do formato de chave em `PortalLoginGate.tsx:269` (mensagem do modo standby do e-mail, sem o padrão da chave). Contas do Supabase Auth precisam de `app_metadata` (ver ADR-010). Parte do B1 também foi feita: testes não falam mais com o Supabase (`NATIVARAM_TEST=1`).

**Arquivos em escopo:** `src/lib/db/homologacoes.ts`, `src/app/api/auth/verificar-chave/route.ts`, `src/lib/auth/session.ts`, `src/app/api/comunidade/{posts,perfis,agenda}/**`, `src/app/api/pedidos/**`, `src/app/api/solicitacoes/route.ts`, `src/lib/validators/*.ts`, `src/components/portal-dirigente/AdminGestaoHomologacoes.tsx`, `src/components/portal-dirigente/PortalComunidadeGestao.tsx`, `src/components/portal-dirigente/PortalLoginGate.tsx`, nova migração `src/lib/supabase/migrations/006-*.sql`, `scripts/test-liturgico.mjs`.
**Fora de escopo:** armazenamento de senha em texto e o fallback de senha master (o dono pediu para tratar à parte). Não mexer em layout/visual.

**Padrão do projeto a seguir:** rotas já protegidas usam `verifyAdminRequest(request)` de `@/lib/auth/session` e respondem `{ sucesso: false, erro }` com status 401 (exemplo: `src/app/api/solicitacoes/[id]/route.ts:64-72`). `session.ts:179` já exporta `verifyDirigenteOrAdminRequest`, hoje sem uso.

### A1. Remover a entrada "por padrão de chave" (bypass de login)
- **Onde:** `src/lib/db/homologacoes.ts:473-507`. Quando o login não casa com nenhum cadastro, qualquer login com prefixo `NAT-TEMPLO-`, `NAT-GRP-`, `REC-2026-` **ou qualquer e-mail**, com chave num formato fixo de 4 dígitos, recebe um dirigente HOMOLOGADO montado na hora. Em `homologacoes.ts:470`, um cadastro homologado sem chave aceita qualquer valor com 4+ caracteres.
- **Par no navegador:** `AdminGestaoHomologacoes.tsx:300-326`. Se a API falha (inclusive 401/500), o painel "homologa" localmente e gera a chave nesse mesmo formato com `Math.random`, guardando credenciais em `localStorage` (`:146-151`, `:286`, `:322`). Foi esse remendo que motivou o bypass do servidor.
- **Fazer (TDD):** primeiro escreva em `scripts/test-liturgico.mjs` os testes que hoje falham: (a) login inexistente com chave no formato padrão → `null`; (b) depois de `excluirSolicitacao(id)`, `validarCredenciaisDirigente(login, chave)` → `null`; (c) cadastro HOMOLOGADO sem chave → `null`. Depois apague o bloco 473-507 e o ramo de 470. No painel, troque o fallback por mensagem de erro e pare de gravar credenciais no `localStorage`. Remova a dica do formato da chave em `PortalLoginGate.tsx:223`.
- **STOP:** se algum dirigente real só entra pelo fallback (cadastro inexistente no Supabase), pare e liste quais. Esses cadastros precisam ser recriados antes.

### A2. Admin só por papel gravado no servidor
- **Onde:** `src/app/api/auth/verificar-chave/route.ts:94-99`. Vira ADMIN quem fizer login no Supabase Auth e mandar `modo: "ADMIN"` no corpo, **ou** tiver "adm" em qualquer parte do e-mail, ou `user_metadata.papel` (que o próprio usuário edita).
- **Fazer:** `isUserAdmin = data.user.app_metadata?.role === "admin" || ADMIN_LOGINS.includes(loginLower)`. Remova `modo`, `includes("adm")` e `user_metadata`. Teste: um usuário sem `app_metadata.role` com `modo:"ADMIN"` não recebe cookie ADMIN (simule `signInWithPassword` com stub, ou extraia a decisão para uma função pura `ehAdmin(user, login)` e teste a função).

### A3. Segredo da sessão: falhar fechado
- **Onde:** `src/lib/auth/session.ts:30-39`. Sem `ADMIN_SECRET_KEY`, a assinatura do cookie usa a service role, **depois a anon key (pública)** e depois um literal do código. O comentário em `session.ts:17-21` promete fail-closed.
- **Fazer:** em produção sem `ADMIN_SECRET_KEY`, `getSessionSecret()` retorna `null` e a verificação recusa. Remova o literal. Atualize o ADR-005 (trecho sobre fallback de chaves). Já existe o teste "Acesso administrativo falha fechado em produção sem ADMIN_SECRET_KEY"; estenda-o para cobrir a assinatura do cookie.

### A4. Comunidade: gravar só com sessão, dono vem do cookie
- **Onde:** `api/comunidade/posts/route.ts:31-114` (POST sem sessão; `temploCodigo` e `id` do corpo; `salvarPublicacao` sobrescreve por `id`, `lib/db/comunidade.ts:474-476`); `api/comunidade/perfis/route.ts:38-71` (POST sem sessão; `codigoLiturgico` do corpo com padrão `"NAT-TEMPLO-842"` na linha 54); `api/comunidade/agenda/route.ts:24-46`; DELETE de `posts/[id]` e `agenda` confiam em `temploCodigo` da query (`:35-45`, `:60-70`). `?todosStatus=true` em `posts/route.ts:14` devolve rascunhos a qualquer um.
- **Fazer:** POST/DELETE exigem `verifyDirigenteOrAdminRequest`. O código do templo sai da sessão, nunca do corpo. Antes de sobrescrever, compare o dono do registro existente. `todosStatus` só para o dono ou ADMIN. Ajuste `PortalComunidadeGestao.tsx:110-346` para não enviar `temploCodigo`.

### A5. Pedidos: leitura e criação autenticadas, valor calculado no servidor
- **Onde:** `src/app/api/pedidos/route.ts:29-57` (GET público devolve telefone, e-mail, CNPJ, observações internas e rastreio de todos os templos) e `:59-75` (POST anônimo); `api/pedidos/[id]/route.ts:11-26` (GET público); `lib/validators/pedido.ts:22` + `lib/db/pedidos.ts:533-538` (o valor unitário vem do cliente).
- **Fazer:** GET = ADMIN, ou dirigente vendo só o próprio `temploId` (da sessão). POST = sessão de templo homologado; o servidor recalcula o valor unitário com `obterCotaRateio` (depois do Pacote C) e ignora o enviado. Mensagens de erro genéricas ao cliente; o detalhe vai só para `console.error`.

### A6. Credenciamento público não pode sobrescrever cadastro
- **Onde:** `lib/validators/solicitacao.ts:9` aceita `id` do cliente; `api/solicitacoes/route.ts:94-113` repassa; `homologacoes.ts:250-262` mescla sobre o existente mantendo HOMOLOGADO. A listagem pública (`api/solicitacoes/route.ts:48-56`) expõe `loginGerado`.
- **Fazer:** tire `id` do schema público, gere no servidor com `crypto.randomUUID()` (ou prefixo + 8 caracteres de `crypto.randomBytes`), insert-only (conflito → 409). Tire `loginGerado` da resposta pública.

### A7. Neutralizar a migração 005 e fazer o teste de RLS ler todas as migrações
- **Onde:** `src/lib/supabase/migrations/005-permitir-remocao-homologacoes.sql:12-26` cria `FOR DELETE USING (true)` sem `TO`, ou seja, para todos (inclusive anon). O servidor usa service role, que ignora RLS, então a 005 não é necessária para o botão de apagar funcionar. O teste em `scripts/test-liturgico.mjs:874-893` usa uma lista fixa de arquivos e não vê a 005.
- **Fazer:** marque a 005 como "⚠️ OBSOLETA — NÃO EXECUTAR" (mesmo padrão do cabeçalho da 003). Crie `006-remover-delete-publico.sql` com `DROP POLICY IF EXISTS` dos três nomes da 005 (para o caso de alguém já ter rodado). No teste, troque a lista fixa por `readdir` de `migrations/` + os dois `schema*.sql`, ignorando arquivos cujo cabeçalho diga "OBSOLETA". Regra: nenhuma `CREATE POLICY` fora de `FOR SELECT`, e toda política com `TO`.

### A8. Limites de entrada
- **Onde:** `lib/validators/comunidade.ts:132-185` (markdown, imagens e galerias sem máximo; `z.string().url()` aceita qualquer esquema, depois usado em `href`); `validators/pedido.ts:36`; `validators/reconhecimento.ts:69-74`.
- **Fazer:** `.max()` em strings e arrays; imagens só `data:image/(webp|jpeg|png);base64,` com teto de bytes; URLs com `.refine(u => u.startsWith("https://"))`.

**Pronto quando:** os testes novos de A1, A2, A6 e A7 existem e passam; `grep -n "Luz202" src/lib/db/homologacoes.ts src/components` não retorna nada; `npm test`, `tsc`, `lint` e `build` verdes.

---

## Pacote B — Dados, exclusão e testes que não tocam produção (P1)

> **Andamento (2026-11-04): B1–B4 executados.** Testes isolados do Supabase; exclusão durável (marca `EXCLUIDO_PELO_ADMIN` vence cópias antigas e dados iniciais; recusa legítima volta a aparecer; retorno real); em produção, gravação no Supabase com erro vira 5xx (`gravarNoSupabase`); `data/*.json` continuam no disco e o site roda sem eles (dados iniciais no código). Reconhecimentos seguem também em `solicitacoes_homologacao` (via formulário), por isso não ganharam tabela própria.

### B1. Testes nunca escrevem no Supabase real nem em `data/`
- **Onde:** `.env.local` aponta para o Supabase de produção, sem service role. `scripts/test-liturgico.mjs:515-622` registra, homologa e depois apaga `TEST-%` remotamente com a anon key. `core-hybrid-store.ts:11` grava em `data/` versionado.
- **Fazer:** variável `NATIVARAM_TEST=1` definida no script `test` do `package.json` (ou no topo de cada `scripts/test-*.mjs`). Com ela, `getDirectSupabaseClient()` retorna `null` e o diretório de dados é um `fs.mkdtemp` (aceite `NATIVARAM_DATA_DIR`). Apague a limpeza remota `delete().like("id","TEST-%")`. Coloque `finally` no teste de exclusão.

### B2. Exclusão de instituição que de fato revoga o acesso
- **Onde:** `homologacoes.ts:511-587`. Busca só no store local; ignora o `{ error }` do supabase-js (ele não lança); retorna `true` sempre. `DADOS_INICIAIS` (`homologacoes.ts:100+`) é re-mesclado em toda leitura, então seeds nunca somem. `mesclarSolicitacoes` (`:149-174`) prefere HOMOLOGADO, então uma cópia antiga em outra instância serverless "ressuscita" o acesso. A rota `api/solicitacoes/[id]/route.ts:82-87` responde sucesso mesmo assim. O filtro `status !== "RECUSADO"` em `obterTodasSolicitacoes` (`:188-216`) também esconde recusas legítimas do Conselho.
- **Fazer:** em produção o Supabase é a fonte de verdade para status e exclusão. Use uma marcação própria (`status = "EXCLUIDO"` ou coluna `excluido_em`), não reutilize RECUSADO. Cheque `error` em cada chamada e devolva o resultado real; a rota responde 404/500 quando falhar. Seeds só em desenvolvimento. Remova o ID fixo `REC-2026-OLYY` (`homologacoes.ts:208` e `AdminGestaoHomologacoes.tsx:96,159`).
- **STOP:** se a coluna/status novo exigir migração, escreva-a como `007-*.sql` e pare para o dono rodar antes de publicar.

### B3. Persistência na Vercel
- **Onde:** `core-hybrid-store.ts:250` ignora falha de escrita (o disco da Vercel é somente leitura; só sobra o `tmpdir` da instância). `pedidos.ts:571-577` não detecta erro do Supabase. `api/reconhecimento/route.ts:19-23,113-125` guarda fichas só localmente, então elas somem em produção.
- **Fazer:** em produção, gravação remota obrigatória; falhou → 503 com mensagem clara. Fallback local só em `NODE_ENV !== "production"`. Reconhecimentos em tabela própria (nova migração). Esforço L: faça por entidade, uma de cada vez, com teste.

### B4. Tirar dados reais do git
- **Fazer:** `data/*.json` de produção para o `.gitignore`; criar `data/seed/*.json` com dados fictícios para desenvolvimento. Purga do histórico: ver Pacote F4.

---

## Pacote C — Cálculo do rateio (P1)

> **Andamento (2026-11-03): C1–C4 executados.** `obterCotaRateio` faz busca exata e lança erro para código desconhecido; acima de 20 L devolve `valorTotal: null` (tipo discriminado obriga o tratamento); calculadora usa `graduacao.id`, mostra "Sob consulta ao Conselho" e esconde "Dimensionar" do Gel (kg); reconstituição compara pela faixa do volume final e avisa abaixo de 5 L; pedido sem contato fictício, com campo de e-mail, ± respeita o mínimo e sem `window.open` pós-await. Testes em `scripts/test-rateio.mjs`. **C5 feito em 2026-11-04** após D3: `VALORES_APOIO_LITURGICO` como fonte única e valor oficial recalculado no servidor (`src/lib/rateio.ts`).

**Arquivos:** `src/data/graduacoes.ts`, `PortalCalculadoraLiturgica.tsx`, `PortalCooperativismo.tsx`, `FormSolicitacaoPedido.tsx`, novo `scripts/test-rateio.mjs` (incluir no `npm test`).

- **C1. Mel e Gel recebem o valor da Pituã.** `graduacoes.ts:253-259`: a busca usa `graduacaoId`, `codigo` ou `startsWith` e, sem achar, cai em `TABELA_EVOLUTIVA_RATEIO[1]` (Pituã). Em `GRADUACOES_SACRAMENTAIS` os códigos são `MEL`/`GEL` (`:104`, `:118`); na tabela de rateio são `12 a 15x1`/`20.1` (`:204`, `:216`). A calculadora chama com `graduacao.codigo` (`PortalCalculadoraLiturgica.tsx:85`). Resultado: Mel e Gel aparecem 43% a 80% abaixo da tabela. **Fazer:** busca exata por `graduacaoId`; sem achar, lançar erro; calculadora passa `graduacao.id`. Gel é por kg: a calculadora de cerimônia (litros por participante, `:57-72`) não se aplica a ele.
- **C2. Acima de 20 L é "a combinar", mas a calculadora mostra total fechado.** `graduacoes.ts:263-272` devolve `valorTotal` junto com `aCombinar: true`; `PortalCalculadoraLiturgica.tsx:347-371` ignora a flag, enquanto `PortalCooperativismo.tsx:357-359` mostra "Sob Consulta". **Fazer:** `valorTotal: null` quando a combinar; a calculadora mostra "Sob consulta". Documentar a fronteira de 10 L (hoje cai na faixa 10–20, e o cabeçalho diz "5 a 10L").
- **C3. Reconstituição compara com a faixa errada.** `PortalCalculadoraLiturgica.tsx:101-119` escolhe a faixa por `litros10Base` e não pelo volume final. **Fazer:** `obterCotaRateio(alvo, volumeFinalLitrosNum)`. O slider desce a 0,5 L (`:129`, `:457`) sem o alerta de mínimo.
- **C4. Pedido sai com contato fictício.** `FormSolicitacaoPedido.tsx:127-128`: telefone e e-mail de exemplo são **valores** iniciais, e não há campo para editar o e-mail. `:263`: `window.open` depois de `await` (bloqueado por pop-up no iOS/Safari). `:189-204`: os botões ± ignoram o mínimo de 5 L declarado em `:62`. **Fazer:** iniciar com os dados do templo da sessão ou vazio; campo de e-mail; usar o link de WhatsApp da tela de sucesso; respeitar `minimo`.
- **C5. Fonte única de valores.** Os mesmos valores aparecem como string (`graduacoes.ts:52-127`) e número (`:153-226`), repetidos à mão na calculadora (`:86-87`, `:100-121`) e no formulário (`:72`, `:83`). **Fazer:** só números em `graduacoes.ts`, strings derivadas com `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })`.
- **Testes:** limites 4,99 / 5 / 10 / 20 / 20,01 para cada graduação; código desconhecido lança erro; acima de 20 → `valorTotal === null`. Apague o "teste de rateio" de `test-liturgico.mjs:251-259`, que refaz a conta dentro do teste e não chama a função real.

> **Depende do Pacote D3:** se o Conselho decidir mudar a forma de apresentar o rateio, faça D3 antes de C5.

---

## Pacote D — Coerência com a missão e compliance público (P0/P1; maior parte é texto)

> **Andamento (2026-11-04): D3–D12 executados** com as decisões do dono (ADR-011): D3 valores mantidos com vocabulário de custo; D4 Mel/Gel mantidos e explicados em `/compliance`; D5 grupo sem CNPJ não vê valores e o pedido vai ao Conselho "a definir"; D6 menção ao "Marco ANVISA 2025" retirada (sem fonte primária encontrada) e CONAD separada do rapé; D7/D8 alegações e termos restantes saíram (inclusive `alquimiaFitoquimica`, `diretrizes` e subtítulos de `medicinas.ts`); D10 `/privacidade` preliminar (revisão jurídica pendente) e consentimento da linhagem; D11 "sobras/FATES". Mantido de propósito: o bloco de alertas de segurança em `/compliance` (redução de danos, não promessa de benefício).

A intenção declarada (cooperativa sem fins lucrativos, salvaguarda litúrgica, rateio de custo, CONAD 01/2010) está bem desenhada nos documentos e na área de segurança. As contradições abaixo enfraquecem justamente essa tese diante de uma fiscalização.

> **Andamento (2026-11-03): D1, D2 e D9 executados** (Manifesto, Projetos de Luz, Cooperativismo l. 251, metadados de `/projetos-de-luz`, `beneficios` das 15 fichas de `medicinas.ts` + Jurema l. 138, rótulos da ficha pública, +18 no Footer). **Restou para um próximo passo** (mesma natureza do D2): o campo `alquimiaFitoquimica` de `medicinas.ts` ainda tem alegações (Rainha "não possui efeitos psicoativos… células mucosas", Cacau "sistema cardiovascular", Pixuri "sedativo e neuroprotetor", Nissural/Samaúma "neurotransmissores", Tsunu "eficácia cognitiva"), subtítulos como "Guardião do Sono", `diretrizes` com uso "ao acordar/antes de deitar" (fora do rito) e `ManifestoLanding.tsx:938` com conteúdo clínico em página pública.

**Exige decisão do Conselho antes de codar:** D3, D4, D5. **Exige revisão jurídica:** D6, D10.

- **D1 (P0). Oferta pública de sacramento para condições de saúde.** `ManifestoLanding.tsx:55` ("dependência química, alcoolismo e traumas… em clínicas parceiras") e `:809-812` ("depressão severa", "catalisadores para a neuroplasticidade"), renderizado em `/institucional`; `ProjetoDeLuzLanding.tsx:83`; `PortalCooperativismo.tsx:251`. Contraria a regra 2 do AGENTS.md e a própria página `/compliance` (`src/app/compliance/page.tsx:117`). **Fazer:** descrever o destino social (agrofloresta, casas pequenas, acesso) sem condição de saúde e sem uso fora do rito.
- **D2 (P0). "Benefícios" fisiológicos nas fichas públicas.** `src/app/medicinas/[slug]/page.tsx:222-282` renderiza `beneficios.fisico/mental/sutil` de `src/data/medicinas.ts` (ex.: `:378` serotonina e endorfinas; `:310` alívio respiratório; `:138` "100% livre de efeitos psicoativos… cicatrizantes", o que contradiz o aviso de nicotina em `medicinas/page.tsx:310`). **Fazer:** trocar por "uso tradicional / contexto litúrgico", sem efeito no corpo.
- **D3 (P1, decisão). A tabela por volume de `a80b85e` lê como tabela de atacado.** Campos `rateioAtacado*` (`graduacoes.ts:20-21`); desconto fixo de R$ 20/L igual para todas as graduações (não deriva de custo); "à vista / parcelamento com taxa de cartão" (`:234-235`); "Economia de R$…", "barateia" (`PortalCooperativismo.tsx:148,208,242,376`; `PortalCalculadoraLiturgica.tsx:368,590-611`); e "~R$ X por participante" (`PortalCalculadoraLiturgica.tsx:89,352-358`), que induz o templo a cobrar por pessoa. As palavras proibidas foram evitadas, mas o sentido comercial ficou. **Proposta para o Conselho:** cota derivada de composição de custo por graduação (biomassa, lenha, mão de obra, frete), aprovada em ata; redução por volume explicada como diluição de custo fixo; sem "economia", sem "atacado", sem valor por participante.
- **D4 (decisão). Mel/Gel e reconstituição 10:1 versus "veto a derivados".** `graduacoes.ts:102-129` e o modo de diluição da calculadora contra `compliance/page.tsx:182-186` ("não desenvolvemos… méis") e o parecer interno. **Fazer:** registrar a decisão em ADR (diferenciar "redução sem aditivo para transporte" de derivado comercial) ou retirar as graduações.
- **D5 (decisão). Grupos sem CNPJ conseguem pedir.** A regra diz "Pessoas Jurídicas religiosas" (`graduacoes.ts:33`), mas `ReconhecimentoForm.tsx:60-68,650` acolhe rezador individual e pede litragem mensal, `homologacoes.ts:370` gera credencial `NAT-GRP` e `api/pedidos` não filtra por tipo. **Fazer:** bloquear pedido para `GRUPO_INFORMAL`, ou registrar em ADR a decisão de atender, com base jurídica.
- **D6 (revisão jurídica). Citações frágeis.** "Marco ANVISA de 28/01/2025" sem número de ato nem link (`Footer.tsx:214`, `compliance/page.tsx:60,136,149,162`, `HomeCompromissoSagrado.tsx:21`, `HomeJornadaFunil.tsx:53`, `ComplianceBanner.tsx:31`); a única fonte é um parecer interno com marcas "[cite: 4]" soltas. `FormSolicitacaoPedido.tsx:627` atribui ao "Art. 1º" da CONAD algo que o artigo não diz. `medicinas/page.tsx:298` e `reconhecimento/page.tsx:225` usam a CONAD (que trata de ayahuasca) como amparo para rapé, sananga e kuripe. **Fazer:** localizar o ato no DOU ou retirar; citar "princípios deontológicos do Relatório Final do GMT"; separar o amparo do rapé.
- **D7. Números e alegações sem fonte em página pública.** `FeitioLanding.tsx:800` (9,21 mg/g, laudo pendente; THH "modulador… promovendo estabilidade"), `:958` ("modulador 5-HT2A"), `graduacoes.ts:29` ("92,3% polimorfismo"), `ManifestoLanding.tsx:50` (SisGen e universidades parceiras). **Fazer:** marcar "laudo pendente" ou retirar; mecanismo farmacológico só na área restrita (ADR-009); parcerias só com comprovação.
- **D8. Termos proibidos restantes.** Links visíveis para `/medicinas` (`Footer.tsx:21`, `ManifestoLanding.tsx:687`, `ProjetoDeLuzLanding.tsx:938`, `MedicinasCatalogClient.tsx:440`), "novas medicinas" (`MedicinasCatalogClient.tsx:279`), "dosagem precisa" (`FeitioLanding.tsx:457`), "Produto 100% orgânico" (`MedicinasCatalogClient.tsx:565`). **Fazer:** links para `/sacramentos`; inverter rota e redirect; trocar os termos. Na calculadora, "dose" (`:56-75,262,330`): incluir a calculadora na exceção do ADR-009 ou trocar por "porção".
- **D9. Aviso +18 no rodapé global.** `Footer.tsx:205-215` não tem; home e `/projetos-de-luz` ficam sem. Uma linha resolve.
- **D10 (revisão jurídica). Privacidade da própria cooperativa.** Credenciamento coleta CPF (`CredenciamentoForm.tsx:475`); reconhecimento coleta linhagem espiritual, que é dado sensível (`ReconhecimentoForm.tsx:591`). Não há página pública de privacidade nem consentimento nesses formulários (o doc 11 é modelo para templos, na área restrita). **Fazer:** rota `/privacidade` (controlador, finalidades, retenção, encarregado, direitos), link no Footer e nos formulários, consentimento destacado para a linhagem.
- **D11. "Superávit" vira "sobras".** `ManifestoLanding.tsx:55,809`; matriz fixa 40/40/10/10 em `ProjetoDeLuzLanding.tsx:684-716`. **Fazer:** "sobras destinadas ao FATES/Fundo Social por deliberação de assembleia" (Lei 5.764/71, art. 28); matriz marcada como meta até haver números reais.
- **D12. Linter de linguagem no CI.** O teste de termos proibidos (`test-liturgico.mjs:229-235`) não varre `src/components/layout`, `estudos`, `medicinas` nem `src/data`. **Fazer:** varrer `src/` inteiro, com lista explícita de exceções (ADR-009, citações e negações), incluindo sinônimos comerciais (atacado, economia, desconto, à vista, barateia) e de saúde (serotonina, alívio, cicatrizante, neuroplasticidade).

---

## Pacote E — Front-end, acessibilidade e performance (P2)

- **E1. Modais:** `EstudosClient.tsx:589-592,680-682`, `WelcomeConsentModal.tsx:21-54`, `AdminGestaoHomologacoes.tsx:1144`: sem foco inicial, trap, Escape nem `aria-labelledby`; `<object>` do PDF sem nome (`EstudosClient.tsx:633-637`). Use `<dialog>` nativo com `showModal()`.
- **E2. Formulários:** sliders sem nome (`PortalCalculadoraLiturgica.tsx:222,455`, `PortalCooperativismo.tsx:338`); labels sem `htmlFor` (`FormSolicitacaoPedido.tsx:516,553,588,599`); seletores sem `aria-pressed`; `focus:outline-none` sem anel substituto; fontes de 9–10 px em valores.
- **E3. Vídeo:** `ProjetoDeLuzLanding.tsx:392` usa `<div onClick>` sem teclado.
- **E4. `EstudosClient.tsx:60-65`:** `JSON.parse` do `localStorage` sem `try/catch` derruba `/estudos` inteira se o valor estiver corrompido; links digitados viram `href` sem checar `https:`.
- **E5. Peso:** imagem OG de 7,5 MB (`src/app/medicinas/page.tsx:34`); ícone de 1 MB (`layout.tsx:76-78`); originais de 9,5/6,1/3,7 MB no catálogo; PDF de 18 MB aberto inline. Gere OG de 1200×630 com menos de 300 KB, `src/app/icon.png` pequeno e WebP de até 2000 px.
- **E6. Landings inteiras como client:** `FeitioLanding.tsx` (1.443 linhas, `"use client"` por 2 estados), `ProjetoDeLuzLanding.tsx` (949), `MedicinasCatalogClient.tsx` (765). Página como Server Component, com ilhas client pequenas. O `ManifestoLanding.tsx` já segue esse padrão e serve de exemplo.
- **E7. SEO:** `sitemap.ts:4-8` lista `circulo-yawanawa-sp`, que não existe no repositório (provável 404). Gerar os slugs da fonte de dados. Canonical só em 3 páginas. `src/app/manifesto/page.tsx` é inalcançável (há redirect em `next.config.mjs`).
- **E8. Service worker:** `public/sw.js` usa cache com nome fixo, guarda `/_next/static` sem limite e guarda HTML do portal autenticado (fica disponível offline para o próximo usuário do aparelho). Versionar o cache e não cachear o portal.
- **E9. Cabeçalhos:** `next.config.mjs:43-64` duplica X-Frame-Options/CSP para `/documentos` e força `Content-Disposition: inline` em qualquer arquivo. Restringir a `*.pdf`; CSP completa primeiro em `Report-Only`.

---

## Pacote F — Repositório e ferramentas (P2)

- **F1. Peso:** histórico de 1,73 GiB; `skills/` (913 arquivos) e `.agents/` (859) versionados, com 813 arquivos idênticos entre si; `Segundo-Cerebro/` é um link para outra unidade, mas 31 arquivos dele estão no git; PPTX de 20 MB e PDFs duplicados em `docs/`.
- **F2. Documentos internos públicos no GitHub:** `docs/fontes/internos/` (parecer jurídico, dossiê estratégico de compliance, manuais) saiu de `public/`, mas segue versionado num repositório público. Some com o item 0.1; para limpar de vez, ver F4.
- **F3. Faxina:** 25 scripts avulsos em `scripts/` sem referência (8–9/set, 17 com caminho `C:/Users` fixo), únicos usuários de `ffmpeg-static` e `sharp` (o índice de planos dizia mantê-los "para os scripts de curadoria", que estão mortos). `enable-long-paths.reg` na raiz. `npm run notebooklm` aponta para pasta ignorada. `iniciar_portal.bat` ainda diz "Nativaram Brasil".
- **F4. Purga de histórico (uma vez só, coordenada):** `git filter-repo` para `data/*.json` reais, `docs/fontes/internos`, `docs/context/local-source-files` e os assets antigos. Isso reescreve o histórico e **exige confirmação explícita do dono**, novo clone em todas as máquinas (Antigravity incluído) e push forçado. Não fazer sem combinar.
- **F5. DX:** criar `README.md` (requisitos, `.env.local.example`, dev, test, migrações); script `typecheck`; `jiti` como devDependency declarada (hoje chega por acaso via eslint/tailwind e o `npm test` depende dele); `engines` + `.nvmrc` (Node local 24, CI 22); `next build` no CI; `.env.local.example` com placeholders (hoje traz a URL e a chave pública do projeto de produção); `scripts/dev.mjs` mata qualquer processo na porta 3000 e só roda no Windows.
- **F6. Testes que checam texto em vez de comportamento:** `test-liturgico.mjs:241-249` (comparação tautológica, com um segredo antigo como literal: remover), `:313-324`, `:851-855`, `test-documentos.mjs:119-125`. Zero testes nas 11 rotas de API (1.278 linhas): chamar os handlers exportados com `new Request(...)`, como já é feito em `test-liturgico.mjs:790`.
- **F7. Catálogo de rapés em duas fontes:** `sacramentos.ts:33-215` e `medicinas.ts` descrevem as mesmas 15 plantas com nomes divergentes; o teste só compara a contagem. `SANANGA_ANCESTRAL` e `ARTEFATOS_SAGRADOS` não são importados.

---

## Direção (opções para o Conselho, não defeitos)

1. **Transparência do rateio e prestação de contas.** A página promete "Para onde vai cada centavo", mas mostra uma barra estática 40/40/10/10. Um relatório anual agregado (arrecadado, custo, sobras, FATES), a partir de `pedidos`, é a melhor defesa contra a leitura de comércio e o que a Lei 5.764/71 espera. Esforço M/L.
2. **Canal de intercorrência e ouvidoria.** Os documentos 02, 03, 08 e 11 mandam registrar intercorrências, mas não existe onde. Formulário restrito ligado ao lote do pedido (para suspender lote se necessário) e ouvidoria pública com opção anônima. Esforço M.
3. **Página pública de redução de danos.** Versão pública do Guia do Participante (doc 09) no vocabulário do AGENTS.md, depois da revisão clínica. Troca o foco público de "benefícios" (D2) por segurança. Esforço M.

---

## Ordem recomendada

1. **Seção 0** (dono, hoje).
2. **A1 + A2 + A3 + A7** juntos (S cada; fecham a porta de entrada). Em seguida **B1**, para os testes pararem de tocar a produção.
3. **D1 + D2 + D9** (texto, S) em paralelo com **A4 + A5 + A6 + A8**.
4. Reunião do Conselho para **D3, D4, D5**; depois **C1–C5**.
5. **B2, B3**; depois **E** e **F**. **F4** por último, combinado.

## Considerados e rejeitados nesta auditoria
- XSS por markdown na comunidade e no leitor: o conteúdo é renderizado como texto, sem HTML.
- Path traversal no store híbrido: os nomes de arquivo são constantes.
- Contraste âmbar sobre areia: o par não aparece em texto (o dourado só aparece em fundo escuro).
- Teste de RLS "enfraquecido" em 35afd7a: não foi; ele só não lê a 005 (ver A7).
- Dados de saúde da matriz de interações chegando ao servidor: não chegam (a tela não faz `fetch`).

## Não auditado
Configuração real do Supabase (GRANTs, provedores de login), variáveis na Vercel, revisão visual no navegador, conteúdo dos PDFs públicos, desempenho medido (Lighthouse).
