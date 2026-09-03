/** @vitest-environment node */

import { inflateSync } from "node:zlib";
import { expect, test, vi } from "vitest";
import { getEducation, getExperience } from "../lib/content";
import { getCvPdfModel } from "../lib/cv-pdf";
import { cvPdfLayout } from "./cv-document";
import { renderCvPdf } from "./render-cv-pdf";

function pdfPageCount(pdf: Buffer): number {
  const match = pdf.toString("latin1").match(/\/Type \/Pages[\s\S]*?\/Count (\d+)/);
  return match ? Number(match[1]) : 0;
}

function decodeStream(raw: string): string {
  try {
    return inflateSync(Buffer.from(raw, "latin1")).toString("latin1");
  } catch {
    return raw;
  }
}

function pdfStreams(pdf: Buffer): string[] {
  const latin = pdf.toString("latin1");
  return [...latin.matchAll(/stream\r?\n([\s\S]*?)endstream/g)].map((match) =>
    decodeStream(match[1]),
  );
}

function parseToUnicodeMaps(streams: string[]): Map<number, string>[] {
  const maps: Map<number, string>[] = [];
  for (const content of streams) {
    for (const block of content.matchAll(/beginbfrange\s+([\s\S]*?)endbfrange/g)) {
      const cmap = new Map<number, string>();
      for (const range of block[1].matchAll(
        /<([0-9a-fA-F]+)>\s+<([0-9a-fA-F]+)>\s+\[([^\]]+)\]/g,
      )) {
        const start = Number.parseInt(range[1], 16);
        const dests = [...range[3].matchAll(/<([0-9a-fA-F]+)>/g)].map((item) =>
          String.fromCodePoint(Number.parseInt(item[1], 16)),
        );
        dests.forEach((char, index) => {
          cmap.set(start + index, char);
        });
      }
      if (cmap.size > 0) {
        maps.push(cmap);
      }
    }
  }
  return maps;
}

function hexToCodes(hex: string): number[] {
  const codes: number[] = [];
  for (let index = 0; index + 3 < hex.length; index += 4) {
    codes.push(Number.parseInt(hex.slice(index, index + 4), 16));
  }
  return codes;
}

function pdfPlainText(pdf: Buffer): string {
  const latin = pdf.toString("latin1");
  const streams = pdfStreams(pdf);
  const maps = parseToUnicodeMaps(streams);
  const chunks: string[] = [latin, ...streams];
  for (const content of streams) {
    if (!content.includes("TJ") && !content.includes("Tj")) {
      continue;
    }
    const runs = [...content.matchAll(/<([0-9a-fA-F]+)>/g)].map((match) =>
      hexToCodes(match[1]),
    );
    for (const cmap of maps) {
      chunks.push(
        runs.map((codes) => codes.map((code) => cmap.get(code) ?? "").join("")).join(""),
      );
    }
  }
  return chunks.join("\n");
}

test("rendered PDF includes current titles and employers from content", async () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-02T12:00:00+05:30"));

  try {
    const model = getCvPdfModel();
    const pdf = await renderCvPdf(model);
    const bytes = Buffer.from(pdf);
    const latin = bytes.toString("latin1").replaceAll("\0", "");

    expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
    expect(pdfPageCount(bytes)).toBeLessThanOrEqual(2);
    expect(latin).toContain("LiberationSans");
    expect(latin).toContain(model.documentTitle);

    const text = pdfPlainText(bytes);
    const { jobs } = getExperience();
    const education = getEducation();

    for (const job of jobs) {
      expect(text).toContain(job.designation);
      expect(text).toContain(job.organization);
    }
    for (const item of education) {
      expect(text).toContain(item.qualexam);
    }
    expect(text).toContain("AISSE (Secondary | X)");
    expect(text).toContain("AISSCE (Sr. Secondary | XII)");
    expect(text).toContain("Bachelor of Technology (Bachelors)");
    expect(text).not.toContain("Bachelor of Technology (Bachelors) -");
    expect(text).toContain("Sainik School Purulia (CBSE)");
    expect(text).toContain(
      "Birbhum Institute of Engineering and Technology, Suri (MAKAUT)",
    );
    expect(text).toContain("2020, 8.32 DGPA");
    expect(text).toContain("2016, 84 %");
    expect(text).toContain("2014, 9.2 CGPA (87.4 %)");
    expect(text).not.toContain("2016–2020, 8.32 DGPA");
    expect(text).toContain("Major: Computer Science and Engineering");
    expect(text).toContain("Subjects: ENG, PHY, CHEM, MATH, CS(C++)");
    expect(text).not.toContain("Major: CSE");
    expect(text).not.toContain(
      "Subjects: English, Physics, Chemistry, Mathematics, Computer Science",
    );
    expect(text).not.toContain("Subjects: General Education");
    expect(text).not.toContain("General Education");
    expect(text).toContain("84 %");
    expect(text).toContain("87.4 %");
    expect(text).not.toContain("84.00");
    expect(text).not.toContain("87.40");
    expect(text).not.toContain(
      "Sainik School Purulia (Central Board of Secondary Education)",
    );
    expect(text).toContain("Experience:");
    expect(text).toContain("Skills:");
    expect(text).toContain("Programming:");
    expect(text).toContain("@ CorpDK,");
    expect(text).toContain("@ Infosys,");
    expect(text).toContain("@ Wipro,");
    expect(text).toContain("Independent Contractor");
    expect(text).toContain("January 2025 – August 2026");
    expect(text).toContain("August 2026 – Present");
    expect(text).not.toContain("Wipro Limited");
    expect(text).toContain("Bengaluru, KN, India");
    expect(text).toContain("Kolkata, WB, India");
    expect(text).not.toContain("Karnataka");
    expect(text).toContain("Developer | Learner | Full Stack | Linux | Open Source");
    expect(text).toContain("cv.corpdk.com");
    expect(text).toContain("https://cv.corpdk.com");
    expect(text).toMatch(
      /Developer \| Learner \| Full Stack \| Linux \| Open Source[\s\S]*cv\.corpdk\.com/,
    );
    expect(text).toContain("Kolkata, West Bengal, India");
    expect(text).not.toContain("Ghosh");
    expect(text).not.toContain("16/5");
    expect(text).toContain("Technologies used:");
    expect(text).toContain("Serverless Framework");
    expect(text).toContain("GitHub Actions");
    expect(text).toContain("AWS Lambda");
    expect(text).toContain("Amazon API Gateway");
    expect(text).toContain("Amazon Route53");
    expect(text).toContain("Amazon Aurora");
    expect(text).toContain("Amazon ECS");
    expect(text).toContain("Amazon Web Services");
    expect(text).toContain("January 2025");
    expect(text).toContain("Present");
    expect(text).not.toContain("PRESENT");
    expect(text).not.toContain("Jan 2025");
    expect(text).toContain("I want to think with a pencil");
    expect(text).not.toContain("Rust");
    expect(text).not.toContain("7980014080");
    expect(text).not.toContain("kundudebraj4272@gmail.com");
    expect(text).toContain("GHA");
    expect(text).not.toMatch(/GHA\|/);
    const tools = model.skillGroups.find((group) => group.type === "Tool");
    expect(tools?.labels.at(-1)).toBe("GHA");
    expect(tools?.labels.join(", ")).not.toContain("|");
  } finally {
    vi.useRealTimers();
  }
}, 20_000);

test("PDF columns leave a 12pt gutter so experience cannot collide with skills", () => {
  expect(cvPdfLayout.columnGutter).toBe(12);
  expect(cvPdfLayout.sidebarWidth).toBe(160);
  expect(
    cvPdfLayout.mainWidth +
      cvPdfLayout.columnGutter +
      cvPdfLayout.sidebarWidth,
  ).toBeCloseTo(cvPdfLayout.contentWidth);
  expect(cvPdfLayout.mainWidth).toBeLessThan(346);
  expect(cvPdfLayout.mainWidth).toBeGreaterThan(300);
});

test("PDF education entries are spaced apart and skill groups stay tight without collapsing line-height", () => {
  expect(cvPdfLayout.educationRecordMarginBottom).toBe(9);
  expect(cvPdfLayout.skillGroupMarginBottom).toBe(4);
  expect(cvPdfLayout.skillLabelsLineHeight).toBe(1.45);
});
