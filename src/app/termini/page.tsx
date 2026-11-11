import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Condizioni d’uso", robots: { index: false, follow: true } };

export default function TermsPage() {
  return (
    <section className="legal-page">
      <Container>
        <Breadcrumbs items={[{ label: "Condizioni d’uso" }]} />
        <p className="eyebrow">Bozza da sottoporre a revisione legale</p>
        <h1>Condizioni d’uso</h1>
        <aside className="urgent-note"><div><strong>Documento non definitivo</strong><p>Questa pagina non costituisce consulenza legale e deve essere verificata prima di essere considerata definitiva.</p></div></aside>
        <h2>Finalità del sito</h2>
        <p>I contenuti del sito hanno finalità informative e organizzative. Non sostituiscono una visita, una diagnosi o un trattamento medico e non devono essere utilizzati per gestire emergenze.</p>
        <h2>Contenuti Google Maps</h2>
        <p>Valutazioni, recensioni, nomi pubblici e altri elementi attribuiti a Google Maps sono forniti tramite Google Maps Platform e restano soggetti alle <a href="https://cloud.google.com/maps-platform/terms" target="_blank" rel="noreferrer">condizioni di Google Maps Platform</a>, alle <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Condizioni di servizio Google</a> e alla <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy di Google</a>.</p>
        <p>Le recensioni vengono visualizzate senza modificarne il contenuto e nell’ordine di rilevanza restituito da Google. Ogni recensione rimanda alla propria fonte su Google Maps.</p>
        <h2>Collegamenti esterni</h2>
        <p>Il sito contiene collegamenti a servizi esterni, tra cui Google Maps e Google Calendar. Quando si segue un collegamento esterno si applicano le condizioni e le politiche del relativo fornitore.</p>
        <h2>Responsabilità e aggiornamenti</h2>
        <p>[COMPLETARE LIMITI DI RESPONSABILITÀ, LEGGE APPLICABILE E MODALITÀ DI AGGIORNAMENTO DOPO REVISIONE LEGALE]</p>
        <p className="legal-updated">Ultimo aggiornamento: 9 ottobre 2026</p>
      </Container>
    </section>
  );
}
