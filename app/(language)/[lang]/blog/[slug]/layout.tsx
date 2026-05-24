import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPost(slug, lang);

  if (!post) {
    return { title: "Post Not Found" };
  }
  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription ||
    post.overview ||
    "Read this article on Make it & Market.";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Make it & Market`,
      description,
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

export default async function SingleBlogPage({ params }: Props) {
  const { lang, slug } = await params;
  const post = await getPost(slug, lang);

  if (!post) {
    notFound();
  }

  const isRTL = ["ar", "ur"].includes(lang);

  return (
    <div
      className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] min-h-screen"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* HERO */}
      <section className="noir-grain relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -right-40 w-[40rem] h-[40rem] rounded-full bg-[color:var(--color-accent)] blur-[200px] opacity-[0.06]" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 pt-32 md:pt-40 pb-20 md:pb-28">
          <Link
            href={`/${lang}/blog`}
            className="group inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-accent)] transition-colors duration-300 mb-14"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Back to journal
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-3">
              <p className="eyebrow">
                {new Date(post.date).toLocaleDateString(
                  lang === "id" ? "id-ID" : "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
            <div className="md:col-span-9">
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.025em] text-[color:var(--color-ink)]">
                {post.title}
              </h1>
              {post.overview && (
                <p className="mt-10 text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-soft)] font-light max-w-2xl">
                  {post.overview}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* COVER */}
      {post.mainImage && (
        <div className="relative w-full max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-[color:var(--color-surface)]">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* ARTICLE BODY */}
      <article className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-2xl mx-auto prose prose-lg prose-invert-dark prose-headings:font-display prose-headings:tracking-tight prose-a:no-underline hover:prose-a:underline prose-blockquote:font-display prose-blockquote:italic prose-img:my-12">
          <PortableText value={post.content} />
        </div>
      </article>
    </div>
  );
}
