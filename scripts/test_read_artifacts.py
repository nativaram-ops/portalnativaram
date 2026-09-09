import asyncio
import json
import sys
from pathlib import Path

tools_dir = Path(__file__).resolve().parent.parent / "tools" / "notebooklm-py" / "src"
sys.path.insert(0, str(tools_dir))

from notebooklm.client import NotebookLMClient

async def main():
    notebook_id = "ef7036cd-ccbd-4314-ae57-c21334d336d7"
    async with NotebookLMClient.from_storage() as client:
        # Check methods on client.artifacts
        print("client.artifacts methods:", [m for m in dir(client.artifacts) if not m.startswith("_")])
        # Check methods on client.chat
        print("client.chat methods:", [m for m in dir(client.chat) if not m.startswith("_")])

        # Let's try to ask about each file or get the text of each file!
        questions = [
            "Por favor, transcreva na íntegra o conteúdo completo do documento 'modelo-ficha-anamnese-ayahuasca.md'.",
            "Por favor, transcreva na íntegra o conteúdo completo do documento 'termo-responsabilidade-consentimento-ayahuasca.md'.",
            "Por favor, transcreva na íntegra o conteúdo completo do documento 'pop-ata-conducao-ritual-ayahuasca.md'.",
            "Por favor, transcreva na íntegra o conteúdo completo do documento 'catalogo-tecnico-graduacoes-ayahuasca.md'.",
            "Por favor, transcreva na íntegra o conteúdo completo do documento 'etnofarmacologia-interacoes-contraindicacoes-ayahuasca.md'."
        ]
        
        # Test asking the first question
        print("Asking question 1...")
        resp = await client.chat.ask(notebook_id, questions[0])
        print("Response received! Length:", len(resp.answer))
        print("Snippet:", resp.answer[:500])

if __name__ == "__main__":
    asyncio.run(main())
