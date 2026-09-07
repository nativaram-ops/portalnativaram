---
name: engenharia-resolver-conflitos-git
description: Guia e procedimentos para resolver conflitos de merge ou rebase no Git de forma segura.
---

# Skill: Engenharia — Resolver Conflitos Git

Use esta skill quando houver conflitos de merge ou rebase ativos no repositório.

## Procedimento
1. Executar `git status` para identificar arquivos em conflito.
2. Inspecionar as marcações `<<<<<<<`, `=======`, `>>>>>>>`.
3. Decidir qual versão preservar ou combinar as mudanças coerentemente.
4. Executar os testes/build para garantir que o código compila perfeitamente após a resolução.
5. Adicionar os arquivos resolvidos e finalizar o merge/rebase.
