export type NavigationItem = { label: string; href: string };

export type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  directions: string;
  parking: string;
  publicTransport: string;
  mapsUrl: string;
  bookingUrl: string;
  confirmed: boolean;
};

export type Problem = {
  title: string;
  slug: string;
  description: string;
};

export type Topic = {
  kind: "problema" | "patologia" | "sonno";
  title: string;
  slug: string;
  description: string;
  intro: string;
  commonSigns: string[];
  whenToSeekCare: string[];
  evaluation: string[];
  possibleTests: string[];
  careOptions: string[];
  urgentNote?: string;
  relatedSlugs: string[];
  references: { label: string; url: string }[];
  medicallyReviewed: boolean;
};

export type Service = {
  title: string;
  slug: string;
  description: string;
  purpose: string;
  whatToExpect: string[];
  preparation: string[];
  availabilityConfirmed: boolean;
  references?: { label: string; url: string }[];
};

export type ArticlePreview = {
  title: string;
  slug: string;
  category: string;
  description: string;
  date?: string;
  readingTime: string;
  draft: boolean;
};

export type Faq = {
  question: string;
  answer: string;
  needsConfirmation?: boolean;
};
