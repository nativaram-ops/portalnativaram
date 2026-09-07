import { execSync, spawn } from "node:child_process";
import http from "node:http";

const PORT = 3000;

function checkHttpReady(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, { timeout: 1500 }, (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 304);
    });
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
  });
}

function getPortProcess(port) {
  try {
    const output = execSync(`netstat -ano -p tcp`, { encoding: "utf8" });
    const lines = output.split("\n");
    const pids = new Set();
    for (const line of lines) {
      if (line.includes(`:${port}`) && line.includes("LISTENING")) {
        const parts = line.trim().split(/\s+/);
        const pid = parseInt(parts[parts.length - 1], 10);
        if (pid && pid !== process.pid) {
          pids.add(pid);
        }
      }
    }
    return Array.from(pids);
  } catch {
    return [];
  }
}

async function cleanPort(port) {
  const pids = getPortProcess(port);
  if (pids.length > 0) {
    console.log(`[dev] Porta ${port} ocupada por processo(s): ${pids.join(", ")}`);
    const isHealthy = await checkHttpReady(port);
    if (!isHealthy) {
      console.log(`[dev] Servidor anterior na porta ${port} não está saudável. Finalizando processos órfãos...`);
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
          console.log(`[dev] Processo ${pid} finalizado.`);
        } catch {}
      }
    } else {
      console.log(`[dev] Liberando porta ${port} para reinicialização limpa...`);
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        } catch {}
      }
    }
    // Aguarda liberação do socket
    await new Promise((r) => setTimeout(r, 500));
  }
}

async function main() {
  console.log("=======================================================");
  console.log("   NATIVARAM BRASIL — SERVIDOR DE DESENVOLVIMENTO     ");
  console.log("   Engine: Next.js 15 + Turbopack (Porta 3000)        ");
  console.log("=======================================================");

  await cleanPort(PORT);

  const nextBin = "./node_modules/next/dist/bin/next";
  const args = [nextBin, "dev", "--turbo", "--port", String(PORT)];

  console.log(`[dev] Inicializando Turbopack na porta ${PORT}...`);
  const child = spawn(process.execPath, args, {
    stdio: "inherit",
    shell: false,
  });

  child.on("exit", (code, signal) => {
    process.exit(code ?? (signal ? 1 : 0));
  });

  const cleanExit = () => {
    try {
      child.kill("SIGTERM");
    } catch {}
    process.exit(0);
  };

  process.on("SIGINT", cleanExit);
  process.on("SIGTERM", cleanExit);
}

main().catch((err) => {
  console.error("[dev] Erro fatal:", err);
  process.exit(1);
});
