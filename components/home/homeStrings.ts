// Shared types + language metadata for the localized homepage.
// The per-language copy lives in dictionaries/<lang>.json under the "home" key.

export interface HomeFormStrings {
  name: string;
  namePh: string;
  email: string;
  emailPh: string;
  company: string;
  companyPh: string;
  details: string;
  detailsPh: string;
  submit: string;
  note: string;
  subjectPrefix: string;
  bodyName: string;
  bodyEmail: string;
  bodyCompany: string;
  bodyDetails: string;
}

export interface HomeStrings {
  nav: {
    work: string;
    services: string;
    about: string;
    contact: string;
    toggleMenu: string;
  };
  hero: {
    reelLabel: string;
    eyebrow: string;
    h1a: string;
    h1b: string;
    body: string;
    cta: string;
    heroAlt: string;
    caption: string;
  };
  logos: {
    ariaLabel: string;
    heading: string;
    alts: string[];
  };
  work: {
    heading: string;
    intro: string;
    tiles: { title: string; blurb: string; alt: string }[];
  };
  services: {
    heading: string;
    introBefore: string;
    introLinks: string[];
    portfolioLink: string;
    blocks: { title: string; body: string; deliverables: string[] }[];
  };
  about: {
    heading: string;
    statement: string;
    steps: { title: string; body: string }[];
    stats: { value: string; label: string }[];
  };
  testimonials: {
    ariaLabel: string;
    heading: string;
    items: { quote: string; name: string }[];
  };
  contact: {
    heading: string;
    body: string;
    form: HomeFormStrings;
  };
  footer: {
    tagline: string;
    rights: string;
    languagesLabel: string;
    translationNote: string;
  };
  jsonLdDescription: string;
}

export const SITE_LANGUAGES: { code: string; name: string; path: string }[] = [
  { code: "en", name: "English", path: "/" },
  { code: "es", name: "Español", path: "/es" },
  { code: "fr", name: "Français", path: "/fr" },
  { code: "pt", name: "Português", path: "/pt" },
  { code: "zh", name: "中文", path: "/zh" },
  { code: "ar", name: "العربية", path: "/ar" },
  { code: "hi", name: "हिन्दी", path: "/hi" },
];
