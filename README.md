# Cooperativa Nativaram — Portal Institucional

Portal da Cooperativa Nativaram (Cooperativa Etnobotânica Nativaram), entidade cooperativa sem fins lucrativos (Lei 5.764/71 e Resolução CONAD 01/2010) dedicada à salvaguarda litúrgica e ao apoio a templos credenciados. O portal reúne o conteúdo institucional, a biblioteca de estudos, o credenciamento de templos, o Portal do Dirigente e o rateio de custos logísticos entre os cooperados. Regras de linguagem, compliance e design estão no [`AGENTS.md`](AGENTS.md).

## Requisitos

- Node.js 22 ou superior (versão em `.nvmrc`)
- npm

## Configuração

```bash
npm install
cp .env.local.example .env.local
```

Preencha o `.env.local` com os valores do seu ambiente. Nunca versione esse arquivo.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em http://localhost:3000 (no Windows libera a porta 3000 antes de subir) |
| `npm test` | Testes de regras litúrgicas, matriz, rateio, documentos e biblioteca |
| `npm run typecheck` | Verificação de tipos do TypeScript |
| `npm run lint` | ESLint |
| `npm run build` | Build de produção do Next.js |
| `npm start` | Sobe o build de produção |

No Windows, rode pelo `cmd.exe /c "npm ..."` para evitar bloqueio de ExecutionPolicy do PowerShell.

## Banco de dados (Supabase)

Os scripts ficam em `src/lib/supabase/`. Execute no SQL Editor do Supabase:

- `migrations/004-fechar-rls-tabelas-sensiveis.sql`
- `migrations/006-remover-delete-publico.sql`

As migrações **003** e **005** são obsoletas: não execute. Se a 005 já foi rodada, a 006 desfaz o que ela criou.

## Planos de trabalho

Planos, auditorias e o andamento de cada frente ficam em [`plans/`](plans/).

## Itens fora do Git

Ferramentas de agentes, o cofre do Obsidian e as fontes internas existem só na máquina local e não entram no repositório. A lista e a regra estão na seção "Itens fora do Git" do [`AGENTS.md`](AGENTS.md).
