import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
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
    <section className="internal-hero booking-unified-hero"><Container><Breadcrumbs items={[{ label: "Prestazioni e prenotazioni" }]} /><p className="eyebrow">Pneumologia e Medicina del Sonno</p><h1>Prestazioni e prenotazioni</h1></Container></section>
    <section className="section booking-unified-body"><Container className="booking-unified-grid">
      <div className="booking-request-column">
        <section id="richiedi-appuntamento" className="booking-request-box" aria-labelledby="request-heading">
          <h2 id="request-heading">Richiedi un ricontatto</h2>
          <p className="booking-request-intro">Scegli una visita o un esame e lascia i recapiti: ti ricontatterò per concordare i dettagli.</p>
          <AppointmentForm enabled={config.enabled} siteKey={config.enabled ? config.siteKey : undefined} services={services.map(({id, title}) => ({id, title}))} />
        </section>
        <div className="booking-contact-options" id="whatsapp">
          <p>Preferisci un contatto diretto?</p>
          <a className="button booking-contact-whatsapp" href={getWhatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={20} aria-hidden="true" />WhatsApp</a>
          <a className="button booking-contact-email" href={siteConfig.emailHref}><Mail size={20} aria-hidden="true" />Scrivi un’email</a>
          <small>Solo richieste organizzative, senza informazioni sanitarie.</small>
        </div>
      </div>
      <div id="prestazioni" className="booking-catalog">
        <ul className="booking-service-list">
          {services.map(s => (
            <li key={s.id}>
              <article className="booking-service-row">
                <div className="booking-service-content">
                  <h2>{s.title}</h2>
                  {s.bookingNote ? <p>{s.bookingNote}</p> : null}
                  {s.id === "poligrafia-domiciliare" ? <Link className="booking-service-detail" href="/poligrafia-respiratoria-milano">Approfondisci</Link> : null}
                </div>
                <div className="booking-service-action">
                  <strong className="booking-service-price">
                    {s.priceConfirmed && s.priceEur !== null
                      ? s.priceEur.toLocaleString("it-IT", { maximumFractionDigits: 0 })
                      : "Tariffa in definizione"}
                  </strong>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="appointment-disclaimer">{homeActivity.supplementNote}</p>
      </div>
    </Container></section>
  </>;
}
