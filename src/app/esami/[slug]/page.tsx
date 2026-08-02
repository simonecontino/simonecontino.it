import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/sections/service-page";
import { services } from "@/data/services";

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const service = services.find((item) => item.slug === slug); return service ? { title: service.title, description: service.description } : {}; }
export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const service = services.find((item) => item.slug === slug); if (!service) notFound(); return <ServicePage service={service} />; }
