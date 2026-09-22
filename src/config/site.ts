export interface AudioTrack {
  id: string;
  code: string;
  title: string;
  genre: string;
  bpm: string;
  duration: string;
  feed: string;
}

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
    linkedin: string;
    fiverr: string;
  };
  stats: {
    clientsServed: string;
    rating: string;
    reviewsCount: string;
    systemStatus: string;
  };
  audio: {
    profileUrl: string;
    tracks: AudioTrack[];
  };
}

export const siteConfig: SiteConfig = {
  name: "Levente Gáll // Stargate91",
  author: "Levente Gáll",
  callsign: "STARGATE91",
  title: "Levente Gáll • Full-Stack Developer",
  description:
    "Full-stack developer building web applications, backends, and automation with Python, FastAPI, React, Next.js, and TypeScript. Physics background and international client experience.",
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
    linkedin: "https://www.linkedin.com/in/leventegall",
    fiverr: "https://www.fiverr.com/stargate91",
  },
  stats: {
    clientsServed: "1,100+",
    rating: "4.8★",
    reviewsCount: "400+",
    systemStatus: "Available",
  },
  audio: {
    profileUrl: "https://www.mixcloud.com/lvnte/",
    tracks: [
      {
        id: "mix-07",
        code: "Mix 07",
        title: "Critical x Shogun DnB",
        genre: "Drum & Bass",
        bpm: "174 BPM",
        duration: "30 min",
        feed: "/lvnte/nypox-podcast-drum-bass-phase-episode-7-critical-x-shogun/",
      },
      {
        id: "mix-08",
        code: "Mix 08",
        title: "Techno Phase (Ep. 1)",
        genre: "Techno / Ambient",
        bpm: "135 BPM",
        duration: "59 min",
        feed: "/lvnte/nypox-podcast-techno-phase-episode-1/",
      },
      {
        id: "mix-05",
        code: "Mix 05",
        title: "Liquid Drum & Bass",
        genre: "Liquid DnB",
        bpm: "174 BPM",
        duration: "32 min",
        feed: "/lvnte/nypox-podcast-drum-bass-phase-episode-5/",
      },
      {
        id: "mix-02",
        code: "Mix 02",
        title: "2006 Neurofunk DnB",
        genre: "Neurofunk / DnB",
        bpm: "174 BPM",
        duration: "63 min",
        feed: "/lvnte/nypox-podcast-drum-bass-phase-episode-2-2006/",
      },
      {
        id: "mix-06",
        code: "Mix 06",
        title: "2008 DnB Phase (Part 2)",
        genre: "Drum & Bass",
        bpm: "174 BPM",
        duration: "53 min",
        feed: "/lvnte/nypox-podcast-drum-bass-phase-episode-6-2008-part-2/",
      },
      {
        id: "mix-04",
        code: "Mix 04",
        title: "2008 DnB Phase (Part 1)",
        genre: "Drum & Bass",
        bpm: "174 BPM",
        duration: "34 min",
        feed: "/lvnte/nypox-podcast-drum-bass-phase-episode-4-2008-part-1/",
      },
      {
        id: "mix-03",
        code: "Mix 03",
        title: "2007 DnB Phase",
        genre: "Drum & Bass",
        bpm: "174 BPM",
        duration: "67 min",
        feed: "/lvnte/nypox-podcast-drum-bass-phase-episode-3-2007-part-1/",
      },
      {
        id: "mix-01",
        code: "Mix 01",
        title: "2005 Classic DnB",
        genre: "Drum & Bass",
        bpm: "174 BPM",
        duration: "41 min",
        feed: "/lvnte/nypox-podcast-drum-bass-phase-episode-1-2005/",
      },
    ],
  },
};
