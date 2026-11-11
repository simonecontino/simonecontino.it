import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { homeActivity, homeServices } from "@/data/home-services";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Prestazioni domiciliari e tariffe a Milano e Corsico",
  description: "Prestazioni domiciliari di Pneumologia e Medicina del Sonno del Dr. Simone Contino: attività prevista da gennaio 2027 a Milano e Corsico.",
  alternates: { canonical: "/prestazioni-e-tariffe" },
};

export default function HomeServicesPage() {
  return <>
    <section className="internal-hero"><Container><Breadcrumbs items={[{ label: "Prestazioni e tariffe" }]} /><p className="eyebrow">Milano e Corsico · Attività domiciliare</p><h1>Prestazioni e tariffe</h1><p className="internal-lead">Attività libero-professionale prevista da {homeActivity.startLabel}. Gli appuntamenti saranno concordati telefonicamente, dopo una richiesta di contatto.</p><p>Le prestazioni riportate sono in preparazione e non sono ancora presentate come immediatamente disponibili.</p></Container></section>
    <section className="section"><Container>
      {(["Pneumologia", "Medicina del Sonno"] as const).map(category => <section className="home-services-category" key={category}><h2>{category}</h2><div className="service-index-grid">{homeServices.filter(s => s.enabled && s.category === category).map(s => <article className="home-service-card" key={s.id}><p className="eyebrow">{s.status === "planned" ? `Prevista da ${homeActivity.startLabel}` : "Attiva su appuntamento"}</p><h3>{s.title}</h3><p>{s.description}</p>{s.id === "poligrafia-domiciliare" ? <a href="/poligrafia-respiratoria-milano">Approfondisci la poligrafia domiciliare</a> : null}<p className="home-service-price">{s.priceConfirmed && s.priceEur !== null ? s.priceEur.toLocaleString("it-IT", { style: "currency", currency: "EUR" }) : "Tariffa in definizione"}</p><a className="button button--secondary" href={siteConfig.phoneHref}>Informazioni sull’avvio</a></article>)}</div></section>)}
      <p>{homeActivity.supplementNote}</p><p>Consegna, registrazione, ritiro e refertazione degli esami saranno descritti dopo la conferma delle modalità operative.</p>
    </Container></section>
  </>;
}
