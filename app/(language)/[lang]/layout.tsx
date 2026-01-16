import type { Metadata } from "next";
import { getDictionary } from "@/utils/get-dictionary";
import "@/app/globals.css";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
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
  };
}

// 3. TAMBAHKAN 'async' PADA COMPONENT LAYOUT
export default async function LanguageLayout({ children, params }: Props) {
  // 4. LAKUKAN AWAIT JUGA DI SINI
  const { lang } = await params;

  return (
    // Gunakan variabel 'lang', bukan 'params.lang'
    <html lang={lang}>
      <body className={spaceGrotesk.variable}>{children}</body>
    </html>
  );
}
