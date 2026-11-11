import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ServiceRequestLink } from "@/components/forms/service-request-link";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { homeActivity, homeServices } from "@/data/home-services";
import { booking } from "@/config/booking";
import { siteConfig } from "@/config/site";
import { getAppointmentConfig, getWhatsappUrl } from "@/lib/booking-config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Prestazioni e prenotazioni a Milano e Corsico",
  description: "Pneumologia e Medicina del Sonno a domicilio: prestazioni, tariffe e richieste di appuntamento nell’area di Milano e Corsico. Disponibilità da concordare.",
  alternates: { canonical: booking.path },
  openGraph: { title: "Prestazioni e prenotazioni", description: "Prestazioni domiciliari, tariffe e modalità di richiesta appuntamento a Milano e Corsico.", url: booking.path },
};

export default function ServicesBookingPage() {
  const config = getAppointmentConfig();
  const services = homeServices.filter(s => s.enabled);
  return <>
    <section className="internal-hero booking-unified-hero"><Container><Breadcrumbs items={[{ label: "Prestazioni e prenotazioni" }]} /><p className="eyebrow">Pneumologia e Medicina del Sonno · A domicilio</p><h1>Prestazioni e prenotazioni</h1><p className="internal-lead">Consulta le prestazioni nell’area di {homeActivity.areas} e scegli come richiedere un appuntamento. La disponibilità viene concordata dopo il contatto.</p><nav className="booking-anchor-nav" aria-label="Sezioni prestazioni e prenotazioni"><a className="button button--primary" href="#richiedi-appuntamento">Prenota una visita</a><a className="button button--secondary" href="#prestazioni">Prestazioni e tariffe</a><a className="button button--secondary" href="#whatsapp">Contatto WhatsApp</a></nav></Container></section>
    <section className="section booking-unified-body"><Container className="booking-unified-grid">
      <div id="prestazioni"><p className="eyebrow">Cosa comprende il percorso</p><h2>Prestazioni e tariffe</h2><div className="booking-service-grid">{services.map(s => <article className="booking-service-row" key={s.id}><p className="eyebrow">{s.category}</p><h3>{s.title}</h3><p>{s.description}</p><div className="booking-service-meta"><span>{s.status === "active" ? "Su appuntamento" : "Disponibilità da concordare"}</span><strong>{s.priceConfirmed && s.priceEur !== null ? s.priceEur.toLocaleString("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }) : "Tariffa in definizione"}</strong></div><div className="booking-service-links"><ServiceRequestLink serviceId={s.id} />{s.id === "poligrafia-domiciliare" ? <Link href="/poligrafia-respiratoria-milano">Approfondisci</Link> : null}</div></article>)}</div><p className="appointment-disclaimer">{homeActivity.supplementNote}</p></div>
      <div className="booking-request-column"><section id="richiedi-appuntamento" aria-labelledby="request-heading"><p className="eyebrow">Il prossimo passo</p><h2 id="request-heading">Richiedi un appuntamento</h2><p>Compila il modulo per richiedere un appuntamento. Ti ricontatterò per concordare la disponibilità e le modalità della visita.</p><AppointmentForm enabled={config.enabled} siteKey={config.enabled ? config.siteKey : undefined} services={services.map(({id, title}) => ({id, title}))} /></section><section className="booking-whatsapp" id="whatsapp"><MessageCircle aria-hidden="true" /><h3>Preferisci WhatsApp?</h3><p>Puoi utilizzare WhatsApp Business per richieste organizzative, senza inviare informazioni sanitarie.</p><a className="button button--secondary" href={getWhatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" />Contatta su WhatsApp</a><p className="appointment-disclaimer">In alternativa: <a href={siteConfig.emailHref}>{siteConfig.email}</a></p></section></div>
    </Container></section>
  </>;
}
