"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
  Download,
  Copy,
  Check,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
  User,
  PenTool,
  Clock,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Scale,
  HeartPulse,
  Users,
} from "lucide-react";
import { TemploMock } from "@/data/portal-mock";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface PortalCentralDocumentosProps {
  templo: TemploMock;
}

type TipoDocumento = "ANAMNESE" | "TERMO" | "MENORES" | "ATA" | "TRANSITO";

export const PortalCentralDocumentos: React.FC<PortalCentralDocumentosProps> = ({ templo }) => {
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

  // Textos completos para cópia e download
  const getTextoCompleto = () => {
    if (docAtivo === "ANAMNESE") {
      return `# COOPERATIVA ETNOBOTÂNICA NATIVARAM BRASIL
## SISTEMA DE SALVAGUARDA LITÚRGICA E REDUÇÃO DE DANOS
### DOCUMENTO 01: FICHA DE ANAMNESE E TRIAGEM CLÍNICO-ESPIRITUAL PARA COMUNGANTES DE AYAHUASCA
(Amparo: Resolução CONAD nº 01/2010 • Art. 5º, VI e VIII da CF/88 • LGPD Lei nº 13.709/2018)

TEMPLO: ${templo.nome} | CIDADE/UF: ${templo.cidade} | DIRIGENTE: ${templo.dirigente}

---
MÓDULO I: DADOS CADASTRAIS E IDENTIFICAÇÃO DO PARTICIPANTE
Nome Completo: __________________________________________________________________
Nome Social / De Batismo Espiritual: ___________________________________________
Data de Nascimento: ____/____/________ Idade: ______ anos Gênero: ______________
Nacionalidade: _________________________ Naturalidade: _________________________
Documento de Identidade (RG/RNE): _____________________ Órgão Expedidor/UF: ________
CPF/MF: _____________________________ Profissão: ______________________________
Endereço Residencial: ___________________________________________________________
Bairro: _______________________ Cidade/UF: ___________________ CEP: ____________
Telefone / WhatsApp: (____) _________________ E-mail: ____________________________
Contato de Emergência (Obrigatório):
Nome do Contato: ____________________________________________________________
Grau de Parentesco / Relação: __________________ Telefone/WhatsApp: (____) ___________

---
MÓDULO II: HISTÓRICO DE CONSAGRAÇÃO SACRAMENTAL E EXPERIÊNCIA ESPIRITUAL
1. Esta será sua primeira experiência com a Ayahuasca? [ ] SIM [ ] NÃO
2. Caso já tenha consagrado, quantas vezes aproximadamente? [ ] 1 a 5 [ ] 6 a 20 [ ] Mais de 20
3. Tradições que já consagrou: [ ] Xamânica [ ] Santo Daime [ ] UDV [ ] Barquinha [ ] Universalista
4. Data aproximada da última consagração: ____/____/________
5. Já vivenciou crise aguda, pânico, desorientação ou 'peia' intensa prévia? [ ] NÃO [ ] SIM
(Se sim, descrever detalhes e acolhimento recebido): ________________________________
6. Motivação e intenção íntima para participar deste ritual: ________________________

---
MÓDULO III: TRIAGEM CLÍNICA, CARDIOVASCULAR E FISIOLÓGICA (Marque SIM ou NÃO)
[ ] Hipertensão Arterial Sistêmica (PAS >= 140 ou PAD >= 90 mmHg)
[ ] Hipotensão Arterial Severa / Labilidade Pressórica / Síncopes
[ ] Arritmia Cardíaca, Taquicardia ou Palpitações
[ ] Doença Arterial Coronariana / Infarto Prévio
[ ] Histórico Pessoal ou Familiar de Aneurisma (Cerebral ou Aórtico) [CONTRAINDICAÇÃO SEVERA]
[ ] Acidente Vascular Cerebral (AVC / Derrame Prévio)
[ ] Portador de Marca-passo ou Prótese Valvular Cardíaca
[ ] Diabetes Mellitus (Tipo 1 ou Tipo 2 / Uso de Insulina ou Metformina)
[ ] Epilepsia, Convulsões ou Disritmia Cerebral [CONTRAINDICAÇÃO PERMANENTE]
[ ] Úlcera Gástrica Ativa ou Gastrite Severa
[ ] Hepatite Crônica, Cirrose ou Insuficiência Hepática
[ ] Insuficiência Renal Crônica / Hemodiálise
[ ] Glaucoma de Ângulo Fechado ou Descolamento de Retina
[ ] Cirurgia de Grande Porte nos últimos 6 meses
[ ] Mulheres: Está grávida ou com suspeita de gravidez?
[ ] Mulheres: Está em fase de amamentação exclusiva?

---
MÓDULO IV: TRIAGEM PSIQUIÁTRICA E SAÚDE MENTAL
1. Diagnóstico clínico atual ou prévio:
- Esquizofrenia, Transtorno Esquizoafetivo ou Psicoses: [ ] SIM [ ] NÃO (Contraindicação Absoluta)
- Transtorno Afetivo Bipolar (Tipo I ou II / Fases de Mania): [ ] SIM [ ] NÃO (Contraindicação Absoluta)
- Transtorno de Personalidade Borderline: [ ] SIM [ ] NÃO
- Transtorno de Pânico com Agorafobia / TEPT: [ ] SIM [ ] NÃO
- Depressão Maior Recorrente ou Resistente: [ ] SIM [ ] NÃO
2. Histórico em familiares de 1º GRAU (pais, irmãos, filhos) com Esquizofrenia, Psicose ou Bipolaridade? [ ] NÃO [ ] SIM
3. Já passou por internação em hospital psiquiátrico? [ ] NÃO [ ] SIM
4. Triagem de ideação suicida ativa nos últimos 12 meses? [ ] NÃO [ ] SIM
5. Realiza acompanhamento psicológico ou psiquiátrico atualmente? [ ] NÃO [ ] SIM

---
MÓDULO V: LEVANTAMENTO FARMACOLÓGICO E JANELAS DE SEGURANÇA (WASHOUT)
1. Antidepressivos nas últimas 6 semanas:
- ISRS: Fluoxetina (washout 35-45d), Sertralina, Escitalopram, Paroxetina, Citalopram (washout 21-28d).
- ISRSN Duais: Venlafaxina, Desvenlafaxina, Duloxetina (washout 21-28d).
- Tricíclicos: Amitriptilina, Clomipramina (washout 21d).
Nome do Fármaco: ________________________ Dosagem: ________ Última dose: ____/____/____
2. ESTABILIZADORES DE HUMOR (CARBONATO DE LÍTIO - Carbolitium / Litiocar):
[ ] SIM -> [ATENÇÃO: CONTRAINDICAÇÃO ABSOLUTA E DEFINITIVA. Risco letal de Status Epilepticus].
[ ] NÃO
3. Estimulantes SNC (Ritalina, Concerta, Venvanse, Sibutramina): [ ] SIM [ ] NÃO (Washout 7-14d)
4. Ansiolíticos / Benzodiazepínicos (Clonazepam, Diazepam, Alprazolam): [ ] SIM [ ] NÃO
5. Fitoterápicos: Erva-de-São-João (Hipérico), 5-HTP, Tramadol, Dextrometorfano: [ ] SIM [ ] NÃO
6. Álcool e Substâncias (últimos 14 dias):
- Álcool (abstinência mínima 3d) | Cannabis | Cocaína/MDMA (mínimo 21d) | Psilocibina/LSD

---
MÓDULO VI: DECLARAÇÃO DE VERACIDADE, LGPD E AUTORIZAÇÃO DE DADOS
Atesto sob as penas da lei a veracidade integral das informações prestadas. Reconheço que a omissão de antidepressivos, lítio, cardiopatias ou transtornos psicóticos/bipolares isenta integralmente o templo e dirigentes de responsabilidade civil/penal em caso de intercorrência clínica. Autorizo o tratamento dos meus dados de saúde e religião para salvaguarda litúrgica e atendimento de emergência, ciente do prazo de custódia obrigatória de 20 anos aplicável aos registros de saúde (Lei nº 13.787/2018 e CFM 1.821/2007).
Local e Data: ________________________, _____ de ____________________ de 202___
Assinatura do Participante: _________________________________________________

---
MÓDULO VII: PARECER DA COMISSÃO LITÚRGICA (USO EXCLUSIVO DO TEMPLO)
Sinais Vitais na Recepção: PA: ______x______ mmHg | FC: _____ bpm | SpO2: _____ % | Glicemia: _____ mg/dL
RESULTADO:
[ ] APTO(A) - Liberado para dosagem padrão.
[ ] APTO(A) COM RESTRIÇÃO - Dosagem reduzida de acolhimento (máx _____ ml 3:1 ou 5:1).
[ ] INAPTO(A) TEMPORARIAMENTE - Motivo: Washout incompleto / Abstinência alcoólica.
[ ] INAPTO(A) DEFINITIVAMENTE - Motivo: Contraindicação absoluta (Lítio, Psicose, Bipolaridade, Aneurisma).
Nome e Assinatura do Dirigente Avaliador: _____________________________________`;
    }

    if (docAtivo === "TERMO") {
      return `# COOPERATIVA ETNOBOTÂNICA NATIVARAM BRASIL
## SISTEMA DE SALVAGUARDA LITÚRGICA E REDUÇÃO DE DANOS
### DOCUMENTO 02: TERMO DE RESPONSABILIDADE, CIÊNCIA DE SACRAMENTO E CONSENTIMENTO LIVRE E ESCLARECIDO (TCLE)

INSTITUIÇÃO LITÚRGICA: ${templo.nome} | CNPJ: ${templo.cnpj} | DIRIGENTE: ${templo.dirigente}
COMUNGANTE: __________________________________________________________________ | CPF: ____________________

CLÁUSULA 1ª: DA NATUREZA LITÚRGICA E AMPARO CONSTITUCIONAL
Comparecimento livre e espontâneo a cerimônia de natureza estritamente religiosa, respaldada no Art. 5º, VI e VIII da CF/88, e Art. 2º, parágrafo único da Lei Federal nº 11.343/2006. O sacramento é a Ayahuasca, infusão de Banisteriopsis caapi (Jagube) e Psychotria viridis (Chacrona).

CLÁUSULA 2ª: DA DEONTOLOGIA DO CONAD E VEDAÇÃO DE COMERCIALIZAÇÃO
A instituição atua sob a Resolução CONAD nº 01/2010. A Ayahuasca NÃO É MERCADORIA, não possui preço e não é vendida. Qualquer contribuição possui natureza jurídica exclusiva de rateio solidário de custos operacionais (limpeza, logística e espaço físico), não configurando relação de consumo.

CLÁUSULA 3ª: DA AUSÊNCIA DE PROMESSA DE CURA MÉDICA
A instituição NÃO É CLÍNICA MÉDICA e não promete cura milagrosa de enfermidades orgânicas ou psiquiátricas (Arts. 283 e 284 do CP). O participante compromete-se a não interromper nenhum tratamento médico alopático prescrito por seus médicos assistentes.

CLÁUSULA 4ª: DOS EFEITOS PSICOFÍSICOS E PROCESSO DE PURGAÇÃO
Ciente das manifestações normais: mirações, variações pressóricas transitórias, calafrios, sudorese, náuseas e vômitos (purgação física vista como limpeza fisiológica e desintoxicação natural, não configurando envenenamento).

CLÁUSULA 5ª: DAS OBRIGAÇÕES DE CONDUTA E DISCIPLINA
- Permanência no perímetro do templo até o encerramento formal (proibição de deserção).
- Saída aos banheiros sempre acompanhada por fiscais.
- Respeito ao silêncio e proibição de fotos, filmagens ou gravações de áudio (Art. 20 do Código Civil).
- VEDAÇÃO TERMINANTE À CONDUÇÃO DE VEÍCULOS AUTOMOTORES logo após o término.

CLÁUSULA 6ª: DA ALOCAÇÃO DE RESPONSABILIDADE CIVIL POR CULPA EXCLUSIVA DA VÍTIMA
Reitera veracidade da ficha de anamnese. A omissão intencional de antidepressivos, Sais de Lítio, cardiopatias ou transtornos psicóticos configura CULPA EXCLUSIVA DA VÍTIMA (Art. 422, 186 e 927 do CC), rompendo o nexo causal e isentando o templo de responsabilidade.

CLÁUSULA 7ª: DA GOVERNANÇA DE DADOS (LGPD)
Autoriza o tratamento de dados de saúde para fins de segurança e socorro médico. Guarda documental sob custódia de 20 anos (Lei 13.787/2018).

CLÁUSULA 8ª: DA VOLUNTARIEDADE E DESISTÊNCIA
O participante pode desistir livremente a qualquer momento ANTES da ingestão da bebida.

CLÁUSULA 9ª: DECLARAÇÃO FINAL E ASSINATURAS
Local e Data: ________________________, _____ de ____________________ de 202___
Assinatura do Comungante: ____________________________________________________
Assinatura do Dirigente Responsável: _________________________________________
Testemunha 01 (Fiscal de Salão): _______________________ CPF: _________________
Testemunha 02 (Fiscal de Salão): _______________________ CPF: _________________`;
    }

    if (docAtivo === "MENORES") {
      return `# COOPERATIVA ETNOBOTÂNICA NATIVARAM BRASIL
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
Data de Nascimento: ____/____/________ Idade: ______ anos Sexo: [ ] F [ ] M
Certidão de Nascimento ou RG: ________________________ Órgão/UF: _______ CPF: __________________
Endereço Residencial: __________________________________________________________________
Bairro: _______________________ Cidade/UF: ___________________ CEP: ____________

---
MÓDULO II: QUALIFICAÇÃO DOS PAIS / RESPONSÁVEIS LEGAIS (PODER FAMILIAR CONJUNTO)
Genitor (Pai): _________________________________________________________________________
Profissão: _____________________ RG: _________________ Órgão/UF: _____ CPF: __________________
Telefone/WhatsApp: (____) _________________ E-mail: _____________________________________
Grau: [ ] Pai Biológico [ ] Pai Adotivo [ ] Guardião Judicial | Tempo de Comunhão: _______ anos

Genitora (Mãe): ________________________________________________________________________
Profissão: _____________________ RG: _________________ Órgão/UF: _____ CPF: __________________
Telefone/WhatsApp: (____) _________________ E-mail: _____________________________________
Grau: [ ] Mãe Biológica [ ] Mãe Adotiva [ ] Guardiã Judicial | Tempo de Comunhão: _______ anos
(Nota: Caso um dos genitores seja falecido ou destituído, anexar certidão comprobatória).

---
MÓDULO III: TRIAGEM DE SAÚDE PEDIÁTRICA / ADOLESCENTE
1. Uso de Medicamentos Contínuos: [ ] NÃO [ ] SIM. Qual? __________________________________
(VETO ABSOLUTO: Menores em uso de Ritalina, Concerta, Venvanse para TDAH, antidepressivos ou anticonvulsivantes não podem ingerir a bebida).
2. Histórico Neurológico: Convulsões, epilepsia ou desmaios? [ ] NÃO [ ] SIM: _________________
3. Cardiopatias Congênitas, Asma Grave ou Alergias Severas? [ ] NÃO [ ] SIM: ________________
4. Experiência Anterior com Ayahuasca: [ ] Primeira vez [ ] Já comungou ____ vezes

---
MÓDULO IV: CLÁUSULAS DE COMPROMISSO DO PODER FAMILIAR
CLÁUSULA 1ª: Finalidade estritamente religiosa e espiritual, isenta de fins recreativos ou curiosidade.
CLÁUSULA 2ª: Princípio da Não Coerção (Art. 16 ECA) - se o menor recusar a comunhão, sua vontade será respeitada sem qualquer imposição.
CLÁUSULA 3ª: Dosagem Simbólica - porção mínima/reduzida (gotas ou fração de cálice) adaptada ao peso e idade, sem repasse automático.
CLÁUSULA 4ª: Presença Física Ininterrupta de pelo menos um dos genitores no salão durante toda a cerimônia.
CLÁUSULA 5ª: Cuidado Somático e Afetivo - ciência de náuseas/purgas e dever de acompanhamento aos sanitários e acalento.
CLÁUSULA 6ª: Isenção Institucional por omissões de saúde declaradas pelos pais.
CLÁUSULA 7ª: Governança LGPD de dados sensíveis de menores (Art. 14 da Lei 13.709/2018) com custódia de 20 anos.

---
MÓDULO V: ASSINATURAS DO PODER FAMILIAR E DO TEMPLO
Local e Data: ________________________, _____ de ____________________ de 202___

Assinatura do Pai / Responsável: _______________________________________________________
Assinatura da Mãe / Responsável: ______________________________________________________
Assinatura do Menor (se alfabetizado/adolescente): _____________________________________

PARECER DO DIRIGENTE DO TEMPLO:
[ ] AUTORIZADO (Dose simbólica) [ ] RESTRITO A PARTICIPAÇÃO SEM CHÁ [ ] INDEFERIDO
Assinatura do Dirigente: _______________________________________________________________`;
    }

    if (docAtivo === "ATA") {
      return `# COOPERATIVA ETNOBOTÂNICA NATIVARAM BRASIL
## SISTEMA DE SALVAGUARDA LITÚRGICA E REDUÇÃO DE DANOS
### DOCUMENTO 03: MANUAL DE PROCEDIMENTO OPERACIONAL PADRÃO (POP) E ATA DE SESSÃO RITUALÍSTICA

TEMPLO: ${templo.nome} | DATA DA SESSÃO: ____/____/202___ | HORÁRIO: Início: ____h____ Término: ____h____
LOTE DO SACRAMENTO: __________________ | GRADUAÇÃO: [ ] 3:1 [ ] 5:1 [ ] 7:1 [ ] 10:1 Wirapuru

FASE 1: VERIFICAÇÕES PRÉ-RITUAIS (T - 2h a T - 30min)
[ ] Acessibilidade e rotas de fuga desobstruídas e iluminadas.
[ ] Fluxo de ar contínuo e renovado no salão (prevenção de hipertermia e acúmulo de CO2).
[ ] Espaço Seguro de Redução de Danos ("Zendo Tent") montado fora do salão principal.
[ ] Kit de Primeiros Socorros: Esfigmomanômetro calibrado, Oxímetro de pulso, Termômetro clínico, Glicosímetro portátil (HGT), sachês de mel/glicose (Regra dos 15) e sais de reidratação oral.
[ ] Conferência individual da Ficha de Anamnese (Doc. 01) e Termo TCLE (Doc. 02).
[ ] Alinhamento de Fiscais: Fiscais em serviço tomam apenas dosagem mínima de vigília.

FASE 2: INÍCIO E DOSIMETRIA (T 0 a T + 30min)
[ ] Aviso Solene das regras de salão (permanência no perímetro, silêncio, celulares guardados).
[ ] Dosimetria Conservadora: 30-35ml de concentrado 10:1 ou 60-70ml de 5:1 para iniciantes.
[ ] Registro no mapa de dosagens.

FASE 3: MANEJO DA FORÇA E ACOLHIMENTO DE CRISES (T + 30min a T + 4h)
[ ] Prevenção de Broncoaspiração: na purga, manter cabeça curvada sobre o balde. NUNCA permitir deitar de barriga para cima!
[ ] Banheiros monitorados continuamente (ninguém trancado sozinho).
[ ] 4 Princípios do Zendo Project: Criar espaço seguro, Acompanhar sem guiar, Conversar através e não descer, O difícil não é mau.
[ ] Proibição de ansiolíticos ou calmantes alopáticos.

FASE 4: EMERGÊNCIA MÉDICA E RED FLAGS
- Alerta 1: Febre > 38,5°C com rigidez muscular e sudorese (Suspeita de Síndrome Serotoninérgica).
- Alerta 2: Crise Convulsiva > 5 minutos (Status Epilepticus).
- Alerta 3: Glasgow <= 8 ou Cianose Perilabial (lábios roxos).
- Alerta 4: PA >= 180/120 mmHg com cefaleia súbita e desvio de rima (Suspeita de AVC/IAM).
CONDUTA: SAMU 192 imediato (Unidade de Suporte Avançado), informar chá com DMT e beta-carbolinas, colocar participante em Posição Lateral de Segurança (PLS).

FASE 5: INTEGRAÇÃO E ATA FORMAL DE SESSÃO
Total de Comungantes Presentes: _______ (Homens: _____ Mulheres: _____)
Número de Comungantes de Primeira Vez: _______
Volume Total de Sacramento Consagrado: ________ Litros
Registro de Intercorrências Clínicas ou Disciplinares: __________________________
Horário de Liberação dos Participantes: ____h____min
Assinaturas:
Dirigente Espiritual: ________________________________________________________
Fiscal de Apoio 01: __________________________________________________________
Fiscal de Apoio 02: __________________________________________________________`;
    }

    return `# COOPERATIVA ETNOBOTÂNICA NATIVARAM BRASIL
### DOCUMENTO 04: DECLARAÇÃO DE TRANSPORTE LITÚRGICO DE SACRAMENTO SAGRADO
(Amparo: Resolução CONAD nº 01/2010 • Art. 5º, VI da CF/88 • Lei Federal nº 5.764/1971)

Declaro para os devidos fins de direito e salvaguarda perante autoridades civis, militares, rodoviárias e sanitárias que os recipientes transportados contêm exclusivamente o sacramento sagrado tradicional AYAHUASCA (Santo Daime / Vegetal / Hoasca), preparado exclusivamente a partir de Banisteriopsis caapi e Psychotria viridis.

DESTINAÇÃO EXCLUSIVA: Liturgia Religiosa do Templo ${templo.nome}, CNPJ ${templo.cnpj}, localizado em ${templo.cidade}.
ORIGEM BOTÂNICA: Cruzeiro do Sul/AC (Vale do Juruá) sob manejo cooperativo de rateio sem fins lucrativos da Cooperativa Nativaram.
TRANSPORTADOR RESPONSÁVEL: Dirigente ${templo.dirigente}
FINALIDADE: Cerimônias e rituais confessionais da congregação. Fica atestado que o produto NÃO CONSTITUI MERCADORIA, não se destina a comércio e é imune a enquadramento de tráfico de drogas conforme Art. 2º da Lei 11.343/2006.

Local e Data: ${templo.cidade}, ${dataAtual}
Assinatura do Dirigente Responsável: _________________________________________`;
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
                Modelos Canônicos Referenciais & Soberania Litúrgica da Casa
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Abertos à Adaptação
              </span>
            </div>
            <p className="text-xs text-areia-300 leading-relaxed">
              Estes documentos foram formulados pelo Conselho da <strong>Cooperativa Nativaram</strong> como <em>modelos canônicos de máxima salvaguarda técnica, clínica e jurídica</em> (CONAD 01/2010, CF/88 e LGPD). Cada templo e congregação parceira possui plena soberania e autonomia doutrinária para editar, adaptar e incluir suas próprias regras estatutárias. Você pode imprimir pronto, copiar o texto integral para o Word/Docs ou baixar o arquivo editável.
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
              Central de Documentos & Modelos Oficiais
            </span>
          </div>
          <p className="text-xs text-areia-300 font-light max-w-2xl leading-relaxed mt-0.5">
            Selecione o documento desejado para visualização fiel, impressão em papel/PDF A4 ou download de modelo aberto:
          </p>
        </div>

        {/* Botões de Ação Rápida */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <button
            onClick={() => setMostrarJustificativa(!mostrarJustificativa)}
            className="btn-secondary text-xs inline-flex items-center gap-1.5 px-3 py-2 text-ambar-300 border-ambar-500/30 hover:bg-ambar-500/10"
            title="Ver por que cada item existe nos documentos"
          >
            <Info className="h-3.5 w-3.5 text-ambar-400" />
            <span>{mostrarJustificativa ? "Ocultar Justificativas" : "Por Que Cada Item Existe?"}</span>
            {mostrarJustificativa ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          <button
            onClick={() => copiarTextoDocumento(getTextoCompleto())}
            className="btn-secondary text-xs inline-flex items-center gap-1.5 px-3 py-2 text-areia-200 hover:bg-floresta-800"
            title="Copiar texto formatado para colar no Word ou Google Docs"
          >
            {copiado ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-ambar-400" />}
            <span>{copiado ? "Copiado!" : "Copiar Texto (Word/Docs)"}</span>
          </button>

          <button
            onClick={() => baixarArquivoTexto(getTextoCompleto(), `nativaram-${docAtivo.toLowerCase()}`)}
            className="btn-secondary text-xs inline-flex items-center gap-1.5 px-3 py-2 text-areia-200 hover:bg-floresta-800"
            title="Baixar arquivo de texto editável (.md / .txt)"
          >
            <Download className="h-3.5 w-3.5 text-emerald-400" />
            <span>Baixar Editável (.md)</span>
          </button>

          <button
            onClick={handleImprimir}
            className="btn-primary text-xs inline-flex items-center gap-1.5 px-4 py-2 shadow-md active:scale-95 transition-all"
            title="Imprimir documento em papel ou salvar em PDF"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Imprimir A4 / PDF</span>
          </button>
        </div>
      </div>

      {/* SEÇÃO EDUCATIVA: POR QUE CADA ITEM EXISTE? (EXPANSÍVEL) */}
      {mostrarJustificativa && (
        <div className="print-hidden p-5 rounded-2xl bg-floresta-900/90 border border-ambar-500/30 text-areia-200 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-amber-300 font-cinzel font-bold text-sm">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            Fundamentação Clínica e Jurídica dos Itens Documentais
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-areia-300">
            <div className="p-3 rounded-lg bg-floresta-950 border border-floresta-800 space-y-1">
              <strong className="text-amber-400 block font-semibold">1. Histórico Psiquiátrico & Parentes de 1º Grau</strong>
              <p>
                O agonismo potente em receptores 5-HT2A e a desativação da Rede de Modo Padrão (DMN) podem precipitar o primeiro surto psicótico ou virada maníaca em cérebros com vulnerabilidade genética latente (mesmo que a pessoa nunca tenha tido sintomas antes).
              </p>
            </div>
            <div className="p-3 rounded-lg bg-floresta-950 border border-floresta-800 space-y-1">
              <strong className="text-rose-400 block font-semibold">2. Veto Absoluto ao Carbonato de Lítio</strong>
              <p>
                O lítio esgota o inositol intracelular e causa hipersensibilização dos receptores serotoninérgicos. A combinação com DMT causa Status Epilepticus refratário e isquemia cerebral (~47% de relatos clínicos de coadministração resultaram em convulsão).
              </p>
            </div>
            <div className="p-3 rounded-lg bg-floresta-950 border border-floresta-800 space-y-1">
              <strong className="text-amber-400 block font-semibold">3. Triagem Cardiovascular & Aneurismas</strong>
              <p>
                A Ayahuasca eleva a pressão arterial em 10-20 mmHg e a frequência cardíaca em 10-15 bpm. Em portadores de aneurisma cerebral ou aórtico, o estresse de cisalhamento endotelial pode romper vasos e causar hemorragia fatal.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-floresta-950 border border-floresta-800 space-y-1">
              <strong className="text-emerald-400 block font-semibold">4. Salvaguarda LGPD & Custódia de 20 Anos</strong>
              <p>
                Dados de saúde e religião são dados sensíveis. O prazo de 20 anos baseia-se na Lei Federal nº 13.787/2018 (prontuários de saúde), blindando a diretoria do templo contra litígios futuros perante órgãos públicos.
              </p>
            </div>
            <div className="space-y-1 p-3 rounded-xl bg-floresta-950/70 border border-ambar-500/15">
              <strong className="text-purple-400 block font-semibold">5. Salvaguarda de Menores (Item 4.1 CONAD & ECA Art. 16/21)</strong>
              <p>
                A comunhão por menores decorre exclusivamente do Poder Familiar conjunto (pai e mãe). O termo exige presença física dos pais no rito, veda terminantemente coação (vontade livre do jovem), estipula dose simbólica reduzida e barra menores medicados com estimulantes de TDAH (Ritalina/Venvanse).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SELEÇÃO DAS 4 ABAS DE DOCUMENTOS */}
      <div className="print-hidden flex overflow-x-auto gap-2 pb-1 border-b border-ambar-500/20">
        {[
          {
            id: "ANAMNESE" as const,
            nome: "Doc 01: Ficha de Anamnese Completa",
            sub: "Triagem Clínica & Psiquiátrica (7 Módulos)",
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
            sub: "Zendo Project, Red Flags e Ata de Sessão",
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
            <p className="text-[10px] text-areia-400 font-light mt-0.5">{tab.sub}</p>
          </button>
        ))}
      </div>

      {/* ÁREA DE IMPRESSÃO / FOLHA A4 NATIVA */}
      <div className="documento-a4-impressao bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-200 font-sans text-xs sm:text-sm leading-relaxed max-w-4xl mx-auto">
        {/* CABEÇALHO INSTITUCIONAL CANÔNICO */}
        <div className="border-b-2 border-slate-800 pb-4 mb-6 text-center space-y-1">
          <p className="text-[10px] tracking-widest uppercase font-bold text-slate-600">
            COOPERATIVA ETNOBOTÂNICA NATIVARAM BRASIL • SISTEMA DE SALVAGUARDA LITÚRGICA
          </p>
          <h1 className="font-serif text-lg sm:text-xl font-bold uppercase text-slate-900 tracking-tight">
            {docAtivo === "ANAMNESE" && "FICHA DE ANAMNESE E TRIAGEM CLÍNICO-ESPIRITUAL PARA COMUNGANTES"}
            {docAtivo === "TERMO" && "TERMO DE RESPONSABILIDADE, CIÊNCIA DE SACRAMENTO E CONSENTIMENTO (TCLE)"}
            {docAtivo === "ATA" && "MANUAL DE PROCEDIMENTO OPERACIONAL PADRÃO (POP) E ATA DE SESSÃO"}
            {docAtivo === "TRANSITO" && "DECLARAÇÃO DE TRANSPORTE LITÚRGICO DE SACRAMENTO SAGRADO"}
          </h1>
          <p className="text-[11px] text-slate-600">
            {docAtivo === "ANAMNESE" && "Resolução CONAD nº 01/2010 • Art. 5º, VI e VIII da CF/88 • LGPD Lei nº 13.709/2018"}
            {docAtivo === "TERMO" && "Amparo no Art. 5º, VI da CF/88, Resolução CONAD nº 01/2010 e Art. 2º da Lei 11.343/2006"}
            {docAtivo === "ATA" && "Gestão de Riscos, Zendo Project, Red Flags Clínicos e Registro Canônico de Governança"}
            {docAtivo === "TRANSITO" && "Transporte Interestadual sem Fins Lucrativos para Culto Religioso • Lei 5.764/1971"}
          </p>
          <div className="pt-2 text-[10px] text-slate-500 flex flex-wrap justify-between gap-2 border-t border-slate-200 mt-2">
            <span><strong>Templo:</strong> {templo.nome}</span>
            <span><strong>CNPJ:</strong> {templo.cnpj}</span>
            <span><strong>Dirigente:</strong> {templo.dirigente}</span>
            <span><strong>Emissão:</strong> {dataAtual}</span>
          </div>
        </div>

        {/* 1. DOCUMENTO DE ANAMNESE COMPLETO */}
        {docAtivo === "ANAMNESE" && (
          <div className="space-y-6">
            {/* Aviso de Preenchimento */}
            <div className="bg-slate-100 p-3 rounded-lg border-l-4 border-slate-700 text-[11px] text-slate-700 leading-snug">
              <strong>Deontologia e Finalidade Institucional:</strong> Documento individual, confidencial e obrigatório para todo buscador antes da primeira consagração ou atualização semestral. Destina-se a resguardar a integridade física e psíquica do participante, prevenindo interações medicamentosas graves e descompensações psiquiátricas.
            </div>

            {/* Módulo I */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Módulo I: Dados Cadastrais e Identificação
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>Nome Completo:</strong> ___________________________________</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>Nome Social / Espiritual:</strong> ____________________________</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>Data Nasc:</strong> ____/____/________ | <strong>Idade:</strong> ____ anos</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>Gênero:</strong> ____________ | <strong>Profissão:</strong> _________________</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>RG/RNE:</strong> ____________________ | <strong>Órgão:</strong> _________</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>CPF:</strong> ________________________</div>
                <div className="border-b border-dotted border-slate-400 pb-1 sm:col-span-2"><strong>Endereço Residencial:</strong> ________________________________________________________________</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>Cidade/UF:</strong> ______________________ | <strong>CEP:</strong> ___________</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>WhatsApp:</strong> (____) _________________</div>
                <div className="border-b border-dotted border-slate-400 pb-1 sm:col-span-2 bg-slate-50 p-1.5 rounded">
                  <strong>Contato de Emergência (Obrigatório):</strong> ___________________________________ | <strong>Parentesco:</strong> ____________ | <strong>Tel (24h):</strong> (____) ____________
                </div>
              </div>
            </div>

            {/* Módulo II */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Módulo II: Histórico de Consagração Sacramental
              </h3>
              <div className="space-y-1.5 text-xs">
                <p>1. Esta será sua primeira experiência com a Ayahuasca? ( ) SIM, primeira vez. ( ) NÃO, já comunguei anteriormente.</p>
                <p>2. Quantas consagrações aproximadas já realizou? ( ) 1 a 5 ( ) 6 a 20 ( ) Mais de 20 vezes.</p>
                <p>3. Tradições que já frequentou: [ ] Santo Daime [ ] União do Vegetal (UDV) [ ] Linha Xamânica [ ] Barquinha [ ] Universalista</p>
                <p>4. Já vivenciou crise aguda, pânico, desorientação ou 'peia' difícil anteriormente? ( ) NÃO ( ) SIM</p>
                <p className="border-b border-dotted border-slate-400 pb-1"><em>Se sim, relate brevemente:</em> ________________________________________________________________________________</p>
                <p className="border-b border-dotted border-slate-400 pb-1">5. Motivação e intenção íntima para este ritual: ________________________________________________________________</p>
              </div>
            </div>

            {/* Módulo III */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Módulo III: Triagem Clínica, Cardiovascular e Fisiológica
              </h3>
              <table className="w-full text-left border-collapse text-[11px] mb-2">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300">
                    <th className="p-1.5">Condição Fisiológica / Histórico Clínico</th>
                    <th className="p-1.5 text-center w-12">Sim</th>
                    <th className="p-1.5 text-center w-12">Não</th>
                    <th className="p-1.5">Detalhes / Medicamentos / Observações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-1 font-medium">Hipertensão Arterial Sistêmica (PAS &gt;= 140 ou PAD &gt;= 90)</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Última aferição / Fármaco anti-hipertensivo:</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-medium">Hipotensão Severa, Labilidade Pressórica ou Síncope (Desmaio)</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Histórico de tonturas frequentes:</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-medium">Arritmia Cardíaca, Taquicardia ou Infarto Miocárdico Prévio</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Diagnóstico cardiológico:</td>
                  </tr>
                  <tr className="bg-rose-50/60 font-semibold text-rose-900">
                    <td className="p-1">Histórico de Aneurisma (Cerebral ou Aórtico) [CONTRAINDICAÇÃO]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1">Risco de ruptura por pico pressórico transitório.</td>
                  </tr>
                  <tr className="bg-rose-50/60 font-semibold text-rose-900">
                    <td className="p-1">Epilepsia, Convulsões ou Disritmia Cerebral [CONTRAINDICAÇÃO]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1">Risco de deflagração de crises convulsivas no rito.</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-medium">Diabetes Mellitus (Uso de Insulina, Metformina ou hipoglicemiante)</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Tipo e manejo de glicemia em jejum:</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-medium">Cirurgia de Grande Porte nos últimos 6 meses</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Procedimento cirúrgico e cicatrização:</td>
                  </tr>
                  <tr>
                    <td className="p-1 font-medium">Mulheres: Gestante ou em fase de amamentação exclusiva</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-center">[ ]</td>
                    <td className="p-1 text-slate-500">Semanas de gestação / Idade do lactente:</td>
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
                  1. Diagnóstico atual ou prévio:
                  <br />• <strong>Esquizofrenia, Transtorno Esquizoafetivo ou Psicoses:</strong> [ ] SIM [ ] NÃO <em>(Contraindicação Absoluta)</em>
                  <br />• <strong>Transtorno Afetivo Bipolar (Fases de Mania / Euforia):</strong> [ ] SIM [ ] NÃO <em>(Contraindicação Absoluta)</em>
                  <br />• <strong>Transtorno Borderline / Pânico / TEPT / TOC Severo:</strong> [ ] SIM [ ] NÃO
                </p>
                <p>
                  2. <strong>Parentes de 1º Grau (pais, irmãos, filhos)</strong> com histórico de Esquizofrenia, Bipolaridade ou Surto Psicótico? ( ) NÃO ( ) SIM
                </p>
                <p>3. Já passou por alguma internação psiquiátrica prévia? ( ) NÃO ( ) SIM: _______________________________________</p>
                <p>4. Teve episódios de ideação suicida ativa ou autoagressão nos últimos 12 meses? ( ) NÃO ( ) SIM: _________________</p>
              </div>
            </div>

            {/* Módulo V */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Módulo V: Levantamento Farmacológico e Janelas de Segurança (Washout)
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-rose-50 border border-rose-300 text-rose-950 font-medium">
                  🔴 <strong>ALERTA MÁXIMO — SAIS DE LÍTIO (Carbolitium / Litiocar):</strong>
                  <br />Você faz ou fez uso recente de Carbonato de Lítio? ( ) SIM ( ) NÃO
                  <br /><span className="text-[11px] font-normal text-rose-800">
                    Mecanismo letal: a depleção de inositol e up-regulation dos receptores 5-HT2A pelo lítio causam convulsões e Status Epilepticus refratário sob a ação do DMT. <strong>CONTRAINDICAÇÃO ABSOLUTA E DEFINITIVA.</strong>
                  </span>
                </div>

                <p>
                  <strong>Antidepressivos nas últimas 6 semanas:</strong>
                  <br />[ ] <strong>ISRS:</strong> Fluoxetina (washout 35-45 dias), Sertralina, Escitalopram, Paroxetina, Citalopram (washout 21-28 dias).
                  <br />[ ] <strong>ISRSN Duais:</strong> Venlafaxina, Desvenlafaxina, Duloxetina (washout 21-28 dias).
                  <br />[ ] <strong>Tricíclicos / Outros:</strong> Amitriptilina, Clomipramina, Bupropiona, Trazodona, Vortioxetina.
                  <br />• Fármaco em uso: _________________________ | Dosagem diária: ________ | Data da última dose: ____/____/________
                </p>

                <p>
                  <strong>Estimulantes, Ansiolíticos e Fitoterápicos:</strong>
                  <br />[ ] Ritalina, Concerta, Venvanse (washout 7-14d) | [ ] Clonazepam, Diazepam | [ ] Tramadol, Erva-de-São-João, 5-HTP.
                </p>

                <p>
                  <strong>Consumo de Álcool e Substâncias (últimos 14 dias):</strong>
                  <br />• Álcool (abstinência mínima de 3 dias): último consumo em ____/____/________
                  <br />• Cannabis / Maconha: último consumo em ____/____/________
                  <br />• Cocaína, Crack, MDMA / Ecstasy (abstinência mínima de 21 dias): último consumo em ____/____/________
                </p>
              </div>
            </div>

            {/* Módulo VI */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
                Módulo VI: Declaração de Veracidade, LGPD e Assinatura
              </h3>
              <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
                Declaro sob as penas da lei e de minha consciência moral que li cada item desta anamnese e respondi com absoluta verdade. Reconheço que a omissão intencional de antidepressivos, Sais de Lítio, cardiopatias ou transtornos psiquiátricos isenta integralmente a instituição e seus dirigentes de qualquer responsabilidade civil ou criminal em caso de intercorrência clínica. Autorizo o tratamento dos meus dados de saúde e convicção religiosa para fins exclusivos de triagem e socorro de emergência, ciente do prazo de guarda de 20 anos aplicável a registros de saúde (Lei Federal nº 13.787/2018 e LGPD).
              </p>
              <div className="pt-6 flex flex-col sm:flex-row justify-between items-end gap-4 text-xs">
                <div>Local e Data: ______________________________, _____ de ____________________ de 202___</div>
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
                <div className="bg-white p-2 rounded border border-slate-300"><strong>PA Inicial:</strong> _____ x _____ mmHg</div>
                <div className="bg-white p-2 rounded border border-slate-300"><strong>FC:</strong> _____ bpm</div>
                <div className="bg-white p-2 rounded border border-slate-300"><strong>SpO2:</strong> _____ %</div>
                <div className="bg-white p-2 rounded border border-slate-300"><strong>Glicemia:</strong> _____ mg/dL</div>
              </div>
              <div className="space-y-1 text-xs">
                <p><strong>DECISÃO DE APTIDÃO LITÚRGICA:</strong></p>
                <p>[ ] <strong>APTO(A)</strong> — Liberado para consagração da dosagem padrão.</p>
                <p>[ ] <strong>APTO(A) COM RESTRIÇÃO</strong> — Dosagem reduzida de acolhimento (máximo _____ ml da Graduação 3:1 ou 5:1).</p>
                <p>[ ] <strong>INAPTO(A) TEMPORARIAMENTE</strong> — Washout medicamentoso incompleto. Liberado a partir de: ____/____/202___</p>
                <p>[ ] <strong>INAPTO(A) DEFINITIVAMENTE</strong> — Contraindicação psiquiátrica ou cardiovascular absoluta.</p>
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

        {/* 2. DOCUMENTO DE TERMO DE CONSENTIMENTO (TCLE) COMPLETO */}
        {docAtivo === "TERMO" && (
          <div className="space-y-5 text-xs text-slate-800 leading-relaxed text-justify">
            <div className="bg-slate-100 p-3 rounded-lg border-l-4 border-slate-700 text-[11px] text-slate-700">
              <strong>Finalidade Deontológica:</strong> Instrumento jurídico de manifestação livre de vontade fundamentado no Art. 5º, VI e VIII da Constituição Federal e na Resolução CONAD nº 01/2010. Formaliza a ciência de efeitos, a vedação de comércio e a alocação de responsabilidade por fato da vítima.
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">CLÁUSULA PRIMEIRA: DA NATUREZA LITÚRGICA E FUNDAMENTAÇÃO LEGAL</h4>
              <p>
                O(A) COMUNGANTE declara que comparece livre e espontaneamente a esta cerimônia de cunho estritamente religioso, espiritual e filosófico, amparada no Artigo 5º, incisos VI e VIII da Constituição Federal de 1988 e Artigos 215 e 216 da Carta Magna. Declara-se ciente de que a substância que irá consagrar é a bebida sagrada tradicionalmente denominada <strong>Ayahuasca</strong> (Santo Daime / Vegetal / Hoasca), preparada exclusivamente a partir da decocção combinada do cipó <em>Banisteriopsis caapi</em> (Jagube) e das folhas de <em>Psychotria viridis</em> (Chacrona), expressamente ressalvada pelo parágrafo único do Artigo 2º da Lei Federal nº 11.343/2006.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">CLÁUSULA SEGUNDA: DA DEONTOLOGIA DO CONAD E VEDAÇÃO DE COMERCIALIZAÇÃO</h4>
              <p>
                Em observância rigorosa à <strong>Resolução CONAD nº 01/2010</strong>, fica expressamente declarado que a Ayahuasca <strong>NÃO É MERCADORIA</strong>, não tem preço de venda e não é objeto de comércio, corretagem ou turismo comercial. Toda e qualquer contribuição entregue à congregação possui natureza jurídica exclusiva de <strong>taxa de rateio solidário de custos operacionais</strong> (manutenção do espaço, lenha, higiene, alimentação e custeio logístico do feitio tradicional amazônico sob a Lei Federal nº 5.764/1971), não configurando relação de consumo.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">CLÁUSULA TERCEIRA: DA AUSÊNCIA DE PROMESSA DE CURA MÉDICA</h4>
              <p>
                A instituição <strong>NÃO É HOSPITAL, CLÍNICA OU ESTABELECIMENTO MÉDICO</strong> e não promete curas milagrosas de enfermidades orgânicas ou psiquiátricas (Arts. 283 e 284 do Código Penal). O comungante compromete-se formalmente a não interromper nem alterar nenhum tratamento médico ou medicamento prescrito por seus médicos assistentes.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">CLÁUSULA QUARTA: DOS EFEITOS PSICOFÍSICOS E PROCESSO DE PURGAÇÃO</h4>
              <p>
                O participante foi instruído sobre as manifestações psicofísicas comuns resultantes do sacramento: mirações visuais interiores, elevação transitória da frequência cardíaca e pressão arterial, sudorese, calafrios, náuseas, emese (vômito) e eventual evacuação intestinal. Tais respostas são compreendidas pela tradição como limpeza fisiológica e purgação energética necessária, não configurando envenenamento ou intoxicação.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">CLÁUSULA QUINTA: DAS OBRIGAÇÕES DE CONDUTA, DISCIPLINA E SEGURANÇA</h4>
              <p>
                O(A) COMUNGANTE obriga-se a: (a) <strong>Permanecer no perímetro do templo</strong> durante todo o trabalho até a autorização de encerramento pelo Dirigente (proibição terminante de deserção); (b) Deslocar-se aos banheiros somente com acompanhamento de fiscais; (c) Respeitar o silêncio litúrgico; (d) Abster-se de fotografar, filmar ou gravar áudio do ritual (Art. 20 do Código Civil); e (e) <strong>NÃO DIRIGIR VEÍCULOS AUTOMOTORES</strong> logo após o ritual até a completa restauração de reflexos motores e sobriedade.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">CLÁUSULA SEXTA: DA ANAMNESE E CULPA EXCLUSIVA DA VÍTIMA POR OMISSÃO</h4>
              <p>
                O comungante ratifica a veracidade de sua Ficha de Anamnese. A omissão de uso de antidepressivos (ISRS/ISRSN), Sais de Lítio, cardiopatias graves ou transtornos psicóticos/bipolares configura <strong>CULPA EXCLUSIVA DA VÍTIMA (FATO DA VÍTIMA)</strong>, excluindo o nexo causal e isentando o templo e dirigentes de qualquer responsabilidade civil (Arts. 186 e 927 do CC) ou criminal por ato autolesivo decorrente de quebra do dever de boa-fé objetiva (Art. 422 do CC).
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase text-slate-900">CLÁUSULA SÉTIMA: DA GOVERNANÇA DE DADOS (LGPD) E VOLUNTARIEDADE</h4>
              <p>
                Autoriza expressamente o tratamento dos seus dados pessoais sensíveis para segurança e atendimento médico de emergência, com guarda documental mínima de 20 anos (Lei nº 13.787/2018). Reconhece que pode revogar este consentimento a qualquer momento <strong>antes de comungar a bebida</strong>.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-300 space-y-6">
              <div className="flex justify-between items-end text-xs">
                <div>Local e Data: ______________________________, _____ de ____________________ de 202___</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="text-center border-t border-slate-800 pt-1">
                  <strong>Assinatura do Comungante</strong>
                  <p className="text-[11px] text-slate-600">CPF: ________________________________</p>
                </div>
                <div className="text-center border-t border-slate-800 pt-1">
                  <strong>Assinatura do Dirigente Espiritual</strong>
                  <p className="text-[11px] text-slate-600">{templo.nome}</p>
                </div>
                <div className="text-center border-t border-slate-600 pt-1">
                  <strong>Testemunha 01 (Fiscal de Salão)</strong>
                  <p className="text-[11px] text-slate-600">Nome: _________________ CPF: _________</p>
                </div>
                <div className="text-center border-t border-slate-600 pt-1">
                  <strong>Testemunha 02 (Fiscal de Salão)</strong>
                  <p className="text-[11px] text-slate-600">Nome: _________________ CPF: _________</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2B. DOCUMENTO DE TERMO DE RESPONSABILIDADE PARA MENORES DE IDADE */}
        {docAtivo === "MENORES" && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
            <div className="bg-purple-50 p-3.5 rounded-lg border-l-4 border-purple-600 text-[11px] text-purple-950 space-y-1">
              <strong>Base Normativa Soberana (Resolução CONAD nº 01/2010 - Item 4.1):</strong>
              <p>
                A participação de crianças e adolescentes nos ritos religiosos decorre exclusivamente do <strong>Poder Familiar</strong> (Art. 1.634 do Código Civil e Art. 21 do ECA). Este instrumento requer a assinatura expressa de <strong>AMBOS os genitores</strong> (pai e mãe) ou guardião judicial definitivo, a presença física contínua da família no ritual e o respeito incondicional à vontade do jovem (princípio da não coerção).
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
                  <strong>Idade Atual:</strong> _______ anos
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
                  <strong className="text-slate-900 block">Genitor Paterno / 1º Responsável Legal</strong>
                  <p>Nome: ___________________________________________________</p>
                  <p>RG/UF: ____________________ CPF: _______________________</p>
                  <p>Telefone/WhatsApp: (____) _______________________________</p>
                  <p>Grau: [ ] Pai Biológico [ ] Pai Adotivo [ ] Tutor Judicial</p>
                  <p>Tempo de Comunhão em Ayahuasca: ________ anos/meses</p>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">Genitora Materna / 2ª Responsável Legal</strong>
                  <p>Nome: ___________________________________________________</p>
                  <p>RG/UF: ____________________ CPF: _______________________</p>
                  <p>Telefone/WhatsApp: (____) _______________________________</p>
                  <p>Grau: [ ] Mãe Biológica [ ] Mãe Adotiva [ ] Tutora Judicial</p>
                  <p>Tempo de Comunhão em Ayahuasca: ________ anos/meses</p>
                </div>
              </div>
            </div>

            {/* Módulo 3: Triagem de Saúde */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-1">
                Módulo III: Triagem de Higidez Clínica e Isenção Medicamentosa
              </h4>
              <div className="space-y-1 text-xs">
                <p>
                  <strong>1. Uso de Medicamentos Contínuos:</strong> [ ] NÃO [ ] SIM. Qual(is)? _________________________________
                </p>
                <div className="bg-rose-50 p-2 rounded border border-rose-200 text-rose-900 text-[11px]">
                  <strong>VETO SANITÁRIO RÍGIDO:</strong> Menores de idade medicados com psicoestimulantes para TDAH (Ritalina, Concerta, Venvanse), antidepressivos ISRS ou anticonvulsivantes estão <strong>terminantemente impedidos</strong> de ingerir o sacramento por risco de taquiarritmias e choque serotoninérgico.
                </div>
                <p>
                  <strong>2. Diagnósticos Clínicos:</strong> Convulsões/Epilepsia: [ ] NÃO [ ] SIM | Cardiopatia Congênita: [ ] NÃO [ ] SIM | Asma Severa: [ ] NÃO [ ] SIM
                </p>
                <p>
                  <strong>3. Experiência Sacramental Anterior:</strong> [ ] Primeira comunhão na vida [ ] Já comungou anteriormente (___ vezes)
                </p>
              </div>
            </div>

            {/* Módulo 4: Cláusulas Deontológicas */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-1">
                Módulo IV: Cláusulas do Poder Familiar & Regras do Templo
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-justify">
                <li><strong>Finalidade Estritamente Religiosa:</strong> A participação objetiva unicamente o desenvolvimento moral e espiritual em família, sendo vedada qualquer motivação recreativa ou curiosa.</li>
                <li><strong>Princípio da Não Coerção (Art. 16 do ECA):</strong> A vontade da criança ou jovem é soberana. Se houver recusa, choro ou desconforto no momento da entrega do cálice, a decisão será prontamente acatada, sem nenhuma pressão dos pais ou facilitadores.</li>
                <li><strong>Moderação e Porção Simbólica:</strong> A dosagem para menores é adaptada, constituindo porção puramente simbólica (gotas ou mililitros reduzidos). O repasse de 2ª dose ao menor é proibido.</li>
                <li><strong>Presença Física Obrigatória:</strong> É mandatório que pelo menos um dos genitores permaneça no salão de oração durante todo o tempo da cerimônia, até o término.</li>
                <li><strong>Assistência Somática:</strong> Em caso de náusea ou purga natural, os pais assumem o dever direto de acompanhar o filho aos sanitários, higienizá-lo e acolhê-lo com carinho.</li>
                <li><strong>Proteção de Dados (LGPD):</strong> Os dados sensíveis da criança são protegidos pela Lei 13.709/2018 (Art. 14) e arquivados sob sigilo na Secretaria do Templo por 20 anos.</li>
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
                <strong>Assinatura da Criança ou Adolescente (se alfabetizado):</strong>
                <p className="border-b border-dotted border-slate-400 pb-1 max-w-sm mx-auto mt-2"></p>
              </div>
            </div>

            {/* Módulo 6: Parecer do Dirigente */}
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-300 space-y-2 text-xs">
              <strong className="text-slate-900 block">Homologação Litúrgica pelo Dirigente do Templo ({templo.nome}):</strong>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5"><input type="checkbox" /> [ ] Deferido (Dose Simbólica)</label>
                <label className="flex items-center gap-1.5"><input type="checkbox" /> [ ] Acompanhamento Sem Ingestão</label>
                <label className="flex items-center gap-1.5"><input type="checkbox" /> [ ] Indeferido</label>
              </div>
              <div className="pt-2 text-center border-t border-slate-300">
                <strong>{templo.dirigente}</strong> • Dirigente Responsável
              </div>
            </div>
          </div>
        )}

        {/* 3. DOCUMENTO DE POP E ATA RITUALÍSTICA */}
        {docAtivo === "ATA" && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
            <div className="bg-slate-100 p-3 rounded-lg border-l-4 border-slate-700 text-[11px] text-slate-700">
              <strong>Finalidade Operacional:</strong> Padronização das 5 fases ritualísticas de salvaguarda, protocolos de emergência (Zendo Project e Red Flags clínicos) e modelo canônico de lavratura de Ata de Sessão com Livro de Ocorrências.
            </div>

            {/* Fases do POP */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-1">
                Parte I: Procedimento Operacional Padrão (POP) em 5 Fases
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-semibold">Fase 1: Pré-Ritual & Salvaguarda</strong>
                  <p>• Acessibilidade e saídas de emergência desobstruídas.</p>
                  <p>• Ventilação e fluxo de ar contínuo (prevenção de hipertermia/CO2).</p>
                  <p>• Espaço Seguro ("Zendo Tent") equipado com colchonetes e cobertores.</p>
                  <p>• Kit de primeiros socorros: PA, oximetria, termômetro, glicosímetro HGT, mel/glicose (Regra dos 15) e sais de reidratação oral.</p>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-semibold">Fase 2: Condução & Dosimetria</strong>
                  <p>• Aviso solene oral de regras e permanência no salão.</p>
                  <p>• Dosagem conservadora para novatos: 30-35ml de 10:1 ou 60-70ml de 5:1.</p>
                  <p>• Repasse somente após 60 a 90 minutos da primeira dose com avaliação de lucidez.</p>
                  <p>• Fiscais em serviço mantêm dose reduzida de vigília motora.</p>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-semibold">Fase 3: Manejo da Purga & Crises (Zendo Project)</strong>
                  <p>• Prevenção de broncoaspiração: cabeça inclinada sobre o balde; nunca deitar de barriga para cima!</p>
                  <p>• Banheiros monitorados continuamente (ninguém trancado sozinho).</p>
                  <p>• 4 Princípios do Zendo Project: Espaço seguro, Acompanhar sem guiar, Conversar através e O difícil não é mau.</p>
                  <p>• Proibição estrita de administrar ansiolíticos alopáticos.</p>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-semibold text-rose-900">Fase 4: Red Flags & SAMU 192</strong>
                  <p>• Febre &gt; 38,5°C + rigidez = suspeita de Síndrome Serotoninérgica.</p>
                  <p>• Convulsão &gt; 5 minutos = Status Epilepticus.</p>
                  <p>• Glasgow &lt;= 8 ou cianose perilabial (lábios roxos).</p>
                  <p>• PA &gt;= 180/120 com cefaleia súbita e desvio de rima (AVC/IAM).</p>
                  <p>• Acionar SAMU 192 (Suporte Avançado) e colocar em Posição Lateral de Segurança (PLS).</p>
                </div>
              </div>
            </div>

            {/* Parte II: Modelo de Ata de Sessão */}
            <div className="border-t-2 border-slate-800 pt-4 space-y-3">
              <h4 className="font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-1">
                Parte II: Ata Oficial da Sessão Litúrgica (Preenchimento no Templo)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>Data da Sessão:</strong> ____/____/202___</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>Horário Início:</strong> ____h____</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>Horário Término:</strong> ____h____</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>Nº Total de Comungantes:</strong> ________</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>Nº de Iniciantes:</strong> ________</div>
                <div className="border-b border-dotted border-slate-400 pb-1"><strong>Volume Consagrado:</strong> _______ L</div>
                <div className="border-b border-dotted border-slate-400 pb-1 sm:col-span-3">
                  <strong>Graduação Utilizada:</strong> [ ] 3:1 Mainumbi [ ] 5:1 Pituã [ ] 7:1 Anhangatã [ ] 10:1 Wirapuru | <strong>Lote:</strong> ____________
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <strong>Livro de Ocorrências / Intercorrências da Sessão:</strong>
                <p className="border-b border-dotted border-slate-400 pb-1">____________________________________________________________________________________________________</p>
                <p className="border-b border-dotted border-slate-400 pb-1">____________________________________________________________________________________________________</p>
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

        {/* 4. DECLARAÇÃO DE TRANSPORTE LITÚRGICO */}
        {docAtivo === "TRANSITO" && (
          <div className="space-y-6 text-xs text-slate-800 leading-relaxed text-justify">
            <div className="bg-slate-100 p-3 rounded-lg border-l-4 border-slate-700 text-[11px] text-slate-700">
              <strong>Finalidade de Trânsito:</strong> Documento comprobatório de procedência e legalidade para viagens rodoviárias e despachos em bagagem aérea (ANAC), assegurando que o sacramento botânico se destina a culto religioso amparado pelo CONAD nº 01/2010 e Lei nº 5.764/1971.
            </div>

            <p>
              Declaro para os devidos fins de direito, fé pública e salvaguarda perante autoridades civis, policiais (Polícia Federal, Polícia Rodoviária Federal, Polícias Civis e Militares) e órgãos de vigilância sanitária, que os recipientes hermeticamente selados e identificados que acompanham esta declaração contêm exclusivamente o sacramento sagrado tradicional denominado <strong>AYAHUASCA</strong> (Santo Daime / Vegetal / Hoasca).
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <p>• <strong>Entidade Destinatária:</strong> {templo.nome} (CNPJ nº {templo.cnpj})</p>
              <p>• <strong>Endereço da Sede Litúrgica:</strong> {templo.cidade}</p>
              <p>• <strong>Origem do Feitio Sagrado:</strong> Cruzeiro do Sul/AC — Amazônia Ocidental (Cooperativa Nativaram)</p>
              <p>• <strong>Dirigente Litúrgico Responsável:</strong> {templo.dirigente}</p>
              <p>• <strong>Composição Botânica:</strong> Decocção aquosa pura de <em>Banisteriopsis caapi</em> (Cipó Jagube/Mariri) e <em>Psychotria viridis</em> (Folhas de Chacrona/Rainha), sem adição de nenhuma substância de síntese ou aditivo químico.</p>
            </div>

            <p>
              Atesta-se expressamente que a substância transportada <strong>NÃO CONSTITUI MERCADORIA</strong>, não possui finalidade comercial, revenda ou lucro, e destina-se única e exclusivamente às práticas religiosas, filosóficas e rituais da referida instituição confessional, nos termos garantidos pelo <strong>Artigo 5º, inciso VI da Constituição Federal de 1988</strong>, pela <strong>Resolução CONAD nº 01/2010</strong> e pelo <strong>Artigo 2º, parágrafo único da Lei Federal nº 11.343/2006</strong>.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs">
              <div>
                Local e Data: ________________________, _____ de ____________________ de 202___
              </div>
              <div className="text-center w-64 border-t border-slate-800 pt-1">
                <strong>Assinatura do Dirigente Responsável</strong>
                <p className="text-[11px] text-slate-600">{templo.nome}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
