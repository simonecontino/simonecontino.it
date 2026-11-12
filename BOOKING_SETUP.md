# Navigazione, articoli e richieste appuntamento

## Pagina unificata

Pagina: `/prestazioni-e-prenotazioni`, con ancore `#prestazioni`, `#richiedi-appuntamento`, `#whatsapp`. Configurazione URL in `src/config/booking.ts`. I vecchi URL `/prenota` e `/prestazioni-e-tariffe` reindirizzano permanentemente (308) senza perdere i contenuti del catalogo.

Il modulo raccoglie solo recapiti e preferenza di contatto. Il catalogo non contiene pulsanti Prenota ripetuti: non vengono preselezionate o trasmesse prestazioni; non sono presenti note, messaggi o allegati. Il server rifiuta anche i precedenti campi service/notes inviati manualmente. Catalogo e modulo sono affiancati da 960px; su mobile il modulo precede il catalogo. Introduzione compatta, senza menu di ancore e senza barra flottante nella stessa pagina. Gli URL con le ancore precedenti restano validi.

Le prestazioni restano in `src/data/home-services.ts`: enabled controlla card e select; status planned diventa «Disponibilità da concordare» e non equivale ad attivazione. Tariffe confermate: visita pneumologica 180 €, visita per disturbi respiratori del sonno 180 €, poligrafia notturna 220 €, saturimetria notturna 100 €. Sono le sole quattro opzioni del catalogo e del modulo. Il controllo CPAP rimane trattato nelle pagine informative, ma non è nel listino.

## Articoli reversibili

`src/config/features.ts`: impostare `features.articlesEnabled = true` e ricostruire il sito per riattivare menu, home, route e sitemap. MDX, dati, template e componenti conservati. Durante la disattivazione indice e dettagli restituiscono 404 con noindex, senza redirect verso pagine non pertinenti. Gli URL potranno quindi essere rimossi dall’indice e richiedere nuova scansione alla riattivazione. Nessuna ricerca interna presente.

## WhatsApp e telefono

Il numero non è nel testo visibile, nei link tel o nei dati strutturati. L’URL WhatsApp è costruito esclusivamente sul server da `WHATSAPP_BUSINESS_NUMBER` (fallback al numero professionale già configurato), con messaggio organizzativo precompilato. L’URL wa.me rende comunque il numero conoscibile: non è un recapito segreto. Non pubblicare un’agenda non verificata.

## Attivazione del modulo (disabilitato per default)

Adapter Resend tramite fetch lato server, senza SDK o nuove dipendenze. Il 12 novembre 2026 il titolare ha confermato la ricezione della prova tecnica nella casella professionale e ha autorizzato la pubblicazione della versione di solo ricontatto. Non sono stati accettati accordi per conto del titolare né attestata conformità legale; le verifiche contrattuali indicate in PRIVACY_REVIEW.md restano aperte.

Variabili private:

- `RESEND_API_KEY`: chiave di invio del dominio verificato.
- `APPOINTMENT_FROM_EMAIL`: mittente verificato, ad esempio un indirizzo sul proprio dominio (non inventato nel codice).
- `APPOINTMENT_TO_EMAIL`: destinatario; fallback alla email professionale centralizzata.
- `TURNSTILE_SITE_KEY`: identificativo pubblico del widget, passato al client solo se attivo.
- `TURNSTILE_SECRET_KEY`: segreto per Siteverify, solo server.
- `WHATSAPP_BUSINESS_NUMBER`: numero internazionale senza +.
- `APPOINTMENT_OWNER_APPROVED=true`: autorizzazione operativa del titolare alla versione minimale dopo esposizione dei rischi residui. Non è una certificazione legale. Il precedente flag APPOINTMENT_PRIVACY_VERIFIED non viene impostato né usato per attestare verifiche mai eseguite.
- `APPOINTMENT_EMAIL_VERIFIED=true`: solo dopo configurazione e prova controllata della consegna.
- `APPOINTMENT_FORM_ENABLED=true`: interruttore finale di attivazione.

Tutte le condizioni devono essere soddisfatte: diversamente la UI disabilita il form e l’endpoint restituisce 503 anche per POST diretto. Configurare su Vercel senza prefissi NEXT_PUBLIC e senza committare credenziali. Verificare SPF/DKIM del mittente. La pagina è dinamica per leggere la configurazione server effettiva; la modifica di variabili Vercel richiede nuovo deployment.

Per una prova controllata usare ambiente locale/staging e destinatario di test autorizzato, completare privacy e provider prima di impostare i flag. Verificare inbox/spam: un HTTP 200 attesta l’accettazione del provider, non la consegna finale. Nessuna conferma email al paziente implementata: la conferma richiesta è mostrata sul sito.

## Sicurezza e dati

Validazione client e server, limiti sui campi e body (12 KB letti come stream), preferenza ammessa, controllo Origin, honeypot e Turnstile obbligatorio con hostname/action. Il telefono diventa necessario scegliendo contatto telefonico. Nessuna prestazione o testo libero viene accettato o inserito in email. Nome/cognome/email rifiutano CR/LF; email in testo semplice. Le risposte positive di Resend devono contenere un ID prima di mostrare successo.

Nessun database, nessun log con contenuto delle richieste, nessun evento analytics contenente campi o scelta clinica. Le email restano nella casella del destinatario/provider: definirne conservazione e accessi prima dell’attivazione. Disabilitare in GA le misurazioni avanzate automatiche dei moduli se configurate: non sono gestite da questo endpoint. La richiesta può indirettamente rivelare un interesse sanitario e va trattata con adeguate misure.

Turnstile verifica sul server un token monouso prima di chiamare Resend; è il controllo antispam distribuito (nessun rate limiter in memoria spacciato per persistente). Se necessario impostare quote/rate limit nel firewall Vercel. L’idempotency key è un hash dei dati e dell’orario client della richiesta; nessun campo in chiaro nella chiave. Il payload resta stabile in caso di retry per limitare i doppioni. Aggiornare le norme privacy del provider e di Turnstile prima dell’attivazione.

## Verifiche

### Prova isolata Resend, senza aprire il modulo pubblico

La pagina temporanea `/test-prenotazione`, il suo endpoint e l’accesso con password sono stati rimossi su richiesta del titolare. Non servono per configurare Resend. Il destinatario confermato per le prove è `drsimonecontino@gmail.com`, non la casella personale. Il modulo pubblico resta disabilitato fino alle verifiche previste sopra.

`scripts/test-resend.mjs` legge le tre variabili Resend dall’ambiente del processo; non le stampa e non contiene credenziali. Senza `--send` controlla solo la presenza della configurazione. Con `--send` invia una sola notifica tecnica al destinatario configurato, senza dati paziente. Se le variabili sono state predisposte in un `.env.local` ignorato da Git, usare `node scripts/test-resend.mjs --env-local --send`. Non incollare chiavi nella chat o nella riga di comando. Non attivare flag del modulo per questa prova. La prova non verifica Turnstile né il flusso browser completo: questi richiedono una successiva prova controllata, con privacy completata. Verificare manualmente inbox/spam e stato Delivered in Resend prima di dichiarare la consegna riuscita.

`node --test tests/appointment.test.cjs` esegue i moduli TypeScript reali tramite la dipendenza TypeScript già presente, con confini provider isolati: validazione, injection, disabled, Origin, null/array, honeypot, payload troppo grande, servizio disabilitato, antispam fallito, errore provider, successo e idempotenza. Questi test non provano la consegna reale e non inviano email.

Comandi: lint, typecheck, build (webpack come alternativa al Turbopack bloccato dall’ambiente). Verificare in HTTP redirect, 404 articoli, sitemap, canonical, assenza telefono e stato modulo; verifica visiva desktop/mobile da effettuare con browser disponibile.
