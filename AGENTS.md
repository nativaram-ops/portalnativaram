# Cooperativa Nativaram — Regras de Projeto

## Identidade Institucional & Linguística Obrigatória

> **Distinção Fundamental de Marcas:**
> - **Cooperativa Nativaram** (ou *Cooperativa Etnobotânica Nativaram*): É este portal institucional — entidade cooperativa sem fins lucrativos de salvaguarda litúrgica, apoio a templos credenciados e rateio logístico sob a Lei 5.764/71 e CONAD 01/2010.
> - **Nativaram Brasil**: É a loja comercial / canal de varejo externo da marca.
> - **Regra:** Neste portal, o nome institucional oficial DEVE ser sempre **Cooperativa Nativaram**.

Todo texto gerado DEVE obedecer ao **Dicionário de Engenharia de Linguagem** abaixo.

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
6. **Diretriz de Geração de Imagens (IA)**: NUNCA gerar figuras humanas ou personagens. Utilizar estritamente objetos botânicos, artefatos sagrados, frascos de vidro âmbar, balanças tradicionais e luz solar na floresta.

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

## Mapeamento de Skills do Agente (Organizadas por Setor)

As habilidades especializadas do projeto estão localizadas em `.agents/skills/` e podem ser acionadas a qualquer momento digitando `/` no chat:

### Setor 1: Segundo Cérebro (Obsidian & Vault)
1. **`/segundo-cerebro-ciclo-memoria-ativa`** (`.agents/skills/segundo-cerebro-ciclo-memoria-ativa/SKILL.md`): Executa o ciclo mandatório de ler o Obsidian antes e gravar no Obsidian após qualquer alteração no código.
2. **`/segundo-cerebro-atualizar-projeto`** (`.agents/skills/segundo-cerebro-atualizar-projeto/SKILL.md`): Atualizar detalhes, escopo ou relações de notas de projetos existentes no vault.
3. **`/segundo-cerebro-atualizar-status`** (`.agents/skills/segundo-cerebro-atualizar-status/SKILL.md`): Alterar o status de uma nota (ideia, planejamento, em andamento, pronto, etc.).
4. **`/segundo-cerebro-auditar-conteudo`** (`.agents/skills/segundo-cerebro-auditar-conteudo/SKILL.md`): Auditar, revisar e higienizar informações mockadas ou temporárias nas notas.
5. **`/segundo-cerebro-criar-projeto`** (`.agents/skills/segundo-cerebro-criar-projeto/SKILL.md`): Criar nova nota de projeto no vault com templates padrão e frontmatter YAML simples.
6. **`/segundo-cerebro-registrar-decisao`** (`.agents/skills/segundo-cerebro-registrar-decisao/SKILL.md`): Registrar decisões técnicas ou de arquitetura formalmente no vault.
7. **`/segundo-cerebro-registrar-ideia`** (`.agents/skills/segundo-cerebro-registrar-ideia/SKILL.md`): Salvar ideias rápidas na Inbox do Obsidian para análise futura.
8. **`/segundo-cerebro-registrar-relacao`** (`.agents/skills/segundo-cerebro-registrar-relacao/SKILL.md`): Criar ou atualizar conexões/relações (`[[Link]]`) entre diferentes notas.
9. **`/segundo-cerebro-revisar-dashboard`** (`.agents/skills/segundo-cerebro-revisar-dashboard/SKILL.md`): Revisar o progresso geral e o dashboard principal de projetos do vault.
10. **`/segundo-cerebro-sugerir-registro`** (`.agents/skills/segundo-cerebro-sugerir-registro/SKILL.md`): Avaliar se marcos técnicos complexos devem ser registrados no vault e propor rascunho.
11. **`/segundo-cerebro-configuracao`** (`.agents/skills/segundo-cerebro-configuracao/SKILL.md`): Configurar e sincronizar as regras do Segundo Cérebro e o `AGENTS.md`.

### Setor 2: Engenharia & Código (Desenvolvimento & Resiliência)
11. **`/engenharia-revisar-codigo`** (`.agents/skills/engenharia-revisar-codigo/SKILL.md`): Revisar código recente em relação a padrões da base (standards) e cumprimento da especificação (spec).
12. **`/engenharia-diagnosticar-bugs`** (`.agents/skills/engenharia-diagnosticar-bugs/SKILL.md`): Investigação e diagnóstico sistemático de falhas, erros de runtime e regressões.
13. **`/engenharia-resolver-conflitos-git`** (`.agents/skills/engenharia-resolver-conflitos-git/SKILL.md`): Guia seguro para resolver conflitos de merge ou rebase no Git.
14. **`/engenharia-guardrails-git`** (`.agents/skills/engenharia-guardrails-git/SKILL.md`): Configurar travas e proteções para impedir comandos destrutivos no Git.
15. **`/engenharia-implementar-especificacao`** (`.agents/skills/engenharia-implementar-especificacao/SKILL.md`): Implementar uma feature ou conjunto de tickets seguindo uma especificação técnica.
16. **`/engenharia-melhorar-arquitetura`** (`.agents/skills/engenharia-melhorar-arquitetura/SKILL.md`): Escanear a base em busca de desacoplamento e aprofundamento de módulos.
17. **`/engenharia-migrar-tipos-shoehorn`** (`.agents/skills/engenharia-migrar-tipos-shoehorn/SKILL.md`): Migrar asserções inseguras `as` em testes TypeScript para tipagem estruturada.

### Setor 3: Testes & Qualidade (TDD & CI)
18. **`/testes-desenvolvimento-tdd`** (`.agents/skills/testes-desenvolvimento-tdd/SKILL.md`): Desenvolvimento guiado por testes no ciclo Red-Green-Refactor.
19. **`/testes-configurar-pre-commit`** (`.agents/skills/testes-configurar-pre-commit/SKILL.md`): Configurar hooks de pré-commit (Husky, lint-staged, formatação e TypeScript).
20. **`/testes-estruturar-exercicios`** (`.agents/skills/testes-estruturar-exercicios/SKILL.md`): Criar estruturas didáticas com testes e gabaritos automatizados.

### Setor 4: Arquitetura & Domínio
21. **`/arquitetura-design-modular`** (`.agents/skills/arquitetura-design-modular/SKILL.md`): Projetar módulos profundos com interfaces simples e desacopladas.
22. **`/arquitetura-modelagem-dominio`** (`.agents/skills/arquitetura-modelagem-dominio/SKILL.md`): Alinhar o vocabulário ubíquo do projeto, manter `CONTEXT.md` e ADRs.
23. **`/arquitetura-prototipar-ui`** (`.agents/skills/arquitetura-prototipar-ui/SKILL.md`): Criar protótipos funcionais rápidos de interface para validação visual e ergonômica.

### Setor 5: Produtividade & IA
24. **`/produtividade-integracao-notebooklm`** (`.agents/skills/produtividade-integracao-notebooklm/SKILL.md`): Consultar notebooks, sincronizar notas do Obsidian e gerar áudios/podcasts via Google NotebookLM.
25. **`/produtividade-pesquisa-tecnica`** (`.agents/skills/produtividade-pesquisa-tecnica/SKILL.md`): Pesquisa técnica aprofundada com fontes primárias oficiais e registro em Markdown.
26. **`/produtividade-sabatina-decisoes`** (`.agents/skills/produtividade-sabatina-decisoes/SKILL.md`): Sabatina rigorosa (Grill Me) para estressar e validar planos, decisões e premissas.
27. **`/produtividade-assistente-wizard`** (`.agents/skills/produtividade-assistente-wizard/SKILL.md`): Gerar assistentes interativos passo a passo (wizard) para operações manuais.
28. **`/produtividade-orientacao-skills`** (`.agents/skills/produtividade-orientacao-skills/SKILL.md`): Orientar o desenvolvedor sobre qual skill ou abordagem utilizar na tarefa.

### Setor 6: Gestão & Fluxo de Trabalho
29. **`/gestao-triagem-issues`** (`.agents/skills/gestao-triagem-issues/SKILL.md`): Triagem sistemática, categorização e etiquetagem de issues no GitHub.
30. **`/gestao-especificacao-tecnica`** (`.agents/skills/gestao-especificacao-tecnica/SKILL.md`): Transformar conversas e ideias em especificações técnicas formais e acionáveis.
31. **`/gestao-gerar-tickets`** (`.agents/skills/gestao-gerar-tickets/SKILL.md`): Quebrar planos e especificações em subtarefas e tickets incrementais.
32. **`/gestao-questionario-requisitos`** (`.agents/skills/gestao-questionario-requisitos/SKILL.md`): Formular questionários objetivos para resolver requisitos ambíguos.
33. **`/gestao-handoff-sessao`** (`.agents/skills/gestao-handoff-sessao/SKILL.md`): Compactar e preparar a transição de contexto para uma nova sessão do agente.
34. **`/gestao-retrospectiva`** (`.agents/skills/gestao-retrospectiva/SKILL.md`): Conduzir retrospectivas técnicas ao fim de marcos de entrega.
35. **`/gestao-mapa-navegacao`** (`.agents/skills/gestao-mapa-navegacao/SKILL.md`): Planejar e monitorar iniciativas de grande porte através de um mapa de decisões.

### Setor 7: Documentação & Redação
36. **`/documentacao-escrita-para-agentes`** (`.agents/skills/documentacao-escrita-para-agentes/SKILL.md`): Escrever regras, skills e documentações de alta fidelidade para agentes de IA.
37. **`/documentacao-redacao-estruturada`** (`.agents/skills/documentacao-redacao-estruturada/SKILL.md`): Redigir artigos, manifestos e textos analíticos parágrafo a parágrafo.
38. **`/documentacao-ensinar-conceito`** (`.agents/skills/documentacao-ensinar-conceito/SKILL.md`): Ensinar conceitos técnicos de forma didática e fundamentada.
39. **`/documentacao-revisar-clareza`** (`.agents/skills/documentacao-revisar-clareza/SKILL.md`): Reformular explicações complexas para garantir clareza absoluta.


