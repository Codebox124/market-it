import type { Metadata } from "next";
import { Lock, Zap, ShieldCheck, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Service | Make It & Market",
  description:
    "Schedule your marketing or visual design consultation with Make It & Market. Choose your preferred time and let's bring your ideas to life.",
  openGraph: {
    title: "Book a Service | Make It & Market",
    description:
      "Book your consultation for marketing, SEO, or visual design with Make It & Market.",
    url: "https://www.makeitandmarket.com/booking",
    type: "website",
    siteName: "Make It & Market",
  },
  twitter: {
    title: "Book a Service | Make It & Market",
    description:
      "Book your consultation for marketing, SEO, or visual design with Make It & Market.",
    card: "summary_large_image",
    images: ["https://www.makeitandmarket.com/logo.png"],
  },
};

const trustIndicators = [
  { icon: Lock, label: "Secure Checkout" },
  { icon: Zap, label: "Instant Processing" },
  { icon: ShieldCheck, label: "Buyer Protection" },
];

export default function BookingPage() {
  return (
    <div className="bg-[color:var(--color-canvas)] text-[color:var(--color-ink)] min-h-screen">
      {/* HERO */}
      <section className="noir-grain relative">
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-10 pt-36 md:pt-44 pb-20 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-3">
              <p className="eyebrow">Payment</p>
            </div>
            <div className="md:col-span-9">
              <h1 className="font-display font-medium leading-[0.95] tracking-[-0.04em] text-[clamp(2rem,4.5vw,3.5rem)] md:whitespace-nowrap text-[color:var(--color-ink)]">
                Complete your payment.
              </h1>
              <p className="mt-14 md:mt-16 max-w-2xl text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-soft)] font-light">
                Settle for your agreed-upon service with PayPal, Apple Pay,
                Venmo, or any major credit or debit card.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT CARD */}
      <section className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 lg:col-start-3">
              <div className="border border-[color:var(--color-line)] p-10 md:p-14 bg-[color:var(--color-surface-muted)]">
                {/* Card header */}
                <div className="flex items-start gap-5 pb-10 border-b border-[color:var(--color-line)]">
                  <div className="w-14 h-14 flex-shrink-0 border border-[color:var(--color-line-strong)] flex items-center justify-center">
                    <CreditCard
                      size={22}
                      strokeWidth={1.25}
                      className="text-[color:var(--color-ink)]"
                    />
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Protected by PayPal</p>
                    <h2 className="font-display text-2xl md:text-3xl tracking-tight text-[color:var(--color-ink)]">
                      Secure Payment
                    </h2>
                  </div>
                </div>

                {/* Body copy */}
                <div className="pt-10 space-y-5 text-[color:var(--color-ink-soft)] leading-relaxed">
                  <p>
                    Click below to pay securely for your agreed-upon service.
                    Payment options include PayPal, Apple Pay, Venmo, and any
                    major credit or debit card.
                  </p>
                  <p>
                    For Zelle or Cashapp, send to{" "}
                    <a
                      href="tel:3476591708"
                      className="text-[color:var(--color-ink)] underline underline-offset-4 decoration-[color:var(--color-line-strong)] hover:decoration-[color:var(--color-accent)] transition-colors"
                    >
                      (347) 659 1708
                    </a>
                    .
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="https://www.paypal.com/ncp/payment/VUN5CLMUKR8GE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-12 inline-flex w-full items-center justify-center gap-3 px-8 py-5 text-xs tracking-[0.22em] uppercase font-medium text-[color:var(--color-accent-ink)] bg-[color:var(--color-ink)] hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300"
                >
                  Payment options
                </a>

                <p className="mt-6 flex items-center justify-center gap-2 text-xs tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)]">
                  <Lock size={12} strokeWidth={1.5} />
                  Secure encrypted payment
                </p>
              </div>

              {/* Trust indicators */}
              <div className="mt-14 grid grid-cols-3 gap-6 md:gap-12 pt-10 border-t border-[color:var(--color-line)]">
                {trustIndicators.map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <Icon
                      size={22}
                      strokeWidth={1.25}
                      className="mx-auto mb-4 text-[color:var(--color-ink)]"
                    />
                    <p className="text-xs tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Support */}
              <p className="mt-14 text-center text-xs tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)]">
                Questions?{" "}
                <a
                  href="mailto:info@makeitandmarket.com"
                  className="text-[color:var(--color-ink)] hover:text-[color:var(--color-ink)] transition-colors underline underline-offset-4 decoration-[color:var(--color-line-strong)]"
                >
                  info@makeitandmarket.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
