import Footer from "@/src/components/layout/footer";
import Navbar from "@/src/components/layout/Navbar";

export default function AuthLayout({ children }) {
  return (
    <>
      <Navbar />
      {/* <div className="w-screen max-w-screen-2xl mx-auto h-full flex items-center justify-center bg-blue-300"> */}
        <main className="flex-1 w-screen max-w-screen-2xl">
          {children}
        </main>
      {/* </div> */}
      {/* <Footer /> */}
    </>
  );
}
