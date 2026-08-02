import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicPage } from "@/components/sections/topic-page";
import { problemTopics } from "@/data/topics";

export function generateStaticParams() { return problemTopics.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const topic = problemTopics.find((item) => item.slug === slug); return topic ? { title: `${topic.title}: quando rivolgersi allo pneumologo`, description: topic.description } : {}; }
export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const topic = problemTopics.find((item) => item.slug === slug); if (!topic) notFound(); return <TopicPage topic={topic} />; }
