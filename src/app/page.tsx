import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, ClipboardCheck, Ear, MapPin, MoonStar, Stethoscope } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { articles, faqs, problems } from "@/data/home";
import { locations } from "@/data/locations";

export default function HomePage() {
  const location = locations[0];
  return (
    <>
      <section className="hero">
        <Container className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Dr. Simone Contino · Specialista in Pneumologia</p>
            <h1>{siteConfig.home.title}</h1>
            <p className="hero-lead">{siteConfig.home.subtitle}</p>
            <p className="hero-support">{siteConfig.home.support}</p>
            <div className="hero-actions">
              <ButtonLink href="/prenota">Prenota una visita</ButtonLink>
              <ButtonLink href="#come-posso-aiutarti" variant="secondary">Scopri come posso aiutarti</ButtonLink>
            </div>
            <ul className="hero-points" aria-label="Informazioni principali">
              <li><Check aria-hidden="true" /> Pneumologia generale</li>
              <li><Check aria-hidden="true" /> Disturbi respiratori del sonno</li>
              <li><Check aria-hidden="true" /> Milano</li>
            </ul>
          </div>
          <div className="hero-portrait">
            <div className="portrait-frame"><Image src="/images/simone-contino.jpg" alt="Ritratto professionale del Dr. Simone Contino" fill priority sizes="(max-width: 800px) 92vw, 42vw" /></div>
            <div className="portrait-caption"><strong>Capire, spiegare, costruire.</strong><span>Un percorso di cura condiviso e comprensibile.</span></div>
          </div>
        </Container>
      </section>

      <section className="section" id="come-posso-aiutarti">
        <Container>
          <SectionHeading eyebrow="Partire dai sintomi" title="Hai uno di questi problemi?" text="Non è necessario conoscere già la diagnosi. Il primo passo è descrivere con precisione ciò che accade e da quanto tempo." />
          <div className="problem-grid">
            {problems.map((problem, index) => (
              <Link className="problem-card" href={problem.slug === "asma" || problem.slug === "bpco" ? `/patologie/${problem.slug}` : problem.slug === "valutazione-pneumologica" ? "/esami/prima-visita-pneumologica" : `/problemi/${problem.slug}`} key={problem.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span><h3>{problem.title}</h3><p>{problem.description}</p><ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--tint">
        <Container>
          <SectionHeading eyebrow="Il percorso di cura" title="Una valutazione costruita con metodo" text="Ogni indicazione nasce dalla comprensione della storia clinica e da scelte motivate, spiegate con parole chiare." />
          <ol className="care-path">
            <li><span>01</span><Ear aria-hidden="true" /><h3>Ti ascolto</h3><p>Prima di formulare ipotesi o indicare esami, è importante comprendere la storia clinica, i sintomi e le esigenze della persona.</p></li>
            <li><span>02</span><ClipboardCheck aria-hidden="true" /><h3>Valutiamo il problema</h3><p>La valutazione clinica e gli eventuali approfondimenti vengono scelti in modo appropriato e motivato.</p></li>
            <li><span>03</span><Stethoscope aria-hidden="true" /><h3>Costruiamo il percorso</h3><p>L’obiettivo è definire insieme un percorso diagnostico e terapeutico comprensibile e personalizzato.</p></li>
          </ol>
        </Container>
      </section>

      <section className="section expertise-section">
        <Container>
          <SectionHeading eyebrow="Aree di competenza" title="Pneumologia, sonno e continuità di cura" />
          <div className="expertise-grid">
            <article><Stethoscope aria-hidden="true" /><h3>Pneumologia</h3><p>Valutazione dei principali sintomi e delle patologie dell’apparato respiratorio.</p><ul><li>Asma e BPCO</li><li>Tosse persistente e dispnea</li><li>Bronchiectasie e malattie interstiziali</li><li>Insufficienza respiratoria</li></ul><Link href="/patologie">Approfondisci <ArrowRight aria-hidden="true" /></Link></article>
            <article className="expertise-featured"><MoonStar aria-hidden="true" /><h3>Disturbi respiratori del sonno</h3><p>Particolare esperienza nella valutazione di russamento, apnee ostruttive e problemi correlati.</p><ul><li>Russamento e sospette apnee</li><li>Valutazione del sonno</li><li>Poligrafia respiratoria*</li><li>Follow-up e report CPAP</li></ul><small>* Disponibilità da verificare</small><Link href="/sonno">Scopri l’area sonno <ArrowRight aria-hidden="true" /></Link></article>
            <article><ClipboardCheck aria-hidden="true" /><h3>Controlli e continuità</h3><p>Rivalutazioni comprensibili e indicazioni chiare sui passaggi successivi.</p><ul><li>Monitoraggio della terapia</li><li>Interpretazione degli esami</li><li>Patologie respiratorie croniche</li><li>Percorsi di follow-up</li></ul><Link href="/esami">Esami e valutazioni <ArrowRight aria-hidden="true" /></Link></article>
          </div>
        </Container>
      </section>

      <section className="section trust-section">
        <Container className="trust-grid">
          <div><p className="eyebrow">Un rapporto di cura concreto</p><h2>Competenza che si traduce in scelte comprensibili</h2><p>La qualità di una visita emerge dall’attenzione ai dettagli, dalla pertinenza degli approfondimenti e dalla capacità di rendere chiaro il percorso.</p></div>
          <div className="trust-list">
            <article><span>01</span><div><h3>Approccio specialistico</h3><p>Valutazione clinica aggiornata e orientata dalle evidenze scientifiche.</p></div></article>
            <article><span>02</span><div><h3>Ascolto</h3><p>Spazio alla storia clinica, ai sintomi e ai dubbi della persona.</p></div></article>
            <article><span>03</span><div><h3>Esperienza nell’area sonno</h3><p>Attenzione specifica ai disturbi respiratori notturni, senza separarla dalla pneumologia generale.</p></div></article>
            <article><span>04</span><div><h3>Chiarezza e continuità</h3><p>Spiegazioni accessibili e indicazioni precise sui passaggi successivi.</p></div></article>
          </div>
        </Container>
      </section>

      <section className="section about-section">
        <Container className="about-grid">
          <div className="about-photo"><Image src="/images/simone-contino.jpg" alt="Dr. Simone Contino, medico specialista in Pneumologia" fill sizes="(max-width: 800px) 92vw, 40vw" /></div>
          <div><p className="eyebrow">Chi sono</p><h2>Dr. Simone Contino</h2><p className="about-role">Medico Chirurgo<br />Specialista in Pneumologia</p><p>Mi occupo delle patologie dell’apparato respiratorio e dei disturbi respiratori del sonno. La mia formazione comprende la specializzazione in Malattie dell’Apparato Respiratorio presso l’Università degli Studi di Milano e attività scientifica in ambito pneumologico.</p><p>Nel lavoro clinico cerco di trasformare informazioni complesse in indicazioni comprensibili, per costruire con ogni persona un percorso coerente con il suo problema e le sue esigenze.</p><ButtonLink href="/chi-sono" variant="secondary">Scopri il mio percorso professionale</ButtonLink></div>
        </Container>
      </section>

      <section className="section section--tint">
        <Container>
          <SectionHeading eyebrow="Informazione e prevenzione" title="Articoli per capire meglio il respiro" text="I contenuti saranno pubblicati solo dopo revisione medica. Le anteprime seguenti mostrano la struttura editoriale prevista." />
          <div className="article-grid">
            {articles.map((article) => <article className="article-card" key={article.slug}><div><span>{article.category}</span><span className="draft-badge">Bozza · revisione medica</span></div><h3>{article.title}</h3><p>{article.description}</p><footer><span>{article.readingTime} di lettura</span><span>{article.date}</span></footer></article>)}
          </div>
          <div className="section-action"><ButtonLink href="/articoli" variant="secondary">Leggi tutti gli articoli</ButtonLink></div>
        </Container>
      </section>

      <section className="section faq-home">
        <Container className="faq-layout">
          <div><p className="eyebrow">Domande frequenti</p><h2>Informazioni pratiche prima della visita</h2><p>Le risposte che dipendono dalla sede o dall’organizzazione saranno completate solo dopo conferma.</p><ButtonLink href="/faq" variant="text">Vedi tutte le FAQ <ArrowRight aria-hidden="true" /></ButtonLink></div>
          <div className="faq-list">{faqs.slice(0, 5).map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p>{faq.needsConfirmation ? <small>Informazione da confermare prima della pubblicazione.</small> : null}</details>)}</div>
        </Container>
      </section>

      <section className="section location-section">
        <Container className="location-card">
          <a className="map-placeholder" href={location.mapsUrl} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span>Apri la sede in Google Maps</span></a>
          <div><p className="eyebrow">Dove ricevo</p><h2>Visite a Milano</h2>{!location.confirmed ? <p className="status-note">Sede in fase di configurazione</p> : null}<dl><div><dt>Struttura</dt><dd>{location.name}</dd></div><div><dt>Indirizzo</dt><dd>{location.address}, {location.city}</dd></div><div><dt>Orari</dt><dd>{location.hours}</dd></div></dl><ButtonLink href="/dove-ricevo" variant="secondary">Informazioni sulla sede</ButtonLink></div>
        </Container>
      </section>

      <section className="final-cta">
        <Container><BookOpen aria-hidden="true" /><h2>{siteConfig.home.closing}</h2><p>Se desideri discutere un sintomo respiratorio o una condizione già nota, il passo successivo è richiedere una valutazione.</p><ButtonLink href="/prenota">Prenota una visita</ButtonLink></Container>
      </section>
    </>
  );
}
