// app/contact/page.tsx
import ContactClient from "./ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Make It & Market",
  description: "Get in touch with Make It & Market for marketing, design, and creative collaboration inquiries. We’d love to help your brand grow.",
  openGraph: {
    title: "Contact Us | Make It & Market",
    description: "Reach out to Make It & Market for marketing and creative design projects.",
    url: "https://www.makeitandmarket.com/contact",
    type: "website",
    siteName: "Make It & Market",
  },
  twitter: {
    title: "Contact Us | Make It & Market",
    description: "Reach out to Make It & Market for marketing and creative design projects.", 
    card: "summary_large_image",
    images: ["https://www.makeitandmarket.com/logo.png"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
