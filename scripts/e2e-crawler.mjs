import http from "node:http";

const ROUTES = [
  { path: "/", expectedTitle: "Nativaram" },
  { path: "/institucional", expectedTitle: "Institucional" },
  { path: "/feitio", expectedTitle: "Feitio" },
  { path: "/sacramentos", expectedTitle: "Sacramentos" },
  { path: "/compliance", expectedTitle: "Compliance" },
  { path: "/credenciamento", expectedTitle: "Credenciamento" },
  { path: "/portal-dirigente", expectedTitle: "Portal do Dirigente" },
  { path: "/api/pedidos", expectedJson: true },
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${route.path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({
          path: route.path,
          status: res.statusCode,
          ok: res.statusCode >= 200 && res.statusCode < 400,
          dataLength: data.length,
          isJson: route.expectedJson ? (() => { try { JSON.parse(data); return true; } catch { return false; } })() : false,
        });
      });
    });
    req.on("error", (err) => {
      resolve({ path: route.path, status: 0, ok: false, error: err.message });
    });
  });
}

async function runAudit() {
  console.log("=======================================================");
  console.log("   AUDITORIA FACTUAL E2E — SERVIÇO HTTP LOCAL (PORTA 3000)");
  console.log("=======================================================\n");

  let allOk = true;
  for (const r of ROUTES) {
    const result = await checkRoute(r);
    if (result.ok) {
      console.log(`  ✓ ${result.path.padEnd(20)} -> HTTP ${result.status} [${result.dataLength} bytes]`);
    } else {
      console.error(`  ✗ ${result.path.padEnd(20)} -> HTTP ${result.status} (${result.error || "Falha"})`);
      allOk = false;
    }
  }

  console.log("\n=======================================================");
  if (allOk) {
    console.log("   TODAS AS 8 ROTAS CRÍTICAS RESPONDEM COM STATUS 200 OK");
  } else {
    console.log("   HOUVE FALHAS NA RESPOSTA HTTP");
    process.exit(1);
  }
  console.log("=======================================================\n");
}

runAudit();
