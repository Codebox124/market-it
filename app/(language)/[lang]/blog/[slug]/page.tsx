import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

// 1. Definisikan mapping bahasa ke format Locale standar
const localeMap: Record<string, string> = {
  en: "en-US",
  id: "id-ID",
  fr: "fr-FR",
  bn: "bn-BD",
  hk: "zh-HK", // hk biasanya mapped ke Traditional Chinese (Hong Kong)
  gu: "gu-IN",
  hi: "hi-IN",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  ar: "ar-SA", // Arabic (Saudi Arabia) sebagai standar umum
  pt: "pt-PT", // atau pt-BR jika target Brazil
  es: "es-ES",
  tl: "tl-PH",
  ur: "ur-PK",
  ru: "ru-RU",
};

async function getPost(slug: string, lang: string) {
  const query = `*[_type == "post" && slug.current == $slug && language == $lang][0] {
    title,
    overview,
    content,
    "date": _createdAt
  }`;

  return await client.fetch(query, { slug, lang });
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  // Await params (Wajib di Next.js 15)
  const { lang, slug } = await params;

  const post = await getPost(slug, lang);

  if (!post) {
    notFound();
  }

  const dateLocale = localeMap[lang] || "en-US";

  return (
    <article className="container mx-auto px-4 py-10 max-w-3xl">
      {/* Header Artikel */}
      <header className="mb-8 border-b pb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 text-sm">
          {new Date(post.date).toLocaleDateString(dateLocale, {
            dateStyle: "long",
          })}
        </p>
      </header>

      {/* Isi Artikel (Rich Text) */}
      <div className="prose prose-lg max-w-none">
        {/* Komponen ajaib untuk render teks dari Sanity */}
        <PortableText value={post.content} />
      </div>
    </article>
  );
}
