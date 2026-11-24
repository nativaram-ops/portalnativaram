# Cooperativa Nativaram — Regras de Projeto

## Identidade Institucional & Linguística Obrigatória

> **Distinção Fundamental de Marcas:**
> - **Cooperativa Nativaram** (ou *Cooperativa Etnobotânica Nativaram*): É este portal institucional — entidade cooperativa sem fins lucrativos de salvaguarda litúrgica, apoio a templos credenciados e rateio logístico sob a Lei 5.764/71 e CONAD 01/2010.
> - **Nativaram Brasil**: É a loja comercial / canal de varejo externo da marca.
> - **Regra:** Neste portal, o nome institucional oficial DEVE ser sempre **Cooperativa Nativaram**.

Todo texto gerado DEVE obedecer ao **Dicionário de Engenharia de Linguagem** abaixo.

> **Exceção (ADR-009):** o conteúdo de segurança da área restrita do Portal do Dirigente (matriz de interações, ficha de anamnese, documentos de triagem e emergência) usa termos clínicos precisos (medicamento, dose, washout). Continua proibido ali prometer cura ou usar linguagem comercial. Ver `Segundo-Cerebro/06-Arquitetura-do-Portal/ADR-009-Vocabulario-Clinico-no-Conteudo-de-Seguranca.md`.

### Termos Proibidos → Substitutos Permitidos

| NUNCA USAR | USAR SEMPRE |
|------------|-------------|
| Medicina / Remédio | Sabedoria botânica, alquimia vegetal, tradição da floresta, herança verde, preparado de força |
| Cura | Florescimento, reequilíbrio vital, harmonização sensorial, renovação do bem-estar, alinhamento interior |
| Tratamento / Terapia | Protocolo de autocuidado, ritual de suavidade, jornada de nutrição, prática de acalento |
| Ritual Terapêutico | Pausa consciente, cerimônia sensorial, rito de quietude, momento de reconexão |
| Alívio de Ansiedade / Estresse | Serenidade para os sentidos, calmaria interior, harmonização do ritmo, aquietamento da mente |
| Ancestralidade Medicinal | Memória da floresta, tradição botânica brasileira, sabedoria dos povos da terra |
| Doença / Patologia / Sintoma | Descompasso do cotidiano, estado de sensibilidade, busca por harmonia |
| Combater / Vencer (a dor) | Acolher, suavizar, harmonizar, nutrir, envolver |
| Dose / Dosagem | Porção sugerida, gotas de intenção, medida de afeto, proporção recomendada |
| Prescrever / Prescrição | Convite ao bem-estar, guia de jornada, direcionamento sensorial |
| Snuff | Rapé sagrado, preparado botânico tradicional, sacramento |
| Alucinógeno / Psicodélico | Introspecção profunda, percepção sutil, expansão de presença |
| Loja / Venda / Carrinho / Preço | Rateio de custos, apoio logístico, contribuição cooperativa, sacramento |
| Comprar / Adquirir | Solicitar credenciamento, apoiar a cooperativa, partilhar |
| Cliente | Cooperado, associado, templo credenciado, instituição parceira |
| Produto | Sacramento, preparado tradicional, artefato sagrado, alquimia |

## Regras de Compliance (ANVISA/CONAD/Meta Ads)

1. **Barreira do Pronome**: NUNCA usar "você sofre", "sua dor", "seu problema" direcionando a sintomas ou condições de saúde.
2. **Zero Promessa Clínica**: NUNCA afirmar que qualquer preparado "cura", "trata" ou "alivia" qualquer doença.
3. **Disclaimer Obrigatório (+18)**: Toda página com sacramentos DEVE ter o aviso de segurança integrativa no rodapé.
4. **Sem Remarketing Sensível**: Nunca associar rastreamento a condições de saúde.
5. **Composição em Português**: Toda ficha deve estar em português com composição completa.
6. **Diretriz de Imagens e Fotos Reais**: NUNCA usar imagens geradas por IA quando o visual representar um local geográfico real (buscar, baixar e creditar fotografia real sob licença livre); nunca gerar figuras humanas ou personagens por IA em imagens ilustrativas.

## Conteúdo público conforme regulamentação (ADR-016, 24/11/2026)

O site é **institucional e sem oferta**. Base: Resolução CONAD nº 1/2010, Lei 11.343/2006 (art. 2º, caput), Anvisa RE 342/2025 e Lei 9.294/1996 + RDC Anvisa 840/2023 (tabaco). Especificação completa em `plans/013-site-institucional-sem-oferta-e-abas-novas.md`.

1. **Identidade:** "projeto de cooperativa em constituição, ainda sem registro e sem CNPJ". Nunca afirmar no presente "cooperativa sem fins lucrativos (Lei 5.764/71)", "cooperados", "templos credenciados/homologados" ou selos como "CONAD Homologado".
2. **Sem oferta:** nada de valores (R$), cotas, "rateio" por litro, desconto por volume, pedido, calculadora, envio, frete, transporte ou logística. Isso vale **inclusive** para o substituto "rateio de custos" do dicionário acima, que não deve aparecer no site.
3. **Sem cadastro:** não existem `/credenciamento` nem `/reconhecimento`, que redirecionam para `/entidades-religiosas`. O site não coleta dados de entidades. O login é só do Conselho.
4. **Transporte:** o site não orienta nem "garante" transporte do sacramento, porque não há regulamentação (CONAD, proposição 2.B). Use a frase canônica do plano 013.
5. **Rapé:** só conteúdo cultural, sem fichas por variedade, fotos de frasco ou oferta, sempre com o aviso de tabaco/nicotina e +18. **Sananga não aparece no site.**
6. **Comunidade:** não publicar agenda de cerimônias, contatos pessoais de dirigentes nem perfis ou posts de exemplo.
7. **Fotos de terceiros:** crédito visível com autor, licença com link e indicação de modificação, registrado em `src/data/creditos-imagens.ts`.
8. Os testes `npm test` barram valores, frete, Gollog, pedido mínimo, cadastro, Doc 04 e transporte na FAQ. **Não enfraqueça esses testes** para fazer uma mudança passar.

## Governança de Ambiente Local (Windows)

- **Execução de Scripts**: Sempre executar comandos Node/NPM via `cmd.exe /c` para evitar bloqueios de ExecutionPolicy do PowerShell.
- **Dev Server & Porta 3000**: Garantir que a porta padrão 3000 seja limpa de processos órfãos (`taskkill /PID <PID> /F`) antes de inicializar o servidor de desenvolvimento.

## Design Tokens Institucionais

- **Floresta**: `#16281E` (dark green institucional)
- **Âmbar**: `#D4A359` (dourado "Raio de Sol")
- **Areia**: `#F8F6F0` (fundo claro nobre)
- **Pedra**: `#1C1917` (grafite escuro)
- **Fontes**: Cinzel (serif/headings), Inter (sans/body)

## Agent skills

### Issue tracker

GitHub issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical triage roles mapped in `docs/agents/triage-labels.md`.

### Domain docs

Single-context (`CONTEXT.md` + `docs/adr/`). See `docs/agents/domain.md`.

## Diretrizes do Segundo Cérebro (Obsidian)

Quando interagir com o Segundo Cérebro / Obsidian ou sugerir registros de tarefas, decisões e projetos:

### Local do Vault
O conteúdo do Obsidian fica localizado em:
`Segundo-Cerebro/`

### Regras Principais do Vault
1. **O vault não é um repositório de código:** Não coloque código completo no Obsidian. O vault serve para contexto, status, prioridades, tarefas, links e relações.
2. **Priorize clareza e simplicidade:** O vault deve priorizar organização clara e prática, não um grafo perfeito.
3. **Não invente dados:** Nunca invente projetos, URLs, features, status ou crie conteúdo fictício/mockado. Use "A definir" quando faltar informação.
4. **Edição segura:** Leia a nota antes de editar, preserve o que já existe e altere apenas o necessário. Em caso de ambiguidade, pergunte ao usuário.
5. **Linguagem:** Responda sempre em português do Brasil.
6. **Resposta final padrão:** Após qualquer alteração, responda de forma curta informando:
   - Arquivos alterados
   - Resumo da mudança
   - Pendências, se houver

### Padrão do Obsidian
- **YAML Simples:** apenas campos simples (`tipo`, `status`, `prioridade`, `ferramenta_principal`, `para_quem_e`, `fonte_de_renda`, `url`, `categoria`, etc.). Sem relações tipadas no frontmatter.
- **Relações no Corpo:** Relações ficam na seção `## Relações` utilizando links internos do Obsidian no formato `[[Nome da Nota]]` com subtítulos (`### Depende de`, `### Feito em`, `### Vendido em`, `### Alimenta / impulsiona`, `### Gera renda`, `### Relacionado a`).
- **Status Permitidos:** `ideia`, `planejamento`, `em andamento`, `pronto`, `em manutenção`, `pausado`, `travado`, `abandonado`.
- **Prioridades Permitidas:** `alta`, `média`, `baixa`, `contínua/obrigatória`.
- **Separação Importante:** Arquivos de instrução e skills ficam fora do vault (na raiz ou em `.agents/`). Nunca crie regras ou skills dentro de `Segundo-Cerebro/`. Nunca altere `.obsidian/` ou configurações internas do Obsidian.

### 🔄 PROTOCOLO MANDATÓRIO: CICLO ATIVO DE MEMÓRIA DO OBSIDIAN
**Para toda e qualquer alteração, correção, adição ou refatoração no portal:**
1. **ANTES de modificar qualquer código:** O agente DEVE consultar a memória do Obsidian no vault `Segundo-Cerebro/` (começando por `06-Arquitetura-do-Portal/Indice-de-Recuperacao-Rapida.md` e a nota de domínio correspondente) para carregar decisões prévias, conformidade e restrições.
2. **DURANTE o desenvolvimento:** Cumprir estritamente as regras fitoquímicas, faturamento cooperativo e design tokens consultados.
3. **DEPOIS de modificar o código:** O agente DEVE gravar as alterações de volta na memória do Obsidian (atualizando o `Roadmap-e-Componentes-do-Site.md`, criando ADRs se houver decisões técnicas novas, e mantendo o `Indice-de-Recuperacao-Rapida.md` sincronizado).
4. **Resposta Final Padrão:** O agente deve explicitar as notas consultadas, os arquivos modificados e as notas atualizadas.

## Referências Operacionais & Skills

- **Modelo Operacional Karpathy (11 Pilares):** Trabalhar por `/goal` claro, calibrar esforço/modelo ao mínimo suficiente, filtrar dados deterministicamente antes da IA (`cmd.exe /c npm run audit:preflight` e `npm run audit:ast`), responder de forma concisa (`ASD-STE100`) e verificar UI em navegador real (MCP `chrome-devtools` / `npm run audit:e2e`). Detalhes em `Segundo-Cerebro/06-Arquitetura-do-Portal/Modelo-Operacional-Karpathy.md`.
- **Catálogo Completo de Skills:** As **49 skills locais** do projeto vivem em `.agents/skills/` (listadas por setor com as globais da IDE em `Segundo-Cerebro/06-Arquitetura-do-Portal/Guia-de-Skills-e-Comandos.md`), incluindo as 4 específicas do fluxo Karpathy/Nativaram:
  - `/karpathy-calibracao-e-preflight`
  - `/verificacao-e2e-nativaram`
  - `/curadoria-academica-etnobotanica`
  - `/redacao-clara-ste100`

## Itens fora do Git (repositório público e deploy leve)

Estes caminhos estão no `.gitignore` e não fazem parte do build nem dos testes:

- `skills/`, `.agents/`, `skills-lock.json` (skills e ferramentas de agentes)
- `.agent/`, `agent/`, `tools/` (ambientes Python e ferramentas externas)
- `Segundo-Cerebro/` (cofre do Obsidian)
- `docs/context/`, `docs/fontes/` (fontes internas, originais e arquivo morto)
- `HANDOFF.md`, `task.md`, `walkthrough.md`, `implementation_plan.md` (rascunhos de sessão)

Agentes NÃO devem adicionar esses caminhos ao Git nem usar `git add -f` neles. Eles existem só localmente; `Segundo-Cerebro/` continua sendo consultado e atualizado no disco.

Continuam versionados: `src/`, `public/`, `data/`, `plans/`, `knowledge-base/` (lida pelo `npm test`), `docs/agents/`, `AGENTS.md`, `CONTEXT.md`.
