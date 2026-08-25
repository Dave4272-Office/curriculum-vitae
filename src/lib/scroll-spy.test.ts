import { expect, test } from "vitest";
import { publicAsset } from "./assets";
import { activeSectionId } from "./scroll-spy";

const sections = [
  { id: "about", top: 80 },
  { id: "experience", top: 90 },
  { id: "education", top: 800 },
  { id: "certifications", top: 1200 },
  { id: "skills", top: 1600 },
  { id: "interests", top: 2000 },
];

test("publicAsset prefixes JSON logo paths", () => {
  expect(publicAsset("static/logos/third-party/Infosys.svg")).toBe(
    "/static/logos/third-party/Infosys.svg",
  );
  expect(publicAsset("/already/rooted.png")).toBe("/already/rooted.png");
  expect(publicAsset("")).toBe("");
});

test("scroll spy stays on about at the top of the page", () => {
  expect(activeSectionId(sections, 0)).toBe("about");
  expect(activeSectionId(sections, 16)).toBe("about");
});

test("scroll spy follows the last section past the spy line", () => {
  expect(
    activeSectionId(
      [
        { id: "about", top: 80 },
        { id: "experience", top: 40 },
        { id: "education", top: 700 },
      ],
      200,
    ),
  ).toBe("experience");

  expect(
    activeSectionId(
      [
        { id: "about", top: 80 },
        { id: "experience", top: -400 },
        { id: "education", top: 20 },
        { id: "certifications", top: 900 },
      ],
      640,
    ),
  ).toBe("education");
});

test("short sections after a jump stay on the heading you opened", () => {
  expect(
    activeSectionId(
      [
        { id: "about", top: 80 },
        { id: "experience", top: -900 },
        { id: "education", top: 24 },
        { id: "certifications", top: 220 },
      ],
      1800,
    ),
  ).toBe("education");
});
