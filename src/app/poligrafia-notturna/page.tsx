import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button-link";
import { booking } from "@/config/booking";
import { polygraphy, polygraphyEquipment as equipment } from "@/data/polygraphy";

export const metadata: Metadata = {
  title: "Poligrafia notturna a domicilio a Milano",
  description: "Scopri cos’è la poligrafia notturna, quando è indicata e come si svolge il monitoraggio cardiorespiratorio a domicilio per lo studio delle apnee del sonno.",
  alternates: { canonical: polygraphy.path },
  openGraph: { title: "Poligrafia notturna a domicilio a Milano", description: "Il monitoraggio cardiorespiratorio notturno: indicazioni, svolgimento e interpretazione specialistica.", url: polygraphy.path },
};

export default function PolygraphyPage() {
  const requestUrl = `${booking.path}#${polygraphy.serviceId}`;
  const showEquipment = equipment.confirmed && equipment.manufacturer && equipment.model && equipment.image && equipment.description;
  return <>
    <section className="internal-hero"><Container>
      <Breadcrumbs items={[{ label: "Esami", href: "/esami" }, { label: "Poligrafia notturna" }]} />
      <p className="eyebrow">Pneumologia e medicina del sonno · Milano</p>
      <h1>Monitoraggio cardiorespiratorio notturno a domicilio</h1>
      <p className="internal-lead">Un esame diagnostico per valutare la respirazione durante il sonno e identificare eventuali disturbi respiratori notturni, tra cui le apnee ostruttive del sonno.</p>
      <ButtonLink href={requestUrl}>Richiedi l’esame</ButtonLink>
    </Container></section>

    <section className="section"><Container className="polygraphy-editorial">
      <div><h2>Che cos’è la poligrafia notturna?</h2><p>La poligrafia del sonno, o monitoraggio cardiorespiratorio notturno, registra la respirazione mentre dormi. Questo monitoraggio cardio-respiratorio per lo studio delle apnee raccoglie segnali che dipendono dalla configurazione del dispositivo e possono comprendere:</p><ul><li>Flusso respiratorio.</li><li>Movimenti toracici e addominali.</li><li>Saturazione periferica di ossigeno.</li><li>Frequenza cardiaca.</li><li>Posizione corporea e russamento.</li></ul></div>
      <aside className="polygraphy-note"><h3>Poligrafia e polisonnogramma: qual è la differenza?</h3><p>La polisonnografia comprende anche segnali neurofisiologici per riconoscere le fasi del sonno e i risvegli. Il polisonnogramma è la registrazione ottenuta con questo esame: non va confuso con il tracciato della sola poligrafia respiratoria. I due esami rispondono a esigenze diverse e la scelta dipende dalla valutazione clinica.</p></aside>
    </Container></section>

    <section className="section section--tint"><Container className="polygraphy-editorial">
      <div><h2>Quando può essere utile?</h2><p>Una valutazione dei disturbi respiratori del sonno può essere indicata in presenza di:</p><ul><li>Russamento abituale, soprattutto con altri sintomi.</li><li>Pause respiratorie osservate durante il sonno.</li><li>Sonnolenza diurna eccessiva.</li><li>Risvegli con sensazione di soffocamento.</li><li>Sospetto clinico di apnee ostruttive del sonno.</li></ul></div>
      <div><p>La poligrafia non è appropriata per ogni persona. L’indicazione nasce dalla valutazione dei sintomi, della storia clinica e delle eventuali malattie associate.</p><p>Nei quadri complessi o quando l’esito non chiarisce il sospetto clinico possono essere necessari accertamenti differenti, inclusa la polisonnografia.</p></div>
    </Container></section>

    <section className="section"><Container>
      <h2>Come si svolge l’esame a domicilio?</h2>
      <ol className="polygraphy-process">{polygraphy.steps.map((step, index) => <li key={step.title}><span aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
    </Container></section>

    {showEquipment ? <section className="section section--tint"><Container className="polygraphy-editorial">
      <div><p className="eyebrow">La strumentazione utilizzata</p><h2>{equipment.manufacturer} {equipment.model}</h2><p>{equipment.description}</p>{equipment.benefits.length ? <ul>{equipment.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul> : null}</div>
      <Image src={equipment.image!} alt={`Dispositivo ${equipment.manufacturer} ${equipment.model} utilizzato per la poligrafia notturna`} width={640} height={480} sizes="(max-width: 800px) 92vw, 45vw" className="polygraphy-device" />
    </Container></section> : null}

    <section className="section section--tint"><Container className="polygraphy-reading">
      <h2>Cosa succede dopo l’esame?</h2>
      <p>La registrazione è una parte del percorso diagnostico. Lo specialista ne verifica la qualità e interpreta i risultati insieme ai sintomi, alla storia clinica e alle eventuali comorbidità.</p>
      <h3>Tempi di refertazione</h3>
      <p>Il referto è disponibile entro un massimo di 5 giorni lavorativi dalla riconsegna del dispositivo.</p>
      <p>In base al quadro possono essere proposti ulteriori approfondimenti, valutazioni o trattamenti specifici. Questi passaggi vengono concordati: non sono automaticamente inclusi nella prestazione.</p>
    </Container></section>

    <section className="section"><Container className="polygraphy-reading">
      <h2>Domande frequenti</h2>
      <div className="faq-list">{polygraphy.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      <p className="appointment-disclaimer">Le informazioni hanno finalità informative e non sostituiscono una valutazione medica.</p>
      <details className="diagnostic-sources"><summary>Riferimenti clinici</summary><ul><li><a href="https://aasm.org/resources/clinicalguidelines/diagnostic-testing-osa.pdf" target="_blank" rel="noreferrer">AASM — Diagnostica delle apnee ostruttive del sonno</a></li><li><a href="https://www.nhlbi.nih.gov/health/sleep-studies" target="_blank" rel="noreferrer">NHLBI — Studi del sonno</a></li></ul></details>
    </Container></section>

    <section className="section section--tint"><Container className="polygraphy-reading">
      <h2>Vuoi approfondire la qualità della tua respirazione durante il sonno?</h2>
      <p>Il monitoraggio cardiorespiratorio notturno può rappresentare un importante approfondimento diagnostico quando si sospetta un disturbo respiratorio del sonno. La scelta dell’esame più appropriato dipende dalla valutazione clinica.</p>
      <ButtonLink href={requestUrl}>Consulta disponibilità e prenotazioni</ButtonLink>
    </Container></section>
  </>;
}
