"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { motion } from "framer-motion";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  plainText?: string;
  metaDescription?: string;
  overview?: string;
  publishedAt: string;
}

interface LatestBlogsProps {
  lang?: string;
}

const DICTIONARY: Record<
  string,
  { title: string; subtitle: string; viewAll: string; readMore: string; empty: string }
> = {
  en: {
    title: "Latest Insights",
    subtitle: "Discover our latest articles on marketing, design, and digital innovation.",
    viewAll: "View All Articles",
    readMore: "Read Article",
    empty: "No posts available at the moment.",
  },
  id: {
    title: "Wawasan Terbaru",
    subtitle: "Temukan artikel terbaru kami tentang pemasaran, desain, dan inovasi digital.",
    viewAll: "Lihat Semua Artikel",
    readMore: "Baca Artikel",
    empty: "Belum ada artikel saat ini.",
  },
  fr: {
    title: "Dernières Actualités",
    subtitle: "Découvrez nos derniers articles sur le marketing, le design et l'innovation numérique.",
    viewAll: "Voir tous les articles",
    readMore: "Lire l'article",
    empty: "Aucun article disponible pour le moment.",
  },
  bn: {
    title: "সর্বশেষ অন্তর্দৃষ্টি",
    subtitle: "বিপণন, নকশা এবং ডিজিটাল উদ্ভাবন সম্পর্কে আমাদের সর্বশেষ নিবন্ধগুলি আবিষ্কার করুন।",
    viewAll: "সব নিবন্ধ দেখুন",
    readMore: "নিবন্ধ পড়ুন",
    empty: "এই মুহূর্তে কোনো পোস্ট উপলব্ধ নেই।",
  },
  hk: {
    title: "最新見解",
    subtitle: "探索關於營銷、設計和數字創新的最新文章。",
    viewAll: "查看所有文章",
    readMore: "閱讀文章",
    empty: "目前沒有文章。",
  },
  gu: {
    title: "નવીનતમ આંતરદૃષ્ટિ",
    subtitle: "માર્કેટિંગ, ડિઝાઇન અને ડિજિટલ ઇનોવેશન પર અમારા નવીનતમ લેખો શોધો.",
    viewAll: "બધા લેખો જુઓ",
    readMore: "લેખ વાંચો",
    empty: "હાલમાં કોઈ પોસ્ટ ઉપલબ્ધ નથી.",
  },
  hi: {
    title: "नवीनतम जानकारी",
    subtitle: "मार्केटिंग, डिज़ाइन और डिजिटल इनोवेशन पर हमारे नवीनतम लेख देखें।",
    viewAll: "सभी लेख देखें",
    readMore: "लेख पढ़ें",
    empty: "फिलहाल कोई पोस्ट उपलब्ध नहीं है।",
  },
  zh: {
    title: "最新见解",
    subtitle: "探索关于营销、设计和数字创新的最新文章。",
    viewAll: "查看所有文章",
    readMore: "阅读文章",
    empty: "目前没有文章。",
  },
  ja: {
    title: "最新のインサイト",
    subtitle: "マーケティング、デザイン、デジタルイノベーションに関する最新の記事をご覧ください。",
    viewAll: "すべての記事を見る",
    readMore: "記事を読む",
    empty: "現在利用可能な投稿はありません。",
  },
  ko: {
    title: "최신 인사이트",
    subtitle: "마케팅, 디자인 및 디지털 혁신에 대한 최신 기사를 확인하세요.",
    viewAll: "모든 기사 보기",
    readMore: "기사 읽기",
    empty: "현재 사용할 수 있는 게시물이 없습니다.",
  },
  ar: {
    title: "أحدث الرؤى",
    subtitle: "اكتشف أحدث مقالاتنا حول التسويق والتصميم والابتكار الرقمي.",
    viewAll: "عرض جميع المقالات",
    readMore: "اقرأ المقال",
    empty: "لا توجد مشاركات متاحة في الوقت الحالي.",
  },
  pt: {
    title: "Últimos Insights",
    subtitle: "Descubra nossos artigos mais recentes sobre marketing, design e inovação digital.",
    viewAll: "Ver todos os artigos",
    readMore: "Ler artigo",
    empty: "Nenhuma postagem disponível no momento.",
  },
  es: {
    title: "Últimas Perspectivas",
    subtitle: "Descubre nuestros últimos artículos sobre marketing, diseño e innovación digital.",
    viewAll: "Ver todos los artículos",
    readMore: "Leer artículo",
    empty: "No hay publicaciones disponibles por el momento.",
  },
  tl: {
    title: "Pinakabagong Kaalaman",
    subtitle: "Tuklasin ang aming mga pinakabagong artikulo tungkol sa marketing, disenyo, at digital na inobasyon.",
    viewAll: "Tingnan ang Lahat ng Artikulo",
    readMore: "Basahin ang Artikulo",
    empty: "Walang magagamit na mga post sa ngayon.",
  },
  ur: {
    title: "تازہ ترین بصیرت",
    subtitle: "مارکیٹنگ، ڈیزائن، اور ڈیجیٹل جدت پر ہمارے تازہ ترین مضامین دریافت کریں۔",
    viewAll: "تمام مضامین دیکھیں",
    readMore: "مضمون پڑھیں",
    empty: "فی الحال کوئی پوسٹ دستیاب نہیں ہے۔",
  },
  ru: {
    title: "Последние идеи",
    subtitle: "Откройте для себя наши последние статьи о маркетинге, дизайне и цифровых инновациях.",
    viewAll: "Посмотреть все статьи",
    readMore: "Читать статью",
    empty: "На данный момент постов нет.",
  },
};

export default function LatestBlogs({ lang = "en" }: LatestBlogsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const t = DICTIONARY[lang] || DICTIONARY["en"];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post" && language == $lang] | order(_createdAt desc)[0...3] {
          _id,
          title,
          slug,
          overview,
          metaDescription,
          "excerpt": pt::text(content)[0...150],
          "plainText": content[0].children[0].text,
          publishedAt
        }`;
        const data = await client.fetch(query, { lang });
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [lang]);

  if (posts.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-16">
      <div className="md:col-span-3">
        <p className="eyebrow">
          <span className="numeral">[04]</span> &nbsp; Journal
        </p>
      </div>
      <div className="md:col-span-9">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display-lg text-[color:var(--color-ink)]"
        >
          {t.title}<span className="text-[color:var(--color-accent)]">.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-8 text-lg leading-relaxed text-[color:var(--color-ink-soft)] max-w-2xl font-light"
        >
          {t.subtitle}
        </motion.p>
      </div>

      <div className="md:col-span-12 mt-12 md:mt-20">
        <div className="border-t border-[color:var(--color-line)]">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-b border-[color:var(--color-line)]"
            >
              <Link
                href={`/${lang}/blog/${post.slug.current}`}
                className="group block py-10 md:py-14"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
                  <div className="md:col-span-2 hidden md:block">
                    <span className="numeral-lg">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)] transition-colors duration-500">
                      {post.title}
                    </h3>
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
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <Link
            href={`/${lang}/blog`}
            className="group inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[color:var(--color-ink)] border-b border-[color:var(--color-line-strong)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] pb-1 transition-colors duration-300"
          >
            {t.viewAll}
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
