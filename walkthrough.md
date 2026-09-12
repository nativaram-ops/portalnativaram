# Walkthrough: Decomposição Retrógrada, Map-Reduce & Gauntlet Loops

> **Status:** 100% Homologado e Auditado (Nós 1, 2 e 3 Concluídos)  
> **Sistema:** Portal Institucional da Cooperativa Etnobotânica Nativaram Brasil  
> **Metodologia:** Backwards Design, Varredura AST, Execução Paralela por Subagentes e Gauntlet Loop Factual.

---

## 🧭 1. Resumo das Alterações por Camada Arquitetural

### 🔹 Camada 4: Entidades de Domínio Puras & Persistência ACID
- **Modelo de Domínio:** Tipagem estrita em `src/types/pedido.ts` com agregação de [`PedidoLiturgico`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/types/pedido.ts), 7 status litúrgicos canônicos e itens de rateio sem termos comerciais.
- **Fitoquímica Sagrada:** Catálogo de 4 graduações de Ayahuasca (Tucunacá 3.1 a 10.1 Wirapuru) e 10 rapés sagrados tamponados em `src/data/graduacoes.ts` e `src/data/sacramentos.ts`.
- **Persistência Híbrida Resiliente:** Motor em `src/lib/db/pedidos.ts` com proteção `withTimeout(..., 2000)` para consultas Supabase, garantindo zero travamento e chaveamento instantâneo para o arquivo local atômico `data/pedidos.json` via `.tmp` e `rename`.

### 🔹 Camadas 2 e 3: Contratos de API & Casos de Uso (Application Services)
- **Validação de Schemas:** Schemas Zod [`NovoPedidoSchema`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/lib/validators/pedido.ts) e [`CredenciamentoSchema`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/lib/validators/credenciamento.ts) exigindo anuência formal à Resolução CONAD nº 01/2010.
- **Fronteiras HTTP:** Handlers REST em `src/app/api/pedidos/route.ts` e `[id]/route.ts` com autenticação de cabeçalho `x-nativaram-auth`.
- **Farmacocinética de Washout:** Matriz em `src/data/portal-assessoria.ts` mapeando 15 classes farmacológicas (Fluoxetina 35-45d, Lítio 30d com Critérios de Hunter).
- **Rewrite Canônico:** Mapeamento transparente de `/sacramentos` para `/medicinas` em `next.config.mjs`.

### 🔹 Camada 1: Interface Visual & Jornada E2E
- **Funil Didático de 5 Estações:** Componente `src/components/funil/JornadaNavTracker.tsx` ligando `/institucional` $\rightarrow$ `/feitio` $\rightarrow$ `/sacramentos` $\rightarrow$ `/compliance` $\rightarrow$ `/credenciamento`.
- **Portal do Dirigente:** Tela `src/app/portal-dirigente/page.tsx` com autenticação de congregações, formulário de partilha por rateio, timeline de custódia e painel administrativo ADM.
- **Central de Documentos Canônicos A4:** `PortalCentralDocumentos.tsx` com 5 modelos jurídicos formatados com `@media print` e exportação (.md/.doc).

---

## 🧪 2. Logs de Aprovação dos Linters e Testes Automatizados

### Suíte Automatizada (`scripts/test-liturgico.mjs` via `jiti` em 0.8s):
```text
=======================================================
   TESTES AUTOMATIZADOS — NATIVARAM BRASIL
   Conformidade Litúrgica, Integridade de Dados & Regras
=======================================================

1. Validação de Schemas e Contratos:
  ✓ Validador de Pedido Litúrgico rejeita cota vazia
  ✓ Validador de Pedido Litúrgico aceita solicitação completa
  ✓ Validador de Atualização aceita status litúrgicos canônicos

2. Motor de Banco de Dados & Protocolos:
  ✓ Gerador de Protocolos produz prefixo SOL- e 4 caracteres alfa-numéricos
  ✓ Formatador de WhatsApp inclui CNPJ, Protocolo e Menção ao CONAD

3. Integridade Etnobotânica & Fitoquímica:
  ✓ Catálogo de Graduações possui 4 graduações canônicas de Ayahuasca
  ✓ Parâmetros do Feitio no Acre utilizam Tucunacá e Chacrona Rainha
  ✓ Catálogo de Rapés Tradicionais possui pH alcalino e zero compostos sintéticos

4. Scanner Semântico de Conformidade (AGENTS.md):
  ✓ Código e componentes em src/app/ e src/components/ não contêm palavras proibidas em texto solto

5. Segurança de APIs & Contratos HTTP (Plano 002):
  ✓ Validador de cabeçalho administrativo bloqueia tokens inválidos ou ausentes
  ✓ Sanitizador de rateio calcula somatório de cotas com precisão decimal

6. Casos de Uso, Credenciamento & Farmacocinética (Nó 2):
  ✓ Validador de Credenciamento exige anuência formal ao CONAD nº 01/2010
  ✓ Compêndio Farmacológico impõe washout mínimo de 35 a 45 dias para Fluoxetina e 30 dias para Lítio
  ✓ Configuração Next.js define rewrite canônico transparente de /sacramentos para /medicinas

7. Interface Visual, Funil de 5 Estações & Documentos A4 (Nó 3):
  ✓ Funil Didático possui exatamente 5 estações encadeadas com slugs canônicos
  ✓ Central de Documentos disponibiliza os 5 modelos canônicos para impressão A4 e download

=======================================================
   RESULTADOS: 16 passaram | 0 falharam (0.8s)
=======================================================
```

### Compilador TypeScript Oficial:
```bash
> npx tsc --noEmit
Exit code: 0 (Zero erros estáticos em 87 arquivos .ts/.tsx)
```

---

## 🌐 3. Evidências de Auditoria E2E (Google Chrome DevTools & Crawler)

### Inspeção E2E via Chrome DevTools Protocol (`scripts/chrome-e2e-audit.mjs`):
```text
=======================================================
   AUDITORIA FACTUAL E2E COM GOOGLE CHROME HEADLESS
   Inspeção Visual & Captura de Logs do DevTools Console
=======================================================

[CHROME] Conectado ao DevTools Protocol em: ws://127.0.0.1:9222/...

• Testando Home                         (http://localhost:3000/) ... [OK]
• Testando Estação 1: Institucional     (http://localhost:3000/institucional) ... [OK]
• Testando Estação 2: Feitio            (http://localhost:3000/feitio) ... [OK]
• Testando Estação 3: Sacramentos       (http://localhost:3000/sacramentos) ... [OK]
• Testando Estação 4: Compliance        (http://localhost:3000/compliance) ... [OK]
• Testando Estação 5: Credenciamento    (http://localhost:3000/credenciamento) ... [OK]
• Testando Portal do Dirigente          (http://localhost:3000/portal-dirigente) ... [OK]

=======================================================
   VEREDITO DO GAUNTLET LOOP: 100% APROVADO!
   • Zero erros capturados no console do Chrome.
   • Todas as 7 telas renderizadas com sucesso absoluto.
=======================================================
```

### Verificação de Resposta HTTP (`scripts/e2e-crawler.mjs`):
```text
  ✓ /                    -> HTTP 200 [405.904 bytes]
  ✓ /institucional       -> HTTP 200 [220.543 bytes]
  ✓ /feitio              -> HTTP 200 [243.630 bytes]
  ✓ /sacramentos         -> HTTP 200 [370.133 bytes] (Rewrite ativo para /medicinas)
  ✓ /compliance          -> HTTP 200 [204.931 bytes]
  ✓ /credenciamento      -> HTTP 200 [171.970 bytes]
  ✓ /portal-dirigente    -> HTTP 200 [147.102 bytes]
  ✓ /api/pedidos         -> HTTP 200 [11.619 bytes]
```

---

## 📦 4. Diffs de Código Consolidados

```diff
--- a/src/lib/db/pedidos.ts
+++ b/src/lib/db/pedidos.ts
@@ -30,6 +30,15 @@ function getDirectSupabaseClient(): any {
   return cachedDirectClient;
 }
 
+function withTimeout<T>(promise: PromiseLike<T>, ms = 2000): Promise<T> {
+  return Promise.race([
+    Promise.resolve(promise),
+    new Promise<T>((_, reject) =>
+      setTimeout(() => reject(new Error(`Timeout de ${ms}ms excedido na consulta remota`)), ms)
+    ),
+  ]);
+}
+
@@ -440,7 +449,7 @@ export async function obterTodosPedidos(...): Promise<PedidoLiturgico[]> {
-      const { data, error } = await query;
+      const { data, error } = await withTimeout(query, 2000);
@@ -501,7 +510,7 @@ export async function obterPedidoPorId(id: string): Promise<PedidoLiturgico | null> {
-      const { data, error } = await supabase.from("pedidos_liturgicos").select("*").eq("id", id).single();
+      const { data, error } = await withTimeout(supabase.from("pedidos_liturgicos").select("*").eq("id", id).single(), 2000);
```

```diff
--- a/scripts/test-liturgico.mjs
+++ b/scripts/test-liturgico.mjs
@@ -252,6 +252,40 @@
+  // 6. Casos de Uso, Credenciamento & Farmacocinética (Nó 2):
+  await test("Validador de Credenciamento exige anuência formal ao CONAD nº 01/2010", ...);
+  await test("Compêndio Farmacológico impõe washout mínimo de 35 a 45 dias para Fluoxetina e 30 dias para Lítio", ...);
+  await test("Configuração Next.js define rewrite canônico transparente de /sacramentos para /medicinas", ...);
+
+  // 7. Interface Visual, Funil de 5 Estações & Documentos A4 (Nó 3):
+  await test("Funil Didático possui exatamente 5 estações encadeadas com slugs canônicos", ...);
+  await test("Central de Documentos disponibiliza os 5 modelos canônicos para impressão A4 e download", ...);
```
