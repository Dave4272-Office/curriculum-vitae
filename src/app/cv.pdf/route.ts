import { cvPdfFilename } from "../../lib/cv-pdf";
import { renderCvPdf } from "../../pdf/render-cv-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const pdf = await renderCvPdf();

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${cvPdfFilename}"`,
      "Cache-Control": "no-store",
    },
  });
}
