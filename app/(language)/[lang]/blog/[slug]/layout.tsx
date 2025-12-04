import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

// Definisikan tipe Props supaya aman di TypeScript
// UPDATE NEXT.JS 15: params sekarang adalah Promise
type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

// --- 1. FUNCTION FETCH DATA (Dipakai oleh Page & Metadata) ---
async function getPost(slug: string, lang: string) {
  const query = `*[_type == "post" && slug.current == $slug && language == $lang][0] {
    title,
    overview,
    content,
    "date": _createdAt,
    mainImage,
    metaTitle,
    metaDescription
  }`;

  return await client.fetch(query, { slug, lang });
}

// --- 2. GENERATE METADATA (SEO) ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // UPDATE NEXT.JS 15: await params sebelum akses propertinya
  const { lang, slug } = await params;
  const post = await getPost(slug, lang);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription ||
    post.overview ||
    "Read this article on Make it & Market.";

  return {
    title: title,
    description: description,

    openGraph: {
      title: `${title} | Make it & Market`,
      description: description,
      type: "article",
      locale: lang,
      images: post.mainImage
        ? [
            {
              url: urlFor(post.mainImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
  };
}

// --- 3. TAMPILAN HALAMAN UTAMA ---
export default async function SingleBlogPage({ params }: Props) {
  // UPDATE NEXT.JS 15: await params sebelum akses propertinya
  const { lang, slug } = await params;
  const post = await getPost(slug, lang);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-10 max-w-3xl">
      {/* Gambar Cover */}
      {post.mainImage && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8 border-b pb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
          {post.title}
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          {new Date(post.date).toLocaleDateString(
            lang === "id" ? "id-ID" : "en-US",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </p>
      </header>

      {/* Konten */}
      <div className="prose prose-lg prose-blue max-w-none">
        <PortableText value={post.content} />
      </div>
    </article>
  );
}
