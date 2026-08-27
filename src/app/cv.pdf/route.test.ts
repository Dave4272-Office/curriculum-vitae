import { expect, test, vi } from "vitest";
import { GET } from "./route";

vi.mock("../../../pdf/render-cv-pdf", () => ({
  renderCvPdf: vi.fn(async () => Buffer.from("%PDF-1.4 mock")),
}));

test("GET /cv.pdf sets Content-Disposition from the generate-time filename", async () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-27T12:00:00+05:30"));

  try {
    const response = await GET();

    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Content-Disposition")).toBe(
      'attachment; filename="Debraj-Kundu-CV-2026-08-27.pdf"',
    );
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  } finally {
    vi.useRealTimers();
  }
});
