import createMDX from "@next/mdx";

const withMDX = createMDX();

export default withMDX({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      { source: "/poligrafia-respiratoria-milano", destination: "/poligrafia-notturna", permanent: true },
      { source: "/prenota", destination: "/prestazioni-e-prenotazioni#richiedi-appuntamento", permanent: true },
      { source: "/prestazioni-e-tariffe", destination: "/prestazioni-e-prenotazioni", permanent: true },
    ];
  },
  images: { formats: ["image/avif", "image/webp"] },
});
