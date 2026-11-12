import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Privacy policy", robots: { index: false, follow: false } };

export default function PrivacyPage() {
  return (
    <section className="legal-page">
      <Container>
        <Breadcrumbs items={[{ label: "Privacy policy" }]} />
        <p className="eyebrow">Bozza da sottoporre a revisione legale</p>
        <h1>Privacy policy</h1>
        <aside className="urgent-note">
          <div><strong>Informativa in revisione</strong><p>Il testo descrive il modulo di solo ricontatto, senza selezione della prestazione o messaggi liberi. Non costituisce una certificazione di conformità; restano da verificare le condizioni applicabili ai fornitori.</p></div>
        </aside>
        <h2>1. Titolare del trattamento</h2>
        <p>Il titolare del trattamento è il {siteConfig.name}. Per informazioni sul trattamento dei dati e per esercitare i propri diritti è possibile scrivere a <a href={siteConfig.emailHref}>{siteConfig.email}</a>.</p>
        <h2>2. Dati trattati</h2>
        <p>Il modulo di ricontatto richiede nome, cognome, email e preferenza di contatto. Il telefono è facoltativo se si sceglie il contatto via email, necessario se si chiede di essere richiamati. Non sono presenti campi per prestazioni, sintomi, diagnosi, messaggi liberi o allegati. I dati vengono elaborati dal server e trasmessi alla casella del titolare tramite email, senza un database applicativo. Sono inoltre trattati i dati tecnici necessari al funzionamento e alla protezione del sito, secondo i servizi utilizzati.</p>
        <p>Il flusso predisposto utilizza Resend per l’invio email e Cloudflare Turnstile per la verifica antispam. Prima dell’attivazione occorre completare la valutazione dei fornitori, dei trasferimenti e dei tempi di conservazione nelle rispettive piattaforme e nella casella email. Il codice del modulo non invia esplicitamente i valori dei campi ad Analytics; le impostazioni di misurazione automatica del servizio devono essere verificate separatamente prima dell’uso pubblico.</p>
        <h2>3. Dati sanitari</h2>
        <p>Non inserire sintomi, diagnosi, terapie, referti o altri dettagli sanitari nei campi del modulo. Non sono previsti allegati, diagnosi online o gestione della documentazione clinica.</p>
        <p>La selezione della prestazione e le note sono state eliminate per ridurre le informazioni raccolte. Questo non esclude automaticamente ogni possibile inferenza dal contesto sanitario del sito: resta da verificare l’eventuale applicazione dell’articolo 9 del GDPR e la compatibilità del trattamento effettivo con le condizioni dei fornitori. I dettagli della prestazione non vengono richiesti tramite il modulo e saranno concordati separatamente.</p>
        <h2>4. Google Maps e recensioni</h2>
        <p>La homepage può mostrare valutazioni e recensioni pubbliche fornite da Google Maps Platform tramite Places API. I dati vengono richiesti dal server e conservati temporaneamente nella cache tecnica. Le attribuzioni pubbliche degli autori, incluse eventuali immagini del profilo, provengono da Google e possono comportare una connessione ai servizi Google durante la visualizzazione.</p>
        <p>Il trattamento e la visualizzazione dei contenuti Google sono soggetti alle <a href="https://cloud.google.com/maps-platform/terms" target="_blank" rel="noreferrer">condizioni di Google Maps Platform</a> e alla <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy di Google</a>. I collegamenti alle recensioni aprono pagine esterne gestite da Google.</p>
        <h2>5. Finalità, base giuridica e conservazione</h2>
        <p>Il modulo serve esclusivamente a richiedere un ricontatto del titolare. L’invio non costituisce conferma di prenotazione. I campi obbligatori sono necessari per rispondere; senza di essi non è possibile inviare il modulo, ma restano disponibili gli altri recapiti pubblicati sul sito.</p>
        <p>La base giuridica proposta per la gestione della richiesta è l’esecuzione di misure precontrattuali richieste dall’interessato (articolo 6, paragrafo 1, lettera b del GDPR); per i controlli di sicurezza e antispam è proposta la tutela del legittimo interesse alla sicurezza del servizio (articolo 6, paragrafo 1, lettera f). Queste basi richiedono verifica rispetto al trattamento effettivo prima dell’attivazione.</p>
        <p>La casella di presa visione dell’informativa non costituisce consenso al marketing, consenso informato sanitario o, da sola, consenso esplicito al trattamento di categorie particolari di dati. Il sito non richiede iscrizioni a comunicazioni promozionali tramite questo modulo.</p>
        <p>Il periodo stabilito dal titolare per le richieste organizzative nella casella email è di 30 giorni dalla conclusione della loro gestione, salvo obblighi di conservazione applicabili o necessità documentate di tutela di un diritto. Tale termine non riguarda la documentazione clinica. La cancellazione dalla casella, dal cestino e dalle eventuali copie deve essere gestita dal titolare: il sito non esegue cancellazioni automatiche delle email.</p>
        <p>I tempi di conservazione dei log, delle copie e dei dati presso i fornitori devono essere verificati separatamente; il termine di 30 giorni non viene automaticamente applicato alle loro piattaforme.</p>
        <h2>6. Destinatari e trasferimenti</h2>
        <p>Il flusso tecnico predisposto coinvolge Vercel per l’hosting e l’elaborazione della richiesta, Resend per trasmettere la notifica email, Google Gmail per la casella destinataria e Cloudflare Turnstile per la verifica antispam. Turnstile tratta dati tecnici necessari alla verifica; i campi del modulo non vengono inseriti dal sito nella richiesta di verifica antispam. Google Maps Platform fornisce i contenuti pubblici descritti sopra.</p>
        <p>Prima dell’attivazione occorre verificare i soggetti contrattuali effettivi, i rispettivi ruoli, gli accordi sul trattamento, le localizzazioni, gli eventuali trasferimenti fuori dallo Spazio economico europeo e le relative garanzie. La regione di invio scelta in Resend non dimostra da sola che ogni trattamento avvenga esclusivamente nell’Unione europea.</p>
        <p>La casella destinataria confermata dal titolare è un account Gmail standard. Non è stata verificata la disponibilità, per questo account, degli accordi e delle garanzie di un servizio professionale di posta. Non vengono quindi dichiarate approvate le condizioni di trattamento dei fornitori.</p>
        <p>Documentazione dei fornitori: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Vercel</a>, <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noreferrer">Resend</a>, <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">Cloudflare</a> e <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google</a>. Per cookie e analytics consulta la <a href="/cookie-policy">Cookie policy</a>.</p>
        <h2>7. Diritti dell’interessato</h2>
        <p>Nei casi e nei limiti previsti dal GDPR è possibile chiedere accesso, rettifica, cancellazione, limitazione del trattamento e portabilità dei dati, nonché opporsi al trattamento quando applicabile. Per le richieste scrivere a <a href={siteConfig.emailHref}>{siteConfig.email}</a>. Quando il trattamento si fonda sul consenso, questo può essere revocato senza pregiudicare la liceità del trattamento precedente.</p>
        <p>È possibile proporre reclamo al <a href="https://www.garanteprivacy.it/" target="_blank" rel="noreferrer">Garante per la protezione dei dati personali</a>. Il modulo non effettua diagnosi o decisioni automatizzate sul paziente.</p>
        <p className="legal-updated">Ultimo aggiornamento della bozza: 12 novembre 2026</p>
      </Container>
    </section>
  );
}
