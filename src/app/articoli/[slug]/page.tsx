import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoughArticle from "@/content/articles/tosse-persistente-quando-visita.mdx";
import SnoringArticle from "@/content/articles/russamento-apnee-differenze.mdx";
import SpirometryArticle from "@/content/articles/spirometria-come-si-svolge.mdx";
import { ArticleShell } from "@/components/articles/article-shell";
import { articles } from "@/data/home";

const content: Record<string, ComponentType> = { "tosse-persistente-quando-visita": CoughArticle, "russamento-apnee-differenze": SnoringArticle, "spirometria-come-si-svolge": SpirometryArticle };
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const article = articles.find((item) => item.slug === slug); return article ? { title: article.title, description: article.description, robots: article.draft ? { index: false, follow: false } : undefined } : {}; }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = articles.find((item) => item.slug === slug); const Content = content[slug]; if (!article || !Content) notFound(); return <ArticleShell article={article}><Content /></ArticleShell>; }
