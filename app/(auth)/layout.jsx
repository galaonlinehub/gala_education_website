'use client'
import Navbar from "@/src/components/layout/Navbar";

export default function AuthLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="w-screen h-screen overflow-y-scroll max-h-screen pt-12">
        {children}
      </main>
    </div>
  );
}
