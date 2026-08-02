import Link from "next/link";
import { AlertTriangle, ArrowRight, ClipboardList, HeartPulse, Search, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { allTopics } from "@/data/topics";
import { medicalDisclaimer } from "@/config/site";
import type { Topic } from "@/types/content";

const labels = { problema: { parent: "Problemi", href: "/problemi" }, patologia: { parent: "Patologie", href: "/patologie" }, sonno: { parent: "Sonno", href: "/sonno" } };

function ListSection({ icon: Icon, title, items }: { icon: typeof Search; title: string; items: string[] }) {
  return <section className="topic-content-section"><div className="topic-section-title"><Icon aria-hidden="true" /><h2>{title}</h2></div><ul className="check-list">{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

export function TopicPage({ topic }: { topic: Topic }) {
  const label = labels[topic.kind];
  const related = allTopics.filter((item) => topic.relatedSlugs.includes(item.slug));
  return <>
    <section className="internal-hero"><Container><Breadcrumbs items={[{ label: label.parent, href: label.href }, { label: topic.title }]} /><div className="internal-hero-grid"><div><p className="eyebrow">{topic.kind === "problema" ? "Comprendere un sintomo" : "Conoscere la patologia"}</p><h1>{topic.title}</h1><p className="internal-lead">{topic.description}</p><ButtonLink href="/prenota">Prenota una visita</ButtonLink></div></div></Container></section>
    <Container className="topic-layout"><article className="topic-main"><section className="topic-intro"><h2>In breve</h2><p>{topic.intro}</p></section><ListSection icon={HeartPulse} title="Segnali e sintomi più comuni" items={topic.commonSigns} /><ListSection icon={Stethoscope} title="Quando rivolgersi allo pneumologo" items={topic.whenToSeekCare} />{topic.urgentNote ? <aside className="urgent-note"><AlertTriangle aria-hidden="true" /><div><strong>Quando chiedere aiuto subito</strong><p>{topic.urgentNote}</p></div></aside> : null}<ListSection icon={Search} title="Come avviene la valutazione" items={topic.evaluation} /><ListSection icon={ClipboardList} title="Possibili approfondimenti" items={topic.possibleTests} /><ListSection icon={HeartPulse} title="Possibili percorsi di cura" items={topic.careOptions} /><aside className="medical-disclaimer">{medicalDisclaimer}</aside></article><aside className="topic-sidebar"><div><strong>In questa pagina</strong><a href="#contenuto">Panoramica</a><span>Sintomi</span><span>Valutazione</span><span>Approfondimenti</span><span>Percorso di cura</span></div><div><strong>Fonti informative</strong>{topic.references.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>)}</div></aside></Container>
    {related.length ? <section className="section section--tint"><Container><p className="eyebrow">Può essere utile anche</p><h2>Approfondimenti correlati</h2><div className="related-grid">{related.map((item) => <Link key={item.slug} href={`/${item.kind === "problema" ? "problemi" : "patologie"}/${item.slug}`}><h3>{item.title}</h3><p>{item.description}</p><span>Leggi <ArrowRight aria-hidden="true" /></span></Link>)}</div></Container></section> : null}
    <section className="topic-cta"><Container><h2>Capire il problema è il primo passo.</h2><p>Una valutazione specialistica permette di mettere in relazione sintomi, storia clinica ed eventuali esami.</p><ButtonLink href="/prenota">Prenota una visita</ButtonLink></Container></section>
  </>;
}
