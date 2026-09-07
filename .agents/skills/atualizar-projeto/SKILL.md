# Skill: Atualizar Projeto

Use esta skill quando o usuário pedir para adicionar informação, tarefa, feature, relação ou contexto a um projeto existente.

## Objetivo

Atualizar uma nota existente seguindo o padrão simples de organização.

## Passos

1. Identifique o projeto citado.
2. Localize a nota dentro de Segundo-Cerebro/.
3. Leia a nota antes de editar.
4. Identifique a seção correta para a nova informação.
5. Se for uma relação (dependência, ferramenta, etc), adicione na seção "## Relações" no corpo da nota.
6. Se a relação envolver YAML antigo (campos como `depende_de`), mova essa informação para o corpo e limpe o YAML.
7. Preserve o restante da nota.

## Regras

- Não use relações tipadas no YAML.
- Relações devem usar subtítulos em "## Relações":
  - Depende de
  - Feito em
  - Vendido em
  - Alimenta / impulsiona
  - Gera renda
  - Relacionado a
- Não reescreva a nota inteira sem necessidade.
- Não remova conteúdo real.

## Resposta final

Informe:
- projeto atualizado
- resumo da mudança
