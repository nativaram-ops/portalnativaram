---
tipo: arquitetura
status: pronto
prioridade: alta
ferramenta_principal: Node.js / Next.js
para_quem_e: Desenvolvedores e IAs
categoria: Banco de Dados
---

# 💾 Banco de Dados & Persistência Local Atômica

Este documento detalha o sistema de armazenamento e persistência de dados das solicitações litúrgicas do portal Nativaram Brasil, garantindo atomicidade, rastreabilidade e integridade sem dependências externas complexas.

---

## 🏗️ Estrutura de Armazenamento

- **Arquivo Principal:** `data/pedidos.json` (localizado na raiz do projeto).
- **Mecanismo de Gravação Atômica:** Utiliza `fs/promises` gravando primeiro em um arquivo temporário (`pedidos.json.tmp.{timestamp}.{random}`) e executando um `fs.rename` atômico sobre o arquivo principal. Esse padrão previne corrupção de dados por escritas concorrentes ou falhas de energia no sistema operacional.
- **Semeador Automático (Auto-Seed):** Se o arquivo não existir na primeira inicialização, a camada inicializa com dados canônicos em conformidade para os templos de referência (`NAT-TEMPLO-842`, `NAT-TEMPLO-913`, `NAT-TEMPLO-982`).

---

## 📋 Modelo de Dados (`src/types/pedido.ts`)

```typescript
export interface PedidoLiturgico {
  id: string;                      // Ex: "SOL-2026-P3CG"
  temploId: string;                // Ex: "NAT-TEMPLO-842"
  temploNome: string;
  cidade: string;
  estado: string;
  dirigenteNome: string;
  dirigenteTelefone: string;
  dirigenteEmail: string;
  cnpj: string;
  itens: ItemPedido[];
  rateioTotal: number;
  dataCerimoniaPretendida: string; // Formato YYYY-MM-DD
  mensagemIntencao: string;        // Mensagem espiritual e recomendações
  status: StatusPedido;
  loteVinculado?: string;          // Ex: "AC-2026-08"
  codigoRastreio?: string;         // Ex: "NTV-SP-842-BR"
  previsaoEntrega?: string;
  observacoesInternas?: string;
  historico: HistoricoStatus[];    // Auditoria com data, responsável e nota
  criadoEm: string;                // ISO 8601
  atualizadoEm: string;            // ISO 8601
}
```

---

## 🌐 Endpoints de API REST (App Router)

### 1. `GET /api/pedidos`
- **Parâmetros de Consulta (Query Params):**
  - `temploId` (string opcional): Filtra solicitações por código do templo.
  - `status` (string opcional): Filtra por status litúrgico.
  - `busca` (string opcional): Busca textual por protocolo, nome, dirigente ou rastreio.
  - `metricas` (boolean opcional): Quando `true`, inclui o objeto de consolidação de métricas (`totalSolicitacoes`, `litrosTotaisProgramados`, `solicitacoesPendentes`, `emTransitoRefrigerado`, etc.).

### 2. `POST /api/pedidos`
- **Corpo da Requisição (Body):** Dados validados pelo `NovoPedidoSchema` (Zod).
- **Comportamento:** Cria o pedido com status inicial `SOLICITADO`, calcula subtotais e rateio total, grava atomicamente no disco e retorna o pedido criado acompanhado do `whatsappUrl` oficial contendo toda a mensagem pré-formatada.

### 3. `GET /api/pedidos/[id]`
- Retorna os dados completos de uma solicitação individual pelo seu protocolo.

### 4. `PATCH /api/pedidos/[id]`
- Atualiza status, insere número de lote, código de rastreio e adiciona registro no histórico de auditoria. Gera automaticamente o link `whatsappNotificacaoUrl` para avisar o dirigente sobre a mudança de status.

---

## Relações

### Depende de
- [[Nativaram-Brasil]]
- [[Blindagem-Juridica-e-Sanitaria]]

### Alimenta / impulsiona
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]
- [[Cadeia-de-Custodia-e-Logistica-Refrigerada]]

### Relacionado a
- [[ADR-001-Persistencia-Atomica-e-WhatsApp-First]]
- [[Roadmap-e-Componentes-do-Site]]
