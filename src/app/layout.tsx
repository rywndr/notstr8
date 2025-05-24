import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dakomri",
  description: "a PKM app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
        <ScrollToTop />
        <Toaster 
          position="bottom-right" 
          closeButton 
          toastOptions={{
            style: {
              background: '#ffffff',
              color: '#334155',
              border: '1px solid #e2e8f0',
            },
            className: 'text-sm',
          }}
        />
      </body>
    </html>
  );
}
