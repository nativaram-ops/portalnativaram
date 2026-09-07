import argparse
import asyncio
import os
import sys
from typing import Optional

# Adicionar a pasta clonada do notebooklm-py ao sys.path para garantir que o script funcione mesmo em ambientes diferentes
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../notebooklm-py/src")))

try:
    from notebooklm import NotebookLMClient
except ImportError:
    print("Erro: A biblioteca 'notebooklm-py' não está instalada no ambiente atual.")
    print("Certifique-se de executar este script usando o Python do ambiente virtual local:")
    print("  .agent\\venv\\Scripts\\python.exe notebooklm_integration.py")
    sys.exit(1)


async def list_notebooks(profile: Optional[str] = None):
    """Lista todos os notebooks da conta."""
    async with NotebookLMClient.from_storage(profile=profile) as client:
        print(f"Buscando notebooks (Perfil: {profile or 'default'})...")
        notebooks = await client.notebooks.list()
        if not notebooks:
            print("Nenhum notebook encontrado.")
            return
        
        print("\nNotebooks Disponíveis:")
        print("-" * 50)
        for nb in notebooks:
            print(f"ID: {nb.id} | Título: {nb.title}")
        print("-" * 50)


async def create_notebook(title: str, profile: Optional[str] = None):
    """Cria um novo notebook."""
    async with NotebookLMClient.from_storage(profile=profile) as client:
        print(f"Criando notebook '{title}' (Perfil: {profile or 'default'})...")
        nb = await client.notebooks.create(title)
        print(f"Notebook criado com sucesso! ID: {nb.id}")
        return nb.id


async def sync_note(
    note_path: str, 
    notebook_id: Optional[str] = None, 
    notebook_title: Optional[str] = None, 
    profile: Optional[str] = None
):
    """Sincroniza uma nota do Obsidian como fonte de texto no NotebookLM."""
    if not os.path.exists(note_path):
        print(f"Erro: O arquivo '{note_path}' não foi encontrado.")
        return

    # Ler o conteúdo da nota
    with open(note_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determinar o título da nota a partir do nome do arquivo
    note_title = os.path.splitext(os.path.basename(note_path))[0]

    async with NotebookLMClient.from_storage(profile=profile) as client:
        # Se não houver notebook_id, cria um novo ou tenta encontrar um
        if not notebook_id:
            title_to_use = notebook_title or f"Obsidian: {note_title}"
            print(f"Nenhum ID de notebook fornecido. Criando notebook '{title_to_use}' (Perfil: {profile or 'default'})...")
            nb = await client.notebooks.create(title_to_use)
            notebook_id = nb.id
            print(f"Notebook criado: {notebook_id}")

        print(f"Adicionando a nota '{note_title}' como fonte no notebook {notebook_id}...")
        # Adiciona a nota como texto
        source = await client.sources.add_text(notebook_id, note_title, content)
        print(f"Nota sincronizada com sucesso! ID da Fonte: {source.id}")
        print(f"Título da fonte: {source.title}")


async def ask_question(notebook_id: str, query: str, profile: Optional[str] = None):
    """Faz uma pergunta ao chat do notebook."""
    async with NotebookLMClient.from_storage(profile=profile) as client:
        print(f"Enviando pergunta para o notebook {notebook_id} (Perfil: {profile or 'default'})...")
        result = await client.chat.ask(notebook_id, query)
        print("\nResposta do NotebookLM:")
        print("=" * 60)
        print(result.answer)
        print("=" * 60)


async def generate_podcast(
    notebook_id: str, 
    output_path: str, 
    instructions: Optional[str] = None, 
    profile: Optional[str] = None
):
    """Gera e baixa o podcast (áudio overview) do notebook."""
    async with NotebookLMClient.from_storage(profile=profile) as client:
        print(f"Iniciando a geração do podcast para o notebook {notebook_id} (Perfil: {profile or 'default'})...")
        status = await client.artifacts.generate_audio(notebook_id, instructions=instructions)
        print(f"Geração iniciada. Task ID: {status.task_id}")
        
        print("Aguardando conclusão (isso pode levar alguns minutos)...")
        final = await client.artifacts.wait_for_completion(
            notebook_id, status.task_id, timeout=600, initial_interval=15
        )

        if final.is_complete:
            print("Podcast gerado com sucesso!")
            print("Iniciando o download do arquivo de áudio...")
            download_dir = os.path.dirname(output_path)
            if download_dir and not os.path.exists(download_dir):
                os.makedirs(download_dir, exist_ok=True)
            
            # Download do áudio
            downloaded_path = await client.artifacts.download_audio(notebook_id, output_path)
            print(f"Download concluído! Salvo em: {downloaded_path}")
        else:
            print(f"Erro na geração. Status final: {final.status}")


def main():
    parser = argparse.ArgumentParser(description="Integração do Obsidian com o Google NotebookLM")
    parser.add_argument("-p", "--profile", help="Nome do perfil do NotebookLM a ser utilizado (default: default)")
    subparsers = parser.add_subparsers(dest="command", help="Comando a ser executado")

    # Comando: list
    subparsers.add_parser("list", help="Lista todos os notebooks da conta")

    # Comando: create
    create_parser = subparsers.add_parser("create", help="Cria um novo notebook")
    create_parser.add_argument("title", help="Título do notebook")

    # Comando: sync
    sync_parser = subparsers.add_parser("sync", help="Sincroniza uma nota do Obsidian como fonte de texto")
    sync_parser.add_argument("note_path", help="Caminho do arquivo markdown da nota")
    sync_parser.add_argument("--notebook-id", help="ID do notebook onde a nota será adicionada")
    sync_parser.add_argument("--notebook-title", help="Título do notebook caso precise criar um novo")

    # Comando: ask
    ask_parser = subparsers.add_parser("ask", help="Faz uma pergunta no chat do notebook")
    ask_parser.add_argument("notebook_id", help="ID do notebook")
    ask_parser.add_argument("query", help="A pergunta/consulta")

    # Comando: podcast
    podcast_parser = subparsers.add_parser("podcast", help="Gera e faz o download do áudio overview (podcast)")
    podcast_parser.add_argument("notebook_id", help="ID do notebook")
    podcast_parser.add_argument("output_path", help="Caminho de saída para salvar o arquivo .mp3")
    podcast_parser.add_argument("--instructions", help="Instruções de personalização para o podcast")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    if args.command == "list":
        asyncio.run(list_notebooks(args.profile))
    elif args.command == "create":
        asyncio.run(create_notebook(args.title, args.profile))
    elif args.command == "sync":
        asyncio.run(sync_note(args.note_path, args.notebook_id, args.notebook_title, args.profile))
    elif args.command == "ask":
        asyncio.run(ask_question(args.notebook_id, args.query, args.profile))
    elif args.command == "podcast":
        asyncio.run(generate_podcast(args.notebook_id, args.output_path, args.instructions, args.profile))


if __name__ == "__main__":
    main()
