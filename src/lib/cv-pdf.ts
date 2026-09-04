import { DateTime } from "luxon";
import {
  bio,
  getCertificates,
  getEducation,
  getExperience,
  getPdfSocials,
  getSkillGroups,
  getSpokenLanguages,
} from "./content";
import {
  cvPdfDocumentTitle,
  cvPdfFilename,
  cvPdfGeneratedOn,
} from "./cv-download";
import type { EducationLines } from "./education";
import type { SpokenLanguage } from "./types";

export type CvPdfContact = {
  label: string;
  href: string;
  display: string;
};

export type CvPdfJob = {
  designation: string;
  organization: string;
  location: string;
  rangeLabel: string;
  desc: string[];
  skills: string[];
};

export type CvPdfEducation = Pick<
  EducationLines,
  "exam" | "place" | "spec" | "outcome"
>;

export type CvPdfCertificate = {
  name: string;
  issuer: string;
  issuedLabel: string;
  certid?: string;
  credurl: string;
};

export type CvPdfSkillGroup = {
  type: string;
  heading: string;
  labels: string[];
};

export type CvPdfLanguage = {
  language: string;
  line: string;
};

export type CvPdfModel = {
  name: string;
  documentTitle: string;
  filename: string;
  generatedOn: string;
  tagline: string;
  site: string;
  siteHref: string;
  address: string;
  interests: string;
  contacts: CvPdfContact[];
  jobs: CvPdfJob[];
  education: CvPdfEducation[];
  certificates: CvPdfCertificate[];
  skillGroups: CvPdfSkillGroup[];
  languages: CvPdfLanguage[];
};

export function pdfContactAddress(
  location: Pick<typeof bio, "city" | "state" | "country"> = bio,
): string {
  return `${location.city}, ${location.state}, ${location.country}`;
}

export function pdfSiteHref(site = bio.site): string {
  return /^https?:\/\//i.test(site) ? site : `https://${site}`;
}

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

export function spokenLanguageLine(lang: SpokenLanguage): string {
  if (lang.readwrite === lang.listeningspeaking) {
    return `${lang.language} (${lang.listeningspeaking})`;
  }
  return `${lang.language} (${lang.listeningspeaking}; RW ${lang.readwrite})`;
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
  const { jobs } = getExperience(now);
  const generatedOn = cvPdfGeneratedOn(now);

  return {
    name: bio.name,
    documentTitle: cvPdfDocumentTitle(generatedOn),
    filename: cvPdfFilename(generatedOn),
    generatedOn,
    tagline: bio.tagline,
    site: displayHref(pdfSiteHref()),
    siteHref: pdfSiteHref(),
    address: pdfContactAddress(),
    interests: bio.interests,
    contacts: getPdfSocials().map((item) => ({
      label: item.label,
      href: item.href,
      display: displayHref(item.href),
    })),
    jobs: jobs.map((job) => ({
      designation: job.designation,
      organization: job.organization,
      location: pdfExperienceLocation(job.location),
      rangeLabel: job.rangeLabelLong,
      desc: job.desc,
      skills: job.skills,
    })),
    education: getEducation("pdf").map(({ exam, place, spec, outcome }) => ({
      exam,
      place,
      spec,
      outcome,
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
      heading: pdfSkillHeading(group.type),
      labels: group.items.map((item) => item.label),
    })),
    languages: getSpokenLanguages().map((lang) => ({
      language: lang.language,
      line: spokenLanguageLine(lang),
    })),
  };
}
