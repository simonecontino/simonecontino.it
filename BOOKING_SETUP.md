# Navigazione, articoli e richieste appuntamento

## Pagina unificata

Pagina: `/prestazioni-e-prenotazioni`, con ancore `#prestazioni`, `#richiedi-appuntamento`, `#whatsapp`. Configurazione URL in `src/config/booking.ts`. I vecchi URL `/prenota` e `/prestazioni-e-tariffe` reindirizzano permanentemente (308) senza perdere i contenuti del catalogo.

La preselezione dalla card al modulo usa un evento locale al browser: nessun identificativo della prestazione viene aggiunto all’URL o inviato ad Analytics.

Le prestazioni restano in `src/data/home-services.ts`: enabled controlla card e select; status planned diventa «Disponibilità da concordare» e non equivale ad attivazione. Tariffe confermate: visita pneumologica 180 €, visita per disturbi respiratori del sonno 180 €, poligrafia notturna 220 €, saturimetria notturna 100 €. Sono le sole quattro opzioni del catalogo e del modulo. Il controllo CPAP rimane trattato nelle pagine informative, ma non è nel listino.

## Articoli reversibili

`src/config/features.ts`: impostare `features.articlesEnabled = true` e ricostruire il sito per riattivare menu, home, route e sitemap. MDX, dati, template e componenti conservati. Durante la disattivazione indice e dettagli restituiscono 404 con noindex, senza redirect verso pagine non pertinenti. Gli URL potranno quindi essere rimossi dall’indice e richiedere nuova scansione alla riattivazione. Nessuna ricerca interna presente.

## WhatsApp e telefono

Il numero non è nel testo visibile, nei link tel o nei dati strutturati. L’URL WhatsApp è costruito esclusivamente sul server da `WHATSAPP_BUSINESS_NUMBER` (fallback al numero professionale già configurato), con messaggio organizzativo precompilato. L’URL wa.me rende comunque il numero conoscibile: non è un recapito segreto. Non pubblicare un’agenda non verificata.

## Attivazione del modulo (disabilitato per default)

Non esisteva un provider email nel progetto. Adapter predisposto: Resend tramite fetch lato server, senza SDK o nuove dipendenze. Non sono stati creati account, chiavi, abbonamenti né inviati messaggi reali. Occorre approvare/configurare il fornitore prima dell’utilizzo; eventuali limiti/costi dipendono dal piano scelto.

Variabili private:

- `RESEND_API_KEY`: chiave di invio del dominio verificato.
- `APPOINTMENT_FROM_EMAIL`: mittente verificato, ad esempio un indirizzo sul proprio dominio (non inventato nel codice).
- `APPOINTMENT_TO_EMAIL`: destinatario; fallback alla email professionale centralizzata.
- `TURNSTILE_SITE_KEY`: identificativo pubblico del widget, passato al client solo se attivo.
- `TURNSTILE_SECRET_KEY`: segreto per Siteverify, solo server.
- `WHATSAPP_BUSINESS_NUMBER`: numero internazionale senza +.
- `APPOINTMENT_PRIVACY_VERIFIED=true`: solo dopo completamento e verifica dell’informativa.
- `APPOINTMENT_EMAIL_VERIFIED=true`: solo dopo configurazione e prova controllata della consegna.
- `APPOINTMENT_FORM_ENABLED=true`: interruttore finale di attivazione.

Tutte le condizioni devono essere soddisfatte: diversamente la UI disabilita il form e l’endpoint restituisce 503 anche per POST diretto. Configurare su Vercel senza prefissi NEXT_PUBLIC e senza committare credenziali. Verificare SPF/DKIM del mittente. La pagina è dinamica per leggere la configurazione server effettiva; la modifica di variabili Vercel richiede nuovo deployment.

Per una prova controllata usare ambiente locale/staging e destinatario di test autorizzato, completare privacy e provider prima di impostare i flag. Verificare inbox/spam: un HTTP 200 attesta l’accettazione del provider, non la consegna finale. Nessuna conferma email al paziente implementata: la conferma richiesta è mostrata sul sito.

## Sicurezza e dati

Validazione client e server, limiti sui campi e body (12 KB letti come stream), allowlist servizio abilitato e preferenza, controllo Origin, honeypot, challenge Turnstile obbligatoria con controllo hostname/action. Il telefono diventa necessario scegliendo contatto telefonico. Le note non possono contenere controlli arbitrari, ma ammettono normali ritorni a capo; sono inviate in email di testo semplice, senza rendering HTML. Nome/cognome/email rifiutano CR/LF per impedire injection.

Nessun database, nessun log con contenuto delle richieste, nessun evento analytics contenente campi o scelta clinica. Le email restano nella casella del destinatario/provider: definirne conservazione e accessi prima dell’attivazione. Disabilitare in GA le misurazioni avanzate automatiche dei moduli se configurate: non sono gestite da questo endpoint. La richiesta può indirettamente rivelare un interesse sanitario e va trattata con adeguate misure.

Turnstile verifica sul server un token monouso prima di chiamare Resend; è il controllo antispam distribuito (nessun rate limiter in memoria spacciato per persistente). Se necessario impostare quote/rate limit nel firewall Vercel. L’idempotency key è un hash dei dati e dell’orario client della richiesta; nessun campo in chiaro nella chiave. Il payload resta stabile in caso di retry per limitare i doppioni. Aggiornare le norme privacy del provider e di Turnstile prima dell’attivazione.

## Verifiche

### Prova isolata Resend, senza aprire il modulo pubblico

È disponibile anche `/test-prenotazione`, esclusa dalla sitemap e noindex. Richiede `APPOINTMENT_TEST_PASSWORD` (casuale, almeno 32 caratteri) e `APPOINTMENT_TEST_UNTIL` (timestamp Unix in millisecondi). Senza configurazione o dopo la scadenza la pagina non è disponibile. Login tramite Server Action e cookie HttpOnly, Secure in produzione, SameSite Strict, firmato HMAC e valido al massimo un’ora e comunque non oltre la scadenza. Nessuna chiave Resend viene esposta. `/api/test-prenotazione` rifiuta richieste senza sessione valida; usa lo stesso handler e Turnstile del modulo normale ma permette solo nome Test, cognome Tecnico, email professionale, nessun telefono o nota e preferenza email. Non richiede di impostare i flag privacy/email come verificati. Il modulo pubblico e il suo endpoint restano disabilitati. Per chiudere la prova rimuovere le due variabili e ridistribuire, oppure attendere la scadenza già prevista nel codice.

`scripts/test-resend.mjs` legge le tre variabili Resend dall’ambiente del processo; non le stampa e non contiene credenziali. Senza `--send` controlla solo la presenza della configurazione. Con `--send` invia una sola notifica tecnica al destinatario configurato, senza dati paziente. Se le variabili sono state predisposte in un `.env.local` ignorato da Git, usare `node scripts/test-resend.mjs --env-local --send`. Non incollare chiavi nella chat o nella riga di comando. Non attivare flag del modulo per questa prova. La prova non verifica Turnstile né il flusso browser completo: questi richiedono una successiva prova controllata, con privacy completata. Verificare manualmente inbox/spam e stato Delivered in Resend prima di dichiarare la consegna riuscita.

`node --test tests/appointment.test.cjs` esegue i moduli TypeScript reali tramite la dipendenza TypeScript già presente, con confini provider isolati: validazione, injection, disabled, Origin, null/array, honeypot, payload troppo grande, servizio disabilitato, antispam fallito, errore provider, successo e idempotenza. Questi test non provano la consegna reale e non inviano email.

Comandi: lint, typecheck, build (webpack come alternativa al Turbopack bloccato dall’ambiente). Verificare in HTTP redirect, 404 articoli, sitemap, canonical, assenza telefono e stato modulo; verifica visiva desktop/mobile da effettuare con browser disponibile.
