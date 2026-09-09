---
tipo: arquitetura
status: pronto
prioridade: alta
ferramenta_principal: Next.js
para_quem_e: Dirigentes e Conselho Gestor
categoria: Gestão Litúrgica & Assessoria Institucional
---

# 🏛️ Portal do Dirigente & Gestão Litúrgica Integrada

O **Portal do Dirigente** é a plataforma canônica de autoatendimento, apoio e governança litúrgica da **Cooperativa Etnobotânica Nativaram**. Ela foi desenhada para desonerar completamente a liderança dos templos credenciados, integrando não apenas a área de solicitação e rastreio de cotas de rateio, mas uma **Assessoria Institucional Completa** (farmacologia, protocolos de emergência, impressos jurídicos e canônicos A4, FAQ canônico e calculadora de cerimônia).

---

## 👥 Perfis de Acesso e Governança

> **Diretriz de Segurança:** O Portal do Dirigente é um ambiente restrito e sigiloso de salvaguarda litúrgica. Foi **removida qualquer visão ou atalho público de visitante/demonstração** no fluxo de entrada. Apenas dirigentes credenciados e a diretoria da cooperativa possuem acesso autenticado. Visitantes externos são orientados a submeter a congregação pelo canal público de [[Credenciamento-e-Homologacao-de-Templos|/credenciamento]].

### 1. Perfil Dirigente Litúrgico (Templo Homologado)
- **Autenticação:** Código de Homologação institucional ativo (ex: `NAT-TEMPLO-842` - Templo Céu do Cruzeiro) e chave litúrgica do dirigente.
- **Painel de 10 Módulos Integrados:**
  1. **Minhas Solicitações & Rastreio:** Visão de linha do tempo em 5 fases de todas as solicitações de sacramentos do templo.
  2. **Nova Solicitação de Partilha:** Formulário ágil com catálogo visual, cálculo do rateio cooperativo regressivo por volume, campo de intenção litúrgica e integração com WhatsApp.
  3. **Calculadora Litúrgica & Reconstituição 10:1:** Dimensionamento de sacramentos por comungantes (+15% margem de segurança) e calculadora de diluição matemática de 10:1 Wirapuru com água mineral estéril a 45-50°C.
  4. **Central de Documentos & Modelos Abertos A4:** Visualizador canônico, gerador de PDF vetorial (`window.print()`), cópia para área de transferência (Word/Docs) e download de Markdown editável (.md) de:
     - *Doc 01: Ficha Institucional de Anamnese & Triagem Litúrgica* (7 módulos: identificação, contato emergencial, histórico clínico, triagem farmacológica, triagem psiquiátrica, experiência e consentimento LGPD).
     - *Doc 02: Termo de Consentimento Livre, Esclarecido e Responsabilidade Deontológica* (9 cláusulas amparadas na CF/88, Lei 11.343/06, CONAD 01/2010 e LGPD).
     - *Doc 03: Procedimento Operacional Padrão (POP) & Ata de Sessão Ritualística* (5 fases rituais, primeiros socorros, PLS e ata com livro de presenças).
     - *Doc 04: Declaração de Transporte Litúrgico de Sacramento* (salvaguarda para trânsito aéreo e rodoviário interestadual).
     - *Doc 05: Termo de Autorização e Responsabilidade para Menor de Idade* (amparo no Item 4.1 da Resolução CONAD nº 01/2010, Art. 1.634 do Código Civil e Art. 21 do ECA; poder familiar conjunto de pai e mãe, presença ininterrupta no rito, princípio da não coerção, porção puramente simbólica e veto sanitário estrito a menores em uso de psicoestimulantes para TDAH como Ritalina/Concerta/Venvanse).
     - *Gaveta Pedagógica:* "Por Que Cada Item Existe? (Fundamentação Litúrgica & Clínica)".
  5. **Compêndio Etnofarmacológico & Washout:** Acervo das 15 classes farmacológicas (cinética linear $5\text{ a }7 \times t_{1/2}$, vias CYP2D6/CYP3A4), card dos Critérios de Hunter para toxicidade serotoninérgica e alerta sanitário máximo sobre a toxicidade do Carbonato de Lítio (Status Epilepticus refratário).
  6. **Catálogo Técnico das Graduações & Feitio Tucunacá:** Fichas fitoquímicas completas das 6 graduações (3.1 Mainumbi, 5.1 Pituã, 7.1 Anhangatã, 10.1 Wirapuru, Mel e Gel), parâmetros da linhagem Tucunacá (8,03 mg/g beta-carbolinas), colheita circadiana da Chacrona (06h00–08h30), bio-estabilização a 65–72 °Brix ($a_w$ 0,700–0,780) e Tabela Canônica de Reconstituição.
  7. **FAQ Canônico do Dirigente:** Base de conhecimento com 12 tópicos cruciais divididos em Conservação/Fermentação Natural, Dosagens/Repasse, Condução Ritual/Emergências e Normas CONAD/Fiscalização.
  8. **Respaldo Jurídico & Marco Legal:** Guia de conduta passo a passo em averiguações policiais/sanitárias, checklist da pasta física do templo e fundamentação sob a Lei nº 5.764/1971.
  9. **Laudos & Cadeia de Custódia:** Acesso aos laudos fitoquímicos e microbiológicos oficiais dos lotes preparados em Cruzeiro do Sul/AC.
  10. **Tabela Evolutiva & Cotas:** Explicação do modelo de cooperativismo de rateio operacional sem fins lucrativos.

### 2. Perfil Administrador (Conselho Gestor Litúrgico)
- **Credenciais Oficiais de Acesso Master:**
  - **Login:** `adm-nativaram`
  - **Senha Master:** `adm2026`
- **Painel Central:**
  - Tabela em tempo real com todas as solicitações registradas no banco de dados.
  - Métricas Vivas: Total de solicitações, volume total programado (litros/kg), pendências de análise e lotes em rota refrigerada.
  - Gerenciador de Status (atribuição de lote `AC-2026-XX`, rastreio `NTV-...` e prazos).
  - Disparo de mensagem no WhatsApp para o dirigente do templo.
  - Homologação de congregações parceiras e triagem CONAD.
  - Inspecionar Visão do Templo: Ferramenta interna restrita ao ADM logado para conferir a experiência do dirigente.

---

## 🔄 Ciclo de Vida da Solicitação Litúrgica (5 Fases)

1. **`SOLICITADO` (Protocolado / Triagem CONAD):** A congregação registra a solicitação no portal com protocolo único (`SOL-2026-XXXX`).
2. **`HOMOLOGADO_CONSELHO` (Aprovado em Plenária):** O Conselho Gestor valida a ata de constituição, destinação litúrgica e antecedência.
3. **`EM_FEITIO_ACRE` (Reserva de Biomassa):** A solicitação é vinculada a uma batelada tradicional conduzida em Cruzeiro do Sul/AC.
4. **`AGUARDANDO_DESPACHO` / `EM_TRANSITO_REFRIGERADO` (Logística Sudeste):** O lote é inspecionado no entreposto de Serra/ES, acondicionado em caixas isotérmicas seladas e despachado com monitoramento.
5. **`ENTREGUE_CONSAGRADO` (Recepção e Uso Sagrado):** O dirigente recebe a caixa lacrada, confere o selo e integra o sacramento aos trabalhos do templo.

---

## 📦 Componentes do Módulo

- **[`PortalDirigenteClient.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/layout/PortalDirigenteClient.tsx):** Orquestrador principal das 10 abas com persistência de autenticação e design responsivo.
- **[`PortalCentralDocumentos.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/PortalCentralDocumentos.tsx):** Emissor e visualizador de documentos canônicos para impressão vetorial A4.
- **[`PortalInteracoesMedicamentosas.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/PortalInteracoesMedicamentosas.tsx):** Guia farmacológico de contraindicações e busca instantânea.
- **[`PortalCatalogoGraduacoes.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/PortalCatalogoGraduacoes.tsx):** Catálogo de concentrações e parâmetros de feitio.
- **[`PortalAssessoriaFAQ.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/PortalAssessoriaFAQ.tsx):** FAQ com respostas detalhadas e destaques do Conselho.
- **[`PortalCalculadoraLiturgica.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/PortalCalculadoraLiturgica.tsx):** Calculadora interativa de comungantes para sacramentos.
- **[`PortalRespaldoJuridico.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/PortalRespaldoJuridico.tsx):** Central de defesa jurídica e roteiro de fiscalização.
- **[`FormSolicitacaoPedido.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/FormSolicitacaoPedido.tsx):** Formulário de cotas de rateio e intenção espiritual.
- **[`AcompanhamentoPedidos.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/AcompanhamentoPedidos.tsx):** Linha do tempo e histórico de solicitações.
- **[`AdminGestaoPedidos.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/AdminGestaoPedidos.tsx):** Painel do Conselho Gestor.
- **[`portal-assessoria.ts`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/data/portal-assessoria.ts):** Banco de dados estruturado fitoquímico e canônico.

---

## Relações

### Depende de
- [[Nativaram-Brasil]]
- [[Blindagem-Juridica-e-Sanitaria]]
- [[Banco-de-Dados-e-Persistencia-Local]]
- [[Dicionario-Semantico-Nativaram]]

### Feito em
- [[Roadmap-e-Componentes-do-Site]]

### Alimenta / impulsiona
- [[Cadeia-de-Custodia-e-Logistica-Refrigerada]]
- [[Catalogo-Oficial-de-Sacramentos-e-Graduacoes]]

### Relacionado a
- [[ADR-001-Persistencia-Atomica-e-WhatsApp-First]]
- [[00-Mapa-Mental-Portal-Nativaram]]
