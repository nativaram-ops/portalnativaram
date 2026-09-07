---
name: engenharia-guardrails-git
description: Configurar travas de segurança no Git para bloquear comandos destrutivos (push forçado, reset hard, etc.).
---

# Skill: Engenharia — Guardrails de Git

Use esta skill para adicionar proteções preventivas contra perda acidental de dados no Git.

## Ações Protegidas
- Bloquear `git reset --hard` sem confirmação explícita.
- Bloquear `git push --force` em branches principais (`main`, `master`).
- Bloquear `git clean -f` e deleção de branches sem backup.
