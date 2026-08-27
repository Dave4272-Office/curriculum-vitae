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
  tenureLabel: string;
  desc: string[];
  skills: string[];
};

export type CvPdfEducation = {
  rangeLabel: string;
  qualexam: string;
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
      tenureLabel: job.tenureLabel,
      desc: job.desc,
      skills: job.skills,
    })),
    education: getEducation().map((item) => ({
      rangeLabel: item.rangeLabel,
      qualexam: item.qualexam,
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
