export type TechSkill = {
  include: boolean;
  icon: string;
  label: string;
  type: TechType;
};

type TechType =
  | "Language"
  | "IDE"
  | "Tool"
  | "Framework / Library"
  | "Database"
  | "Platform"
  | "None";
