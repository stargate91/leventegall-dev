export type Locale = "en" | "hu";

export interface NavLocale {
  journey: string;
  projects: string;
  skills: string;
  packages: string;
  contact: string;
  status: string;
}

export interface HeroLocale {
  badgeGlyph: string;
  badgeText: string;
  badgeTooltip: string;
  titleMain: string;
  titleGradient: string;
  descriptionLead: string;
  descriptionPhysics: string;
  descriptionFiverr: string;
  descriptionTail: string;
  ctaProjects: string;
  ctaServices: string;
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
  fiverrBannerTitle: string;
  fiverrBannerDesc: string;
  fiverrBadge: string;
  fiverrTooltip: string;
  timeline: TimelineItemLocale[];
}

export interface ProjectItemLocale {
  badge: string;
  title: string;
  codename: string;
  tagline: string;
  description: string;
  role: string;
  duration: string;
  challenge: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
}

export interface BrandingTaglineLocale {
  id: string;
  text: string;
  focus: string;
}

export interface ProjectsLocale {
  subtitle: string;
  title: string;
  description: string;
  tabs: {
    interactive: string;
    overview: string;
    architecture: string;
  };
  labels: {
    stack: string;
    role: string;
    timeline: string;
    challenge: string;
    solution: string;
    viewGithub: string;
    discussWork: string;
  };
  simulators: {
    swayaTitle: string;
    swayaReset: string;
    swayaStep: string;
    swayaTag: string;
    swayaLog1: string;
    swayaLog2: string;
    swayaLog3: string;
    irisTitle: string;
    irisEmulate: string;
    aetheriaTitle: string;
    aetheriaStatus: string;
    aetheriaPhonetic: string;
  };
  items: {
    swaya: ProjectItemLocale;
    iris: ProjectItemLocale;
    aetheria: ProjectItemLocale;
  };
  brandingTaglines: BrandingTaglineLocale[];
}

export interface SkillItemLocale {
  name: string;
  status: string;
}

export interface ClientFeedbackLocale {
  id: string;
  quote: string;
  client: string;
}

export interface SkillsLocale {
  subtitle: string;
  title: string;
  description: string;
  engineeringTitle: string;
  engineeringSub: string;
  brandingTitle: string;
  brandingSub: string;
  verifiedBadge: string;
  engineeringList: SkillItemLocale[];
  brandingList: SkillItemLocale[];
  feedback: ClientFeedbackLocale[];
}

export interface PackageTierLocale {
  name: string;
  badge: string;
  codename: string;
  priceEstimate: string;
  duration: string;
  description: string;
  features: string[];
}

export interface ServiceOptionLocale {
  value: string;
  label: string;
}

export interface ServicesLocale {
  subtitle: string;
  title: string;
  description: string;
  includedHeading: string;
  selectButton: string;
  recommendedBadge: string;
  customCalloutTitle: string;
  customCalloutDesc: string;
  customCalloutButton: string;
  tiers: {
    naming: PackageTierLocale;
    fullOrbit: PackageTierLocale;
    webDev: PackageTierLocale;
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
    fiverrLabel: string;
    physicsLabel: string;
    physicsValue: string;
  };
}

export interface FooterLocale {
  subTitle: string;
  returnToOrbit: string;
  quote: string;
  quoteSub: string;
  transmissionHeading: string;
  githubLabel: string;
  directCommsLabel: string;
  craftedWith: string;
  statusLabel: string;
}

export interface Dictionary {
  brandName: string;
  personName: string;
  nav: NavLocale;
  hero: HeroLocale;
  story: StoryLocale;
  projects: ProjectsLocale;
  skills: SkillsLocale;
  services: ServicesLocale;
  contact: ContactLocale;
  footer: FooterLocale;
}
