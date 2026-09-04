import { expect, test } from "vitest";
import skillJson from "../../public/static/data/skill.list.json";
import { resolveSkillIcon } from "./skill-icons";
import type { TechSkill } from "./types";

const skills = skillJson as TechSkill[];

test("resolves catalog icon ids to a pictogram and brand hex", () => {
  const python = resolveSkillIcon("FaPython", "Python");
  expect(typeof python.Icon).toBe("function");
  expect(python.color).toBe("#3776AB");

  const vscode = resolveSkillIcon("SiVisualstudiocode", "VS Code");
  expect(typeof vscode.Icon).toBe("function");
  expect(vscode.color).toBe("#007ACC");
});

test("every catalog skill icon has a pictogram and Simple Icons brand hex", () => {
  for (const skill of skills) {
    const mark = resolveSkillIcon(skill.icon, skill.label);
    expect(typeof mark.Icon, `${skill.icon} (${skill.label})`).toBe("function");
    expect(mark.color, `${skill.icon} (${skill.label})`).toMatch(
      /^#[0-9A-F]{6}$/,
    );
  }
});

test("spot-check recognizable skill brands", () => {
  expect(resolveSkillIcon("FaJs", "JavaScript").color).toBe("#F7DF1E");
  expect(resolveSkillIcon("FaReact", "React").color).toBe("#61DAFB");
  expect(resolveSkillIcon("FaDocker", "Docker").color).toBe("#2496ED");
  expect(resolveSkillIcon("FaAws", "Amazon Web Services").color).toBe("#FF9900");
  expect(resolveSkillIcon("SiTypescript", "TypeScript").color).toBe("#3178C6");
});

test("missing icon keys fail with the catalog id and label", () => {
  expect(() => resolveSkillIcon("NotARealIcon", "Nope")).toThrow(
    'Missing skill icon "NotARealIcon" for "Nope"',
  );
});
