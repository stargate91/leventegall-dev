export interface SiteConfig {
  name: string;
  author: string;
  callsign: string;
  title: string;
  description: string;
  url: string;
  email: string;
  coordinates: {
    city: string;
    coords: string;
    lat: number;
    lng: number;
  };
  socials: {
    github: string;
    fiverr: string;
  };
  telemetry: {
    missionsDelivered: string;
    rating: string;
    reviewsCount: string;
    systemStatus: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Levente Gáll // Stargate91",
  author: "Levente Gáll",
  callsign: "STARGATE91",
  title: "Levente Gáll • Full-Stack Architect & Brand Strategist",
  description:
    "Full-stack software engineer & brand strategist. ELTE physics background, 1,100+ clients served on Fiverr. FastAPI, Python, React, Next.js, and sharp conversion branding.",
  url: "https://leventegall.dev",
  email: "leventegall@proton.me",
  coordinates: {
    city: "Budapest",
    coords: "47.49°N, 19.04°E",
    lat: 47.49,
    lng: 19.04,
  },
  socials: {
    github: "https://github.com/stargate91",
    fiverr: "https://www.fiverr.com/stargate91",
  },
  telemetry: {
    missionsDelivered: "1,100+",
    rating: "4.8★",
    reviewsCount: "400+",
    systemStatus: "ALL SYSTEMS NOMINAL",
  },
};
