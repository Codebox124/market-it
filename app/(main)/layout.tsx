import type { Metadata } from "next";
import {
  Geist,
  Azeret_Mono as Geist_Mono,
  IBM_Plex_Mono,
  Space_Grotesk,
  Libre_Caslon_Text,
} from "next/font/google";
import Script from "next/script";
import "../globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

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

const fraunces = Libre_Caslon_Text({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Make It & Market — Branding, Design & Content Creation",
  description:
    "Make It & Market is a branding, design and content creation studio for a wide array of businesses and entrepreneurs. Brand identity, graphic design, photography, video, animation and websites — produced to an enterprise standard.",
  openGraph: {
    title: "Make It & Market — Branding, Design & Content Creation",
    description:
      "We build brands the market remembers. Identity, design, film and digital — conceived and produced under one roof.",
    url: "https://www.makeitandmarket.com",
    siteName: "Make It & Market",
    type: "website",
    images: [
      {
        url: "https://www.makeitandmarket.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Make It & Market",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Make It & Market — Branding, Design & Content Creation",
    description:
      "Branding, design and content creation for companies that refuse to blend in.",
    images: ["https://www.makeitandmarket.com/og-image.jpg"],
  },
  other: {
    // "google-site-verification": "hepa8iNMg0RjaI7FiuzVLWwwwWCQ26z5ofrZFxldzNA",
    "google-site-verification": [
      "XG86AIpvITfGs4ETfyPyfFXlzifaOKEMhY38WjJTpb4",
      "6bLchd784mAl7rBGkgBZEiQhlpTfq9kW3JywH7powGM",
      "W6pIeCWud5Du8B-9PtXUEZ89hkazp_j_R8KdmiTiJA0",
    ],
    "ahrefs-site-verification": "eU2DaMSVvJ6i1oMhXpI7jQ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="msvalidate.01" content="009C8AEC151B258FD1F908FA76572D41" />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-C4EPTMEWQJ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C4EPTMEWQJ', {
                page_path: window.location.pathname,
              });
              gtag('config', 'G-2WEYQ37430', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="eU2DaMSVvJ6i1oMhXpI7jQ"
          async
        ></script>
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MBZHWL6C');
          `}
        </Script>

        {/* Google Ads (optional) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16842141479"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16842141479');
            `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} ${spaceGrotesk.variable} ${fraunces.variable} antialiased bg-[color:var(--color-canvas)] text-[color:var(--color-ink)]`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MBZHWL6C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Navbar />
        <main className="flex-grow w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
