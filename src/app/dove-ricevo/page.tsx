import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { homeActivity } from "@/data/home-services";

export const metadata: Metadata = { title: "Visite a domicilio a Milano e Corsico", description: "Area di servizio per l’attività domiciliare del Dr. Simone Contino, prevista da gennaio 2027 a Milano e Corsico.", alternates: { canonical: "/dove-ricevo" } };
export default function LocationsPage() {
  return <section className="internal-hero"><Container><p className="eyebrow">Attività prevista da {homeActivity.startLabel}</p><h1>Visite a domicilio a {homeActivity.areas}</h1><p className="internal-lead">L’attività libero-professionale iniziale è prevista esclusivamente a domicilio. La zona e le modalità saranno verificate prima della conferma dell’appuntamento.</p><p>{homeActivity.supplementNote}</p><ButtonLink href="/prestazioni-e-tariffe">Prestazioni e tariffe</ButtonLink></Container></section>;
}
