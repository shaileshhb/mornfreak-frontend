export type LegalSection = {
  heading: string;
  paragraphs: string[];
  items?: string[];
};

export type LegalContact = {
  heading?: string;
  lead?: string;
  name?: string;
  email: string;
  website: string;
  websiteLabel: string;
  tagline?: string;
};

export type LegalDocument = {
  title: string;
  intro: string;
  sections: LegalSection[];
  contact: LegalContact;
};
