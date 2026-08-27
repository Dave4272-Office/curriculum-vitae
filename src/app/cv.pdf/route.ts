import { getCvPdfModel } from "../../lib/cv-pdf";
import { renderCvPdf } from "../../pdf/render-cv-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const model = getCvPdfModel();
  const pdf = await renderCvPdf(model);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${model.filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
