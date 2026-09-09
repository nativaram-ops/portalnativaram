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
- **Identidade:** Portal institucional da **Cooperativa Nativaram** (Cooperativa Etnobotânica Nativaram). *Nota:* "Nativaram Brasil" é a denominação da loja comercial externa; este portal é exclusivo da cooperativa institucional.
- **Natureza:** Cooperativa sem fins lucrativos de salvaguarda litúrgica, apoio mútuo entre templos e rateio logístico de sacramentos tradicionais (Ayahuasca purista Tucunacá e Rapés Sagrados).
- **Proibição Absoluta:** NÃO é um e-commerce. NÃO tem carrinho de compras nem venda direta aberta ao público geral. O acesso a sacramentos ocorre mediante credenciamento e homologação de pessoas jurídicas religiosas (CNPJ/Ata de Fundação) amparadas na Resolução CONAD nº 01/2010 e no Marco ANVISA 2025.

---

## 📂 Onde Fica Cada Coisa no Código?

| Recurso | Caminho no Código | O Que Faz |
| :--- | :--- | :--- |
| **Portal do Dirigente** | `src/app/portal-dirigente/page.tsx` | Página restrita para dirigentes de templos e conselho gestor |
| **Orquestrador de Tela** | `src/components/layout/PortalDirigenteClient.tsx` | Autenticação por perfis (Templo vs ADM) e 10 abas de governança |
| **Central de Documentos A4** | `src/components/portal-dirigente/PortalCentralDocumentos.tsx` | 5 modelos canônicos abertos (Anamnese, Termo CONAD, Termo de Menores, POP/Ata e Declaração), tripla exportação (A4/Word/Markdown) |
| **Farmacologia & Washout** | `src/components/portal-dirigente/PortalInteracoesMedicamentosas.tsx` | 15 classes do compêndio, cinética $5\text{ a }7 \times t_{1/2}$, Critérios de Hunter e alerta de Lítio (Status Epilepticus) |
| **Catálogo de Graduações** | `src/components/portal-dirigente/PortalCatalogoGraduacoes.tsx` | Fitoquímica Tucunacá (8,03 mg/g), Chacrona circadiana, 65–72 °Brix e Tabela de Diluição 10:1 Wirapuru |
| **FAQ do Dirigente** | `src/components/portal-dirigente/PortalAssessoriaFAQ.tsx` | 12 perguntas aprofundadas (gás CO₂, borra, dosagens, Zendo Project e fiscalizações) |
| **Calculadora Litúrgica** | `src/components/portal-dirigente/PortalCalculadoraLiturgica.tsx` | Modo Cerimônia (participantes/sacramentos) e Modo Reconstituição 10:1 (água a 45-50°C e cálices) |
| **Respaldo Jurídico** | `src/components/portal-dirigente/PortalRespaldoJuridico.tsx` | Guia de fiscalização policial/sanitária, ementa CONAD 01/2010 e checklist da pasta |
| **Formulário de Pedido** | `src/components/portal-dirigente/FormSolicitacaoPedido.tsx` | Catálogo de itens, cálculo de rateio, mensagem livre e disparo WhatsApp |
| **Acompanhamento (Dirigente)** | `src/components/portal-dirigente/AcompanhamentoPedidos.tsx` | Timeline de 5 fases, visualização de laudos, rastreio e repetição de pedido |
| **Gestão Central (ADM)** | `src/components/portal-dirigente/AdminGestaoPedidos.tsx` | Métricas em tempo real, atualização de status, rastreio e aviso WhatsApp |
| **Base Fitoquímica & Canônica** | `src/data/portal-assessoria.ts` | Matriz de fármacos, regras de washout e FAQ estruturado |
| **Banco de Dados Local** | `data/pedidos.json` e `src/lib/db/pedidos.ts` | Armazenamento atômico seguro com histórico de auditoria |
| **API de Pedidos** | `src/app/api/pedidos/route.ts` e `[id]/route.ts` | Endpoints REST para listar, criar, atualizar e notificar |
| **Tipos TypeScript** | `src/types/pedido.ts` | Modelagem estrita de solicitações, itens e métricas |
| **Validação Zod** | `src/lib/validators/pedido.ts` | Schemas de validação de dados de entrada |
| **Catálogo de Graduações** | `src/data/graduacoes.ts` | Perfil fitoquímico Tucunacá (Harmina, Harmalina, THH) e porções |
| **Catálogo de Rapés/Artefatos** | `src/data/sacramentos.ts` e `medicinas.ts` | 10 rapés tradicionais (pH alcalino), Kuripes, Tepis e Sananga |
| **Casa de Feitio & Etnobotânica** | `src/app/feitio/page.tsx` e `FeitioLanding.tsx` | Alquimia do feitio em menores micras, etnovariedades de cipó, Chacrona, recusa de Anayahuascas e HPLC |
| **Credenciamento Aberto** | `src/app/credenciamento/page.tsx` | Formulário público para novas congregações solicitarem homologação |
| **Funil Didático (5 Estações)** | `Segundo-Cerebro/06-Arquitetura-do-Portal/Funil-de-Conversao-e-Navegacao-Didatica.md` | Arquitetura das 5 estações (Origem -> Feitio -> Sacramentos -> Marco Legal -> Credenciamento) e política anti-inchaço |
| **Design Tokens & A4 Print** | `src/app/globals.css` e `tailwind.config.ts` | Floresta `#16281E`, Âmbar `#D4A359`, Areia `#F8F6F0` e regras `@media print` |
| **Harness & Skills Globais** | `Segundo-Cerebro/.../Guia-de-Skills-e-Comandos.md` e `AGENTS.md` | Catálogo das 40 skills locais, 8 da IDE e 31 do Novo Harness (OpenDesign, ECC, Graphify, Improve, Ponytail, Last30days, SkillSpector) |

---

## 🔐 Credenciais Oficiais de Acesso Litúrgico
- **Administrador Master (Conselho Gestor da Cooperativa):**
  - **Login:** `adm-nativaram`
  - **Senha Master:** `adm2026`
- **Templo Credenciado (Exemplo Homologado):**
  - **Código:** `NAT-TEMPLO-842` (Templo Céu do Cruzeiro)
  - **Senha:** chave litúrgica cadastrada do dirigente
- **Política de Acesso Restrito (Zero Visão de Visitante):**
  - O portal não permite acesso desautorizado de visitantes nem atalhos de bypass. Congregações não cadastradas devem preencher a ficha pública em `/credenciamento`.

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

## 🧠 Ciclo Mandatório de Memória Ativa (Obsidian)
- **Antes de qualquer edição de código:** Ler este índice e a nota do componente em `Segundo-Cerebro/` para ancorar decisões e regras fitoquímicas/regulatórias.
- **Após qualquer edição de código:** Gravar imediatamente o que foi modificado na nota correspondente de `Segundo-Cerebro/` (atualizar arquitetura, roadmap, dados ou ADRs).

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
- [[ADR-002-Composicao-Modular-e-Design-System]]
- [[ADR-003-Funil-de-Conversao-e-Jornada-Didatica]]
- [[ADR-004-Assessoria-Liturgica-e-Documentos-A4]]
- [[Manual-de-Comunicacao-e-Blindagem-Algoritmica]]
