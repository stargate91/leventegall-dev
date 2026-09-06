export interface SkillItem {
  name: string;
  level: number;
  status: string;
}

export interface ClientFeedback {
  quote: string;
  client: string;
  stars: number;
}

export const engineeringSkills: SkillItem[] = [
  { name: "Python (FastAPI, Asyncio, Flask)", level: 96, status: "PRIMARY BACKEND" },
  { name: "React, Next.js & TypeScript (Vite, Zustand)", level: 93, status: "MODERN FRONTEND" },
  { name: "SQL (PostgreSQL, SQLite, SQLAlchemy 2.0)", level: 94, status: "DATABASE & ORM" },
  { name: "Desktop & Systems (Electron, PyQt6, REST)", level: 90, status: "GUI & APIS" },
  { name: "Media & Automation (FFmpeg, Pillow, ETL)", level: 89, status: "DATA PIPELINES" },
  { name: "Analytical Thinking & Mathematics (ELTE)", level: 95, status: "LOGIC & MODELING" },
];

export const brandingSkills: SkillItem[] = [
  { name: "Brand Naming & Linguistic Testing", level: 98, status: "1,100+ CLIENTS" },
  { name: "High-Converting Slogans & Taglines", level: 96, status: "400+ 5.0★ REVIEWS" },
  { name: "Domain (.com) & Trademark Clearance", level: 92, status: "VETTED CONCEPTS" },
  { name: "Brand Positioning & Value Proposition", level: 95, status: "MARKET FIT" },
  { name: "International Client Communication", level: 96, status: "FLUENT ENGLISH" },
  { name: "Landing Page Copywriting & Conversion Flow", level: 92, status: "USER FOCUSED" },
];

export const fiverrFeedback: ClientFeedback[] = [
  {
    quote:
      "The names delivered weren't just creative—they felt instantly legitimate, memorable, and right on point. Found the perfect domain and our team was thrilled.",
    client: "Fintech Startup Founder (United States)",
    stars: 5,
  },
  {
    quote:
      "Clear communication, fast turnaround, and brilliant work. The tagline captured our entire product in five words. Over 1,100 completed orders speak for themselves.",
    client: "SaaS Platform Director (United Kingdom)",
    stars: 5,
  },
];
