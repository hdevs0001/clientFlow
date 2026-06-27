import type { Metadata } from "next";
import "./landing.css";
import "./globals.css";
import Providers from "./providers";

import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Geist, Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ClientFlow",
  description: "Freelance project management",
  icons: {
    icon: "/image.png",
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
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        geist.variable,
        inter.variable,
      )}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
        />
      </head>

      <body className="min-h-full flex flex-col">
        <SessionProvider>
          <TooltipProvider>
            <Providers>{children}</Providers>
            <Toaster richColors position="bottom-right" />
          </TooltipProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
// flex flex-col
