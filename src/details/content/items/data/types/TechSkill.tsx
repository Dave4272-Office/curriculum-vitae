import React from "react";

export type TechSkill = {
  include: boolean;
  icon: React.ReactElement;
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
