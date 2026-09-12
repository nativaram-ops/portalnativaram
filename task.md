# Checklist de Execução Arquitetural (Backwards Design)
## Portal Institucional da Cooperativa Etnobotânica Nativaram Brasil

> **Status:** Aguardando Aprovação Manual do Usuário  
> **Ordem de Execução:** Dependência Lógica e Decrescente de Risco (Camada 4 -> Camada 3 -> Camada 2 -> Camada 1)

---

### [x] Fase 0: Mapeamento de Acoplamentos & Diagnóstico Estático
- [x] **0.1** Executar varredura AST (Árvore de Sintaxe Abstrata) via TypeScript Compiler API em todos os arquivos de `src/`.
- [x] **0.2** Auditar violações de acoplamento vertical (garantir que `lib/`, `data/`, `types/` não importem de `components/` ou `app/`).
- [x] **0.3** Identificar hubs centrais de maior fan-in (`AnimateOnScroll`, `Badge`, `Card`, `pedido.ts`, `graduacoes.ts`).
- [x] **0.4** Gerar `implementation_plan.md` e `task.md` com arquitetura em camadas e diagrama Mermaid.

---

### [x] Fase 1: Camada 4 — Entidades de Domínio Puras & Persistência (Core Sagrado)
- [x] **1.1** Verificar e blindar o modelo de domínio canônico em `src/types/pedido.ts` (tipos imutáveis `StatusPedido`, `ItemPedidoLiturgico`, `PedidoLiturgico`, `CadeiaCustodiaFase`).
- [x] **1.2** Validar conformidade regulatória fitoquímica em `src/data/graduacoes.ts` (4 graduações puristas Tucunacá e 10 rapés sagrados tamponados com cinzas nobres).
- [x] **1.3** Assegurar isolamento do mecanismo de persistência ACID em `src/lib/pedidos-local.ts` (escrita atômica com arquivo temporário `.tmp` e rename).
- [x] **1.4** Validar cliente resiliente Supabase em `src/lib/supabase.ts` (singleton memoizado sem sobrecarga e sem quebra em caso de indisponibilidade).

---

### [x] Fase 2: Camada 3 — Casos de Uso & Serviços da Aplicação (Application Services)
- [x] **2.1** Consolidar serviço `RegistrarSolicitacaoPartilha` (`criarPedido`) com geração do protocolo canônico `SOL-YYYY-XXXX`.
- [x] **2.2** Consolidar serviço `ConsultarSolicitacoesLiturgicas` (`obterTodosPedidos` e `obterPedidoPorProtocolo`) com busca multi-termo e fallback automático.
- [x] **2.3** Consolidar serviço `AtualizarFaseCadeiaCustodia` (`atualizarPedido`) com guard de autorização administrativa e log auditável de transição.
- [x] **2.4** Auditar lógica de cálculo de farmacocinética em `src/data/portal-assessoria.ts` (janelas de washout de 5 a 7 meias-vidas para ISRS/Lítio).
- [x] **2.5** Consolidar gerador de links de acionamento WhatsApp em `src/lib/db/pedidos.ts` e `src/lib/credenciamento/engine.ts` com template de reverência cerimonial.

---

### [x] Fase 3: Camada 2 — Contratos de API & Fronteiras HTTP (Route Handlers)
- [x] **3.1** Garantir validação estrita com Zod (`NovoPedidoSchema`) na rota `POST /api/pedidos`.
- [x] **3.2** Garantir filtros e cálculo de métricas em `GET /api/pedidos` (tempo médio de despacho, contagem por fase).
- [x] **3.3** Proteger rota administrativa `PATCH /api/pedidos/[id]` com validação de header `x-nativaram-auth` contra `ADMIN_SECRET_KEY`.
- [x] **3.4** Manter rewrite canônico transparente em `next.config.mjs` mapeando `/sacramentos` -> `/medicinas` para erradicar terminologia proibida de URLs públicas.

---

### [x] Fase 4: Camada 1 — Critério Final de Sucesso & Interface Visual (Jornada E2E)
- [x] **4.1** Validar navegação didática de 5 estações públicas: `/institucional`, `/feitio`, `/sacramentos`, `/compliance`, `/credenciamento`.
- [x] **4.2** Validar Portal do Dirigente (`/portal-dirigente`):
  - Autenticação e entrada institucional via chave de acesso credenciada (`NAT-TEMPLO-842`).
  - Formulário de partilha cooperativa (rateio de custos transparente, sem carrinho ou termos mercantis).
  - Timeline interativa da Cadeia de Custódia Litúrgica em 5 fases.
- [x] **4.3** Validar Central de Documentos Canônicos:
  - Renderização perfeita em folha A4 (`@media print` com estilos de cabeçalho e rodapé institucional).
  - Download estruturado em Markdown e Word (.doc).
- [x] **4.4** Validar Painel do Conselho Gestor ADM:
  - Painel de controle para avanço de fase litúrgica e vinculação de código de rastreio refrigerado.

---

### [x] Fase 5: Gauntlet Loops de Qualidade & Verificação Final
- [x] **5.1** Executar verificação estática de tipos TypeScript (`npx tsc --noEmit`).
- [x] **5.2** Executar suíte de testes litúrgicos automatizados via runner de alta velocidade (`node node_modules/jiti/bin/jiti.js scripts/test-liturgico.mjs`).
- [x] **5.3** Executar varredura semântica anti-slop e anti-comercial (`AGENTS.md`) assegurando ausência de termos proibidos (remédio, cura, venda, loja, comprar, cliente, produto).
- [x] **5.4** Atualizar o cofre do Segundo Cérebro (`Segundo-Cerebro/06-Arquitetura-do-Portal/Roadmap-e-Componentes-do-Site.md` e `Indice-de-Recuperacao-Rapida.md`).
