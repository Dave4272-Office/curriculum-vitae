import { expect, test } from "vitest";
import skillJson from "../../public/static/data/skill.list.json";
import {
  brandColorVars,
  contrastRatio,
  readableOnDark,
  skillBrandColor,
  skillBrandColors,
  socialBrandColor,
  socialBrandColors,
} from "./brand-colors";
import type { TechSkill } from "./types";

const skills = skillJson as TechSkill[];

test("every catalog skill icon has a Simple Icons brand hex", () => {
  for (const skill of skills) {
    expect(
      skillBrandColor(skill.icon),
      `${skill.icon} (${skill.label})`,
    ).toMatch(/^#[0-9A-F]{6}$/);
  }
});

test("every social glyph has a Simple Icons brand hex", () => {
  expect(socialBrandColor("pdf")).toBe("#EC1C24");
  expect(socialBrandColor("twitter")).toBe("#1DA1F2");
  expect(socialBrandColor("linkedin")).toBe("#0A66C2");
  expect(socialBrandColor("instagram")).toBe("#FF0069");
  expect(socialBrandColor("github")).toBe("#181717");
  expect(socialBrandColor("keybase")).toBe("#33A0FF");
  expect(socialBrandColor("tryhackme")).toBe("#212C42");
  expect(socialBrandColors.pdf).toBe("#EC1C24");
});

test("dark-mode fallback only kicks in when official hex disappears", () => {
  expect(readableOnDark("#3776AB")).toBe("#3776AB");
  expect(readableOnDark("#61DAFB")).toBe("#61DAFB");
  expect(readableOnDark("#F7DF1E")).toBe("#F7DF1E");
  expect(readableOnDark("#FF9900")).toBe("#FF9900");
  expect(readableOnDark("#181717")).toBe("#f0ebe3");
  expect(readableOnDark("#000000")).toBe("#f0ebe3");
  expect(readableOnDark("#212C42")).toBe("#f0ebe3");
  expect(contrastRatio("#181717", "#141210")).toBeLessThan(3);
});

test("brand vars attach official hex to the icon, not a wrapper", () => {
  expect(brandColorVars("#61DAFB")).toEqual({
    "--brand-color": "#61DAFB",
    "--brand-color-dark": "#61DAFB",
  });
  expect(brandColorVars("#181717")).toEqual({
    "--brand-color": "#181717",
    "--brand-color-dark": "#f0ebe3",
  });
});

test("spot-check recognizable skill brands", () => {
  expect(skillBrandColors.FaPython).toBe("#3776AB");
  expect(skillBrandColors.FaJs).toBe("#F7DF1E");
  expect(skillBrandColors.FaReact).toBe("#61DAFB");
  expect(skillBrandColors.FaDocker).toBe("#2496ED");
  expect(skillBrandColors.FaAws).toBe("#FF9900");
  expect(skillBrandColors.SiTypescript).toBe("#3178C6");
});
