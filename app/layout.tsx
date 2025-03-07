import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono,IBM_Plex_Mono } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Make It & Market - Visuals & Marketing",
  description:
    "We provide full-service visuals production and marketing solutions to help businesses grow.",
  openGraph: {
    title: "Make It & Market - Visuals & Marketing",
    description:
      "We craft custom content and marketing campaigns to help brands grow.",
    url: "https://yourwebsite.com",
    siteName: "Make It & Market",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Make It & Market",
    description:
      "Visuals & Marketing solutions to help brands scale effectively.",
    creator: "@yourtwitterhandle",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
