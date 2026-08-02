import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { articles } from "@/data/home";

export const metadata: Metadata = { title: "Articoli", description: "Articoli informativi su pneumologia, tosse, dispnea, disturbi respiratori del sonno, CPAP ed esami respiratori." };
export default function ArticlesPage() { return <><section className="internal-hero"><Container><Breadcrumbs items={[{ label: "Articoli" }]} /><p className="eyebrow">Informazione e prevenzione</p><h1>Articoli sul respiro</h1><p className="internal-lead">Approfondimenti scritti per essere comprensibili, con fonti consultabili e uno stato editoriale esplicito.</p></Container></section><section className="section"><Container><aside className="content-status articles-status"><div><strong>Area editoriale in preparazione</strong><p>Gli articoli seguenti sono bozze accessibili per la revisione, ma non devono essere indicizzati o pubblicati come contenuti medici definitivi.</p></div></aside><div className="article-index-grid">{articles.map((article) => <Link key={article.slug} href={`/articoli/${article.slug}`}><div><span>{article.category}</span><span className="draft-badge">Bozza</span></div><h2>{article.title}</h2><p>{article.description}</p><footer><span>{article.readingTime}</span><strong>Leggi la bozza <ArrowRight aria-hidden="true" /></strong></footer></Link>)}</div></Container></section></>;
}
