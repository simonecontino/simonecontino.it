import type { ArticlePreview, Faq, Problem } from "@/types/content";

export const problems: Problem[] = [
  { title: "Tosse persistente", slug: "tosse-persistente", description: "Quando la tosse dura nel tempo o tende a ripresentarsi." },
  { title: "Fiato corto", slug: "fiato-corto", description: "Affanno, dispnea o difficoltà respiratoria a riposo o sotto sforzo." },
  { title: "Russamento", slug: "russamento", description: "Russamento abituale, pause respiratorie riferite o sonno disturbato." },
  { title: "Sonnolenza diurna", slug: "sonnolenza-diurna", description: "Stanchezza, cali di attenzione o sonno non ristoratore." },
  { title: "Asma", slug: "asma", description: "Respiro sibilante, senso di costrizione o sintomi già diagnosticati." },
  { title: "BPCO", slug: "bpco", description: "Valutazione e continuità di cura della broncopneumopatia cronica." },
  { title: "Infezioni ricorrenti", slug: "infezioni-respiratorie-ricorrenti", description: "Bronchiti o infezioni delle vie respiratorie che si ripetono." },
  { title: "Valutazione pneumologica", slug: "valutazione-pneumologica", description: "Per comprendere sintomi, esami o una patologia respiratoria nota." },
];

export const articles: ArticlePreview[] = [
  { title: "Tosse persistente: quando parlarne con lo pneumologo", slug: "tosse-persistente-quando-visita", category: "Tosse e dispnea", description: "Una guida ai segnali da osservare e alle informazioni utili durante la valutazione.", date: "[DATA DA DEFINIRE]", readingTime: "5 min", draft: true },
  { title: "Russamento e apnee notturne non sono la stessa cosa", slug: "russamento-apnee-differenze", category: "Disturbi respiratori del sonno", description: "Differenze, sintomi associati e ruolo della valutazione specialistica.", date: "[DATA DA DEFINIRE]", readingTime: "6 min", draft: true },
  { title: "Spirometria: che cos’è e come si svolge", slug: "spirometria-come-si-svolge", category: "Esami respiratori", description: "Cosa misura l’esame e perché può essere indicato in un percorso pneumologico.", date: "[DATA DA DEFINIRE]", readingTime: "4 min", draft: true },
];

export const faqs: Faq[] = [
  { question: "Quando è utile prenotare una visita pneumologica?", answer: "Una valutazione può essere utile in presenza di tosse persistente, fiato corto, respiro sibilante, infezioni ricorrenti, russamento con pause respiratorie riferite o per il controllo di una patologia respiratoria già nota." },
  { question: "Quali documenti devo portare?", answer: "Porta la cartella clinica completa, l’imaging toracico disponibile e l’elenco aggiornato delle terapie. Gli esami possono essere consegnati fisicamente o tramite email." },
  { question: "Serve l’impegnativa?", answer: "No, per la visita non serve l’impegnativa." },
  { question: "Quanto dura una visita?", answer: "La prima visita dura indicativamente 45 minuti. La visita di controllo dura indicativamente 30–40 minuti." },
  { question: "Come si svolge una valutazione per russamento o apnee?", answer: "Il percorso parte dalla storia dei sintomi notturni e diurni. In base alla valutazione clinica possono essere indicati approfondimenti appropriati; modalità e disponibilità devono essere confermate in fase di prenotazione." },
  { question: "Posso prenotare un controllo per la CPAP?", answer: "Sì. Sono disponibili il follow-up della terapia CPAP e la lettura e interpretazione dei report del dispositivo." },
  { question: "Dove si svolgono le visite?", answer: "Le visite si svolgono presso l’Ospedale San Carlo Milano, in Via Pio II, 3, 20153 Milano." },
];
