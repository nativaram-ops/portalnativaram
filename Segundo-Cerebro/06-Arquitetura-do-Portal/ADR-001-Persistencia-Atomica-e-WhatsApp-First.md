---
tipo: adr
status: pronto
prioridade: contínua/obrigatória
ferramenta_principal: Next.js / Node.js
para_quem_e: Conselho Gestor e Arquitetos de Software
categoria: Decisão de Arquitetura
---

# 📜 ADR-001: Persistência Atômica Local & Arquitetura WhatsApp-First

## Contexto & Motivação
Em 28 de janeiro de 2025, a ANVISA e o CONAD reforçaram expressamente que a Ayahuasca e preparados etnobotânicos tradicionais não podem ser objeto de comércio eletrônico aberto (e-commerce com carrinho, checkout e cobrança mercantil). A partilha deve ocorrer estritamente entre pessoas jurídicas religiosas homologadas para rateio dos custos operacionais de transporte e feitio.

Diante desse marco legal estrito e da necessidade de um portal ágil para os dirigentes realizarem suas solicitações de cota:
1. O portal não deve possuir gateways de pagamento mercantil (Stripe, Mercado Pago) abertos ao público.
2. A comunicação e o envio das intenções cerimoniais devem preservar o contato humano direto e fraterno com o Conselho Gestor.
3. Os dados de solicitações precisam de persistência local confiável no servidor sem exigir bancos relacionais pesados em nuvem externa no estágio atual.

---

## Decisão Tomada

1. **Camada de Persistência em JSON com Escrita Atômica:**
   - Armazenar solicitações em `data/pedidos.json`.
   - Utilizar escrita em arquivo temporário com `fs.rename` (atômico no nível de sistema de arquivos POSIX/NTFS).
   - Tipagem rigorosa com Zod e TypeScript garantindo validação em tempo de compilação e execução.

2. **Fluxo WhatsApp-First com Ação Dupla:**
   - Ao submeter a solicitação de partilha, o sistema salva o registro completo no banco de dados local da cooperativa e, instantaneamente, gera a mensagem oficial encodada para o WhatsApp do Conselho (`5568999979104`).
   - O mesmo fluxo é aplicado no sentido inverso: quando o Conselho atualiza o status de um pedido no painel ADM, um botão gera a mensagem de aviso formatada diretamente para o WhatsApp do dirigente responsável.

---

## Consequências

### Positivas
- **100% de Blindagem Legal:** Inexistência de carrinhos de compras ou transações comerciais digitais que possam ser interpretadas como venda de substâncias controladas.
- **Resiliência e Zero Falhas de Conexão:** Não depende de instâncias de PostgreSQL/MySQL externas; opera de forma autônoma no servidor local.
- **Transparência e Auditoria:** Todas as solicitações, mensagens e alterações de status são registradas com data, hora e responsável.
- **Proximidade Fraterna:** Todo pedido passa por um aperto de mão virtual no WhatsApp entre o dirigente e o conselho.

### Limitações & Mitigações
- Para concorrência massiva de dezenas de milhares de requisições simultâneas, uma transição futura para SQLite (`node:sqlite` ou PostgreSQL) poderá ser realizada mantendo as mesmas interfaces de `src/types/pedido.ts`.

---

## Relações

### Depende de
- [[Blindagem-Juridica-e-Sanitaria]]
- [[Dicionario-Semantico-Nativaram]]

### Feito em
- [[Banco-de-Dados-e-Persistencia-Local]]
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]

### Relacionado a
- [[Roadmap-e-Componentes-do-Site]]
- [[Cadeia-de-Custodia-e-Logistica-Refrigerada]]
