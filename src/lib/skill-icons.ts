import type { IconType } from "react-icons";
import { CgCPlusPlus } from "react-icons/cg";
import {
  FaAndroid,
  FaAngular,
  FaAws,
  FaBootstrap,
  FaCss3,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaJenkins,
  FaJs,
  FaLinux,
  FaMarkdown,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaRust,
  FaSass,
  FaWordpress,
  FaYarn,
} from "react-icons/fa";
import { GrMysql, GrOracle } from "react-icons/gr";
import {
  SiC,
  SiCloudfoundry,
  SiExpress,
  SiGithubactions,
  SiGnubash,
  SiGo,
  SiHibernate,
  SiJquery,
  SiJupyter,
  SiKotlin,
  SiKubernetes,
  SiMongodb,
  SiNpm,
  SiRedis,
  SiScikitlearn,
  SiServerless,
  SiSpring,
  SiSpringboot,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

/**
 * Skill icon registry: catalog id → pictogram + official brand hex.
 *
 * Hex values are sourced from Simple Icons (`hex` on each slug; v15 unless
 * noted). Icons Simple Icons dropped for trademark reasons keep the last
 * published hex. `FaAws` uses Amazon orange so the smile glyph matches the
 * brand, not the navy AWS wordmark.
 */
const skillIcons = {
  FaPython: { Icon: FaPython, color: "#3776AB" },
  FaJava: { Icon: FaJava, color: "#007396" }, // Simple Icons 5 `java` (later removed)
  CgCPlusPlus: { Icon: CgCPlusPlus, color: "#00599C" },
  SiC: { Icon: SiC, color: "#A8B9CC" },
  SiGnubash: { Icon: SiGnubash, color: "#4EAA25" },
  FaJs: { Icon: FaJs, color: "#F7DF1E" },
  SiTypescript: { Icon: SiTypescript, color: "#3178C6" },
  SiKotlin: { Icon: SiKotlin, color: "#7F52FF" },
  SiGo: { Icon: SiGo, color: "#00ADD8" },
  FaRust: { Icon: FaRust, color: "#000000" },
  FaPhp: { Icon: FaPhp, color: "#777BB4" },
  FaHtml5: { Icon: FaHtml5, color: "#E34F26" },
  FaCss3: { Icon: FaCss3, color: "#1572B6" }, // Simple Icons `css3` (replaced by `css` #663399)
  FaSass: { Icon: FaSass, color: "#CC6699" },
  FaMarkdown: { Icon: FaMarkdown, color: "#000000" },
  SiSpring: { Icon: SiSpring, color: "#6DB33F" },
  SiSpringboot: { Icon: SiSpringboot, color: "#6DB33F" },
  FaReact: { Icon: FaReact, color: "#61DAFB" },
  FaAngular: { Icon: FaAngular, color: "#DD0031" }, // shield glyph; current Simple Icons Angular is #0F0F11
  FaNodeJs: { Icon: FaNodeJs, color: "#5FA04E" },
  SiExpress: { Icon: SiExpress, color: "#000000" },
  SiJquery: { Icon: SiJquery, color: "#0769AD" },
  FaBootstrap: { Icon: FaBootstrap, color: "#7952B3" },
  FaWordpress: { Icon: FaWordpress, color: "#21759B" },
  SiHibernate: { Icon: SiHibernate, color: "#59666C" },
  SiScikitlearn: { Icon: SiScikitlearn, color: "#F7931E" },
  SiServerless: { Icon: SiServerless, color: "#FD5750" },
  GrMysql: { Icon: GrMysql, color: "#4479A1" },
  SiOracle: { Icon: GrOracle, color: "#F80000" },
  SiMongodb: { Icon: SiMongodb, color: "#47A248" },
  SiRedis: { Icon: SiRedis, color: "#FF4438" },
  FaGitAlt: { Icon: FaGitAlt, color: "#F05032" },
  FaDocker: { Icon: FaDocker, color: "#2496ED" },
  SiKubernetes: { Icon: SiKubernetes, color: "#326CE5" },
  SiNpm: { Icon: SiNpm, color: "#CB3837" },
  FaYarn: { Icon: FaYarn, color: "#2C8EBB" },
  FaJenkins: { Icon: FaJenkins, color: "#D24939" },
  SiGithubactions: { Icon: SiGithubactions, color: "#2088FF" },
  FaAndroid: { Icon: FaAndroid, color: "#3DDC84" },
  FaAws: { Icon: FaAws, color: "#FF9900" }, // Amazon orange; Simple Icons `amazonaws` is #232F3E
  SiCloudfoundry: { Icon: SiCloudfoundry, color: "#0C9ED5" },
  FaLinux: { Icon: FaLinux, color: "#FCC624" },
  SiJupyter: { Icon: SiJupyter, color: "#F37626" },
  SiVisualstudiocode: { Icon: VscVscode, color: "#007ACC" }, // Simple Icons 9 `visualstudiocode` (later removed)
  SiTerraform: { Icon: SiTerraform, color: "#844FBA" },
} as const satisfies Record<string, { Icon: IconType; color: `#${string}` }>;

export type SkillIconId = keyof typeof skillIcons;

export type SkillIconMark = {
  Icon: IconType;
  color: `#${string}`;
};

export function resolveSkillIcon(icon: string, label: string): SkillIconMark {
  const mark = skillIcons[icon as SkillIconId];
  if (!mark) {
    throw new Error(`Missing skill icon "${icon}" for "${label}"`);
  }
  return mark;
}
