export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  highlight: boolean;
  tagline: string;
  features: string[];
  ctaText: string;
  whatsappMessage: string;
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  avatarUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CoverageRegion {
  stateName: string;
  abbreviation: string;
  highways: string[];
  citiesCovered: number;
  concessions: string[];
}

export interface SiteConfig {
  whatsAppNumber: string;
  companyName: string;
  cnpj: string;
  address: string;
  email: string;
  phoneDisplay: string;
}

