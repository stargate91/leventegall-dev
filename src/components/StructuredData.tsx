import { siteConfig } from "@/config/site";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.author,
        alternateName: siteConfig.callsign,
        url: siteConfig.url,
        image: `${siteConfig.url}/opengraph-image`,
        jobTitle: "Full-Stack Developer & Brand Strategist",
        worksFor: {
          "@type": "Organization",
          name: "Independent Contractor / Freelance",
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Eötvös Loránd University (ELTE)",
        },
        knowsAbout: [
          "Software Architecture",
          "Python",
          "FastAPI",
          "React",
          "Next.js",
          "TypeScript",
          "Brand Naming",
          "Copywriting",
          "Physics",
        ],
        sameAs: [siteConfig.socials.github, siteConfig.socials.fiverr],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: "Levente Gáll - Full-Stack Architecture & Brand Strategy",
        url: siteConfig.url,
        founder: {
          "@id": `${siteConfig.url}/#person`,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.coordinates.city,
          addressCountry: "HU",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.coordinates.lat,
          longitude: siteConfig.coordinates.lng,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "400",
          bestRating: "5",
        },
        priceRange: "$$",
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.title,
        publisher: {
          "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
