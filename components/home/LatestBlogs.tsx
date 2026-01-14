"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    empty: "No posts available at the moment."
  },
  id: {
    title: "Wawasan Terbaru",
    subtitle: "Temukan artikel terbaru kami tentang pemasaran, desain, dan inovasi digital.",
    viewAll: "Lihat Semua Artikel",
    readMore: "Baca Artikel",
    empty: "Belum ada artikel saat ini."
  },
  fr: {
    title: "Dernières Actualités",
    subtitle: "Découvrez nos derniers articles sur le marketing, le design et l'innovation numérique.",
    viewAll: "Voir tous les articles",
    readMore: "Lire l'article",
    empty: "Aucun article disponible pour le moment."
  },
  bn: {
    title: "সর্বশেষ অন্তর্দৃষ্টি",
    subtitle: "বিপণন, নকশা এবং ডিজিটাল উদ্ভাবন সম্পর্কে আমাদের সর্বশেষ নিবন্ধগুলি আবিষ্কার করুন।",
    viewAll: "সব নিবন্ধ দেখুন",
    readMore: "নিবন্ধ পড়ুন",
    empty: "এই মুহূর্তে কোনো পোস্ট উপলব্ধ নেই।"
  },
  hk: {
    title: "最新見解",
    subtitle: "探索關於營銷、設計和數字創新的最新文章。",
    viewAll: "查看所有文章",
    readMore: "閱讀文章",
    empty: "目前沒有文章。"
  },
  gu: {
    title: "નવીનતમ આંતરદૃષ્ટિ",
    subtitle: "માર્કેટિંગ, ડિઝાઇન અને ડિજિટલ ઇનોવેશન પર અમારા નવીનતમ લેખો શોધો.",
    viewAll: "બધા લેખો જુઓ",
    readMore: "લેખ વાંચો",
    empty: "હાલમાં કોઈ પોસ્ટ ઉપલબ્ધ નથી."
  },
  hi: {
    title: "नवीनतम जानकारी",
    subtitle: "मार्केटिंग, डिज़ाइन और डिजिटल इनोवेशन पर हमारे नवीनतम लेख देखें।",
    viewAll: "सभी लेख देखें",
    readMore: "लेख पढ़ें",
    empty: "फिलहाल कोई पोस्ट उपलब्ध नहीं है।"
  },
  zh: {
    title: "最新见解",
    subtitle: "探索关于营销、设计和数字创新的最新文章。",
    viewAll: "查看所有文章",
    readMore: "阅读文章",
    empty: "目前没有文章。"
  },
  ja: {
    title: "最新のインサイト",
    subtitle: "マーケティング、デザイン、デジタルイノベーションに関する最新の記事をご覧ください。",
    viewAll: "すべての記事を見る",
    readMore: "記事を読む",
    empty: "現在利用可能な投稿はありません。"
  },
  ko: {
    title: "최신 인사이트",
    subtitle: "마케팅, 디자인 및 디지털 혁신에 대한 최신 기사를 확인하세요。",
    viewAll: "모든 기사 보기",
    readMore: "기사 읽기",
    empty: "현재 사용할 수 있는 게시물이 없습니다."
  },
  ar: {
    title: "أحدث الرؤى",
    subtitle: "اكتشف أحدث مقالاتنا حول التسويق والتصميم والابتكار الرقمي.",
    viewAll: "عرض جميع المقالات",
    readMore: "اقرأ المقال",
    empty: "لا توجد مشاركات متاحة في الوقت الحالي."
  },
  pt: {
    title: "Últimos Insights",
    subtitle: "Descubra nossos artigos mais recentes sobre marketing, design e inovação digital.",
    viewAll: "Ver todos os artigos",
    readMore: "Ler artigo",
    empty: "Nenhuma postagem disponível no momento."
  },
  es: {
    title: "Últimas Perspectivas",
    subtitle: "Descubre nuestros últimos artículos sobre marketing, diseño e innovación digital.",
    viewAll: "Ver todos los artículos",
    readMore: "Leer artículo",
    empty: "No hay publicaciones disponibles por el momento."
  },
  tl: {
    title: "Pinakabagong Kaalaman",
    subtitle: "Tuklasin ang aming mga pinakabagong artikulo tungkol sa marketing, disenyo, at digital na inobasyon.",
    viewAll: "Tingnan ang Lahat ng Artikulo",
    readMore: "Basahin ang Artikulo",
    empty: "Walang magagamit na mga post sa ngayon."
  },
  ur: {
    title: "تازہ ترین بصیرت",
    subtitle: "مارکیٹنگ، ڈیزائن، اور ڈیجیٹل جدت پر ہمارے تازہ ترین مضامین دریافت کریں۔",
    viewAll: "تمام مضامین دیکھیں",
    readMore: "مضمون پڑھیں",
    empty: "فی الحال کوئی پوسٹ دستیاب نہیں ہے۔"
  },
  ru: {
    title: "Последние идеи",
    subtitle: "Откройте для себя наши последние статьи о маркетинге, дизайне и цифровых инновациях.",
    viewAll: "Посмотреть все статьи",
    readMore: "Читать статью",
    empty: "На данный момент постов нет."
  },
};

export default function LatestBlogs({ lang = "en" }: LatestBlogsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use selected lang or fallback to english
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
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600"
            >
              {t.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-2xl"
            >
              {t.subtitle}
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/${lang}/blog`}
              className="group flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <span className="font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-500 transition-all duration-300">
                {t.viewAll}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

        <div
          className={`grid grid-cols-1 gap-8 ${
            posts.length === 1
              ? "max-w-xl mx-auto"
              : posts.length === 2
              ? "max-w-4xl mx-auto md:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/${lang}/blog/${post.slug.current}`} className="group h-full block">
                <div className="h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-100 transition-all duration-500 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  <div className="mb-6 space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed line-clamp-3 mb-8 flex-grow">
                    {post.excerpt ||
                      post.plainText ||
                      post.metaDescription ||
                      post.overview ||
                      "No overview available."}
                  </p>

                  <div className="flex items-center text-sm font-semibold text-blue-600 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {t.readMore} <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
