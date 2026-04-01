import "./globals.css";
import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Preload } from "@/components/Preload";

import { PreloadProvider } from "@/components/Providers";

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Prapat's Portfolio",
  description:
    "A high-end editorial portfolio for a senior frontend developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixelifySans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface text-on-background">
        <PreloadProvider>
          <Preload />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </PreloadProvider>
      </body>
    </html>
  );
}
