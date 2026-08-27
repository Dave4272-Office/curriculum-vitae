import { expect, test, vi } from "vitest";
import {
  getCertificates,
  getEducation,
  getExperience,
  getSkillGroups,
  getSocials,
  getSpokenLanguages,
} from "./content";
import {
  cvPdfDocumentTitle,
  cvPdfFilename,
  getCvPdfModel,
  pdfSkillHeading,
} from "./cv-pdf";

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
      jobs.map((job) => job.rangeLabelLong),
    );
    expect(model.jobs[0]?.rangeLabel).toBe("January 2025 – Present");
    expect(model.jobs.every((job) => !job.rangeLabel.includes("PRESENT"))).toBe(
      true,
    );
    expect(model.jobs.map((job) => job.location)).toEqual([
      "Kolkata, WB, India",
      "Bengaluru, KN, India",
      "Bengaluru, KN, India",
      "Bengaluru, KN, India",
    ]);
    expect(jobs.map((job) => job.location)).toEqual([
      "Kolkata, West Bengal, India",
      "Bengaluru, Karnataka, India",
      "Bengaluru, Karnataka, India",
      "Bengaluru, Karnataka, India",
    ]);
    expect(model.tagline).toBe(
      "Developer | Learner | Full Stack | Linux | Open Source",
    );
    expect(model.tagline).not.toBe(jobs[0]?.designation);
    expect(model.jobs.map((job) => job.organization)).toContain("Wipro");
    expect(model.jobs.map((job) => job.organization)).not.toContain(
      "Wipro Limited",
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
    expect(model.education.map((item) => item.qualspectype)).toEqual(
      education.map((item) => item.qualspectype),
    );
  } finally {
    vi.useRealTimers();
  }
});

test("PDF filename and document title share the generate-time date", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-27T09:15:00+05:30"));

  try {
    const model = getCvPdfModel();

    expect(model.generatedOn).toBe("2026-08-27");
    expect(model.filename).toBe("Debraj-Kundu-CV-2026-08-27.pdf");
    expect(model.documentTitle).toBe("Debraj Kundu CV 2026-08-27");
    expect(cvPdfFilename(model.generatedOn)).toBe(model.filename);
    expect(cvPdfDocumentTitle(model.generatedOn)).toBe(model.documentTitle);
  } finally {
    vi.useRealTimers();
  }
});

test("PDF model keeps certs, spoken languages, socials, and hidden skills aligned with the page", () => {
  const model = getCvPdfModel();
  const skillLabels = model.skillGroups.flatMap((group) => group.labels);
  const pageSkillLabels = getSkillGroups().flatMap((group) =>
    group.items.map((item) => item.label),
  );

  expect(skillLabels).toEqual(pageSkillLabels);
  expect(skillLabels).toContain("Python");
  expect(skillLabels).toContain("Amazon Web Services");
  expect(skillLabels).toContain("Serverless");
  expect(skillLabels).toContain("Jenkins");
  expect(skillLabels).toContain("GHA");
  expect(skillLabels).not.toContain("Serverless Framework");
  expect(skillLabels).not.toContain("GitHub Actions");
  expect(
    model.jobs.some((job) => job.skills.includes("Serverless Framework")),
  ).toBe(true);
  expect(model.jobs.some((job) => job.skills.includes("GitHub Actions"))).toBe(
    true,
  );
  expect(model.jobs.every((job) => !job.skills.includes("Serverless"))).toBe(
    true,
  );
  expect(model.jobs.every((job) => !job.skills.includes("GHA"))).toBe(true);
  expect(skillLabels).toContain("Kubernetes");
  expect(skillLabels).toContain("Express.js");
  expect(skillLabels).toContain("Redis");
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
    getSocials().map((item) => item.href),
  );
  expect(pdfSkillHeading("Language")).toBe("Programming");
  expect(pdfSkillHeading("Framework / Library")).toBe("Frameworks/Libraries");
});
