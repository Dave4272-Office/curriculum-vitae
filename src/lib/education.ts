import type { AcademicRecord } from "./types";

export type EducationProfile = "site" | "pdf";

/** Presented exam, place, specification, and outcome for one AcademicRecord. */
export type EducationLines = {
  exam: string;
  rangeLabel: string;
  place: string;
  authority: string | null;
  spec: string | null;
  outcome: string;
};

export function withOptionalAbbr(
  name: string,
  abbr: string | null | undefined,
): string {
  return abbr ? `${name} (${abbr})` : name;
}

function yearRangeLabel(from: string, to?: string): string {
  return to ? `${from}–${to}` : from;
}

function pdfSpec(item: AcademicRecord): string | null {
  if (item.qualspectype === "Subjects") {
    const abbr = item.qualspecabbr?.trim();
    return abbr ? `${item.qualspectype}: ${abbr}` : null;
  }
  return `${item.qualspectype}: ${item.qualspec}`;
}

export function presentEducation(
  item: AcademicRecord,
  profile: EducationProfile,
): EducationLines {
  const exam = withOptionalAbbr(item.qualexam, item.qualexammoniker);
  const rangeLabel = yearRangeLabel(item.from, item.to);

  if (profile === "pdf") {
    return {
      exam,
      rangeLabel,
      place: withOptionalAbbr(item.institutename, item.certauthabbr),
      authority: null,
      spec: pdfSpec(item),
      outcome: item.to ? `${item.to}, ${item.score}` : item.score,
    };
  }

  return {
    exam,
    rangeLabel,
    place: withOptionalAbbr(item.institutename, item.instituteabbr),
    authority: withOptionalAbbr(item.certauthname, item.certauthabbr),
    spec: `${item.qualspectype}: ${item.qualspec}`,
    outcome: item.score,
  };
}
