import { DateTime } from "luxon";
import type { IconType } from "react-icons";
import certJson from "../../public/static/data/cert.list.json";
import eduJson from "../../public/static/data/edu.list.json";
import langJson from "../../public/static/data/lang.list.json";
import skillJson from "../../public/static/data/skill.list.json";
import socialJson from "../../public/static/data/social.list.json";
import workJson from "../../public/static/data/work.list.json";
import { durationAsString } from "../utils/date-time";
import { skillBrandColor } from "./brand-colors";
import { resolveSkillIcon } from "./skill-icons";
import type {
  AcademicRecord,
  Certificate,
  SocialLink,
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
const socialItems = socialJson as SocialLink[];

export type SkillEntry = {
  label: string;
  icon: string;
  Icon: IconType;
  color: string;
};

/** Serializable skill fields for Client Components (no Icon function). */
export type HoneycombSkill = {
  label: string;
  icon: string;
  color: string;
};

export type SkillGroup = {
  type: TechType;
  items: SkillEntry[];
};

export type ParsedWork = WorkItem & {
  rangeLabelShort: string;
  rangeLabelLong: string;
  tenureLabel: string;
};

export type Experience = {
  jobs: ParsedWork[];
  careerLength: string;
};

export type ParsedCertificate = Certificate & {
  issuedLabel: string;
};

export type ParsedEducation = AcademicRecord & {
  rangeLabel: string;
};

export function withOptionalAbbr(
  name: string,
  abbr: string | null | undefined,
): string {
  return abbr ? `${name} (${abbr})` : name;
}

function rootedHref(path: string): string {
  if (!path) {
    return "";
  }
  return path.startsWith("/") ? path : `/${path}`;
}

function monthRangeLabel(
  from: DateTime,
  to: DateTime | undefined,
  monthFormat: "MMM" | "MMMM",
): string {
  const start = from.toFormat(`${monthFormat} yyyy`);
  const end = to ? to.toFormat(`${monthFormat} yyyy`) : "Present";
  return `${start} – ${end}`;
}

function yearRangeLabel(from: string, to?: string): string {
  return to ? `${from}–${to}` : from;
}

function workSpan(item: WorkItem): { from: DateTime; to?: DateTime } {
  const from = DateTime.fromFormat(item.from, "yyyy-MM");
  const to = item.to
    ? DateTime.fromFormat(item.to, "yyyy-MM").endOf("month")
    : undefined;
  return { from, to };
}

function toJob(item: WorkItem, now: DateTime): ParsedWork {
  const { from, to } = workSpan(item);
  return {
    ...item,
    organizationicon: rootedHref(item.organizationicon),
    rangeLabelShort: monthRangeLabel(from, to, "MMM"),
    rangeLabelLong: monthRangeLabel(from, to, "MMMM"),
    tenureLabel: durationAsString(from, to ?? now),
  };
}

function careerLengthOf(items: WorkItem[], now: DateTime): string {
  if (items.length === 0) {
    return "";
  }
  const spans = items.map(workSpan);
  const start = DateTime.min(...spans.map((span) => span.from)) ?? now;
  const end = DateTime.max(...spans.map((span) => span.to ?? now)) ?? now;
  return durationAsString(start, end);
}

export function getExperience(now = DateTime.now()): Experience {
  const published = workItems.filter((item) => item.include);
  return {
    jobs: published.map((item) => toJob(item, now)),
    careerLength: careerLengthOf(published, now),
  };
}

export function getEducation(): ParsedEducation[] {
  return [...educationItems]
    .sort((a, b) => Number(b.from) - Number(a.from))
    .map((item) => ({
      ...item,
      rangeLabel: yearRangeLabel(item.from, item.to),
    }));
}

export function getCertificates(): ParsedCertificate[] {
  return certificateItems
    .filter((item) => item.include)
    .map((item) => {
      const issued = DateTime.fromFormat(item.issuedate, "yyyy-MM-dd");
      return {
        cert: {
          ...item,
          issuericon: rootedHref(item.issuericon),
          issuedLabel: issued.toFormat("yyyy"),
        },
        millis: issued.toMillis(),
      };
    })
    .sort((a, b) => b.millis - a.millis)
    .map((entry) => entry.cert);
}

const skillTypeOrder: TechType[] = [
  "Language",
  "Framework / Library",
  "Database",
  "Tool",
  "Platform",
  "IDE",
];

/** Job-tech display names map to the skills-catalog label used for icons and grouping. */
const skillLabelAliases: Readonly<Record<string, string>> = {
  "Serverless Framework": "Serverless",
  "GitHub Actions": "GHA",
  AWS: "Amazon Web Services",
  "Amazon AWS": "Amazon Web Services",
  "AWS Lambda": "Amazon Web Services",
  "Amazon API Gateway": "Amazon Web Services",
  "Amazon Route53": "Amazon Web Services",
  "Amazon Aurora": "Amazon Web Services",
  "Amazon ECS": "Amazon Web Services",
};

export function catalogSkillLabel(name: string): string {
  return skillLabelAliases[name] ?? name;
}

export function skillEntryForLabel(
  label: string,
  items: readonly TechSkill[] = skillItems,
): SkillEntry | undefined {
  const key = catalogSkillLabel(label);
  const skill = items.find((item) => catalogSkillLabel(item.label) === key);
  if (!skill) {
    return undefined;
  }
  return toSkillEntry(skill);
}

function resolveSkillBrandColor(skill: TechSkill): string {
  const color = skillBrandColor(skill.icon);
  if (!color) {
    throw new Error(
      `Missing skill brand color "${skill.icon}" for "${skill.label}"`,
    );
  }
  return color;
}

function toSkillEntry(skill: TechSkill): SkillEntry {
  return {
    label: skill.label,
    icon: skill.icon,
    Icon: resolveSkillIcon(skill.icon, skill.label),
    color: resolveSkillBrandColor(skill),
  };
}

export function toHoneycombSkill(skill: SkillEntry): HoneycombSkill {
  return {
    label: skill.label,
    icon: skill.icon,
    color: skill.color,
  };
}

export function getSkillGroups(
  items: readonly TechSkill[] = skillItems,
): SkillGroup[] {
  const grouped = new Map<TechType, SkillEntry[]>();
  const seen = new Set<string>();
  for (const skill of items) {
    const entry = toSkillEntry(skill);
    if (!skill.include || skill.type === "None") {
      continue;
    }
    const key = catalogSkillLabel(skill.label);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    const groupItems = grouped.get(skill.type) ?? [];
    groupItems.push(entry);
    grouped.set(skill.type, groupItems);
  }
  return skillTypeOrder
    .filter((type) => grouped.has(type))
    .map((type) => ({ type, items: grouped.get(type) ?? [] }));
}

export function getSpokenLanguages(): SpokenLanguage[] {
  return languageItems;
}

export function getSocials(
  items: readonly SocialLink[] = socialItems,
): SocialLink[] {
  return items.filter((item) => item.include);
}

export function getPdfSocials(
  items: readonly SocialLink[] = socialItems,
): SocialLink[] {
  return items.filter((item) => item.pdf);
}

export const bio = {
  name: "Debraj Kundu",
  tagline: "Developer | Learner | Full Stack | Linux | Open Source",
  site: "cv.corpdk.com",
  city: "Kolkata",
  state: "West Bengal",
  country: "India",
  summary:
    "I am a learner at heart, an experimenter in mind, an adventurer from the soul. I thrive on challenges.",
  focus:
    "Most of that curiosity goes into technology, especially cyber security and AI. I currently work as a senior associate consultant at Infosys, building authorization, cloud, and logistics systems for manufacturing.",
  interests:
    "I pick up new tools and ideas for the pleasure of it, not only when a ticket says so. Novels fill the quieter hours. I sketch when I want to think with a pencil, and music is almost always on in the background.",
};
