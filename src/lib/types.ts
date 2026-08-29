export type WorkItem = {
  include: boolean;
  designation: string;
  from: string;
  to?: string;
  organization: string;
  organizationicon: string;
  emptype: string;
  desc: string[];
  skills: string[];
  location: string;
};

export type AcademicRecord = {
  from: string;
  to?: string;
  qualexam: string;
  qualexammoniker: string | null;
  score: string;
  certauthtype: "Board" | "University";
  certauthname: string;
  certauthabbr: string | null;
  institutetype: "School" | "College";
  institutename: string;
  instituteabbr: string | null;
  qualspectype: "Subjects" | "Major";
  qualspec: string;
  qualspecabbr: string | null;
};

export type Certificate = {
  include: boolean;
  name: string;
  issuer: string;
  issuericon: string;
  issuedate: string;
  expirydate?: string;
  certid?: string;
  credurl: string;
};

export type TechSkill = {
  include: boolean;
  icon: string;
  label: string;
  type: TechType;
};

export type TechType =
  | "Language"
  | "IDE"
  | "Tool"
  | "Framework / Library"
  | "Database"
  | "Platform"
  | "None";

export type SpokenLanguage = {
  language: string;
  readwrite: LanguageLevel;
  listeningspeaking: LanguageLevel;
};

export type SocialIcon =
  | "pdf"
  | "twitter"
  | "linkedin"
  | "instagram"
  | "github"
  | "keybase"
  | "tryhackme";

export type SocialLink = {
  include: boolean;
  pdf: boolean;
  label: string;
  href: string;
  icon: SocialIcon;
};

export type LanguageLevel =
  | "None"
  | "Basic"
  | "Intermediate"
  | "Fluent"
  | "Native Fluent";
