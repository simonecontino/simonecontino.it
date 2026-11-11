import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Privacy policy", robots: { index: false, follow: false } };

export default function PrivacyPage() {
  return (
    <section className="legal-page">
      <Container>
        <Breadcrumbs items={[{ label: "Privacy policy" }]} />
        <p className="eyebrow">Bozza da sottoporre a revisione legale</p>
        <h1>Privacy policy</h1>
        <aside className="urgent-note">
          <div><strong>Documento non definitivo</strong><p>Questa struttura non costituisce consulenza legale e deve essere completata dopo aver definito titolare, hosting, modulo contatti ed eventuali servizi esterni.</p></div>
        </aside>
        <h2>1. Titolare del trattamento</h2>
        <p>[INSERIRE DATI PROFESSIONALI DEL TITOLARE E RECAPITO PRIVACY]</p>
        <h2>2. Dati trattati</h2>
        <p>Il sito è progettato per minimizzare i dati raccolti. I dati tecnici di navigazione dipendono dal fornitore di hosting. Quando attivo, il modulo richiede nome, cognome, email, prestazione e preferenza di contatto; telefono e note organizzative sono facoltativi, salvo il telefono necessario se si richiede di essere richiamati. Le richieste sono trasmesse alla casella professionale senza un database applicativo. Il modulo resta disabilitato fino alla verifica del servizio email e di questa informativa.</p>
        <p>Il flusso predisposto utilizza Resend per l’invio email e Cloudflare Turnstile per la verifica antispam. Prima dell’attivazione occorre completare la valutazione dei fornitori, dei trasferimenti e dei tempi di conservazione nelle rispettive piattaforme e nella casella email. I dati dei campi non vengono inviati a strumenti di analytics dal modulo.</p>
        <h2>3. Dati sanitari</h2>
        <p>Il sito non è destinato alla raccolta di dati relativi alla salute. Gli utenti sono invitati a non inserire informazioni sanitarie sensibili nei messaggi generici.</p>
        <h2>4. Google Maps e recensioni</h2>
        <p>La homepage può mostrare valutazioni e recensioni pubbliche fornite da Google Maps Platform tramite Places API. I dati vengono richiesti dal server e conservati temporaneamente nella cache tecnica. Le attribuzioni pubbliche degli autori, incluse eventuali immagini del profilo, provengono da Google e possono comportare una connessione ai servizi Google durante la visualizzazione.</p>
        <p>Il trattamento e la visualizzazione dei contenuti Google sono soggetti alle <a href="https://cloud.google.com/maps-platform/terms" target="_blank" rel="noreferrer">condizioni di Google Maps Platform</a> e alla <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy di Google</a>. I collegamenti alle recensioni aprono pagine esterne gestite da Google.</p>
        <h2>5. Finalità, base giuridica e conservazione</h2>
        <p>[DEFINIRE FINALITÀ, BASI GIURIDICHE E TEMPI DI CONSERVAZIONE DOPO LA REVISIONE DEI SERVIZI]</p>
        <h2>6. Destinatari e trasferimenti</h2>
        <p>[ELENCARE HOSTING, GOOGLE MAPS PLATFORM, RESEND, CLOUDFLARE TURNSTILE ED EVENTUALI RESPONSABILI]</p>
        <h2>7. Diritti dell’interessato</h2>
        <p>[COMPLETARE DIRITTI, MODALITÀ DI ESERCIZIO E RECLAMO AL GARANTE]</p>
        <p className="legal-updated">Ultimo aggiornamento: 11 novembre 2026</p>
      </Container>
    </section>
  );
}
