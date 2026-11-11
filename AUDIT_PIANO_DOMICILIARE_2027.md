# Audit e piano — attività domiciliare da gennaio 2027

Data: 11 novembre 2026. Fase iniziale richiesta: audit del repository e piano operativo. Nessuna modifica applicativa o pubblicazione eseguita in questa fase.

## 1. Stato e architettura rilevati

- Next.js App Router 16.3.0 (versione effettivamente eseguita dalla build), React, TypeScript, Tailwind CSS, Lucide; MDX per tre articoli. Package manifest con molte versioni `latest`, lockfile pnpm presente: conservare il lockfile, evitare aggiornamenti indiscriminati.
- Pagine statiche e route `[slug]` per problemi, patologie, esami e articoli. Dati file-based in `src/data`, identità in `src/config/site.ts`, navigazione in `src/config/navigation.ts`. Nessun database né CMS richiesto.
- Riutilizzabili: Container, ButtonLink, Breadcrumbs, header/footer/barra mobile, template TopicPage e ServicePage, token CSS e componenti cookie.
- `/prenota` è già una pagina completa con agenda Google Calendar esterna, non una bozza di modulo. `/contatti` espone recapiti diretti. Nessun endpoint per richieste/email.
- Il catalogo `services.ts` contiene 14 esami/valutazioni, alcuni dichiarati disponibili presso la sede: non sono automaticamente prestazioni domiciliari.
- Sono presenti modifiche locali precedenti per recensioni Places, privacy, termini e relativa documentazione. Preservarle e distinguerle dalle modifiche 2027. Non sono prova di pubblicazione in produzione.
- Questo audit descrive il checkout locale. Non certifica lo stato live, il DNS, la configurazione Vercel o la Search Console.

## 2. Problemi e priorità

| Priorità | Evidenza nel repository | Intervento previsto |
| --- | --- | --- |
| Alta | `layout.tsx`: canonical `/` ereditato; verificato nell’HTML compilato di `/prenota`, `/esami`, `/privacy` | Canonical univoci per tutte le pagine indicizzabili, anche dinamiche; homepage separata |
| Alta | Ospedale San Carlo, indirizzo, mercoledì 16–19 in home, sede, FAQ e JSON-LD | Descrivere l’attività privata esclusivamente domiciliare; nessuna sede privata aperta al pubblico. Preservare l’esperienza ospedaliera biografica se corretta |
| Alta | `/prenota` propone giorno e ora da Calendar; configurazione agenda duplicata nei dati sede | Sostituire il flusso con richiesta e successivo contatto telefonico; aggiornare CTA e tutte le citazioni di disponibilità |
| Alta | Prestazioni marcate `availabilityConfirmed: true` e CPAP già prenotabile nelle FAQ | Separare contenuti informativi e catalogo domiciliare, stato pianificato/attivo, data avvio gennaio 2027 |
| Alta | Privacy e termini ancora bozze con placeholder | Completare finalità, base giuridica, tempi, destinatari, diritti e fornitori reali prima di attivare il form; revisione professionale necessaria |
| Media | Dominio configurato senza `www`; in precedenza la destinazione pubblica era `www` | Verificare redirect live e allineare dominio preferito, canonical, sitemap e Open Graph allo stesso host |
| Media | Sitemap include pagine legali `noindex`, lastModified è la data di build | Escludere URL noindex e usare date editoriali attendibili; filtrare prestazioni disabilitate e bozze |
| Media | Open Graph globale generico; titoli/descrizioni esistono per molte pagine | Utility metadata con URL e testi specifici per route, conservando token Search Console esistente |
| Media | Manifest usa molte versioni `latest` | Documentare versioni e bloccare gli aggiornamenti tramite lockfile; audit dipendenze separato prima del rilascio |

Accessibilità: skip link, focus visibile, struttura semantica, menu mobile nativo e reduced motion già presenti. Non equivale a una certificazione WCAG: testare il nuovo form e il menu ampliato a tastiera, zoom 200%, 390/768/1280 px. Il banner cookie usa localStorage senza gestione di errore: verificare storage bloccato. La verifica visiva completa è prevista dopo l’implementazione.

## 3. Modello dati e regole di disponibilità

Nuovo catalogo `src/data/home-services.ts`, distinto dagli esami informativi. Tipo dedicato con: id, slug, categoria, nome, descrizione, indicazioni, modalità confermate, `enabled`, `status: planned | active`, `priceEur: number | null`, `priceConfirmed`, riferimenti editoriali. Configurazione avvio `2027-01` senza inventare giorno.

| Categoria | Prestazione | Tariffa iniziale interna |
| --- | --- | --- |
| Pneumologia | Visita pneumologica domiciliare | null |
| Medicina del Sonno | Visita domiciliare per disturbi respiratori del sonno | null |
| Medicina del Sonno | Poligrafia respiratoria domiciliare | 220, priceConfirmed=false |
| Medicina del Sonno | Controllo CPAP domiciliare con scarico, analisi e interpretazione dati | null |
| Medicina del Sonno | Saturimetria notturna domiciliare | null |

Nessuna tariffa null o non confermata diventa prezzo definitivo o `Offer` strutturata. In sviluppo segnalazione di revisione; vista pubblica: «Tariffa in definizione» senza importo provvisorio. Prima dell’avvio: «Attività prevista da gennaio 2027» e richieste preliminari solo se abilitate esplicitamente. Il solo cambio data non attiva le prestazioni. Prestazioni disabled escluse da selettore, card, sitemap e route pubbliche.

Nota listino richiesta: «Per alcune località o zone di difficile accesso potrebbe essere previsto un supplemento, comunicato prima della conferma dell'appuntamento.» Nessun supplemento automatico.

## 4. Pagine e navigazione

- `/prestazioni-e-tariffe`: catalogo in due categorie, prezzi confermati e stato attività, CTA «Richiedi un appuntamento». Link nel menu e nella home.
- `/poligrafia-respiratoria-milano`: pagina prioritaria con H1, descrizione, appropriatezza da valutare clinicamente, distinzione dalla polisonnografia completa, fasi operative solo confermate, tariffa, Milano/Corsico, FAQ e CTA.
- Altre pagine prestazione solo con contenuti distinti sufficienti; inizialmente sezioni nel listino, evitando pagine sottili.
- `/esami/poligrafia-notturna`: mantenere valore informativo e collegare alla pagina domiciliare; se realmente duplicata, consolidare con redirect permanente dopo confronto contenuti.
- `/prenota`: conservare URL, cambiare titolo/flusso in richiesta; eventuale parametro servizio contiene solo id generico, mai dati personali.
- `/dove-ricevo`: conservare URL e aggiornarlo come «Visite a domicilio e zone servite» senza indirizzo privato e senza mappa di una sede ambulatoriale.
- Home: mantenere presentazione generale; inserire accesso al listino, riquadro poligrafia e messaggio avvio. Sostituire blocco sede. Aggiornare CTA condivise, sonno, FAQ, contatti e template per eliminare promesse di prenotazione immediata.

## 5. Richiesta appuntamento ed email

Scelta proposta: form React minimo + Route Handler Next.js server-side `/api/appointment-requests`, invio email tramite provider transazionale (Resend via API HTTP), senza agenda, database clinico o login. L’alternativa SMTP ha maggiori oneri di configurazione e consegna; un form esterno aggiunge dipendenza alla UI. Account/credenziali provider e dominio mittente verificato sono necessari prima dell’attivazione; nessuna creazione di abbonamenti o account in questa fase.

Campi: nome e cognome, telefono, email facoltativa, servizio da allowlist, fascia indicativa facoltativa da opzioni chiuse, checkbox presa visione privacy non preselezionata. Nessun messaggio libero, indirizzo, diagnosi o referto. Non acquisire l’indirizzo domiciliare fino al contatto telefonico. La prestazione scelta può rivelare un interesse sanitario: non trattare la richiesta come dato anonimo o sicuramente non sanitario.

Validazione HTML e server: tipi, lunghezze massime, telefono plausibile senza escludere numeri internazionali, email se fornita, servizio abilitato, fascia allowlist, privacy=true, body massimo. Escape HTML email o testo semplice, intestazioni fisse; nessun dato utente in subject o log applicativi.

Antispam: honeypot, controllo Origin sul POST e token Turnstile verificato sul server. Per limitazione distribuita usare controlli firewall Vercel disponibili sul piano effettivo, oppure storage TTL dedicato se necessario; non considerare sufficiente una Map in memoria serverless. Token scaduti/invalidi e richieste ripetute devono produrre messaggi comprensibili senza successo fittizio. Prevenzione doppio invio lato UI e idempotency key provider.

Notifica a `drsimonecontino@gmail.com`. Messaggio di successo sul sito dopo accettazione della notifica dal provider: «La richiesta è stata inviata correttamente. Sarai ricontattato per concordare la disponibilità. L'appuntamento non è ancora confermato.» La consegna finale va verificata con un messaggio di prova autorizzato. Conferma email al paziente solo se ha fornito l’email e configurazione prevista, senza dettagli del servizio nel subject. Gestire separatamente errore di notifica professionista e mancata conferma paziente, evitando richieste duplicate.

In assenza di credenziali il form non invia e non mostra successo: indicare canali diretti per richieste organizzative. Nessun dato personale o scelta prestazione in GA/dataLayer, URL, eventi, error tracking o session replay. Valutare l’esclusione di `/prenota` dal tracciamento; documentare fornitori, conservazione nella casella email, accessi e trasferimenti. La presa visione non è automaticamente consenso né dimostrazione di conformità GDPR.

## 6. SEO e contenuti

- Utility metadata centralizzata: title, description, canonical e OG per route; mantenere robots/sitemap e correggerne la coerenza.
- Schema professionista senza `workLocation` ambulatoriale, con `areaServed` Milano e Corsico. Service per prestazioni attive e visibili, Offer solo con prezzo confermato. Non aggiungere aggregateRating del proprio profilo per ottenere stelle nelle ricerche.
- Poligrafia vs polisonnografia: spiegare che lo studio respiratorio domiciliare non include necessariamente i segnali del sonno di una polisonnografia completa e non è intercambiabile per ogni quesito. Verificare documentazione clinica autorevole prima di redigere il testo definitivo.
- Non inventare sensori effettivamente disponibili, chi consegna/ritira, tempi di referto o criteri di diagnosi. Queste fasi hanno campi editoriali da confermare.
- Milano e Corsico inseriti naturalmente in pagina e area coperta; nessuna pagina geografica clonata.
- Search Console: controllare proprietà www/apex, sitemap e Ispezione URL solo con accesso effettivo. Token metadata già presente non prova verifica o indicizzazione. Nessuna garanzia di posizionamento.
- Performance: mantenere server rendering, immagini locali ottimizzate e JS minimo del form. Lighthouse/CWV da misurare, non punteggi presunti.

## 7. Indicazioni Google Business Profile

Configurare come attività ad area di servizio se non riceve pazienti all’indirizzo, nascondendo l’indirizzo pubblico. Il dominio e il profilo professionale devono corrispondere. Non modificare direttamente il profilo senza richiesta specifica.

- Categoria primaria da verificare nel selettore italiano: Pneumologo; eventuale categoria aggiuntiva pertinente alla medicina del sonno soltanto se disponibile e corretta. Non inventare una categoria Google.
- Aree iniziali Milano e Corsico, altre località soltanto dopo conferma copertura.
- Descrizione proposta: «Dr. Simone Contino, medico specialista in Pneumologia. Attività libero-professionale domiciliare prevista da gennaio 2027 nell’area di Milano e Corsico, con valutazioni pneumologiche e dei disturbi respiratori del sonno. Gli appuntamenti vengono concordati telefonicamente dopo una richiesta di contatto.» Aggiornare dopo attivazione effettiva.
- Servizi: i cinque del catalogo, solo quando attivati; prezzo solo se confermato. Link al listino, alla pagina poligrafia e al modulo richiesta, senza disponibilità automatiche.
- Richiedere recensioni autentiche in modo neutro, senza incentivi o selezione basata sul gradimento. Non sollecitare dettagli clinici. Risposte pubbliche senza confermare rapporto medico-paziente, diagnosi o trattamenti.

Fonti ufficiali consultate: [rappresentazione attività Google](https://support.google.com/business/answer/3038177?hl=it), [metadata Next.js](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).

## 8. Sequenza di implementazione in sviluppo

1. Configurazione attività 2027, catalogo tipizzato, stato prezzi/disponibilità e aggiornamento CONTENT_TODO.
2. Listino, pagina poligrafia, link home/menu; correzione sede e contenuti operativi incoerenti.
3. Metadata/canonical per tutte le route, sitemap, JSON-LD e collegamenti correlati.
4. Form, endpoint, adapter email, antispam, messaggi di errore/successo; documentazione `.env.example` senza segreti.
5. Test significativi: invalid input, servizio disabilitato, spam, errore provider, invio valido con provider finto confinato ai test; nessun dato simulato in produzione. Test reale email solo con credenziali e destinatari autorizzati.
6. Verifica responsive/keyboard del flusso completo, link e prezzi; lint, typecheck, build, ispezione HTML metadata; aggiornare README e checklist rilascio.
7. Presentare anteprima e risultati. Nessun commit/push che avvii deployment automatici e nessun deploy di produzione senza approvazione.

## 9. Informazioni da confermare e configurazioni

- Tariffe delle quattro prestazioni mancanti e approvazione 220 €; inclusioni/esclusioni economiche.
- Giorno effettivo di avvio e possibilità di ricevere richieste preliminari prima di gennaio.
- Modalità concrete di consegna, applicazione, registrazione, ritiro e refertazione; tempi solo dopo conferma.
- Copertura effettiva Milano/Corsico, zone escluse e criteri per eventuale supplemento comunicato prima.
- Provider email (proposta Resend), mittente verificato, accesso DNS per SPF/DKIM e credenziali private su Vercel; eventuali costi dipendono da piano e volume da verificare prima di attivare.
- Turnstile site/secret key e domini consentiti; regole antispam effettivamente disponibili su Vercel.
- Titolare, base giuridica, conservazione, accessi alla casella e testi privacy definitivi.
- Accesso Search Console per verifica effettiva dopo rilascio; credenziali Places ancora separate da questo progetto.

## 10. Verifiche iniziali eseguite

11 novembre 2026: ESLint completato senza errori; `tsc --noEmit` completato senza errori; build Next.js riuscita con 53 pagine. Nessuno script test applicativo definito. Nell’HTML compilato `/prenota`, `/esami` e `/privacy` hanno canonical `https://simonecontino.it`: problema riprodotto. Nessun modulo attivo da provare in questa fase; verifica mobile da eseguire sulle modifiche successive. `next-env.d.ts` rigenerato dalla build e ripristinato al contenuto precedente. Nessun file applicativo modificato per questo audit, nessun push o deploy.
