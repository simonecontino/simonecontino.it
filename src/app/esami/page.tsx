import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { services } from "@/data/services";

export const metadata: Metadata = { title: "Esami e valutazioni pneumologiche", description: "Visita pneumologica, spirometria e valutazioni respiratorie: scopri il ruolo dei diversi approfondimenti nel percorso clinico." };
export default function ServicesPage() { return <><section className="internal-hero"><Container><Breadcrumbs items={[{ label: "Esami e valutazioni" }]} /><div className="internal-hero-grid"><div><p className="eyebrow">Approfondimenti scelti con criterio</p><h1>Esami e valutazioni</h1><p className="internal-lead">Un esame è utile quando risponde a una domanda clinica precisa. Per questo il percorso parte dai sintomi e dalla storia della persona.</p><ButtonLink href="/prenota">Prenota una visita</ButtonLink></div><aside className="availability-note availability-note--confirmed"><Info aria-hidden="true" /><div><strong>Prestazioni aggiornate</strong><p>Le prestazioni confermate sono indicate chiaramente. Le altre restano visibili come informazioni, ma non sono ancora prenotabili.</p></div></aside></div></Container></section><section className="section"><Container><div className="service-index-grid">{services.map((service) => <Link key={service.slug} className="service-index-card" href={`/esami/${service.slug}`}><div><span className={service.availabilityConfirmed ? "service-status service-status--confirmed" : "service-status"}>{service.availabilityConfirmed ? "Disponibile" : "Da verificare"}</span><h2>{service.title}</h2><p>{service.description}</p></div><strong>Approfondisci <ArrowRight aria-hidden="true" /></strong></Link>)}</div></Container></section></>;
}
