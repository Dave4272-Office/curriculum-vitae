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
  vi.setSystemTime(new Date("2026-08-25T12:00:00+05:30"));

  try {
    const pdf = await renderCvPdf();
    const bytes = Buffer.from(pdf);

    expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
    expect(pdfPageCount(bytes)).toBeLessThanOrEqual(2);
    expect(bytes.toString("latin1")).toContain("LiberationSans");

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
    expect(text).toContain("Experience:");
    expect(text).toContain("Skills:");
    expect(text).toContain("Programming:");
    expect(text).toContain("@ Infosys,");
    expect(text).toContain("Technologies used:");
    expect(text).toContain("I want to think with a pencil");
    expect(text).not.toContain("Rust");
    expect(text).not.toContain("7980014080");
    expect(text).not.toContain("kundudebraj4272@gmail.com");
  } finally {
    vi.useRealTimers();
  }
}, 20_000);
