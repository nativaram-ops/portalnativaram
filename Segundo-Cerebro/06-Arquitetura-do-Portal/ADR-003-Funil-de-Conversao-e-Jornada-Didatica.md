---
tipo: adr
status: pronto
prioridade: alta
categoria: arquitetura
---

# ADR-003: Funil de Conversão Institucional e Jornada Didática da Salvaguarda

## Contexto e Motivação
Com a aproximação da reta final de desenvolvimento do portal da Cooperativa Nativaram, a experiência do usuário enfrentava dispersão e cansaço cognitivo devido à redundância de conteúdos entre a Home e as páginas internas. Visitantes novos não tinham uma rota didática guiada, e a meta primária do portal — a conversão e acolhimento de novos templos e congregações religiosas mediante homologação cadastral no **Credenciamento Litúrgico** — não operava como o destino natural da navegação.

## Decisão de Arquitetura

1. **Estruturação do Funil Didático em 5 Estações Sequenciais:**
   - **Estação 1:** Origem & Vocação Cooperativa (`/institucional`)
   - **Estação 2:** A Ciência do Feitio Purista (`/feitio`)
   - **Estação 3:** O Compêndio de Sacramentos & Graduações (`/medicinas`)
   - **Estação 4:** O Marco Legal & Garantias CONAD (`/compliance`)
   - **Estação 5 (Clímax):** O Credenciamento Litúrgico Institucional (`/credenciamento`)

2. **Criação de Componentes Modulares de Funil em `src/components/funil/`:**
   - `JornadaNavTracker.tsx`: Indicador visual sutil e nobre de progresso da jornada litúrgica em 5 etapas no topo das páginas participantes.
   - `JornadaNextStep.tsx`: Seção editorial solene ao final de cada página com resumo do aprendizado e botão de transição para o próximo passo.
   - `HomeJornadaFunil.tsx`: Apresentador interativo do funil em 5 passos logo na Home para quem visita pela primeira vez.

3. **Racionalização da Home e Poda de Redundâncias (`ponytail`):**
   - Fusão de `HomeNotaSemantica` e `HomeNotaSacralidade` em um único componente solene e enxuto (`HomeCompromissoSagrado.tsx`), eliminando mais de 200 linhas de tabelas densas da página inicial.
   - Redirecionamento da rota zumbi `/manifesto` para `/institucional`.
   - Correção de metadados institucionais obsoletos para **Cooperativa Nativaram**.

4. **Transparência e Aceleração da Conversão no Credenciamento (`/credenciamento`):**
   - Apresentação da Timeline de Homologação em 3 Fases (Submissão → Análise em até 48h → Liberação do Portal do Dirigente), removendo o receio burocrático de novos dirigentes espirituais.

## Consequências

- **Positivas:**
  - O portal ganha uma narrativa contínua e didática de alta conversão sem perder o menu superior.
  - Eliminação drástica do inchaço e do cansaço visual.
  - Aumento da taxa de submissões legítimas de templos qualificados.
- **Riscos Monitorados:**
  - Manter o menu superior acessível para dirigentes que já conhecem a plataforma e desejam ir direto a uma aba específica.

## Relações

### Depende de
- [[00-Mapa-Mental-Portal-Nativaram]]
- [[Roadmap-e-Componentes-do-Site]]
- [[ADR-002-Composicao-Modular-e-Design-System]]

### Alimenta / impulsiona
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]
- [[Blindagem-Juridica-e-Sanitaria]]
