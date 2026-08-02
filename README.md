# Sito personale del Dr. Simone Contino

Sito Next.js mobile-first per il Dr. Simone Contino, medico specialista in Pneumologia a Milano. Il progetto comprende sistema visivo, homepage, pagine cliniche riutilizzabili, area sonno, esami, profilo professionale, FAQ, articoli MDX, sede, prenotazione, contatti e bozze legali. I contenuti clinici e le informazioni non confermate sono esplicitamente marcati prima della pubblicazione.

## Avvio locale

Requisiti: Node.js 20.9 o successivo e pnpm.

```bash
pnpm install
pnpm dev
```

Aprire `http://localhost:3000`.

## Verifiche e build

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

## Deploy

Il progetto può essere distribuito su una piattaforma compatibile con Next.js. Prima del deploy:

1. sostituire dominio e recapiti;
2. impostare `robots` su indicizzazione consentita e popolare la sitemap;
3. confermare sede, prestazioni e link di prenotazione;
4. completare e revisionare pagine legali e contenuti clinici;
5. eseguire build e verifiche finali.

Non sono necessarie variabili d’ambiente nella milestone attuale. Creare `.env.example` solo quando verrà scelto un fornitore per form, analytics o servizi esterni.

## Dove modificare i contenuti

- Dati del medico, dominio, recapiti e testi principali: `src/config/site.ts`
- Menu: `src/config/navigation.ts`
- Sede e link di prenotazione: `src/data/locations.ts`
- Problemi, FAQ e anteprime articoli: `src/data/home.ts`
- Contenuti di problemi e patologie: `src/data/topics.ts`
- Esami e valutazioni: `src/data/services.ts`
- Homepage: `src/app/page.tsx`
- Colori, tipografia e spaziature: `src/app/globals.css`
- Fotografie: `public/images/`
- Articoli MDX: `src/content/articles/`
- Pagina di prenotazione: `src/app/prenota/page.tsx`
- La pagina Contatti usa recapiti diretti e non raccoglie dati tramite moduli.
- Bozze legali: `src/app/privacy/page.tsx` e `src/app/cookie-policy/page.tsx`
- Elenco completo dei dati mancanti: `CONTENT_TODO.md`

## Come aggiungere contenuti nella fase successiva

### Articolo

Creare un file MDX in `src/content/articles/`, aggiungere i metadata tipizzati in `src/data/home.ts` e collegare il componente in `src/app/articoli/[slug]/page.tsx`. Verificare sempre il testo medico prima della pubblicazione.

### Problema o patologia

Aggiungere un oggetto tipizzato in `src/data/topics.ts`. Le pagine indice e di dettaglio vengono generate automaticamente dai template in `src/components/sections/`. Ogni nuovo testo deve mantenere `medicallyReviewed: false` fino alla revisione, impostandolo a `true` solo dopo l’approvazione.

### Esame o valutazione

Aggiungere un oggetto in `src/data/services.ts`. La pagina viene generata automaticamente. Impostare `availabilityConfirmed: true` soltanto dopo aver verificato che la prestazione sia realmente disponibile.

### FAQ

Modificare l’array `faqs` in `src/data/home.ts`. Usare `needsConfirmation: true` per informazioni operative non ancora verificate.

### Fotografie

Sostituire i file in `public/images/` mantenendo i nomi, oppure aggiornare i percorsi nei componenti. Usare fotografie autentiche ottimizzate, con proporzioni adatte e consenso alla pubblicazione.

### Metadata e SEO

I default sono in `src/app/layout.tsx`. Ogni pagina interna dovrà esportare metadata univoci. Il dominio definitivo va impostato prima di abilitare canonical, sitemap, Open Graph e indicizzazione.

## Placeholder da sostituire

Il riferimento unico è `CONTENT_TODO.md`. I placeholder sono volutamente visibili nell’ambiente di sviluppo e non devono arrivare in produzione.

## Informazioni ancora necessarie

- dominio definitivo;
- recapiti professionali pubblici;
- sede, orari e indicazioni;
- link e modalità di prenotazione;
- elenco confermato delle prestazioni;
- biografia e posizione professionale approvate;
- eventuali recensioni reali e profilo Google;
- fornitore del form e testi legali revisionati.

## Checklist prima della pubblicazione

- [ ] Tutti i placeholder in `CONTENT_TODO.md` sono risolti.
- [ ] Prestazioni e informazioni pratiche sono state confermate.
- [ ] Contenuti medici e biografia sono stati revisionati.
- [ ] Privacy e cookie policy sono state revisionate professionalmente.
- [ ] Prenotazione e recapiti sono stati provati su mobile e desktop.
- [ ] Canonical, sitemap, robots e dati strutturati usano il dominio reale.
- [ ] Articoli bozza non sono indicizzati o pubblicati.
- [ ] Link, tastiera, focus, contrasto e form sono verificati.
- [ ] Layout è verificato sui principali breakpoint.
- [ ] `pnpm lint`, `pnpm typecheck` e `pnpm build` completano senza errori.
- [ ] Sono stati eseguiti audit Lighthouse per accessibilità, SEO e performance.
- [ ] Analytics resta disabilitato oppure è attivato con consenso valido.

## Note sul prototipo precedente

I file HTML/CSS/JS originali restano temporaneamente nel repository come riferimento e non vengono utilizzati dall’app Next.js. Contengono recapiti, slot e prestazioni non confermati: non devono essere pubblicati. Potranno essere archiviati dopo l’approvazione della nuova homepage.
