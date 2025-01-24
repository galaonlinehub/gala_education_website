"use client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ClientWrapper from "./ClientWrapper";

const queryClient = new QueryClient();

export default function QueryWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientWrapper>{children}</ClientWrapper>
    </QueryClientProvider>
  );
}
