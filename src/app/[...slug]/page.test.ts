import { expect, test, vi } from "vitest";
import { permanentRedirect } from "next/navigation";
import { spaFallbackHref } from "../../lib/spa-fallback";
import UnknownPathPage from "./page";

vi.mock("next/navigation", () => ({
  permanentRedirect: vi.fn(),
}));

test("the catch-all page permanently redirects to the SPA top", () => {
  UnknownPathPage();
  expect(permanentRedirect).toHaveBeenCalledWith(spaFallbackHref);
  expect(spaFallbackHref).toBe("/");
});
