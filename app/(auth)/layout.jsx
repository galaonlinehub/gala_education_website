import localFont from "next/font/local";
import "../globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Footer from "@/src/components/layout/footer";
import Link from "next/link";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
            <nav className="h-14 bg-white p-2 flex justify-between max-w-screen items-center">
                <div className="w-[40px] h-[40px] relative bg-[#d9d9d9]  rounded-full  ring-[#a0a0a0] ring-offset-1 ring-[2px] flex items-start flex-col ">
                    <div className="absolute left-2 top-1 flex flex-col">

                    <p className="text-black text-[12px] font-bold leading-tight">Gala</p>
                    <p className="text-black text-[12px] font-bold leading-tight">Education</p>
                    </div>
                </div>

                <ul className="text-black font-black mr-[10vw] flex sm:gap-x-4 gap-x-2 sm:text-xs text-[8px] leading-[5px]">
                    <li>
                    <Link href={'/'} className='hover:cursor-pointer'> 
                      Home
                      </Link>
                      </li>
                    <li>
                    <Link href={'#'} className='hover:cursor-pointer'>
                      About Us
                      </Link>
                      </li>
                    <Link href={'/signup'} className='hover:cursor-pointer'>
                         <li>Register</li>
                    </Link>
                    <Link href={'/signin'} className='hover:cursor-pointer'>
                        <li>Login</li>
                    </Link>
                </ul>
                {/* <div/> */}
            </nav>
            <main>
                {children}
            </main>
        <Footer/>
        </AntdRegistry>
      </body>
    </html>
  );
}
