import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navigation } from "@/config/navigation";
import { Container } from "@/components/ui/container";
import { CookieSettingsButton } from "@/components/cookie-consent/cookie-settings-button";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-grid">
        <div><strong>{siteConfig.name}</strong><p>{siteConfig.professionalTitle}<br />Milano</p><a href={siteConfig.phoneHref}>{siteConfig.phone}</a><a href={siteConfig.emailHref}>{siteConfig.email}</a></div>
        <div><strong>Esplora</strong>{navigation.slice(0, 4).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
        <div><strong>Informazioni</strong><Link href="/chi-sono">Chi sono</Link><Link href="/faq">FAQ</Link><Link href="/dove-ricevo">Dove ricevo</Link><Link href="/contatti">Contatti</Link></div>
        <div><strong>Note legali</strong><Link href="/privacy">Privacy policy</Link><Link href="/cookie-policy">Cookie policy</Link><CookieSettingsButton /><p className="footer-note">I contenuti informativi non sostituiscono una valutazione medica.</p></div>
      </Container>
      <Container className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}</span><span>Sito personale del medico</span></Container>
    </footer>
  );
}
