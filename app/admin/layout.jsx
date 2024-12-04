import localFont from "next/font/local";
import "../globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AdminMain from "@/src/components/admin/AdminMain";

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Gala Education",
  description: "Gala Education",
    icons: {
        icon: [
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        shortcut: [{ url: '/favicon.ico' }],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>

        <AdminMain>
        {children}
          </AdminMain>
        </AntdRegistry>
      </body>
    </html>
  );
}
