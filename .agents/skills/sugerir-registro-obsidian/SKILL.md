# Skill: Sugerir Registro no Obsidian

Use esta skill de forma contínua ao finalizar qualquer tarefa técnica complexa, decisão de arquitetura ou instalação de novas ferramentas no workspace.

## Objetivo

Avaliar se os resultados ou decisões tomadas em uma tarefa de desenvolvimento são relevantes para o "Segundo Cérebro" e propor ao usuário a criação ou atualização de notas de maneira estruturada.

## Gatilho de Ativação

Sempre ao concluir uma tarefa no projeto que resulte em:
- Instalação de uma nova ferramenta importante (ex: `notebooklm-py`).
- Criação de uma nova integração técnica ou script wrapper.
- Definição de uma nova arquitetura ou decisão de design de longo prazo.
- Conclusão de uma meta de projeto que altere seu status real.

## Raciocínio de Relevância

Antes de propor, use seu raciocínio lógico interno para responder a estas perguntas:
1. *Esta ferramenta/projeto é de uso contínuo ou terá relevância a longo prazo?*
2. *Há informações estruturadas (como status, prioridade, relações) que façam sentido no contexto do vault?*
3. *A inclusão desta nota ajudará o usuário a ter visibilidade sobre seu ecossistema de projetos/ferramentas?*

Se a resposta for SIM, ative a proposta. Se for uma modificação temporária ou transiente (ex: correção de um bug pontual), não proponha nada.

## Como Executar a Proposta

1. **Não registre diretamente:** Nunca crie a nota no vault sem o consentimento do usuário.
2. **Formule a Proposta no Final do Turno:** Junto com a sua resposta final usual, inclua uma seção chamada `### Proposta de Registro no Obsidian`.
3. **Apresente o Rascunho:**
   - Sugira o **caminho da nota** (ex: `Segundo-Cerebro/02-Projetos/Ferramentas-Internas/notebooklm.md`).
   - Mostre o rascunho do **YAML Simples** e as **Seções principais** (incluindo `## Relações` se houver).
   - Use dados reais extraídos da tarefa (como `ferramenta_principal`, `status`, etc.).
4. **Pergunte ao Usuário:** Faça uma pergunta direta se ele deseja que você registre aquela nota proposta no Obsidian.

## Exemplo de Proposta

```markdown
### Proposta de Registro no Obsidian

Identifiquei que a ferramenta X que acabamos de instalar é relevante para o seu Segundo Cérebro. Deseja que eu crie a seguinte nota?

**Caminho sugerido:** `Segundo-Cerebro/02-Projetos/Ferramentas-Internas/ferramenta-x.md`

**Rascunho da nota:**
---
tipo: ferramenta
status: pronto
prioridade: média
ferramenta_principal: ferramenta-x
para_quem_e: Uso próprio
---
# Ferramenta X

## Objetivo
Facilitar a automação de Y.

## Relações
### Alimenta / impulsiona
- [[Projeto Principal]]
```

## Próximo Passo após Aprovação

Se o usuário aprovar a proposta (ou solicitar ajustes):
1. Crie ou atualize a nota correspondente no vault usando as diretrizes de [criar-projeto-real](file:///e:/Antigravity/Obsidian-Segundo-Cerebro/.agent/skills/criar-projeto-real/SKILL.md).
2. Reporte a conclusão da nota na resposta final.
