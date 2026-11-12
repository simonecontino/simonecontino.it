export type HomeService = {
  id: string;
  category: "Pneumologia" | "Medicina del Sonno";
  title: string;
  description: string;
  bookingNote?: string;
  enabled: boolean;
  status: "planned" | "active";
  priceEur: number | null;
  priceConfirmed: boolean;
};

export const homeActivity = {
  areas: "Milano e Corsico",
  supplementNote: "Per alcune località o zone di difficile accesso potrebbe essere previsto un supplemento, comunicato prima della conferma dell'appuntamento.",
};

export const homeServices: HomeService[] = [
  { id: "visita-pneumologica-domiciliare", category: "Pneumologia", title: "Visita pneumologica domiciliare", description: "Valutazione specialistica dei problemi respiratori presso il domicilio. Modalità e appropriatezza vengono concordate prima dell’appuntamento.", enabled: true, status: "planned", priceEur: 180, priceConfirmed: true },
  { id: "visita-sonno-domiciliare", category: "Medicina del Sonno", title: "Visita domiciliare per disturbi respiratori del sonno", description: "Valutazione specialistica dedicata ai disturbi respiratori durante il sonno e al percorso di approfondimento appropriato.", enabled: true, status: "planned", priceEur: 180, priceConfirmed: true },
  { id: "televisita-pneumologica", category: "Pneumologia", title: "Televisita pneumologica", description: "Disponibile esclusivamente per casi selezionati, previa valutazione e accordo con lo specialista. La prestazione si svolge in videochiamata, tramite Google Meet o altra piattaforma concordata.", bookingNote: "Disponibile esclusivamente per casi selezionati, previa valutazione e accordo con lo specialista. La prestazione si svolge in videochiamata, tramite Google Meet o altra piattaforma concordata.", enabled: true, status: "planned", priceEur: 100, priceConfirmed: true },
  { id: "poligrafia-domiciliare", category: "Medicina del Sonno", title: "Poligrafia notturna domiciliare", description: "Registrazione notturna di parametri respiratori a domicilio, quando indicata dopo valutazione clinica. Non equivale alla polisonnografia completa.", bookingNote: "Non equivale alla polisonnografia completa.", enabled: true, status: "planned", priceEur: 220, priceConfirmed: true },
  { id: "saturimetria-domiciliare", category: "Medicina del Sonno", title: "Saturimetria notturna domiciliare", description: "Registrazione notturna dell’ossigenazione a domicilio. Indicazione e modalità operative vengono definite nel percorso specialistico.", enabled: true, status: "planned", priceEur: 100, priceConfirmed: true },
];
