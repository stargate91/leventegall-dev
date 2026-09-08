export type Locale = "en" | "hu";

export interface NavLocale {
  journey: string;
  projects: string;
  skills: string;
  services: string;
  clients: string;
  contact: string;
  available: string;
  sidebarBio: string;
}

export interface SectionsLocale {
  about: string;
  projects: string;
  skills: string;
  services: string;
  reviews: string;
  contact: string;
}

export interface HeroLocale {
  titleMain: string;
  titleGradient: string;
  description: string;
  stats: {
    fiverrValue: string;
    fiverrLabel: string;
    stackValue: string;
    stackLabel: string;
    physicsValue: string;
    physicsLabel: string;
  };
}

export interface TimelineItemLocale {
  sol: string;
  date: string;
  title: string;
  desc: string;
  metrics: string[];
}

export interface StoryLocale {
  subtitle: string;
  title: string;
  description: string;
  timeline: TimelineItemLocale[];
}

export interface ProjectItemLocale {
  badge: string;
  title: string;
  tagline: string;
  description: string;
  impactMetrics: { label: string; value: string }[];
}

export interface ProjectsLocale {
  subtitle: string;
  title: string;
  description: string;
  labels: {
    appOverview: string;
    viewGithub: string;
    visitWebsite: string;
    discussWork: string;
    expandScreenshot: string;
    closeLightbox: string;
  };
  simulators: {
    swayaOrganizerShot: string;
    swayaLibraryShot: string;
    swayaDetailShot: string;
  };
  items: {
    swaya: ProjectItemLocale;
  };
}

export interface SkillCategoryLocale {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export interface ClientFeedbackLocale {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  initials: string;
  avatar?: string | undefined;
}

export interface SkillsLocale {
  subtitle: string;
  title: string;
  description: string;
  categories: SkillCategoryLocale[];
}

export interface TestimonialsLocale {
  subtitle: string;
  title: string;
  feedback: ClientFeedbackLocale[];
}

export interface PackageTierLocale {
  name: string;
  codename: string;
  description: string;
}

export interface ServiceOptionLocale {
  value: string;
  label: string;
}

export interface ServicesLocale {
  subtitle: string;
  title: string;
  description: string;
  recommendedBadge: string;
  customCalloutTitle: string;
  customCalloutDesc: string;
  customCalloutButton: string;
  tiers: {
    branding: PackageTierLocale;
    development: PackageTierLocale;
    discordBot: PackageTierLocale;
  };
  contactTierOptions: ServiceOptionLocale[];
  timelineOptions: ServiceOptionLocale[];
}

export interface ContactLocale {
  subtitle: string;
  title: string;
  description: string;
  fields: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    tier: string;
    timeline: string;
    brief: string;
    briefPlaceholder: string;
  };
  errors: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    briefRequired: string;
    transmissionFailedTitle: string;
    transmissionFailed: string;
  };
  success: {
    title: string;
    desc: string;
    button: string;
  };
  submitButton: string;
  transmittingButton: string;
  infoColumn: {
    directEmailTag: string;
    directEmailTitle: string;
    directEmailDesc: string;
    atAGlanceTag: string;
    backendLabel: string;
    backendValue: string;
    frontendLabel: string;
    frontendValue: string;
    personalLabel: string;
    personalValue: string;
    physicsLabel: string;
    physicsValue: string;
  };
}

export interface FooterLocale {
  subTitle: string;
}

export interface AudioPlayerLocale {
  badge: string;
  subtitle: string;
  openPlayer: string;
  closePlayer: string;
  play: string;
  pause: string;
  mute: string;
  unmute: string;
  listenOnMixcloud: string;
  frequenciesActive: string;
  frequenciesStandby: string;
  prevTrack: string;
  nextTrack: string;
  selectTrack: string;
  directPlayHint: string;
}

export interface ErrorLocale {
  title: string;
  description: string;
  errorReference: string;
  tryAgain: string;
  backHome: string;
}

export interface NotFoundLocale {
  badge: string;
  title: string;
  description: string;
  returnOrbit: string;
  directUplink: string;
}

export interface Dictionary {
  brandName: string;
  personName: string;
  nav: NavLocale;
  sections: SectionsLocale;
  hero: HeroLocale;
  story: StoryLocale;
  projects: ProjectsLocale;
  skills: SkillsLocale;
  services: ServicesLocale;
  testimonials: TestimonialsLocale;
  contact: ContactLocale;
  footer: FooterLocale;
  audioPlayer: AudioPlayerLocale;
  error: ErrorLocale;
  notFound: NotFoundLocale;
}
