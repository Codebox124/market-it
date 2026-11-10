"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import LatestBlogs from "@/components/home/LatestBlogs";

// --- MOTION ---
const editorial = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

// Marquee — services loop (3-category IA)
const marqueePhrases = [
  "Marketing",
  "Content Creation",
  "Websites & Apps",
  "Marketing",
  "Content Creation",
  "Websites & Apps",
];

// Client testimonials — localized per page language
type TestimonialSet = {
  eyebrow: string;
  heading: string;
  items: { quote: string; name: string }[];
};

const TESTIMONIALS_I18N: Record<string, TestimonialSet> = {
  en: {
    eyebrow: "In their words",
    heading: "What clients say.",
    items: [
      { quote: "First of all, thank you very much for your outstanding services provided to me and within a timely manner.", name: "Joseph A." },
      { quote: "Thank you for your patience and for being meticulous with my campaign.", name: "Sherri S." },
      { quote: "Thank you for correcting that; we're not just selling perfume. You are sharp with marketing!", name: "Joanne A." },
      { quote: "What you put together was amazing. I still get a kick out of that video and so does my wife.", name: "Murray B." },
      { quote: "I am so excited for the launch. I feel like I am about to be a millionaire! You know I will always come to you first. Thank you so much for your help.", name: "Darcia J." },
      { quote: "Great results. Literally had me like wow over here!", name: "Kajuan R." },
    ],
  },
  es: {
    eyebrow: "Con sus palabras",
    heading: "Lo que dicen los clientes.",
    items: [
      { quote: "En primer lugar, muchas gracias por sus excelentes servicios y por la puntualidad con la que me atendieron.", name: "Joseph A." },
      { quote: "Gracias por su paciencia y por ser tan meticuloso con mi campaña.", name: "Sherri S." },
      { quote: "Gracias por corregir eso; no solo vendemos perfume. ¡Es muy agudo con el marketing!", name: "Joanne A." },
      { quote: "Lo que preparó fue increíble. Todavía me encanta ese video, y a mi esposa también.", name: "Murray B." },
      { quote: "Estoy muy emocionada por el lanzamiento. ¡Siento que estoy a punto de ser millonaria! Sabes que siempre acudiré a ti primero. Muchas gracias por tu ayuda.", name: "Darcia J." },
      { quote: "Resultados excelentes. ¡Literalmente me dejó boquiabierto!", name: "Kajuan R." },
    ],
  },
  fr: {
    eyebrow: "Avec leurs mots",
    heading: "Ce que disent les clients.",
    items: [
      { quote: "Tout d'abord, merci beaucoup pour vos services exceptionnels et votre rapidité.", name: "Joseph A." },
      { quote: "Merci pour votre patience et pour le soin méticuleux apporté à ma campagne.", name: "Sherri S." },
      { quote: "Merci d'avoir corrigé cela ; nous ne vendons pas que du parfum. Vous êtes redoutable en marketing !", name: "Joanne A." },
      { quote: "Ce que vous avez créé était incroyable. Je prends toujours autant de plaisir à regarder cette vidéo, et ma femme aussi.", name: "Murray B." },
      { quote: "Je suis tellement excitée pour le lancement. J'ai l'impression que je vais devenir millionnaire ! Tu sais que je viendrai toujours vers toi en premier. Merci infiniment pour ton aide.", name: "Darcia J." },
      { quote: "Des résultats formidables. J'étais littéralement bluffé !", name: "Kajuan R." },
    ],
  },
  pt: {
    eyebrow: "Nas palavras deles",
    heading: "O que dizem os clientes.",
    items: [
      { quote: "Em primeiro lugar, muito obrigado pelos serviços excepcionais prestados e pela pontualidade.", name: "Joseph A." },
      { quote: "Obrigado pela paciência e por ser tão meticuloso com a minha campanha.", name: "Sherri S." },
      { quote: "Obrigado por corrigir isso; não vendemos apenas perfume. Você é afiado no marketing!", name: "Joanne A." },
      { quote: "O que você preparou foi incrível. Ainda me divirto com aquele vídeo, e minha esposa também.", name: "Murray B." },
      { quote: "Estou muito animada para o lançamento. Sinto que estou prestes a ficar milionária! Você sabe que sempre procurarei você primeiro. Muito obrigada pela ajuda.", name: "Darcia J." },
      { quote: "Ótimos resultados. Fiquei literalmente de boca aberta!", name: "Kajuan R." },
    ],
  },
  zh: {
    eyebrow: "客户心声",
    heading: "客户评价。",
    items: [
      { quote: "首先，非常感谢您为我提供的出色服务，而且非常及时。", name: "Joseph A." },
      { quote: "感谢您的耐心，以及对我的营销活动一丝不苟的用心。", name: "Sherri S." },
      { quote: "谢谢你纠正这一点；我们卖的不只是香水。你的营销眼光真敏锐！", name: "Joanne A." },
      { quote: "你做出来的东西太棒了。我到现在看那个视频还是很过瘾，我妻子也是。", name: "Murray B." },
      { quote: "我对这次发布非常兴奋。感觉自己马上就要成为百万富翁了！你知道我永远会第一个来找你。非常感谢你的帮助。", name: "Darcia J." },
      { quote: "效果非常棒。真的让我惊叹不已！", name: "Kajuan R." },
    ],
  },
};

// Client / affiliate logo assets
const clientLogos = [
  "/cl.webp",
  "/cl2.webp",
  "/cl3.webp",
  "/cl4.webp",
  "/cl5.webp",
  "/cl6.webp",
  "/cl7.webp",
  "/cl8.webp",
  "/clientScroll/a.webp",
  "/clientScroll/ark4nyc.webp",
  "/clientScroll/builditect-logo.webp",
  "/clientScroll/client-13.webp",
  "/clientScroll/client-14.webp",
  "/clientScroll/client-16.webp",
  "/clientScroll/client-19.webp",
  "/clientScroll/client-20.webp",
  "/clientScroll/elite-med.webp",
  "/clientScroll/evan-the-biz-clubhouse-logo.webp",
  "/clientScroll/flamingo.webp",
  "/clientScroll/gm-logo-04.webp",
  "/clientScroll/hot-or-not-logo.webp",
  "/clientScroll/image-exopest-michael-perez-before.webp",
  "/clientScroll/joker-life-text-emblem.webp",
  "/clientScroll/laara.webp",
  "/clientScroll/logo-3-option-4-flow-bj.webp",
  "/clientScroll/logo-arc-4.webp",
  "/clientScroll/logo-barry-option-4-edit.webp",
  "/clientScroll/logo-bj-split-pink-l-blue-r.webp",
  "/clientScroll/logo-dle-1-desmond.webp",
  "/clientScroll/logo-dolo-bj-stroke-1.webp",
  "/clientScroll/logo-kids-dynasty-daycare-arlene.webp",
  "/clientScroll/logo-marty-2.webp",
  "/clientScroll/logo-mojo-logo.webp",
  "/clientScroll/logo-olivers-edit.webp",
  "/clientScroll/logo-ox-movers-edit.webp",
  "/clientScroll/logo-reefnreem.webp",
  "/clientScroll/logo-united-for-the-people-s-plan-18.webp",
  "/clientScroll/logo-ybda.webp",
  "/clientScroll/ne-hydraulics.webp",
  "/clientScroll/popcorn-tv-logo-3.webp",
  "/clientScroll/radmila.webp",
  "/clientScroll/sanipro.webp",
  "/clientScroll/spoiled-bananas-edit.webp",
  "/clientScroll/ss-tiger.webp",
  "/clientScroll/wisconsin-foundation.webp",
];

interface LandingPageProps {
  dict: any;
  lang: string;
}

export default function LandingPageClient({ dict, lang }: LandingPageProps) {
  const testimonialSet = TESTIMONIALS_I18N[lang] ?? TESTIMONIALS_I18N.en;
  const form = useRef<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm("service_7cevh3y", "template_y9qp8oc", form.current, {
        publicKey: "HemS8Yf--_i_cJRW8",
      })
      .then(
        () => {
          setIsSubmitting(false);
          setFormData({ user_name: "", user_email: "", message: "" });
          alert(dict.contact.alerts.success);
        },
        (error) => {
          setIsSubmitting(false);
          console.error("FAILED...", error.text);
          alert(dict.contact.alerts.error);
        }
      );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] min-h-screen">
      {/* ============================ HERO ============================ */}
      <section className="noir-grain relative min-h-screen flex flex-col overflow-hidden">
        {/* Background video — drop /public/logo.mp4 in. Until then this is invisible. */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/logo.webp"
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          aria-hidden
        >
          <source src="/logo.webm" type="video/webm" />
          <source src="/logo.mp4" type="video/mp4" />
        </video>

        {/* Legibility scrim — darkens top + bottom edges, lets midtones breathe */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[color:var(--color-canvas)]/60 via-[color:var(--color-canvas)]/20 to-[color:var(--color-canvas)]/90" />

        <div className="relative z-10 flex-1 flex items-center max-w-[1600px] mx-auto w-full px-6 lg:px-10 pt-40 pb-24">
          <div className="w-full">
            <motion.div
              variants={editorial}
              custom={0}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              <img
                src="/logo.webp"
                alt="Make It & Market"
                className="w-full max-w-[880px] md:max-w-[1100px] lg:max-w-[1280px] xl:max-w-[1440px] h-auto object-contain"
              />
            </motion.div>

            <motion.div
              variants={editorial}
              custom={1}
              initial="hidden"
              animate="visible"
              className="mt-16 md:mt-20 space-y-10 md:space-y-12"
            >
              <p className="leading-relaxed text-[color:var(--color-ink-soft)] font-light whitespace-nowrap text-[clamp(0.5rem,2.1vw,1.5rem)]">
                Versatile marketing solutions for entrepreneurs, companies and causes.
              </p>
              <div className="flex">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-7 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-accent-ink)] bg-[color:var(--color-ink)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300"
                >
                  Start a campaign
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom locale strip */}
        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 lg:px-10 pb-10">
          <div className="flex items-end justify-between gap-8 pt-8 border-t border-[color:var(--color-line)]">
            <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--color-ink-muted)]">
              USA · Worldwide
            </p>
          </div>
        </div>
      </section>

      {/* ============================ MARQUEE ============================ */}
      <section
        className="border-y border-[color:var(--color-line)] py-16 md:py-24 overflow-hidden marquee-fade"
      >
        <div className="marquee">
          <div className="marquee-track">
            {[...marqueePhrases, ...marqueePhrases, ...marqueePhrases, ...marqueePhrases].map((phrase, i) => (
              <span
                key={i}
                className="font-display text-3xl md:text-5xl font-medium tracking-[-0.03em] text-[color:var(--color-ink)] leading-[1.3] pb-1"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ ABOUT ============================ */}
      <section className="relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-32 md:py-44">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="md:col-span-3">
              <p className="eyebrow">About</p>
            </div>
            <div className="md:col-span-9 max-w-4xl">
              <p className="font-display text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-[-0.025em] text-[color:var(--color-ink)]">
                Make It &amp; Market is a marketing agency that offers effective advertising
                and outreach services. Whether it&apos;s Google, social media, email blasts,
                mass text messages, billboards, commercials, or flyer distribution — we&apos;ll
                get you closer to your goal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================ REEL ============================ */}
      <section className="relative border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="relative w-full max-w-5xl mx-auto aspect-video bg-[color:var(--color-canvas)] overflow-hidden border border-[color:var(--color-line-strong)]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="https://res.cloudinary.com/dhflw3yu0/video/upload/q_auto,vc_vp9/v1780644354/reel_vlurwc.webm"
                type="video/webm"
              />
              <source
                src="https://res.cloudinary.com/dhflw3yu0/video/upload/q_auto,vc_h264/v1780644354/reel_vlurwc.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>

      {/* ============================ OUR AFFILIATES & CLIENTS ============================ */}
      <section className="relative border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 pt-24 md:pt-32 pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="eyebrow mb-5">Trusted by</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1] tracking-[-0.03em] text-[color:var(--color-ink)] whitespace-nowrap">
              Our affiliates &amp; clients.
            </h2>
          </motion.div>
        </div>

        {/* Logo marquee — single continuous horizontal scroll */}
        <div className="overflow-hidden border-y border-[color:var(--color-line)] py-10 md:py-14 bg-[color:var(--color-surface)] marquee-fade marquee-fade--surface">
          <div className="marquee">
            <div className="marquee-track marquee-track--slow">
              {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center min-w-[16rem] md:min-w-[22rem] px-10"
                >
                  <img
                    src={logo}
                    alt="Client logo"
                    loading="lazy"
                    className="h-24 md:h-36 lg:h-40 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ TESTIMONIALS ============================ */}
      <section className="relative border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 md:mb-24"
          >
            <p className="eyebrow mb-5">{testimonialSet.eyebrow}</p>
            <h2 className="display-lg text-[color:var(--color-ink)]">
              {testimonialSet.heading}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 md:gap-y-20">
            {testimonialSet.items.map((testimonial, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: (i % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col"
              >
                <blockquote className="font-display text-xl md:text-2xl font-medium leading-[1.3] tracking-[-0.02em] text-[color:var(--color-ink)]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-[color:var(--color-line)] text-xs tracking-[0.28em] uppercase text-[color:var(--color-ink-muted)]">
                  {testimonial.name}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ JOURNAL ============================ */}
      <section className="relative border-t border-[color:var(--color-line)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-28 md:py-40">
          <LatestBlogs lang={lang} />
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section className="relative border-t border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="display-lg text-[color:var(--color-ink)]">
              Contact us.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Direct lines */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <p className="text-lg leading-relaxed text-[color:var(--color-ink-soft)] max-w-md font-light">
                Tell us your campaign goals, and we&apos;ll respond within one business day.
              </p>

              <div className="mt-12 pt-8 border-t border-[color:var(--color-line)] space-y-6 text-sm">
                <div>
                  <p className="eyebrow mb-2">Email</p>
                  <a
                    href="mailto:info@makeitandmarket.com"
                    className="text-base text-[color:var(--color-ink)] hover:text-[color:var(--color-ink-soft)] transition-colors"
                  >
                    info@makeitandmarket.com
                  </a>
                </div>
                <div>
                  <p className="eyebrow mb-2">Phone</p>
                  <a
                    href="tel:3476591708"
                    className="text-base text-[color:var(--color-ink)] hover:text-[color:var(--color-ink-soft)] transition-colors"
                  >
                    (347) 659 1708
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Form — boxed for legibility */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <form
                ref={form}
                onSubmit={sendEmail}
                className="border border-[color:var(--color-line-strong)] bg-[color:var(--color-canvas)] p-8 md:p-12 space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Name"
                    name="user_name"
                    type="text"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                  <FormField
                    label="Email"
                    name="user_email"
                    type="email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block eyebrow mb-3 text-[color:var(--color-ink)]">
                    Campaign details
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us your situation, goals, or questions"
                    className="w-full bg-transparent border border-[color:var(--color-line-strong)] focus:border-[color:var(--color-ink)] outline-none px-4 py-3 text-base text-white placeholder:text-neutral-400 transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-accent-ink)] bg-[color:var(--color-ink)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={14} strokeWidth={1.5} />
                      Sending…
                    </>
                  ) : (
                    <>Send message</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- LOCAL FORM FIELD (boxed) ---
function FormField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block eyebrow mb-3 text-[color:var(--color-ink)]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full bg-transparent border border-[color:var(--color-line-strong)] focus:border-[color:var(--color-ink)] outline-none px-4 py-3 text-base text-white placeholder:text-neutral-400 transition-colors duration-300"
      />
    </div>
  );
}
