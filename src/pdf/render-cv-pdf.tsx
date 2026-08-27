import { renderToBuffer } from "@react-pdf/renderer";
import { getCvPdfModel } from "../lib/cv-pdf";
import { CvPdfDocument } from "./cv-document";
import { registerCvPdfFonts } from "./cv-fonts";

export async function renderCvPdf(): Promise<Buffer> {
  registerCvPdfFonts();
  return renderToBuffer(<CvPdfDocument model={getCvPdfModel()} />);
}
