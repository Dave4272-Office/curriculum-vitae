import { DateTime } from "luxon";
import {
  bio,
  getCertificates,
  getEducation,
  getExperience,
  getSkillGroups,
  getSocials,
  getSpokenLanguages,
} from "./content";

export const cvPdfPath = "/cv.pdf";

export function cvPdfGeneratedOn(now = DateTime.now()): string {
  return now.toFormat("yyyy-MM-dd");
}

export function cvPdfFilename(
  generatedOn = cvPdfGeneratedOn(),
  name = bio.name,
): string {
  return `${name.replaceAll(" ", "-")}-CV-${generatedOn}.pdf`;
}

export function cvPdfDocumentTitle(
  generatedOn = cvPdfGeneratedOn(),
  name = bio.name,
): string {
  return `${name} CV ${generatedOn}`;
}

export type CvPdfContact = {
  label: string;
  href: string;
  display: string;
};

export type CvPdfJob = {
  designation: string;
  organization: string;
  emptype: string;
  location: string;
  rangeLabel: string;
  tenureLabel: string;
  desc: string[];
  skills: string[];
};

export type CvPdfEducation = {
  rangeLabel: string;
  qualexam: string;
  qualspectype: string;
  qualspec: string;
  institutename: string;
  certauthname: string;
  score: string;
};

export type CvPdfCertificate = {
  name: string;
  issuer: string;
  issuedLabel: string;
  certid?: string;
  credurl: string;
};

export type CvPdfSkillGroup = {
  type: string;
  labels: string[];
};

export type CvPdfLanguage = {
  language: string;
  readwrite: string;
  listeningspeaking: string;
};

export type CvPdfModel = {
  name: string;
  documentTitle: string;
  filename: string;
  generatedOn: string;
  tagline: string;
  interests: string;
  contacts: CvPdfContact[];
  careerLength: string;
  jobs: CvPdfJob[];
  education: CvPdfEducation[];
  certificates: CvPdfCertificate[];
  skillGroups: CvPdfSkillGroup[];
  languages: CvPdfLanguage[];
};

function displayHref(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
}

const skillHeadingByType: Record<string, string> = {
  Language: "Programming",
  "Framework / Library": "Frameworks/Libraries",
  Tool: "Tools",
  Platform: "Platforms",
  Database: "Database",
  IDE: "IDE",
};

export function pdfSkillHeading(type: string): string {
  return skillHeadingByType[type] ?? type;
}

const pdfStateAbbreviations: Readonly<Record<string, string>> = {
  Karnataka: "KN",
  "West Bengal": "WB",
};

export function pdfExperienceLocation(location: string): string {
  return location
    .split(", ")
    .map((part) => pdfStateAbbreviations[part] ?? part)
    .join(", ");
}

export function getCvPdfModel(now = DateTime.now()): CvPdfModel {
  const { jobs, careerLength } = getExperience(now);
  const generatedOn = cvPdfGeneratedOn(now);

  return {
    name: bio.name,
    documentTitle: cvPdfDocumentTitle(generatedOn),
    filename: cvPdfFilename(generatedOn),
    generatedOn,
    tagline: bio.tagline,
    interests: bio.interests,
    contacts: getSocials().map((item) => ({
      label: item.label,
      href: item.href,
      display: displayHref(item.href),
    })),
    careerLength,
    jobs: jobs.map((job) => ({
      designation: job.designation,
      organization: job.organization,
      emptype: job.emptype,
      location: pdfExperienceLocation(job.location),
      rangeLabel: job.rangeLabelLong,
      tenureLabel: job.tenureLabel,
      desc: job.desc,
      skills: job.skills,
    })),
    education: getEducation().map((item) => ({
      rangeLabel: item.rangeLabel,
      qualexam: item.qualexam,
      qualspectype: item.qualspectype,
      qualspec: item.qualspec,
      institutename: item.institutename,
      certauthname: item.certauthname,
      score: item.score,
    })),
    certificates: getCertificates().map((item) => ({
      name: item.name,
      issuer: item.issuer,
      issuedLabel: item.issuedLabel,
      certid: item.certid,
      credurl: item.credurl,
    })),
    skillGroups: getSkillGroups().map((group) => ({
      type: group.type,
      labels: group.items.map((item) => item.label),
    })),
    languages: getSpokenLanguages().map((lang) => ({
      language: lang.language,
      readwrite: lang.readwrite,
      listeningspeaking: lang.listeningspeaking,
    })),
  };
}
