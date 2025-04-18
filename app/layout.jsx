import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {
  Inter,
  Poppins,
  Urbanist,
  Outfit,
  DM_Sans,
  Quicksand,
} from "next/font/google";
import QueryWrapper from "@/src/components/layout/QueryWrapper";


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
  title: "Gala Education",
  description: "Empowering minds, shaping future",
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
    <html
      lang="en"
      className={`${quicksand.className} ${urbanist.variable}`}
    >
      <body className="font-sans">
        <QueryWrapper>
          <AntdRegistry>{children}</AntdRegistry>
        </QueryWrapper>
      </body>
    </html>
  );
}
