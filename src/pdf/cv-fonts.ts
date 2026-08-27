import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Font } from "@react-pdf/renderer";

export const cvPdfFontFamily = "LiberationSans";

function resolveFontFile(filename: string): string {
  const besideModule = join(
    dirname(fileURLToPath(import.meta.url)),
    "fonts",
    filename,
  );
  if (existsSync(besideModule)) {
    return besideModule;
  }

  const fromRepoRoot = join(process.cwd(), "src/pdf/fonts", filename);
  if (existsSync(fromRepoRoot)) {
    return fromRepoRoot;
  }

  throw new Error(`Missing CV PDF font: ${filename}`);
}

let registered = false;

export function registerCvPdfFonts(): void {
  if (registered) {
    return;
  }

  Font.register({
    family: cvPdfFontFamily,
    fonts: [
      { src: resolveFontFile("LiberationSans-Regular.ttf"), fontWeight: 400 },
      { src: resolveFontFile("LiberationSans-Bold.ttf"), fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
  registered = true;
}
