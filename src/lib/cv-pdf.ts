import { DateTime } from "luxon";
import {
  bio,
  getCertificates,
  getEducation,
  getExperience,
  getSkillGroups,
  getSpokenLanguages,
} from "./content";
import { socials } from "./socials";

export const cvPdfPath = "/cv.pdf";
export const cvPdfFilename = "Debraj-Kundu-CV.pdf";

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
  periodLabel: string;
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
  currentTitle: string;
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

function pdfPeriodLabel(from: string, to?: string): string {
  const start = DateTime.fromFormat(from, "yyyy-MM").toFormat("MMMM yyyy");
  if (!to) {
    return `${start} - PRESENT`;
  }
  return `${start} - ${DateTime.fromFormat(to, "yyyy-MM").toFormat("MMMM yyyy")}`;
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

export function getCvPdfModel(): CvPdfModel {
  const { jobs, careerLength } = getExperience();

  return {
    name: bio.name,
    currentTitle: jobs[0]?.designation ?? "",
    interests: bio.interests,
    contacts: socials.map((item) => ({
      label: item.label,
      href: item.href,
      display: displayHref(item.href),
    })),
    careerLength,
    jobs: jobs.map((job) => ({
      designation: job.designation,
      organization: job.organization,
      emptype: job.emptype,
      location: job.location,
      rangeLabel: job.rangeLabel,
      periodLabel: pdfPeriodLabel(job.from, job.to),
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
