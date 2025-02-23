"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ClientWrapper from "./ClientWrapper";
import NetworkMonitor from "@/src/components/layout/Network";

const queryClient = new QueryClient();

export default function QueryWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NetworkMonitor />
      <ClientWrapper>{children}</ClientWrapper>
    </QueryClientProvider>
  );
}
