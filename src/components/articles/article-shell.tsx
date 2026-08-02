import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { ArticlePreview } from "@/types/content";

export function ArticleShell({ article, children }: { article: ArticlePreview; children: ReactNode }) {
  return <><article><header className="article-hero"><Container><Breadcrumbs items={[{ label: "Articoli", href: "/articoli" }, { label: article.title }]} /><span className="draft-badge">Bozza · revisione medica necessaria</span><p className="eyebrow">{article.category}</p><h1>{article.title}</h1><p className="internal-lead">{article.description}</p><div className="article-meta"><span>{article.readingTime} di lettura</span><span>{article.date}</span><span>Dr. Simone Contino</span></div></Container></header><Container className="article-layout"><aside className="article-notice"><strong>Nota editoriale</strong><p>Questo contenuto è una bozza informativa, non ancora approvata per la pubblicazione.</p></aside><div className="prose">{children}<aside className="medical-disclaimer">Le informazioni presenti nel sito hanno finalità informative e non sostituiscono una valutazione medica.</aside></div></Container></article><section className="topic-cta"><Container><h2>Hai un dubbio sul tuo respiro?</h2><ButtonLink href="/prenota">Prenota una visita</ButtonLink></Container></section></>;
}
