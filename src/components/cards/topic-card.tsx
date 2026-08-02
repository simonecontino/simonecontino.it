import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Topic } from "@/types/content";

export function TopicCard({ topic, basePath }: { topic: Topic; basePath: string }) {
  return <Link className="topic-card" href={`${basePath}/${topic.slug}`}><p className="topic-card-kind">{topic.kind}</p><h2>{topic.title}</h2><p>{topic.description}</p><span>Approfondisci <ArrowRight aria-hidden="true" /></span></Link>;
}
