import GoogleAnalyticsComponent from '@/components/analytics/GoogleAnalytics';
import ConditionalMain from '@/components/layout/ConditionalMain';
import JsonLd from '@/components/layout/JsonLD';
import Navbar from '@/components/layout/Navbar';
import QueryWrapper from '@/components/layout/QueryWrapper';
import SEOProvider from '@/components/layout/SEOProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';
import { inter } from './font';
import './globals.css';
import { base_metadata } from './metadata';

export const metadata = base_metadata;

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryWrapper>
            <AntdRegistry>
              <SEOProvider />
              <JsonLd />
              <Navbar />
              <GoogleAnalyticsComponent />
              <ConditionalMain>{children}</ConditionalMain>
            </AntdRegistry>
          </QueryWrapper>
          <Toaster position="top-center" reverseOrder={false} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
