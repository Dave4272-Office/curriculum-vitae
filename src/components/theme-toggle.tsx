"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

function subscribe() {
  return () => undefined;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const active = mounted ? (theme ?? "system") : "system";

  return (
    <fieldset className="theme-toggle">
      <legend>Color theme</legend>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="theme-toggle__btn"
          aria-pressed={active === option.value}
          onClick={() => setTheme(option.value)}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}
