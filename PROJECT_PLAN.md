# Piano di progetto — Dr. Simone Contino

## 1. Obiettivi

- Trasformare le visite organiche da Google in clic su **Prenota una visita**.
- Comunicare in pochi secondi: pneumologo a Milano, ascolto e chiarezza, particolare competenza nei disturbi respiratori del sonno.
- Costruire una base veloce, accessibile e facile da aggiornare senza CMS o database.

## 2. Utenti

- Persone con sintomi non ancora diagnosticati (tosse, fiato corto, russamento, sonnolenza).
- Pazienti con patologie note che cercano valutazione o continuità di cura.
- Persone con sospette apnee o necessità di follow-up della terapia CPAP.
- Familiari che cercano informazioni comprensibili e indicazioni pratiche.

## 3. Sitemap

- `/` Homepage
- `/chi-sono`
- `/problemi` e `/problemi/[slug]`
- `/patologie` e `/patologie/[slug]`
- `/sonno` e pagine di approfondimento
- `/esami` e `/esami/[slug]`
- `/articoli` e `/articoli/[slug]`
- `/faq`, `/dove-ricevo`, `/prenota`, `/contatti`
- `/privacy`, `/cookie-policy`

La prima milestone implementa homepage, navigazione, configurazione, fondazioni SEO e destinazioni placeholder utili a evitare link interrotti. I template editoriali completi seguono dopo la valutazione della homepage.

## 4. User journey

1. Ricerca Google basata su sintomo, patologia o specialista locale.
2. Conferma immediata di identità, località e ambito clinico.
3. Riconoscimento del proprio problema tramite linguaggio non tecnico.
4. Comprensione del metodo di valutazione e degli ambiti di competenza.
5. Verifica del profilo professionale e risposta ai dubbi pratici.
6. Clic su **Prenota una visita** verso un canale esterno configurabile.

## 5. Struttura homepage

1. Hero orientato al bisogno con ritratto autentico e CTA primaria.
2. Problemi frequenti organizzati per riconoscibilità.
3. Percorso di cura in tre passaggi.
4. Tre macroaree: pneumologia, sonno, continuità.
5. Elementi concreti di fiducia.
6. Profilo sintetico basato sui dati verificati nel CV.
7. Recensioni disattivate finché non disponibili contenuti reali.
8. Tre articoli chiaramente marcati come bozze da revisionare.
9. FAQ con risposte prudenti e placeholder dove necessario.
10. Sede configurabile con dati non confermati segnalati.
11. CTA finale e barra mobile di prenotazione.

## 6. Design system

- Palette: bianco caldo, blu petrolio, azzurro tenue, grigi chiari, antracite; contrasto minimo WCAG AA.
- Tipografia: Geist locale tramite `next/font`, una sola famiglia e gerarchia tipografica netta.
- Griglia fluida mobile-first, contenitore massimo 1200 px, spaziatura basata su multipli coerenti.
- Angoli sobri, bordi sottili, ombre minime; transizioni CSS rispettose di `prefers-reduced-motion`.
- Fotografia autentica fornita, senza immagini stock o decorazioni mediche stereotipate.

## 7. Architettura tecnica

- Next.js App Router, TypeScript, Tailwind CSS, Server Components predefiniti.
- Contenuti strutturati in `src/data`; identità e recapiti in `src/config`.
- Componenti divisi per layout, sezioni e UI; pagine dinamiche nella fase successiva.
- MDX file-based per gli articoli, senza CMS esterno.
- Nessun database, tracker, agenda proprietaria o trattamento di dati sanitari.

Decisioni ad alto impatto:

- **Framework:** migrazione dal prototipo HTML a Next.js per routing, metadata, immagini e crescita modulare. Compromesso: setup maggiore, compensato dalla manutenzione più semplice.
- **Contenuti:** file TypeScript e MDX. Alternativa scartata: CMS, non necessario nella v1.
- **Prenotazione:** link esterno configurabile. Alternativa scartata: agenda interna, troppo complessa e rischiosa.
- **Form:** non attivo nella prima milestone; quando implementato userà campi minimi e un servizio con gestione privacy esplicita.
- **Analytics:** disabilitato per impostazione predefinita; eventuale attivazione solo con consenso e configurazione dedicata.

## 8. Componenti

- `Header`, `MobileNavigation`, `Footer`, `BookingBar`, `Container`.
- `ButtonLink`, `SectionHeading`, `Breadcrumbs`, `Disclaimer`.
- `Hero`, `ProblemGrid`, `CarePath`, `ExpertiseAreas`, `TrustSection`, `AboutPreview`, `ArticlePreview`, `FaqPreview`, `LocationPreview`, `FinalCta`.
- Template futuri: `TopicPage`, `ServicePage`, `ArticleLayout`.

## 9. Modello dei contenuti

- `SiteConfig`: identità, dominio, metadata, prenotazione, contatti e social.
- `Location`: più sedi supportate, con stato `confirmed`.
- `Problem`, `Condition`, `Service`: slug, titolo, sintesi, stato di revisione e relazioni.
- `Faq`: domanda, risposta, categoria e stato di conferma.
- Frontmatter MDX: titolo, descrizione, data, categoria, immagine, autore, stato di revisione e SEO.

## 10. Strategia SEO

- Intenti distinti per sintomi, patologie, sonno, prestazioni e località.
- Metadata e canonical per pagina, sitemap e robots generati da Next.js.
- Dati strutturati iniziali `Person`/`Physician` solo con dati visibili e verificati; `Article`, `FAQPage` e breadcrumb aggiunti insieme alle pagine corrispondenti.
- Link interni contestuali e URL descrittivi; nessun keyword stuffing.

## 11. Piano di implementazione

1. Analisi repository e inventario dei dati verificabili. **Completato**
2. Configurazione, token, tipografia, layout, header, footer e SEO di base. **Completato**
3. Homepage completa mobile-first. **Completato**
4. Revisione visiva e contenutistica della homepage. **Completato**
5. Template e pagine interne per problemi, patologie, esami e sonno. **Completato — testi in revisione medica**
6. Articoli MDX, FAQ, prenotazione, contatti e pagine legali. **Completato — integrazioni esterne e testi legali da confermare**
7. Verifiche finali: lint, tipi, build, link, responsive, accessibilità, SEO e performance.

## 12. Rischi e decisioni aperte

- Mancano sede professionale confermata, telefono pubblico, email professionale e link di prenotazione.
- Prestazioni effettivamente prenotabili e relative modalità devono essere confermate.
- Biografia, affiliazione lavorativa attuale e pubblicazioni devono essere approvate prima della pubblicazione.
- Servono testi legali revisionati e decisione sul fornitore del form.
- Recensioni e profilo Google non sono disponibili e resteranno non pubblicati.
- Il dominio definitivo è necessario per canonical, Open Graph e dati strutturati finali.
