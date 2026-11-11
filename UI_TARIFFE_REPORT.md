# Aggiornamento UI e quattro tariffe — 11 novembre 2026

Modifiche locali, senza pubblicazione e senza nuove dipendenze.

## Risultato

- Catalogo e select condividono quattro prestazioni: visita pneumologica 180 €, visita per disturbi respiratori del sonno 180 €, poligrafia notturna 220 €, saturimetria notturna 100 €.
- Controllo CPAP rimosso dal listino; contenuti clinici informativi conservati. Stato disponibilità non automaticamente convertito in attivo.
- Card compatte con prezzo evidente e Prenota che preseleziona il servizio mediante evento locale. Griglia a due colonne da 768 px; una colonna su smartphone; catalogo/modulo affiancati solo da 1200 px.
- Menu: unica CTA Prenota in evidenza a destra su desktop e nel menu mobile. Rimossa la voce ridondante della pagina unificata. Barra mobile esistente conservata.
- Hero e tipografia responsive ridimensionate; rimosso max-width restrittivo dalle intestazioni brevi e allargate le intestazioni delle pagine interne. Ridotti separatamente padding delle sezioni, spazi delle card sintomi, percorso, competenze, sonno, CTA e footer. Eliminata la cella vuota del blocco domiciliare. Ritratto con proporzioni anziché min-height arbitraria.
- Oggetto email: «Nuova richiesta appuntamento — Dr. Simone Contino»; Reply-To validato già esistente. Conferma aggiornata al testo richiesto; errore mantiene i dati, invio bloccato durante attesa.

## Verifiche

ESLint, TypeScript e build produzione webpack superati. Sette test Node superati: quattro tariffe/catalogo, validazione, blocco modulo disabled, input invalidi/injection/Origin/body, antispam, errore provider, successo/idempotenza. I provider sono isolati nei test: nessuna email reale inviata.

Verifica HTTP locale: home, profilo, FAQ, contatti e pagina poligrafia rispondono 200; pagina unificata contiene quattro card con 180/180/220/100 e quattro opzioni nel select. Presente CTA evidenziata, nessun link tel. Il modulo è ancora correttamente disabilitato.

Il browser locale non è disponibile per questa chat: impossibile certificare visualmente 375/768/1440 px, overflow effettivo, focus, preselezione interattiva e rendering del widget. Questi controlli restano da eseguire prima del rilascio. La verifica CSS non sostituisce una verifica visiva.

## Attivazione email ancora bloccata

Controllati i nomi delle variabili presenti su Vercel (senza leggere credenziali) e in locale: configurato soltanto GA. Mancano RESEND_API_KEY, APPOINTMENT_FROM_EMAIL con dominio verificato, TURNSTILE_SITE_KEY e TURNSTILE_SECRET_KEY. Destinatario già configurato come drsimonecontino@gmail.com. Occorre completare l’informativa privacy e la verifica dei fornitori prima di attivare i flag descritti in BOOKING_SETUP.md. Nessuna creazione account, costo ricorrente o falsa attivazione eseguita. Con credenziali disponibili, effettuare una prova controllata e verificare la ricezione prima di dichiarare operativo il modulo.

## File modificati

- src/app/globals.css
- src/data/home-services.ts
- src/config/navigation.ts
- src/components/layout/header.tsx
- src/app/prestazioni-e-prenotazioni/page.tsx
- src/components/forms/service-request-link.tsx
- src/components/forms/appointment-form.tsx
- src/app/api/appointment-requests/route.ts
- src/app/page.tsx
- src/app/poligrafia-respiratoria-milano/page.tsx
- tests/appointment.test.cjs
- BOOKING_SETUP.md
- UI_TARIFFE_REPORT.md
