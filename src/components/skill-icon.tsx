import { skillIcons } from "../lib/skill-icons";

export function SkillIcon({ name }: Readonly<{ name: string }>) {
  const Icon = skillIcons[name];
  if (!Icon) {
    return null;
  }
  return <Icon aria-hidden="true" className="skill-icon" />;
}
