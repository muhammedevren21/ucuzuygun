import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SepetProvider } from "@/lib/sepet";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ucuzuygun.com",
  description: "Türkiye'nin en uygun pazaryeri",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}>
        <SepetProvider>
          {children}
        </SepetProvider>
      </body>
    </html>
  );
}