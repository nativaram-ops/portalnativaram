---
name: second-brain
description: Configura ou cria o arquivo AGENTS.md no diretório atual, mapeando as regras do vault e apontando quando usar cada skill disponível.
---

# Skill: Configuração do Segundo Cérebro (Second Brain)

Use esta skill quando o usuário solicitar para configurar, inicializar ou atualizar a estrutura de instruções do agente (`AGENTS.md`) no diretório do projeto.

## Objetivo

Garantir que o repositório tenha as diretrizes e regras corretas para o funcionamento do agente como organizador do Obsidian (Segundo Cérebro), mapeando claramente quando e como cada uma das skills da pasta `.agent/skills/` deve ser utilizada.

## Gatilho de Ativação

- Quando o usuário executar o comando `/second-brain`.
- Quando o usuário solicitar para "configurar o agente", "inicializar as regras do obsidian", ou "atualizar o AGENTS.md com as skills".

## Como Executar (Passo a Passo)

1. **Verificar Existência do AGENTS.md:**
   - Procure pelo arquivo `AGENTS.md` na raiz do diretório onde a skill está sendo executada.
   - Se o arquivo **não existir**, crie-o do zero utilizando o [Template de Base](#template-de-base-do-agentsmd) definido abaixo.
   - Se o arquivo **já existir**, leia o seu conteúdo para preservar as regras personalizadas já definidas pelo usuário.

2. **Mapear Skills Disponíveis:**
   - Liste as subpastas em `.agent/skills/` (ou na pasta de destino onde as skills estão salvas).
   - Identifique quais skills estão instaladas.
   - Para cada skill identificada, verifique seu objetivo e gatilho lendo o arquivo `SKILL.md` correspondente.

3. **Configurar/Atualizar o AGENTS.md:**
   - Adicione ou atualize a seção `## Mapeamento de Skills do Agente` no final do arquivo `AGENTS.md`.
   - Essa seção deve descrever de forma organizada quando utilizar cada uma das habilidades, apontando os caminhos relativos dos arquivos `SKILL.md` para que futuros agentes possam localizá-las e lê-las facilmente.
   - Veja o formato recomendado em [Seção de Mapeamento de Skills](#formato-da-secao-de-mapeamento-de-skills).

4. **Responder ao Usuário:**
   - Siga a regra de resposta final padrão (Arquivos alterados, Resumo da mudança, Pendências).

---

## Template de Base do AGENTS.md

Caso o arquivo `AGENTS.md` não exista, crie-o exatamente com o conteúdo a seguir:

```markdown
# Instruções do Agente - Segundo Cérebro

Você está ajudando a organizar meu vault do Obsidian.

## Objetivo

Manter o Obsidian como um segundo cérebro para organizar meus projetos, cursos, YouTube, clientes, fluxos n8n, SaaS, ferramentas, IDEs e fontes de renda.

## Local do vault

O conteúdo real do Obsidian fica em:

Segundo-Cerebro/

## Regras Principais

1. **O vault não é um repositório de código:** Não coloque código completo no Obsidian. O vault serve para contexto, status, prioridades, tarefas, links e relações.
2. **Priorize clareza e simplicidade:** O vault deve priorizar organização clara e prática, não um grafo perfeito.
3. **Não invente dados:** Nunca invente projetos, URLs, features, status ou crie conteúdo fictício/mockado. Use "A definir" quando faltar informação.
4. **Edição segura:** Leia a nota antes de editar, preserve o que já existe e altere apenas o necessário. Em caso de ambiguidade, pergunte ao usuário.
5. **Linguagem:** Responda sempre em português do Brasil.
6. **Resposta final:** Após qualquer alteração, responda de forma curta informando:
   - Arquivos alterados
   - Resumo da mudança
   - Pendências, se houver

## Padrão do Obsidian

### YAML Simples
O YAML deve conter apenas campos simples:
- tipo
- status
- prioridade
- ferramenta_principal
- para_quem_e
- fonte_de_renda
- url, categoria, plataforma ou projeto_repo (quando fizer sentido)

*Nota: Não use relações tipadas no YAML (como depende_de, feito_em, etc.).*

### Relações no Corpo da Nota
As relações entre notas devem ficar no corpo da nota, na seção "## Relações", utilizando links internos do Obsidian no formato `[[Nome da Nota]]` (ex: `[[n8n]]`, `[[Infinity8Store]]`).

Exemplo de estrutura:
```markdown
## Relações

### Depende de
### Feito em
### Vendido em
### Alimenta / impulsiona
### Gera renda
### Relacionado a
```

## Ao Criar Novas Notas
1. Use YAML simples.
2. Use "A definir" quando faltar informação textual.
3. Crie a seção "## Relações" somente se houver relações reais informadas.
4. Pergunte ao usuário quando faltar contexto importante.

## Valores Permitidos

### Status
- ideia
- planejamento
- em andamento
- pronto
- em manutenção
- pausado
- travado
- abandonado

### Prioridades
- alta
- média
- baixa
- contínua/obrigatória

### Categorias ("Para quem é")
- Uso próprio
- Cliente
- Venda na loja
- YouTube/conteúdo
- Curso/educação
- Teste/estudo
- Comunidade/amigos
- Assinatura/SaaS

## Ao Receber Pedidos em Linguagem Natural
1. Identifique se é uma ideia, tarefa, decisão, atualização de projeto, mudança de status, criação de projeto ou revisão.
2. Encontre a nota correta dentro de Segundo-Cerebro/.
3. Se não tiver certeza da nota correta, pergunte antes de editar.
4. Se a alteração for pequena e clara, edite diretamente.

## Separação Importante
Arquivos de instrução do agente devem ficar fora do vault (na raiz ou em `.agent/`). Nunca crie regras ou skills dentro de `Segundo-Cerebro/`.
Nunca altere `.obsidian/` ou configurações internas do Obsidian.
```

---

## Formato da Seção de Mapeamento de Skills

A seção a ser adicionada ou atualizada no final do arquivo `AGENTS.md` deve ter o seguinte formato:

```markdown
## Mapeamento de Skills do Agente

Abaixo estão listadas as habilidades específicas disponíveis no diretório `.agent/skills/` e as diretrizes de quando utilizá-las:

1. **Sugerir Registro no Obsidian** (`.agent/skills/sugerir-registro-obsidian/SKILL.md`):
   - **Quando usar:** Sempre que finalizar uma tarefa complexa, instalação de novas ferramentas ou decisões arquiteturais importantes. Serve para avaliar se o resultado deve virar uma nota no vault.

2. **Atualizar Projeto** (`.agent/skills/atualizar-projeto/SKILL.md`):
   - **Quando usar:** Ao receber solicitações para alterar detalhes, escopo, informações gerais ou conteúdo do corpo de uma nota de projeto existente.

3. **Atualizar Status** (`.agent/skills/atualizar-status/SKILL.md`):
   - **Quando usar:** Quando o usuário pedir especificamente para mudar o status de uma nota (ex: de "ideia" para "em andamento" ou "pronto").

4. **Auditar Conteúdo Mockado** (`.agent/skills/auditar-conteudo-mockado/SKILL.md`):
   - **Quando usar:** Ao ser solicitado a realizar auditoria, revisão ou limpeza de informações fictícias ou temporárias nas notas do vault.

5. **Criar Projeto Real** (`.agent/skills/criar-projeto-real/SKILL.md`):
   - **Quando usar:** Sempre que for aprovada a criação de uma nova nota de projeto no vault, garantindo a aplicação dos templates padrão e YAML simples.

6. **NotebookLM Integration** (`.agent/skills/notebooklm/SKILL.md`):
   - **Quando usar:** Quando o usuário pedir para integrar notas do Obsidian com o Google NotebookLM, extrair resumos de fontes do NotebookLM, fazer perguntas sobre os notebooks ou gerar podcasts (Audio Overviews).

7. **Registrar Decisão** (`.agent/skills/registrar-decisao/SKILL.md`):
   - **Quando usar:** Quando uma decisão técnica, escolha de design ou arquitetura de software precisar ser formalmente registrada no vault.

8. **Registrar Ideia** (`.agent/skills/registrar-ideia/SKILL.md`):
   - **Quando usar:** Ao receber ideias soltas ou sugestões rápidas que devam ser salvas na Inbox do Obsidian, sem criar um projeto formal imediatamente.

9. **Registrar Relação** (`.agent/skills/registrar-relacao/SKILL.md`):
   - **Quando usar:** Quando for necessário criar ou atualizar conexões/relações (`[[Link]]`) entre diferentes notas no corpo do vault.

10. **Revisar Dashboard** (`.agent/skills/revisar-dashboard/SKILL.md`):
    - **Quando usar:** Ao receber tarefas de revisão do progresso geral dos projetos ou do dashboard principal do vault.

11. **Configuração do Segundo Cérebro (Second Brain)** (`.agent/skills/second-brain/SKILL.md`):
    - **Quando usar:** Para reconfigurar, atualizar ou criar o arquivo `AGENTS.md` e mapear o uso das demais skills de forma automática.
```
