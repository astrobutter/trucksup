import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.scss";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrucksUp Max | Let Your Fleet Make The Move",
  description:
    "TrucksUp Max is the only platform that combines fuel management, toll automation, vehicle tracking, load board, insurance and route calculation into one dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${baloo.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
