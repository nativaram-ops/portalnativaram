# Plan 002: Hardening de Segurança em APIs e Testes de Integração REST

> **Executor instructions**: Siga este plano passo a passo. Execute cada comando de verificação e confirme o resultado esperado antes de passar para a próxima etapa. Se qualquer condição na seção "STOP conditions" ocorrer, pare e reporte — não improvise.
>
> **Drift check (run first)**: `git diff --stat 653108b..HEAD -- src/app/api/pedidos/ src/lib/db/pedidos.ts scripts/test-liturgico.mjs`
> Se qualquer arquivo de escopo tiver sido alterado desde a elaboração deste plano, compare os trechos da seção "Current state" com o código vivo antes de prosseguir.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: security / tests
- **Planned at**: commit `653108b`, 2026-09-11

## Why this matters

A rota de atualização administrativa de pedidos (`src/app/api/pedidos/[id]/route.ts`) realiza a validação de cabeçalho administrativo comparando diretamente com uma string literal embutida no código-fonte em vez de ler uma variável de ambiente sanitizada (`ADMIN_SECRET_KEY`). Além disso, o cliente Supabase em `src/lib/db/pedidos.ts` é instanciado a cada requisição sem reaproveitamento de instância, e a suíte `npm test` valida apenas funções em memória e schemas, sem cobrir o contrato HTTP das rotas REST de pedidos. Este plano elimina a credencial exposta no código, otimiza o ciclo de vida do cliente e garante cobertura de teste automatizada para os endpoints.

## Current state

- Arquivos envolvidos:
  - `src/app/api/pedidos/[id]/route.ts:40-46` — validação de cabeçalho `x-nativaram-auth` com valor literal em código.
  - `src/app/api/pedidos/[id]/route.ts:104-110` — validação de exclusão com o mesmo valor literal.
  - `src/lib/db/pedidos.ts:16-26` — `getDirectSupabaseClient` recria `createClient` a cada chamada.
  - `scripts/test-liturgico.mjs` — executa testes de schemas e funções puras, sem testes de endpoints REST.

Exemplar de referência:
```ts
// src/lib/supabase/client.ts
// Exemplo canônico de verificação segura de variáveis de ambiente
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  );
}
```

## Hard boundaries & out of scope

- **Arquivos em escopo**:
  - `src/app/api/pedidos/[id]/route.ts`
  - `src/lib/db/pedidos.ts`
  - `scripts/test-liturgico.mjs`
  - `.env.local.example`
- **Arquivos FORA de escopo**:
  - `src/components/**` (camada visual não deve ser tocada)
  - `src/data/**` (dados fitoquímicos e etnobotânicos intocados)
  - `Segundo-Cerebro/**` (documentação de governança mantida)

## Step-by-step implementation

### Step 1: Externalizar Token Administrativo para Variável de Ambiente
1. Em `src/app/api/pedidos/[id]/route.ts`, substituir a comparação estática por leitura de `process.env.ADMIN_SECRET_KEY || process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY`.
2. Incluir a chave documentada em `.env.local.example` sem valores reais de produção.
3. Comando de verificação:
   ```cmd
   cmd.exe /c "npx tsc --noEmit"
   ```
   Resultado esperado: Código de saída 0.

### Step 2: Memoizar o Cliente Supabase em `src/lib/db/pedidos.ts`
1. Em `src/lib/db/pedidos.ts`, armazenar o cliente criado em uma variável de módulo (`let cachedSupabaseClient: SupabaseClient | null = null`) retornando a instância já existente caso inicializada.
2. Comando de verificação:
   ```cmd
   cmd.exe /c "npx tsc --noEmit"
   ```
   Resultado esperado: Código de saída 0.

### Step 3: Adicionar Teste Automatizado de Contrato REST em `scripts/test-liturgico.mjs`
1. Em `scripts/test-liturgico.mjs`, adicionar uma nova seção de teste "5. Contratos de API & Segurança de Endpoints" simulando chamadas HTTP para os validadores e geradores de resposta de `route.ts`.
2. Comando de verificação:
   ```cmd
   cmd.exe /c "npx -y tsx scripts/test-liturgico.mjs"
   ```
   Resultado esperado: 10+ testes passando, 0 falhas.

## STOP conditions

- Se a migração da chave quebrar a autenticação das telas existentes no `AdminGestaoPedidos.tsx`, pare e configure a leitura compatível tanto no cliente quanto no servidor via cabeçalho.
- Nunca commitar valores reais de produção no repositório.
