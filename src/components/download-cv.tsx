import { cvPdfFilename, cvPdfPath } from "../lib/cv-pdf";

export function DownloadCv() {
  return (
    <a className="download-cv" href={cvPdfPath} download={cvPdfFilename}>
      Download CV (PDF)
    </a>
  );
}
