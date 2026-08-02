import type { Service } from "@/types/content";

const spirometryReference = [{ label: "NHS — Spirometry", url: "https://www.nhs.uk/tests-and-treatments/spirometry/" }];
const sleepReference = [{ label: "NHS — Sleep apnoea", url: "https://www.nhs.uk/conditions/sleep-apnoea/" }];

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
    preparation: ["Non sospendere farmaci senza istruzioni", "Seguire le indicazioni ricevute alla prenotazione"], availabilityConfirmed: false, references: spirometryReference,
  },
  {
    title: "Poligrafia notturna", slug: "poligrafia-notturna",
    description: "Monitoraggio cardiorespiratorio notturno utilizzato in percorsi selezionati per sospette apnee.",
    purpose: "Registrare durante il sonno parametri utili alla valutazione dei disturbi respiratori notturni.",
    whatToExpect: ["Applicazione di sensori", "Registrazione notturna", "Analisi medica del tracciato nel contesto clinico"],
    preparation: ["Seguire le istruzioni specifiche", "Mantenere, se possibile, le abituali condizioni di sonno", "Segnalare terapie e dispositivi già utilizzati"], availabilityConfirmed: false, references: sleepReference,
  },
  {
    title: "Follow-up CPAP", slug: "follow-up-cpap",
    description: "Controllo clinico e tecnico della terapia a pressione positiva già prescritta.",
    purpose: "Valutare utilizzo, beneficio, comfort, perdite e dati disponibili nel contesto dei sintomi.",
    whatToExpect: ["Revisione dell’esperienza d’uso", "Controllo dei dati disponibili", "Valutazione di maschera e comfort", "Indicazioni per i passaggi successivi"],
    preparation: ["Portare dispositivo e maschera se richiesto", "Portare report o accesso ai dati", "Annotare problemi e orari di utilizzo"], availabilityConfirmed: true,
  },
  {
    title: "Lettura e interpretazione dei report CPAP", slug: "lettura-report-cpap",
    description: "Valutazione dei dati registrati dal dispositivo nel contesto clinico e dei sintomi.",
    purpose: "Comprendere utilizzo, eventi residui, perdite e altri indicatori utili al follow-up.",
    whatToExpect: ["Revisione del report", "Confronto con sintomi e tollerabilità", "Indicazioni sugli eventuali passaggi successivi"],
    preparation: ["Portare il report più recente", "Portare il dispositivo se richiesto", "Non modificare autonomamente i parametri"], availabilityConfirmed: true,
  },
];
