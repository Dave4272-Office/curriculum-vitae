import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Providers } from "./providers";
import { WebVitals } from "./web-vitals";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "600"],
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "600"],
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-57TRFSCL";

export const metadata: Metadata = {
  title: "Debraj Kundu",
  description: "Curriculum vitae of Debraj Kundu, software engineer.",
  keywords: [
    "Dave Curriculum Vitae",
    "e92fe1ce8a88db4d6047eb179c8f3eda5a2d3860",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={gtmId} />
      <body>
        <Providers>{children}</Providers>
        <WebVitals />
      </body>
    </html>
  );
}
