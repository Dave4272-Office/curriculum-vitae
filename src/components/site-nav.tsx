"use client";

import { useEffect, useRef, useState } from "react";
import { sectionNav } from "../lib/nav";
import { activeSectionId } from "../lib/scroll-spy";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToId(id: string, instant = false) {
  const el = document.getElementById(id);
  if (!el) {
    return;
  }
  const reduce = instant || prefersReducedMotion();
  el.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
}

function measureSections() {
  return sectionNav.map((item) => {
    const el = document.getElementById(item.id);
    return {
      id: item.id,
      top: el?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY,
    };
  });
}

export function SiteNav() {
  const [activeId, setActiveId] = useState<string>("about");
  const holdRef = useRef(false);
  const holdTimer = useRef<number>(0);

  useEffect(() => {
    history.scrollRestoration = "manual";

    const syncActive = () => {
      if (holdRef.current) {
        return;
      }
      setActiveId(activeSectionId(measureSections(), window.scrollY));
    };

    const hold = (id: string) => {
      holdRef.current = true;
      setActiveId(id);
      window.clearTimeout(holdTimer.current);
      holdTimer.current = window.setTimeout(() => {
        holdRef.current = false;
        syncActive();
      }, 700);
    };

    const jump = (instant = true) => {
      const id = window.location.hash.replace(/^#/, "");
      if (id) {
        hold(id);
        scrollToId(id, instant);
      } else {
        syncActive();
      }
    };

    jump(true);
    const t1 = window.setTimeout(() => jump(true), 80);
    const t2 = window.setTimeout(() => jump(true), 320);
    void document.fonts?.ready.then(() => jump(true));
    const onHash = () => jump(false);
    const onScrollEnd = () => {
      holdRef.current = false;
      window.clearTimeout(holdTimer.current);
      syncActive();
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", syncActive);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(holdTimer.current);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", syncActive);
    };
  }, []);

  return (
    <nav className="site-nav" aria-label="On this page">
      <ol>
        {sectionNav.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "true" : undefined}
              onClick={(event) => {
                event.preventDefault();
                window.history.pushState(null, "", `#${item.id}`);
                holdRef.current = true;
                setActiveId(item.id);
                window.clearTimeout(holdTimer.current);
                holdTimer.current = window.setTimeout(() => {
                  holdRef.current = false;
                }, 700);
                scrollToId(item.id);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
