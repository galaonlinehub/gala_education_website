// app/layout.jsx
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Urbanist, Quicksand } from "next/font/google";
import QueryWrapper from "@/src/components/layout/QueryWrapper";
import SEOProvider from "@/src/components/layout/SEOProvider";
import JsonLd from "@/src/components/layout/JsonLD";
import GoogleAnalyticsComponent from "@/src/components/analytics/GoogleAnalytics";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${quicksand.className} ${urbanist.variable}`}>
      <body className="font-sans ">
        <QueryWrapper>
          <AntdRegistry>
            <SEOProvider />
            <JsonLd />
            <GoogleAnalyticsComponent />
            {children}
          </AntdRegistry>
        </QueryWrapper>
      </body>
    </html>
  );
}
