"use client";
import ClientWrapper from "./ClientWrapper";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientWrapper>{children}</ClientWrapper>
    </QueryClientProvider>
  );
}
