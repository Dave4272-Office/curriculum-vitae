import { expect, test, vi } from "vitest";
import {
  connectSectionNav,
  firstSectionId,
  legacyRedirects,
  sections,
  skipToHref,
  skipToSectionId,
  type NavHost,
  type SectionMeasure,
} from "./nav";

const defaultTops: SectionMeasure[] = [
  { id: "about", top: 80 },
  { id: "experience", top: 90 },
  { id: "education", top: 800 },
  { id: "certifications", top: 1200 },
  { id: "skills", top: 1600 },
  { id: "interests", top: 2000 },
];

function createFakeHost(init?: {
  hash?: string;
  scrollY?: number;
  tops?: SectionMeasure[];
}) {
  let scrollY = init?.scrollY ?? 0;
  let hash = init?.hash ?? "";
  let tops = init?.tops ?? defaultTops;
  let activeId: string = firstSectionId;
  const timers = new Map<number, { fn: () => void; ms: number }>();
  let nextTimer = 1;
  const listeners = new Map<string, Set<() => void>>();
  const fontsReady: Array<() => void> = [];
  const scrollTo = vi.fn();

  const host: NavHost = {
    getScrollY: () => scrollY,
    measureSections: () => tops,
    getHash: () => hash,
    setHash: (id) => {
      hash = `#${id}`;
    },
    scrollTo,
    setTimeout: (fn, ms) => {
      const id = nextTimer;
      nextTimer += 1;
      timers.set(id, { fn, ms });
      return id;
    },
    clearTimeout: (id) => {
      timers.delete(id);
    },
    onFontsReady: (callback) => {
      fontsReady.push(callback);
    },
    addListener: (event, handler) => {
      const set = listeners.get(event) ?? new Set();
      set.add(handler);
      listeners.set(event, set);
      return () => set.delete(handler);
    },
    onActiveId: (id) => {
      activeId = id;
    },
  };

  return {
    host,
    scrollTo,
    activeId: () => activeId,
    setScrollY: (value: number) => {
      scrollY = value;
    },
    setTops: (value: SectionMeasure[]) => {
      tops = value;
    },
    emit: (event: "hashchange" | "scroll" | "scrollend" | "resize") => {
      for (const handler of listeners.get(event) ?? []) {
        handler();
      }
    },
    fireFonts: () => {
      for (const callback of fontsReady) {
        callback();
      }
    },
    runTimers: (atMs?: number) => {
      for (const [id, timer] of [...timers]) {
        if (atMs === undefined || timer.ms <= atMs) {
          timers.delete(id);
          timer.fn();
        }
      }
    },
  };
}

test("one registry owns ids, labels, skip target, and legacy hashes", () => {
  expect(sections.map((section) => section.id)).toEqual([
    "about",
    "experience",
    "education",
    "certifications",
    "skills",
    "interests",
  ]);
  expect(firstSectionId).toBe("about");
  expect(skipToSectionId).toBe("experience");
  expect(skipToHref).toBe("#experience");
  expect(legacyRedirects).toEqual([
    { source: "/exp", destination: "/#experience" },
    { source: "/edu", destination: "/#education" },
    { source: "/certs", destination: "/#certifications" },
    { source: "/skills", destination: "/#skills" },
    { source: "/interests", destination: "/#interests" },
  ]);
});

test("scroll spy stays on about at the top of the page", () => {
  const fake = createFakeHost({ scrollY: 0 });
  connectSectionNav(fake.host);
  expect(fake.activeId()).toBe("about");

  fake.setScrollY(16);
  fake.emit("scroll");
  expect(fake.activeId()).toBe("about");
});

test("scroll spy follows the last section past the spy line", () => {
  const fake = createFakeHost({
    scrollY: 200,
    tops: [
      { id: "about", top: 80 },
      { id: "experience", top: 40 },
      { id: "education", top: 700 },
    ],
  });
  connectSectionNav(fake.host);
  expect(fake.activeId()).toBe("experience");

  fake.setScrollY(640);
  fake.setTops([
    { id: "about", top: 80 },
    { id: "experience", top: -400 },
    { id: "education", top: 20 },
    { id: "certifications", top: 900 },
  ]);
  fake.emit("scroll");
  expect(fake.activeId()).toBe("education");
});

test("short sections after a jump stay on the heading you opened", () => {
  const fake = createFakeHost({
    scrollY: 1800,
    tops: [
      { id: "about", top: 80 },
      { id: "experience", top: -900 },
      { id: "education", top: 24 },
      { id: "certifications", top: 220 },
    ],
  });
  connectSectionNav(fake.host);
  expect(fake.activeId()).toBe("education");
});

test("jump holds the chosen section until scroll is allowed again", () => {
  const fake = createFakeHost({
    scrollY: 200,
    tops: [
      { id: "about", top: 80 },
      { id: "experience", top: 40 },
      { id: "education", top: 700 },
    ],
  });
  const nav = connectSectionNav(fake.host);
  expect(fake.activeId()).toBe("experience");

  nav.jumpTo("education");
  expect(fake.activeId()).toBe("education");
  expect(fake.scrollTo).toHaveBeenCalledWith("education", false);

  fake.emit("scroll");
  expect(fake.activeId()).toBe("education");

  fake.runTimers(700);
  fake.emit("scroll");
  expect(fake.activeId()).toBe("experience");
});

test("hash on connect holds the fragment and retries after fonts", () => {
  const fake = createFakeHost({ hash: "#skills" });
  connectSectionNav(fake.host);

  expect(fake.activeId()).toBe("skills");
  expect(fake.scrollTo).toHaveBeenCalledWith("skills", true);

  fake.fireFonts();
  expect(fake.scrollTo).toHaveBeenLastCalledWith("skills", true);

  fake.runTimers(80);
  fake.runTimers(320);
  expect(fake.scrollTo.mock.calls.filter((call) => call[0] === "skills").length).toBe(
    4,
  );
});

test("hashchange jumps without the instant retry path", () => {
  const fake = createFakeHost();
  connectSectionNav(fake.host);
  fake.host.setHash("interests");
  fake.emit("hashchange");
  expect(fake.activeId()).toBe("interests");
  expect(fake.scrollTo).toHaveBeenCalledWith("interests", false);
});
