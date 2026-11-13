import { booking } from "@/config/booking";
import { features } from "@/config/features";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardCheck, MoonStar, Stethoscope } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { articles, faqs, problems } from "@/data/home";
import { GoogleReviewsSection } from "@/components/reviews/google-reviews-section";
import { getGoogleReviews } from "@/lib/google-reviews";

export default async function HomePage() {
  const googleReviews = await getGoogleReviews();
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
              <ButtonLink href={booking.requestUrl}>Prenota una visita o esame</ButtonLink>
              <ButtonLink href="#come-posso-aiutarti" variant="secondary">Scopri come posso aiutarti</ButtonLink>
            </div>
          </div>
          <div className="hero-portrait">
            <div className="portrait-frame"><Image src="/images/simone-contino.jpg" alt="Ritratto professionale del Dr. Simone Contino" fill priority loading="eager" sizes="(max-width: 800px) 92vw, 42vw" /></div>
            <div className="portrait-caption"><strong>Capire, spiegare, costruire.</strong><span>Un percorso di cura condiviso e comprensibile.</span></div>
          </div>
        </Container>
      </section>

      <section className="section" id="come-posso-aiutarti">
        <Container>
          <SectionHeading eyebrow="Partire dai sintomi" title="Hai uno di questi problemi?" text="Non è necessario conoscere già la diagnosi. Il primo passo è descrivere con precisione ciò che accade e da quanto tempo." />
          <div className="problem-grid">
            {problems.map((problem) => (
              <Link className="problem-card" href={problem.slug === "asma" || problem.slug === "bpco" ? `/patologie/${problem.slug}` : problem.slug === "valutazione-pneumologica" ? "/esami/prima-visita-pneumologica" : `/problemi/${problem.slug}`} key={problem.slug}>
                <h3>{problem.title}</h3><p>{problem.description}</p><ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--tint home-clinical-method" aria-labelledby="clinical-method-title">
        <Container>
          <p className="eyebrow">Il percorso di cura</p>
          <h2 id="clinical-method-title">Un percorso di cura chiaro e personalizzato</h2>
          <p>Ogni percorso inizia dall’ascolto dei sintomi e dalla valutazione della storia clinica. L’obiettivo è individuare gli approfondimenti realmente necessari, spiegare con chiarezza i risultati e definire insieme al paziente le successive decisioni diagnostiche e terapeutiche.</p>
        </Container>
      </section>

      <section className="section expertise-section">
        <Container>
          <SectionHeading eyebrow="Aree di competenza" title="Pneumologia, sonno e continuità di cura" />
          <div className="expertise-grid">
            <article><Stethoscope aria-hidden="true" /><h3>Pneumologia</h3><p>Valutazione dei principali sintomi e delle patologie dell’apparato respiratorio.</p><ul><li>Asma e BPCO</li><li>Nodulo polmonare e patologie restrittive</li><li>Bronchiectasie e malattie interstiziali</li><li>Gestione respiratoria delle patologie neuromuscolari</li></ul><Link href="/patologie">Approfondisci <ArrowRight aria-hidden="true" /></Link></article>
            <article className="expertise-featured"><MoonStar aria-hidden="true" /><h3>Disturbi respiratori del sonno</h3><p>Trascorriamo circa un terzo della vita a letto: una buona salute del sonno sostiene la qualità della vita e la prevenzione.</p><ul><li>Russamento e sospette apnee</li><li>Valutazione del sonno</li><li>Poligrafia notturna</li><li>Follow-up e lettura e interpretazione report CPAP e NIV</li></ul><Link href="/sonno">Scopri l’area sonno <ArrowRight aria-hidden="true" /></Link></article>
            <article><ClipboardCheck aria-hidden="true" /><h3>Controlli e continuità</h3><p>Rivalutazioni comprensibili e indicazioni chiare sui passaggi successivi.</p><ul><li>Monitoraggio della terapia</li><li>Interpretazione degli esami</li><li>Patologie respiratorie croniche</li><li>Percorsi di follow-up</li></ul><Link href="/esami">Esami e valutazioni <ArrowRight aria-hidden="true" /></Link></article>
          </div>
        </Container>
      </section>

      <section className="section about-section">
        <Container className="about-grid">
          <div className="about-photo"><Image src="/images/simone-contino.jpg" alt="Dr. Simone Contino, medico specialista in Pneumologia" fill sizes="(max-width: 800px) 92vw, 40vw" /></div>
          <div><p className="eyebrow">Chi sono</p><h2>Dr. Simone Contino</h2><p className="about-role">Medico Chirurgo<br />Specialista in Pneumologia</p><p>Mi occupo delle patologie dell’apparato respiratorio e dei disturbi respiratori del sonno. La mia formazione comprende la specializzazione in Malattie dell’Apparato Respiratorio presso l’Università degli Studi di Milano e attività scientifica in ambito pneumologico.</p><p>Nel lavoro clinico cerco di trasformare informazioni complesse in indicazioni comprensibili, per costruire con ogni persona un percorso coerente con il suo problema e le sue esigenze.</p><ButtonLink href="/chi-sono" variant="secondary">Scopri il mio percorso professionale</ButtonLink></div>
        </Container>
      </section>

      <section className="section section--tint home-domestic-services" aria-labelledby="home-domestic-title">
        <Container>
          <p className="eyebrow">PRESTAZIONI DOMICILIARI · MILANO E CORSICO</p>
          <h2 id="home-domestic-title">Pneumologia e Medicina del Sonno a domicilio</h2>
          <p>Visite specialistiche ed esami diagnostici respiratori eseguiti direttamente al domicilio del paziente, con valutazione medica e refertazione specialistica.</p>
          <p>Consulta le prestazioni disponibili, le tariffe e le modalità di prenotazione.</p>
          <ButtonLink href={booking.path} variant="secondary">Prestazioni e tariffe</ButtonLink>
        </Container>
      </section>
      <GoogleReviewsSection data={googleReviews} fallbackUrl={siteConfig.googleReviewsUrl} />

      {features.articlesEnabled ? (      <section className="section section--tint">
        <Container>
          <SectionHeading eyebrow="Informazione e prevenzione" title="Articoli per capire meglio il respiro" text="Una sezione in sviluppo, pensata per spiegare con chiarezza sintomi, patologie ed esami respiratori." />
          <div className="article-grid">
            {articles.map((article) => <article className="article-card" key={article.slug}><div><span>{article.category}</span></div><h3>{article.title}</h3><p>{article.description}</p><footer><span>{article.readingTime} di lettura</span></footer></article>)}
          </div>
          <div className="section-action"><ButtonLink href="/articoli" variant="secondary">Leggi tutti gli articoli</ButtonLink></div>
        </Container>
      </section>
      ) : null}

      <section className="section faq-home">
        <Container className="faq-layout">
          <div><p className="eyebrow">Domande frequenti</p><h2>Informazioni pratiche prima della visita</h2><p>Indicazioni utili per prepararsi alla visita e comprendere come si svolge il percorso.</p><ButtonLink href="/faq" variant="text">Vedi tutte le FAQ <ArrowRight aria-hidden="true" /></ButtonLink></div>
          <div className="faq-list">{faqs.slice(0, 5).map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p>{faq.needsConfirmation ? <small>Informazione da confermare prima della pubblicazione.</small> : null}</details>)}</div>
        </Container>
      </section>

      <section className="final-cta">
        <Container><BookOpen aria-hidden="true" /><h2>{siteConfig.home.closing}</h2><p>Se desideri discutere un sintomo respiratorio o una condizione già nota, il passo successivo è richiedere una valutazione.</p><ButtonLink href={booking.requestUrl}>Prenota una visita o esame</ButtonLink></Container>
      </section>
    </>
  );
}
