import { DateTime } from "luxon";

function unitLabel(count: number, singular: string, plural: string): string {
  return `${count} ${Math.abs(count) === 1 ? singular : plural}`;
}

export const durationAsString = (from: DateTime, to?: DateTime): string => {
  const end = to ?? DateTime.now();
  const duration = end.diff(from, ["years", "months"], {
    conversionAccuracy: "longterm",
  });

  let years = Math.trunc(duration.years);
  let months = Math.ceil(Number(duration.months.toFixed(2)));

  if (months >= 12) {
    years += Math.trunc(months / 12);
    months %= 12;
  }

  const parts: string[] = [];
  if (years !== 0) {
    parts.push(unitLabel(years, "yr", "yrs"));
  }
  if (months !== 0) {
    parts.push(unitLabel(months, "mth", "mths"));
  }
  return parts.join(" ");
};
