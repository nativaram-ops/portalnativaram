import http from "node:http";

const BASE_URL = process.env.NATIVARAM_E2E_URL || "http://localhost:3000";

const ROUTES = [
  { path: "/", expectedText: "Cooperativa" },
  { path: "/institucional", expectedText: "Nativaram" },
  { path: "/feitio", expectedText: "Feitio" },
  { path: "/sacramentos", expectedText: "Sacramentos" },
  { path: "/compliance", expectedText: "CONAD" },
  { path: "/credenciamento", expectedText: "Credenciamento" },
  { path: "/reconhecimento", expectedText: "Reconhecimento" },
  { path: "/projetos-de-luz", expectedText: "Projetos" },
  { path: "/estudos", expectedText: "Estudos" },
  { path: "/contato", expectedText: "Contato" },
  { path: "/privacidade", expectedText: "Privacidade" },
  { path: "/portal-dirigente", expectedText: "Portal do Dirigente" },
  { path: "/api/estudos/anexos", expectedJson: true },
  { path: "/api/auth/verificar-chave", expectedJson: true },
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    const req = http.get(`${BASE_URL}${route.path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const isJson = route.expectedJson
          ? (() => {
              try {
                JSON.parse(data);
                return true;
              } catch {
                return false;
              }
            })()
          : true;
        const hasText = route.expectedText ? data.includes(route.expectedText) : true;
        resolve({
          path: route.path,
          status: res.statusCode,
          ok: res.statusCode >= 200 && res.statusCode < 400 && isJson && hasText,
          dataLength: data.length,
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
  console.log(`   AUDITORIA HTTP E2E — PORTAL NATIVARAM (${BASE_URL})`);
  console.log("=======================================================\n");

  let allOk = true;
  for (const r of ROUTES) {
    const result = await checkRoute(r);
    if (result.ok) {
      console.log(`  ✓ ${result.path.padEnd(28)} -> HTTP ${result.status} [${result.dataLength} bytes]`);
    } else {
      console.error(`  ✗ ${result.path.padEnd(28)} -> HTTP ${result.status} (${result.error || "Conteúdo/JSON inválido"})`);
      allOk = false;
    }
  }

  console.log("\n=======================================================");
  if (allOk) {
    console.log(`   TODAS AS ${ROUTES.length} ROTAS E ENDPOINTS RESPONDERAM OK`);
  } else {
    console.log("   HOUVE FALHAS NA AUDITORIA HTTP");
    process.exit(1);
  }
  console.log("=======================================================\n");
}

runAudit();
