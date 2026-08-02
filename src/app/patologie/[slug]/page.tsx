import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicPage } from "@/components/sections/topic-page";
import { conditionTopics } from "@/data/topics";

export function generateStaticParams() { return conditionTopics.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const topic = conditionTopics.find((item) => item.slug === slug); return topic ? { title: `${topic.title}: sintomi e valutazione`, description: topic.description } : {}; }
export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const topic = conditionTopics.find((item) => item.slug === slug); if (!topic) notFound(); return <TopicPage topic={topic} />; }
