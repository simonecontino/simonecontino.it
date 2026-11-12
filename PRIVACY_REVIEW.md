# Revisione privacy e verifica modulo — 12 novembre 2026

Documento operativo, non parere legale né attestazione di conformità. Nessun accordo esterno è stato accettato per conto del titolare; nessun flag di certificazione privacy è stato attivato.

## Decisione successiva del titolare

Dopo l’esposizione dei rischi residui, il titolare ha autorizzato la pubblicazione e, in subordine al mantenimento della scelta della prestazione, la semplificazione del modulo. Implementata la versione di solo ricontatto: nome, cognome, email, telefono facoltativo salvo preferenza telefonica e presa visione. Rimossi prestazione, note e relativo evento di preselezione; il server rifiuta i campi precedenti. Catalogo invariato. Le osservazioni sotto descrivono la revisione della versione precedente e i rischi residui; non sono tutte risolte dalla minimizzazione.

Il rilascio usa APPOINTMENT_OWNER_APPROVED per registrare l’autorizzazione operativa, non APPOINTMENT_PRIVACY_VERIFIED. Nessuna verifica contrattuale è dichiarata completata. La verifica end-to-end browser/Turnstile di produzione rimane da effettuare con soli dati del titolare dopo il rilascio; non viene spacciata per eseguita dai test automatici.

## Dati confermati

- Titolare Dr. Simone Contino, recapito drsimonecontino@gmail.com.
- Gmail standard, non Workspace; accordi dei fornitori non ancora verificati dal titolare.
- Conservazione desiderata: 30 giorni dalla conclusione della gestione della richiesta nella casella. Da applicare anche a cestino/copie con procedura documentata, non automatizzata dal sito.
- Resend: invio tecnico riuscito e ricezione in Posta in arrivo confermata dal titolare. Questa prova non ha attraversato form e Turnstile.
- Pagina temporanea di test eliminata su richiesta del titolare; non reintrodurla senza nuova richiesta.

## Risultati della revisione

1. **Potenziale dato sanitario:** il form trasmette identità, contatto e prestazione specialistica. Il Garante segnala che prestazione e specializzazione possono rivelare lo stato di salute. Non basta vietare referti o sintomi nelle note; le sole basi ex art. 6 e una casella di presa visione non risolvono l’eventuale applicazione dell’art. 9. Valutazione professionale necessaria rispetto al flusso concreto.
2. **Compatibilità hosting:** il DPA pubblico Vercel, Schedule 1 §6, vieta categorie particolari nei Customer Data; il testo dichiara applicazione a Pro/Enterprise. Verificare piano, accordo applicabile e possibilità di gestire il flusso concreto con supporto Vercel/consulente. Non affermare che passare a Pro risolva il vincolo.
3. **Posta:** per l’account Gmail standard non sono stati verificati ruolo del fornitore, accordi, trasferimenti, accessi e misure appropriate. Non applicare automaticamente il DPA Workspace a Gmail standard. Non è una conclusione secondo cui ogni uso di Gmail sarebbe illecito: è una verifica non completata per questo uso.
4. **Resend:** documentazione GDPR pubblica: retention email/log 30 giorni sui piani Free/Pro/Scale, backup 7 giorni e trattamento principale USA; DPA e SCC disponibili. Verificare piano reale, accordo applicabile, subprocessori e compatibilità della categoria di dati. Regione di invio Irlanda non equivale a trattamento esclusivamente UE. Non garantire la cancellazione totale entro 30 giorni dalla gestione della richiesta.
5. **Turnstile:** servizio di sicurezza con trattamento di segnali tecnici e propria informativa. Il sito invia a Siteverify solo segreto/token, non i campi del modulo. Verificare contratto, segnali, conservazione e configurazione reale del widget; nessuna classificazione legale automatica come cookie esente.
6. **Analytics:** il modulo non contiene chiamate che inviano esplicitamente campi/servizio a GA. Le misurazioni automatiche GA e la revoca dopo caricamento dello script non sono state verificate nel browser/account: nessuna garanzia di assenza totale di eventi. Non inviare informazioni sanitarie ad Analytics. Verificare/disattivare interazioni dei moduli nella misurazione avanzata, retention e raccolta URL prima dell’apertura.
7. **Cookie policy:** corretta la descrizione del localStorage senza scadenza applicativa e delle risorse esterne (Turnstile e possibili avatar Google non sono semplici link caricati solo al clic). Restano da verificare durate/configurazioni effettive dei servizi.

## Verifica tecnica disponibile

- Consegna email reale: **confermata dal destinatario**.
- Test automatici dell’handler reale con provider isolati: validazione, privacy obbligatoria, formato/limite body, Origin, honeypot, scadenza, token/hostname/action, errori provider/rete, ricevuta Resend con ID, idempotenza e assenza di log applicativi del contenuto.
- Gate configurazione: tutti i flag e credenziali devono essere presenti; la consegna email da sola non apre il modulo.
- UI: controllata nel codice la presenza di label, fieldset, avvisi, privacy, role alert/status e prevenzione del doppio invio. Non equivale a un audit browser da tastiera.
- **Ancora non verificato:** widget reale nel browser, token di produzione, submit browser → endpoint → Turnstile → Resend, ricezione di quella specifica richiesta, errori/focus su desktop/mobile e traffico Analytics. Nessuna nuova email inviata in questa revisione.
- Il modulo pubblico resta disabilitato. Non ricreare test pubblici, non usare chiavi di test in produzione e non impostare PRIVACY_VERIFIED per aggirare il blocco.

## Decisione richiesta prima del test end-to-end pubblico

Far verificare il flusso concreto e gli accordi applicabili (in particolare categorie particolari e hosting). Se incompatibili, scegliere un canale di prenotazione idoneo o ridefinire l’architettura con nuova approvazione. Un form di ricontatto generico può ridurre i dati ma non elimina automaticamente il contesto sanitario. Cambiare provider o servizio email è una decisione del titolare, non una migrazione autorizzata da questa revisione.

Prima dell’apertura: confermare trattamento/base giuridica e fornitori; completare informativa e procedura cancellazione; proteggere casella/account con MFA; verificare GA e tracking email; eseguire un solo submit con dati sintetici e controllare inbox. Registrare l’esito prima dell’attivazione definitiva.

## Fonti primarie consultate

- [Garante: piattaforme di prenotazione e contatto sanitario](https://www.garanteprivacy.it/documents/10160/0/Compendio%2Bsul%2Btrattamento%2Bdei%2Bdati%2Bpersonali%2Battraverso%2Bpiattaforme%2Bvolte%2Ba%2Bmettere%2Bin%2Bcontatto%2Bi%2Bpazienti%2Bcon%2Bi%2Bprofessionisti%2Bsanitari%2Baccessibili%2Bvia%2Bweb%2Be%2Bapp.pdf/7fc9ca53-f078-af9b-248d-a71dee74da07?version=2.0)
- [Garante: chiarimenti per professionisti sanitari, 7 marzo 2019](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9091942)
- [Vercel DPA, Schedule 1 §6](https://vercel.com/legal/dpa)
- [Resend DPA](https://resend.com/legal/dpa) e [GDPR/retention](https://resend.com/security/gdpr/)
- [Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/)
- [Google Workspace: accordo sul trattamento](https://knowledge.workspace.google.com/admin/compliance/privacy-compliance-and-records-for-google-workspace-and-cloud-identity)
