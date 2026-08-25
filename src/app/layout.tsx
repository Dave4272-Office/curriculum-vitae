import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { App } from "../App";
import { WebVitals } from "./web-vitals";
import "../index.sass";
import "../App.sass";
import "../header/index.sass";
import "../nav-bar/index.sass";
import "../footer/index.sass";
import "../details/index.sass";
import "../details/content/welcome.sass";
import "../details/content/education.sass";
import "../details/content/experience.sass";
import "../details/content/certificates.sass";
import "../details/content/skills.sass";
import "../details/content/skillchip.sass";
import "../details/content/animated-headline/index.sass";

const roboto = Roboto({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-57TRFSCL";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: "Curriculum Vitae of Debraj Kundu",
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
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={gtmId} />
      <body className={roboto.className}>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <AppRouterCacheProvider>
          <App>{children}</App>
        </AppRouterCacheProvider>
        <WebVitals />
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
