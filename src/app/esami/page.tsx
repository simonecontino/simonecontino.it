import { booking } from "@/config/booking";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { diagnosticGroups, diagnosticReferences } from "@/data/diagnostic-guide";

export const metadata: Metadata = { title: "Esami in pneumologia e medicina del sonno", description: "Una guida a spirometria, broncodilatazione, DLCO, ossigenazione e diagnostica del sonno: a cosa servono gli esami e come si svolgono.", alternates: { canonical: "/esami" } };

export default function ExamsPage() {
  return <>
    <section className="internal-hero"><Container>
      <Breadcrumbs items={[{ label: "Esami" }]} />
      <p className="eyebrow">Guida alla diagnostica respiratoria</p>
      <h1>Gli esami in pneumologia e medicina del sonno</h1>
      <p className="internal-lead">Conoscere gli esami diagnostici aiuta a comprendere meglio il proprio percorso di cura. Una guida alle principali indagini utilizzate per valutare la funzione respiratoria, l’ossigenazione e i disturbi respiratori del sonno.</p>
    </Container></section>
    <section className="section"><Container className="diagnostic-guide">
      <p className="diagnostic-context">Questa guida descrive le metodiche diagnostiche in generale, non l’elenco delle prestazioni prenotabili con il medico. Le informazioni non sostituiscono una valutazione medica.</p>
      <nav className="diagnostic-index" aria-label="Argomenti della guida">{diagnosticGroups.map(group => <a href={`#${group.id}`} key={group.id}>{group.title}</a>)}</nav>
      {diagnosticGroups.map(group => <section className="diagnostic-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
        <h2 id={`${group.id}-title`}>{group.title}</h2>
        <p className="diagnostic-group-intro">{group.description}</p>
        <div className="diagnostic-list">{group.exams.map(exam => <details className="diagnostic-exam" key={exam.id}>
          <summary><div><h3>{exam.title}</h3><p>{exam.purpose}</p></div><ChevronDown aria-hidden="true" /></summary>
          <div className="diagnostic-exam-body">
            <dl><dt>Come si svolge</dt><dd>{exam.procedure}</dd><dt>Quando può essere utile</dt><dd>{exam.indications}</dd></dl>
            {exam.links ? <div className="diagnostic-links">{exam.links.map(link => <Link href={link.href} key={link.href}>{link.label}</Link>)}</div> : null}
          </div>
        </details>)}</div>
      </section>)}
      <details className="diagnostic-sources"><summary>Riferimenti per approfondire</summary><ul>{diagnosticReferences.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul></details>
      <section className="diagnostic-next-step" aria-labelledby="diagnostic-next-title">
        <h2 id="diagnostic-next-title">Hai bisogno di una valutazione pneumologica?</h2>
        <p>La scelta degli esami dipende dai sintomi, dalla storia clinica e dagli obiettivi della valutazione. Durante una visita pneumologica è possibile individuare gli approfondimenti più appropriati.</p>
        <ButtonLink href={booking.path}>Consulta prestazioni e prenotazioni</ButtonLink>
      </section>
    </Container></section>
  </>;
}
