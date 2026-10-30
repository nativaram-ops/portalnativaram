# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`AGENTS.md`** at the repo root: canonical lexical compliance rules, brand identity (`Cooperativa Nativaram`), and project skills.
- **`Segundo-Cerebro/06-Arquitetura-do-Portal/Indice-de-Recuperacao-Rapida.md`**: quick-recovery index for architecture, routes, and active constraints.
- **`Segundo-Cerebro/06-Arquitetura-do-Portal/`**: read the ADRs (`ADR-001` through `ADR-007`) and `Roadmap-e-Componentes-do-Site.md` that touch the area you're about to work in.
- **`CONTEXT.md`** at the repo root, or **`docs/adr/`** if present.

If any optional files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/arquitetura-modelagem-dominio` and `/segundo-cerebro-registrar-decisao` skills maintain the canonical decisions inside `Segundo-Cerebro/06-Arquitetura-do-Portal/`.

## File structure

Single-context repo (most repos):

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

Multi-context repo (presence of `CONTEXT-MAP.md` at the root):

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← system-wide decisions
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← context-specific decisions
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders), but worth reopening because…_
