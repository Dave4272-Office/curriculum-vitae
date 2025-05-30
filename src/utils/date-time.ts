import { DateTime, Duration } from "luxon";

export const durationAsString = (from: DateTime, to?: DateTime): string => {
  let duration: Duration;
  let formatedString = "";
  if (!to) {
    duration = DateTime.now().diff(from, ["year", "months"], {
      conversionAccuracy: "longterm",
    });
  } else {
    duration = to.diff(from, ["years", "months"], {
      conversionAccuracy: "longterm",
    });
  }

  if (parseInt(duration.years.toFixed(0)) !== 0) {
    formatedString += duration.years.toFixed(0) + " yr";
    formatedString += Math.abs(duration.years) > 1 ? "s" : "";
  }

  if (parseInt(duration.months.toFixed(0)) !== 0) {
    if (formatedString.length > 0) {
      formatedString += " ";
    }
    formatedString += Math.ceil(Number(duration.months.toFixed(2))) + " mth";
    formatedString += Math.abs(duration.months) > 1 ? "s" : "";
  }

  return formatedString;
};
