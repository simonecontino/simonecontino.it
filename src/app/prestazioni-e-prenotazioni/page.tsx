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
    <section className="internal-hero booking-unified-hero"><Container><Breadcrumbs items={[{ label: "Prestazioni e prenotazioni" }]} /><p className="eyebrow">Pneumologia e Medicina del Sonno · A domicilio</p><h1>Prestazioni e prenotazioni</h1><p className="internal-lead">Consulta le prestazioni nell’area di {homeActivity.areas} e scegli come richiedere un appuntamento. La disponibilità viene concordata dopo il contatto.</p><nav className="booking-anchor-nav" aria-label="Sezioni prestazioni e prenotazioni"><a className="button button--primary" href="#richiedi-appuntamento">Prenota una visita o esame</a><a className="button button--secondary" href="#prestazioni">Prestazioni e tariffe</a><a className="button button--secondary" href="#whatsapp">Contatto WhatsApp</a></nav></Container></section>
    <section className="section booking-unified-body"><Container className="booking-unified-grid">
      <div id="prestazioni">
        <p className="eyebrow">Cosa comprende il percorso</p>
        <h2>Prestazioni e tariffe</h2>
        <ul className="booking-service-list">
          {services.map(s => (
            <li key={s.id}>
              <article className="booking-service-row">
                <div className="booking-service-content">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  {s.id === "poligrafia-domiciliare" ? <Link className="booking-service-detail" href="/poligrafia-respiratoria-milano">Approfondisci</Link> : null}
                </div>
                <div className="booking-service-action">
                  <strong className="booking-service-price">
                    {s.priceConfirmed && s.priceEur !== null
                      ? s.priceEur.toLocaleString("it-IT", { maximumFractionDigits: 0 })
                      : "Tariffa in definizione"}
                  </strong>
                  <ServiceRequestLink serviceId={s.id} />
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="appointment-disclaimer">{homeActivity.supplementNote}</p>
      </div>
      <div className="booking-request-column"><section id="richiedi-appuntamento" aria-labelledby="request-heading"><p className="eyebrow">Il prossimo passo</p><h2 id="request-heading">Richiedi una visita o un esame</h2><p>Seleziona la visita specialistica o l’esame diagnostico di cui hai bisogno e invia la tua richiesta. Ti ricontatterò per concordare disponibilità e modalità della prestazione.</p><AppointmentForm enabled={config.enabled} siteKey={config.enabled ? config.siteKey : undefined} services={services.map(({id, title}) => ({id, title}))} /></section><section className="booking-whatsapp" id="whatsapp"><MessageCircle aria-hidden="true" /><h3>Preferisci WhatsApp?</h3><p>Puoi utilizzare WhatsApp Business per richieste organizzative, senza inviare informazioni sanitarie.</p><a className="button button--secondary" href={getWhatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" />Contatta su WhatsApp</a><p className="appointment-disclaimer">In alternativa: <a href={siteConfig.emailHref}>{siteConfig.email}</a></p></section></div>
    </Container></section>
  </>;
}
