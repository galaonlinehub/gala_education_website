import Footer from "@/src/components/layout/footer";
import Navbar from "@/src/components/layout/Navbar";

export default function AuthLayout({ children }) {
  return (
    <>
      <div className="w-screen max-w-screen-2xl mx-auto h-full">
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
