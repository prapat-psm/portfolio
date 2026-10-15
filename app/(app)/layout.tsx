import "./globals.css";
import type { Metadata } from "next";
import { Pixelify_Sans, Press_Start_2P, Silkscreen } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { FloatingButton } from "@/components/FloatingButton";
import { PreloadProvider } from "@/components/Preload/PreloadProvider";
import { Preload } from "@/components/Preload";
import { getSiteUrl } from "@/libs/site-url";

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  // Variable font: one file covers every weight
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: ["400"],
});

const title = "Prapat's Portfolio";
const description =
  "Prapat Prapatsornmanu, senior frontend developer. Projects, tech stack and work experience built with Next.js.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    siteName: title,
    images: [{ url: "/portrait.png", alt: "Prapat Prapatsornmanu" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/portrait.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${silkscreen.variable} ${pixelifySans.variable} ${pressStart2P.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface text-on-background">
        <PreloadProvider>
          <Preload />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingButton />
        </PreloadProvider>
      </body>
    </html>
  );
}
