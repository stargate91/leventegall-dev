import React from "react";
import type { Locale } from "@/locales/dictionary.types";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/locales";

interface StructuredDataProps {
  locale?: Locale;
}

export default function StructuredData({ locale = "en" }: StructuredDataProps) {
  const isHu = locale === "hu";
  const canonicalUrl = isHu ? `${siteConfig.url}/hu` : siteConfig.url;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.author,
        alternateName: siteConfig.callsign,
        url: siteConfig.url,
        image: `${siteConfig.url}/icon-512.png`,
        jobTitle: isHu
          ? "Full-Stack Fejlesztő"
          : "Full-Stack Developer",
        email: siteConfig.email,
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
        sameAs: [
          siteConfig.socials.github,
          siteConfig.socials.linkedin,
          siteConfig.socials.fiverr,
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": isHu ? `${canonicalUrl}/#profilepage` : `${siteConfig.url}/#profilepage`,
        url: canonicalUrl,
        name: isHu
          ? `${siteConfig.author} • Portfólió & Technikai Profil`
          : `${siteConfig.author} • Portfolio & Technical Profile`,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        mainEntity: {
          "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: isHu ? ["hu", "en"] : ["en", "hu"],
      },
      {
        "@type": "ProfessionalService",
        "@id": isHu ? `${canonicalUrl}/#service` : `${siteConfig.url}/#service`,
        name: isHu
          ? "Gáll Levente - Full-Stack Fejlesztés & Automatizálás"
          : "Levente Gáll - Full-Stack Development & Automation",
        url: canonicalUrl,
        email: siteConfig.email,
        description: dict.hero.description,
        founder: {
          "@id": `${siteConfig.url}/#person`,
        },
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
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
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.email,
          contactType: "customer service",
          availableLanguage: ["English", "Hungarian"],
        },
        image: `${siteConfig.url}/icon-512.png`,
        sameAs: [
          siteConfig.socials.fiverr,
          siteConfig.socials.linkedin,
          siteConfig.socials.github,
        ],
        priceRange: "$$",
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: isHu
          ? "Levente Gáll • Full-Stack Fejlesztő"
          : siteConfig.title,
        publisher: {
          "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: ["en", "hu"],
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
