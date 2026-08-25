import { DateTime } from "luxon";
import certJson from "../../public/static/data/cert.list.json";
import eduJson from "../../public/static/data/edu.list.json";
import langJson from "../../public/static/data/lang.list.json";
import skillJson from "../../public/static/data/skill.list.json";
import workJson from "../../public/static/data/work.list.json";
import { durationAsString } from "../utils/date-time";
import type {
  AcademicRecord,
  Certificate,
  SpokenLanguage,
  TechSkill,
  TechType,
  WorkItem,
} from "./types";

const workItems = workJson as WorkItem[];
const educationItems = eduJson as AcademicRecord[];
const certificateItems = certJson as Certificate[];
const skillItems = skillJson as TechSkill[];
const languageItems = langJson as SpokenLanguage[];

export type SkillEntry = {
  label: string;
  icon: string;
};

export type SkillGroup = {
  type: TechType;
  items: SkillEntry[];
};

export type ParsedWork = WorkItem & {
  fromDate: DateTime;
  toDate?: DateTime;
  rangeLabel: string;
  tenureLabel: string;
};

export type ParsedCertificate = Certificate & {
  issued: DateTime;
  issuedLabel: string;
};

function monthLabel(from: DateTime, to?: DateTime): string {
  const start = from.toFormat("MMM yyyy");
  const end = to ? to.toFormat("MMM yyyy") : "Present";
  return `${start} – ${end}`;
}

function parseWork(item: WorkItem): ParsedWork {
  const fromDate = DateTime.fromFormat(item.from, "yyyy-MM");
  const toDate = item.to
    ? DateTime.fromFormat(item.to, "yyyy-MM").endOf("month")
    : undefined;
  return {
    ...item,
    fromDate,
    toDate,
    rangeLabel: monthLabel(fromDate, toDate),
    tenureLabel: durationAsString(fromDate, toDate ?? DateTime.now()),
  };
}

export function getExperience(): ParsedWork[] {
  return workItems.filter((item) => item.include).map(parseWork);
}

export function totalExperienceLabel(items: ParsedWork[]): string {
  if (items.length === 0) {
    return "";
  }
  const start =
    DateTime.min(...items.map((item) => item.fromDate)) ?? DateTime.now();
  const end =
    DateTime.max(...items.map((item) => item.toDate ?? DateTime.now())) ??
    DateTime.now();
  return durationAsString(start, end);
}

export function getEducation(): AcademicRecord[] {
  return [...educationItems].sort((a, b) => Number(b.from) - Number(a.from));
}

export function getCertificates(): ParsedCertificate[] {
  return certificateItems
    .filter((item) => item.include)
    .map((item) => {
      const issued = DateTime.fromFormat(item.issuedate, "yyyy-MM-dd");
      return {
        ...item,
        issued,
        issuedLabel: issued.toFormat("yyyy"),
      };
    })
    .sort((a, b) => b.issued.toMillis() - a.issued.toMillis());
}

const skillTypeOrder: TechType[] = [
  "Language",
  "Framework / Library",
  "Database",
  "Tool",
  "Platform",
  "IDE",
];

export function getSkillGroups(): SkillGroup[] {
  const grouped = new Map<TechType, SkillEntry[]>();
  for (const skill of skillItems) {
    if (!skill.include || skill.type === "None") {
      continue;
    }
    const items = grouped.get(skill.type) ?? [];
    items.push({ label: skill.label, icon: skill.icon });
    grouped.set(skill.type, items);
  }
  return skillTypeOrder
    .filter((type) => grouped.has(type))
    .map((type) => ({ type, items: grouped.get(type) ?? [] }));
}

export function getSpokenLanguages(): SpokenLanguage[] {
  return languageItems;
}

export const bio = {
  name: "Debraj Kundu",
  summary:
    "I am a learner at heart, an experimenter in mind, an adventurer from the soul. I thrive on challenges.",
  focus:
    "Most of that curiosity goes into technology, especially cyber security and AI. I currently work as a senior associate consultant at Infosys, building authorization, cloud, and logistics systems for manufacturing.",
  interests:
    "I pick up new tools and ideas for the pleasure of it, not only when a ticket says so. Novels fill the quieter hours. I sketch when I want to think with a pencil, and music is almost always on in the background.",
};
