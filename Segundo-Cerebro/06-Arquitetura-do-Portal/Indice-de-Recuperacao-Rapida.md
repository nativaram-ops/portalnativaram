---
tipo: referencia
status: pronto
prioridade: contínua/obrigatória
ferramenta_principal: Antigravity IDE / IA
para_quem_e: Agentes de IA e Desenvolvedores
categoria: Índice Rápido
---

# ⚡ Índice de Recuperação Rápida & Contexto Operacional

> **Para a IA:** Consulte esta nota primeiro ao iniciar qualquer interação para absorver instantaneamente o contexto da base de código, regras de conformidade e arquitetura, evitando alucinações.

---

## 🧭 O Que é o Projeto?
- **Identidade:** Portal institucional da **Cooperativa Etnobotânica Nativaram Brasil**.
- **Natureza:** Cooperativa sem fins lucrativos de salvaguarda litúrgica, apoio mútuo entre templos e rateio logístico de sacramentos tradicionais (Ayahuasca purista Tucunacá e Rapés Sagrados).
- **Proibição Absoluta:** NÃO é um e-commerce. NÃO tem carrinho de compras nem venda direta aberta ao público geral. O acesso a sacramentos ocorre mediante credenciamento e homologação de pessoas jurídicas religiosas (CNPJ/Ata de Fundação) amparadas na Resolução CONAD nº 01/2010 e no Marco ANVISA 2025.

---

## 📂 Onde Fica Cada Coisa no Código?

| Recurso | Caminho no Código | O Que Faz |
| :--- | :--- | :--- |
| **Portal do Dirigente** | `src/app/portal-dirigente/page.tsx` | Página restrita para dirigentes de templos e conselho gestor |
| **Orquestrador de Tela** | `src/components/layout/PortalDirigenteClient.tsx` | Autenticação por perfis (Templo vs ADM) e troca de abas |
| **Formulário de Pedido** | `src/components/portal-dirigente/FormSolicitacaoPedido.tsx` | Catálogo de itens, cálculo de rateio, mensagem livre e disparo WhatsApp |
| **Acompanhamento (Dirigente)** | `src/components/portal-dirigente/AcompanhamentoPedidos.tsx` | Timeline de 5 fases, visualização de laudos, rastreio e repetição de pedido |
| **Gestão Central (ADM)** | `src/components/portal-dirigente/AdminGestaoPedidos.tsx` | Métricas em tempo real, atualização de status, rastreio e aviso WhatsApp |
| **Banco de Dados Local** | `data/pedidos.json` e `src/lib/db/pedidos.ts` | Armazenamento atômico seguro com histórico de auditoria |
| **API de Pedidos** | `src/app/api/pedidos/route.ts` e `[id]/route.ts` | Endpoints REST para listar, criar, atualizar e notificar |
| **Tipos TypeScript** | `src/types/pedido.ts` | Modelagem estrita de solicitações, itens e métricas |
| **Validação Zod** | `src/lib/validators/pedido.ts` | Schemas de validação de dados de entrada |
| **Catálogo de Graduações** | `src/data/graduacoes.ts` | Perfil fitoquímico Tucunacá (Harmina, Harmalina, THH) e porções |
| **Catálogo de Rapés/Artefatos** | `src/data/sacramentos.ts` e `medicinas.ts` | 10 rapés tradicionais (pH alcalino), Kuripes, Tepis e Sananga |
| **Credenciamento Aberto** | `src/app/credenciamento/page.tsx` | Formulário público para novas congregações solicitarem homologação |
| **Design Tokens** | `src/app/globals.css` e `tailwind.config.ts` | Floresta `#16281E`, Âmbar `#D4A359`, Areia `#F8F6F0`, Pedra `#1C1917` |

---

## 🛠️ Comandos de Governança no Windows

1. **Sempre rodar via `cmd.exe /c`:**
   ```cmd
   cmd.exe /c npm run dev
   cmd.exe /c npm run build
   ```
2. **Liberar porta 3000 travada (Processo Órfão):**
   ```cmd
   cmd.exe /c "netstat -ano | findstr :3000"
   cmd.exe /c "taskkill /PID <PID> /F"
   ```
3. **Inicializador em 1 clique:** `iniciar_portal.bat`

---

## 🚫 Lembrete Regulatória Crítico (AGENTS.md)
- **NUNCA USAR:** remédio, medicina, cura, tratamento, terapia, loja, venda, preço, comprar, produto, cliente.
- **USAR SEMPRE:** sacramento, preparado tradicional, alquimia vegetal, florescimento, reequilíbrio vital, rateio de custos, apoio logístico, templo credenciado, dirigente litúrgico.

---

## Relações

### Alimenta / impulsiona
- [[00-Mapa-Mental-Portal-Nativaram]]
- [[Roadmap-e-Componentes-do-Site]]
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]
- [[Banco-de-Dados-e-Persistencia-Local]]
- [[ADR-001-Persistencia-Atomica-e-WhatsApp-First]]
- [[Manual-de-Comunicacao-e-Blindagem-Algoritmica]]
