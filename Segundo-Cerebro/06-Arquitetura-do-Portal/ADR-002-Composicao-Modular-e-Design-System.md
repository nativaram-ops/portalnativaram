---
tipo: adr
status: pronto
prioridade: alta
categoria: arquitetura
---

# ADR-002: Composição Modular (Vercel Composition Patterns) e Design System Nativaram

## Contexto e Motivação
Com o crescimento do portal da Cooperativa Etnobotânica Nativaram Brasil, a página inicial (`src/app/page.tsx`) acumulou mais de 1.090 linhas condensadas em um único arquivo, e componentes como `PageHero` dependiam de props rígidas, limitando a flexibilidade composicional e violando boas práticas modernas de escalabilidade React 19.

Adicionalmente, os elementos visuais de cartão e seções dependiam de estilizações inline redundantes e despadronizadas, exigindo uma evolução para **Compound Components** (padrão Vercel de composição) e encapsulamento em módulos profundos.

## Decisão de Arquitetura

1. **Adoção de Compound Components em `src/components/ui/`**:
   - `Card`: Primitiva composta (`Card.Header`, `Card.Icon`, `Card.Badge`, `Card.Title`, `Card.Description`, `Card.Content`, `Card.Footer`) com suporte a variantes (`liturgico`, `elevated`, `editorial`, `solar`, `flat`) e halo de luz (`glow`).
   - `Badge`: Primitiva modular com indicador de pulso (`dot`), ícone e variantes semânticas (`solar`, `emerald`, `floresta`, `outline`).
   - `Section`: Layout padronizado para espaçamento de seções (`Section.Header`, `Section.Badge`, `Section.Title`, `Section.Description`, `Section.Content`).
   - `PageHero`: Atualizado para padrão composto (`PageHero.Badge`, `PageHero.Title`, `PageHero.Description`, `PageHero.Actions`, `PageHero.Footnote`) com preservação total de compatibilidade com props legadas.
   - `index.ts`: Barrel export unificado para todo o ecossistema de UI.

2. **Modularização Profunda da Home (`src/components/home/`)**:
   - Quebra de `src/app/page.tsx` em 8 componentes profundos, altamente coesos e desacoplados:
     - `HomeHero.tsx`
     - `HomePilaresBar.tsx`
     - `HomeNotaSacralidade.tsx`
     - `HomePrincipiosFeitio.tsx`
     - `HomePonteEtica.tsx`
     - `HomeGraduacoes.tsx`
     - `HomeLogisticaGollog.tsx`
     - `HomeDepoimentosCredenciamento.tsx`
     - `HomeFaqSection.tsx`
   - Redução do `page.tsx` de 1.092 linhas para 50 linhas declarativas.

3. **Elevação Estética e Tokens Institucionais em `globals.css`**:
   - Criação de utilitários de glassmorphism solar (`.glass-solar`, `.glass-floresta`).
   - Bordas reativas com brilho dourado (`.border-glow-amber`).
   - Tags canônicas de contraste WCAG 2.1 AA (`.badge-solar`, `.badge-emerald`, `.badge-floresta`).

4. **Conformidade Doutrinária e Etnobotânica**:
   - 100% de obediência ao dicionário de termos de `AGENTS.md` (sacramentos, alquimia vegetal, rateio solidário, Cruzeiro do Sul/AC, despacho Gollog).

## Consequências

- **Positivas**:
  - Código limpo, extensível e facilmente mantido por humanos e agentes de IA.
  - Eliminação de duplicação de classes Tailwind em cards e cabeçalhos.
  - Estética visual sofisticada ("WOW Factor") condizente com a nobreza institucional da cooperativa.
  - Total retrocompatibilidade com rotas e componentes existentes.
- **Riscos Monitorados**:
  - Garantir que novas páginas utilizem as primitivas de `src/components/ui/` em vez de criar classes inline ad-hoc.

## Relações

### Depende de
- [[00-Mapa-Mental-Portal-Nativaram]]
- [[ADR-001-Persistencia-Atomica-e-WhatsApp-First]]

### Feito em
- [[Roadmap-e-Componentes-do-Site]]

### Alimenta / impulsiona
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]
- [[Catalogo-Oficial-de-Sacramentos-e-Graduacoes]]

### Relacionado a
- [[Guia-de-Skills-e-Comandos]]
