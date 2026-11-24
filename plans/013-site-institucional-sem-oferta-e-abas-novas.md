# Plano 013: site institucional sem oferta, cadastro encerrado e recursos abertos

- **Escrito contra:** `4eb0b53` (24/11/2026). O plano é a especificação das alterações. Cada frente lê este arquivo inteiro antes de começar.
- **Base:** análise de conformidade de 23 e 24/11/2026, feita com fontes oficiais (CONAD 1/2010; Lei 11.343/2006; Anvisa RE 342/2025 e RE 1.637/2026; Lei 9.294/1996; RDC Anvisa 840/2023 e 896/2024; Lei 5.764/1971; Código Civil; CDC; LGPD; ECA). O relatório detalhado é interno e não é versionado.
- **Verificação:** `cmd.exe /c npm test`, `cmd.exe /c npm run typecheck`, `cmd.exe /c npm run lint`, `cmd.exe /c npx next build`.

---

## 1. Decisões do responsável (23 e 24/11/2026)

| # | Tema | Decisão |
|---|------|---------|
| 1 | Identidade | A Nativaram **ainda não tem registro**. O site diz "projeto de cooperativa em constituição, ainda sem registro e sem CNPJ". |
| 2 | Rapé e sananga | O rapé vira **acervo cultural**: sem fichas por variedade, sem fotos de frasco, sem oferta, com aviso de tabaco/nicotina e +18. **A sananga sai do site.** |
| 3 | Partilha | **Sai do site:** valores, pedido online, calculadora, desconto por volume, menções a envio. Grupos sem CNPJ recebem apenas orientação para se formalizar. |
| 4 | Cadastro | `/credenciamento` e `/reconhecimento` **acabam**. O conteúdo vai para três abas novas: `/entidades-religiosas`, `/seguranca` e `/transparencia`. |
| 5 | Transporte | **Sai tudo:** Doc 04 (Declaração de Trânsito), a seção de transporte e o roteiro de blitz do Marco Legal, as perguntas de envio da FAQ, os envios e a "rota refrigerada" do admin. Fica só "o transporte entre entidades não é regulamentado; consulte advogado". |
| 6 | Área logada | **O que era restrito passa a ser aberto ao público**, mas só o que está conforme a regulamentação vigente. Vira a **Central de Recursos** pública. O login fica **só para o Conselho**. |
| 7 | Comunidade | Saem do público: a agenda de cerimônias (CONAD P4/P5), os templos, posts e selos de exemplo ("CONAD Homologado" não existe) e WhatsApp e e-mail de dirigentes (dado sensível). O código fica guardado. |
| 8 | Observatório | Fica, com aviso fixo: "conteúdo científico, não é indicação de uso; o uso terapêutico é vedado (CONAD 1/2010)". Anexos só pelo Conselho. |

## 2. Guia de redação (vale para todas as frentes)

**Frases canônicas:**
- **Identidade:** "A Cooperativa Nativaram é um projeto de cooperativa em constituição, ainda sem registro e sem CNPJ." Pode-se dizer que o projeto "pretende se constituir sem fins lucrativos". Nunca usar no presente "cooperativa sem fins lucrativos (Lei 5.764/71)", "cooperados", "templos credenciados/homologados", "CONAD Homologado" ou "Credenciamento Ativo".
- **O que não fazemos:** "Este site é institucional. Não vendemos, não recebemos pedidos e não fazemos envios. Não há valores nem formulários de pedido."
- **Partilha:** "A partilha do sacramento acontece apenas entre entidades religiosas legalmente constituídas, fora deste site, por termo entre as entidades, cobrindo somente o custeio de despesas comprovadas, sem margem, conforme os princípios da Resolução CONAD nº 1/2010."
- **Transporte:** "O transporte do sacramento entre entidades não tem regulamentação específica (a Resolução CONAD nº 1/2010 recomendou que fosse regulamentado). Este site não orienta transporte. Procure um advogado."
- **Rapé:** "Conteúdo cultural e etnobotânico. Não é oferta. O rapé contém tabaco e nicotina, que causam dependência. Proibido para menores de 18 anos."
- **Contato:** "Entidades religiosas constituídas podem falar com a coordenação do projeto pelo e-mail ou WhatsApp institucional. Não coletamos dados pelo site."
- **Ciência:** "Conteúdo científico de referência. Não é indicação de uso. O uso terapêutico da ayahuasca é vedado pela Resolução CONAD nº 1/2010 fora da pesquisa científica."

**Remover do texto e do código público:**
- valores em R$, "cota", "rateio por litro", "tabela evolutiva", "desconto", "escala", "economia";
- "pedido", "solicitar sacramento", "cota mínima 5 L", "30 dias de antecedência";
- "envio", "frete", "aéreo refrigerado", "Gollog", "logística", "ponto de partilha", "remessa";
- "sobras", "FATES", "Fundo Social", "superávit", matriz 40/40/10/10;
- "credenciamento/credenciar/homologação" como cadastro público;
- doação de sacramento ("Projetos de Luz" passa a ser só socioambiental, como intenção);
- garantias jurídicas ("inquestionável", "garantido", "plenamente amparado", "CONAD atesta");
- alegações terapêuticas.

**Manter:** conteúdo doutrinário, histórico, botânico e do feitio (números de laudo só com "laudo em validação"); a CONAD com link oficial; os alertas de segurança e redução de danos; o aviso +18; a privacidade; o vocabulário do AGENTS.md.

**Citação correta da lei:** a ressalva do uso ritual está no **art. 2º, caput** da Lei 11.343/2006. O parágrafo único trata de fins medicinais e científicos.

## 3. Frentes (arquivos não se sobrepõem)

### Frente A: abas novas, navegação e fim do cadastro
- **Criar** `/entidades-religiosas`, `/seguranca` e `/transparencia`.
  - O conteúdo de `/entidades-religiosas` e `/seguranca` vem dos formulários e páginas do cadastro.
  - `/transparencia` traz: quem somos juridicamente, o que não fazemos, princípios de custeio, marco normativo com links oficiais, privacidade e histórico de mudanças.
- **Apagar** `src/app/credenciamento/`, `src/app/reconhecimento/`, os forms `CredenciamentoForm` e `ReconhecimentoForm`, `src/app/api/reconhecimento/`, `src/lib/credenciamento/`, `src/lib/reconhecimento/`, os validators de credenciamento e reconhecimento e `src/lib/whatsapp-cadastro.ts` (mover a constante `WHATSAPP_CONSELHO` para `src/lib/contato.ts`).
- **Redirecionar** em `next.config.mjs`: `/credenciamento` e `/reconhecimento` vão para `/entidades-religiosas`.
- **Navegação e páginas:** Navbar, Footer, `layout.tsx` (só metadata e JSON-LD de identidade), WelcomeConsentModal, `src/components/home/**`, `src/components/funil/**`, contato, ContactForm, privacidade, compliance (o bloco de alertas vira resumo com link para `/seguranca`), sitemap e o link do PortalLoginGate.

### Frente B: acervo, landings, estudos e créditos
- **`/sacramentos`:** vira Acervo Etnobotânico (Server Component), sem fichas e sem sananga. `/sacramentos/[slug]` redireciona para `/sacramentos`.
- **Landings:** Manifesto/institucional, Feitio e Projetos de Luz (só socioambiental, como intenção).
- **`/estudos`:**
  - sai a aba de mural e comunidade; `/estudos/comunidade/[slug]` redireciona para `/estudos`;
  - o observatório recebe o aviso fixo de ciência;
  - o SEO perde "agenda de ritos", "laudos HPLC" e "fitoquímica de rapés".
- **Biblioteca** (`src/data/estudos.ts`, `public/documentos/`):
  - sai o catálogo v4 (lista e arquivo);
  - o caderno de rapés perde "proporção sugerida", alegações de efeito e contraindicações médicas;
  - a nota do feitio perde os volumes por graduação.
- **Créditos de fotos** (CC BY-SA 4.0 do Wikimedia): legenda visível com autor, licença com link e origem com link. Criar `public/creditos.md` ou uma seção de créditos em `/transparencia` (combinar com A: B entrega o texto em `src/data/creditos-imagens.ts`).
- **Dados:** sananga sai de `src/data/medicinas.ts` e dos tipos.

### Frente C: Central de Recursos pública e dados
- **`/portal-dirigente` abre sem login** e vira a **Central de Recursos**, com as abas:
  - Documentos A4: sai o Doc 04; o Doc 05 recebe a redação segura sobre menores; o Doc 02 corrige o "art. 2º, caput" e a cláusula de custeio; autoria "projeto em constituição".
  - Matriz de Interações & Washout.
  - FAQ: saem as perguntas 2, 10 e 11; a 1, 4, 9 e 12 são ajustadas.
  - Marco Legal: sem transporte, sem garantias, roteiro só com direitos básicos e ementa só com o texto oficial.
- **Saem:** Solicitações, Nova Solicitação, Calculadora, Tabela de Cotas, Catálogo de Graduações (marcas e valores), Laudos & Custódia (dados fictícios) e Meu Templo & Publicações.
- **Login só do Conselho**, com o painel reduzido a:
  - "Cadastros existentes", para atender pedidos de exclusão de dados (LGPD, art. 18);
  - a moderação de anexos do observatório.
- **Saem do painel:** pedidos, lotes, logística, cotas e os mocks de envio e CNPJ.
- **Dados e APIs:**
  - saem os valores de `graduacoes.ts`;
  - `src/lib/rateio.ts` é apagado;
  - `/api/pedidos` responde 410;
  - o POST de `/api/solicitacoes` fica só para admin;
  - comunidade: saem as seeds; a agenda deixa de ter GET público; a API de perfis deixa de devolver contatos;
  - anexos do observatório: só admin.
- **Testes:** ajustar as suítes ao novo escopo.

### Ao final (orquestrador)
- AGENTS.md: regra nova (seção "Conteúdo público conforme regulamentação"). Cofre: ADR-016 e Roadmap.
- Verificação completa, teste no navegador local, commit. O push só com o OK do responsável.

## 4. Status (24/11/2026)
- Análise: **concluída**.
- Frentes A, B, C e C2: **executadas no código**. Testes, tipos, lint e build verdes. Rotas verificadas no build de produção local:
  - redirects 308 do cadastro, das fichas e dos perfis;
  - `/api/pedidos` responde 410;
  - cadastro público responde 410 e a lista responde 401;
  - agenda responde 401.
- **Extras feitos durante a execução:**
  - 4 PDFs desatualizados saíram da biblioteca pública (guardados localmente fora do Git);
  - a foto de garrafas foi removida;
  - o gerador de "Guia de Trânsito" do painel foi apagado;
  - nova rota `/api/auth/sair` (logout real);
  - o botão de WhatsApp passou a usar o número oficial (antes havia um número com um dígito a menos).
- **Pendências humanas:**
  - URLs de origem das 2 fotos do Wikimedia (`src/data/creditos-imagens.ts`, "A confirmar");
  - responsável e encarregado de dados em `/transparencia` e `/privacidade`;
  - revisão jurídica e clínica;
  - constituição da entidade.
