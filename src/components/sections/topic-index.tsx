import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ContentStatus } from "@/components/ui/content-status";
import { TopicCard } from "@/components/cards/topic-card";
import type { Topic } from "@/types/content";

export function TopicIndex({ eyebrow, title, lead, topics, basePath }: { eyebrow: string; title: string; lead: string; topics: Topic[]; basePath: string }) {
  return <><section className="internal-hero"><Container><Breadcrumbs items={[{ label: title }]} /><div className="internal-hero-grid"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="internal-lead">{lead}</p><ButtonLink href="/prenota">Prenota una visita</ButtonLink></div><ContentStatus /></div></Container></section><section className="section"><Container><div className="topic-index-grid">{topics.map((topic) => <TopicCard key={topic.slug} topic={topic} basePath={basePath} />)}</div></Container></section></>;
}
