# Plano 001: Funil de Conversão & Jornada Didática da Salvaguarda

## Contexto & Motivação
O portal da **Cooperativa Nativaram** foi concebido como um portal institucional e litúrgico sob a Lei 5.764/71 e Resolução CONAD nº 01/2010.
Na reta final de desenvolvimento, o site tornou-se extenso e redundante em pontos críticos:
- A `HomePage` contém 10 blocos e tenta esgotar todos os temas (Gênese, Pilares, Notas Semânticas de 266 linhas, Feitio, Ponte Ética, 4 Graduações, Logística, Depoimentos, FAQ), sobrecarregando o visitante.
- As abas do menu (`/institucional`, `/feitio`, `/medicinas`, `/compliance`, `/credenciamento`) funcionam como "ilhas desconectadas" sem guiar o visitante iniciante por uma linha de raciocínio contínua.
- O objetivo central da plataforma — a **conversão institucional** de novos templos através do **Credenciamento Litúrgico** — ficava disperso sem um funil bem delineado.

## Princípios de Design e Engenharia
1. **Narrative-Driven Progressive Disclosure:** Cada aba responde a uma pergunta-chave da jornada de confiança e conduz à próxima.
2. **Minimalismo e Anti-Bloat (`ponytail`):** Racionalizar a Home, unificar seções semânticas repetitivas em um card nobre e conciso, eliminar duplicidades de rotas (`/manifesto` -> `/institucional`).
3. **Alto Craft Visual & Solenidade (`od-master-design`):** Preservar a estética sagrada, os tons de Floresta, Âmbar, Areia e Pedra, tipografia Cinzel/Inter e microinterações táteis.
4. **Alinhamento Estrito de Compliance:** Zero termos comerciais, barreira do pronome, salvaguarda do CONAD 01/2010.

## A Arquitetura das 5 Estações do Funil
```
1. Origem & Aliança (/institucional)
       ↓
2. Feitio Purista (/feitio)
       ↓
3. Compêndio de Sacramentos (/medicinas)
       ↓
4. Marco Legal & Laudos (/compliance)
       ↓
5. Credenciamento do Templo (/credenciamento) [CLÍMAX DO FUNIL]
```

## Componentes a Serem Desenvolvidos e Integrados
1. `src/components/funil/JornadaNavTracker.tsx`: Régua sutil de orientação de etapa (1 a 5).
2. `src/components/funil/JornadaNextStep.tsx`: Card solene de avanço de etapa no rodapé de cada aba do funil.
3. `src/components/home/HomeJornadaFunil.tsx`: Apresentador interativo do caminho em 5 etapas logo na Home.
4. `src/components/home/HomeCompromissoSagrado.tsx`: Unificação solene das notas de sacralidade e responsabilidade legal.
5. Integração dos passos em `/institucional`, `/feitio`, `/medicinas`, `/compliance` e `/credenciamento`.
