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
    workLocation: {
      "@type": "Place",
      name: "Ospedale San Carlo Milano",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Pio II, 3",
        postalCode: "20153",
        addressLocality: "Milano",
        addressCountry: "IT",
      },
    },
    medicalSpecialty: "Pulmonary",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
