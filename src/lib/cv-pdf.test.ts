import { expect, test, vi } from "vitest";
import {
  getCertificates,
  getEducation,
  getExperience,
  getSkillGroups,
  getSpokenLanguages,
} from "./content";
import { getCvPdfModel } from "./cv-pdf";
import { socials } from "./socials";

test("PDF model uses the same jobs and education as the content seam", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-25T12:00:00+05:30"));

  try {
    const { jobs, careerLength } = getExperience();
    const education = getEducation();
    const model = getCvPdfModel();

    expect(model.careerLength).toBe(careerLength);
    expect(model.jobs.map((job) => job.designation)).toEqual(
      jobs.map((job) => job.designation),
    );
    expect(model.jobs.map((job) => job.organization)).toEqual(
      jobs.map((job) => job.organization),
    );
    expect(model.jobs.map((job) => job.rangeLabel)).toEqual(
      jobs.map((job) => job.rangeLabel),
    );
    expect(model.jobs.map((job) => job.tenureLabel)).toEqual(
      jobs.map((job) => job.tenureLabel),
    );
    expect(model.education.map((item) => item.rangeLabel)).toEqual(
      education.map((item) => item.rangeLabel),
    );
    expect(model.education.map((item) => item.qualexam)).toEqual(
      education.map((item) => item.qualexam),
    );
  } finally {
    vi.useRealTimers();
  }
});

test("PDF model keeps certs, spoken languages, and hidden skills aligned with the page", () => {
  const model = getCvPdfModel();
  const skillLabels = model.skillGroups.flatMap((group) => group.labels);
  const pageSkillLabels = getSkillGroups().flatMap((group) =>
    group.items.map((item) => item.label),
  );

  expect(skillLabels).toEqual(pageSkillLabels);
  expect(skillLabels).toContain("Python");
  expect(skillLabels).not.toContain("Rust");
  expect(skillLabels).not.toContain("Kotlin");

  expect(model.certificates.map((item) => item.name)).toEqual(
    getCertificates().map((item) => item.name),
  );
  expect(model.certificates.map((item) => item.issuedLabel)).toEqual(
    getCertificates().map((item) => item.issuedLabel),
  );
  expect(model.languages.map((item) => item.language)).toEqual(
    getSpokenLanguages().map((item) => item.language),
  );
  expect(model.contacts.map((item) => item.href)).toEqual(
    socials.map((item) => item.href),
  );
});
