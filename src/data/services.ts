export interface PackageTier {
  id: string;
  name: string;
  badge: string;
  codename: string;
  priceEstimate: string;
  duration: string;
  isPopular?: boolean;
  description: string;
  features: string[];
}

export interface ServiceOption {
  value: string;
  label: string;
}

export const packageTiers: PackageTier[] = [
  {
    id: "naming",
    name: "Brand Naming & Identity",
    badge: "VERBAL BRANDING",
    codename: "TIER 01 // NAMING & POSITIONING",
    priceEstimate: "From $490",
    duration: "5-7 Days",
    description:
      "Ideal for startups, new products, or rebrands. Leverage my proven Fiverr methodology to develop a memorable, trademark-cleared brand name and positioning story.",
    features: [
      "10+ Original Vetted Name Concepts",
      "Pronunciation & Phonetic Analysis",
      "International .com Domain Clearance",
      "Preliminary Trademark Screening",
      "3 High-Impact Slogans & Taglines",
      "Brand Story & Positioning Brief",
      "Direct Revisions & Consultation",
    ],
  },
  {
    id: "full-orbit",
    name: "Complete Product Launch",
    badge: "MOST POPULAR // FULL STACK",
    codename: "TIER 02 // BRAND + NEXT.JS APP",
    priceEstimate: "From $1,850",
    duration: "2-3 Weeks",
    isPopular: true,
    description:
      "The end-to-end launch package. A unified process combining your brand identity, messaging, and a custom, high-performance web application.",
    features: [
      "Everything in Brand Naming & Identity",
      "Custom Next.js & TypeScript Web Application",
      "Fast, Responsive & Accessible UI Design",
      "Stripe / Payment Gateway Integration",
      "Top-Tier Performance (95+ Lighthouse)",
      "Self-Hosting Ready (Docker & Node Standalone)",
      "1-on-1 Direct Technical & Brand Guidance",
    ],
  },
  {
    id: "web-dev",
    name: "Full-Stack Development",
    badge: "SOFTWARE ENGINEERING",
    codename: "TIER 03 // WEB APPS & APIS",
    priceEstimate: "From $1,450",
    duration: "10-14 Days",
    description:
      "For teams with an existing brand who need clean, reliable software. From backend APIs and databases to interactive frontends built with FastAPI, Python, and React.",
    features: [
      "FastAPI / Python Backend & REST APIs",
      "React, Next.js & TypeScript Frontends",
      "Database Architecture (PostgreSQL / SQLite)",
      "Clean, Maintainable Code & Documentation",
      "Docker & Deployment Configuration",
      "SEO Meta Tags & Dynamic Open Graph Cards",
      "Full Source Code Ownership",
    ],
  },
];

export const contactTierOptions: ServiceOption[] = [
  { value: "naming", label: "Brand Naming & Identity — From $490" },
  { value: "full-orbit", label: "Complete Product Launch (Brand + Next.js App) — From $1,850" },
  { value: "web-dev", label: "Full-Stack Development (FastAPI / React) — From $1,450" },
  { value: "custom", label: "Custom Architecture / Consultation" },
];

export const timelineOptions: ServiceOption[] = [
  { value: "immediate", label: "Fast Turnaround (Under 2 weeks)" },
  { value: "2-3-weeks", label: "Standard Timeline (2-4 weeks)" },
  { value: "flexible", label: "Flexible Timeline (1-2 months)" },
];
