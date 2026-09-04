import { DateTime } from "luxon";
import { bio } from "./content";

export const cvPdfPath = "/cv.pdf";

export function cvPdfGeneratedOn(now = DateTime.now()): string {
  return now.toFormat("yyyy-MM-dd");
}

export function cvPdfFilename(
  generatedOn = cvPdfGeneratedOn(),
  name = bio.name,
): string {
  return `${name.replaceAll(" ", "-")}-CV-${generatedOn}.pdf`;
}

export function cvPdfDocumentTitle(
  generatedOn = cvPdfGeneratedOn(),
  name = bio.name,
): string {
  return `${name} CV ${generatedOn}`;
}
