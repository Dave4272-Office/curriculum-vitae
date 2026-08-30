import { brandColorVars } from "../lib/brand-colors";
import type { SkillEntry } from "../lib/content";

/** Flat-top hex, inset so the stroke stays inside the viewBox. */
const HEX_POINTS = "25,0.8 75,0.8 99.2,43.3 75,85.8 25,85.8 0.8,43.3";

type SkillHoneycombProps = {
  skills: readonly SkillEntry[];
};

export function SkillHoneycomb({ skills }: Readonly<SkillHoneycombProps>) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <div className="skill-honeycomb" aria-hidden="true">
      {skills.map((skill) => {
        const Icon = skill.Icon;
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
            />
          </div>
        );
      })}
    </div>
  );
}
