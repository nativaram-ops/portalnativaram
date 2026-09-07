# Skill: Registrar Relação

Use esta skill quando o usuário pedir para conectar duas notas ou indicar uma dependência/ferramenta/vínculo.

## Objetivo

Registrar relações entre notas no corpo da nota, sob a seção "## Relações", sem alterar o YAML para este fim.

## Passos

1. Identifique a nota de origem (onde a relação será escrita).
2. Identifique a nota de destino (o link a ser adicionado).
3. Identifique o tipo de relação:
   - Depende de (ferramentas, APIs, plataformas necessárias)
   - Feito em (tecnologias, IDEs, builders usados na criação)
   - Vendido em (lojas, plataformas de venda)
   - Alimenta / impulsiona (notas que recebem dados ou tráfego desta)
   - Gera renda (vínculo com fontes de renda)
   - Relacionado a (vínculo genérico ou contextual)
4. Localize a seção "## Relações" na nota de origem.
5. Se não existir, crie-a no final da nota.
6. Adicione o link sob o subtítulo correspondente (ex: `### Depende de`).
7. Não duplique links.

## Regras

- Use Markdown normal: `- [[Nome da Nota]]`.
- Nunca use YAML para registrar relações tipadas.
- Se houver relações antigas no YAML da nota, aproveite para movê-las para o corpo e limpar o YAML.

## Resposta final

Informe:
- relação registrada
- nota de origem
- nota de destino
- tipo de relação
