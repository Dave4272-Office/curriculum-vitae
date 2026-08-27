import { renderToBuffer } from "@react-pdf/renderer";
import { getCvPdfModel } from "../lib/cv-pdf";
import { CvPdfDocument } from "./cv-document";

export async function renderCvPdf(): Promise<Buffer> {
  return renderToBuffer(<CvPdfDocument model={getCvPdfModel()} />);
}
