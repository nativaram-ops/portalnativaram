# Nativaram Brasil — Regras de Projeto

## Identidade Linguística Obrigatória

Este projeto é o portal institucional da **Cooperativa Etnobotânica Nativaram Brasil**.
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

## Mapeamento de Skills do Agente

Abaixo estão listadas as habilidades específicas disponíveis no diretório `.agents/skills/` e as diretrizes de quando utilizá-las:

### Segundo Cérebro & Obsidian
1. **Sugerir Registro no Obsidian** (`.agents/skills/sugerir-registro-obsidian/SKILL.md`):
   - **Quando usar:** Ao finalizar qualquer tarefa técnica complexa, instalação de novas ferramentas ou decisões arquiteturais importantes. Serve para avaliar se o resultado deve virar uma nota no vault e propor o rascunho no final do turno sem criar diretamente.
2. **Atualizar Projeto** (`.agents/skills/atualizar-projeto/SKILL.md`):
   - **Quando usar:** Ao receber solicitações para alterar detalhes, escopo, informações gerais ou conteúdo do corpo de uma nota de projeto existente no vault.
3. **Atualizar Status** (`.agents/skills/atualizar-status/SKILL.md`):
   - **Quando usar:** Quando o usuário pedir especificamente para mudar o status de uma nota (ex: de "ideia" para "em andamento" ou "pronto").
4. **Auditar Conteúdo Mockado** (`.agents/skills/auditar-conteudo-mockado/SKILL.md`):
   - **Quando usar:** Ao ser solicitado a realizar auditoria, revisão ou limpeza de informações fictícias ou temporárias nas notas do vault.
5. **Criar Projeto Real** (`.agents/skills/criar-projeto-real/SKILL.md`):
   - **Quando usar:** Sempre que for aprovada a criação de uma nova nota de projeto no vault, garantindo a aplicação dos templates padrão e YAML simples.
6. **NotebookLM Integration** (`.agents/skills/notebooklm/SKILL.md` / `.agents/skills/notebooklmia/SKILL.md`):
   - **Quando usar:** Quando o usuário pedir para integrar notas do Obsidian com o Google NotebookLM, extrair resumos de fontes do NotebookLM, fazer perguntas sobre os notebooks ou gerar podcasts (Audio Overviews).
7. **Registrar Decisão** (`.agents/skills/registrar-decisao/SKILL.md`):
   - **Quando usar:** Quando uma decisão técnica, escolha de design ou arquitetura de software precisar ser formalmente registrada no vault.
8. **Registrar Ideia** (`.agents/skills/registrar-ideia/SKILL.md`):
   - **Quando usar:** Ao receber ideias soltas ou sugestões rápidas que devam ser salvas na Inbox do Obsidian, sem criar um projeto formal imediatamente.
9. **Registrar Relação** (`.agents/skills/registrar-relacao/SKILL.md`):
   - **Quando usar:** Quando for necessário criar ou atualizar conexões/relações (`[[Link]]`) entre diferentes notas no corpo do vault.
10. **Revisar Dashboard** (`.agents/skills/revisar-dashboard/SKILL.md`):
    - **Quando usar:** Ao receber tarefas de revisão do progresso geral dos projetos ou do dashboard principal do vault.
11. **Configuração do Segundo Cérebro (Second Brain)** (`.agents/skills/second-brain/SKILL.md`):
    - **Quando usar:** Para reconfigurar, atualizar ou sincronizar as diretrizes do Segundo Cérebro e o mapeamento das skills no `AGENTS.md`.

### Engenharia & Governança de Código
- **Code Review** (`.agents/skills/code-review/SKILL.md`): Para revisar código em relação a padrões da base e especificação.
- **Diagnóstico de Bugs** (`.agents/skills/diagnosing-bugs/SKILL.md`): Para investigar falhas e regressões de performance de forma sistemática.
- **Modelagem de Domínio** (`.agents/skills/domain-modeling/SKILL.md`): Para alinhar vocabulário ubíquo e manter `CONTEXT.md` e ADRs.
- **TDD** (`.agents/skills/tdd/SKILL.md`): Para desenvolvimento guiado por testes.
- **Pesquisa Técnica** (`.agents/skills/research/SKILL.md`): Para investigar documentações e fontes primárias registrando descobertas.

