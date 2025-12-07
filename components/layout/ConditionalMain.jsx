'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalMain({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.includes('/admin');

  return (
    <main
      className={
        isAdminRoute
          ? 'w-screen h-screen overflow-hidden'
          : 'w-screen h-[calc(100vh-3rem)] overflow-y-scroll mt-12 fixed'
      }
    >
      {children}
    </main>
  );
}
