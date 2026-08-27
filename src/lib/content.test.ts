import { expect, test, vi } from "vitest";
import {
  bio,
  catalogSkillLabel,
  getCertificates,
  getEducation,
  getExperience,
  getPdfSocials,
  getSkillGroups,
  getSocials,
  skillEntryForLabel,
} from "./content";
import type { SocialLink, TechSkill } from "./types";

test("skill groups resolve catalog icons and omit hidden rows", () => {
  const groups = getSkillGroups();
  const items = groups.flatMap((group) => group.items);

  expect(items.some((skill) => skill.label === "Python")).toBe(true);
  expect(items.some((skill) => skill.label === "Java")).toBe(true);
  expect(items.some((skill) => skill.label === "Amazon Web Services")).toBe(
    true,
  );
  expect(items.some((skill) => skill.label === "Serverless")).toBe(true);
  expect(items.some((skill) => skill.label === "Jenkins")).toBe(true);
  expect(items.some((skill) => skill.label === "GHA")).toBe(true);
  expect(items.some((skill) => skill.label === "Kubernetes")).toBe(true);
  expect(items.some((skill) => skill.label === "Express.js")).toBe(true);
  expect(items.some((skill) => skill.label === "Redis")).toBe(true);
  expect(items.some((skill) => skill.label === "Rust")).toBe(false);
  expect(items.some((skill) => skill.label === "Kotlin")).toBe(false);

  for (const skill of items) {
    expect(typeof skill.Icon).toBe("function");
  }
});

test("missing icon keys fail at the content seam", () => {
  const broken: TechSkill[] = [
    {
      include: true,
      icon: "NotARealIcon",
      label: "Nope",
      type: "Language",
    },
  ];

  expect(() => getSkillGroups(broken)).toThrow(
    'Missing skill icon "NotARealIcon" for "Nope"',
  );
});

test("skill aliases join job-tech names to catalog labels without throwing", () => {
  expect(catalogSkillLabel("Serverless Framework")).toBe("Serverless");
  expect(catalogSkillLabel("Serverless")).toBe("Serverless");
  expect(catalogSkillLabel("GitHub Actions")).toBe("GHA");
  expect(catalogSkillLabel("GHA")).toBe("GHA");
  expect(catalogSkillLabel("Java")).toBe("Java");
  expect(catalogSkillLabel("AWS")).toBe("Amazon Web Services");
  expect(catalogSkillLabel("Amazon Web Services")).toBe("Amazon Web Services");

  const serverless = skillEntryForLabel("Serverless Framework");
  const gha = skillEntryForLabel("GitHub Actions");
  expect(serverless?.label).toBe("Serverless");
  expect(gha?.label).toBe("GHA");
  expect(typeof serverless?.Icon).toBe("function");
  expect(typeof gha?.Icon).toBe("function");

  const awsProducts = [
    "AWS Lambda",
    "Amazon API Gateway",
    "Amazon Route53",
    "Amazon Aurora",
    "Amazon ECS",
  ];
  for (const name of awsProducts) {
    expect(catalogSkillLabel(name)).toBe("Amazon Web Services");
    const aws = skillEntryForLabel(name);
    expect(aws?.label).toBe("Amazon Web Services");
    expect(typeof aws?.Icon).toBe("function");
  }
  expect(skillEntryForLabel("AWS")?.label).toBe("Amazon Web Services");

  for (const job of getExperience().jobs) {
    for (const name of job.skills) {
      expect(() => skillEntryForLabel(name)).not.toThrow();
    }
  }

  const dual: TechSkill[] = [
    {
      include: true,
      icon: "SiServerless",
      label: "Serverless",
      type: "Framework / Library",
    },
    {
      include: true,
      icon: "SiServerless",
      label: "Serverless Framework",
      type: "Framework / Library",
    },
  ];
  expect(getSkillGroups(dual).flatMap((group) => group.items.map((item) => item.label))).toEqual(
    ["Serverless"],
  );

  const awsDual: TechSkill[] = [
    {
      include: true,
      icon: "FaAws",
      label: "Amazon Web Services",
      type: "Platform",
    },
    {
      include: true,
      icon: "FaAws",
      label: "AWS Lambda",
      type: "Platform",
    },
  ];
  expect(
    getSkillGroups(awsDual).flatMap((group) => group.items.map((item) => item.label)),
  ).toEqual(["Amazon Web Services"]);
});

test("hidden catalog rows still fail if their icon key is missing", () => {
  const broken: TechSkill[] = [
    {
      include: false,
      icon: "AlsoMissing",
      label: "Rust-alike",
      type: "Language",
    },
  ];

  expect(() => getSkillGroups(broken)).toThrow(
    'Missing skill icon "AlsoMissing" for "Rust-alike"',
  );
});

test("education records leave the content seam with a year rangeLabel", () => {
  expect(getEducation().map((item) => item.rangeLabel)).toEqual([
    "2016–2020",
    "2014–2016",
    "2009–2014",
  ]);
});

test("experience leaves view-ready jobs and career length", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-25T12:00:00+05:30"));

  try {
    const { jobs, careerLength } = getExperience();

    expect(careerLength).toBe("6 yrs");
    expect(jobs.map((job) => job.tenureLabel)).toEqual([
      "1 yr 8 mths",
      "1 yr",
      "1 yr 2 mths",
      "2 yrs 2 mths",
    ]);
    expect(jobs[0]?.rangeLabelShort).toBe("Jan 2025 – Present");
    expect(jobs[0]?.rangeLabelLong).toBe("January 2025 – Present");
    expect(jobs.map((job) => job.rangeLabelShort)).toEqual([
      "Jan 2025 – Present",
      "Jan 2024 – Dec 2024",
      "Nov 2022 – Dec 2023",
      "Sep 2020 – Oct 2022",
    ]);
    expect(jobs.map((job) => job.rangeLabelLong)).toEqual([
      "January 2025 – Present",
      "January 2024 – December 2024",
      "November 2022 – December 2023",
      "September 2020 – October 2022",
    ]);
    expect(jobs.every((job) => !("rangeLabel" in job))).toBe(true);
    expect(jobs.some((job) => job.tenureLabel.includes("12 mth"))).toBe(false);
    expect(jobs.every((job) => !("fromDate" in job) && !("toDate" in job))).toBe(
      true,
    );
  } finally {
    vi.useRealTimers();
  }
});

test("experience brand marks leave as rooted hrefs", () => {
  expect(getExperience().jobs.map((job) => job.organizationicon)).toEqual([
    "/static/logos/third-party/Infosys.svg",
    "/static/logos/third-party/Infosys.svg",
    "/static/logos/third-party/Infosys.svg",
    "/static/logos/third-party/Wipro.svg",
  ]);
  expect(getExperience().jobs.map((job) => job.organization)).toEqual([
    "Infosys",
    "Infosys",
    "Infosys",
    "Wipro",
  ]);
  expect(getExperience().jobs.map((job) => job.location)).toEqual([
    "Kolkata, West Bengal, India",
    "Bengaluru, Karnataka, India",
    "Bengaluru, Karnataka, India",
    "Bengaluru, Karnataka, India",
  ]);
});

test("certificates leave issuedLabel in newest-first order", () => {
  expect(
    getCertificates().map((cert) => ({
      issuedLabel: cert.issuedLabel,
      issuedate: cert.issuedate,
    })),
  ).toEqual([
    { issuedLabel: "2019", issuedate: "2019-07-13" },
    { issuedLabel: "2019", issuedate: "2019-04-03" },
    { issuedLabel: "2018", issuedate: "2018-06-07" },
    { issuedLabel: "2018", issuedate: "2018-01-11" },
  ]);
});

test("certificate brand marks leave as rooted hrefs", () => {
  expect(getCertificates().map((cert) => cert.issuericon)).toEqual([
    "/static/logos/third-party/Microsoft.png",
    "/static/logos/third-party/IBM.png",
    "/static/logos/third-party/DataCamp.png",
    "/static/logos/third-party/Microsoft.png",
  ]);
});

const siteAndPdfSocials = [
  {
    label: "Twitter",
    href: "https://twitter.com/Dave4272dk",
    icon: "twitter",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/debraj-kundu/",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dave4272dk/",
    icon: "instagram",
  },
  {
    label: "GitHub",
    href: "https://github.com/Dave4272-Office",
    icon: "github",
  },
  {
    label: "Keybase",
    href: "https://keybase.io/dave4272",
    icon: "keybase",
  },
  {
    label: "TryHackMe",
    href: "https://tryhackme.com/p/Dave4272",
    icon: "tryhackme",
  },
  {
    label: "Download",
    href: "/cv.pdf",
    icon: "pdf",
  },
] as const;

const mixedVisibilitySocials: SocialLink[] = [
  {
    include: true,
    pdf: false,
    label: "download",
    href: "/cv.pdf",
    icon: "pdf",
  },
  {
    include: false,
    pdf: true,
    label: "PDF only",
    href: "https://pdf-only.example",
    icon: "twitter",
  },
  {
    include: true,
    pdf: true,
    label: "Both",
    href: "https://both.example",
    icon: "github",
  },
  {
    include: false,
    pdf: false,
    label: "Neither",
    href: "https://neither.example",
    icon: "keybase",
  },
];

test("site socials keep download and omit include:false rows", () => {
  expect(
    getSocials().map((item) => ({
      label: item.label,
      href: item.href,
      icon: item.icon,
    })),
  ).toEqual([...siteAndPdfSocials]);
  expect(getSocials().some((item) => item.href === "/cv.pdf")).toBe(true);

  expect(
    getSocials(mixedVisibilitySocials).map((item) => item.label),
  ).toEqual(["download", "Both"]);
});

test("PDF socials omit download and include pdf:true rows that are hidden on the site", () => {
  expect(
    getPdfSocials().map((item) => ({
      label: item.label,
      href: item.href,
      icon: item.icon,
    })),
  ).toEqual([
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/debraj-kundu/",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/Dave4272-Office",
      icon: "github",
    },
  ]);
  expect(getPdfSocials().some((item) => item.href === "/cv.pdf")).toBe(false);

  expect(
    getPdfSocials(mixedVisibilitySocials).map((item) => item.label),
  ).toEqual(["PDF only", "Both"]);
});

test("bio contact location is city, state, and country only", () => {
  expect(bio.city).toBe("Kolkata");
  expect(bio.state).toBe("West Bengal");
  expect(bio.country).toBe("India");
  expect(bio.site).toBe("cv.corpdk.com");
  expect(bio).not.toHaveProperty("street");
  expect(bio).not.toHaveProperty("line1");
  expect(bio).not.toHaveProperty("line2");
  expect(JSON.stringify(bio)).not.toContain("16/5");
  expect(JSON.stringify(bio)).not.toContain("Ghosh");
});
