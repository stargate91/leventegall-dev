export interface TimelineEntry {
  sol: string;
  date: string;
  title: string;
  iconName: "Atom" | "Feather" | "Cpu";
  desc: string;
  metrics: string[];
}

export const timelineEntries: TimelineEntry[] = [
  {
    sol: "CHAPTER 01",
    date: "ELTE PHYSICS BACKGROUND",
    title: "Analytical Thinking & Problem Solving",
    iconName: "Atom",
    desc: "Studying Physics and Astronomy at Eötvös Loránd University gave me a strong foundation in math, calculus, and first-principles thinking. When architecting software, I don't just glue third-party packages together—I think in terms of state transitions, edge cases, and building predictable, maintainable systems.",
    metrics: [
      "ELTE Physics & Astronomy Studies",
      "Calculus & Mathematical Logic",
      "Systematic Problem Solving",
    ],
  },
  {
    sol: "CHAPTER 02",
    date: "5 YEARS ON FIVERR",
    title: "Human Psychology & High-Converting Copy",
    iconName: "Feather",
    desc: "Over 5 years, I built a top-rated freelance branding practice on Fiverr, helping more than 1,100 international founders find the right name and message for their startups. It taught me how people actually think, choose, and buy. Clear naming and sharp copywriting aren't decoration—they're how you earn attention in a crowded market.",
    metrics: [
      "1,100+ Completed Projects",
      "400+ Verified 5-Star Reviews",
      "Brand Naming, Slogans & Copy",
    ],
  },
  {
    sol: "CHAPTER 03",
    date: "FULL-STACK DEVELOPMENT",
    title: "Clean Backend Architecture & Modern Frontends",
    iconName: "Cpu",
    desc: "Great branding falls flat without a reliable product, and clean code is wasted if the messaging is confusing. I build robust backends with FastAPI and Python, paired with modern, responsive React and TypeScript frontends. Having one person oversee both means zero handoff friction and a product that feels cohesive from the first headline to the final API call.",
    metrics: [
      "FastAPI, Python & Domain-Driven Design",
      "React, Next.js & TypeScript Frontends",
      "Unified Vision from Concept to Code",
    ],
  },
];
