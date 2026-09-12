---
name: learned-resilient-db-timeouts
description: Padrão de resiliência de banco híbrido. Toda consulta a banco remoto (Supabase) deve ter timeout estrito (withTimeout) e fallback atômico local para evitar travamento de requisições.
---

# 🧠 Aprendizado Contínuo: Resiliência em Bancos Híbridos & Timeouts Remotos

## Contexto & Lição Aprendida
Durante o ciclo de execução do Portal Nativaram, identificou-se que consultas diretas a instâncias remotas do Supabase (PostgreSQL em nuvem) podem reter a resposta do Node.js/Next.js caso a conexão de rede oscile ou sofra latência, pois o cliente `@supabase/supabase-js` não possui um timeout padrão agressivo configurado por padrão.

Como o portal opera sob o princípio de **Zero Downtime Litúrgico** e possui uma camada de armazenamento local atômico (`data/pedidos.json`), consultas remotas que demoram mais que 2 segundos devem falhar graciosamente e delegar imediatamente a leitura/escrita para o disco local.

## Padrão Técnico Aplicado

```typescript
/**
 * Envolve qualquer Promise em um timeout estrito, rejeitando se exceder ms
 */
function withTimeout<T>(promise: PromiseLike<T>, ms = 2000): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout de ${ms}ms excedido na consulta remota`)), ms)
    ),
  ]);
}
```

### Regras de Ouro:
1. **Nunca aguardar indefinidamente:** Todo `supabase.from(...).select/insert/update/delete` deve estar envolvido em `withTimeout(query, 2000)`.
2. **Fallback Silencioso e Seguro:** Em caso de rejeição por timeout ou falha de rede, capturar no bloco `catch` e redirecionar para a persistência local atômica via arquivo temporário e `rename`.
3. **Inspeção de Navegador via Chrome DevTools:** Quando drivers de terceiros (Playwright CDN) apresentarem instabilidade em ambientes Windows, utilizar o Google Chrome instalado nativamente via DevTools Protocol (`--remote-debugging-port=9222`) sobre WebSocket para inspeção determinística de console e DOM.
