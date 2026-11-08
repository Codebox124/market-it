import { notFound } from "next/navigation";
import { getDictionary } from "@/utils/get-dictionary";
import LandingPageClient from "@/app/(language)/[lang]/LandingPageClient";
import HomePage from "@/components/home/HomePage";

// Definisikan bahasa yang diizinkan
const locales = [
  "en",
  "id",
  "fr",
  "bn",
  "hk",
  "gu",
  "hi",
  "zh",
  "ja",
  "ko",
  "ar",
  "pt",
  "es",
  "tl",
  "ur",
  "ru",
];

// Generate Static Params untuk build time (Ini tetap sama)
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// --- PERBAIKAN DI SINI ---
// 1. Ubah tipe params menjadi Promise
type Props = {
  params: Promise<{ lang: string }>;
};

// 2. Tambahkan 'await' di dalam function
export default async function Page({ params }: Props) {
  // Tunggu params resolve dulu
  const { lang } = await params;

  // Sekarang pakai variabel 'lang', JANGAN 'params.lang'
  if (!locales.includes(lang)) {
    notFound();
  }

  // The English homepage is the redesigned Make It & Market homepage.
  // All other locales keep the dictionary-driven landing page.
  if (lang === "en") {
    return <HomePage />;
  }

  const dict = await getDictionary(lang);

  // Cek jada-jaga jika dictionary null (seperti diskusi kita sebelumnya)
  if (!dict) return notFound();

  // Lempar data ke Client Component
  return <LandingPageClient dict={dict} lang={lang} />;
}
