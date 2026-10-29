"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  Info,
  ChevronDown,
  ChevronUp,
  Scale,
  HeartPulse,
  Users,
} from "lucide-react";
import { TemploMock } from "@/data/portal-mock";

interface PortalCentralDocumentosProps {
  templo: TemploMock;
}

type TipoDocumento = "ANAMNESE" | "TERMO" | "MENORES" | "ATA" | "TRANSITO";

export const PortalCentralDocumentos: React.FC<PortalCentralDocumentosProps> = ({
  templo,
}) => {
  const [docAtivo, setDocAtivo] = useState<TipoDocumento>("ANAMNESE");
  const [copiado, setCopiado] = useState(false);
  const [mostrarJustificativa, setMostrarJustificativa] = useState(false);

  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleImprimir = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const copiarTextoDocumento = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  const baixarArquivoTexto = (conteudo: string, nomeArquivo: string) => {
    const blob = new Blob([conteudo], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${nomeArquivo}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Textos completos para cópia (Word/Google Docs) e download (.md)
  const getTextoCompleto = () => {
    if (docAtivo === "ANAMNESE") {
      return `# COOPERATIVA ETNOBOTÂNICA NATIVARAM
## SISTEMA DE SALVAGUARDA LITÚRGICA E REDUÇÃO DE DANOS
### DOCUMENTO 01: FICHA DE ANAMNESE, TRIAGEM CLÍNICO-ESPIRITUAL E PROTOCOLO DE MEDICAMENTOS CONTROLADOS
(Amparo: Resolução CONAD nº 01/2010 • Art. 5º, VI e VIII da CF/88 • LGPD Lei nº 13.709/2018 • Lei nº 13.787/2018)

TEMPLO / CONGREGAÇÃO: ${templo.nome} | CIDADE/UF: ${templo.cidade} | DIRIGENTE: ${templo.dirigente}

---
MÓDULO I: DADOS CADASTRAIS E IDENTIFICAÇÃO DO PARTICIPANTE
Nome Completo: __________________________________________________________________
Nome Social / De Batismo Espiritual: ___________________________________________
Data de Nascimento: ____/____/________ Idade: ______ anos Peso Aprox.: _____ kg Gênero: ________
Nacionalidade: _________________________ Naturalidade: _________________________
Documento de Identidade (RG/RNE): _____________________ Órgão Expedidor/UF: ________
CPF/MF: _____________________________ Profissão: ______________________________
Endereço Residencial: ___________________________________________________________
Bairro: _______________________ Cidade/UF: ___________________ CEP: ____________
Telefone / WhatsApp: (____) _________________ E-mail: ____________________________
Plano de Saúde / Convênio Médico: [ ] NÃO [ ] SIM (Qual / Nº Carteirinha): ___________________
Tipo Sanguíneo / Fator RH (se souber): ________ Alergias a Medicamentos: _____________________
Contato de Emergência (Obrigatório - familiar ou pessoa próxima disponível 24h):
Nome do Contato: ____________________________________________________________
Grau de Parentesco / Relação: __________________ Telefone/WhatsApp: (____) ___________

---
MÓDULO II: HISTÓRICO DE CONSAGRAÇÃO SACRAMENTAL E EXPERIÊNCIA ESPIRITUAL
1. Esta será sua primeira experiência com a Ayahuasca? [ ] SIM [ ] NÃO
2. Caso já tenha consagrado, quantas vezes aproximadamente? [ ] 1 a 5 [ ] 6 a 20 [ ] Mais de 20
3. Tradições que já consagrou: [ ] Xamânica/Indígena [ ] Santo Daime [ ] UDV [ ] Barquinha [ ] Universalista
4. Data aproximada da última consagração: ____/____/________
5. Já vivenciou crise aguda, pânico, desorientação, síncope ou 'peia' intensa prévia? [ ] NÃO [ ] SIM
(Se sim, descrever detalhes e acolhimento recebido): ________________________________________________
6. Consagrou Rapé Sagrado, Sananga ou Kambo anteriormente? [ ] NÃO [ ] SIM (Reações): ______________
7. Motivação e intenção íntima para participar deste ritual: _______________________________________

---
MÓDULO III: TRIAGEM CLÍNICA, CARDIOVASCULAR, NEUROLÓGICA E FISIOLÓGICA (Marque SIM ou NÃO)
[ ] SIM [ ] NÃO - Hipertensão Arterial Sistêmica (PAS >= 140 ou PAD >= 90 mmHg) ou Crise Hipertensiva prévia
[ ] SIM [ ] NÃO - Hipotensão Arterial Severa / Labilidade Pressórica / Síncopes (Desmaios frequentes)
[ ] SIM [ ] NÃO - Arritmia Cardíaca, Taquicardia, Síndrome do QT Longo, Sopro ou Palpitações
[ ] SIM [ ] NÃO - Doença Arterial Coronariana, Angina, Infarto do Miocárdio Prévio ou Miocardiopatia
[ ] SIM [ ] NÃO - Histórico Pessoal ou Familiar de Aneurisma (Cerebral ou Aórtico) [CONTRAINDICAÇÃO ABSOLUTA]
[ ] SIM [ ] NÃO - Acidente Vascular Cerebral (AVC / Derrame ou AIT Prévio) [CONTRAINDICAÇÃO ABSOLUTA]
[ ] SIM [ ] NÃO - Portador de Marca-passo, Desfibrilador Interno ou Prótese Valvular Cardíaca
[ ] SIM [ ] NÃO - Epilepsia, Convulsões ou Disritmia Cerebral [CONTRAINDICAÇÃO ABSOLUTA PERMANENTE]
[ ] SIM [ ] NÃO - Diabetes Mellitus (Tipo 1 ou Tipo 2 / Uso de Insulina, Glibenclamida ou Canetas GLP-1)
[ ] SIM [ ] NÃO - Úlcera Gástrica Ativa, Varizes Esofágicas, Hérnia de Hiato Severa ou Sangramento Digestivo
[ ] SIM [ ] NÃO - Hepatite Crônica, Cirrose, Esteatose Severa ou Insuficiência Hepática (Altera enzimas CYP450)
[ ] SIM [ ] NÃO - Insuficiência Renal Crônica ou Hemodiálise
[ ] SIM [ ] NÃO - Feocromocitoma ou Hipertireoidismo Descompensado (Tempestade Tireoidiana)
[ ] SIM [ ] NÃO - Asma Brônquica Severa ou DPOC (Uso de bombinha broncodilatadora de resgate)
[ ] SIM [ ] NÃO - Glaucoma de Ângulo Fechado ou Descolamento de Retina Recente
[ ] SIM [ ] NÃO - Cirurgia de Grande Porte ou Fratura Óssea nos últimos 6 meses: _______________________
[ ] SIM [ ] NÃO - Mulheres: Está grávida, com atraso menstrual ou suspeita de gravidez? (Semanas: ______)
[ ] SIM [ ] NÃO - Mulheres: Está em fase de amamentação exclusiva (lactante)?

---
MÓDULO IV: TRIAGEM PSIQUIÁTRICA E VULNERABILIDADE NEUROBIOLÓGICA
1. Diagnóstico clínico atual ou prévio:
- Esquizofrenia, Transtorno Esquizoafetivo, Paranoia ou Psicoses: [ ] SIM [ ] NÃO (Contraindicação Absoluta)
- Transtorno Afetivo Bipolar (Tipo I ou II / Fases de Mania ou Hipomania): [ ] SIM [ ] NÃO (Contraindicação Absoluta)
- Transtorno de Personalidade Borderline ou Dissociativo Severo: [ ] SIM [ ] NÃO
- Transtorno de Pânico com Agorafobia, TOC Severo ou TEPT Complexo: [ ] SIM [ ] NÃO
- Depressão Maior Recorrente ou Resistente: [ ] SIM [ ] NÃO
2. Histórico em familiares de 1º GRAU (pais, irmãos, filhos) com Esquizofrenia, Psicose ou Bipolaridade? [ ] NÃO [ ] SIM
3. Já passou por internação em hospital ou ala psiquiátrica? [ ] NÃO [ ] SIM (Ano/Motivo): _________________
4. Teve episódios de ideação suicida ativa ou tentativa de autoextermínio nos últimos 12 meses? [ ] NÃO [ ] SIM
5. Realiza acompanhamento psicológico ou psiquiátrico atualmente? [ ] NÃO [ ] SIM (Profissional/Tel): _________

---
MÓDULO V: TABELA OFICIAL DE MEDICAMENTOS CONTROLADOS, INTERAÇÕES E WASHOUT
(A Ayahuasca contém Beta-Carbolinas [Inibidores Reversíveis da MAO-A e inibidores de CYP2D6/CYP3A4/CYP1A2] e N,N-DMT [Agonista Serotoninérgico 5-HT2A]. A combinação com os fármacos abaixo pode causar Síndrome Serotoninérgica Letal, Crise Hipertensiva Maligna ou Status Epilepticus).

🔴 GRUPO A — VETO ABSOLUTO ("NÃO PODE PARTICIPAR" SOB NENHUMA HIPÓTESE):
1. Estabilizante de Humor (Sais de Lítio):
   [ ] NÃO [ ] SIM -> Carbonato de Lítio (Carbolitium, Carbolitium CR, Priadel, Litiocar, Carlit).
   *Alerta Letal: Risco de ~47% de convulsões generalizadas, Status Epilepticus refratário e encefalopatia anóxica.*
2. Antiparkinsonianos (Precursores Dopaminérgicos e IMAO-B):
   [ ] NÃO [ ] SIM -> Levodopa (Prolopa, Sinemet), Selegilina (Niar, Jumexil, Deprilan), Rasagilina (Azilect), Pramipexol (Sifrol), Biperideno (Akineton), Amantadina (Mantidan).
3. Antipsicóticos Típicos e Atípicos (Neurolépticos):
   [ ] NÃO [ ] SIM -> Flufenazina (Anatensol), Haloperidol (Haldol), Pimozida (Orap), Amissulprida (Socian), Clorpromazina (Amplictil), Clozapina (Leponex), Levomepromazina (Neozine), Olanzapina (Zyprexa, Zap), Quetiapina (Seroquel, Queropax), Risperidona (Zargus, Risperdal), Sulpirida (Dogmatil, Equilid), Trifluoperazina (Stelazine), Aripiprazol (Abilify, Aristab), Ziprasidona (Geodon), Paliperidona (Invega), Lurasidona (Latuda).
4. Anticonvulsivantes e Antiepilépticos:
   [ ] NÃO [ ] SIM -> Ácido Valpróico / Divalproato de Sódio (Depakene, Depakote, Valpakene, Torval), Carbamazepina (Tegretol), Oxcarbazepina (Trileptal), Fenitoína (Hidantal), Fenobarbital (Gardenal, Edhanol), Lamotrigina (Lamictal, Neural), Topiramato (Topamax), Levetiracetam (Keppra).
5. Antibióticos com Ação IMAO:
   [ ] NÃO [ ] SIM -> Linezolida (Zyvox), Azul de Metileno, Furazolidona.

🟠 GRUPO B — CASO CLÍNICO NÃO RECOMENDADO (INDUTORES DE SONO / DROGAS "Z"):
6. Hipnóticos Não-Benzodiazepínicos:
   [ ] NÃO [ ] SIM -> Zolpidem (Stilnox, Patz, Turno, Lioram), Zopiclona (Imovane), Eszopiclona (Prysma, Ezonia).
   *Risco de sonambulismo dissociativo, amnésia anterógrada e confusão delirante.*

🔵 GRUPO C — MEDICAÇÃO DEVE SER INTERROMPIDA DIAS ANTES (WASHOUT EXCLUSIVAMENTE COM AVAL MÉDICO):
(Jamais interrompa medicação psiquiátrica por conta própria! A participação exige que o desmame tenha sido previamente autorizado e concluído junto ao médico assistente respeitando a janela mínima abaixo):
7. Antidepressivos (ISRS, ISRSN, Tricíclicos, Tetracíclicos, Atípicos e IMAO):
   [ ] NÃO [ ] SIM ->
   • Fluoxetina (Prozac, Verotina, Daforin, Deprax, Lovan, Prozen, Sarafem, Selectus, Symbyax, Eufor, Fluxene) — Washout mínimo: 35 a 45 dias (5 a 6 semanas)!
   • Sertralina (Zoloft, Sercerin, Novativ, Tolrest, Serenata, Assert) — Washout: 14 a 21 dias.
   • Escitalopram (Cipralex, Lexapro, Exodus, Reconter) / Citalopram (Cipramil, Procimax) — Washout: 14 a 21 dias.
   • Paroxetina (Pondera, Aropax, Cebrilin) / Fluvoxamina (Dumyrox, Luvox) — Washout: 14 a 21 dias.
   • Venlafaxina (Efexor, Alenthus) / Desvenlafaxina (Pristiq) / Duloxetina (Cymbalta, Velija) — Washout: 14 a 21 dias.
   • Amitriptilina (Tryptanol, Amytril) / Clomipramina (Anafranil, Clo) / Imipramina (Tofranil) / Nortriptilina (Nortelor, Pamelor) / Maprotilina (Ludiomil) — Washout: 21 dias. (Atenção: inclui uso para enxaqueca ou fibromialgia!).
   • Bupropiona (Zyban, Bup, Wellbutrin) / Mirtazapina (Remeron) / Trazodona (Triticum, Donaren) / Reboxetina (Edronax, Prolift) / Tianeptina (Stablon) / Vortioxetina (Brintellix) — Washout: 14 a 28 dias.
   • Tranilcipromina e Trifluoperazina (Stelapar, Parnate) — Washout: 28 a 35 dias | Moclobemida (Aurorix) — 14 dias.
8. Estimulantes do SNC (TDAH / Derivados Anfetamínicos):
   [ ] NÃO [ ] SIM -> Metilfenidato (Concerta, Ritalina), Lisdexanfetamina (Venvanse, Juneve), Modafinila (Stavigile) — Washout: 7 a 14 dias.
9. Moderadores de Apetite, Emagrecedores Serotoninérgicos e Termogênicos:
   [ ] NÃO [ ] SIM -> Sibutramina (Meridia, Reductil, Sibutral, Plenty, Saciette, Biomag, Vazy, Sibus), Anfepramona (Dualid, Hipofagin, Inibex), Femproporex, Efedrina, Ioimbina — Washout: 14 a 21 dias.
10. Analgésicos Opioides, Triptanos (Enxaqueca), Antigripais (DXM) e Fitoterápicos Serotoninérgicos:
    [ ] NÃO [ ] SIM -> Tramadol (Tramal, Ultracet), Meperidina (Dolantina), Metadona (Mytedom), Codeína (Tylex, Paco) [Washout: 10-14d]; Sumatriptano (Sumax, Imigran), Naratriptano (Naramig), Zolmitriptano (Zomig), Rizatriptano (Maxalt), Ergotamina (Cefaliv, Ormigrein) [Washout: 5-7d]; Xaropes com Dextrometorfano (Vick 44E, Benalet TSC) e Antigripais com Pseudoefedrina/Fenilefrina/Clorfeniramina (Claritin-D, Allegra D, Decongex, Resfenol, Coristina D, Benegrip) [Washout: 5-7d]; Erva-de-São-João (Hipérico) [14d], 5-HTP, L-Triptofano, Mucuna pruriens e Kava-Kava [7d].

🟡 GRUPO D — NÃO TOMAR NO DIA DA CERIMÔNIA (PAUSA DE 24H A 48H):
11. Ansiolíticos Benzodiazepínicos e Azapironas:
    [ ] NÃO [ ] SIM -> Alprazolam (Frontal, Apraz, Altrox), Bromazepam (Lexotan, Somalium), Buspirona (Ansitec, Ansienon, Buspar, Buspanil), Clobazam (Frizium), Clonazepam (Rivotril, Clonotril, Navotrax), Clordiazepóxido (Psicosedim, Menotensil — *Atenção: Limbitrol contém Amitriptilina = Grupo C!*), Cloxazolam (Clozal, Elum, Olcadil), Diazepam (Valium, Ansilive, Compaz, Dienpax, Noan), Flunitrazepam (Rohypnol), Lorazepam (Lorax, Ansilor, Lorenin, Loserdal, Max-pax, Mesmerin, Ativan, Temesta, Tavor), Midazolam (Dormonid).
12. Canetas Emagrecedoras (Análogos de GLP-1), Antieméticos, Vasoativos e Gabapentinoides:
    [ ] NÃO [ ] SIM -> Semaglutida (Ozempic, Wegovy, Rybelsus), Tirzepatida (Mounjaro), Liraglutida (Saxenda, Victoza) — *Atenção: causam retardo do esvaziamento gástrico; não aplicar no dia nem nas 48h anteriores e manter dieta leve*; Ondansetrona (Vonau), Metoclopramida (Plasil), Sildenafila (Viagra), Tadalafila (Cialis), Propranolol (Inderal), Pregabalina (Lyrica), Gabapentina (Neurontin).

📌 EXCEÇÃO CLÍNICA — PROTOCOLO DE DESINTOXICAÇÃO / DEPENDÊNCIA QUÍMICA:
*Em tratamentos de desintoxicação (dependência química/alcoolismo), normalmente é utilizada associação de vários ansiolíticos, antipsicóticos e até anticonvulsivantes. Nestes casos, a avaliação deve ser individualizada, obrigatoriamente com aval médico formal e acompanhamento transdisciplinar.*

Detalhamento de qualquer medicamento ou suplemento utilizado nos últimos 45 dias:
Nome Comercial / Princípio Ativo: _______________________ Dose: _______ Última tomada: ____/____/202___
Nome Comercial / Princípio Ativo: _______________________ Dose: _______ Última tomada: ____/____/202___

13. Dieta Pré-Ritual (Tiramina) e Uso de Substâncias (últimos 14 dias):
- Álcool (abstinência mínima de 72h): Último consumo em ____/____/________
- Cannabis / Maconha: Último consumo em ____/____/________
- Estimulantes Ilícitos (Cocaína, MDMA/Bala, Anfetaminas — abstinência mínima 21 dias): ____/____/________
- Respeitou a restrição de alimentos ricos em tiramina, embutidos, fermentados e energéticos nas últimas 24h? [ ] SIM [ ] NÃO

---
MÓDULO VI: DECLARAÇÃO DE VERACIDADE, LGPD E AUTORIZAÇÃO DE DADOS
Atesto sob as penas da lei a veracidade integral das informações prestadas. Reconheço que a omissão de antidepressivos, Sais de Lítio, antiparkinsonianos, antipsicóticos, anticonvulsivantes, anorexígenos (Sibutramina), opioides (Tramadol), cardiopatias ou transtornos psicóticos/bipolares configura CULPA EXCLUSIVA DA VÍTIMA (Arts. 186, 422 e 927 do Código Civil), isentando integralmente o templo e seus dirigentes de responsabilidade civil ou penal em caso de intercorrência clínica. Autorizo o tratamento dos meus dados sensíveis de saúde e religião para salvaguarda litúrgica e socorro médico de emergência, ciente do prazo de custódia obrigatória de 20 anos aplicável aos registros de saúde (Lei nº 13.787/2018 e CFM 1.821/2007).

Local e Data: ________________________, _____ de ____________________ de 202___
Assinatura do Participante: _________________________________________________

---
MÓDULO VII: PARECER DA COMISSÃO LITÚRGICA (USO EXCLUSIVO DO TEMPLO)
Sinais Vitais na Recepção: PA: ______x______ mmHg | FC: _____ bpm | SpO2: _____ % | Glicemia: _____ mg/dL
RESULTADO DA TRIAGEM:
[ ] APTO(A) — Liberado para porção sacramental padrão.
[ ] APTO(A) COM RESTRIÇÃO — Porção reduzida de acolhimento (máximo _____ ml da Graduação 3:1 ou 5:1).
[ ] INAPTO(A) TEMPORARIAMENTE — Motivo: Washout medicamentoso incompleto / Uso no dia / Abstinência alcoólica.
[ ] INAPTO(A) DEFINITIVAMENTE — Motivo: Contraindicação absoluta (Grupo A: Lítio, Antipsicóticos, Anticonvulsivantes, Antiparkinsonianos, Psicose, Bipolaridade ou Aneurisma).
Nome e Assinatura do Dirigente Avaliador: _____________________________________`;
    }

    if (docAtivo === "TERMO") {
      return `# COOPERATIVA ETNOBOTÂNICA NATIVARAM
## SISTEMA DE SALVAGUARDA LITÚRGICA E REDUÇÃO DE DANOS
### DOCUMENTO 02: TERMO DE RESPONSABILIDADE, CIÊNCIA DE SACRAMENTO E CONSENTIMENTO LIVRE E ESCLARECIDO (TCLE)

INSTITUIÇÃO LITÚRGICA: ${templo.nome} | CNPJ/PROTOCOLO: ${templo.cnpj} | DIRIGENTE: ${templo.dirigente}
COMUNGANTE: __________________________________________________________________ | CPF: ____________________

CLÁUSULA 1ª: DA NATUREZA LITÚRGICA E AMPARO CONSTITUCIONAL
Comparecimento livre e espontâneo a cerimônia de natureza estritamente religiosa, respaldada no Art. 5º, VI e VIII e Arts. 215 e 216 da CF/88, e Art. 2º, parágrafo único da Lei Federal nº 11.343/2006. O sacramento é a Ayahuasca, decocção ritualística de Banisteriopsis caapi (Jagube/Mariri) e Psychotria viridis (Chacrona/Rainha).

CLÁUSULA 2ª: DA DEONTOLOGIA DO CONAD E VEDAÇÃO DE COMERCIALIZAÇÃO
A instituição atua sob a Resolução CONAD nº 01/2010. A Ayahuasca NÃO É MERCADORIA, não possui preço e não é vendida. Qualquer contribuição possui natureza jurídica exclusiva de rateio solidário de custos operacionais (manutenção do templo, limpeza, logística e feitio tradicional cooperativo sob a Lei 5.764/1971), não configurando relação de consumo.

CLÁUSULA 3ª: DA AUSÊNCIA DE PROMESSA DE CURA MÉDICA E PROIBIÇÃO DE DESMAME POR CONTA PRÓPRIA
A instituição NÃO É CLÍNICA MÉDICA e não promete cura de enfermidades orgânicas ou psiquiátricas (Arts. 283 e 284 do CP). O participante declara ciência de que JAMAIS deve interromper abruptamente tratamentos médicos ou psiquiátricos sem supervisão e alta formal do seu médico assistente.

CLÁUSULA 4ª: DA CIÊNCIA DA TABELA DE INTERAÇÕES MEDICAMENTOSAS GRAVES
O comungante declara ter lido a Tabela Oficial de Medicamentos Controlados da Ficha de Anamnese (Doc. 01) e atesta NÃO estar sob efeito de: (a) Sais de Lítio (Carbolitium/Priadel); (b) Antiparkinsonianos (Prolopa/Niar); (c) Antipsicóticos (Haldol, Risperdal, Seroquel, Zyprexa, Amplictil, Leponex, Neozine); (d) Anticonvulsivantes (Depakene, Depakote, Tegretol, Hidantal, Gardenal, Lamictal); (e) Antidepressivos ISRS, ISRSN, Tricíclicos ou IMAO dentro da janela de washout (Prozac, Zoloft, Lexapro, Efexor, Cymbalta, Tryptanol, Anafranil, Donaren, Bup, Parnate); (f) Estimulantes ou Emagrecedores (Ritalina, Venvanse, Sibutramina); e (g) Opioides (Tramadol), Triptanos para enxaqueca (Sumax/Naramig) ou Xaropes com Dextrometorfano.

CLÁUSULA 5ª: DOS EFEITOS PSICOFÍSICOS E PROCESSO DE PURGAÇÃO
Ciente das manifestações normais: mirações interiores, variações pressóricas e térmicas transitórias, sudorese, náuseas, vômitos e evacuação (purgação física compreendida como limpeza fisiológica e ritual, não configurando intoxicação).

CLÁUSULA 6ª: DAS OBRIGAÇÕES DE CONDUTA, DISCIPLINA E VEDAÇÃO DE DIREÇÃO VEICULAR
- Permanência obrigatória no perímetro do templo até o encerramento formal pelo Dirigente (proibição de deserção).
- Saída aos banheiros sempre acompanhada por fiscais e postura sentada/inclinada durante a purga.
- Respeito ao silêncio e proibição de fotos, filmagens ou gravações de áudio (Art. 20 do Código Civil).
- VEDAÇÃO TERMINANTE À CONDUÇÃO DE VEÍCULOS AUTOMOTORES ou operação de máquinas logo após o término.

CLÁUSULA 7ª: DA ALOCAÇÃO DE RESPONSABILIDADE CIVIL POR CULPA EXCLUSIVA DA VÍTIMA E AUTORIZAÇÃO DE SOCORRO
Reitera veracidade da ficha de anamnese. A omissão intencional de medicamentos incompatíveis, cardiopatias ou transtornos psicóticos/bipolares configura CULPA EXCLUSIVA DA VÍTIMA (Arts. 422, 186 e 927 do CC), rompendo o nexo causal e isentando o templo de responsabilidade. Em caso de urgência médica, autoriza o acionamento imediato do SAMU 192 e remoção hospitalar.

CLÁUSULA 8ª: DA GOVERNANÇA DE DADOS (LGPD) E VOLUNTARIEDADE
Autoriza o tratamento de dados sensíveis para segurança e socorro médico, sob custódia legal de 20 anos (Lei 13.787/2018). O participante pode desistir livremente a qualquer momento ANTES da ingestão da bebida.

CLÁUSULA 9ª: DECLARAÇÃO FINAL E ASSINATURAS
Local e Data: ________________________, _____ de ____________________ de 202___
Assinatura do Comungante: ____________________________________________________
Assinatura do Dirigente Responsável: _________________________________________
Testemunha 01 (Fiscal de Salão): _______________________ CPF: _________________
Testemunha 02 (Fiscal de Salão): _______________________ CPF: _________________`;
    }

    if (docAtivo === "MENORES") {
      return `# COOPERATIVA ETNOBOTÂNICA NATIVARAM
## SISTEMA DE SALVAGUARDA LITÚRGICA E REDUÇÃO DE DANOS
### DOCUMENTO 05: TERMO DE AUTORIZAÇÃO, CONSENTIMENTO LIVRE E RESPONSABILIDADE DOS PAIS PARA MENOR DE IDADE
(Amparo: Resolução CONAD nº 01/2010 Item 4.1 • Art. 227 e Art. 5º, VI/VIII da CF/88 • Lei nº 8.069/90 ECA • Art. 1.634 CC)

TEMPLO: ${templo.nome} | CIDADE/UF: ${templo.cidade} | DIRIGENTE: ${templo.dirigente}

---
PREÂMBULO REGULATÓRIO (CONAD nº 01/2010 - Item 4.1):
"A participação de crianças e adolescentes nos rituais religiosos decorre do exercício do poder familiar, cabendo aos pais ou responsáveis legais a decisão sobre a administração da Ayahuasca a seus filhos, observando-se o princípio da moderação e zelando pelo bem-estar físico e psíquico do menor."

---
MÓDULO I: QUALIFICAÇÃO DO MENOR DE IDADE
Nome Completo do Menor: __________________________________________________________________
Data de Nascimento: ____/____/________ Idade: ______ anos Peso Aprox.: _____ kg Sexo: [ ] F [ ] M
Certidão de Nascimento ou RG: ________________________ Órgão/UF: _______ CPF: __________________
Endereço Residencial: __________________________________________________________________
Bairro: _______________________ Cidade/UF: ___________________ CEP: ____________

---
MÓDULO II: QUALIFICAÇÃO DOS PAIS / RESPONSÁVEIS LEGAIS (PODER FAMILIAR CONJUNTO)
Genitor (Pai / 1º Responsável): __________________________________________________________
Profissão: _____________________ RG: _________________ Órgão/UF: _____ CPF: __________________
Telefone/WhatsApp: (____) _________________ E-mail: _____________________________________
Grau: [ ] Pai Biológico [ ] Pai Adotivo [ ] Guardião Judicial | Tempo de Comunhão: _______ anos

Genitora (Mãe / 2ª Responsável): _________________________________________________________
Profissão: _____________________ RG: _________________ Órgão/UF: _____ CPF: __________________
Telefone/WhatsApp: (____) _________________ E-mail: _____________________________________
Grau: [ ] Mãe Biológica [ ] Mãe Adotiva [ ] Guardiã Judicial | Tempo de Comunhão: _______ anos
(Nota: Caso um dos genitores seja falecido ou destituído, anexar certidão ou termo de guarda unilateral).

---
MÓDULO III: TRIAGEM DE SAÚDE PEDIÁTRICA / ADOLESCENTE E BLOQUEIO FARMACOLÓGICO
1. O menor faz uso de qualquer medicamento contínuo ou eventual? [ ] NÃO [ ] SIM: ___________________
2. Checklist de Medicamentos Estritamente Vetados para Menores de Idade:
   [ ] NÃO [ ] SIM - Psicoestimulantes para TDAH (Ritalina, Concerta, Venvanse, Juneve, Atomoxetina/Atentah)
   [ ] NÃO [ ] SIM - Antipsicóticos / Neurolépticos (Risperidona/Risperdal, Aripiprazol/Abilify, Quetiapina, Neozine, Haldol)
   [ ] NÃO [ ] SIM - Anticonvulsivantes / Estabilizadores (Depakene/Valproato, Tegretol/Carbamazepina, Gardenal, Lamictal, Keppra, Carbolitium)
   [ ] NÃO [ ] SIM - Antidepressivos Pediátricos (Fluoxetina/Prozac, Sertralina/Zoloft, Escitalopram, Imipramina/Tofranil)
   [ ] NÃO [ ] SIM - Xaropes para Tosse (Dextrometorfano / Vick 44E), Antigripais (Decongex, Polaramine) ou Broncodilatadores em crise aguda
   *(VETO ABSOLUTO: Menores em uso de qualquer um dos medicamentos acima NÃO PODEM ingerir o sacramento).*
3. Histórico Neurológico: Convulsões febris ou epilépticas, desmaios ou síncopes? [ ] NÃO [ ] SIM: _________
4. Cardiopatias Congênitas, Sopro Cardíaco, Diabetes Tipo 1 ou Asma Grave? [ ] NÃO [ ] SIM: ______________
5. Experiência Anterior com Ayahuasca: [ ] Primeira vez [ ] Já comungou ____ vezes

---
MÓDULO IV: CLÁUSULAS DE COMPROMISSO DO PODER FAMILIAR
CLÁUSULA 1ª: Finalidade estritamente religiosa e espiritual familiar, isenta de fins recreativos.
CLÁUSULA 2ª: Princípio da Não Coerção (Art. 16 ECA) — se o menor recusar a comunhão no momento do cálice, sua vontade será integralmente respeitada sem nenhuma pressão.
CLÁUSULA 3ª: Porção Simbólica — medida mínima simbólica (gotas ou fração reduzida da graduação suave 3:1) adaptada ao peso e idade, sendo terminantemente proibido o repasse (2ª porção).
CLÁUSULA 4ª: Presença Física Ininterrupta de pelo menos um dos genitores no salão durante toda a cerimônia.
CLÁUSULA 5ª: Cuidado Somático e Afetivo — dever direto dos pais de acompanhar o menor aos sanitários e acolhê-lo.
CLÁUSULA 6ª: Isenção Institucional por omissões médicas ou farmacológicas declaradas pelos pais.
CLÁUSULA 7ª: Governança LGPD de dados sensíveis de menores (Art. 14 da Lei 13.709/2018) com custódia de 20 anos.

---
MÓDULO V: ASSINATURAS DO PODER FAMILIAR E DO TEMPLO
Local e Data: ________________________, _____ de ____________________ de 202___

Assinatura do Pai / 1º Responsável: _____________________________________________________
Assinatura da Mãe / 2ª Responsável: ____________________________________________________
Assinatura do Menor (se alfabetizado/adolescente): _____________________________________

PARECER DO DIRIGENTE DO TEMPLO:
[ ] AUTORIZADO (Porção simbólica) [ ] RESTRITO A PARTICIPAÇÃO SEM COMUNHÃO [ ] INDEFERIDO
Assinatura do Dirigente: _______________________________________________________________`;
    }

    if (docAtivo === "ATA") {
      return `# COOPERATIVA ETNOBOTÂNICA NATIVARAM
## SISTEMA DE SALVAGUARDA LITÚRGICA E REDUÇÃO DE DANOS
### DOCUMENTO 03: MANUAL DE PROCEDIMENTO OPERACIONAL PADRÃO (POP) E ATA DE SESSÃO RITUALÍSTICA

TEMPLO: ${templo.nome} | DATA DA SESSÃO: ____/____/202___ | HORÁRIO: Início: ____h____ Término: ____h____
LOTE DO SACRAMENTO: __________________ | GRADUAÇÃO: [ ] 3:1 [ ] 5:1 [ ] 7:1 [ ] 10:1 Wirapuru

FASE 1: VERIFICAÇÕES PRÉ-RITUAIS E TRIAGEM FARMACOLÓGICA (T - 2h a T - 30min)
[ ] Acessibilidade, rotas de fuga desobstruídas e ventilação contínua no salão (prevenção de hipertermia e CO2).
[ ] Espaço Seguro de Redução de Danos ("Zendo Tent") montado com colchonetes, água, mel e cobertores.
[ ] Kit de Primeiros Socorros: Esfigmomanômetro calibrado, Oxímetro de pulso, Termômetro clínico, Glicosímetro portátil (HGT), sachês de mel/glicose (Regra dos 15) e sais de reidratação oral.
[ ] Conferência individual da Ficha de Anamnese (Doc. 01), Termo TCLE (Doc. 02) e Tabela de 4 Cores de Medicamentos Controlados:
    - Confirmado que nenhum participante usa Grupo A (Lítio, Antipsicóticos, Anticonvulsivantes, Antiparkinsonianos, Linezolida).
    - Confirmado washout completo do Grupo C (Antidepressivos ISRS/ISRSN/Tricíclicos, Ritalina/Venvanse, Sibutramina, Tramadol, Triptanos, Antigripais DXM).
    - Confirmada pausa de 24h-48h do Grupo D (Benzodiazepínicos e Canetas GLP-1 Ozempic/Mounjaro).
[ ] Alinhamento de Fiscais: Fiscais em serviço comungam apenas porção mínima de vigília motora.

FASE 2: INÍCIO E CALIBRAÇÃO DE PORÇÕES (T 0 a T + 30min)
[ ] Aviso Solene das regras de salão (permanência no perímetro, silêncio, celulares desligados, acompanhamento aos banheiros).
[ ] Calibração Conservadora: 50% da porção padrão para iniciantes (priorizar 3:1 Mainumbi ou 5:1 Pituã).
[ ] Registro nominal no mapa de comunhão.

FASE 3: MANEJO DA FORÇA, PURGA E ACOLHIMENTO DE CRISES (T + 30min a T + 4h)
[ ] Prevenção de Broncoaspiração (Especial atenção a usuários de Ozempic/Mounjaro): na purga, manter tronco inclinado ou Posição Lateral de Segurança (PLS). NUNCA permitir deitar de barriga para cima!
[ ] Controle de Hipoglicemia (Regra dos 15): em caso de tremores frios, sudorese fria ou tontura pós-purga, aferir HGT e administrar 15g de mel/carboidrato rápido.
[ ] 4 Princípios do Zendo Project: (1) Espaço seguro; (2) Acompanhar sem guiar; (3) Conversar através da respiração (4s inspirar / 6s expirar); (4) O difícil não é mau.
[ ] Proibição estrita de administrar ansiolíticos, antieméticos (Plasil/Vonau) ou calmantes alopáticos durante o ritual.

FASE 4: EMERGÊNCIA MÉDICA, CRITÉRIOS DE HUNTER E RED FLAGS
- Alerta 1 (Critérios de Hunter — Síndrome Serotoninérgica): Febre > 38,5°C + clônus espontâneo/induzível/ocular + hiperreflexia/rigidez muscular + agitação/diaforese.
- Alerta 2 (Status Epilepticus): Crise Convulsiva generalizada > 5 minutos ou crises repetidas sem retorno de consciência.
- Alerta 3 (Crise Hipertensiva / Neurovascular): PA >= 180/120 mmHg com cefaleia em trovoada, dor torácica ou assimetria facial.
- Alerta 4: Glasgow <= 8 ou Cianose Perilabial (SpO2 < 90%).
CONDUTA IMEDIATA: Acionar SAMU 192 (Unidade de Suporte Avançado - USA), informar ingestão de Ayahuasca (RIMA + DMT) e ficha de anamnese em mãos, manter vias aéreas livres em Posição Lateral de Segurança (PLS) e resfriamento físico externo se houver hipertermia.

FASE 5: INTEGRAÇÃO E ATA FORMAL DE SESSÃO
Total de Comungantes Presentes: _______ (Homens: _____ Mulheres: _____ Menores autorizados: _____)
Número de Comungantes de Primeira Vez: _______
Volume Total de Sacramento Consagrado: ________ Litros
Registro de Intercorrências Clínicas ou Disciplinares: ___________________________________________
Horário de Encerramento e Liberação Segura: ____h____min
Assinaturas:
Dirigente Espiritual: ________________________________________________________
Fiscal de Apoio 01: __________________________________________________________
Fiscal de Apoio 02: __________________________________________________________`;
    }

    return `# COOPERATIVA ETNOBOTÂNICA NATIVARAM
### DOCUMENTO 04: DECLARAÇÃO DE TRANSPORTE LITÚRGICO E CUSTÓDIA DE SACRAMENTO SAGRADO
(Amparo: Resolução CONAD nº 01/2010 • Art. 5º, VI e VIII da CF/88 • Art. 2º, § único da Lei 11.343/2006 • Lei Federal nº 5.764/1971)

Declaro para os devidos fins de direito, fé pública e salvaguarda perante autoridades civis, policiais (Polícia Federal, Polícia Rodoviária Federal, Polícias Civis e Militares), aeroportuárias (ANAC) e órgãos de vigilância sanitária, que os recipientes hermeticamente lacrados e rotulados que acompanham este documento contêm exclusivamente o sacramento sagrado tradicional denominado AYAHUASCA (Santo Daime / Vegetal / Hoasca), preparado exclusivamente pela decocção aquosa de Banisteriopsis caapi (Mariri/Jagube) e Psychotria viridis (Chacrona/Rainha).

1. DADOS DA ENTIDADE RELIGIOSA DESTINATÁRIA:
- Congregação / Templo: ${templo.nome}
- Registro / Protocolo de Homologação: ${templo.cnpj}
- Município / UF de Destino: ${templo.cidade}
- Dirigente Responsável pela Custódia: ${templo.dirigente}

2. ORIGEM ETNOBOTÂNICA E RASTREABILIDADE DO LOTE:
- Origem do Feitio Tradicional: Cruzeiro do Sul/AC (Vale do Juruá) — Cooperativa Nativaram.
- Identificação do Lote: ______________________ | Graduação: ______________________
- Quantidade de Recipientes: _______ unidades | Volume Total Transportado: _______ Litros
- Modal de Transporte: [ ] Aéreo (Bagagem Despachada Lacrada) [ ] Terrestre / Rodoviário
- Período / Data do Deslocamento: ____/____/202___ a ____/____/202___

3. AMPARO CONSTITUCIONAL E ISENÇÃO DE COMERCIALIZAÇÃO:
Fica formalmente atestado que o sacramento acima descrito NÃO CONSTITUI MERCADORIA, não possui valor comercial, não se destina à venda e é protegido pela garantia constitucional de liberdade de culto e liturgia (Art. 5º, VI da Constituição Federal de 1988), pela Resolução CONAD nº 01/2010 e pela exceção legal expressa do Art. 2º, parágrafo único da Lei nº 11.343/2006.

Local e Data: ${templo.cidade}, ${dataAtual}
Assinatura do Dirigente / Portador Credenciado: _________________________________________`;
  };

  return (
    <div className="space-y-6">
      {/* BANNER MANDATÓRIO: MODELO ABERTO A EDIÇÃO POSTERIOR */}
      <div className="print-hidden p-4 rounded-xl border border-ambar-500/40 bg-floresta-950/90 text-areia-200 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-ambar-500/20 text-ambar-400 shrink-0 mt-0.5">
            <Scale className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-ambar-300 uppercase tracking-wider">
                Modelos Canônicos Referenciais &amp; Soberania Litúrgica da Casa
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Abertos à Adaptação
              </span>
            </div>
            <p className="text-xs text-areia-300 leading-relaxed">
              Estes documentos foram formulados pelo Conselho da{" "}
              <strong>Cooperativa Nativaram</strong> como{" "}
              <em>
                modelos canônicos de máxima salvaguarda técnica, clínica, farmacológica e jurídica
              </em>{" "}
              (CONAD 01/2010, CF/88, LGPD e Tabela Oficial de Medicamentos Controlados). Cada templo e congregação parceira possui plena soberania e autonomia doutrinária para editar, adaptar e incluir suas próprias regras estatutárias. Você pode imprimir pronto em A4, copiar o texto integral para o Word/Docs ou baixar o arquivo editável.
            </p>
          </div>
        </div>
      </div>

      {/* BARRA DE AÇÕES E SELEÇÃO DE DOCUMENTO */}
      <div className="print-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 rounded-2xl bg-floresta-950/80 border border-ambar-500/20">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-ambar-400" />
            <span className="font-serif text-base font-bold text-areia-100">
              Central de Documentos &amp; Modelos Oficiais
            </span>
          </div>
          <p className="text-xs text-areia-300 font-light max-w-2xl leading-relaxed mt-0.5">
            Selecione o documento desejado para visualização fiel, impressão em papel/PDF A4 ou download de modelo aberto:
          </p>
        </div>

        {/* Botões de Ação Rápida */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center gap-2 sm:gap-2.5 w-full lg:w-auto">
          <button
            onClick={() => setMostrarJustificativa(!mostrarJustificativa)}
            className="btn-secondary text-xs inline-flex items-center justify-center gap-1.5 px-3 py-2 text-ambar-300 border-ambar-500/30 hover:bg-ambar-500/10 w-full lg:w-auto"
            title="Ver por que cada item existe nos documentos"
          >
            <Info className="h-3.5 w-3.5 text-ambar-400 shrink-0" />
            <span>
              {mostrarJustificativa
                ? "Ocultar Justificativas"
                : "Por Que Cada Item Existe?"}
            </span>
            {mostrarJustificativa ? (
              <ChevronUp className="h-3 w-3 shrink-0" />
            ) : (
              <ChevronDown className="h-3 w-3 shrink-0" />
            )}
          </button>

          <button
            onClick={() => copiarTextoDocumento(getTextoCompleto())}
            className="btn-secondary text-xs inline-flex items-center justify-center gap-1.5 px-3 py-2 text-areia-200 hover:bg-floresta-800 w-full lg:w-auto"
            title="Copiar texto formatado para colar no Word ou Google Docs"
          >
            {copiado ? (
              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-ambar-400 shrink-0" />
            )}
            <span>{copiado ? "Copiado!" : "Copiar Texto (Word/Docs)"}</span>
          </button>

          <button
            onClick={() =>
              baixarArquivoTexto(
                getTextoCompleto(),
                `nativaram-${docAtivo.toLowerCase()}`
              )
            }
            className="btn-secondary text-xs inline-flex items-center justify-center gap-1.5 px-3 py-2 text-areia-200 hover:bg-floresta-800 w-full lg:w-auto"
            title="Baixar arquivo de texto editável (.md / .txt)"
          >
            <Download className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Baixar Editável (.md)</span>
          </button>

          <button
            onClick={handleImprimir}
            className="btn-primary text-xs inline-flex items-center justify-center gap-1.5 px-4 py-2 shadow-md active:scale-95 transition-all w-full lg:w-auto"
            title="Imprimir documento em papel ou salvar em PDF"
          >
            <Printer className="h-3.5 w-3.5 shrink-0" />
            <span>Imprimir A4 / PDF</span>
          </button>
        </div>
      </div>

      {/* SEÇÃO EDUCATIVA: POR QUE CADA ITEM EXISTE? (EXPANSÍVEL) */}
      {mostrarJustificativa && (
        <div className="print-hidden p-5 rounded-2xl bg-floresta-900/90 border border-ambar-500/30 text-areia-200 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-sm">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            Fundamentação Clínica, Farmacológica e Jurídica dos Itens Documentais
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-areia-300">
            <div className="p-3 rounded-lg bg-floresta-950 border border-floresta-800 space-y-1">
              <strong className="text-rose-400 block font-semibold">
                1. Veto Absoluto (Grupo A — Vermelho)
              </strong>
              <p>
                Carbonato de Lítio (<em>Carbolitium, Priadel</em>), Antiparkinsonianos (<em>Prolopa, Niar</em>), Antipsicóticos (<em>Haldol, Risperdal, Seroquel, Zyprexa, Amplictil, Leponex</em>) e Anticonvulsivantes (<em>Depakene, Tegretol, Hidantal, Gardenal, Lamictal</em>) possuem incompatibilidade absoluta por risco de <em>Status Epilepticus</em>, arritmias fatais ou descompensação psicótica grave.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-floresta-950 border border-floresta-800 space-y-1">
              <strong className="text-sky-400 block font-semibold">
                2. Janela de Washout e CYP450 (Grupo C — Azul)
              </strong>
              <p>
                Antidepressivos ISRS/ISRSN/Tricíclicos/IMAO, Estimulantes (<em>Ritalina, Venvanse</em>), Emagrecedores (<em>Sibutramina</em>), Opioides (<em>Tramadol</em>), Triptanos (<em>Sumax</em>) e Antigripais (<em>DXM</em>) bloqueiam a recaptação de serotonina/catecolaminas. Exigem desmame médico prévio de 5 a 6 semanas (Fluoxetina) ou 2 a 3 semanas (demais).
              </p>
            </div>
            <div className="p-3 rounded-lg bg-floresta-950 border border-floresta-800 space-y-1">
              <strong className="text-amber-400 block font-semibold">
                3. Pausa no Dia &amp; Canetas GLP-1 (Grupo D — Laranja)
              </strong>
              <p>
                Ansiolíticos benzodiazepínicos (<em>Frontal, Rivotril, Valium, Lexotan, Lorax</em>) não devem ser tomados no dia (exceto <em>Limbitrol</em>, que contém Amitriptilina e exige washout!). Já as canetas de GLP-1 (<em>Ozempic, Wegovy, Mounjaro, Saxenda</em>) retardam o esvaziamento gástrico, exigindo pausa de 48h e prevenção de broncoaspiração na purga.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-floresta-950 border border-floresta-800 space-y-1">
              <strong className="text-amber-400 block font-semibold">
                4. Triagem Cardiovascular, Hepática e Renal
              </strong>
              <p>
                A Ayahuasca eleva transitoriamente a PA e a FC, contraindicando portadores de aneurisma cerebral/aórtico ou infarto recente. Já a insuficiência hepática compromete as enzimas CYP2D6, CYP1A2 e CYP3A4, responsáveis por metabolizar a Harmina e a Harmalina.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-floresta-950 border border-floresta-800 space-y-1">
              <strong className="text-emerald-400 block font-semibold">
                5. Salvaguarda LGPD &amp; Custódia de 20 Anos
              </strong>
              <p>
                Dados de saúde e religião são dados sensíveis (Art. 11 da LGPD). O prazo de guarda de 20 anos baseia-se na Lei Federal nº 13.787/2018 e protege juridicamente a instituição religiosa pela cláusula de Culpa Exclusiva da Vítima em caso de omissão dolosa.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-floresta-950 border border-floresta-800 space-y-1">
              <strong className="text-purple-400 block font-semibold">
                6. Salvaguarda de Menores &amp; Exceção de Desintoxicação
              </strong>
              <p>
                O Termo de Menores (Item 4.1 CONAD) exige poder familiar conjunto, não-coerção e bloqueio de medicamentos pediátricos (TDAH, anticonvulsivantes). E em protocolos clínicos de desintoxicação, a avaliação deve ser individualizada com aval médico formal.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SELEÇÃO DAS 5 ABAS DE DOCUMENTOS */}
      <div className="print-hidden flex overflow-x-auto gap-2 pb-1 border-b border-ambar-500/20">
        {[
          {
            id: "ANAMNESE" as const,
            nome: "Doc 01: Ficha de Anamnese Completa",
            sub: "Triagem Clínica, Psiquiátrica & Tabela de Medicamentos",
            icon: <HeartPulse className="h-4 w-4 text-rose-400" />,
          },
          {
            id: "TERMO" as const,
            nome: "Doc 02: Termo de Responsabilidade & TCLE",
            sub: "Amparo CONAD 01/2010 e Art. 5º CF/88 (9 Cláusulas)",
            icon: <Scale className="h-4 w-4 text-ambar-400" />,
          },
          {
            id: "MENORES" as const,
            nome: "Doc 05: Termo para Menor de Idade",
            sub: "Poder Familiar Conjunto & CONAD 01/2010 (Item 4.1)",
            icon: <Users className="h-4 w-4 text-purple-400" />,
          },
          {
            id: "ATA" as const,
            nome: "Doc 03: POP & Ata de Condução Litúrgica",
            sub: "Zendo Project, Critérios de Hunter e Ata de Sessão",
            icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
          },
          {
            id: "TRANSITO" as const,
            nome: "Doc 04: Declaração de Trânsito Litúrgico",
            sub: "Salvaguarda para Viagens Aéreas e Terrestres",
            icon: <Building2 className="h-4 w-4 text-blue-400" />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setDocAtivo(tab.id)}
            className={`px-4 py-3 rounded-xl text-left transition-all shrink-0 border ${
              docAtivo === tab.id
                ? "bg-ambar-500/15 border-ambar-500 text-areia-100 shadow-md ring-1 ring-ambar-400/30"
                : "bg-floresta-900/40 border-ambar-500/10 text-areia-300 hover:bg-floresta-800/50 hover:text-areia-100"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold text-areia-100">
              {tab.icon}
              <span>{tab.nome}</span>
            </div>
            <p className="text-[10px] text-areia-400 font-light mt-0.5">
              {tab.sub}
            </p>
          </button>
        ))}
      </div>

      {/* ÁREA DE IMPRESSÃO / FOLHA A4 NATIVA */}
      <div className="documento-a4-impressao bg-white text-slate-900 p-4 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-slate-200 font-sans text-xs sm:text-sm leading-relaxed max-w-4xl mx-auto overflow-x-hidden">
        {/* CABEÇALHO INSTITUCIONAL CANÔNICO */}
        <div className="border-b-2 border-slate-800 pb-4 mb-5 text-center space-y-1">
          <p className="text-[10px] tracking-widest uppercase font-bold text-slate-600">
            COOPERATIVA ETNOBOTÂNICA NATIVARAM • SISTEMA DE SALVAGUARDA LITÚRGICA E FARMACOLÓGICA
          </p>
          <h1 className="font-serif text-lg sm:text-xl font-bold uppercase text-slate-900 tracking-tight">
            {docAtivo === "ANAMNESE" &&
              "FICHA DE ANAMNESE, TRIAGEM CLÍNICA E PROTOCOLO DE MEDICAMENTOS CONTROLADOS"}
            {docAtivo === "TERMO" &&
              "TERMO DE RESPONSABILIDADE, CIÊNCIA DE SACRAMENTO E CONSENTIMENTO (TCLE)"}
            {docAtivo === "MENORES" &&
              "TERMO DE AUTORIZAÇÃO E RESPONSABILIDADE DO PODER FAMILIAR PARA MENOR DE IDADE"}
            {docAtivo === "ATA" &&
              "MANUAL DE PROCEDIMENTO OPERACIONAL PADRÃO (POP) E ATA DE SESSÃO LITÚRGICA"}
            {docAtivo === "TRANSITO" &&
              "DECLARAÇÃO DE TRANSPORTE LITÚRGICO E CUSTÓDIA DE SACRAMENTO SAGRADO"}
          </h1>
          <p className="text-[11px] text-slate-600">
            {docAtivo === "ANAMNESE" &&
              "Resolução CONAD nº 01/2010 • Art. 5º, VI e VIII da CF/88 • LGPD Lei nº 13.709/2018 • Lei nº 13.787/2018"}
            {docAtivo === "TERMO" &&
              "Amparo no Art. 5º, VI da CF/88, Resolução CONAD nº 01/2010 e Art. 2º, § único da Lei 11.343/2006"}
            {docAtivo === "MENORES" &&
              "Resolução CONAD nº 01/2010 (Item 4.1) • Art. 227 da CF/88 • Estatuto da Criança e do Adolescente (Lei 8.069/90)"}
            {docAtivo === "ATA" &&
              "Gestão de Riscos, Critérios de Hunter, Zendo Project, Red Flags Clínicos e Registro de Governança"}
            {docAtivo === "TRANSITO" &&
              "Transporte Interestadual sem Fins Lucrativos para Culto Religioso • CONAD 01/2010 e Lei 5.764/1971"}
          </p>
          <div className="pt-2 text-[10px] text-slate-500 flex flex-wrap justify-between gap-2 border-t border-slate-200 mt-2">
            <span>
              <strong>Templo / Núcleo:</strong> {templo.nome}
            </span>
            <span>
              <strong>Registro:</strong> {templo.cnpj}
            </span>
            <span>
              <strong>Dirigente:</strong> {templo.dirigente}
            </span>
            <span>
              <strong>Emissão:</strong> {dataAtual}
            </span>
          </div>
        </div>

        {/* =====================================================================
            1. DOCUMENTO 01: FICHA DE ANAMNESE COMPLETA + TABELA DE MEDICAMENTOS
           ===================================================================== */}
        {docAtivo === "ANAMNESE" && (
          <div className="space-y-5">
            <div className="bg-slate-100 p-3 rounded-lg border-l-4 border-slate-800 text-[11px] text-slate-700 leading-snug">
              <strong>Deontologia e Salvaguarda da Vida:</strong> Documento individual, confidencial e obrigatório para todo comungante antes da primeira consagração ou atualização semestral. A Ayahuasca contém <strong>Beta-Carbolinas (Harmina, Harmalina e THH)</strong> — que atuam como Inibidores Reversíveis da MAO-A e moduladores das enzimas hepáticas CYP2D6, CYP3A4 e CYP1A2 — combinadas ao <strong>N,N-DMT</strong>. Preencha cada item com absoluta fidelidade.
            </div>

            {/* Módulo I */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Módulo I: Dados Cadastrais, Biotipologia e Contato de Emergência
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Nome Completo:</strong> ___________________________________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Nome Social / Espiritual:</strong> ____________________________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Data Nasc:</strong> ____/____/________ | <strong>Idade:</strong> ____ anos | <strong>Peso:</strong> ____ kg
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Gênero:</strong> ____________ | <strong>Profissão:</strong> _________________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>RG/RNE:</strong> ____________________ | <strong>Órgão/UF:</strong> _________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>CPF:</strong> ________________________ | <strong>Tipo Sanguíneo:</strong> ______
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1 sm:col-span-2">
                  <strong>Endereço Residencial:</strong> ________________________________________________________________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Cidade/UF:</strong> ______________________ | <strong>CEP:</strong> ___________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>WhatsApp:</strong> (____) _________________ | <strong>Convênio Médico:</strong> ____________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1 sm:col-span-2 bg-slate-50 p-1.5 rounded">
                  <strong>Contato de Emergência (Obrigatório 24h):</strong> ___________________________________ | <strong>Parentesco:</strong> ____________ | <strong>Tel:</strong> (____) ____________
                </div>
              </div>
            </div>

            {/* Módulo II */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Módulo II: Histórico de Consagração Sacramental e Outras Práticas
              </h3>
              <div className="space-y-1.5 text-xs">
                <p>
                  1. Esta será sua primeira experiência com a Ayahuasca? ( ) SIM, primeira vez. ( ) NÃO, já comunguei anteriormente (____ vezes).
                </p>
                <p>
                  2. Tradições que já frequentou: [ ] Santo Daime [ ] União do Vegetal (UDV) [ ] Linha Indígena/Xamânica [ ] Barquinha [ ] Universalista
                </p>
                <p>
                  3. Já vivenciou crise aguda, pânico, desorientação, desmaio ou &lsquo;peia&rsquo; difícil anteriormente? ( ) NÃO ( ) SIM:{" "}
                  <span className="border-b border-dotted border-slate-400">
                    ________________________________________
                  </span>
                </p>
                <p>
                  4. Já consagrou Rapé Sagrado, Sananga ou Kambo? ( ) NÃO ( ) SIM • Alguma sensibilidade respiratória/ocular?{" "}
                  <span className="border-b border-dotted border-slate-400">
                    __________________________
                  </span>
                </p>
                <p className="border-b border-dotted border-slate-400 pb-1">
                  5. Motivação e intenção íntima para este ritual: ________________________________________________________________
                </p>
              </div>
            </div>

            {/* Módulo III */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Módulo III: Triagem Clínica, Cardiovascular, Neurológica, Hepática e Renal
              </h3>
              <table className="w-full text-left border-collapse text-[11px] mb-2">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300">
                    <th className="p-1.5">Condição Fisiológica / Histórico Clínico</th>
                    <th className="p-1.5 text-center w-10">Sim</th>
                    <th className="p-1.5 text-center w-10">Não</th>
                    <th className="p-1.5">Detalhes / Controle / Observações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-rose-50/70 font-semibold text-rose-900">
                    <td className="p-1">
                      Histórico Pessoal ou Familiar de Aneurisma (Cerebral ou Aórtico) ou AVC Hemorrágico [VETO ABSOLUTO]
                    </td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1">Risco de ruptura vascular por pico pressórico transitório.</td>
                  </tr>
                  <tr className="bg-rose-50/70 font-semibold text-rose-900">
                    <td className="p-1">
                      Epilepsia, Histórico de Convulsões ou Disritmia Cerebral [VETO ABSOLUTO]
                    </td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1">Redução do limiar convulsivo cortical durante o rito.</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-medium">
                      Hipertensão Arterial Sistêmica (PAS &gt;= 140 ou PAD &gt;= 90), Arritmia, Taquicardia ou Infarto Prévio
                    </td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Última PA aferida e medicação contínua:</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-medium">
                      Hipotensão Severa, Síncope Vasovagal (Desmaios), Marca-passo ou Cardiopatia Valvular
                    </td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Frequência de episódios:</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-medium">
                      Diabetes Mellitus (Uso de Insulina, Glibenclamida, Metformina ou Canetas GLP-1 Ozempic/Mounjaro)
                    </td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Risco de hipoglicemia em jejum ou gastroparesia:</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-medium">
                      Insuficiência Hepática (Cirrose/Hepatite), Insuficiência Renal ou Úlcera Gástrica/Varizes Esofágicas
                    </td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Compromete metabolização CYP450 ou segurança na purga:</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-medium">
                      Asma Grave (Uso de bombinha), Hipertireoidismo, Glaucoma ou Cirurgia nos últimos 6 meses
                    </td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Especificar condição:</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-medium">
                      Mulheres: Gestante (ou suspeita de gravidez) ou em Amamentação Exclusiva
                    </td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Semanas de gestação / idade do bebê:</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Módulo IV */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Módulo IV: Triagem Psiquiátrica e Saúde Mental
              </h3>
              <div className="space-y-1.5 text-xs">
                <p>
                  1. Diagnóstico clínico atual ou prévio:
                  <br />• <strong>Esquizofrenia, Transtorno Esquizoafetivo, Delírio ou Psicoses:</strong> [ ] SIM [ ] NÃO{" "}
                  <strong className="text-rose-800">(NÃO PODE PARTICIPAR — Veto Absoluto)</strong>
                  <br />• <strong>Transtorno Afetivo Bipolar (Tipo I ou II / Fases de Mania ou Euforia):</strong> [ ] SIM [ ] NÃO{" "}
                  <strong className="text-rose-800">(NÃO PODE PARTICIPAR — Veto Absoluto)</strong>
                  <br />• <strong>Transtorno Borderline, Dissociativo, Pânico Severo, TOC ou TEPT:</strong> [ ] SIM [ ] NÃO
                </p>
                <p>
                  2. <strong>Parentes de 1º Grau (pais, irmãos, filhos)</strong> com histórico de Esquizofrenia, Bipolaridade ou Surto Psicótico? ( ) NÃO ( ) SIM
                </p>
                <p>
                  3. Já passou por internação psiquiátrica ou teve ideação suicida/autoagressão nos últimos 12 meses? ( ) NÃO ( ) SIM: ___________________________
                </p>
              </div>
            </div>

            {/* Módulo V — TABELA ROBUSTA DE MEDICAMENTOS CONTROLADOS (4 CORES DO PDF + INTERAÇÕES CLÍNICAS) */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b-2 border-slate-800 pb-1">
                Módulo V: Tabela Oficial de Medicamentos Controlados, Interações e Janelas de Washout
              </h3>
              <p className="text-[11px] text-slate-700 leading-snug">
                Assinale <strong>[SIM]</strong> ou <strong>[NÃO]</strong> para cada grupo abaixo e circule o nome químico ou comercial caso utilize ou tenha utilizado nos últimos 45 dias. <strong>Atenção:</strong> Jamais interrompa medicamentos prescritos sem autorização do seu médico assistente.
              </p>

              {/* GRUPO A — VERMELHO: NÃO PODE PARTICIPAR */}
              <div className="rounded-lg border-2 border-rose-600 bg-rose-50/70 p-3 space-y-2 text-[11px]">
                <div className="flex items-center justify-between border-b border-rose-300 pb-1 font-bold text-rose-950 uppercase">
                  <span>🔴 GRUPO A — VETO ABSOLUTO: NÃO PODE PARTICIPAR DA CERIMÔNIA</span>
                  <span>Faz uso? [ ] SIM [ ] NÃO</span>
                </div>
                <div className="space-y-1.5 text-slate-900">
                  <p>
                    <strong>1. Estabilizante de Humor (Sais de Lítio — RISCO LETAL DE STATUS EPILEPTICUS):</strong>{" "}
                    Carbonato de Lítio (<em>Carbolitium, Carbolitium CR, Priadel, Litiocar, Carlit</em>). Mecanismo: depleção de inositol e hipersensibilização 5-HT2A (~47% de incidência de convulsões generalizadas e encefalopatia).
                  </p>
                  <p>
                    <strong>2. Antiparkinsonianos (Dopaminérgicos e IMAO-B):</strong>{" "}
                    Levodopa (<em>Prolopa, Sinemet, Parkidopa</em>), Selegilina (<em>Niar, Jumexil, Deprilan</em>), Rasagilina (<em>Azilect</em>), Pramipexol (<em>Sifrol</em>), Biperideno (<em>Akineton</em>), Amantadina (<em>Mantidan</em>).
                  </p>
                  <p>
                    <strong>3. Antipsicóticos / Neurolépticos (Típicos e Atípicos):</strong>{" "}
                    Flufenazina (<em>Anatensol</em>), Haloperidol (<em>Haldol</em>), Pimozida (<em>Orap</em>), Amissulprida (<em>Socian</em>), Clorpromazina (<em>Amplictil</em>), Clozapina (<em>Leponex</em>), Levomepromazina (<em>Neozine</em>), Olanzapina (<em>Zyprexa, Zap</em>), Quetiapina (<em>Seroquel, Queropax</em>), Risperidona (<em>Zargus, Risperdal</em>), Sulpirida (<em>Dogmatil, Equilid</em>), Trifluoperazina (<em>Stelazine</em>), Aripiprazol (<em>Abilify, Aristab</em>), Ziprasidona (<em>Geodon</em>), Paliperidona (<em>Invega</em>), Lurasidona (<em>Latuda</em>).
                  </p>
                  <p>
                    <strong>4. Anticonvulsivantes e Antiepilépticos:</strong>{" "}
                    Ácido Valpróico / Valproato / Divalproato de Sódio (<em>Depakene, Depakote, Valpakene, Torval</em>), Carbamazepina (<em>Tegretol</em>), Oxcarbazepina (<em>Trileptal</em>), Fenitoína (<em>Hidantal</em>), Fenobarbital (<em>Gardenal, Edhanol</em>), Lamotrigina (<em>Lamictal, Neural</em>), Topiramato (<em>Topamax</em>), Levetiracetam (<em>Keppra</em>).
                  </p>
                  <p>
                    <strong>5. Antibióticos Hospitalares com Ação IMAO:</strong>{" "}
                    Linezolida (<em>Zyvox</em>), Azul de Metileno, Furazolidona.
                  </p>
                </div>
              </div>

              {/* GRUPO B — LARANJA ESCURO: CASO CLÍNICO NÃO RECOMENDADO */}
              <div className="rounded-lg border-2 border-orange-500 bg-orange-50/70 p-2.5 space-y-1 text-[11px]">
                <div className="flex items-center justify-between border-b border-orange-300 pb-1 font-bold text-orange-950 uppercase">
                  <span>🟠 GRUPO B — CASO CLÍNICO NÃO RECOMENDADO (INDUTORES DE SONO &ldquo;Z&rdquo;)</span>
                  <span>Faz uso? [ ] SIM [ ] NÃO</span>
                </div>
                <p className="text-slate-900">
                  <strong>6. Hipnóticos Não-Benzodiazepínicos:</strong>{" "}
                  Zolpidem (<em>Stilnox, Stilnox CR, Patz, Turno, Lioram</em>), Zopiclona (<em>Imovane, Neuropax</em>), Eszopiclona (<em>Prysma, Ezonia</em>). Risco de sonambulismo dissociativo, parassonias agitadas, amnésia anterógrada e confusão delirante. Jamais utilizar nas 48h anteriores ou logo após o rito.
                </p>
              </div>

              {/* GRUPO C — AZUL: INTERROMPER DIAS ANTES (WASHOUT COM AVAL MÉDICO) */}
              <div className="rounded-lg border-2 border-sky-600 bg-sky-50/70 p-3 space-y-2 text-[11px]">
                <div className="flex items-center justify-between border-b border-sky-300 pb-1 font-bold text-sky-950 uppercase">
                  <span>🔵 GRUPO C — INTERROMPER DIAS ANTES (EXIGE WASHOUT CONCLUÍDO SOB AVAL MÉDICO)</span>
                  <span>Usou nos últimos 45 dias? [ ] SIM [ ] NÃO</span>
                </div>
                <div className="space-y-1.5 text-slate-900">
                  <p>
                    <strong>7. Antidepressivos ISRS (Risco de Síndrome Serotoninérgica Letal):</strong>
                    <br />• <strong>Fluoxetina (WASHOUT MÍNIMO DE 35 A 45 DIAS / 5 A 6 SEMANAS):</strong>{" "}
                    <em>Prozac, Verotina, Daforin, Deprax, Lovan, Prozen, Sarafem, Selectus, Symbyax (Fluoxetina+Olanzapina), Eufor, Fluxene</em>.
                    <br />• <strong>Demais ISRS (Washout de 14 a 21 dias):</strong>{" "}
                    Sertralina (<em>Zoloft, Sercerin, Novativ, Tolrest, Serenata, Assert</em>), Escitalopram (<em>Cipralex, Lexapro, Exodus, Reconter</em>), Citalopram (<em>Cipramil, Procimax, Città</em>), Paroxetina (<em>Pondera, Aropax, Cebrilin</em>), Fluvoxamina (<em>Dumyrox, Luvox</em>), Vortioxetina (<em>Brintellix</em> — 21 a 28 dias).
                  </p>
                  <p>
                    <strong>8. Antidepressivos Duais (ISRSN), Tricíclicos, Tetracíclicos, Atípicos e IMAO (Washout de 14 a 35 dias):</strong>
                    <br />• <strong>Duais ISRSN (14-21d):</strong> Venlafaxina (<em>Efexor, Alenthus</em>), Desvenlafaxina (<em>Pristiq</em>), Duloxetina (<em>Cymbalta, Velija</em>).
                    <br />• <strong>Tricíclicos e Tetracíclicos (21d — inclui uso para enxaqueca/fibromialgia!):</strong> Amitriptilina (<em>Tryptanol, Amytril</em>), Clomipramina (<em>Anafranil, Clo</em>), Imipramina (<em>Tofranil</em>), Nortriptilina (<em>Nortelor, Pamelor</em>), Maprotilina (<em>Ludiomil</em>).
                    <br />• <strong>Atípicos e Outros (14-21d):</strong> Bupropiona (<em>Zyban, Bup, Wellbutrin</em>), Mirtazapina (<em>Remeron</em>), Trazodona (<em>Triticum, Donaren</em>), Reboxetina (<em>Edronax, Prolift</em>), Tianeptina (<em>Stablon</em>), Agomelatina (<em>Valdoxan</em>).
                    <br />• <strong>IMAO e RIMA Sintéticos:</strong> Tranilcipromina e Trifluoperazina (<em>Stelapar, Parnate</em> — 28 a 35 dias), Moclobemida (<em>Aurorix</em> — 14 dias).
                  </p>
                  <p>
                    <strong>9. Estimulantes do SNC (Derivados Anfetamínicos — Washout de 7 a 14 dias):</strong>{" "}
                    Metilfenidato (<em>Concerta, Ritalina, Ritalina LA</em>), Lisdexanfetamina (<em>Venvanse, Juneve, Lyberdia</em>), Modafinila (<em>Stavigile</em>).
                  </p>
                  <p>
                    <strong>10. Moderadores de Apetite e Anorexígenos (Washout de 14 a 21 dias — Alto Risco Serotoninérgico/Hipertensivo):</strong>{" "}
                    Sibutramina (<em>Meridia, Reductil, Sibutral, Plenty, Saciette, Biomag, Vazy, Sibus</em>), Anfepramona (<em>Dualid, Hipofagin, Inibex</em>), Femproporex, Mazindol, Efedrina, Ioimbina.
                  </p>
                  <p>
                    <strong>11. Opioides Serotoninérgicos, Triptanos (Enxaqueca), Antigripais (DXM) e Fitoterápicos (Washout de 5 a 14 dias):</strong>{" "}
                    Tramadol (<em>Tramal, Ultracet</em>), Meperidina (<em>Dolantina</em>), Metadona (<em>Mytedom</em>), Codeína (<em>Tylex, Paco</em>) [10-14d]; Sumatriptano (<em>Sumax, Imigran</em>), Naratriptano (<em>Naramig</em>), Zolmitriptano (<em>Zomig</em>), Rizatriptano (<em>Maxalt</em>), Ergotamina (<em>Cefaliv, Ormigrein</em>) [5-7d]; Xaropes com Dextrometorfano (<em>Vick 44E, Benalet TSC</em>) e Antigripais com Pseudoefedrina/Fenilefrina/Clorfeniramina (<em>Claritin-D, Allegra D, Decongex, Resfenol, Coristina D, Benegrip, Polaramine</em>) [5-7d]; Erva-de-São-João (<em>Hipérico</em>) [14d], 5-HTP, L-Triptofano, <em>Mucuna pruriens</em> e Kava-Kava [7d].
                  </p>
                </div>
              </div>

              {/* GRUPO D — AMARELO/LARANJA: NÃO TOMAR NO DIA */}
              <div className="rounded-lg border-2 border-amber-500 bg-amber-50/70 p-3 space-y-2 text-[11px]">
                <div className="flex items-center justify-between border-b border-amber-300 pb-1 font-bold text-amber-950 uppercase">
                  <span>🟡 GRUPO D — NÃO TOMAR NO DIA DA SESSÃO (PAUSA DE 24H A 48H)</span>
                  <span>Faz uso? [ ] SIM [ ] NÃO</span>
                </div>
                <div className="space-y-1.5 text-slate-900">
                  <p>
                    <strong>12. Ansiolíticos Benzodiazepínicos e Azapironas:</strong>{" "}
                    Alprazolam (<em>Frontal, Apraz, Altrox</em>), Bromazepam (<em>Lexotan, Somalium</em>), Buspirona (<em>Ansitec, Ansienon, Buspar, Buspanil</em> — ideal pausar 48-72h), Clobazam (<em>Frizium, Urbanil</em>), Clonazepam (<em>Rivotril, Clonotril, Navotrax</em> — se uso para epilepsia, cai no Grupo A!), Clordiazepóxido (<em>Psicosedim, Menotensil</em> — <strong>ATENÇÃO:</strong> a marca <em>Limbitrol</em> contém Amitriptilina e cai no Grupo C com washout de 21 dias!), Cloxazolam (<em>Clozal, Elum, Olcadil</em>), Diazepam (<em>Valium, Ansilive, Compaz, Dienpax, Noan</em>), Flunitrazepam (<em>Rohypnol</em>), Lorazepam (<em>Lorax, Ansilor, Lorenin, Loserdal, Max-pax, Mesmerin, Ativan, Temesta, Tavor</em>), Midazolam (<em>Dormonid</em>).
                  </p>
                  <p>
                    <strong>13. Canetas Emagrecedoras (Análogos de GLP-1), Antieméticos, Vasoativos e Gabapentinoides:</strong>{" "}
                    Semaglutida (<em>Ozempic, Wegovy, Rybelsus</em>), Tirzepatida (<em>Mounjaro</em>), Liraglutida (<em>Saxenda, Victoza</em>) — retardam o esvaziamento gástrico (não aplicar no dia nem nas 48h anteriores; manter dieta leve para evitar vômitos incoercíveis, hipoglicemia e broncoaspiração); Ondansetrona (<em>Vonau</em>), Metoclopramida (<em>Plasil</em>), Sildenafila (<em>Viagra</em>), Tadalafila (<em>Cialis</em>), Propranolol (<em>Inderal</em>), Pregabalina (<em>Lyrica</em>), Gabapentina (<em>Neurontin</em>).
                  </p>
                </div>
              </div>

              {/* NOTA DE EXCEÇÃO DO PDF: DESINTOXICAÇÃO */}
              <div className="p-2.5 rounded bg-slate-100 border border-slate-400 text-[10.5px] text-slate-800">
                <strong>📌 NOTA CLÍNICA — TRATAMENTO DE DESINTOXICAÇÃO / DEPENDÊNCIA QUÍMICA:</strong>{" "}
                Normalmente é utilizada associação de vários ansiolíticos, antipsicóticos e até anticonvulsivantes. Nestes protocolos específicos de reabilitação, a comissão deve analisar o caso individualmente, se possível com aval médico formal e acompanhamento transdisciplinar.
              </div>

              {/* Campos de preenchimento de medicamentos e substâncias */}
              <div className="space-y-1.5 text-xs pt-1">
                <p className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Relação de medicamentos/suplementos usados nos últimos 45 dias:</strong>{" "}
                  ____________________________________________________________________
                </p>
                <p className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Dosagem diária:</strong> ______________________ | <strong>Data da última dose ingerida:</strong> ____/____/202___ | <strong>Médico autorizou pausa?</strong> [ ] SIM [ ] NÃO [ ] N/A
                </p>
                <p>
                  <strong>Dieta Pré-Ritual (Tiramina) e Uso de Substâncias (últimos 14 dias):</strong>
                  <br />• Álcool (abstinência mínima de 3 dias): último consumo em ____/____/________ | Cannabis: ____/____/________
                  <br />• Cocaína, Crack, MDMA / Ecstasy / Anfetaminas (abstinência mínima de 21 dias): último consumo em ____/____/________
                  <br />• Respeitou a dieta leve (sem queijos maturados, embutidos curados, fermentados em excesso ou energéticos) nas últimas 24h? [ ] SIM [ ] NÃO
                </p>
              </div>
            </div>

            {/* Módulo VI */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Módulo VI: Declaração de Veracidade, LGPD e Assinatura
              </h3>
              <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
                Declaro sob as penas da lei e de minha consciência moral que li integralmente cada item desta Ficha de Anamnese e da Tabela de Medicamentos Controlados, respondendo com absoluta verdade. Reconheço que a omissão intencional de antidepressivos, Sais de Lítio, antiparkinsonianos, antipsicóticos, anticonvulsivantes, estimulantes, emagrecedores (Sibutramina/GLP-1), opioides (Tramadol), cardiopatias ou transtornos psiquiátricos configura <strong>culpa exclusiva da vítima</strong> (Arts. 186, 422 e 927 do Código Civil), isentando a instituição e seus dirigentes de responsabilidade civil ou criminal em caso de intercorrência clínica. Autorizo o tratamento dos meus dados sensíveis de saúde e convicção religiosa para fins exclusivos de triagem e socorro médico de emergência, ciente do prazo de guarda de 20 anos aplicável a registros de saúde (Lei Federal nº 13.787/2018 e LGPD).
              </p>
              <div className="pt-5 flex flex-col sm:flex-row justify-between items-end gap-4 text-xs">
                <div>
                  Local e Data: ______________________________, _____ de ____________________ de 202___
                </div>
                <div className="text-center w-64 border-t border-slate-800 pt-1">
                  <strong>Assinatura do Participante</strong>
                </div>
              </div>
            </div>

            {/* Módulo VII */}
            <div className="border-t-2 border-slate-800 pt-4 bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 pb-1 mb-2">
                Módulo VII: Parecer da Comissão Litúrgica (Uso Exclusivo do Templo)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
                <div className="bg-white p-2 rounded border border-slate-300">
                  <strong>PA Inicial:</strong> _____ x _____ mmHg
                </div>
                <div className="bg-white p-2 rounded border border-slate-300">
                  <strong>FC:</strong> _____ bpm
                </div>
                <div className="bg-white p-2 rounded border border-slate-300">
                  <strong>SpO2:</strong> _____ %
                </div>
                <div className="bg-white p-2 rounded border border-slate-300">
                  <strong>Glicemia:</strong> _____ mg/dL
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <p>
                  <strong>DECISÃO DE APTIDÃO LITÚRGICA:</strong>
                </p>
                <p>
                  [ ] <strong>APTO(A)</strong> — Liberado para consagração da porção padrão.
                </p>
                <p>
                  [ ] <strong>APTO(A) COM RESTRIÇÃO</strong> — Porção reduzida de acolhimento (máximo _____ ml da Graduação 3:1 ou 5:1).
                </p>
                <p>
                  [ ] <strong>INAPTO(A) TEMPORARIAMENTE</strong> — Washout medicamentoso incompleto (Grupo C) ou uso no dia (Grupo D). Liberado após: ____/____/202___
                </p>
                <p>
                  [ ] <strong>INAPTO(A) DEFINITIVAMENTE</strong> — Contraindicação absoluta (Grupo A: Lítio, Antipsicóticos, Anticonvulsivantes, Antiparkinsonianos, Psicose, Bipolaridade ou Aneurisma).
                </p>
              </div>
              <div className="pt-4 flex justify-between items-end text-xs">
                <div>Avaliador: ________________________________________</div>
                <div className="text-center w-56 border-t border-slate-800 pt-1">
                  <strong>Assinatura do Dirigente Responsável</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            2. DOCUMENTO 02: TERMO DE CONSENTIMENTO (TCLE) COMPLETO
           ===================================================================== */}
        {docAtivo === "TERMO" && (
          <div className="space-y-4 text-xs text-slate-800 leading-relaxed text-justify">
            <div className="bg-slate-100 p-3 rounded-lg border-l-4 border-slate-700 text-[11px] text-slate-700">
              <strong>Finalidade Deontológica:</strong> Instrumento jurídico de manifestação livre de vontade fundamentado no Art. 5º, VI e VIII da Constituição Federal e na Resolução CONAD nº 01/2010. Formaliza a ciência de efeitos, a revisão da Tabela de Medicamentos Controlados, a vedação de comércio e a alocação de responsabilidade por fato da vítima.
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">
                CLÁUSULA PRIMEIRA: DA NATUREZA LITÚRGICA E FUNDAMENTAÇÃO LEGAL
              </h4>
              <p>
                O(A) COMUNGANTE declara que comparece livre e espontaneamente a esta cerimônia de cunho estritamente religioso, espiritual e filosófico, amparada no Artigo 5º, incisos VI e VIII da Constituição Federal de 1988 e Artigos 215 e 216 da Carta Magna. Declara-se ciente de que a substância que irá consagrar é a bebida sagrada tradicionalmente denominada{" "}
                <strong>Ayahuasca</strong> (Santo Daime / Vegetal / Hoasca), preparada exclusivamente a partir da decocção combinada do cipó{" "}
                <em>Banisteriopsis caapi</em> (Jagube/Mariri) e das folhas de{" "}
                <em>Psychotria viridis</em> (Chacrona/Rainha), expressamente ressalvada pelo parágrafo único do Artigo 2º da Lei Federal nº 11.343/2006.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">
                CLÁUSULA SEGUNDA: DA DEONTOLOGIA DO CONAD E VEDAÇÃO DE COMERCIALIZAÇÃO
              </h4>
              <p>
                Em observância rigorosa à <strong>Resolução CONAD nº 01/2010</strong>, fica expressamente declarado que a Ayahuasca{" "}
                <strong>NÃO É MERCADORIA</strong>, não tem preço de venda e não é objeto de comércio, corretagem ou turismo comercial. Toda e qualquer contribuição entregue à congregação possui natureza jurídica exclusiva de{" "}
                <strong>taxa de rateio solidário de custos operacionais</strong> (manutenção do espaço, lenha, higiene, alimentação e custeio logístico do feitio tradicional amazônico sob a Lei Federal nº 5.764/1971), não configurando relação de consumo.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">
                CLÁUSULA TERCEIRA: DA AUSÊNCIA DE PROMESSA DE CURA MÉDICA E VEDAÇÃO DE SUSPENSÃO POR CONTA PRÓPRIA
              </h4>
              <p>
                A instituição <strong>NÃO É HOSPITAL, CLÍNICA OU ESTABELECIMENTO MÉDICO</strong> e não promete curas de enfermidades orgânicas ou psiquiátricas (Arts. 283 e 284 do Código Penal). O comungante compromete-se formalmente a jamais interromper abruptamente nem alterar nenhum tratamento médico ou psiquiátrico sem expressa autorização e supervisão do seu médico assistente.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">
                CLÁUSULA QUARTA: DA CIÊNCIA EXPRESSA DAS INTERAÇÕES MEDICAMENTOSAS PROIBIDAS
              </h4>
              <p>
                O participante declara ter lido a Tabela Oficial de Medicamentos Controlados constante na Ficha de Anamnese (Doc. 01) e atesta sob sua responsabilidade que <strong>NÃO faz uso</strong> de medicamentos de veto absoluto (Carbonato de Lítio [<em>Carbolitium, Priadel</em>], Antiparkinsonianos [<em>Prolopa, Niar</em>], Antipsicóticos [<em>Haldol, Risperdal, Seroquel, Zyprexa, Amplictil, Leponex, Neozine, Socian, Orap, Dogmatil, Stelazine</em>], Anticonvulsivantes [<em>Depakene, Depakote, Tegretol, Hidantal, Gardenal, Lamictal</em>] ou Antibiótico <em>Linezolida</em>), nem se encontra dentro do período de risco (sem washout médico concluído) de Antidepressivos ISRS/ISRSN/Tricíclicos/IMAO (<em>Fluoxetina/Prozac, Sertralina, Escitalopram, Venlafaxina, Duloxetina, Amitriptilina, Clomipramina, Bupropiona, Trazodona, Parnate, Stelapar</em>), Estimulantes (<em>Ritalina, Concerta, Venvanse</em>), Emagrecedores (<em>Sibutramina</em>), Opioides (<em>Tramadol</em>), Triptanos para enxaqueca (<em>Sumax, Naramig</em>) ou Antigripais com Dextrometorfano/Pseudoefedrina.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">
                CLÁUSULA QUINTA: DOS EFEITOS PSICOFÍSICOS E PROCESSO DE PURGAÇÃO
              </h4>
              <p>
                O participante foi instruído sobre as manifestações psicofísicas comuns resultantes do sacramento: mirações visuais interiores, elevação transitória da frequência cardíaca e pressão arterial, sudorese, calafrios, náuseas, emese (vômito) e eventual evacuação intestinal. Tais respostas são compreendidas pela tradição como limpeza fisiológica e purgação natural, não configurando envenenamento.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">
                CLÁUSULA SEXTA: DAS OBRIGAÇÕES DE CONDUTA, DISCIPLINA E SEGURANÇA VIÁRIA
              </h4>
              <p>
                O(A) COMUNGANTE obriga-se a: (a) <strong>Permanecer no perímetro do templo</strong> durante todo o trabalho até a autorização de encerramento pelo Dirigente (proibição terminante de deserção); (b) Deslocar-se aos banheiros somente com acompanhamento de fiscais; (c) Respeitar o silêncio litúrgico; (d) Abster-se de fotografar, filmar ou gravar áudio do ritual (Art. 20 do Código Civil); e (e){" "}
                <strong>NÃO DIRIGIR VEÍCULOS AUTOMOTORES</strong> logo após o ritual até a completa restauração de reflexos motores e sobriedade.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">
                CLÁUSULA SÉTIMA: DA ANAMNESE, CULPA EXCLUSIVA DA VÍTIMA E AUTORIZAÇÃO DE SOCORRO MÉDICO
              </h4>
              <p>
                O comungante ratifica a veracidade de sua Ficha de Anamnese. A omissão de uso de medicamentos controlados incompatíveis, cardiopatias graves ou transtornos psicóticos/bipolares configura{" "}
                <strong>CULPA EXCLUSIVA DA VÍTIMA (FATO DA VÍTIMA)</strong>, excluindo o nexo causal e isentando o templo e dirigentes de qualquer responsabilidade civil (Arts. 186 e 927 do CC) ou criminal por quebra do dever de boa-fé objetiva (Art. 422 do CC). Em caso de intercorrência médica, autoriza o acionamento imediato do SAMU 192 e transferência hospitalar.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">
                CLÁUSULA OITAVA: DA GOVERNANÇA DE DADOS (LGPD) E VOLUNTARIEDADE
              </h4>
              <p>
                Autoriza expressamente o tratamento dos seus dados pessoais sensíveis para segurança e atendimento médico de emergência, com guarda documental mínima de 20 anos (Lei nº 13.787/2018). Reconhece que pode revogar este consentimento a qualquer momento <strong>antes de comungar a bebida</strong>.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-300 space-y-6">
              <div className="flex justify-between items-end text-xs">
                <div>
                  Local e Data: ______________________________, _____ de ____________________ de 202___
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="text-center border-t border-slate-800 pt-1">
                  <strong>Assinatura do Comungante</strong>
                  <p className="text-[11px] text-slate-600">
                    CPF: ________________________________
                  </p>
                </div>
                <div className="text-center border-t border-slate-800 pt-1">
                  <strong>Assinatura do Dirigente Espiritual</strong>
                  <p className="text-[11px] text-slate-600">{templo.nome}</p>
                </div>
                <div className="text-center border-t border-slate-600 pt-1">
                  <strong>Testemunha 01 (Fiscal de Salão)</strong>
                  <p className="text-[11px] text-slate-600">
                    Nome: _________________ CPF: _________
                  </p>
                </div>
                <div className="text-center border-t border-slate-600 pt-1">
                  <strong>Testemunha 02 (Fiscal de Salão)</strong>
                  <p className="text-[11px] text-slate-600">
                    Nome: _________________ CPF: _________
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            3. DOCUMENTO 05: TERMO DE RESPONSABILIDADE PARA MENORES DE IDADE
           ===================================================================== */}
        {docAtivo === "MENORES" && (
          <div className="space-y-5 text-xs text-slate-800 leading-relaxed">
            <div className="bg-purple-50 p-3.5 rounded-lg border-l-4 border-purple-600 text-[11px] text-purple-950 space-y-1">
              <strong>
                Base Normativa Soberana (Resolução CONAD nº 01/2010 - Item 4.1):
              </strong>
              <p>
                A participação de crianças e adolescentes nos ritos religiosos decorre exclusivamente do{" "}
                <strong>Poder Familiar</strong> (Art. 1.634 do Código Civil e Art. 21 do ECA). Este instrumento requer a assinatura expressa de{" "}
                <strong>AMBOS os genitores</strong> (pai e mãe) ou guardião judicial definitivo, a presença física contínua da família no ritual e o respeito incondicional à vontade do jovem (princípio da não coerção).
              </p>
            </div>

            {/* Módulo 1: Identificação do Menor */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-1">
                Módulo I: Qualificação Completa da Criança ou Adolescente
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="border-b border-dotted border-slate-400 pb-1 sm:col-span-2">
                  <strong>Nome do Menor:</strong> _______________________________________________________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Data de Nasc.:</strong> ____/____/________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Idade:</strong> ____ anos | <strong>Peso:</strong> ____ kg
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Certidão ou RG:</strong> _____________________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>CPF:</strong> ___________________________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1 sm:col-span-3">
                  <strong>Endereço Residencial:</strong> __________________________________________________________________
                </div>
              </div>
            </div>

            {/* Módulo 2: Qualificação dos Pais */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-1">
                Módulo II: Poder Familiar Conjunto (Pai e Mãe / Guardiões)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">
                    Genitor Paterno / 1º Responsável Legal
                  </strong>
                  <p>Nome: ___________________________________________________</p>
                  <p>RG/UF: ____________________ CPF: _______________________</p>
                  <p>Telefone/WhatsApp: (____) _______________________________</p>
                  <p>Grau: [ ] Pai Biológico [ ] Pai Adotivo [ ] Tutor Judicial</p>
                  <p>Tempo de Comunhão em Ayahuasca: ________ anos/meses</p>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">
                    Genitora Materna / 2ª Responsável Legal
                  </strong>
                  <p>Nome: ___________________________________________________</p>
                  <p>RG/UF: ____________________ CPF: _______________________</p>
                  <p>Telefone/WhatsApp: (____) _______________________________</p>
                  <p>Grau: [ ] Mãe Biológica [ ] Mãe Adotiva [ ] Tutora Judicial</p>
                  <p>Tempo de Comunhão em Ayahuasca: ________ anos/meses</p>
                </div>
              </div>
            </div>

            {/* Módulo 3: Triagem de Saúde e Bloqueio Farmacológico Pediátrico */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-1">
                Módulo III: Triagem de Higidez Clínica e Bloqueio Farmacológico Pediátrico
              </h4>
              <div className="space-y-1.5 text-xs">
                <p>
                  <strong>1. Uso de Medicamentos Contínuos ou Recentes:</strong> [ ] NÃO [ ] SIM. Qual(is)?{" "}
                  _________________________________
                </p>
                <div className="bg-rose-50 p-2.5 rounded border border-rose-300 text-rose-950 text-[11px] space-y-1">
                  <strong>
                    🔴 VETO SANITÁRIO ABSOLUTO EM PEDIATRIA E ADOLESCÊNCIA:
                  </strong>
                  <p>
                    Menores de idade em uso de qualquer um dos medicamentos abaixo estão{" "}
                    <strong>terminantemente impedidos</strong> de ingerir o sacramento (podendo apenas acompanhar os pais no salão sem comunhão):
                  </p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>
                      <strong>Estimulantes / TDAH:</strong> Metilfenidato (<em>Ritalina, Ritalina LA, Concerta</em>), Lisdexanfetamina (<em>Venvanse, Juneve</em>), Atomoxetina (<em>Atentah</em>).
                    </li>
                    <li>
                      <strong>Neurolépticos / Antipsicóticos (Frequentes em Neuropediatria/TEA):</strong> Risperidona (<em>Risperdal, Zargus</em>), Aripiprazol (<em>Abilify, Aristab</em>), Quetiapina (<em>Seroquel</em>), Periciazina (<em>Neuleptil</em>), Levomepromazina (<em>Neozine</em>), Haloperidol (<em>Haldol</em>).
                    </li>
                    <li>
                      <strong>Anticonvulsivantes e Estabilizadores:</strong> Ácido Valpróico/Divalproato (<em>Depakene, Depakote</em>), Carbamazepina (<em>Tegretol</em>), Oxcarbazepina (<em>Trileptal</em>), Fenobarbital (<em>Gardenal</em>), Fenitoína (<em>Hidantal</em>), Lamotrigina (<em>Lamictal</em>), Levetiracetam (<em>Keppra</em>), Carbonato de Lítio (<em>Carbolitium</em>).
                    </li>
                    <li>
                      <strong>Antidepressivos:</strong> Fluoxetina (<em>Prozac, Daforin</em>), Sertralina (<em>Zoloft</em>), Escitalopram (<em>Lexapro</em>), Imipramina (<em>Tofranil</em>), Clomipramina (<em>Anafranil</em>), Amitriptilina.
                    </li>
                    <li>
                      <strong>Xaropes Antitussígenos e Antigripais:</strong> Dextrometorfano (<em>Vick 44E, Benalet TSC</em>), Pseudoefedrina/Fenilefrina/Clorfeniramina (<em>Decongex, Resfenol, Polaramine</em>).
                    </li>
                  </ul>
                </div>
                <p>
                  <strong>2. Diagnósticos Clínicos:</strong> Convulsões/Epilepsia (inclusive febril): [ ] NÃO [ ] SIM | Cardiopatia Congênita/Arritmia: [ ] NÃO [ ] SIM | Asma Severa/Diabetes Tipo 1: [ ] NÃO [ ] SIM
                </p>
                <p>
                  <strong>3. Experiência Sacramental Anterior:</strong> [ ] Primeira comunhão na vida [ ] Já comungou anteriormente (___ vezes)
                </p>
              </div>
            </div>

            {/* Módulo 4: Cláusulas Deontológicas */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-1">
                Módulo IV: Cláusulas do Poder Familiar &amp; Regras do Templo
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-justify">
                <li>
                  <strong>Finalidade Estritamente Religiosa:</strong> A participação objetiva unicamente o desenvolvimento moral e espiritual em família, sendo vedada qualquer motivação recreativa.
                </li>
                <li>
                  <strong>Princípio da Não Coerção (Art. 16 do ECA):</strong> A vontade da criança ou jovem é soberana. Se houver recusa, choro ou desconforto no momento da entrega do cálice, a decisão será prontamente acatada, sem nenhuma pressão dos pais ou facilitadores.
                </li>
                <li>
                  <strong>Moderação e Porção Simbólica:</strong> A medida para menores é estritamente simbólica (gotas ou mililitros reduzidos da graduação suave 3:1). O repasse de 2ª porção ao menor é terminantemente proibido.
                </li>
                <li>
                  <strong>Presença Física Obrigatória:</strong> É mandatório que pelo menos um dos genitores permaneça no salão de oração durante todo o tempo da cerimônia, até o término.
                </li>
                <li>
                  <strong>Assistência Somática:</strong> Em caso de náusea ou purga natural, os pais assumem o dever direto de acompanhar o filho aos sanitários, higienizá-lo e acolhê-lo com afeto.
                </li>
                <li>
                  <strong>Proteção de Dados (LGPD):</strong> Os dados sensíveis da criança são protegidos pela Lei 13.709/2018 (Art. 14) e arquivados sob sigilo na Secretaria do Templo por 20 anos.
                </li>
              </ol>
            </div>

            {/* Módulo 5: Assinaturas */}
            <div className="border-t-2 border-slate-800 pt-4 space-y-4">
              <div className="text-center text-xs">
                Local e Data: ________________________, _____ de ____________________ de 202___
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-center pt-2">
                <div className="border-t border-slate-800 pt-1">
                  <strong>Assinatura do Pai / 1º Responsável</strong>
                  <p className="text-[10px] text-slate-500">Nome Legível e CPF</p>
                </div>
                <div className="border-t border-slate-800 pt-1">
                  <strong>Assinatura da Mãe / 2ª Responsável</strong>
                  <p className="text-[10px] text-slate-500">Nome Legível e CPF</p>
                </div>
              </div>
              <div className="border-t border-dotted border-slate-400 pt-2 text-center text-xs">
                <strong>
                  Assinatura da Criança ou Adolescente (se alfabetizado):
                </strong>
                <p className="border-b border-dotted border-slate-400 pb-1 max-w-sm mx-auto mt-2"></p>
              </div>
            </div>

            {/* Módulo 6: Parecer do Dirigente */}
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-300 space-y-2 text-xs">
              <strong className="text-slate-900 block">
                Homologação Litúrgica pelo Dirigente do Templo ({templo.nome}):
              </strong>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-1.5">
                  <input type="checkbox" /> [ ] Deferido (Porção Simbólica)
                </label>
                <label className="flex items-center gap-1.5">
                  <input type="checkbox" /> [ ] Acompanhamento Sem Ingestão
                </label>
                <label className="flex items-center gap-1.5">
                  <input type="checkbox" /> [ ] Indeferido
                </label>
              </div>
              <div className="pt-2 text-center border-t border-slate-300">
                <strong>{templo.dirigente}</strong> • Dirigente Responsável
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            4. DOCUMENTO 03: POP E ATA RITUALÍSTICA
           ===================================================================== */}
        {docAtivo === "ATA" && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
            <div className="bg-slate-100 p-3 rounded-lg border-l-4 border-slate-700 text-[11px] text-slate-700">
              <strong>Finalidade Operacional:</strong> Padronização das 5 fases ritualísticas de salvaguarda, conferência da Tabela de Medicamentos Controlados, protocolos de emergência (Critérios de Hunter, Zendo Project e Red Flags clínicos) e modelo canônico de lavratura de Ata de Sessão.
            </div>

            {/* Fases do POP */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-1">
                Parte I: Procedimento Operacional Padrão (POP) em 5 Fases
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-semibold">
                    Fase 1: Pré-Ritual &amp; Triagem de Medicamentos
                  </strong>
                  <p>• Conferir Fichas de Anamnese (Doc. 01) e Tabela de 4 Cores de Medicamentos Controlados.</p>
                  <p>• Barrar Grupo A (Lítio, Antipsicóticos, Anticonvulsivantes, Antiparkinsonianos) e Grupo C sem washout completo.</p>
                  <p>• Ventilação contínua no salão e Espaço Seguro (&ldquo;Zendo Tent&rdquo;) equipado.</p>
                  <p>• Kit de primeiros socorros: Esfigmomanômetro, oxímetro, termômetro, glicosímetro HGT, mel/glicose (Regra dos 15) e sais de reidratação oral.</p>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-semibold">
                    Fase 2: Condução &amp; Calibração de Porções
                  </strong>
                  <p>• Aviso solene oral de regras e permanência no perímetro do templo.</p>
                  <p>• Porção conservadora para iniciantes (50% da medida padrão, priorizando 3:1 Mainumbi ou 5:1 Pituã).</p>
                  <p>• Repasse somente após 60 a 90 minutos da primeira comunhão com avaliação visual de lucidez.</p>
                  <p>• Fiscais em serviço mantêm porção reduzida de vigília motora.</p>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-semibold">
                    Fase 3: Manejo da Purga, GLP-1 &amp; Crises (Zendo Project)
                  </strong>
                  <p>• Prevenção de broncoaspiração (atenção redobrada a usuários de Ozempic/Mounjaro): cabeça inclinada sobre o balde ou Posição Lateral de Segurança (PLS); nunca deitar de costas!</p>
                  <p>• Controle de hipoglicemia (Regra dos 15): ofertar 15g de mel/glicose se houver suor frio ou tremor pós-purga.</p>
                  <p>• 4 Princípios do Zendo Project: Espaço seguro, Acompanhar sem guiar, Conversar através da respiração e O difícil não é mau.</p>
                  <p>• Proibição estrita de administrar ansiolíticos ou antieméticos (Plasil/Vonau) durante o rito.</p>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-rose-900 block font-semibold">
                    Fase 4: Critérios de Hunter, Red Flags &amp; SAMU 192
                  </strong>
                  <p>• <strong>Síndrome Serotoninérgica (Hunter):</strong> Febre &gt; 38,5°C + clônus espontâneo/ocular/induzível + hiperreflexia + rigidez muscular.</p>
                  <p>• <strong>Status Epilepticus:</strong> Convulsão &gt; 5 minutos.</p>
                  <p>• <strong>Crise Hipertensiva / AVC / IAM:</strong> PA &gt;= 180/120 mmHg com cefaleia súbita, dor torácica ou desvio de rima.</p>
                  <p>• <strong>Conduta:</strong> Acionar SAMU 192 (Suporte Avançado), informar ingestão de Ayahuasca (RIMA + DMT), entregar Ficha de Anamnese e manter em PLS.</p>
                </div>
              </div>
            </div>

            {/* Parte II: Modelo de Ata de Sessão */}
            <div className="border-t-2 border-slate-800 pt-4 space-y-3">
              <h4 className="font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-1">
                Parte II: Ata Oficial da Sessão Litúrgica (Preenchimento no Templo)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Data da Sessão:</strong> ____/____/202___
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Horário Início:</strong> ____h____
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Horário Término:</strong> ____h____
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Nº Total de Comungantes:</strong> ________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Nº de Iniciantes:</strong> ________
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1">
                  <strong>Volume Consagrado:</strong> _______ L
                </div>
                <div className="border-b border-dotted border-slate-400 pb-1 sm:col-span-3">
                  <strong>Graduação Utilizada:</strong> [ ] 3:1 Mainumbi [ ] 5:1 Pituã [ ] 7:1 Anhangatã [ ] 10:1 Wirapuru |{" "}
                  <strong>Lote:</strong> ____________
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <strong>Livro de Ocorrências / Intercorrências da Sessão:</strong>
                <p className="border-b border-dotted border-slate-400 pb-1">
                  ____________________________________________________________________________________________________
                </p>
                <p className="border-b border-dotted border-slate-400 pb-1">
                  ____________________________________________________________________________________________________
                </p>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-center">
                <div className="border-t border-slate-800 pt-1">
                  <strong>Dirigente da Sessão</strong>
                  <p className="text-[10px] text-slate-500">{templo.dirigente}</p>
                </div>
                <div className="border-t border-slate-800 pt-1">
                  <strong>Fiscal de Salão 01</strong>
                  <p className="text-[10px] text-slate-500">Nome e Assinatura</p>
                </div>
                <div className="border-t border-slate-800 pt-1">
                  <strong>Fiscal de Salão 02</strong>
                  <p className="text-[10px] text-slate-500">Nome e Assinatura</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            5. DOCUMENTO 04: DECLARAÇÃO DE TRANSPORTE LITÚRGICO
           ===================================================================== */}
        {docAtivo === "TRANSITO" && (
          <div className="space-y-5 text-xs text-slate-800 leading-relaxed text-justify">
            <div className="bg-slate-100 p-3 rounded-lg border-l-4 border-slate-700 text-[11px] text-slate-700">
              <strong>Finalidade de Trânsito:</strong> Documento comprobatório de procedência e legalidade para viagens rodoviárias e despachos em bagagem aérea (ANAC), assegurando que o sacramento botânico se destina a culto religioso amparado pela Resolução CONAD nº 01/2010, Art. 5º, VI da CF/88, Art. 2º, parágrafo único da Lei 11.343/2006 e Lei nº 5.764/1971.
            </div>

            <p>
              Declaro para os devidos fins de direito, fé pública e salvaguarda perante autoridades civis, policiais (Polícia Federal, Polícia Rodoviária Federal, Polícias Civis e Militares), autoridades aeroportuárias (ANAC) e órgãos de vigilância sanitária, que os recipientes hermeticamente selados e identificados que acompanham esta declaração contêm exclusivamente o sacramento sagrado tradicional denominado{" "}
              <strong>AYAHUASCA</strong> (Santo Daime / Vegetal / Hoasca).
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <p>
                • <strong>Entidade Religiosa Destinatária:</strong> {templo.nome} (Registro/Protocolo: {templo.cnpj})
              </p>
              <p>
                • <strong>Localidade da Sede Litúrgica:</strong> {templo.cidade}
              </p>
              <p>
                • <strong>Origem do Feitio Sagrado:</strong> Cruzeiro do Sul/AC — Amazônia Ocidental (Cooperativa Nativaram)
              </p>
              <p>
                • <strong>Dirigente / Portador Responsável:</strong> {templo.dirigente}
              </p>
              <p>
                • <strong>Composição Botânica Estrita:</strong> Decocção aquosa pura de{" "}
                <em>Banisteriopsis caapi</em> (Cipó Jagube/Mariri) e{" "}
                <em>Psychotria viridis</em> (Folhas de Chacrona/Rainha), isenta de substâncias sintéticas ou aditivos ilícitos.
              </p>
              <p>
                • <strong>Lote(s) Transportado(s):</strong> _______________________ | <strong>Graduação:</strong> _______________________ | <strong>Volume Total:</strong> _______ Litros
              </p>
            </div>

            <p>
              Fica formalmente certificado que o referido sacramento{" "}
              <strong>NÃO CONSTITUI MERCADORIA COMERCIAL</strong>, não possui preço de venda e destina-se única e exclusivamente às cerimônias litúrgicas confessionais da congregação acima qualificada, gozando de plena proteção constitucional (Art. 5º, VI e VIII da Constituição Federal de 1988), regulamentar (Resolução CONAD nº 01/2010) e legal (Art. 2º, parágrafo único da Lei Federal nº 11.343/2006).
            </p>

            <div className="pt-8 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs">
              <div>
                Local e Data: {templo.cidade}, {dataAtual}
              </div>
              <div className="text-center w-72 border-t border-slate-800 pt-1">
                <strong>{templo.dirigente}</strong>
                <p className="text-[10px] text-slate-500">
                  Dirigente Litúrgico Responsável • {templo.nome}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
