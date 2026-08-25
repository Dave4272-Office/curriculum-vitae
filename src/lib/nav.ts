export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience", skipTarget: true },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "skills", label: "Skills" },
  { id: "interests", label: "Interests" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const sectionIds = Object.fromEntries(
  sections.map((section) => [section.id, section.id]),
) as { [K in SectionId]: K };

export const firstSectionId: SectionId = sections[0].id;

const skipSection = sections.find((section) => "skipTarget" in section);

export const skipToSectionId: SectionId = skipSection?.id ?? firstSectionId;
export const skipToHref = `#${skipToSectionId}`;

const HOLD_MS = 700;
const HASH_RETRY_MS = [80, 320] as const;
const TOP_SCROLL_Y = 16;
const SPY_OFFSET = 96;
export const backToTopAfterY = 160;

export function isAwayFromTop(scrollY: number): boolean {
  return scrollY > backToTopAfterY;
}

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
  onAwayFromTop?(away: boolean): void;
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
  jumpToTop: () => void;
  disconnect: () => void;
} {
  let holding = false;
  let holdTimer = 0;
  const retryTimers: number[] = [];

  const reportAway = () => {
    host.onAwayFromTop?.(isAwayFromTop(host.getScrollY()));
  };

  const sync = () => {
    reportAway();
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
      reportAway();
      return;
    }
    sync();
  };

  const jumpTo = (id: string) => {
    host.setHash(id);
    hold(id, false);
    host.scrollTo(id, false);
  };

  const jumpToTop = () => jumpTo(firstSectionId);

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
    jumpToTop,
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

export function connectBrowserNav(
  onActiveId: (id: string) => void,
  onAwayFromTop?: (away: boolean) => void,
) {
  return connectSectionNav(browserNavHost(onActiveId, onAwayFromTop));
}

function prefersReducedMotion(instant: boolean): boolean {
  return (
    instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function browserNavHost(
  onActiveId: (id: string) => void,
  onAwayFromTop?: (away: boolean) => void,
): NavHost {
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
      const reduce = prefersReducedMotion(instant);
      if (id === firstSectionId) {
        const html = document.documentElement;
        if (reduce) {
          const previous = html.style.scrollBehavior;
          html.style.scrollBehavior = "auto";
          window.scrollTo(0, 0);
          html.style.scrollBehavior = previous;
          return;
        }
        window.scrollTo(0, 0);
        return;
      }
      const el = document.getElementById(id);
      if (!el) {
        return;
      }
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
    onAwayFromTop,
  };
}
