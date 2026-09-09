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
        artifacts = await client.artifacts.list(notebook_id)
        print(f"Total artifacts: {len(artifacts)}")
        for art in artifacts:
            print("="*60)
            print(f"Artifact {art.id}: {art.title}")
            for k in dir(art):
                if not k.startswith("_"):
                    try:
                        v = getattr(art, k)
                        if not callable(v):
                            if isinstance(v, str) and len(v) > 200:
                                print(f"  {k}: {v[:200]}... (len={len(v)})")
                            else:
                                print(f"  {k}: {v}")
                    except Exception as e:
                        print(f"  {k}: ERROR {e}")

if __name__ == "__main__":
    asyncio.run(main())
