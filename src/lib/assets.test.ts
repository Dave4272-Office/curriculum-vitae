import { expect, test } from "vitest";
import { publicAsset } from "./assets";

test("publicAsset prefixes JSON logo paths", () => {
  expect(publicAsset("static/logos/third-party/Infosys.svg")).toBe(
    "/static/logos/third-party/Infosys.svg",
  );
  expect(publicAsset("/already/rooted.png")).toBe("/already/rooted.png");
  expect(publicAsset("")).toBe("");
});
