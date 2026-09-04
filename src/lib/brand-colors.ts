import type { CSSProperties } from "react";
import type { SocialIcon } from "./types";

/**
 * Official brand hex values for site social glyphs.
 *
 * Sourced from Simple Icons (`hex` on each slug; v15 unless noted). Icons
 * Simple Icons dropped for trademark reasons keep the last published hex.
 */
export const socialBrandColors = {
  pdf: "#EC1C24", // Simple Icons 13 `adobeacrobatreader` (later removed)
  twitter: "#1DA1F2", // Simple Icons 8 `twitter` (bird glyph; `x` is #000000)
  linkedin: "#0A66C2",
  instagram: "#FF0069",
  github: "#181717",
  keybase: "#33A0FF",
  tryhackme: "#212C42",
} as const satisfies Record<SocialIcon, `#${string}`>;

const darkPageBg = "#141210";
const darkPageFg = "#f0ebe3";

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  const r = channel((n >> 16) & 255);
  const g = channel((n >> 8) & 255);
  const b = channel(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hexA: string, hexB: string): number {
  const left = relativeLuminance(hexA);
  const right = relativeLuminance(hexB);
  const [hi, lo] = left > right ? [left, right] : [right, left];
  return (hi + 0.05) / (lo + 0.05);
}

/** Keep official hex in dark mode unless it would disappear on the dark page. */
export function readableOnDark(hex: string): string {
  return contrastRatio(hex, darkPageBg) < 3 ? darkPageFg : hex;
}

export function brandColorVars(hex: string): CSSProperties {
  return {
    "--brand-color": hex,
    "--brand-color-dark": readableOnDark(hex),
  } as CSSProperties;
}

export function socialBrandColor(icon: SocialIcon): string {
  return socialBrandColors[icon];
}
