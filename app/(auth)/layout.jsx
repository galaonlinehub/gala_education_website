import Footer from "@/src/components/layout/footer";
import Navbar from "@/src/components/layout/Navbar";

export default function AuthLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="flex-1 w-screen max-w-screen-2xl h-screen overflow-y-scroll max-h-screen pt-16 md:pt-24">
        {children}
      </main>
    </div>
  );
}
