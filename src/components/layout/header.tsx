import Link from "next/link";
import { Menu } from "lucide-react";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link className="brand" href="/" aria-label="Dr. Simone Contino, homepage">
          <span className="brand-mark" aria-hidden="true">SC</span>
          <span className="brand-copy"><strong>{siteConfig.name}</strong><small>Pneumologo · Milano</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigazione principale">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link className="header-booking" href="/prenota">Prenota</Link>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Apri il menu"><Menu aria-hidden="true" /></summary>
          <nav aria-label="Navigazione mobile">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link className="header-booking" href="/prenota">Prenota una visita</Link>
          </nav>
        </details>
      </Container>
    </header>
  );
}
