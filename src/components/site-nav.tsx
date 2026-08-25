"use client";

import { useEffect, useRef, useState } from "react";
import {
  connectBrowserNav,
  firstSectionId,
  sections,
} from "../lib/nav";

export function SiteNav() {
  const [activeId, setActiveId] = useState<string>(firstSectionId);
  const jumpTo = useRef<(id: string) => void>(() => undefined);

  useEffect(() => {
    const nav = connectBrowserNav(setActiveId);
    jumpTo.current = nav.jumpTo;
    return () => {
      nav.disconnect();
      jumpTo.current = () => undefined;
    };
  }, []);

  return (
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
  );
}
