import { expect, test } from "vitest";
import { resolveSkillIcon } from "./skill-icons";

test("resolves catalog icon ids to components", () => {
  expect(typeof resolveSkillIcon("FaPython", "Python")).toBe("function");
  expect(typeof resolveSkillIcon("SiVisualstudiocode", "VS Code")).toBe(
    "function",
  );
});

test("missing icon keys fail with the catalog id and label", () => {
  expect(() => resolveSkillIcon("NotARealIcon", "Nope")).toThrow(
    'Missing skill icon "NotARealIcon" for "Nope"',
  );
});
