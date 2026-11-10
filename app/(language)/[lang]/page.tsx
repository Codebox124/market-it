import { notFound } from "next/navigation";
import { getDictionary } from "@/utils/get-dictionary";
import HomePage from "@/components/home/HomePage";
import HomePageI18n from "@/components/home/HomePageI18n";

// Definisikan bahasa yang diizinkan
const locales = [
  "en",
  "fr",
  "zh",
  "pt",
  "es",
  "ar",
  "hi",
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
  if (lang === "en") {
    return <HomePage />;
  }

  const dict = await getDictionary(lang);

  if (!dict || !(dict as any).home) return notFound();

  // Every other locale renders the same redesigned homepage, fully
  // translated from its dictionary "home" strings.
  return <HomePageI18n lang={lang} home={(dict as any).home} />;
}
