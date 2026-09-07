---
tipo: arquitetura
status: pronto
prioridade: alta
ferramenta_principal: Next.js
para_quem_e: Uso próprio
categoria: Arquitetura Técnica
---

# 💻 Roadmap e Componentes do Portal Nativaram

O portal da Cooperativa Nativaram Brasil é uma plataforma institucional construída com **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS** e design system solene baseado na identidade etnobotânica da floresta.

---

## 🎨 Design Tokens Oficiais
- **Floresta Noturna:** `#16281E` (backgrounds nobres e cabeçalhos solenes)
- **Âmbar Solar:** `#D4A359` (destaques, bordas sacras e botões de intenção)
- **Areia Ancestral:** `#F8F6F0` (texturas nobres claras)
- **Pedra Escura:** `#1C1917` (cards de leitura e bases analíticas)
- **Tipografia:** `Cinzel` (títulos majestosos) e `Inter` (corpo de texto límpido e legível).

---

## 🗺️ Mapa de Páginas e Módulos Técnicos

```
src/
├── app/
│   ├── page.tsx (Home: Gênese, Alquimia, 4 Graduações HPLC e Gollog Express)
│   ├── institucional/ (Manifesto Institucional, Doutrina e FAQ)
│   ├── feitio/ (Casa de Feitio, Vigília, Rastreabilidade e Manejo)
│   ├── medicinas/ (Compêndio Etnobotânico: Ciência Biogeoquímica, pH 9.75-10.2, Sananga e Artefatos)
│   ├── medicinas/[slug]/ (Ficha Individual Fitoquímica, Benefícios e Rateio Cooperativo)
│   ├── credenciamento/ (Ficha Institucional, Termo Deontológico e Triagem ISRS)
│   ├── compliance/ (Blindagem Jurídica ANVISA 2025 e Resoluções CONAD)
│   ├── estudos/ (Compêndio de Ensaios Científicos e Artigos Etnofarmacológicos)
│   └── projetos-de-luz/ (Regeneração Social, Apoio Comunitário e Agrofloresta)
├── components/
│   ├── forms/CredenciamentoForm.tsx (Anamnese, Prévia Dinâmica HPLC e Washout 5 Semanas)
│   ├── manifesto/ManifestoLanding.tsx (Gênese e Etnociência Horizontal)
│   └── ui/ (AnimateOnScroll, FaqAccordion, SectionDivider, Botões Nobres)
├── data/
│   ├── graduacoes.ts (Perfil HPLC Tucunacá: Harmina, Harmalina, THH, Porções e Rateios)
│   ├── sacramentos.ts (10 Rapés Tradicionais, Sananga 10ml, Artefatos e Compliance)
│   ├── medicinas.ts (15 Rapés Detalhados, Chakras, Famílias e Alquimias)
│   └── estudos.ts (Pesquisas Acadêmicas indexadas)
└── lib/
    ├── validators/credenciamento.ts (Schema Zod com Termo de Segurança Integrativa)
    └── credenciamento/engine.ts (Motor de Análise, Dossiê Litúrgico e Sanitização WhatsApp)
```

---

## 🛡️ Regras de Engenharia & Blindagem Executada
1. **Zero E-commerce / Purga Semântica:** Todos os termos comerciais ("loja", "preço", "comprar", "colírio") foram eliminados. Todas as chamadas direcionam para `/credenciamento` ou consulta cooperativa via WhatsApp com dirigentes.
2. **Motor de Triagem Anamnese & Washout ISRS:** Formulário valida obrigatoriamente a declaração de que nenhum participante em uso de antidepressivos ISRS/ISRN fará a consagração sem o washout prudencial de 5 semanas.
3. **Ciência Biogeoquímica nos Rapés:** Seção documental demonstrando o tamponamento alcalino (pH 9,75 a 10,2) para absorção em base livre e a calcinação purista (>250°C) que extingue DMT, atestando caráter estritamente não alucinógeno.
4. **Sananga Segura:** Alerta obrigatório de intervalo de 24 horas antes e após uso de lentes de contato, contraindicação pós-cirúrgica e cadeia de refrigeração obrigatória (4°C).
5. **Rodapé Obrigatório (+18):** Aviso institucional de ausência de promessas terapêuticas e cumprimento integral do Marco Sanitário ANVISA 2025.
6. **Homologação e Verificação Integral:** 100% das 31 páginas e rotas validadas com sucesso (HTTP 200), TypeScript rigoroso e compliance estrito.
7. **Governança de Cache Local & Webpack:** Eliminação de processos órfãos na porta 3000 (`taskkill /PID <PID> /F`) e purga do diretório `.next` para evitar descompasso de chunks HMR (`__webpack_modules__`). Sincronização limpa com o repositório GitHub (`origin/main`).

---

## Relações

### Depende de
- [[Nativaram-Brasil]]
- [[Blindagem-Juridica-e-Sanitaria]]
- [[Dicionario-Semantico-Nativaram]]

### Alimenta / impulsiona
- [[Ayahuasca-e-Purismo-Botanico]]
- [[Rapes-Sagrados-e-Alquimia-Mineral]]
- [[Artefatos-e-Instrumentos]]
- [[Projetos-de-Luz-e-Editais]]

### Relacionado a
- [[00-Mapa-Mental-Portal-Nativaram]]
- [[Guia-de-Skills-e-Comandos]]
