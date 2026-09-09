---
tipo: adr
status: pronto
prioridade: alta
ferramenta_principal: Next.js
para_quem_e: Dirigentes e Lideranças Litúrgicas
categoria: Governança Litúrgica
---

# ADR-004: Centro de Assessoria Institucional, Modelos Abertos A4 e Reconstituição Fitoquímica no Portal do Dirigente

## 1. Contexto e Problema
O Portal do Dirigente da **Cooperativa Nativaram** foi concebido originariamente para gestão e rastreamento de pedidos de sacramentos e cotas de rateio. Contudo, na prática dos templos ayahuasqueiros credenciados, os líderes comunitários enfrentam severas dores cotidianas de governança:
- Falta de fichas padronizadas de anamnese pré-ritual para triagem de segurança em saúde.
- Ausência de termos de consentimento e responsabilidade alinhados à Resolução CONAD nº 01/2010 e Art. 5º, VI da CF/88.
- Dificuldade para consultar rapidamente interações medicamentosas perigosas (ISRS, ISRN, IMAO, opioides) e calcular o tempo de washout necessário.
- Dúvidas recorrentes sobre fermentação natural/pressão em garrafas, dosagens de cada graduação e conduta em emergências ou averiguações policiais/sanitárias.
- Necessidade de calcular a diluição e reconstituição do concentrado 10:1 Wirapuru (semi-mel) com água mineral estéril.
- Demanda por modelos documentais que **não engessem a soberania dos templos**, mas sirvam como modelos canônicos abertos a adaptação e edição em Word/Docs/Markdown.

## 2. Decisão Arquitetural
Adotar a transformação do `/portal-dirigente` em um **Centro Integrado de Assessoria Litúrgica & Salvaguarda Canônica**, ancorado no acervo técnico-científico extraído do caderno oficial Google NotebookLM (222 fontes primárias):
1. **Modelos Canônicos Abertos com Exportação Tripla (A4, Word e Markdown):**
   - Implementação de 4 documentos integrais canônicos: Doc 01 Ficha de Anamnese (7 módulos), Doc 02 Termo de Consentimento e Responsabilidade (9 cláusulas), Doc 03 POP Litúrgico e Ata de Sessão (5 fases) e Doc 04 Declaração de Trânsito Litúrgico de Sacramento.
   - Banner mandatório esclarecendo que todos os documentos são **modelos sugestivos abertos à edição e adaptação de cada casa**.
   - Três botões integrados: "Imprimir A4 / PDF", "Copiar Texto (Word/Docs)" e "Baixar Editável (.md)".
   - Gaveta pedagógica interativa: "Por Que Cada Item Existe? (Fundamentação Litúrgica & Clínica)".
2. **Base Farmacológica Exaustiva (15 Classes) & Critérios de Hunter:**
   - Mapeamento das 15 classes farmacológicas com cinética linear ($5 \text{ a } 7 \times t_{1/2}$), vias metabólicas hepáticas (CYP2D6, CYP3A4) e excreção renal.
   - Card de diagnóstico rápido pelos Critérios de Hunter (sensibilidade 84%, especificidade 97%) e acionamento do SAMU 192 com Posição Lateral de Segurança (PLS).
   - Alerta sanitário máximo sobre a toxicidade do Carbonato de Lítio (depleção de inositol, IP3/DAG, hipersensibilização 5-HT2A e 47% de convulsões/Status Epilepticus refratário).
3. **Catálogo Tucunacá / Chacrona & Calculadora de Reconstituição 10:1 Wirapuru:**
   - Incorporação dos parâmetros da linhagem Tucunacá (8,03 mg/g beta-carbolinas totais) e colheita circadiana da Chacrona (06h00 às 08h30 com orvalho intacto).
   - Calculadora litúrgica com dois modos: "Dimensionar Cerimônia" (por participantes, repasse, rapé e sananga) e "Reconstituição 10:1" (cálculo de água a 45-50°C, volume final e cálices de 60ml para 7:1, 5:1 ou 3:1).
4. **Respaldo Jurídico e Checklist de Fiscalização:**
   - Compilação dos fundamentos da CF/88, CONAD 01/2010, Lei 5.764/71 e checklist da pasta física do templo.

## 3. Consequências
- **Positivas:**
  - Zero novas dependências npm externas (filosofia `ponytail`: YAGNI e anti-overengineering).
  - Soberania total aos dirigentes para customizar suas diretrizes doutrinárias a partir de uma base com rigor jurídico e médico impecável.
  - Segurança jurídica, clínica e comunitária sem precedentes para as casas associadas.
- **Negativas / Cuidados:**
  - O dirigente deve ser orientado a manter seu navegador configurado para ocultar cabeçalhos/rodapés de URL do navegador na janela de impressão para obter um PDF perfeitamente limpo.

---

## Relações

### Depende de
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]
- [[Blindagem-Juridica-e-Sanitaria]]
- [[Dicionario-Semantico-Nativaram]]

### Feito em
- [[Roadmap-e-Componentes-do-Site]]

### Alimenta / impulsiona
- [[Ayahuasca-e-Purismo-Botanico]]
- [[Cadeia-de-Custodia-e-Logistica-Refrigerada]]
