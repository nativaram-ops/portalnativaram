---
name: segundo-cerebro-ciclo-memoria-ativa
description: Executa o ciclo mandatório de consultar a memória do Obsidian antes de qualquer atualização e gravar as alterações no vault após o término.
---

# Skill: Ciclo Ativo de Memória (Obsidian)

Use ou siga este procedimento em TODA tarefa de desenvolvimento, manutenção ou refatoração no projeto.

## Propósito
Garantir que nenhuma modificação seja feita no vácuo: todo raciocínio técnico deve ser ancorado no conhecimento consolidado do vault e todo novo aprendizado/modificação deve ser persistido de volta ao Segundo Cérebro.

## Protocolo Operacional

### Etapa 1: Consulta Prévia (Antes da Ação)
1. Inspecionar o arquivo `Segundo-Cerebro/06-Arquitetura-do-Portal/Indice-de-Recuperacao-Rapida.md`.
2. Acessar a nota temática específica em `Segundo-Cerebro/`:
   - Arquitetura, rotas, telas: `06-Arquitetura-do-Portal/Roadmap-e-Componentes-do-Site.md`
   - Banco de dados e requisições: `06-Arquitetura-do-Portal/Banco-de-Dados-e-Persistencia-Local.md`
   - Portal do Dirigente / ADM: `06-Arquitetura-do-Portal/Portal-do-Dirigente-e-Gestao-Liturgica.md`
   - Fitoquímica / Sacramentos: pasta `02-Etnociencia-e-Feitio/`
   - Termos e regras de conformidade: pasta `03-Compliance-e-Seguranca/` e `04-Engenharia-de-Linguagem/`
3. Extrair padrões vigentes e validar se a demanda não contradiz diretrizes estabelecidas.

### Etapa 2: Execução Técnica
- Proceder com a alteração dos arquivos de código fonte necessários.

### Etapa 3: Gravação Posterior (Persistência no Obsidian)
1. Abrir a nota correspondente no Obsidian que mapeia os recursos alterados.
2. Atualizar a seção relevante (novos componentes, alteração de fluxo, novas rotas ou tipos).
3. Se a alteração introduziu uma nova decisão arquitetural, criar uma nova ADR (`ADR-00X-*.md`) em `Segundo-Cerebro/06-Arquitetura-do-Portal/`.
4. Se novas notas forem criadas, vincular suas referências no `00-Mapa-Mental-Portal-Nativaram.md` e na seção `## Relações`.

### Etapa 4: Resposta ao Usuário
Finalizar o atendimento detalhando explicitamente:
- 📖 **Memória Consultada:** notas do Obsidian lidas antes da alteração.
- 💻 **Arquivos de Código Alterados:** caminhos dos arquivos modificados.
- ✍️ **Memória Atualizada:** notas do Obsidian onde as novas informações foram gravadas.
- 📌 **Pendências / Próximos Passos:** se aplicável.
