import { renderToBuffer } from "@react-pdf/renderer";
import { getCvPdfModel, type CvPdfModel } from "../lib/cv-pdf";
import { CvPdfDocument } from "./cv-document";
import { registerCvPdfFonts } from "./cv-fonts";

export async function renderCvPdf(
  model: CvPdfModel = getCvPdfModel(),
): Promise<Buffer> {
  registerCvPdfFonts();
  return renderToBuffer(<CvPdfDocument model={model} />);
}
