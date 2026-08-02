import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Item = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Item[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Percorso di navigazione">
      <ol><li><Link href="/">Home</Link></li>{items.map((item) => <li key={item.label}><ChevronRight aria-hidden="true" />{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol>
    </nav>
  );
}
