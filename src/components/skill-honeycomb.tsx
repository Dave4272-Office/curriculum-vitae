"use client";

import type { CSSProperties } from "react";
import { useState, useSyncExternalStore } from "react";
import { brandColorVars } from "../lib/brand-colors";
import type { HoneycombSkill } from "../lib/content";
import { resolveSkillIcon } from "../lib/skill-icons";
import { shuffle, type Shuffle } from "../lib/shuffle";

/** Flat-top hex, inset so the stroke stays inside the viewBox. */
const HEX_POINTS = "25,0.8 75,0.8 99.2,43.3 75,85.8 25,85.8 0.8,43.3";

/** Packed column count. Stagger even-looking cells in columns 2 and 4 (0-based 1 and 3). */
export const HEX_COLS = 5;

type SkillHoneycombProps = {
  skills: readonly HoneycombSkill[];
  shuffle?: Shuffle;
};

function subscribe() {
  return () => undefined;
}

function isStaggeredColumn(index: number): boolean {
  const col = index % HEX_COLS;
  return col === 1 || col === 3;
}

export function SkillHoneycomb({
  skills,
  shuffle: shuffleItems = shuffle,
}: Readonly<SkillHoneycombProps>) {
  // Same client-only snapshot as ThemeToggle: SSR and hydration stay empty.
  // The first client render then keeps one Fisher–Yates order in state.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [ordered, setOrdered] = useState<readonly HoneycombSkill[] | null>(
    null,
  );

  if (mounted && ordered === null && skills.length > 0) {
    setOrdered(shuffleItems(skills));
  }

  if (ordered === null || ordered.length === 0) {
    return null;
  }

  return (
    <div
      className="skill-honeycomb"
      aria-hidden="true"
      style={{ "--hex-cols": HEX_COLS } as CSSProperties}
    >
      {ordered.map((skill, index) => {
        const { Icon } = resolveSkillIcon(skill.icon, skill.label);
        return (
          <div
            key={skill.label}
            className={
              isStaggeredColumn(index)
                ? "skill-honeycomb__cell skill-honeycomb__cell--stagger"
                : "skill-honeycomb__cell"
            }
          >
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
