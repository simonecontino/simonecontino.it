import type { Service } from "@/types/content";

const spirometryReference = [{ label: "NHS — Spirometry", url: "https://www.nhs.uk/tests-and-treatments/spirometry/" }];

export const services: Service[] = [
  {
    title: "Prima visita pneumologica", slug: "prima-visita-pneumologica",
    description: "Valutazione specialistica iniziale di sintomi, esami o patologie respiratorie.",
    purpose: "Comprendere il problema, raccogliere la storia clinica e definire gli approfondimenti appropriati.",
    whatToExpect: ["Colloquio clinico", "Esame obiettivo", "Revisione della documentazione", "Indicazioni sui passaggi successivi"],
    preparation: ["Portare la cartella clinica completa", "Portare l’imaging toracico disponibile", "Preparare l’elenco dei farmaci"], availabilityConfirmed: true,
  },
  {
    title: "Visita pneumologica di controllo", slug: "visita-pneumologica-controllo",
    description: "Rivalutazione di sintomi, terapia ed esami dopo una prima visita o nel follow-up di una patologia nota.",
    purpose: "Verificare l’andamento clinico e aggiornare le indicazioni successive.",
    whatToExpect: ["Confronto con la valutazione precedente", "Revisione di nuovi esami", "Controllo della terapia", "Pianificazione del follow-up"],
    preparation: ["Portare la documentazione aggiornata", "Portare gli esami eseguiti", "Segnalare cambiamenti nei sintomi o nella terapia"], availabilityConfirmed: true,
  },
  {
    title: "Spirometria semplice", slug: "spirometria-semplice",
    description: "Esame della funzione respiratoria che misura volumi e flussi durante manovre guidate.",
    purpose: "Supportare la valutazione di sintomi e condizioni come asma o BPCO.",
    whatToExpect: ["Indicazioni dell’operatore", "Respiri e soffi attraverso un boccaglio", "Ripetizione delle manovre per ottenere misure affidabili"],
    preparation: ["Seguire le indicazioni ricevute sui farmaci", "Segnalare infezioni o condizioni recenti", "Non sospendere terapie autonomamente"], availabilityConfirmed: true, references: spirometryReference,
  },
  {
    title: "Spirometria globale pletismografica", slug: "spirometria-globale-pletismografica",
    description: "Valutazione più completa dei volumi polmonari mediante tecnica pletismografica.",
    purpose: "Misurare volumi non rilevabili con la sola spirometria semplice e approfondire quadri funzionali selezionati.",
    whatToExpect: ["Manovre respiratorie guidate", "Esecuzione all’interno della cabina pletismografica", "Ripetizione delle misure per verificarne l’affidabilità"],
    preparation: ["Seguire le istruzioni ricevute alla prenotazione", "Segnalare condizioni recenti rilevanti", "Portare precedenti test funzionali"], availabilityConfirmed: true,
  },
  {
    title: "Test di diffusione del monossido di carbonio (DLCO)", slug: "test-diffusione-dlco",
    description: "Esame funzionale che valuta il trasferimento dei gas attraverso la membrana alveolo-capillare.",
    purpose: "Approfondire lo scambio gassoso in percorsi clinici selezionati.",
    whatToExpect: ["Respiri attraverso un boccaglio", "Breve apnea durante una manovra guidata", "Ripetizione delle misure quando necessario"],
    preparation: ["Seguire le istruzioni specifiche ricevute", "Segnalare fumo recente e condizioni cliniche", "Portare esami funzionali precedenti"], availabilityConfirmed: true,
  },
  {
    title: "Test di broncodilatazione", slug: "test-broncodilatazione",
    description: "Confronto della funzione respiratoria prima e dopo un farmaco broncodilatatore.",
    purpose: "Valutare la variazione dei flussi respiratori dopo broncodilatatore in quesiti clinici selezionati.",
    whatToExpect: ["Spirometria iniziale", "Somministrazione del broncodilatatore", "Attesa prevista dal protocollo", "Ripetizione della spirometria"],
    preparation: ["Non utilizzare la terapia inalatoria nelle 24–48 ore precedenti", "Non fumare"], availabilityConfirmed: false,
  },
  {
    title: "Poligrafia notturna", slug: "poligrafia-notturna",
    description: "Monitoraggio cardiorespiratorio notturno utilizzato in percorsi selezionati per sospette apnee.",
    purpose: "Registrare durante il sonno parametri utili alla valutazione dei disturbi respiratori notturni.",
    whatToExpect: ["Applicazione di sensori", "Registrazione notturna", "Analisi medica del tracciato nel contesto clinico"],
    preparation: ["Seguire le istruzioni specifiche", "Mantenere, se possibile, le abituali condizioni di sonno", "Segnalare terapie e dispositivi già utilizzati"], availabilityConfirmed: false,
  },
  {
    title: "Follow-up CPAP", slug: "follow-up-cpap",
    description: "Controllo clinico e tecnico della terapia a pressione positiva già prescritta.",
    purpose: "Valutare utilizzo, beneficio, comfort, perdite e dati disponibili nel contesto dei sintomi.",
    whatToExpect: ["Revisione dell’esperienza d’uso", "Controllo dei dati disponibili", "Valutazione di maschera e comfort", "Indicazioni per i passaggi successivi"],
    preparation: ["Portare dispositivo e maschera se richiesto", "Portare report o accesso ai dati", "Annotare problemi e orari di utilizzo"], availabilityConfirmed: true,
  },
  {
    title: "Lettura e interpretazione dei report CPAP, BiPAP e NIV", slug: "lettura-report-cpap",
    description: "Valutazione dei dati registrati da dispositivi CPAP, BiPAP e di ventilazione non invasiva (NIV) nel contesto clinico e dei sintomi.",
    purpose: "Comprendere utilizzo, eventi residui, perdite, ventilazione e altri indicatori utili al follow-up della CPAP o della NIV.",
    whatToExpect: ["Revisione del report", "Confronto con sintomi e tollerabilità", "Indicazioni sugli eventuali passaggi successivi"],
    preparation: ["Portare il report più recente", "Portare il dispositivo se richiesto", "Non modificare autonomamente i parametri"], availabilityConfirmed: true,
  },
  {
    title: "Test di broncoprovocazione con metacolina", slug: "test-broncoprovocazione-metacolina",
    description: "Test funzionale che valuta la reattività delle vie aeree mediante dosi progressive di metacolina.",
    purpose: "Approfondire il sospetto di iperreattività bronchiale quando anamnesi e spirometria di base non sono conclusive.",
    whatToExpect: ["Spirometria iniziale", "Somministrazioni progressive secondo protocollo", "Spirometrie ripetute", "Broncodilatatore al termine quando previsto"],
    preparation: ["Seguire le indicazioni specifiche sui farmaci", "Non fumare prima dell’esame", "Segnalare infezioni recenti o variazioni cliniche"], availabilityConfirmed: false,
  },
  {
    title: "Test del cammino dei 6 minuti (6MWT)", slug: "test-cammino-6mwt",
    description: "Valutazione standardizzata della capacità funzionale durante sei minuti di cammino.",
    purpose: "Misurare la tolleranza allo sforzo e osservare sintomi, distanza percorsa e ossigenazione durante un’attività controllata.",
    whatToExpect: ["Misurazioni prima del test", "Cammino per sei minuti secondo indicazioni", "Monitoraggio di sintomi e parametri", "Valutazione al termine"],
    preparation: ["Indossare abiti e scarpe comodi", "Portare gli ausili abitualmente utilizzati", "Seguire le indicazioni ricevute sulle terapie"], availabilityConfirmed: false,
  },
  {
    title: "Saturimetria notturna", slug: "saturimetria-notturna",
    description: "Registrazione dell’ossigenazione e della frequenza cardiaca durante la notte.",
    purpose: "Valutare l’andamento notturno della saturazione in quesiti clinici selezionati.",
    whatToExpect: ["Applicazione del sensore", "Registrazione durante la notte", "Analisi del tracciato nel contesto clinico"],
    preparation: ["Seguire le istruzioni per il dispositivo", "Mantenere le abituali condizioni di sonno", "Segnalare ossigenoterapia o ventilazione già prescritte"], availabilityConfirmed: false,
  },
  {
    title: "Skin prick test", slug: "skin-prick-test",
    description: "Test cutaneo per valutare la sensibilizzazione verso allergeni selezionati.",
    purpose: "Supportare l’inquadramento allergologico quando il risultato può orientare il percorso respiratorio.",
    whatToExpect: ["Applicazione di estratti allergenici sulla cute", "Puntura superficiale", "Lettura della risposta cutanea dopo il tempo previsto"],
    preparation: ["Seguire le indicazioni ricevute sui farmaci antistaminici", "Segnalare terapie e reazioni recenti", "Non sospendere farmaci senza istruzioni"], availabilityConfirmed: false,
  },
  {
    title: "Emogasanalisi arteriosa", slug: "emogasanalisi-arteriosa",
    description: "Prelievo arterioso per misurare ossigeno, anidride carbonica, pH e altri parametri dell’equilibrio acido-base.",
    purpose: "Valutare in modo diretto ossigenazione e ventilazione in condizioni cliniche selezionate.",
    whatToExpect: ["Prelievo da un’arteria, solitamente al polso", "Compressione della sede dopo il prelievo", "Interpretazione dei valori nel contesto clinico"],
    preparation: ["Segnalare terapie anticoagulanti", "Comunicare l’uso di ossigeno o ventilazione", "Seguire le istruzioni specifiche ricevute"], availabilityConfirmed: false,
  },
];
