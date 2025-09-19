import { Inter, Quicksand } from "next/font/google";

export const quicksand = Quicksand({
  subsets: ["latin"],
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
