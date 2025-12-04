import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Link from "next/link";

// 1. Definisikan tipe untuk parameter params (Next.js 15 require Promise)
type Props = {
  params: Promise<{ lang: string }>;
};

// 2. Daftar bahasa yang diizinkan (Sesuai request kamu)
const ALLOWED_BLOG_LANGS = [
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

// 3. Kamus Terjemahan UI Sederhana
const DICTIONARY: Record<
  string,
  { title: string; readMore: string; empty: string }
> = {
  en: {
    title: "Latest Posts",
    readMore: "Read More →",
    empty: "No posts available in this language yet.",
  },
  id: {
    title: "Tulisan Terbaru",
    readMore: "Baca Selengkapnya →",
    empty: "Belum ada postingan dalam bahasa ini.",
  },
  fr: {
    title: "Derniers articles",
    readMore: "Lire la suite →",
    empty: "Aucun article disponible dans cette langue.",
  },
  bn: {
    title: "সর্বশেষ l",
    readMore: "আরও l →",
    empty: "এই ভাষায় এখনও কোন l নেই।",
  },
  hk: { title: "最新文章", readMore: "閱讀更多 →", empty: "此語言尚無文章。" },
  gu: {
    title: "નવીનતમ પોસ્ટ્સ",
    readMore: "વધુ વાંચો →",
    empty: "આ ભાષામાં હજુ સુધી કોઈ પોસ્ટ ઉપલબ્ધ નથી.",
  },
  hi: {
    title: "नवीनतम पोस्ट",
    readMore: "और पढ़ें →",
    empty: "इस भाषा में अभी तक कोई पोस्ट उपलब्ध नहीं है।",
  },
  zh: { title: "最新文章", readMore: "阅读更多 →", empty: "此语言尚无文章。" },
  ja: {
    title: "最新の投稿",
    readMore: "続きを読む →",
    empty: "この言語の記事はまだありません。",
  },
  ko: {
    title: "최신 게시물",
    readMore: "더 읽기 →",
    empty: "이 언어로 된 게시물이 아직 없습니다.",
  },
  ar: {
    title: "أحدث المشاركات",
    readMore: "اقرأ المزيد →",
    empty: "لا توجد مشاركات متاحة بهذه اللغة بعد.",
  },
  pt: {
    title: "Últimas postagens",
    readMore: "Leia mais →",
    empty: "Nenhuma postagem disponível neste idioma ainda.",
  },
  es: {
    title: "Últimas publicaciones",
    readMore: "Leer más →",
    empty: "No hay publicaciones disponibles en este idioma.",
  },
  tl: {
    title: "Pinakabagong Post",
    readMore: "Magbasa Pa →",
    empty: "Wala pang mga post na magagamit sa wikang ito.",
  },
  ur: {
    title: "تازہ ترین پوسٹس",
    readMore: "مزید پڑھیں →",
    empty: "اس زبان میں ابھی تک کوئی پوسٹ دستیاب نہیں ہے۔",
  },
  ru: {
    title: "Последние посты",
    readMore: "Читать далее →",
    empty: "Постов на этом языке пока нет.",
  },
};

// Function untuk ambil data dari Sanity
async function getPosts(lang: string) {
  // QUERY GROQ:
  // "excerpt": Ambil text dari content menggunakan helper pt::text
  // "plainText": Cadangan manual ambil text dari block pertama (jika pt::text gagal)
  const query = `*[_type == "post" && language == $lang] | order(_createdAt desc) {
    _id,
    title,
    slug,
    overview, 
    metaDescription,
    "excerpt": pt::text(content)[0...200],
    "plainText": content[0].children[0].text
  }`;

  // UPDATE: Gunakan { cache: 'no-store' } agar benar-benar tidak ada cache (Dynamic Fetch)
  const data = await client.fetch(query, { lang }, { cache: "no-store" });

  return data;
}

export default async function BlogPage({ params }: Props) {
  // Await params (Wajib di Next.js 15)
  const { lang } = await params;

  // Security Check
  if (!ALLOWED_BLOG_LANGS.includes(lang)) {
    notFound();
  }

  // Ambil data postingan
  const posts = await getPosts(lang);

  // Ambil teks UI berdasarkan bahasa (Fallback ke English jika ada typo kode bahasa)
  const t = DICTIONARY[lang] || DICTIONARY["en"];

  // Cek apakah bahasa ini RTL (Right-to-Left) seperti Arab atau Urdu agar layout rapi
  const isRTL = ["ar", "ur"].includes(lang);

  return (
    <main
      className="container mx-auto px-4 md:px-16 py-10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h1 className="text-3xl font-bold mb-8">{t.title}</h1>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post: any) => (
            <article
              key={post._id}
              className="border p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/${lang}/blog/${post.slug.current}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>

                {/* PRIORITAS TAMPILAN:
                   1. post.excerpt (Helper GROQ)
                   2. post.plainText (Manual Block 1)
                   3. post.metaDescription (SEO)
                   4. post.overview (Field lama)
                */}
                <p className="text-gray-600 line-clamp-2">
                  {post.excerpt ||
                    post.plainText ||
                    post.metaDescription ||
                    post.overview ||
                    (lang === "id"
                      ? "Tidak ada ringkasan."
                      : "No overview available.")}
                </p>
              </div>

              <Link
                href={`/${lang}/blog/${post.slug.current}`}
                className="hover:underline mt-4 text-sm text-blue-500 font-medium inline-block"
              >
                {t.readMore}
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded">
          <p className="text-gray-500">{t.empty}</p>
        </div>
      )}
    </main>
  );
}
