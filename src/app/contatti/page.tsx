import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { getWhatsappUrl } from "@/lib/booking-config";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Contatti", alternates: { canonical: "/contatti" }, description: "Contatti professionali del Dr. Simone Contino per richieste organizzative e prenotazioni a Milano." };
export default function ContactPage() { return <><section className="internal-hero"><Container><Breadcrumbs items={[{ label: "Contatti" }]} /><p className="eyebrow">Richieste organizzative</p><h1>Contatti</h1><p className="internal-lead">Puoi utilizzare email o WhatsApp Business. Questi canali non sono destinati alle emergenze.</p></Container></section><section className="section"><Container className="contact-layout contact-layout--single"><div className="contact-details"><h2>Recapiti professionali</h2><dl><div><dt>WhatsApp Business</dt><dd><a href={getWhatsappUrl()} target="_blank" rel="noreferrer">Contatta su WhatsApp</a></dd></div><div><dt>Email</dt><dd><a href={siteConfig.emailHref}>{siteConfig.email}</a></dd></div><div><dt>Profilo Google</dt><dd><a href={siteConfig.googleBusinessProfile} target="_blank" rel="noreferrer">Apri il profilo</a></dd></div></dl><aside className="availability-note availability-note--confirmed"><Info aria-hidden="true" /><div><strong>Recapiti confermati</strong><p>Utilizza questi canali solo per prenotazioni e richieste organizzative. Non inviare documentazione sanitaria nei messaggi generici.</p></div></aside></div></Container></section></>;
}
