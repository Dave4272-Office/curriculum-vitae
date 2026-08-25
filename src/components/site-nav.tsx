"use client";

import { useEffect } from "react";
import { sectionNav } from "../lib/nav";

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

export function SiteNav() {
  useEffect(() => {
    history.scrollRestoration = "manual";

    const jump = (instant = true) => {
      const id = window.location.hash.replace(/^#/, "");
      if (id) {
        scrollToId(id, instant);
      }
    };

    jump(true);
    const t1 = window.setTimeout(() => jump(true), 80);
    const t2 = window.setTimeout(() => jump(true), 320);
    void document.fonts?.ready.then(() => jump(true));
    const onHash = () => jump(false);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return (
    <nav className="site-nav" aria-label="On this page">
      <ol>
        {sectionNav.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                window.history.pushState(null, "", `#${item.id}`);
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
