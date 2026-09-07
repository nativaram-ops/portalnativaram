---
name: produtividade-integracao-notebooklm
description: Consultar notebooks, sincronizar notas do Obsidian e gerar áudios/podcasts com o Google NotebookLM.
---

# Skill: Produtividade — Integração Google NotebookLM

Use esta skill para operar o Google NotebookLM através da CLI local em Python.

## Comandos Técnicos
Sempre utilize o ambiente virtual local configurado em `tools/notebooklm-py/.venv`:

### 1. Listar Notebooks
```powershell
npm run notebooklm -- list
```

### 2. Consultar Fontes (Perguntas)
```powershell
tools\notebooklm-py\.venv\Scripts\python.exe tools\notebooklm_integration.py ask "<notebook_id>" "<pergunta>"
```

### 3. Sincronizar Nota do Obsidian
```powershell
tools\notebooklm-py\.venv\Scripts\python.exe tools\notebooklm_integration.py sync "<caminho_da_nota>" --notebook-id "<notebook_id>"
```

### 4. Gerar Podcast (Audio Overview)
```powershell
tools\notebooklm-py\.venv\Scripts\python.exe tools\notebooklm_integration.py podcast "<notebook_id>" "<caminho_saida.mp3>"
```
