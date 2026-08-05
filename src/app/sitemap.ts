import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { articles } from "@/data/home";
import { services } from "@/data/services";
import { conditionTopics, problemTopics } from "@/data/topics";

type SitemapEntry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const staticPages: SitemapEntry[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/chi-sono", changeFrequency: "yearly", priority: 0.7 },
  { path: "/problemi", changeFrequency: "monthly", priority: 0.9 },
  { path: "/patologie", changeFrequency: "monthly", priority: 0.9 },
  { path: "/sonno", changeFrequency: "monthly", priority: 0.9 },
  { path: "/esami", changeFrequency: "monthly", priority: 0.9 },
  { path: "/prenota", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contatti", changeFrequency: "yearly", priority: 0.7 },
  { path: "/dove-ricevo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.8 },
  { path: "/articoli", changeFrequency: "weekly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const dynamicPages: SitemapEntry[] = [
    ...problemTopics.map(({ slug }) => ({ path: `/problemi/${slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...conditionTopics.map(({ slug }) => ({ path: `/patologie/${slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...services.map(({ slug }) => ({ path: `/esami/${slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...articles.map(({ slug }) => ({ path: `/articoli/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];

  return [...staticPages, ...dynamicPages].map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, siteConfig.domain).toString(),
    lastModified,
    changeFrequency,
    priority,
  }));
}
