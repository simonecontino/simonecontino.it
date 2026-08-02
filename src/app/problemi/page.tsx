import type { Metadata } from "next";
import { TopicIndex } from "@/components/sections/topic-index";
import { problemTopics } from "@/data/topics";

export const metadata: Metadata = { title: "Problemi respiratori", description: "Tosse persistente, fiato corto, russamento, sonnolenza e altri sintomi: informazioni per orientarsi e capire quando richiedere una valutazione pneumologica." };
export default function ProblemsPage() { return <TopicIndex eyebrow="Partire da ciò che senti" title="Problemi respiratori" lead="I sintomi non indicano da soli una diagnosi. Descriverne durata, andamento e impatto aiuta a scegliere una valutazione appropriata." topics={problemTopics} basePath="/problemi" />; }
