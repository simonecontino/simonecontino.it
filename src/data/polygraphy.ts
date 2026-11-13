export const polygraphy = {
  path: "/poligrafia-notturna",
  serviceId: "poligrafia-domiciliare",
  steps: [
    { title: "Preparazione", text: "Ricevi le istruzioni per utilizzare il dispositivo e posizionare correttamente i sensori. Segui le indicazioni concordate con lo specialista." },
    { title: "Registrazione notturna", text: "Il monitoraggio viene effettuato durante la notte, nel tuo ambiente domestico. I sensori registrano i segnali previsti dal dispositivo." },
    { title: "Restituzione", text: "Al termine della registrazione il dispositivo viene restituito secondo le modalità concordate." },
    { title: "Analisi e refertazione", text: "I segnali vengono controllati e interpretati dallo specialista per identificare eventuali alterazioni respiratorie e valutarne il significato clinico." },
  ],
  faqs: [
    { question: "La poligrafia notturna è dolorosa?", answer: "È una registrazione non invasiva, senza aghi. I sensori possono dare un lieve fastidio o richiedere un breve adattamento; eventuali difficoltà vanno segnalate al personale che fornisce le istruzioni." },
    { question: "È possibile dormire normalmente durante l’esame?", answer: "Si cerca di mantenere le consuete abitudini di sonno, seguendo le istruzioni ricevute. I sensori possono modificare il comfort. Se dormi poco o incontri difficoltà, riferiscilo: è importante per interpretare la registrazione." },
    { question: "Qual è la differenza tra poligrafia e polisonnografia?", answer: "La poligrafia registra soprattutto segnali respiratori e cardiocircolatori. La polisonnografia comprende anche segnali neurofisiologici, come attività cerebrale, movimenti oculari e attività muscolare, che consentono di valutare le fasi del sonno e i risvegli." },
    { question: "Una sola notte di registrazione è sufficiente?", answer: "Una notte tecnicamente adeguata può essere sufficiente in pazienti selezionati. Gli eventi possono variare tra notti diverse: un risultato negativo o non conclusivo non esclude necessariamente un disturbo, soprattutto se il sospetto clinico rimane elevato. Può essere indicata una polisonnografia." },
    { question: "Cosa succede se l’esame non registra correttamente?", answer: "Lo specialista verifica qualità e completezza dei segnali. Se la registrazione è inadeguata, valuta se occorra ripeterla o scegliere un accertamento diverso, come la polisonnografia. Non è possibile garantire un risultato interpretabile in ogni registrazione." },
    { question: "La poligrafia può diagnosticare tutte le forme di apnea del sonno?", answer: "No. Utilità e limiti dipendono dai segnali registrati e dal quadro clinico. Non sostituisce tutti gli studi del sonno: in presenza di particolari malattie associate o sospetti disturbi complessi possono servire polisonnografia e altri approfondimenti." },
  ],
};

type ConfirmableEquipment = {
  confirmed: boolean;
  manufacturer: string | null;
  model: string | null;
  image: string | null;
  description: string | null;
  benefits: string[];
};

// Nox T3s è soltanto un’ipotesi: nessun modello o immagine è confermato.
// Compilare i dati verificati e impostare confirmed a true per mostrare la sezione.
export const polygraphyEquipment: ConfirmableEquipment = {
  confirmed: false, manufacturer: null, model: null, image: null, description: null, benefits: [],
};
