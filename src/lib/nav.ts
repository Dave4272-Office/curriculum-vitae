export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience", skipTarget: true, legacyPath: "/exp" },
  { id: "education", label: "Education", legacyPath: "/edu" },
  { id: "certifications", label: "Certifications", legacyPath: "/certs" },
  { id: "skills", label: "Skills", legacyPath: "/skills" },
  { id: "interests", label: "Interests", legacyPath: "/interests" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const sectionIds = Object.fromEntries(
  sections.map((section) => [section.id, section.id]),
) as { [K in SectionId]: K };

export const firstSectionId: SectionId = sections[0].id;

const skipSection = sections.find((section) => "skipTarget" in section);

export const skipToSectionId: SectionId = skipSection?.id ?? firstSectionId;
export const skipToHref = `#${skipToSectionId}`;

export const legacyRedirects = sections.flatMap((section) =>
  "legacyPath" in section && section.legacyPath
    ? [{ source: section.legacyPath, destination: `/#${section.id}` as const }]
    : [],
);

const HOLD_MS = 700;
const HASH_RETRY_MS = [80, 320] as const;
const TOP_SCROLL_Y = 16;
const SPY_OFFSET = 88;

export type SectionMeasure = {
  id: string;
  top: number;
};

export type NavHost = {
  getScrollY(): number;
  measureSections(): ReadonlyArray<SectionMeasure>;
  getHash(): string;
  setHash(id: string): void;
  scrollTo(id: string, instant: boolean): void;
  setTimeout(callback: () => void, ms: number): number;
  clearTimeout(id: number): void;
  onFontsReady(callback: () => void): void;
  addListener(
    event: "hashchange" | "scroll" | "scrollend" | "resize",
    handler: () => void,
  ): () => void;
  onActiveId(id: string): void;
};

function hashId(hash: string): string {
  return hash.replace(/^#/, "");
}

function activeSectionId(
  measured: ReadonlyArray<SectionMeasure>,
  scrollY: number,
): string {
  if (scrollY <= TOP_SCROLL_Y) {
    return firstSectionId;
  }

  let current: string = firstSectionId;
  for (const section of measured) {
    if (section.id === firstSectionId) {
      continue;
    }
    if (section.top <= SPY_OFFSET) {
      current = section.id;
    }
  }
  return current;
}

export function connectSectionNav(host: NavHost): {
  jumpTo: (id: string) => void;
  disconnect: () => void;
} {
  let holding = false;
  let holdTimer = 0;
  const retryTimers: number[] = [];

  const sync = () => {
    if (holding) {
      return;
    }
    host.onActiveId(activeSectionId(host.measureSections(), host.getScrollY()));
  };

  const hold = (id: string, resyncOnRelease: boolean) => {
    holding = true;
    host.onActiveId(id);
    host.clearTimeout(holdTimer);
    holdTimer = host.setTimeout(() => {
      holding = false;
      if (resyncOnRelease) {
        sync();
      }
    }, HOLD_MS);
  };

  const applyHash = (instant: boolean) => {
    const id = hashId(host.getHash());
    if (id) {
      hold(id, true);
      host.scrollTo(id, instant);
      return;
    }
    sync();
  };

  const jumpTo = (id: string) => {
    host.setHash(id);
    hold(id, false);
    host.scrollTo(id, false);
  };

  applyHash(true);
  for (const ms of HASH_RETRY_MS) {
    retryTimers.push(host.setTimeout(() => applyHash(true), ms));
  }
  host.onFontsReady(() => applyHash(true));

  const stopListening = [
    host.addListener("hashchange", () => applyHash(false)),
    host.addListener("scroll", sync),
    host.addListener("scrollend", () => {
      holding = false;
      host.clearTimeout(holdTimer);
      sync();
    }),
    host.addListener("resize", sync),
  ];

  return {
    jumpTo,
    disconnect() {
      for (const timer of retryTimers) {
        host.clearTimeout(timer);
      }
      host.clearTimeout(holdTimer);
      for (const unsubscribe of stopListening) {
        unsubscribe();
      }
    },
  };
}

export function connectBrowserNav(onActiveId: (id: string) => void) {
  return connectSectionNav(browserNavHost(onActiveId));
}

function browserNavHost(onActiveId: (id: string) => void): NavHost {
  history.scrollRestoration = "manual";

  return {
    getScrollY: () => window.scrollY,
    measureSections: () =>
      sections.map((item) => ({
        id: item.id,
        top:
          document.getElementById(item.id)?.getBoundingClientRect().top ??
          Number.POSITIVE_INFINITY,
      })),
    getHash: () => window.location.hash,
    setHash: (id: string) => {
      window.history.pushState(null, "", `#${id}`);
    },
    scrollTo: (id: string, instant: boolean) => {
      const el = document.getElementById(id);
      if (!el) {
        return;
      }
      const reduce =
        instant ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    },
    setTimeout: (callback, ms) => window.setTimeout(callback, ms),
    clearTimeout: (id) => {
      window.clearTimeout(id);
    },
    onFontsReady: (callback) => {
      void document.fonts?.ready.then(callback);
    },
    addListener: (event, handler) => {
      const options = event === "scroll" ? { passive: true } : undefined;
      window.addEventListener(event, handler, options);
      return () => window.removeEventListener(event, handler);
    },
    onActiveId,
  };
}
