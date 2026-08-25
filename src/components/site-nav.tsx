"use client";

import { useEffect, useRef, useState } from "react";
import {
  connectBrowserNav,
  firstSectionId,
  sections,
} from "../lib/nav";

export function SiteNav() {
  const [activeId, setActiveId] = useState<string>(firstSectionId);
  const [awayFromTop, setAwayFromTop] = useState(false);
  const jumpTo = useRef<(id: string) => void>(() => undefined);
  const jumpToTop = useRef<() => void>(() => undefined);

  useEffect(() => {
    const nav = connectBrowserNav(setActiveId, setAwayFromTop);
    jumpTo.current = nav.jumpTo;
    jumpToTop.current = nav.jumpToTop;
    return () => {
      nav.disconnect();
      jumpTo.current = () => undefined;
      jumpToTop.current = () => undefined;
    };
  }, []);

  return (
    <div className="site-nav-wrap">
      <nav className="site-nav" aria-label="On this page">
        <ol>
          {sections.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  jumpTo.current(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <button
        type="button"
        className="back-to-top"
        hidden={!awayFromTop}
        aria-label="Back to top"
        onClick={(event) => {
          event.currentTarget.blur();
          jumpToTop.current();
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M6 14.5 12 8.5l6 6"
          />
        </svg>
      </button>
    </div>
  );
}
