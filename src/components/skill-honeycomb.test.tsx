import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { getSkillGroups } from "../lib/content";
import { HEX_COLS, SkillHoneycomb } from "./skill-honeycomb";

test("shuffle adapter is the mount-time cell order", () => {
  const skills = getSkillGroups()
    .flatMap((group) => group.items)
    .map(({ label, icon, color }) => ({ label, icon, color }));
  const reversed = [...skills].reverse();

  const { container } = render(
    <SkillHoneycomb skills={skills} shuffle={(items) => [...items].reverse()} />,
  );
  const cells = [
    ...(container.querySelectorAll(".skill-honeycomb__cell") ?? []),
  ];

  expect(HEX_COLS).toBe(5);
  expect(cells).toHaveLength(skills.length);
  expect(cells[0]?.querySelector(".skill-honeycomb__icon")).toBeTruthy();
  expect(reversed[0]?.label).toBe(skills.at(-1)?.label);
  expect(
    container.querySelector(".skill-honeycomb")?.getAttribute("style"),
  ).toContain(`--hex-cols: ${HEX_COLS}`);
  expect(cells[1]?.className).toContain("skill-honeycomb__cell--stagger");
  expect(cells[3]?.className).toContain("skill-honeycomb__cell--stagger");
  expect(cells[0]?.className).not.toContain("skill-honeycomb__cell--stagger");
});
