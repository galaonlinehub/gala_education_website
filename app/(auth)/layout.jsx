import localFont from "next/font/local";
import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@/src/components/layout/footer";
import Link from "next/link";
import { Popconfirm } from "antd";
import ChooseAccont from "@/src/components/ui/auth/signup/ChooseAccount";
import AuthMain from "@/src/components/layout/MainAuth";

export const metadata = {
  title: "Gala education",
  description: "Empowering minds shaping future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <AntdRegistry>
          <AuthMain>{children}</AuthMain>
        </AntdRegistry>
      </body>
    </html>
  );
}
