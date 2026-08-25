import { expect, test } from "vitest";
import { getEducation, getSkillGroups } from "./content";
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
