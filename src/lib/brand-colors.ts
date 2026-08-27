import type { CSSProperties } from "react";
import type { SocialIcon } from "./types";

/**
 * Official brand hex values for site skill and social glyphs.
 *
 * Sourced from Simple Icons (`hex` on each slug; v15 unless noted). Icons
 * Simple Icons dropped for trademark reasons keep the last published hex.
 * `FaAws` uses Amazon orange so the smile glyph matches the brand, not the
 * navy AWS wordmark.
 */
export const skillBrandColors = {
  FaPython: "#3776AB",
  FaJava: "#007396", // Simple Icons 5 `java` (later removed)
  CgCPlusPlus: "#00599C",
  SiC: "#A8B9CC",
  SiGnubash: "#4EAA25",
  FaJs: "#F7DF1E",
  SiTypescript: "#3178C6",
  SiKotlin: "#7F52FF",
  SiGo: "#00ADD8",
  FaRust: "#000000",
  FaPhp: "#777BB4",
  FaHtml5: "#E34F26",
  FaCss3: "#1572B6", // Simple Icons `css3` (replaced by `css` #663399)
  FaSass: "#CC6699",
  FaMarkdown: "#000000",
  SiSpring: "#6DB33F",
  SiSpringboot: "#6DB33F",
  FaReact: "#61DAFB",
  FaAngular: "#DD0031", // shield glyph; current Simple Icons Angular is #0F0F11
  FaNodeJs: "#5FA04E",
  SiExpress: "#000000",
  SiTerraform: "#844FBA",
  SiServerless: "#FD5750",
  SiJquery: "#0769AD",
  FaBootstrap: "#7952B3",
  FaWordpress: "#21759B",
  SiHibernate: "#59666C",
  SiScikitlearn: "#F7931E",
  GrMysql: "#4479A1",
  SiOracle: "#F80000",
  SiMongodb: "#47A248",
  SiRedis: "#FF4438",
  FaGitAlt: "#F05032",
  FaDocker: "#2496ED",
  SiKubernetes: "#326CE5",
  SiNpm: "#CB3837",
  FaYarn: "#2C8EBB",
  FaJenkins: "#D24939",
  SiGithubactions: "#2088FF",
  FaAndroid: "#3DDC84",
  FaAws: "#FF9900", // Amazon orange; Simple Icons `amazonaws` is #232F3E
  SiCloudfoundry: "#0C9ED5",
  FaLinux: "#FCC624",
  SiJupyter: "#F37626",
  SiVisualstudiocode: "#007ACC", // Simple Icons 9 `visualstudiocode` (later removed)
} as const satisfies Record<string, `#${string}`>;

export const socialBrandColors: Partial<Record<SocialIcon, `#${string}`>> = {
  twitter: "#1DA1F2", // Simple Icons 8 `twitter` (bird glyph; `x` is #000000)
  linkedin: "#0A66C2",
  instagram: "#FF0069",
  github: "#181717",
  keybase: "#33A0FF",
  tryhackme: "#212C42",
};

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

export function skillBrandColor(icon: string): string | undefined {
  return skillBrandColors[icon as keyof typeof skillBrandColors];
}

export function socialBrandColor(icon: SocialIcon): string | undefined {
  return socialBrandColors[icon];
}
