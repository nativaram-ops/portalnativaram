# Integração Obsidian + Google NotebookLM (notebooklm-py)

Esta integração permite interagir de forma programática com o Google NotebookLM diretamente a partir das notas do seu Obsidian. Você pode criar notebooks, sincronizar notas como fontes de texto, fazer perguntas (chat) e até mesmo gerar podcasts (Audio Overviews) personalizados das suas notas.

---

## 🛠️ Configuração Inicial e Login

Para que a API funcione, você precisa realizar o login uma primeira vez para armazenar os cookies de autenticação do seu Google NotebookLM localmente.

1. Abra um terminal do PowerShell na raiz do seu projeto.
2. Execute o comando de login usando o ambiente virtual local:
   ```powershell
   .agent\venv\Scripts\notebooklm.exe login
   ```
3. Uma janela do navegador Chromium (gerenciada pelo Playwright) será aberta.
4. Faça o login na sua conta do Google que tem acesso ao NotebookLM.
5. Quando o login for concluído no navegador, a CLI do `notebooklm-py` detectará a sessão automaticamente e salvará as credenciais no seu computador. Você pode fechar o navegador.

---

## 👥 Gerenciando Múltiplas Contas (Perfis)

Você pode logar e gerenciar mais de uma conta no NotebookLM utilizando o recurso de **profiles** (perfis). Por padrão, a CLI e os scripts usam o perfil `default`.

### 1. Criar um novo perfil e fazer login:
```powershell
# Cria o perfil para a segunda conta
.agent\venv\Scripts\notebooklm.exe profile create "trabalho"

# Faz o login nessa conta secundária
.agent\venv\Scripts\notebooklm.exe --profile trabalho login
```

### 2. Listar perfis configurados:
```powershell
.agent\venv\Scripts\notebooklm.exe profile list
```

### 3. Usar um perfil secundário no script de integração:
Basta passar a flag `-p` ou `--profile` no início do comando do script:
```powershell
.agent\venv\Scripts\python.exe .agent\skills\notebooklm\notebooklm_integration.py -p trabalho list
```

---

## 🚀 Como Usar a Integração

O script de integração está disponível em `.agent/skills/notebooklm/notebooklm_integration.py` e deve ser executado utilizando o Python do ambiente virtual local.

### 1. Listar Notebooks Existentes
Veja os notebooks disponíveis na sua conta:
```powershell
.agent\venv\Scripts\python.exe .agent\skills\notebooklm\notebooklm_integration.py list
```

### 2. Criar um Novo Notebook
Crie um notebook vazio:
```powershell
.agent\venv\Scripts\python.exe .agent\skills\notebooklm\notebooklm_integration.py create "Meu Novo Projeto"
```

### 3. Sincronizar uma Nota do Obsidian
Você pode enviar o conteúdo de uma nota do Obsidian como fonte de texto para um notebook existente (passando o `--notebook-id`) ou deixar o script criar um notebook automaticamente com o título da nota (se omitido):

*   **Criando novo notebook automaticamente a partir da nota:**
    ```powershell
    .agent\venv\Scripts\python.exe .agent\skills\notebooklm\notebooklm_integration.py sync "Segundo-Cerebro/02-Projetos/Sites-e-Lojas/Infinity8Store.md"
    ```
*   **Enviando para um notebook existente:**
    ```powershell
    .agent\venv\Scripts\python.exe .agent\skills\notebooklm\notebooklm_integration.py sync "Segundo-Cerebro/02-Projetos/Sites-e-Lojas/Infinity8Store.md" --notebook-id "ID_DO_NOTEBOOK"
    ```

### 4. Fazer uma Pergunta (Chat)
Consulte as fontes de um notebook:
```powershell
.agent\venv\Scripts\python.exe .agent\skills\notebooklm\notebooklm_integration.py ask "ID_DO_NOTEBOOK" "Quais são as prioridades do projeto listadas nesta nota?"
```

### 5. Gerar e Baixar um Podcast (Áudio Overview)
Gere um podcast explicativo das suas fontes e salve o arquivo `.mp3` localmente:
```powershell
.agent\venv\Scripts\python.exe .agent\skills\notebooklm\notebooklm_integration.py podcast "ID_DO_NOTEBOOK" "./artifacts/podcast_infinity.mp3"
```
Você também pode enviar instruções de personalização:
```powershell
.agent\venv\Scripts\python.exe .agent\skills\notebooklm\notebooklm_integration.py podcast "ID_DO_NOTEBOOK" "./artifacts/podcast_infinity.mp3" --instructions "Foque no modelo de negócios e parcerias."
```
