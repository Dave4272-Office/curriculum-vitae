"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

type ThemeValue = (typeof options)[number]["value"];

const sunRaysPath =
  "M12 4.25v1.5M12 18.25v1.5M4.25 12h1.5M18.25 12h1.5M6.58 6.58l1.06 1.06M16.36 16.36l1.06 1.06M6.58 17.42l1.06-1.06M16.36 7.64l1.06-1.06";
const moonPath =
  "M16.65 13.35A6.35 6.35 0 0 1 10.4 6.4 6.5 6.5 0 1 0 17.7 14.85a6.1 6.1 0 0 1-1.05-1.5z";

function subscribe() {
  return () => undefined;
}

function SunGlyph() {
  return (
    <>
      <circle
        cx="12"
        cy="12"
        r="3.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
        d={sunRaysPath}
      />
    </>
  );
}

function MoonGlyph() {
  return (
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      d={moonPath}
    />
  );
}

function ThemeIcon({ value }: Readonly<{ value: ThemeValue }>) {
  if (value === "light") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <SunGlyph />
      </svg>
    );
  }

  if (value === "dark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <MoonGlyph />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="theme-system-sun">
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
        <clipPath id="theme-system-moon">
          <rect x="12" y="0" width="12" height="24" />
        </clipPath>
      </defs>
      <g clipPath="url(#theme-system-sun)">
        <g transform="translate(-2 0)">
          <SunGlyph />
        </g>
      </g>
      <g clipPath="url(#theme-system-moon)">
        <g transform="translate(2.25 0)">
          <MoonGlyph />
        </g>
      </g>
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const selected =
    options.find((option) => option.value === theme) ?? options[2];
  const current = mounted ? selected : options[2];
  const next =
    options[(options.indexOf(current) + 1) % options.length] ?? options[0];

  return (
    <button
      type="button"
      className="theme-toggle"
      title={current.label}
      aria-label={`Theme: ${current.label} (click to switch)`}
      onClick={() => setTheme(next.value)}
    >
      <ThemeIcon value={current.value} />
    </button>
  );
}
