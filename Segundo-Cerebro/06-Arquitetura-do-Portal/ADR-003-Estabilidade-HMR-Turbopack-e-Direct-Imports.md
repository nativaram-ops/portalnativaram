---
tipo: adr
status: pronto
prioridade: alta
categoria: arquitetura
---

# ADR-003: Estabilidade de HMR, Compilação Turbopack e Eliminação de Barrel Files

## Contexto e Motivação
Durante o desenvolvimento local no Windows com Next.js 15 e React 19, qualquer atualização de código causava falhas intermitentes de carregamento no navegador, resultando em:
1. Erro HTTP 500 no runtime do Next.js: `TypeError: __webpack_modules__[moduleId] is not a function`.
2. Dessincronização do manifesto de componentes de cliente: `Could not find the module ... in the React Client Manifest`.
3. Bloqueio de porta 3000 por processos zumbis do Node.js, com falso positivo no script `iniciar_portal.bat`.

## Diagnóstico
- **Contaminação por Barrel Files**: Arquivos `index.ts` reexportavam tanto Server Components quanto Client Components (`'use client'`). Ao importar de `@/components/ui` ou `@/components/home`, o bundler violava as fronteiras do React Server Components durante o Hot Module Replacement (HMR).
- **Instabilidade do Webpack no Windows**: O Webpack dev server corrompia o cache de chunks e referências de módulos após edições em lote.
- **Checagem Passiva de Porta**: O script de inicialização verificava apenas se havia um listener TCP na porta 3000, e não se o serviço estava saudável (HTTP 200).

## Decisão de Arquitetura

1. **Eliminação Estrita de Barrel Files para Componentes**:
   - Remoção de `src/components/ui/index.ts` e `src/components/home/index.ts`.
   - Conversão de todas as importações para caminhos diretos (ex: `import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll"` e `import { Card } from "@/components/ui/Card"`).
   - Eliminação de qualquer vazamento de diretiva `'use client'` em componentes de servidor.

2. **Adoção do Turbopack no Ambiente de Desenvolvimento**:
   - Configuração de `next dev --turbo --port 3000` como motor primário via `scripts/dev.mjs`.
   - Inicialização direta do binário do Next.js sem intermediários ou overhead de shell.
   - Otimização de importação de bibliotecas de ícones via `experimental.optimizePackageImports: ["lucide-react"]` no `next.config.mjs`.

3. **Auto-Cura e Resiliência de Portas**:
   - `scripts/dev.mjs` verifica a saúde do serviço via requisição HTTP; se a porta 3000 estiver ocupada por processo órfão ou com falha (diferente de 200 OK), finaliza automaticamente os processos bloqueadores antes de subir o Turbopack.
   - `iniciar_portal.bat` agora executa health check real antes de tentar abrir abas órfãs no navegador.

## Consequências
- **Positivas**:
  - Tempo de compilação incremental após edições reduzido para 40ms - 80ms.
  - O tamanho do bundle First Load JS da Home caiu de 127 kB para 114 kB.
  - Eliminação definitiva de erros `__webpack_modules__` e travamentos na porta 3000.
  - Build de produção continua 100% íntegro (32/32 rotas estáticas e dinâmicas geradas com código 0).
- **Negativas / Cuidados**:
  - Desenvolvedores devem utilizar importações diretas para novos componentes em vez de criar novos barrel files `index.ts`.

## Relações

### Depende de
- [[ADR-002-Composicao-Modular-e-Design-System]]

### Relacionado a
- [[Roadmap-e-Componentes-do-Site]]
- [[Indice-de-Recuperacao-Rapida]]
