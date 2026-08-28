"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

type ThemeValue = (typeof options)[number]["value"];

function subscribe() {
  return () => undefined;
}

function ThemeIcon({ value }: Readonly<{ value: ThemeValue }>) {
  if (value === "light") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
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
          d="M12 4.25v1.5M12 18.25v1.5M4.25 12h1.5M18.25 12h1.5M6.58 6.58l1.06 1.06M16.36 16.36l1.06 1.06M6.58 17.42l1.06-1.06M16.36 7.64l1.06-1.06"
        />
      </svg>
    );
  }

  if (value === "dark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M16.65 13.35A6.35 6.35 0 0 1 10.4 6.4 6.5 6.5 0 1 0 17.7 14.85a6.1 6.1 0 0 1-1.05-1.5z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="3.75"
        y="4.75"
        width="16.5"
        height="11"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        d="M8 19.25h8M12 15.75v3.5"
      />
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
      aria-label={`Theme: ${current.label} (click to switch)`}
      onClick={() => setTheme(next.value)}
    >
      <ThemeIcon value={current.value} />
    </button>
  );
}
