"use client";

import { useState, useSyncExternalStore } from "react";
import { brandColorVars } from "../lib/brand-colors";
import type { HoneycombSkill } from "../lib/content";
import { resolveSkillIcon } from "../lib/skill-icons";
import { shuffle } from "../lib/shuffle";

/** Flat-top hex, inset so the stroke stays inside the viewBox. */
const HEX_POINTS = "25,0.8 75,0.8 99.2,43.3 75,85.8 25,85.8 0.8,43.3";

type SkillHoneycombProps = {
  skills: readonly HoneycombSkill[];
};

function subscribe() {
  return () => undefined;
}

export function SkillHoneycomb({ skills }: Readonly<SkillHoneycombProps>) {
  // Same client-only snapshot as ThemeToggle: SSR and hydration stay empty.
  // The first client render then keeps one Fisher–Yates order in state.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [ordered, setOrdered] = useState<readonly HoneycombSkill[] | null>(
    null,
  );

  if (mounted && ordered === null && skills.length > 0) {
    setOrdered(shuffle(skills));
  }

  if (ordered === null || ordered.length === 0) {
    return null;
  }

  return (
    <div className="skill-honeycomb" aria-hidden="true">
      {ordered.map((skill) => {
        const Icon = resolveSkillIcon(skill.icon, skill.label);
        return (
          <div key={skill.label} className="skill-honeycomb__cell">
            <svg
              className="skill-honeycomb__stroke"
              viewBox="0 0 100 86.6"
              aria-hidden="true"
              focusable="false"
            >
              <polygon
                points={HEX_POINTS}
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
            <Icon
              className="skill-honeycomb__icon"
              style={brandColorVars(skill.color)}
              preserveAspectRatio="xMidYMid meet"
            />
          </div>
        );
      })}
    </div>
  );
}
