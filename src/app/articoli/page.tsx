import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { articles } from "@/data/home";

export const metadata: Metadata = { title: "Articoli", description: "Articoli informativi su pneumologia, tosse, dispnea, disturbi respiratori del sonno, CPAP ed esami respiratori." };
export default function ArticlesPage() { return <><section className="internal-hero"><Container><Breadcrumbs items={[{ label: "Articoli" }]} /><p className="eyebrow">Informazione e prevenzione</p><h1>Articoli sul respiro</h1><p className="internal-lead">Approfondimenti scritti per spiegare con chiarezza sintomi, patologie ed esami respiratori.</p></Container></section><section className="section"><Container><aside className="development-note"><strong>Sezione in sviluppo</strong><p>Nuovi contenuti saranno aggiunti progressivamente per rispondere alle domande più frequenti dei pazienti.</p></aside><div className="article-index-grid">{articles.map((article) => <Link key={article.slug} href={`/articoli/${article.slug}`}><div><span>{article.category}</span></div><h2>{article.title}</h2><p>{article.description}</p><footer><span>{article.readingTime}</span><strong>Leggi l’articolo <ArrowRight aria-hidden="true" /></strong></footer></Link>)}</div></Container></section></>;
}
