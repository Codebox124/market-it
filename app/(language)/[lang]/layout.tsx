import type { Metadata } from "next";
import { getDictionary } from "@/utils/get-dictionary";
import "@/app/globals.css";
import { Space_Grotesk, Geist, Fraunces } from "next/font/google";
import Script from "next/script";
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

const fraunces = Fraunces({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  subsets: ["latin"],
});

// 1. UBAH TIPE PROPS MENJADI PROMISE
type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

// Fungsi ini akan dijalankan Next.js sebelum merender halaman untuk set <head>
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 2. LAKUKAN AWAIT TERLEBIH DAHULU (PENTING!)
  const { lang } = await params;

  // Gunakan variabel 'lang' yang sudah di-await, JANGAN 'params.lang'
  const dict = await getDictionary(lang);

  // Setup Base URL
  const baseUrl = "https://makeitandmarket.com";

  // Mapping untuk format locale SEO (misal id -> id_ID)
  const localeMap: Record<string, string> = {
    id: "id_ID",
    en: "en_US",
    fr: "fr_FR",
    bn: "bn_BD",
    hk: "zh_HK",
    gu: "gu_IN",
    hi: "hi_IN",
    zh: "zh_CN",
    ja: "ja_JP",
    ko: "ko_KR",
    ar: "ar_SA",
    pt: "pt_BR",
    es: "es_ES",
    tl: "tl_PH",
    ur: "ur_PK",
    ru: "ru_RU",
  };

  // Gunakan 'lang'
  const currentLocale = localeMap[lang] || "en_US";

  // Handle case jika dict kosong agar tidak error
  if (!dict) {
    return { title: "Page Not Found" };
  }

  return {
    // --- BASIC SEO ---
    title: dict.seo.title,
    description: dict.seo.description,

    // Convert string "Jasa SEO, Digital Marketing" di JSON menjadi Array
    keywords: dict.seo.keywords.split(", ").map((k: string) => k.trim()),

    // --- CANONICAL & ALTERNATES ---
    alternates: {
      canonical: `${baseUrl}/${lang}`, // Gunakan 'lang'
      languages: {
        "en-US": `${baseUrl}/en`,
        "fr-FR": `${baseUrl}/fr`,
        "id-ID": `${baseUrl}/id`,
      },
    },

    // --- OPEN GRAPH ---
    openGraph: {
      title: dict.seo.social_title,
      description: dict.seo.social_description,
      url: `${baseUrl}/${lang}`, // Gunakan 'lang'
      siteName: "Make It & Market",
      locale: currentLocale,
      type: "website",
    },

    // --- TWITTER CARD ---
    twitter: {
      card: "summary_large_image",
      title: dict.seo.social_title,
      description: dict.seo.social_description,
    },

    // --- SITE VERIFICATION ---
    // The apex domain 308-redirects to /<lang>, so verification meta tags
    // must live here (the actual landing page), not only in (main)/layout.tsx.
    other: {
      "google-site-verification": [
        "XG86AIpvITfGs4ETfyPyfFXlzifaOKEMhY38WjJTpb4",
        "6bLchd784mAl7rBGkgBZEiQhlpTfq9kW3JywH7powGM",
      ],
      "msvalidate.01": "009C8AEC151B258FD1F908FA76572D41",
      "ahrefs-site-verification": "eU2DaMSVvJ6i1oMhXpI7jQ",
    },
  };
}

// 3. TAMBAHKAN 'async' PADA COMPONENT LAYOUT
export default async function LanguageLayout({ children, params }: Props) {
  // 4. LAKUKAN AWAIT JUGA DI SINI
  const { lang } = await params;

  return (
    // Gunakan variabel 'lang', bukan 'params.lang'
    <html lang={lang}>
      <head>
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
        className={`${spaceGrotesk.variable} ${geistSans.variable} ${fraunces.variable} antialiased bg-[color:var(--color-canvas)] text-[color:var(--color-ink)]`}
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
