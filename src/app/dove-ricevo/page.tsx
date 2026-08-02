import type { Metadata } from "next";
import { Bus, Car, Clock, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { locations } from "@/data/locations";

export const metadata: Metadata = { title: "Dove ricevo", description: "Sede e indicazioni per le visite pneumologiche del Dr. Simone Contino a Milano." };
export default function LocationsPage() { return <><section className="internal-hero"><Container><Breadcrumbs items={[{ label: "Dove ricevo" }]} /><p className="eyebrow">Visite a Milano</p><h1>Dove ricevo</h1><p className="internal-lead">Le visite si svolgono presso l’Ospedale San Carlo Milano, il mercoledì pomeriggio su appuntamento.</p></Container></section><section className="section"><Container><div className="locations-list">{locations.map((location) => <article className="location-detail-card" key={location.id}><a className="map-placeholder" href={location.mapsUrl} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span>Apri la sede in Google Maps</span></a><div><span className="booking-ready-badge">Sede confermata</span><h2>{location.name}</h2><p>{location.address}<br />{location.postalCode} {location.city}</p><dl><div><dt><Clock aria-hidden="true" />Orari</dt><dd>{location.hours}</dd></div><div><dt><Bus aria-hidden="true" />Mezzi pubblici</dt><dd>{location.publicTransport}</dd></div><div><dt><Car aria-hidden="true" />Parcheggio</dt><dd>{location.parking}</dd></div></dl><a className="button button--secondary" href={location.mapsUrl} target="_blank" rel="noreferrer">Indicazioni stradali</a></div></article>)}</div></Container></section></>;
}
