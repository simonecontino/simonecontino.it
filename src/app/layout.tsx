import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BookingBar } from "@/components/layout/booking-bar";
import { PhysicianStructuredData } from "@/components/seo/structured-data";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: { default: `${siteConfig.shortTitle} | ${siteConfig.name}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "it_IT", siteName: siteConfig.name, title: siteConfig.shortTitle, description: siteConfig.description },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>
        <a className="skip-link" href="#contenuto">Vai al contenuto</a>
        <Header />
        <main id="contenuto">{children}</main>
        <Footer />
        <BookingBar />
        <PhysicianStructuredData />
      </body>
    </html>
  );
}
