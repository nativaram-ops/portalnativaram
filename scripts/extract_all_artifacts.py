import asyncio
import os
import sys
from pathlib import Path

tools_dir = Path(__file__).resolve().parent.parent / "tools" / "notebooklm-py" / "src"
sys.path.insert(0, str(tools_dir))

from notebooklm.client import NotebookLMClient

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "knowledge-base" / "notebooklm"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

DOCS = [
    ("modelo-ficha-anamnese-ayahuasca.md", "Transcreva na íntegra, linha por linha, sem omitir nada, o arquivo 'modelo-ficha-anamnese-ayahuasca.md'."),
    ("termo-responsabilidade-consentimento-ayahuasca.md", "Transcreva na íntegra, linha por linha, sem omitir nada, o arquivo 'termo-responsabilidade-consentimento-ayahuasca.md'."),
    ("pop-ata-conducao-ritual-ayahuasca.md", "Transcreva na íntegra, linha por linha, sem omitir nada, o arquivo 'pop-ata-conducao-ritual-ayahuasca.md'."),
    ("catalogo-tecnico-graduacoes-ayahuasca.md", "Transcreva na íntegra, linha por linha, sem omitir nada, o arquivo 'catalogo-tecnico-graduacoes-ayahuasca.md'."),
    ("etnofarmacologia-interacoes-contraindicacoes-ayahuasca.md", "Transcreva na íntegra, linha por linha, sem omitir nada, o arquivo 'etnofarmacologia-interacoes-contraindicacoes-ayahuasca.md'.")
]

async def main():
    notebook_id = "ef7036cd-ccbd-4314-ae57-c21334d336d7"
    async with NotebookLMClient.from_storage() as client:
        for filename, prompt in DOCS:
            out_file = OUTPUT_DIR / filename
            print(f"\n==========================================")
            print(f"Extraindo: {filename}...")
            try:
                # Ask in new conversation to prevent token limits / cross-contamination
                resp = await client.chat.ask(notebook_id, prompt)
                content = resp.answer
                out_file.write_text(content, encoding="utf-8")
                print(f"Sucesso! Salvo em {out_file} ({len(content)} caracteres)")
            except Exception as e:
                print(f"Erro ao extrair {filename}: {e}")

if __name__ == "__main__":
    asyncio.run(main())
