

import localFont from "next/font/local";
import StudentMain from "@/src/components/student/StudentMain";
import "../globals.css";
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Galahub education",
  description: "Empowering minds shaping future",
};

export default function RootLayout({ children}) {
  

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
       <StudentMain>
        {children}
       </StudentMain>
      </body>
    </html>
  );
}