# Skill: Sincronização e Uso do Google NotebookLM

Use esta skill quando o usuário pedir para integrar notas do Obsidian com o Google NotebookLM, extrair resumos das fontes do NotebookLM, fazer perguntas sobre os notebooks ou gerar podcasts (Audio Overviews).

## Objetivo

Permitir que o agente do Antigravity gerencie o Google NotebookLM de forma programática usando o ambiente virtual Python isolado e o script de integração `notebooklm_integration.py`.

## Gerenciamento de Múltiplos Perfis (Contas)

Se o usuário tiver mais de uma conta logada (por exemplo, "default", "trabalho", "pessoal"), você pode especificar qual perfil utilizar passando a flag global `-p <nome_perfil>` ou `--profile <nome_perfil>` no início do script.

Exemplo:
```powershell
tools\notebooklm-py\.venv\Scripts\python.exe tools\notebooklm_integration.py -p trabalho list
```

## Quando Usar

- "Envie a nota X para o NotebookLM na minha conta de trabalho"
- "Sincronize meu projeto Y no NotebookLM"
- "Faça a pergunta Z no notebook A"
- "Gere um podcast sobre o projeto B"
- "Crie um notebook chamado C"
- "Liste meus notebooks no NotebookLM"

## Como Executar (Comandos Técnicos)

Os comandos devem sempre ser rodados usando o Python e a CLI local do ambiente virtual instalado em `tools/notebooklm-py/.venv`. Adicione a flag `-p <perfil>` se o usuário solicitar uma conta que não seja a padrão:

### 1. Instruir Login
Se o usuário precisar logar uma nova conta/perfil:
```powershell
tools\notebooklm-py\.venv\Scripts\notebooklm.exe profile create "<nome_perfil>"
tools\notebooklm-py\.venv\Scripts\notebooklm.exe --profile "<nome_perfil>" login
```
*Nota: Não tente rodar o comando `login` de forma assíncrona/background automatizada que bloqueie o terminal, pois ele abre uma janela interativa de navegador.*

### 2. Listar Notebooks
Para buscar a lista de notebooks e seus IDs:
```powershell
tools\notebooklm-py\.venv\Scripts\python.exe tools\notebooklm_integration.py [-p <perfil>] list
# Ou diretamente via npm:
npm run notebooklm -- list
```

### 3. Sincronizar Nota
Para enviar uma nota markdown como fonte de texto para o NotebookLM:
```powershell
tools\notebooklm-py\.venv\Scripts\python.exe tools\notebooklm_integration.py [-p <perfil>] sync "<caminho_da_nota>" --notebook-id "<notebook_id>"
```

### 4. Consultar (Chat)
Para fazer uma pergunta baseada nas fontes de um notebook:
```powershell
tools\notebooklm-py\.venv\Scripts\python.exe tools\notebooklm_integration.py [-p <perfil>] ask "<notebook_id>" "<pergunta>"
```

### 5. Gerar Podcast (Audio Overview)
Para gerar e baixar o áudio em formato `.mp3`:
```powershell
tools\notebooklm-py\.venv\Scripts\python.exe tools\notebooklm_integration.py [-p <perfil>] podcast "<notebook_id>" "<caminho_saida_mp3>"
```

## Regras Importantes

1. **Localização das Notas:** As notas do Obsidian ficam localizadas sob `Segundo-Cerebro/`. Certifique-se de fornecer o caminho correto do arquivo.
2. **Tratamento de ID:** Sempre anote os IDs dos notebooks retornados pelo script para usá-los em comandos subsequentes.
3. **Limite de API Não Oficial:** Como a API não é oficial, se ocorrer algum erro de conexão ou expiração de token, instrua o usuário a renovar o login com `tools\notebooklm-py\.venv\Scripts\notebooklm.exe login`.
