/** @vitest-environment node */

import { inflateSync } from "node:zlib";
import { expect, test, vi } from "vitest";
import { getEducation, getExperience } from "../lib/content";
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

function decodeHexStrings(content: string): string {
  return [...content.matchAll(/<([0-9a-fA-F]+)>/g)]
    .map((match) => Buffer.from(match[1], "hex").toString("latin1"))
    .join("");
}

function pdfPlainText(pdf: Buffer): string {
  const latin = pdf.toString("latin1");
  const chunks: string[] = [latin];
  for (const match of latin.matchAll(/stream\r?\n([\s\S]*?)endstream/g)) {
    const content = decodeStream(match[1]);
    chunks.push(content, decodeHexStrings(content));
  }
  return chunks.join("\n");
}

test("rendered PDF includes current titles and employers from content", async () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-25T12:00:00+05:30"));

  try {
    const pdf = await renderCvPdf();
    const bytes = Buffer.from(pdf);

    expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
    expect(pdfPageCount(bytes)).toBeLessThanOrEqual(2);

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
    expect(text).toContain("I want to think with a pencil");
    expect(text).not.toContain("Rust");
  } finally {
    vi.useRealTimers();
  }
}, 20_000);
