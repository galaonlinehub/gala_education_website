"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ClientWrapper from "./ClientWrapper";
import { ConfigProvider, App } from "antd";

const queryClient = new QueryClient();

export default function QueryWrapper({ children }) {
  return (
    <ConfigProvider
    theme={{
      components: {
        Input: {
          colorBorder: "#030DFE",
          hoverBorderColor: "#030DFE",
          borderRadius: 8,
          boxShadow: "none",
        },

      //   Select: {
      //   colorBorder: '#030DFE', // Blue border for Select
      //   hoverBorderColor: '#030DFE', // Blue border on hover
      //   borderRadius: 8, // Rounded corners
      //   boxShadow: 'none', // Remove focus shadow
      // },
      },
    }}
  >
    <App>
    <QueryClientProvider client={queryClient}>
      <ClientWrapper>{children}</ClientWrapper>
    </QueryClientProvider>
    </App>
    </ConfigProvider>
  );
}
