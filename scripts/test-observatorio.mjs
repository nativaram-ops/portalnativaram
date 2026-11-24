/**
 * Suíte TDD — Observatório Etnobotânico (Buscador & Anexador Acadêmico)
 * Plano 014 (Grafo 2).
 */

import assert from "node:assert";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

process.env.NATIVARAM_TEST = "1";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;

async function importarRota(caminhoRelativo) {
  const { createRequire } = await import("node:module");
  const createJiti = createRequire(__filename)("jiti");
  const jiti = createJiti(__filename, {
    alias: { "@": path.join(ROOT_DIR, "src") },
  });
  return jiti(path.join(ROOT_DIR, caminhoRelativo));
}

async function test(nome, fn) {
  try {
    await fn();
    console.log(`  ✓ ${nome}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${nome}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

async function run() {
  console.log("\n=======================================================");
  console.log("   TESTES TDD — OBSERVATÓRIO ETNOBOTÂNICO & ANEXADOR");
  console.log("=======================================================\n");

  const {
    limparTextoAcademico,
    normalizarDoi,
    reconstruirResumoOpenAlex,
    filtrarEDesduplicarArtigos,
    formatarCadernoNotebookLM,
    formatarCitacaoABNT,
    formatarBibTeX,
  } = await importarRota("src/lib/observatorio/academic-search.ts");

  await test("Normaliza DOI, limpa HTML e reconstrói resumo invertido OpenAlex", () => {
    assert.strictEqual(normalizarDoi("https://doi.org/10.3390/ph13110334 "), "10.3390/ph13110334");
    assert.strictEqual(normalizarDoi("nao-e-doi"), "");
    assert.strictEqual(
      limparTextoAcademico("<i>Banisteriopsis</i> &amp; caapi &nbsp; study"),
      "Banisteriopsis & caapi study"
    );
    assert.strictEqual(
      reconstruirResumoOpenAlex({ caapi: [1], Banisteriopsis: [0], study: [2] }),
      "Banisteriopsis caapi study"
    );
  });

  await test("Pré-filtro determinístico descarta erratas/sem DOI, prioriza Open Access e desduplica", () => {
    const brutos = [
      {
        doi: "10.1000/errata1",
        titulo: "Corrigendum.",
        autores: "Autor A",
        ano: "2024",
        periodico: "Journal X",
        resumo: "",
        urlOrigem: "https://doi.org/10.1000/errata1",
        acessoAberto: true,
        fonteApi: "EUROPE_PMC",
      },
      {
        doi: "",
        titulo: "Artigo Sem DOI Válido",
        autores: "Autor B",
        ano: "2024",
        periodico: "Journal Y",
        resumo: "",
        urlOrigem: "https://exemplo.org",
        acessoAberto: true,
        fonteApi: "CROSSREF",
      },
      {
        doi: "https://doi.org/10.3390/ph13110334",
        titulo: "Toxicokinetics of Ayahuasca",
        autores: "Brito-da-Costa AM",
        ano: "2020",
        periodico: "Pharmaceuticals",
        resumo: "",
        urlOrigem: "https://doi.org/10.3390/ph13110334",
        acessoAberto: false,
        fonteApi: "CROSSREF",
      },
      {
        doi: "10.3390/ph13110334",
        titulo: "Toxicokinetics of Ayahuasca",
        autores: "Brito-da-Costa AM",
        ano: "2020",
        periodico: "Pharmaceuticals",
        resumo: "Resumo completo da revisão.",
        urlOrigem: "https://europepmc.org/articles/PMC7690791",
        pdfAbertoUrl: "https://www.mdpi.com/1424-8247/13/11/334/pdf",
        acessoAberto: true,
        fonteApi: "EUROPE_PMC",
      },
    ];

    const filtrados = filtrarEDesduplicarArtigos(brutos, false);
    assert.strictEqual(filtrados.length, 1);
    assert.strictEqual(filtrados[0].acessoAberto, true);
    assert.ok(filtrados[0].pdfAbertoUrl);
    assert.strictEqual(filtrados[0].resumo, "Resumo completo da revisão.");
    assert.strictEqual(filtrarEDesduplicarArtigos(brutos, true).length, 1);
  });

  await test("Exportadores ABNT, BibTeX e NotebookLM preservam DOI e aviso institucional (+18)", () => {
    const amostra = {
      doi: "10.3390/ph13110334",
      titulo: "Toxicokinetics of Ayahuasca",
      autores: "Brito-da-Costa AM",
      ano: "2020",
      periodico: "Pharmaceuticals",
      resumo: "Estudo farmacocinético.",
      urlOrigem: "https://doi.org/10.3390/ph13110334",
      acessoAberto: true,
      fonteApi: "EUROPE_PMC",
    };
    assert.ok(formatarCitacaoABNT(amostra).includes("10.3390/ph13110334"));
    assert.ok(formatarBibTeX(amostra).includes("@article{britodacosta2020"));
    const md = formatarCadernoNotebookLM([amostra]);
    assert.ok(md.includes("(+18)"));
    assert.ok(md.includes("CONAD 01/2010"));
  });

  await test("APIs do Observatório: visitante lê seeds (GET); visitante e templo são barrados (401); Conselho respeita linter (422), anexa e remove", async () => {
    const { GET, POST } = await importarRota("src/app/api/estudos/anexos/route.ts");
    const { DELETE } = await importarRota("src/app/api/estudos/anexos/[id]/route.ts");
    const { createSessionToken, SESSION_COOKIE_NAME } = await import("../src/lib/auth/session.ts");

    const dbPaths = [
      path.join(process.cwd(), "data", "anexos_academicos.json"),
      path.join(os.tmpdir(), "nativaram_anexos_academicos.json"),
    ];
    const backups = {};
    for (const p of dbPaths) {
      try {
        backups[p] = await fs.readFile(p, "utf-8");
      } catch {
        backups[p] = null;
      }
    }

    // ADR-016: só o Conselho anexa e remove referências.
    const cookieDir = (codigo) =>
      codigo === "NAT-TEMPLO-OUTRO"
        ? `${SESSION_COOKIE_NAME}=${createSessionToken({ role: "DIRIGENTE", codigo })}`
        : `${SESSION_COOKIE_NAME}=${createSessionToken({ role: "ADMIN", codigo: "ADM-NATIVARAM" })}`;

    try {
      const getRes = await GET(new Request("http://localhost/api/estudos/anexos"));
      assert.strictEqual(getRes.status, 200);
      const getJson = await getRes.json();
      assert.ok(getJson.anexos.length >= 3, "Seeds verificados devem estar listados");

      // Visitante sem sessão não anexa
      const res401 = await POST(
        new Request("http://localhost/api/estudos/anexos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        })
      );
      assert.strictEqual(res401.status, 401);

      const payloadBase = {
        doi: `10.1234/test-${Date.now()}`,
        titulo: "Botânica Tradicional do Juruá",
        autores: "Pesquisador Teste",
        ano: "2025",
        periodico: "Revista Amazônia",
        urlOrigem: "https://doi.org/10.1234/teste",
        eixoTematico: "etnobotanica_jurua",
        sinteseLinguagemClara:
          "Levantamento etnobotânico sobre manejo tradicional e biodiversidade na bacia do Juruá.",
      };

      // Bloqueia termo proibido na síntese/nota (422)
      const res422 = await POST(
        new Request("http://localhost/api/estudos/anexos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            cookie: cookieDir("NAT-TEMPLO-TEST1"),
          },
          body: JSON.stringify({
            ...payloadBase,
            sinteseLinguagemClara:
              "Esta medicina garante a cura da depressão e tem venda livre na loja.",
          }),
        })
      );
      assert.strictEqual(res422.status, 422);

      // Bloqueia URL não-https (400)
      const res400 = await POST(
        new Request("http://localhost/api/estudos/anexos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            cookie: cookieDir("NAT-TEMPLO-TEST1"),
          },
          body: JSON.stringify({
            ...payloadBase,
            urlOrigem: "javascript:alert(1)",
          }),
        })
      );
      assert.strictEqual(res400.status, 400);

      // Cria anexo válido (201)
      const res201 = await POST(
        new Request("http://localhost/api/estudos/anexos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            cookie: cookieDir("NAT-TEMPLO-TEST1"),
          },
          body: JSON.stringify(payloadBase),
        })
      );
      assert.strictEqual(res201.status, 201);
      const created = (await res201.json()).anexo;

      // Outro templo não pode remover (403)
      const res403 = await DELETE(
        new Request(`http://localhost/api/estudos/anexos/${created.id}`, {
          method: "DELETE",
          headers: { cookie: cookieDir("NAT-TEMPLO-OUTRO") },
        }),
        { params: Promise.resolve({ id: created.id }) }
      );
      assert.strictEqual(res403.status, 401, "Sessão de templo não remove anexos");

      // Autor remove (200)
      const res200 = await DELETE(
        new Request(`http://localhost/api/estudos/anexos/${created.id}`, {
          method: "DELETE",
          headers: { cookie: cookieDir("NAT-TEMPLO-TEST1") },
        }),
        { params: Promise.resolve({ id: created.id }) }
      );
      assert.strictEqual(res200.status, 200);
    } finally {
      for (const p of dbPaths) {
        if (backups[p] === null) await fs.rm(p, { force: true }).catch(() => {});
        else await fs.writeFile(p, backups[p], "utf-8");
      }
    }
  });

  await test("API /api/pesquisas-academicas normaliza DOI exato (?q=doi.org/... e ?doi=) e exporta NotebookLM Markdown", async () => {
    const { GET } = await importarRota("src/app/api/pesquisas-academicas/route.ts");

    const resDoi = await GET(
      new Request(
        "http://localhost/api/pesquisas-academicas?q=https%3A%2F%2Fdoi.org%2F10.3390%2Fph13110334"
      )
    );
    assert.strictEqual(resDoi.status, 200);
    const jsonDoi = await resDoi.json();
    assert.strictEqual(jsonDoi.sucesso, true);
    assert.strictEqual(jsonDoi.consulta, "10.3390/ph13110334");
    assert.ok(jsonDoi.fontesConsultadas.includes("MODO_TESTE_DOI_EXATO"));

    const resMd = await GET(
      new Request(
        "http://localhost/api/pesquisas-academicas?doi=10.4324/9780429001161-9&formato=markdown"
      )
    );
    assert.strictEqual(resMd.status, 200);
    assert.ok(resMd.headers.get("content-type")?.includes("text/markdown"));
    const mdText = await resMd.text();
    assert.ok(mdText.includes("(+18)"));
    assert.ok(mdText.includes("CONAD 01/2010"));
  });

  await test("Migração 007 impõe RLS fechado para escrita e seeds em data/ respeitam Dicionário Semântico", async () => {
    const sql = await fs.readFile(
      path.join(ROOT_DIR, "src", "lib", "supabase", "migrations", "007-observatorio-anexos-academicos.sql"),
      "utf-8"
    );
    assert.ok(sql.includes("ENABLE ROW LEVEL SECURITY"));
    assert.ok(sql.includes("REVOKE INSERT, UPDATE, DELETE ON public.anexos_academicos FROM anon, authenticated"));
    assert.ok(/CREATE POLICY[\s\S]*?FOR SELECT[\s\S]*?TO anon, authenticated/i.test(sql));

    for (const rel of [
      "data/comunidade_perfis.json",
      "data/comunidade_posts.json",
      "data/anexos_academicos.json",
    ]) {
      const txt = (await fs.readFile(path.join(ROOT_DIR, rel), "utf-8"))
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      assert.ok(!/\bNativaram Brasil\b/i.test(txt), `${rel} não deve usar Nativaram Brasil`);
      assert.ok(!/\b(cura|curar|remedio|comprar)\b/i.test(txt), `${rel} não deve conter termos proibidos CONAD`);
    }
  });

  await test("Acervo global (>=25 estudos) cobre os 5 eixos, tem DOIs únicos e zero alertas CONAD", async () => {
    const { createRequire } = await import("node:module");
    const req = createRequire(import.meta.url);
    const jitiLocal = req(path.join(ROOT_DIR, "node_modules", "jiti"))(import.meta.url, {
      alias: { "@": path.join(ROOT_DIR, "src") },
    });
    const { ANEXOS_SEMENTE_VERIFICADOS, listarAnexosObservatorio } = jitiLocal(
      path.join(ROOT_DIR, "src", "lib", "db", "observatorio.ts")
    );
    const {
      EIXOS_OBSERVATORIO,
      NovoAnexoObservatorioSchema,
      validarConformidadeAnexo,
    } = jitiLocal(path.join(ROOT_DIR, "src", "lib", "validators", "observatorio.ts"));

    assert.ok(
      ANEXOS_SEMENTE_VERIFICADOS.length >= 25,
      `Esperado >= 25 sementes globais, recebido ${ANEXOS_SEMENTE_VERIFICADOS.length}`
    );

    const eixosPresentes = new Set();
    const dois = new Set();
    for (const item of ANEXOS_SEMENTE_VERIFICADOS) {
      eixosPresentes.add(item.eixoTematico);
      const doiNorm = String(item.doi || "").trim().toLowerCase();
      assert.ok(/^10\.\d{4,9}\/\S+$/.test(doiNorm), `DOI inválido: ${item.doi}`);
      assert.ok(!dois.has(doiNorm), `DOI duplicado no acervo: ${item.doi}`);
      dois.add(doiNorm);
      assert.ok(Boolean(item.paisOrigem?.trim()), `paisOrigem ausente em ${item.id}`);

      const parsed = NovoAnexoObservatorioSchema.safeParse({
        doi: item.doi,
        titulo: item.titulo,
        autores: item.autores,
        ano: item.ano,
        periodico: item.periodico,
        paisOrigem: item.paisOrigem,
        eixoTematico: item.eixoTematico,
        sinteseLinguagemClara: item.sinteseLinguagemClara,
        urlOrigem: item.urlOrigem,
        pdfAbertoUrl: item.pdfAbertoUrl || "",
        notaDirigente: item.notaDirigente || "",
      });
      assert.strictEqual(
        parsed.success,
        true,
        `Falha Zod em ${item.id}: ${parsed.success ? "" : JSON.stringify(parsed.error.issues)}`
      );

      const alertas = validarConformidadeAnexo(item.sinteseLinguagemClara, item.notaDirigente);
      assert.deepStrictEqual(alertas, [], `Alertas de linguagem em ${item.id}: ${alertas.join(", ")}`);
    }

    for (const eixo of EIXOS_OBSERVATORIO) {
      assert.ok(eixosPresentes.has(eixo.id), `Eixo ${eixo.id} sem estudo semente`);
    }

    const jsonDisk = JSON.parse(
      await fs.readFile(path.join(ROOT_DIR, "data", "anexos_academicos.json"), "utf-8")
    );
    assert.strictEqual(jsonDisk.length, ANEXOS_SEMENTE_VERIFICADOS.length);

    const filtroSuica = await listarAnexosObservatorio(undefined, "Suíça");
    assert.ok(filtroSuica.length >= 1, "Busca por país (Suíça) deve retornar estudos");
  });

  console.log("\n=======================================================");
  console.log(`   RESULTADOS: ${passed} passaram | ${failed} falharam`);
  console.log("=======================================================\n");
  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error("ERRO FATAL NOS TESTES DO OBSERVATÓRIO:", err);
  process.exit(1);
});
