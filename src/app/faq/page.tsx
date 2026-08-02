import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { faqs } from "@/data/home";

export const metadata: Metadata = { title: "Domande frequenti", description: "Risposte alle domande pratiche sulla visita pneumologica, la valutazione del sonno, i documenti e la prenotazione." };
export default function FaqPage() { return <><section className="internal-hero"><Container><Breadcrumbs items={[{ label: "FAQ" }]} /><p className="eyebrow">Prima della visita</p><h1>Domande frequenti</h1><p className="internal-lead">Informazioni pratiche per arrivare alla valutazione con maggiore chiarezza. Le modalità dipendenti dalla sede restano evidenziate finché non confermate.</p></Container></section><section className="section"><Container className="faq-page-layout"><div><h2>Visita e documenti</h2><p>Se non trovi la risposta che cerchi, utilizza esclusivamente i recapiti professionali che saranno indicati nella pagina Contatti.</p></div><div className="faq-list faq-list--large">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p>{faq.needsConfirmation ? <small>Informazione da confermare prima della pubblicazione.</small> : null}</details>)}</div></Container></section><section className="topic-cta"><Container><h2>Hai bisogno di una valutazione?</h2><ButtonLink href="/prenota">Prenota una visita</ButtonLink></Container></section></>;
}
