import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{ lang: string }>;
};

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

const DICTIONARY: Record<
  string,
  { eyebrow: string; title: string; readMore: string; empty: string }
> = {
  en: { eyebrow: "Journal", title: "Latest Posts", readMore: "Read", empty: "No posts available in this language yet." },
  id: { eyebrow: "Jurnal", title: "Tulisan Terbaru", readMore: "Baca", empty: "Belum ada postingan dalam bahasa ini." },
  fr: { eyebrow: "Journal", title: "Derniers articles", readMore: "Lire", empty: "Aucun article disponible dans cette langue." },
  bn: { eyebrow: "জার্নাল", title: "সর্বশেষ পোস্ট", readMore: "পড়ুন", empty: "এই ভাষায় এখনও কোন পোস্ট নেই।" },
  hk: { eyebrow: "日誌", title: "最新文章", readMore: "閱讀", empty: "此語言尚無文章。" },
  gu: { eyebrow: "જર્નલ", title: "નવીનતમ પોસ્ટ્સ", readMore: "વાંચો", empty: "આ ભાષામાં હજુ સુધી કોઈ પોસ્ટ ઉપલબ્ધ નથી." },
  hi: { eyebrow: "जर्नल", title: "नवीनतम पोस्ट", readMore: "पढ़ें", empty: "इस भाषा में अभी तक कोई पोस्ट उपलब्ध नहीं है।" },
  zh: { eyebrow: "日志", title: "最新文章", readMore: "阅读", empty: "此语言尚无文章。" },
  ja: { eyebrow: "ジャーナル", title: "最新の投稿", readMore: "読む", empty: "この言語の記事はまだありません。" },
  ko: { eyebrow: "저널", title: "최신 게시물", readMore: "읽기", empty: "이 언어로 된 게시물이 아직 없습니다." },
  ar: { eyebrow: "مجلة", title: "أحدث المشاركات", readMore: "اقرأ", empty: "لا توجد مشاركات متاحة بهذه اللغة بعد." },
  pt: { eyebrow: "Jornal", title: "Últimas postagens", readMore: "Ler", empty: "Nenhuma postagem disponível neste idioma ainda." },
  es: { eyebrow: "Diario", title: "Últimas publicaciones", readMore: "Leer", empty: "No hay publicaciones disponibles en este idioma." },
  tl: { eyebrow: "Journal", title: "Pinakabagong Post", readMore: "Basahin", empty: "Wala pang mga post na magagamit sa wikang ito." },
  ur: { eyebrow: "جریدہ", title: "تازہ ترین پوسٹس", readMore: "پڑھیں", empty: "اس زبان میں ابھی تک کوئی پوسٹ دستیاب نہیں ہے۔" },
  ru: { eyebrow: "Журнал", title: "Последние посты", readMore: "Читать", empty: "Постов на этом языке пока нет." },
};

async function getPosts(lang: string) {
  const query = `*[_type == "post" && language == $lang] | order(_createdAt desc) {
    _id,
    title,
    slug,
    overview,
    metaDescription,
    "excerpt": pt::text(content)[0...200],
    "plainText": content[0].children[0].text,
    "date": _createdAt
  }`;
  return await client.fetch(query, { lang }, { cache: "no-store" });
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;

  if (!ALLOWED_BLOG_LANGS.includes(lang)) {
    notFound();
  }

  const posts = await getPosts(lang);
  const t = DICTIONARY[lang] || DICTIONARY["en"];
  const isRTL = ["ar", "ur"].includes(lang);

  const dateLocaleMap: Record<string, string> = {
    en: "en-US", id: "id-ID", fr: "fr-FR", bn: "bn-BD", hk: "zh-HK",
    gu: "gu-IN", hi: "hi-IN", zh: "zh-CN", ja: "ja-JP", ko: "ko-KR",
    ar: "ar-SA", pt: "pt-PT", es: "es-ES", tl: "tl-PH", ur: "ur-PK", ru: "ru-RU",
  };
  const dateLocale = dateLocaleMap[lang] || "en-US";

  return (
    <div
      className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] min-h-screen"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* HERO */}
      <section className="noir-grain relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full bg-[color:var(--color-accent)] blur-[200px] opacity-[0.06]" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 pt-36 md:pt-44 pb-20 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-3">
              <p className="eyebrow">
                <span className="numeral">[ {t.eyebrow} ]</span>
              </p>
              <p className="mt-6 text-sm leading-relaxed text-[color:var(--color-ink-muted)] max-w-[14rem]">
                Notes from the agency · Writing · Field reports
              </p>
            </div>
            <div className="md:col-span-9">
              <h1 className="display-xl text-[color:var(--color-ink)]">
                {t.title}<span className="text-[color:var(--color-accent)]">.</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20 md:py-32">
          {posts.length > 0 ? (
            <div>
              {posts.map((post: any, index: number) => (
                <article
                  key={post._id}
                  className="border-b border-[color:var(--color-line)]"
                >
                  <Link
                    href={`/${lang}/blog/${post.slug.current}`}
                    className="group block py-10 md:py-14"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
                      <div className="md:col-span-2">
                        <span className="numeral-lg">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-2 numeral">
                          {new Date(post.date).toLocaleDateString(dateLocale, {
                            year: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                      <div className="md:col-span-7">
                        <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)] transition-colors duration-500">
                          {post.title}
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-[color:var(--color-ink-soft)] line-clamp-2 max-w-2xl">
                          {post.excerpt ||
                            post.plainText ||
                            post.metaDescription ||
                            post.overview ||
                            ""}
                        </p>
                      </div>
                      <div className="md:col-span-3 md:justify-self-end flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)] group-hover:text-[color:var(--color-accent)] transition-colors duration-500">
                        {t.readMore}
                        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="border-t border-[color:var(--color-line)] pt-20 text-center">
              <p className="text-[color:var(--color-ink-muted)] text-sm tracking-[0.22em] uppercase">
                {t.empty}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
