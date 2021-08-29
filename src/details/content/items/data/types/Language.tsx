export type Language = {
  language: string;
  readwrite: LanguageLevels;
  listeningspeaking: LanguageLevels;
};

type LanguageLevels =
  | "None"
  | "Basic"
  | "Intermediate"
  | "Fluent"
  | "Native Fluent";

type ILR =
  | "No"
  | "Elementary"
  | "Limited Working"
  | "Professional Working"
  | "Full Professional"
  | "Native";
