---
tipo: arquitetura
status: pronto
prioridade: alta
ferramenta_principal: Next.js
para_quem_e: Dirigentes e Conselho Gestor
categoria: Gestão Litúrgica
---

# 🏛️ Portal do Dirigente & Gestão Litúrgica

O **Portal do Dirigente** é a área de acesso restrito da Cooperativa Etnobotânica Nativaram Brasil desenvolvida para templos, igrejas e centros ayahuasqueiros previamente homologados. O módulo opera como um sistema seguro de gestão de cotas litúrgicas, partilha de sacramentos, rastreabilidade fitoquímica e governança de transporte refrigerado.

---

## 👥 Perfis de Acesso e Governança

### 1. Perfil Dirigente Litúrgico (Templo Homologado)
- **Autenticação:** Código de Homologação institucional (ex: `NAT-TEMPLO-842`) e chave de segurança / CPF do dirigente.
- **Painel:**
  - **Acompanhamento & Rastreio:** Visão de linha do tempo em 5 fases de todas as solicitações do templo.
  - **Nova Solicitação de Partilha:** Formulário ágil com catálogo visual de sacramentos (graduações de Ayahuasca, rapés e artefatos), cálculo do rateio cooperativo regressivo por volume, campo amplo de mensagem e intenção espiritual, e integração com WhatsApp.
  - **Laudos & Cadeia de Custódia:** Acesso aos laudos fitoquímicos (teores de Harmina, THH, Harmalina) e microbiológicos dos lotes preparados no Acre.
  - **Cooperativismo & Tabela Evolutiva:** Explicação do princípio cooperativo de diluição de custos operacionais e frete.
  - **Ação Rápida de Re-order:** Botão "Repetir Solicitação" que preenche o formulário com 1 clique.

### 2. Perfil Administrador (Conselho Gestor Litúrgico)
- **Autenticação:** Identificação de administrador (`ADM-NATIVARAM`) e chave de segurança.
- **Painel Central:**
  - **Solicitações de Partilha:** Tabela em tempo real com todas as solicitações registradas no banco de dados.
  - **Métricas Vivas:** Total de solicitações, volume total programado (litros/kg), pendências de análise e lotes em rota refrigerada.
  - **Gerenciador de Status:** Modal operacional para alterar status, vincular código de lote no Acre (`AC-2026-XX`), cadastrar código de rastreio (`NTV-...`) e prazo de entrega.
  - **Disparo de WhatsApp para Dirigente:** Link gerado automaticamente que notifica o dirigente no WhatsApp cadastrado com os detalhes da atualização.
  - **Homologação de Congregações:** Triagem de atas de fundação e conformidade CONAD nº 01/2010.

---

## 🔄 Ciclo de Vida da Solicitação Litúrgica (5 Fases)

1. **`SOLICITADO` (Protocolado / Triagem CONAD):** A congregação registra a solicitação no portal. É gerado um protocolo litúrgico único (ex: `SOL-2026-P3CG`).
2. **`HOMOLOGADO_CONSELHO` (Aprovado em Plenária):** O Conselho Gestor valida a ata de constituição, a destinação litúrgica e a antecedência de 30 dias.
3. **`EM_FEITIO_ACRE` (Reserva de Biomassa):** A solicitação é vinculada a uma batelada tradicional conduzida pelo Mestre Caboclo em Cruzeiro do Sul/AC.
4. **`AGUARDANDO_DESPACHO` / `EM_TRANSITO_REFRIGERADO` (Logística Sudeste):** O lote é inspecionado no entreposto de Serra/ES, acondicionado em caixas isotérmicas seladas com gelox e despachado por transporte aéreo monitorado.
5. **`ENTREGUE_CONSAGRADO` (Recepção e Uso Sagrado):** O dirigente recebe a caixa lacrada, confere o selo e integra o sacramento aos trabalhos espirituais do templo.

---

## 📦 Componentes do Módulo

- **[`FormSolicitacaoPedido.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/FormSolicitacaoPedido.tsx):** Interface de preenchimento ágil, seleção de itens, cálculo de cota e envio duplo.
- **[`AcompanhamentoPedidos.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/AcompanhamentoPedidos.tsx):** Monitoramento visual, histórico de auditoria e linha do tempo.
- **[`AdminGestaoPedidos.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/portal-dirigente/AdminGestaoPedidos.tsx):** Gestão administrativa central, métricas e notificações.
- **[`PortalDirigenteClient.tsx`](file:///c:/Users/victo/.gemini/antigravity-ide/scratch/nativaram-portal/src/components/layout/PortalDirigenteClient.tsx):** Controlador de rotas e perfis de acesso.

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
