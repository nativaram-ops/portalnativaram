# Skill: Criar Projeto Real

Use esta skill quando o usuário pedir para criar um novo projeto no Obsidian.

## Objetivo

Criar uma nota de projeto real dentro de Segundo-Cerebro/, seguindo o padrão simples (YAML simplificado e relações no corpo).

## Passos

1. Identifique o nome do projeto.
2. Identifique o tipo do projeto.
3. Escolha a pasta correta dentro de Segundo-Cerebro/02-Projetos/.
4. Crie a nota usando o padrão de projeto simples.
5. Preencha apenas informações fornecidas pelo usuário.
6. Onde faltar informação, use “A definir”.
7. Relações devem ser registradas na seção "## Relações" do corpo da nota, nunca no YAML.

## Pastas possíveis

- Segundo-Cerebro/02-Projetos/Sites-e-Lojas/
- Segundo-Cerebro/02-Projetos/Cursos/
- Segundo-Cerebro/02-Projetos/YouTube/
- Segundo-Cerebro/02-Projetos/Clientes/
- Segundo-Cerebro/02-Projetos/Fluxos-n8n/
- Segundo-Cerebro/02-Projetos/Ferramentas-Internas/
- Segundo-Cerebro/02-Projetos/Estudos-e-Testes/
- Segundo-Cerebro/02-Projetos/Jogos-e-Projetos-Pessoais/
- Segundo-Cerebro/02-Projetos/SaaS-e-Produtos/

## Regras

- Use YAML simplificado (`tipo`, `status`, `prioridade`, `ferramenta_principal`, `para_quem_e`, `fonte_de_renda`).
- Não crie projeto fictício.
- Não crie conteúdo mockado.
- Não coloque código completo.
- Não invente URL ou ferramenta.
- Relações ficam no corpo sob "## Relações".

## Resposta final

Informe:
- nota criada
- pasta
- resumo da nota
