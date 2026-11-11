import { siteConfig } from "@/config/site";

export function PhysicianStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Person", "Physician"],
    name: siteConfig.name,
    jobTitle: "Medico Chirurgo, Specialista in Pneumologia",
    description: siteConfig.description,
    url: siteConfig.domain,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    sameAs: [siteConfig.googleBusinessProfile],
    areaServed: { "@type": "City", name: "Milano" },
    medicalSpecialty: "Pulmonary",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
