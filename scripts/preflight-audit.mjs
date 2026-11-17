/**
 * Pré-filtro determinístico (Modelo Andrej Karpathy — Pilar 4).
 * Executa checagens mecânicas rápidas em código, ativos e Obsidian
 * ANTES de acionar modelos de IA para economizar tokens e impedir regressões.
 *
 * Uso: cmd.exe /c npm run audit:preflight
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const FALHAS = [];
const AVISOS = [];

async function walk(dir, exts) {
  const result = [];
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    const fp = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".obsidian", ".git"].includes(entry.name)) continue;
      result.push(...(await walk(fp, exts)));
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      result.push(fp);
    }
  }
  return result;
}

async function checkCodigoSrc() {
  const srcFiles = await walk(path.join(ROOT_DIR, "src"), [".ts", ".tsx", ".css"]);
  const regras = [
    { re: /556899779104/, msg: "Número legado 556899779104 encontrado (usar 5568999979104)" },
    { re: /\banimate-flicker\b/, msg: "Classe CSS indefinida animate-flicker" },
    { re: /\btext-display-(xs|2xl)\b/, msg: "Classe Tailwind indefinida text-display-xs/2xl" },
    { re: /href="#sacralidade"/, msg: "Âncora quebrada href=\"#sacralidade\"" },
    { re: /\bMarco Sanit[aá]rio ANVISA\b/i, msg: "Referência sem fonte a Marco Sanitário ANVISA" },
  ];

  // Verifica ausência de barrel files eliminados (ADR-003) e imagens de IA de locais removidas (ADR-015)
  for (const removido of [
    "src/components/home/index.ts",
    "src/components/funil/index.ts",
    "public/assets/manifesto/agrofloresta-projetos-de-luz.jpg",
    "public/assets/manifesto/nascidos-raio-de-sol.jpg",
    "public/assets/projetos-de-luz/projeto-luz-altar.jpg",
  ]) {
    try {
      await fs.access(path.join(ROOT_DIR, removido));
      FALHAS.push(`Arquivo proibido reapareceu (ADR-003/ADR-015): ${removido}`);
    } catch {
      // ok
    }
  }

  for (const file of srcFiles) {
    const rel = path.relative(ROOT_DIR, file).replace(/\\/g, "/");
    const lines = (await fs.readFile(file, "utf-8")).split(/\r?\n/);
    lines.forEach((line, idx) => {
      for (const regra of regras) {
        if (regra.re.test(line)) {
          FALHAS.push(`${rel}:${idx + 1} -> ${regra.msg}`);
        }
      }
      if (/from "@\/components\/(home|funil)"/.test(line)) {
        FALHAS.push(`${rel}:${idx + 1} -> Import de barrel proibido (ADR-003)`);
      }
    });
  }
  console.log(`  ✓ ${srcFiles.length} arquivos em src/ verificados (ADR-003, WhatsApp, CSS e âncoras)`);
}

async function checkDocumentosPublicos() {
  const docsDir = path.join(ROOT_DIR, "public", "documentos");
  const files = await fs.readdir(docsDir).catch(() => []);
  const limiteMB = 3;
  let pesados = 0;

  for (const name of files) {
    const st = await fs.stat(path.join(docsDir, name));
    const mb = st.size / (1024 * 1024);
    if (mb > limiteMB) {
      pesados++;
      AVISOS.push(`public/documentos/${name}: ${mb.toFixed(1)} MB (> ${limiteMB} MB, Plano 011 A7)`);
    }
  }
  console.log(`  ✓ ${files.length} arquivos em public/documentos/ auditados (${pesados} acima de ${limiteMB} MB)`);
}

async function checkSkillsEMemoria() {
  const skillsDir = path.join(ROOT_DIR, ".agents", "skills");
  const dirs = await fs.readdir(skillsDir, { withFileTypes: true }).catch(() => []);
  const validSkills = [];
  for (const d of dirs) {
    if (!d.isDirectory() && !d.isSymbolicLink()) continue;
    const skillFile = path.join(skillsDir, d.name, "SKILL.md");
    try {
      await fs.access(skillFile);
      validSkills.push(d.name);
    } catch {
      FALHAS.push(`Skill sem SKILL.md: .agents/skills/${d.name}`);
    }
  }

  for (const nota of [
    "Segundo-Cerebro/06-Arquitetura-do-Portal/Indice-de-Recuperacao-Rapida.md",
    "Segundo-Cerebro/06-Arquitetura-do-Portal/Roadmap-e-Componentes-do-Site.md",
    "Segundo-Cerebro/06-Arquitetura-do-Portal/Guia-de-Skills-e-Comandos.md",
    "Segundo-Cerebro/06-Arquitetura-do-Portal/Modelo-Operacional-Karpathy.md",
  ]) {
    try {
      await fs.access(path.join(ROOT_DIR, nota));
    } catch {
      FALHAS.push(`Nota crítica do Obsidian ausente: ${nota}`);
    }
  }
  console.log(`  ✓ ${validSkills.length} skills locais com SKILL.md e notas estruturais do cofre conferidas`);
}

async function checkDadosPublicos() {
  const alvos = [
    "data/comunidade_perfis.json",
    "data/comunidade_posts.json",
    "data/anexos_academicos.json",
  ];
  const regrasDados = [
    { re: /\bNativaram Brasil\b/i, msg: "Marca comercial externa Nativaram Brasil no seed" },
    { re: /\b(cura|curar|remedio|comprar|lojacomercial)\b/i, msg: "Vocabulário proibido CONAD/AGENTS.md" },
  ];

  for (const rel of alvos) {
    const raw = await fs.readFile(path.join(ROOT_DIR, rel), "utf-8").catch(() => "");
    if (!raw) continue;
    const norm = raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    for (const r of regrasDados) {
      if (r.re.test(norm)) {
        FALHAS.push(`${rel} -> ${r.msg}`);
      }
    }
  }
  console.log(`  ✓ ${alvos.length} arquivos de dados públicos em data/ verificados (marca e CONAD)`);
}

async function main() {
  console.log("\n=======================================================");
  console.log("   PRE-FLIGHT DETERMINÍSTICO — COOPERATIVA NATIVARAM");
  console.log("=======================================================\n");

  await checkCodigoSrc();
  await checkDadosPublicos();
  await checkDocumentosPublicos();
  await checkSkillsEMemoria();

  if (AVISOS.length > 0) {
    console.log("\nAvisos técnicos conhecidos:");
    for (const a of AVISOS) console.log(`  ! ${a}`);
  }

  if (FALHAS.length > 0) {
    console.error("\nFalhas bloqueantes detectadas:");
    for (const f of FALHAS) console.error(`  ✗ ${f}`);
    process.exit(1);
  }

  console.log("\n✓ Pre-flight determinístico concluído com sucesso.\n");
}

main().catch((err) => {
  console.error("ERRO NO PREFLIGHT:", err);
  process.exit(1);
});
