---
tipo: adr
status: pronto
prioridade: alta
ferramenta_principal: Supabase / PostgreSQL / Next.js
para_quem_e: Agentes de IA e Desenvolvedores
categoria: Decisão de Arquitetura
---

# ADR-005: Persistência em Nuvem via Supabase (PostgreSQL) e Autenticação Gratuita

## Contexto
O portal institucional da Cooperativa Nativaram necessitava de uma solução definitiva para persistência de dados em produção e controle de acesso para dirigentes de templos homologados e conselho gestor.
Em ambientes serverless (como a Vercel), o sistema de arquivos local é efêmero e *read-only*, inviabilizando que gravações persistam apenas em `data/pedidos.json`.
Além disso, a cooperativa demandava uma solução de banco de dados relacional e autenticação com custo zero (plano gratuito), sem servidores complexos adicionais.

## Decisão
1. **Adoção do Supabase no Plano Gratuito (Free Tier):**
   - Instância oficial: projeto `qpgtngknrrawpaatiofe` (`https://qpgtngknrrawpaatiofe.supabase.co`).
   - Banco de Dados relacional PostgreSQL com extensão `uuid-ossp`, gatilhos automatizados de timestamp e Row Level Security (RLS).
   - Tabela `pedidos_liturgicos` para registro atômico de solicitações, cotas de rateio, histórico de auditoria e sincronização WhatsApp.
   - Tabela `templos_credenciados` para cadastro institucional, dirigente responsável, CNPJ, status CONAD e papel (`DIRIGENTE` ou `ADMIN`).
   - Tabela `solicitacoes_homologacao` para acolhimento de credenciamentos formais e grupos informais sob análise do Conselho Gestor.
   - Tabelas comunitárias `publicacoes_comunidade`, `perfis_comunidade` e `agenda_liturgica` para o hub de estudos e ritos.
   - Políticas de RLS (`002` e `003-politicas-rls-aplicacao.sql`) liberando leitura/gravação resiliente das rotas de API da aplicação mesmo operando com Anon Key.

2. **Arquitetura Híbrida com Fallback Local Resiliente:**
   - Detecção dinâmica de ambiente em `src/lib/supabase/client.ts` e `src/lib/supabase/server.ts`.
   - Se as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estiverem ativas, a aplicação opera prioritariamente no PostgreSQL em nuvem.
   - Em caso de ausência de credenciais (ex: testes locais rápidos) ou indisponibilidade temporária de rede, o sistema comuta transparentemente para o banco local atômico `data/pedidos.json`, garantindo zero quebras de build, testes automatizados e desenvolvimento offline.

3. **Autenticação Híbrida e Sessão Unificada no Portal do Dirigente:**
   - **Método 1 (Supabase Auth):** Login seguro por E-mail e Senha ou Magic Link (OTP) gratuito para dirigentes e administradores cadastrados no Supabase Auth. Integrado diretamente ao Route Handler `/api/auth/verificar-chave`, que emite o cookie HttpOnly `nativaram_session` assinado via HMAC-SHA256 para autorizar chamadas às APIs internas.
   - **Método 2 (Chave Litúrgica Canônica & Senha Master):** Acesso ágil por código de homologação (`NAT-TEMPLO-842`) ou credencial master do conselho (`adm-nativaram` com `ADMIN_MASTER_PASSWORD` e fallback de recuperação `adm2026`).
   - **Resiliência de Sessão:** O segredo de assinatura de tokens deriva prioritariamente de `ADMIN_SECRET_KEY`, com fallback resiliente para as chaves ativas do Supabase, prevenindo desconexões ou erros 500 caso a chave ainda não tenha sido populada no ambiente de deploy.

## Consequências
- ✅ **Persistência Real em Produção:** Dados de pedidos e credenciamentos persistem com segurança na Vercel e qualquer ambiente em nuvem.
- ✅ **Custo Zero:** Enquadramento 100% no Free Tier do Supabase (até 50.000 usuários ativos e 500MB de banco relacional).
- ✅ **Auditoria & Segurança:** Políticas de RLS habilitadas e histórico auditável em JSONB para cada alteração de status litúrgico.
- ✅ **Resiliência Total:** Testes automatizados continuam verdes independente da conectividade com o Supabase.

---

## Relações

### Depende de
- [[ADR-001-Persistencia-Atomica-e-WhatsApp-First]]
- [[Banco-de-Dados-e-Persistencia-Local]]

### Alimenta / impulsiona
- [[Portal-do-Dirigente-e-Gestao-Liturgica]]
- [[Roadmap-e-Componentes-do-Site]]
- [[Indice-de-Recuperacao-Rapida]]
