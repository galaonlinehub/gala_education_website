"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ClientWrapper from "./ClientWrapper";
import { ConfigProvider } from 'antd';


const config = {
  theme: {
    token: {
      fontFamily: "Quicksand, sans-serif",
    },
  },
};

const queryClient = new QueryClient();

export default function QueryWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider {...config}>
        <ClientWrapper>{children}</ClientWrapper>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
