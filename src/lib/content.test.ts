import { expect, test, vi } from "vitest";
import { getCertificates, getEducation, getExperience, getSkillGroups } from "./content";
import type { TechSkill } from "./types";

test("skill groups resolve catalog icons and omit hidden rows", () => {
  const groups = getSkillGroups();
  const items = groups.flatMap((group) => group.items);

  expect(items.some((skill) => skill.label === "Python")).toBe(true);
  expect(items.some((skill) => skill.label === "Java")).toBe(true);
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
    expect(jobs[0]?.rangeLabel.endsWith("Present")).toBe(true);
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
