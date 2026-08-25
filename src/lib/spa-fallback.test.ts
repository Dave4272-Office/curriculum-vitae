import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";
import nextConfig from "../../next.config";
import {
  isFrameworkOrPublicAsset,
  isUnknownPagePath,
  spaFallbackHref,
} from "./spa-fallback";

test("unknown page paths redirect to the SPA top, not a section hash", () => {
  expect(spaFallbackHref).toBe("/");

  for (const path of ["/exp", "/edu", "/foo", "/certs", "/skills", "/interests"]) {
    expect(isUnknownPagePath(path)).toBe(true);
    expect(isFrameworkOrPublicAsset(path)).toBe(false);
  }
});

test("Next internals and public files are assets, not SPA fallbacks", () => {
  const assets = [
    "/_next/static/chunks/app.js",
    "/_next/image",
    "/static/data/work.list.json",
    "/static/logos/third-party/Infosys.svg",
    "/favicon.ico",
    "/manifest.json",
    "/robots.txt",
    "/profile-dave.jpg",
    "/logo192.png",
    "/logo512.png",
  ];

  for (const path of assets) {
    expect(isFrameworkOrPublicAsset(path)).toBe(true);
    expect(isUnknownPagePath(path)).toBe(false);
  }

  expect(isUnknownPagePath("/")).toBe(false);
});

test("public files exist on disk so the host can serve them", () => {
  const publicRoot = join(process.cwd(), "public");
  const files = collectFiles(publicRoot);

  expect(files).toEqual(
    expect.arrayContaining([
      "favicon.ico",
      "logo192.png",
      "logo512.png",
      "manifest.json",
      "profile-dave.jpg",
      "robots.txt",
      "static/data/work.list.json",
      "static/data/edu.list.json",
      "static/data/cert.list.json",
      "static/data/skill.list.json",
      "static/data/lang.list.json",
      "static/logos/third-party/Infosys.svg",
      "static/logos/third-party/Wipro.svg",
    ]),
  );

  for (const file of files) {
    expect(isFrameworkOrPublicAsset(`/${file}`)).toBe(true);
  }
});

test("next.config does not steal public assets with a catch-all redirect", async () => {
  const redirects = nextConfig.redirects ? await nextConfig.redirects() : [];
  expect(redirects).toEqual([]);
});

function collectFiles(root: string, prefix = ""): string[] {
  return readdirSync(join(root, prefix)).flatMap((name) => {
    const relative = prefix ? `${prefix}/${name}` : name;
    return statSync(join(root, relative)).isDirectory()
      ? collectFiles(root, relative)
      : [relative];
  });
}
