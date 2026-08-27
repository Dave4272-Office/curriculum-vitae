import { DateTime } from "luxon";
import type { IconType } from "react-icons";
import { CgCPlusPlus } from "react-icons/cg";
import {
  FaAndroid,
  FaAngular,
  FaAws,
  FaBootstrap,
  FaCss3,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaJenkins,
  FaJs,
  FaLinux,
  FaMarkdown,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaRust,
  FaSass,
  FaWordpress,
  FaYarn,
} from "react-icons/fa";
import { GrMysql, GrOracle } from "react-icons/gr";
import {
  SiC,
  SiCloudfoundry,
  SiExpress,
  SiGithubactions,
  SiGnubash,
  SiGo,
  SiHibernate,
  SiJquery,
  SiJupyter,
  SiKotlin,
  SiKubernetes,
  SiMongodb,
  SiNpm,
  SiRedis,
  SiScikitlearn,
  SiServerless,
  SiSpring,
  SiSpringboot,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import certJson from "../../public/static/data/cert.list.json";
import eduJson from "../../public/static/data/edu.list.json";
import langJson from "../../public/static/data/lang.list.json";
import skillJson from "../../public/static/data/skill.list.json";
import socialJson from "../../public/static/data/social.list.json";
import workJson from "../../public/static/data/work.list.json";
import { durationAsString } from "../utils/date-time";
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
  Icon: IconType;
};

export type SkillGroup = {
  type: TechType;
  items: SkillEntry[];
};

export type ParsedWork = WorkItem & {
  rangeLabel: string;
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

function rootedHref(path: string): string {
  if (!path) {
    return "";
  }
  return path.startsWith("/") ? path : `/${path}`;
}

function monthLabel(from: DateTime, to?: DateTime): string {
  const start = from.toFormat("MMMM yyyy");
  const end = to ? to.toFormat("MMMM yyyy") : "Present";
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
    rangeLabel: monthLabel(from, to),
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

const skillIcons: Record<string, IconType> = {
  FaPython,
  FaJava,
  CgCPlusPlus,
  SiC,
  SiGnubash,
  FaJs,
  SiTypescript,
  SiKotlin,
  SiGo,
  FaRust,
  FaPhp,
  FaHtml5,
  FaCss3,
  FaSass,
  FaMarkdown,
  SiSpring,
  SiSpringboot,
  FaReact,
  FaAngular,
  FaNodeJs,
  SiExpress,
  SiJquery,
  FaBootstrap,
  FaWordpress,
  SiHibernate,
  SiScikitlearn,
  SiServerless,
  GrMysql,
  SiOracle: GrOracle,
  SiMongodb,
  SiRedis,
  FaGitAlt,
  FaDocker,
  SiKubernetes,
  SiNpm,
  FaYarn,
  FaJenkins,
  SiGithubactions,
  FaAndroid,
  FaAws,
  SiCloudfoundry,
  FaLinux,
  SiJupyter,
  SiVisualstudiocode: VscVscode,
  SiTerraform,
};

function resolveSkillIcon(skill: TechSkill): IconType {
  const Icon = skillIcons[skill.icon];
  if (!Icon) {
    throw new Error(`Missing skill icon "${skill.icon}" for "${skill.label}"`);
  }
  return Icon;
}

export function getSkillGroups(
  items: readonly TechSkill[] = skillItems,
): SkillGroup[] {
  const grouped = new Map<TechType, SkillEntry[]>();
  for (const skill of items) {
    const Icon = resolveSkillIcon(skill);
    if (!skill.include || skill.type === "None") {
      continue;
    }
    const groupItems = grouped.get(skill.type) ?? [];
    groupItems.push({ label: skill.label, Icon });
    grouped.set(skill.type, groupItems);
  }
  return skillTypeOrder
    .filter((type) => grouped.has(type))
    .map((type) => ({ type, items: grouped.get(type) ?? [] }));
}

export function getSpokenLanguages(): SpokenLanguage[] {
  return languageItems;
}

export function getSocials(): SocialLink[] {
  return socialItems;
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
