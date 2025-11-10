import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';
import GoogleAnalyticsComponent from '@/components/analytics/GoogleAnalytics';
import JsonLd from '@/components/layout/JsonLD';
import Navbar from '@/components/layout/Navbar';
import QueryWrapper from '@/components/layout/QueryWrapper';
import SEOProvider from '@/components/layout/SEOProvider';
import { inter } from './font';
import { base_metadata } from './metadata';

export const metadata = base_metadata;

export default async function RootLayout({ children }) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale}>
          <QueryWrapper>
            <AntdRegistry>
              <SEOProvider />
              <JsonLd />
              <Navbar />
              <GoogleAnalyticsComponent />
              <main className="w-screen h-[calc(100vh-3rem)] overflow-y-scroll mt-[3rem] fixed">
                {children}
              </main>
            </AntdRegistry>
          </QueryWrapper>
          <Toaster position="top-center" reverseOrder={false} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
