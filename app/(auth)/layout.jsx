import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AuthMain from "@/src/components/layout/MainAuth";

export const metadata = {
    title: "Galahub Education",
    description: "Empowering minds, shaping future",
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
        <body>
        <AntdRegistry>
            <AuthMain>{children}</AuthMain>
        </AntdRegistry>
        </body>
        </html>
    );
}