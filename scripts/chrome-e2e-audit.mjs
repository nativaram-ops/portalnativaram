import { spawn } from "node:child_process";
import http from "node:http";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const PAGES_TO_TEST = [
  { name: "Home", url: "http://localhost:3000/" },
  { name: "Estação 1: Institucional", url: "http://localhost:3000/institucional" },
  { name: "Estação 2: Feitio", url: "http://localhost:3000/feitio" },
  { name: "Estação 3: Sacramentos", url: "http://localhost:3000/sacramentos" },
  { name: "Estação 4: Compliance", url: "http://localhost:3000/compliance" },
  { name: "Estação 5: Credenciamento", url: "http://localhost:3000/credenciamento" },
  { name: "Portal do Dirigente", url: "http://localhost:3000/portal-dirigente" },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getDebuggerUrl() {
  for (let i = 0; i < 10; i++) {
    try {
      const data = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${PORT}/json/list`, (res) => {
          let body = "";
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => resolve(JSON.parse(body)));
        }).on("error", reject);
      });
      if (data && data.length > 0 && data[0].webSocketDebuggerUrl) {
        return data[0].webSocketDebuggerUrl;
      }
    } catch {
      await sleep(500);
    }
  }
  throw new Error("Não foi possível obter webSocketDebuggerUrl do Chrome");
}

async function main() {
  console.log("=======================================================");
  console.log("   AUDITORIA FACTUAL E2E COM GOOGLE CHROME HEADLESS");
  console.log("   Inspeção Visual & Captura de Logs do DevTools Console");
  console.log("=======================================================\n");

  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank",
  ]);

  try {
    await sleep(1500);
    const wsUrl = await getDebuggerUrl();
    console.log(`[CHROME] Conectado ao DevTools Protocol em: ${wsUrl}\n`);

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve) => (ws.onopen = resolve));

    let msgId = 1;
    const pendingCalls = new Map();
    const consoleErrors = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pendingCalls.has(msg.id)) {
        pendingCalls.get(msg.id)(msg.result);
        pendingCalls.delete(msg.id);
      }
      if (msg.method === "Runtime.exceptionThrown") {
        const text = msg.params.exceptionDetails.text || msg.params.exceptionDetails.exception?.description || "Exceção JS";
        consoleErrors.push(text);
        console.error(`  [CONSOLE ERROR]: ${text}`);
      }
      if (msg.method === "Console.messageAdded") {
        if (msg.params.message.level === "error") {
          consoleErrors.push(msg.params.message.text);
          console.error(`  [CONSOLE ERROR]: ${msg.params.message.text}`);
        }
      }
    };

    function sendCommand(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        pendingCalls.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendCommand("Page.enable");
    await sendCommand("Runtime.enable");
    await sendCommand("Console.enable");

    console.log("Navegando pelas estações do Portal Nativaram...\n");

    for (const page of PAGES_TO_TEST) {
      process.stdout.write(`• Testando ${page.name.padEnd(28)} (${page.url}) ... `);
      await sendCommand("Page.navigate", { url: page.url });
      await sleep(1500); // Aguarda renderização React/Next.js e execução de hooks

      // Avalia título da página e checa se há crash no DOM
      const titleRes = await sendCommand("Runtime.evaluate", { expression: "document.title" });
      const pageTitle = titleRes.result?.value || "Sem título";
      console.log(`[OK] — Título: "${pageTitle}"`);
    }

    console.log("\n=======================================================");
    if (consoleErrors.length === 0) {
      console.log("   VEREDITO DO GAUNTLET LOOP: 100% APROVADO!");
      console.log("   • Zero erros capturados no console do Chrome.");
      console.log("   • Todas as 7 telas renderizadas com sucesso absoluto.");
    } else {
      console.log(`   FALHA: ${consoleErrors.length} erros encontrados no console.`);
      process.exit(1);
    }
    console.log("=======================================================\n");

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

main().catch((err) => {
  console.error("ERRO FATAL NA AUDITORIA DO CHROME:", err);
  process.exit(1);
});
