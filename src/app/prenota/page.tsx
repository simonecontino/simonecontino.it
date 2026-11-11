import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/config/site";
import { homeActivity } from "@/data/home-services";

export const metadata: Metadata = { title: "Richiedi un appuntamento a domicilio", description: "Informazioni sull’attività domiciliare del Dr. Simone Contino a Milano e Corsico, prevista da gennaio 2027. Appuntamenti da concordare telefonicamente.", alternates: { canonical: "/prenota" } };

export default function BookingPage() {
  return <><section className="booking-page-hero"><Container><Breadcrumbs items={[{ label: "Richiedi un appuntamento" }]} /><p className="eyebrow">Attività prevista da {homeActivity.startLabel}</p><h1>Richiedi un appuntamento</h1><p className="internal-lead">L’attività domiciliare a {homeActivity.areas} è in preparazione. Per informazioni sull’avvio puoi utilizzare i recapiti professionali.</p></Container></section><section className="section"><Container className="contact-layout--single"><h2>Un contatto, poi la conferma telefonica</h2><p>La disponibilità sarà concordata telefonicamente. Una richiesta di contatto non costituisce un appuntamento confermato.</p><div className="booking-contact-list"><article><div><h3>Telefono</h3><a href={siteConfig.phoneHref}>{siteConfig.phone}</a></div></article><article><div><h3>Email</h3><a href={siteConfig.emailHref}>{siteConfig.email}</a></div></article><article><div><h3>WhatsApp Business</h3><a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">{siteConfig.whatsapp}</a></div></article></div><p>Utilizza questi canali per richieste organizzative. Non inviare diagnosi, referti o altre informazioni sanitarie sensibili nei messaggi generici.</p><p>Il modulo di richiesta sarà disponibile dopo la configurazione del servizio di invio e dell’informativa privacy.</p></Container></section></>;
}
