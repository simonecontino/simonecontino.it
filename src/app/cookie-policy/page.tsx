import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Cookie policy", robots: { index: false, follow: false } };

export default function CookiePage() {
  return <section className="legal-page"><Container>
    <Breadcrumbs items={[{ label: "Cookie policy" }]} />
    <p className="eyebrow">Bozza da sottoporre a revisione legale</p>
    <h1>Cookie policy</h1>
    <aside className="urgent-note"><div><strong>Documento da sottoporre a revisione</strong><p>Questa informativa descrive il funzionamento tecnico predisposto e non sostituisce una verifica legale professionale.</p></div></aside>
    <h2>Preferenze tecniche nel browser</h2>
    <p>La scelta sui cookie è salvata nel localStorage con chiave <code>simone-contino-cookie-consent</code>, versione del consenso, preferenza analitica e data di aggiornamento. Non è un cookie: resta nel browser fino alla cancellazione o alla sostituzione della scelta; il codice attuale non imposta una scadenza automatica. Una versione non più valida richiede una nuova scelta.</p>
    <h2>Google Analytics</h2>
    <p>Google Analytics 4 è caricato solo in produzione, se configurato, e dopo l’accettazione dei cookie analitici. Prima della scelta non viene caricato lo script Google Analytics. Google Consent Mode v2 imposta inizialmente tutti i segnali su denied; soltanto analytics_storage passa a granted dopo l’accettazione. I segnali pubblicitari, di remarketing e di personalizzazione degli annunci restano negati.</p>
    <p>I cookie analitici possono avere nomi come <code>_ga</code> e <code>_ga_*</code>. Durata effettiva, conservazione dei dati, misurazioni avanzate e impostazioni del servizio Google devono essere verificate nell’account prima di considerare completa questa informativa. Il sito non deve trasmettere ad Analytics i valori dei campi del modulo o la prestazione richiesta.</p>
    <h2>Protezione antispam del modulo</h2>
    <p>Quando il modulo è attivo viene caricato Cloudflare Turnstile per distinguere le richieste umane da quelle automatizzate. La connessione a Cloudflare non avviene soltanto al clic di un link esterno e comporta il trattamento di segnali tecnici. I valori dei campi del modulo non sono inseriti dal sito nella verifica Siteverify. Cookie o altre tecnologie effettivamente utilizzati dipendono dalla configurazione del widget e devono essere verificati; non sono assimilati ai cookie di Google Analytics.</p>
    <p>Consulta l’<a href="https://www.cloudflare.com/turnstile-privacy-policy/" target="_blank" rel="noreferrer">informativa specifica Turnstile</a> e l’<a href="/privacy">informativa privacy del sito</a>.</p>
    <h2>Mappe, recensioni e collegamenti esterni</h2>
    <p>I link a Google Maps e alle agende esterne aprono servizi gestiti dai rispettivi fornitori. Separatamente, se le recensioni Google sono configurate, i contenuti vengono richiesti dal server e le eventuali fotografie pubbliche degli autori possono essere caricate direttamente da Google nel browser, anche senza clic sui collegamenti. Non è quindi corretto affermare che tutte le risorse esterne siano caricate soltanto dopo un clic.</p>
    <h2>Gestione delle preferenze</h2>
    <p>È possibile accettare, rifiutare o personalizzare la scelta dal banner. Il collegamento “Gestisci cookie” nel footer riapre il pannello. La revoca aggiorna analytics_storage su denied e tenta di eliminare i cookie _ga accessibili al sito. Non cancella retroattivamente i dati già trasmessi a Google. Il blocco completo delle richieste dopo una revoca va verificato anche nelle transizioni tra le pagine.</p>
    <p className="legal-updated">Ultimo aggiornamento della bozza: 12 novembre 2026</p>
  </Container></section>;
}
