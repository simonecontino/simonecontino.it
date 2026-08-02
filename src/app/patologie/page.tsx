import type { Metadata } from "next";
import { TopicIndex } from "@/components/sections/topic-index";
import { conditionTopics } from "@/data/topics";

export const metadata: Metadata = { title: "Patologie respiratorie", description: "Informazioni chiare su asma, BPCO, apnee ostruttive, bronchiectasie, interstiziopatie e insufficienza respiratoria." };
export default function ConditionsPage() { return <TopicIndex eyebrow="Comprendere la diagnosi" title="Patologie respiratorie" lead="Conoscere una patologia aiuta a interpretare gli esami, seguire la terapia e riconoscere i cambiamenti da discutere durante i controlli." topics={conditionTopics} basePath="/patologie" />; }
