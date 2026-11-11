# Risultato aggiornamento navigazione e prenotazioni

11 novembre 2026. Implementazione locale, nessun commit, push o deploy.

## Implementato

- Articoli nascosti tramite flag reversibile; MDX conservati; blocco HTTP 404/noindex anche prima dello streaming; esclusione da menu, homepage e sitemap.
- Pagina unificata con ancore, catalogo centralizzato, prezzi precedenti invariati, modulo e WhatsApp. Redirect 308 dai due vecchi URL. CTA aggiornate in home, pagine e template.
- Telefono rimosso dalla UI, dai link tel e dallo schema; numero WhatsApp confinato al costruttore server dell’URL, conoscibile nel collegamento wa.me come previsto.
- Date di avvio rimosse dai testi e dalla configurazione pubblica; disponibilità pianificata non convertita automaticamente in attiva.
- Modulo con campi richiesti, preselezione locale senza URL sensibili, validazione, errori con dati conservati, conferma non equivalente ad appuntamento confermato.
- Invio Resend server-side, nessuna dipendenza nuova; API key privata, controllo Origin/body, honeypot e verifica Turnstile, idempotenza e nessun log con dati personali. Nessuna richiesta persistita nel database (non presente).

## Verifiche eseguite

ESLint, TypeScript e build Next.js con webpack passano. Sei test Node con provider simulati confinati ai test passano: validazione e injection, blocco disabled, richieste invalide/origine/body, antispam fallito, errore provider, successo con payload stabile per retry.

Controlli HTTP locali superati: articoli indice/dettaglio 404; vecchi URL 308; home/contatti/pagina unificata/area servita/FAQ/poligrafia 200; canonical pagina unificata corretto; sitemap senza Articoli; assenza tel e gennaio 2027; form HTML disabilitato; POST diretto restituisce 503 senza chiamare provider. Link WhatsApp presente con numero configurato e messaggio codificato; nessuna conversazione aperta o inviata.

Browser locale non disponibile per questa chat: test visivi desktop/mobile, interazione reale del selettore e tastiera non dichiarati completati. CSS mobile-first con campi in una colonna, menu compatto anche a larghezze intermedie e ancore prima del catalogo. Da verificare in browser prima del rilascio.

Invio reale email non verificato: nessun provider configurato e nessuna email inviata. Conferma UI/errori coperti a livello endpoint, non con browser interattivo. Prima di attivare servono configurazione Resend/Turnstile, prova controllata di consegna e informativa completa; vedere BOOKING_SETUP.md e .env.example. Nessun account a pagamento creato.

## File modificati o aggiunti

- `BOOKING_SETUP.md`
- `src/app/api/appointment-requests/route.ts`
- `src/app/prestazioni-e-prenotazioni/page.tsx`
- `src/components/forms/appointment-form.tsx`
- `src/components/forms/service-request-link.tsx`
- `src/config/booking.ts`
- `src/config/features.ts`
- `src/lib/appointment-validation.ts`
- `src/lib/booking-config.ts`
- `src/proxy.ts`
- `tests/appointment.test.cjs`
- `.env.example`
- `README.md`
- `next.config.mjs`
- `package.json`
- `src/app/articoli/[slug]/page.tsx`
- `src/app/articoli/page.tsx`
- `src/app/chi-sono/page.tsx`
- `src/app/contatti/page.tsx`
- `src/app/dove-ricevo/page.tsx`
- `src/app/esami/page.tsx`
- `src/app/faq/page.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/app/poligrafia-respiratoria-milano/page.tsx`
- `src/app/prenota/page.tsx`
- `src/app/prestazioni-e-tariffe/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/sitemap.ts`
- `src/app/sonno/page.tsx`
- `src/components/articles/article-shell.tsx`
- `src/components/layout/booking-bar.tsx`
- `src/components/layout/footer.tsx`
- `src/components/layout/header.tsx`
- `src/components/sections/service-page.tsx`
- `src/components/sections/topic-index.tsx`
- `src/components/sections/topic-page.tsx`
- `src/components/seo/structured-data.tsx`
- `src/config/navigation.ts`
- `src/config/site.ts`
- `src/data/home-services.ts`
- `src/data/home.ts`
- `src/data/locations.ts`
