import { expect, test, vi } from "vitest";
import {
  getCertificates,
  getEducation,
  getExperience,
  getPdfSocials,
  getSkillGroups,
  getSpokenLanguages,
  skillTypeOrder,
} from "./content";
import { cvPdfDocumentTitle, cvPdfFilename, cvPdfPath } from "./cv-download";
import {
  getCvPdfModel,
  pdfContactAddress,
  pdfSiteHref,
  pdfSkillHeading,
  spokenLanguageLine,
} from "./cv-pdf";

test("PDF model uses the same jobs and education as the content seam", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-02T12:00:00+05:30"));

  try {
    const { jobs } = getExperience();
    const education = getEducation("pdf");
    const model = getCvPdfModel();

    expect(model).not.toHaveProperty("careerLength");
    expect(model.jobs.map((job) => job.designation)).toEqual(
      jobs.map((job) => job.designation),
    );
    expect(model.jobs.map((job) => job.organization)).toEqual(
      jobs.map((job) => job.organization),
    );
    expect(model.jobs.map((job) => job.rangeLabel)).toEqual(
      jobs.map((job) => job.rangeLabelLong),
    );
    expect(model.jobs[0]?.rangeLabel).toBe("August 2026 – Present");
    expect(model.jobs[1]?.rangeLabel).toBe("January 2025 – August 2026");
    expect(model.jobs.every((job) => !job.rangeLabel.includes("PRESENT"))).toBe(
      true,
    );
    expect(model.jobs.every((job) => !("tenureLabel" in job))).toBe(true);
    expect(model.jobs.every((job) => !("emptype" in job))).toBe(true);
    expect(model.jobs.map((job) => job.location)).toEqual([
      "Kolkata, WB, India",
      "Kolkata, WB, India",
      "Bengaluru, KN, India",
      "Bengaluru, KN, India",
      "Bengaluru, KN, India",
    ]);
    expect(jobs.map((job) => job.location)).toEqual([
      "Kolkata, West Bengal, India",
      "Kolkata, West Bengal, India",
      "Bengaluru, Karnataka, India",
      "Bengaluru, Karnataka, India",
      "Bengaluru, Karnataka, India",
    ]);
    expect(model.tagline).toBe(
      "Developer | Learner | Full Stack | Linux | Open Source",
    );
    expect(model.tagline).not.toBe(jobs[0]?.designation);
    expect(model.site).toBe("cv.corpdk.com");
    expect(model.siteHref).toBe("https://cv.corpdk.com");
    expect(pdfSiteHref()).toBe("https://cv.corpdk.com");
    expect(pdfSiteHref("https://cv.corpdk.com")).toBe("https://cv.corpdk.com");
    expect(model.address).toBe("Kolkata, West Bengal, India");
    expect(pdfContactAddress()).toBe("Kolkata, West Bengal, India");
    expect(model.address).not.toContain("WB");
    expect(model.address).not.toContain("16/5");
    expect(model.address).not.toContain("Ghosh");
    expect(model.jobs.map((job) => job.organization)).toContain("Wipro");
    expect(model.jobs.map((job) => job.organization)).not.toContain(
      "Wipro Limited",
    );
    expect(model.education).toEqual(
      education.map(({ exam, place, spec, outcome }) => ({
        exam,
        place,
        spec,
        outcome,
      })),
    );
    expect(model.education.map((item) => item.exam)).toEqual([
      "Bachelor of Technology (Bachelors)",
      "AISSCE (Sr. Secondary | XII)",
      "AISSE (Secondary | X)",
    ]);
    expect(model.education.map((item) => item.place)).toEqual([
      "Birbhum Institute of Engineering and Technology, Suri (MAKAUT)",
      "Sainik School Purulia (CBSE)",
      "Sainik School Purulia (CBSE)",
    ]);
    expect(model.education.map((item) => item.spec)).toEqual([
      "Major: Computer Science and Engineering",
      "Subjects: ENG, PHY, CHEM, MATH, CS(C++)",
      null,
    ]);
    expect(model.education.map((item) => item.outcome)).toEqual([
      "2020, 8.32 DGPA",
      "2016, 84 %",
      "2014, 9.2 CGPA (87.4 %)",
    ]);
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
  const pageGroups = getSkillGroups();
  const pageSkillLabels = pageGroups.flatMap((group) =>
    group.items.map((item) => item.label),
  );

  expect(model.skillGroups.map((group) => group.type)).toEqual(
    pageGroups.map((group) => group.type),
  );
  expect(model.skillGroups.map((group) => group.type)).toEqual(
    skillTypeOrder.filter((type) =>
      pageGroups.some((group) => group.type === type),
    ),
  );
  expect(skillLabels).toEqual(pageSkillLabels);
  expect(skillLabels).toContain("Python");
  expect(skillLabels).toContain("Amazon Web Services");
  expect(skillLabels).toContain("Serverless");
  expect(skillLabels).toContain("Jenkins");
  expect(skillLabels).toContain("GHA");
  expect(skillLabels).not.toContain("Serverless Framework");
  expect(skillLabels).not.toContain("GitHub Actions");
  expect(skillLabels).not.toContain("AWS Lambda");
  expect(skillLabels).not.toContain("Amazon API Gateway");
  expect(skillLabels).not.toContain("Amazon Route53");
  expect(skillLabels).not.toContain("Amazon Aurora");
  expect(skillLabels).not.toContain("Amazon ECS");
  expect(
    model.jobs.some((job) => job.skills.includes("Serverless Framework")),
  ).toBe(true);
  expect(model.jobs.some((job) => job.skills.includes("GitHub Actions"))).toBe(
    true,
  );
  expect(model.jobs.some((job) => job.skills.includes("AWS Lambda"))).toBe(true);
  expect(
    model.jobs.some((job) => job.skills.includes("Amazon API Gateway")),
  ).toBe(true);
  expect(model.jobs.some((job) => job.skills.includes("Amazon Route53"))).toBe(
    true,
  );
  expect(model.jobs.some((job) => job.skills.includes("Amazon Aurora"))).toBe(
    true,
  );
  expect(model.jobs.some((job) => job.skills.includes("Amazon ECS"))).toBe(true);
  expect(model.jobs.every((job) => !job.skills.includes("Serverless"))).toBe(
    true,
  );
  expect(model.jobs.every((job) => !job.skills.includes("GHA"))).toBe(true);
  expect(
    model.jobs.every((job) => !job.skills.includes("Amazon Web Services")),
  ).toBe(true);
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
  expect(model.languages.map((item) => item.line)).toEqual(
    getSpokenLanguages().map(spokenLanguageLine),
  );
  expect(spokenLanguageLine(getSpokenLanguages()[0]!)).toBe("English (Fluent)");
  expect(spokenLanguageLine(getSpokenLanguages()[1]!)).toBe(
    "Bengali (Native Fluent; RW Intermediate)",
  );
  expect(spokenLanguageLine(getSpokenLanguages()[2]!)).toBe(
    "Hindi (Fluent; RW Basic)",
  );
  expect(model.contacts.map((item) => item.href)).toEqual(
    getPdfSocials().map((item) => item.href),
  );
  expect(model.contacts.some((item) => item.href === cvPdfPath)).toBe(false);
  expect(pdfSkillHeading("Language")).toBe("Programming");
  expect(pdfSkillHeading("Framework / Library")).toBe("Frameworks/Libraries");
  expect(model.skillGroups.map((group) => group.heading)).toEqual(
    pageGroups.map((group) => pdfSkillHeading(group.type)),
  );
});
