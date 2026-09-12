import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");

const dependencyGraph = {};
const layerCounts = {
  app: 0,
  components: 0,
  lib: 0,
  types: 0,
  data: 0,
};

const crossLayerViolations = [];
const fanIn = {};
const fanOut = {};

async function getAllFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(res)));
    } else if (res.endsWith(".ts") || res.endsWith(".tsx")) {
      files.push(res);
    }
  }
  return files;
}

function classifyLayer(filePath) {
  const rel = path.relative(SRC_DIR, filePath).replace(/\\/g, "/");
  if (rel.startsWith("app/")) return "app";
  if (rel.startsWith("components/")) return "components";
  if (rel.startsWith("lib/")) return "lib";
  if (rel.startsWith("types/")) return "types";
  if (rel.startsWith("data/")) return "data";
  return "other";
}

async function analyzeAST() {
  const files = await getAllFiles(SRC_DIR);
  console.log(`[AST-SCAN] Analisando ${files.length} arquivos TypeScript em src/...`);

  for (const file of files) {
    const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, "/");
    const sourceCode = await fs.readFile(file, "utf-8");
    const sourceFile = ts.createSourceFile(
      file,
      sourceCode,
      ts.ScriptTarget.Latest,
      true
    );

    const layer = classifyLayer(file);
    if (layerCounts[layer] !== undefined) layerCounts[layer]++;

    dependencyGraph[relPath] = [];
    fanOut[relPath] = 0;
    if (!fanIn[relPath]) fanIn[relPath] = 0;

    function visit(node) {
      if (ts.isImportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier.text;
        dependencyGraph[relPath].push(moduleSpecifier);
        fanOut[relPath]++;

        // Checar acoplamentos de camadas (Layering rules)
        // Regra limpa: lib/ e data/ não devem importar de components/ ou app/
        if (layer === "lib" || layer === "data" || layer === "types") {
          if (
            moduleSpecifier.includes("/components/") ||
            moduleSpecifier.includes("/app/") ||
            moduleSpecifier.startsWith("@/components") ||
            moduleSpecifier.startsWith("@/app")
          ) {
            crossLayerViolations.push({
              source: relPath,
              sourceLayer: layer,
              target: moduleSpecifier,
            });
          }
        }
      }
      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
  }

  // Contabilizar fan-in
  for (const [source, targets] of Object.entries(dependencyGraph)) {
    for (const target of targets) {
      if (!fanIn[target]) fanIn[target] = 0;
      fanIn[target]++;
    }
  }

  console.log("\n=======================================================");
  console.log("   RELATÓRIO DA VARREDURA AST (ÁRVORE DE SINTAXE)");
  console.log("=======================================================\n");

  console.log("1. Distribuição por Camada:");
  for (const [l, count] of Object.entries(layerCounts)) {
    console.log(`   • Camada '${l}': ${count} arquivos`);
  }

  console.log(`\n2. Violações de Acoplamento Vertical (Camadas Baixas -> Altas): ${crossLayerViolations.length}`);
  if (crossLayerViolations.length === 0) {
    console.log("   ✓ Arquitetura 100% limpa! Nenhuma dependência invertida (lib/data/types não importam de UI).");
  } else {
    for (const v of crossLayerViolations) {
      console.log(`   ✗ [VIOLAÇÃO] ${v.source} (${v.sourceLayer}) importa ${v.target}`);
    }
  }

  console.log("\n3. Módulos com Maior Centralidade (Alta Taxa de Importação / Hubs):");
  const topFanIn = Object.entries(fanIn)
    .filter(([k]) => k.startsWith("@/") || k.startsWith("."))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  for (const [target, count] of topFanIn) {
    console.log(`   • ${target} (importado ${count} vezes)`);
  }

  console.log("\n=======================================================\n");
}

analyzeAST().catch((err) => {
  console.error("Erro na análise AST:", err);
  process.exit(1);
});
