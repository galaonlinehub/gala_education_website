'use client'
import Navbar from "@/src/components/layout/Navbar";
import { PaymentSocketProvider } from "@/src/hooks/paymentSocketContext";


export default function AuthLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="w-screen h-screen overflow-y-scroll max-h-screen pt-12">
        <PaymentSocketProvider>
          {children}
        </PaymentSocketProvider>
      </main>
    </div>
  );
}
