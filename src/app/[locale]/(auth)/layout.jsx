'use client';
import Navbar from '@/components/layout/Navbar';
import { PaymentSocketProvider } from '@/hooks/misc/paymentSocketContext';

export default function AuthLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="w-screen h-[calc(100vh-3rem)] overflow-y-scroll mt-[3rem] fixed">
        <PaymentSocketProvider>{children}</PaymentSocketProvider>
      </main>
    </div>
  );
}
