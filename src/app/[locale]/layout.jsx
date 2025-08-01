import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Urbanist, Quicksand } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Toaster } from "react-hot-toast";

import GoogleAnalyticsComponent from "@/components/analytics/GoogleAnalytics";
import JsonLd from "@/components/layout/JsonLD";
import QueryWrapper from "@/components/layout/QueryWrapper";
import SEOProvider from "@/components/layout/SEOProvider";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    template: "%s | Gala Education",
    default: "Gala Education - Empowering minds, shaping the future",
  },
  description:
    "Gala Education is an innovative online tutoring platform created by academic experts to serve Tanzanian Primary, Secondary, and High School students.",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={quicksand.className}>
        <NextIntlClientProvider locale={locale}>
          <QueryWrapper>
            <AntdRegistry>
              <SEOProvider />
              <JsonLd />
              <GoogleAnalyticsComponent />
              {children}
            </AntdRegistry>
          </QueryWrapper>
          <Toaster position="top-center" reverseOrder={false} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
