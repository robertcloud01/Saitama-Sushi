import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/layout/CartDrawer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saitama Delivery",
  description: "Premium Food Delivery Service - The Art of Pure Speed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={clsx("font-sans antialiased", "bg-background text-foreground selection:bg-accent selection:text-white")}>
        <Header />
        <CartDrawer />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
