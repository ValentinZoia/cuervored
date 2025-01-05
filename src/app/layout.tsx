import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./Provider";
import { Toaster } from "@/components/ui/toaster";
import CuervoLogo from "@/components/icons/CuervoLogo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:"Home",
    template: "%s | CuervoRed",
  },
  description: "Una simple red social para hinchas de San lorenzo.",
  twitter:{
    card:"summary_large_image",
  },
  icons:{
    icon:"/favicon.ico"
  }
  
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="apple-mobile-web-app-title" content="MyWebSite" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <Toaster />
        </body>
    </html>
  );
}
